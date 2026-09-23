import type { SyllabarySlug } from '@/lib/routes'
import {
  applyLearningView,
  emptyProgress,
  isProgressSnapshot,
  isRecord,
  localDay,
  type ProgressSnapshot,
} from './progress'

export const PROGRESS_STORAGE_KEY = 'kirakana.progress.v1'
const PROGRESS_LOCK = 'kirakana.progress'

type ProgressStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

export type ProgressError =
  | 'unavailable'
  | 'invalid-data'
  | 'unsupported-version'
  | 'write-failed'
  | 'coordination-unavailable'
  | 'session-missing'

type ReadResult =
  | { snapshot: ProgressSnapshot; error: null }
  | { snapshot: null; error: ProgressError }

export type WriteResult = { ok: true } | { ok: false; error: ProgressError }

export function readProgress(
  storage: Pick<ProgressStorage, 'getItem'>,
): ReadResult {
  let raw: string | null
  try {
    raw = storage.getItem(PROGRESS_STORAGE_KEY)
  } catch {
    return { snapshot: null, error: 'unavailable' }
  }

  if (raw === null) return { snapshot: emptyProgress(), error: null }

  let snapshot: unknown
  try {
    snapshot = JSON.parse(raw)
  } catch {
    return { snapshot: null, error: 'invalid-data' }
  }

  if (isRecord(snapshot) && 'version' in snapshot && snapshot.version !== 1) {
    return { snapshot: null, error: 'unsupported-version' }
  }
  if (!isProgressSnapshot(snapshot)) {
    return { snapshot: null, error: 'invalid-data' }
  }

  return { snapshot, error: null }
}

export function saveProgress(
  storage: Pick<ProgressStorage, 'setItem'>,
  snapshot: ProgressSnapshot,
): boolean {
  if (!isProgressSnapshot(snapshot)) return false
  try {
    storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(snapshot))
    return true
  } catch {
    return false
  }
}

export function clearProgress(
  storage: Pick<ProgressStorage, 'removeItem'>,
): boolean {
  try {
    storage.removeItem(PROGRESS_STORAGE_KEY)
    return true
  } catch {
    return false
  }
}

export async function withProgressLock(
  update: (storage: ProgressStorage) => WriteResult | Promise<WriteResult>,
): Promise<WriteResult> {
  try {
    if (typeof window === 'undefined')
      return { ok: false, error: 'unavailable' }
    if (!window.navigator.locks) {
      return { ok: false, error: 'coordination-unavailable' }
    }

    return await window.navigator.locks.request(PROGRESS_LOCK, () =>
      update(window.localStorage),
    )
  } catch {
    return { ok: false, error: 'unavailable' }
  }
}

export function recordLearningView(
  syllabary: SyllabarySlug,
  kana: string,
  date = new Date(),
): Promise<WriteResult> {
  if (!Number.isFinite(date.getTime())) {
    return Promise.resolve({ ok: false, error: 'invalid-data' })
  }

  const viewedAt = date.toISOString()
  const activityDay = localDay(date)

  return withProgressLock((storage) => {
    const { snapshot, error } = readProgress(storage)
    if (error !== null) return { ok: false, error }

    let next: ProgressSnapshot
    try {
      next = applyLearningView(snapshot, syllabary, kana, viewedAt, activityDay)
    } catch {
      return { ok: false, error: 'invalid-data' }
    }

    return saveProgress(storage, next)
      ? { ok: true }
      : { ok: false, error: 'write-failed' }
  })
}

export function clearStoredProgress(): Promise<WriteResult> {
  return withProgressLock((storage) =>
    clearProgress(storage)
      ? { ok: true }
      : { ok: false, error: 'write-failed' },
  )
}

export function learningStorageMessage(error: ProgressError): string {
  switch (error) {
    case 'invalid-data':
      return 'No se ha guardado esta consulta porque el historial tiene datos que no se pueden leer. El historial existente se ha conservado.'
    case 'unsupported-version':
      return 'No se ha guardado esta consulta porque el historial pertenece a otra versión de KiraKana. El historial existente se ha conservado.'
    case 'coordination-unavailable':
      return 'El guardado de progreso no está disponible en este navegador. Puedes seguir aprendiendo sin guardar el progreso.'
    default:
      return 'No se ha podido guardar esta consulta. Comprueba que el navegador permite guardar datos del sitio y que tiene espacio disponible. Puedes seguir aprendiendo.'
  }
}
