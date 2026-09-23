import type { PracticeFilters } from '@/features/practice/utils/practiceSession'
import type { SyllabarySlug } from '@/lib/routes'
import {
  abandonRecognitionSessions,
  addRecognitionSession,
  applyPracticeAnswers,
  createRecognitionSession,
  type PracticeAnswer,
  recognitionSessions,
} from './practiceProgress'
import { localDay, type ProgressSnapshot } from './progress'
import {
  PROGRESS_STORAGE_KEY,
  type ProgressError,
  readProgress,
  saveProgress,
  withProgressLock,
} from './storage'

const SESSION_LOCK_PREFIX = 'kirakana.practice.session:'

export type PracticeStorageNotice = {
  message: string
  canRetry: boolean
} | null

export type PracticeRecorder = {
  ready: Promise<void>
  answer: (
    index: number,
    kana: string,
    isCorrect: boolean,
    date?: Date,
  ) => Promise<void>
  retry: () => Promise<void>
  close: () => Promise<void>
}

function holdSessionLock(id: string): Promise<(() => void) | null> {
  return new Promise((resolve) => {
    void window.navigator.locks
      .request(`${SESSION_LOCK_PREFIX}${id}`, { ifAvailable: true }, (lock) => {
        if (!lock) {
          resolve(null)
          return
        }
        return new Promise<void>((release) => resolve(release))
      })
      .catch(() => resolve(null))
  })
}

async function recoverOrphans(
  snapshot: ProgressSnapshot,
): Promise<ProgressSnapshot> {
  const active = recognitionSessions(snapshot).filter(
    ({ status }) => status === 'in-progress',
  )
  if (active.length === 0) return snapshot
  const { held } = await window.navigator.locks.query()
  const owners = new Set(held?.map(({ name }) => name))
  const orphanIds = active
    .filter(({ id }) => !owners.has(`${SESSION_LOCK_PREFIX}${id}`))
    .map(({ id }) => id)
  return orphanIds.length === 0
    ? snapshot
    : abandonRecognitionSessions(snapshot, orphanIds)
}

export function recoverInterruptedPractice() {
  return withProgressLock(async (storage) => {
    const { snapshot, error } = readProgress(storage)
    if (error !== null) return { ok: false, error }
    const recovered = await recoverOrphans(snapshot)
    return recovered === snapshot || saveProgress(storage, recovered)
      ? { ok: true }
      : { ok: false, error: 'write-failed' }
  })
}

function errorMessage(error: ProgressError, started: boolean): string {
  if (error === 'session-missing')
    return 'El historial de esta ronda ya no está disponible. Puedes terminarla sin guardar. El progreso volverá a guardarse al comenzar otra sesión.'
  if (error === 'coordination-unavailable')
    return 'El guardado de progreso no está disponible en este navegador. Puedes jugar, pero esta ronda no se guardará.'
  if (error === 'invalid-data' || error === 'unsupported-version')
    return 'No se puede actualizar el historial existente. Se ha conservado sin cambios. Puedes seguir jugando sin guardar.'
  return started
    ? 'Hay resultados pendientes de guardar. Puedes seguir jugando y reintentar antes de empezar otra ronda o salir de esta página.'
    : 'No se ha podido iniciar el guardado del progreso. Puedes jugar, pero esta ronda no se guardará.'
}

export function createPracticeRecorder(
  syllabary: SyllabarySlug,
  filters: PracticeFilters,
  notify: (notice: PracticeStorageNotice) => void,
): PracticeRecorder {
  let id = ''
  let releaseOwner: (() => void) | null = null
  let started = false
  let disabled = false
  let closed = false
  const answers: PracticeAnswer[] = []
  const startedAt = new Date().toISOString()

  const release = () => {
    releaseOwner?.()
    releaseOwner = null
  }
  const report = (error: ProgressError) => {
    if (error === 'session-missing' || !started) {
      disabled = true
      release()
    }
    notify({ message: errorMessage(error, started), canRetry: !disabled })
  }

  const ready = withProgressLock(async (storage) => {
    const { snapshot, error } = readProgress(storage)
    if (error !== null) return { ok: false, error }
    id = crypto.randomUUID()
    const session = createRecognitionSession(id, syllabary, filters, startedAt)
    releaseOwner = await holdSessionLock(id)
    if (!releaseOwner) return { ok: false, error: 'unavailable' }
    const recovered = await recoverOrphans(snapshot)
    return saveProgress(storage, addRecognitionSession(recovered, session))
      ? { ok: true }
      : { ok: false, error: 'write-failed' }
  }).then((result) => {
    if (!result.ok) report(result.error)
    else {
      started = true
      notify(null)
    }
  })

  let pending = ready

  const flush = async (endedAt?: string) => {
    if (disabled) return
    let terminal = false
    const result = await withProgressLock((storage) => {
      const { snapshot, error } = readProgress(storage)
      if (error !== null) return { ok: false, error }
      if (!recognitionSessions(snapshot).some((session) => session.id === id)) {
        return { ok: false, error: 'session-missing' }
      }
      let next: ProgressSnapshot
      try {
        next = applyPracticeAnswers(snapshot, id, answers)
        if (endedAt) next = abandonRecognitionSessions(next, [id], endedAt)
      } catch {
        return { ok: false, error: 'invalid-data' }
      }
      terminal =
        recognitionSessions(next).find((session) => session.id === id)
          ?.status !== 'in-progress'
      return next === snapshot || saveProgress(storage, next)
        ? { ok: true }
        : { ok: false, error: 'write-failed' }
    })
    if (disabled) return
    if (!result.ok) report(result.error)
    else {
      notify(null)
      if (terminal) release()
    }
  }

  const enqueue = (endedAt?: string) => {
    pending = pending.then(() => flush(endedAt))
    return pending
  }

  const checkDeletion = (event: StorageEvent) => {
    if (event.key !== null && event.key !== PROGRESS_STORAGE_KEY) return
    void ready.then(() => {
      if (disabled || closed || !started) return
      try {
        const { snapshot, error } = readProgress(window.localStorage)
        if (
          error === null &&
          !recognitionSessions(snapshot).some((session) => session.id === id)
        )
          report('session-missing')
      } catch {}
    })
  }
  if (typeof window !== 'undefined')
    window.addEventListener('storage', checkDeletion)

  return {
    ready,
    answer(index, kana, isCorrect, date = new Date()) {
      if (
        closed ||
        disabled ||
        answers.some((answer) => answer.index === index)
      )
        return pending
      answers.push({
        index,
        kana,
        isCorrect,
        answeredAt: date.toISOString(),
        activityDay: localDay(date),
      })
      return enqueue()
    },
    retry() {
      return closed ? pending : enqueue()
    },
    async close() {
      if (closed) return pending
      closed = true
      if (typeof window !== 'undefined')
        window.removeEventListener('storage', checkDeletion)
      try {
        await enqueue(new Date().toISOString())
      } finally {
        release()
      }
    },
  }
}
