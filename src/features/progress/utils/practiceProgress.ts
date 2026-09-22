import { syllabaries } from '@/features/data/syllabaries'
import { getKanaForPractice } from '@/features/practice/utils/getKanaForPractice'
import {
  isPracticeLevel,
  MAX_PRACTICE_LIVES,
  type PracticeFilters,
} from '@/features/practice/utils/practiceSession'
import type { SyllabarySlug } from '@/lib/routes'
import type { ProgressSnapshot } from './progress'
import { isCount, isInstant, isLocalDay, isRecord } from './validation'

export const RECOGNITION_MODE = 'reconocimiento'

export type PracticeCharacter = {
  correct: number
  incorrect: number
  lastPracticedAt: string
}

export type RecognitionProgress = {
  characters: Record<SyllabarySlug, Record<string, PracticeCharacter>>
  [key: string]: unknown
}

export type RecognitionSession = {
  id: string
  mode: typeof RECOGNITION_MODE
  syllabary: SyllabarySlug
  filters: PracticeFilters
  targetCount: number
  maxLives: number
  startedAt: string
  lastActivityAt: string
  endedAt: string | null
  status: 'in-progress' | 'completed' | 'out-of-lives' | 'abandoned'
  correct: number
  incorrect: number
}

export type PracticeAnswer = {
  index: number
  kana: string
  isCorrect: boolean
  answeredAt: string
  activityDay: string
}

function emptyRecognition(): RecognitionProgress {
  return { characters: { hiragana: {}, katakana: {} } }
}

export function recognitionProgress(
  snapshot: ProgressSnapshot,
): RecognitionProgress {
  return (
    (snapshot.practice?.[RECOGNITION_MODE] as
      | RecognitionProgress
      | undefined) ?? emptyRecognition()
  )
}

export function recognitionSessions(
  snapshot: ProgressSnapshot,
): RecognitionSession[] {
  return (snapshot.sessions ?? []).filter(
    (session) => session.mode === RECOGNITION_MODE,
  ) as RecognitionSession[]
}

export function isRecognitionSession(
  value: Record<string, unknown>,
): value is RecognitionSession {
  const syllabary = syllabaries.find(({ slug }) => slug === value.syllabary)
  const filters = value.filters
  if (
    !syllabary ||
    value.mode !== RECOGNITION_MODE ||
    typeof value.id !== 'string' ||
    value.id.length === 0 ||
    !isRecord(filters) ||
    typeof filters.level !== 'string' ||
    !isPracticeLevel(filters.level) ||
    (filters.group !== null &&
      !syllabary.groups.some(({ slug }) => slug === filters.group)) ||
    !isCount(value.correct) ||
    !isCount(value.incorrect) ||
    !isCount(value.targetCount) ||
    value.targetCount === 0 ||
    value.targetCount > syllabary.kana.length ||
    !isCount(value.maxLives) ||
    value.maxLives === 0 ||
    !isInstant(value.startedAt) ||
    !isInstant(value.lastActivityAt) ||
    value.lastActivityAt < value.startedAt
  )
    return false

  const attempts = value.correct + value.incorrect
  if (attempts > value.targetCount || value.incorrect > value.maxLives)
    return false
  if (value.status === 'in-progress') {
    return (
      value.endedAt === null &&
      attempts < value.targetCount &&
      value.incorrect < value.maxLives
    )
  }
  if (!isInstant(value.endedAt) || value.endedAt < value.lastActivityAt)
    return false
  if (value.status === 'completed')
    return attempts === value.targetCount && value.incorrect < value.maxLives
  if (value.status === 'out-of-lives') return value.incorrect === value.maxLives
  return (
    value.status === 'abandoned' &&
    attempts < value.targetCount &&
    value.incorrect < value.maxLives
  )
}

export function isPracticeProgress(value: Record<string, unknown>): boolean {
  if ('practice' in value && !isRecord(value.practice)) return false
  if ('sessions' in value && !Array.isArray(value.sessions)) return false
  const sessions = value.sessions ?? []
  if (!Array.isArray(sessions)) return false
  const ids = new Set<string>()
  const totals = {
    hiragana: { correct: 0, incorrect: 0 },
    katakana: { correct: 0, incorrect: 0 },
  }
  for (const session of sessions) {
    if (
      !isRecord(session) ||
      typeof session.id !== 'string' ||
      !session.id ||
      typeof session.mode !== 'string' ||
      !session.mode ||
      ids.has(session.id)
    )
      return false
    ids.add(session.id)
    if (session.mode !== RECOGNITION_MODE) continue
    if (!isRecognitionSession(session)) return false
    totals[session.syllabary].correct += session.correct
    totals[session.syllabary].incorrect += session.incorrect
  }

  const practice = isRecord(value.practice)
    ? value.practice[RECOGNITION_MODE]
    : undefined
  if (practice === undefined)
    return Object.values(totals).every(
      ({ correct, incorrect }) => correct + incorrect === 0,
    )
  if (!isRecord(practice) || !isRecord(practice.characters)) return false
  if (
    Object.keys(practice.characters).some(
      (slug) => slug !== 'hiragana' && slug !== 'katakana',
    )
  )
    return false
  for (const syllabary of syllabaries) {
    const characters = practice.characters[syllabary.slug]
    if (!isRecord(characters)) return false
    let correct = 0
    let incorrect = 0
    for (const [kana, stats] of Object.entries(characters)) {
      if (
        !syllabary.kana.some((item) => item.kana === kana) ||
        !isRecord(stats) ||
        !isCount(stats.correct) ||
        !isCount(stats.incorrect) ||
        stats.correct + stats.incorrect === 0 ||
        !isInstant(stats.lastPracticedAt)
      )
        return false
      correct += stats.correct
      incorrect += stats.incorrect
    }
    if (
      correct !== totals[syllabary.slug].correct ||
      incorrect !== totals[syllabary.slug].incorrect
    )
      return false
  }
  return true
}

export function createRecognitionSession(
  id: string,
  syllabary: SyllabarySlug,
  filters: PracticeFilters,
  startedAt: string,
): RecognitionSession {
  const session: RecognitionSession = {
    id,
    mode: RECOGNITION_MODE,
    syllabary,
    filters: { ...filters },
    targetCount: getKanaForPractice({ syllabary, ...filters }).length,
    maxLives: MAX_PRACTICE_LIVES,
    startedAt,
    lastActivityAt: startedAt,
    endedAt: null,
    status: 'in-progress',
    correct: 0,
    incorrect: 0,
  }
  if (!isRecognitionSession(session))
    throw new Error('Sesión de práctica de reconocimiento inválida')
  return session
}

export function addRecognitionSession(
  snapshot: ProgressSnapshot,
  session: RecognitionSession,
): ProgressSnapshot {
  if (snapshot.sessions?.some(({ id }) => id === session.id))
    throw new Error('Sesión duplicada')
  return {
    ...snapshot,
    practice: {
      ...snapshot.practice,
      [RECOGNITION_MODE]: recognitionProgress(snapshot),
    },
    sessions: [...(snapshot.sessions ?? []), session],
  }
}

export function applyPracticeAnswers(
  snapshot: ProgressSnapshot,
  id: string,
  answers: readonly PracticeAnswer[],
): ProgressSnapshot {
  const stored = recognitionSessions(snapshot).find(
    (session) => session.id === id,
  )
  if (!stored) throw new Error('Sesión faltante')
  let session = { ...stored }
  const practice = recognitionProgress(snapshot)
  const characters = { ...practice.characters[session.syllabary] }
  const activityDays = new Set(snapshot.activityDays)
  const pool = getKanaForPractice({
    syllabary: session.syllabary,
    ...session.filters,
  })
  let changed = false
  for (const answer of answers) {
    if (!isCount(answer.index) || answer.index === 0)
      throw new Error('Índice de respuesta inválido')
    if (answer.index <= session.correct + session.incorrect) continue
    if (
      session.status !== 'in-progress' ||
      answer.index !== session.correct + session.incorrect + 1 ||
      !pool.some(({ kana }) => kana === answer.kana) ||
      typeof answer.isCorrect !== 'boolean' ||
      !isInstant(answer.answeredAt) ||
      !isLocalDay(answer.activityDay)
    )
      throw new Error('Respuesta de práctica inválida')

    const correct = Number(answer.isCorrect)
    const incorrect = Number(!answer.isCorrect)
    const previous = characters[answer.kana]
    characters[answer.kana] = {
      ...previous,
      correct: (previous?.correct ?? 0) + correct,
      incorrect: (previous?.incorrect ?? 0) + incorrect,
      lastPracticedAt:
        previous && previous.lastPracticedAt > answer.answeredAt
          ? previous.lastPracticedAt
          : answer.answeredAt,
    }
    session = {
      ...session,
      correct: session.correct + correct,
      incorrect: session.incorrect + incorrect,
      lastActivityAt:
        session.lastActivityAt > answer.answeredAt
          ? session.lastActivityAt
          : answer.answeredAt,
    }
    if (session.incorrect === session.maxLives) session.status = 'out-of-lives'
    else if (session.correct + session.incorrect === session.targetCount)
      session.status = 'completed'
    if (session.status !== 'in-progress')
      session.endedAt = session.lastActivityAt
    activityDays.add(answer.activityDay)
    changed = true
  }
  if (!changed) return snapshot
  return {
    ...snapshot,
    practice: {
      ...snapshot.practice,
      [RECOGNITION_MODE]: {
        ...practice,
        characters: { ...practice.characters, [session.syllabary]: characters },
      },
    },
    sessions:
      snapshot.sessions?.map((item) => (item.id === id ? session : item)) ?? [],
    activityDays: [...activityDays].sort(),
  }
}

export function abandonRecognitionSessions(
  snapshot: ProgressSnapshot,
  ids: readonly string[],
  endedAt?: string,
): ProgressSnapshot {
  return {
    ...snapshot,
    sessions: (snapshot.sessions ?? []).map((item) => {
      if (
        item.mode !== RECOGNITION_MODE ||
        item.status !== 'in-progress' ||
        !ids.includes(String(item.id))
      )
        return item
      const session = item as RecognitionSession
      return {
        ...session,
        status: 'abandoned',
        endedAt:
          endedAt && endedAt > session.lastActivityAt
            ? endedAt
            : session.lastActivityAt,
      }
    }),
  }
}
