import { KANA_GROUP_DEFINITIONS } from '@/features/data/groups'
import { syllabaries } from '@/features/data/syllabaries'
import { createPracticeGroupUrl, type SyllabarySlug } from '@/lib/routes'
import {
  type RecognitionSession,
  recognitionProgress,
  recognitionSessions,
} from './practiceProgress'
import { localDay, type ProgressSnapshot } from './progress'

export const percent = (value: number | null) =>
  value === null
    ? 'Sin respuestas'
    : new Intl.NumberFormat('es', {
        style: 'percent',
        maximumFractionDigits: 1,
      }).format(value)

export const dateTime = (value: string) =>
  new Intl.DateTimeFormat('es', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))

export function accuracy(correct: number, incorrect: number): number | null {
  return correct + incorrect === 0 ? null : correct / (correct + incorrect)
}

export function estimatedMastery(correct: number, incorrect: number): boolean {
  const attempts = correct + incorrect
  return attempts >= 10 && correct / attempts >= 0.8
}

const compare = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0)

function shiftDay(day: string, offset: number): string {
  const date = new Date(`${day}T12:00:00.000Z`)
  date.setUTCDate(date.getUTCDate() + offset)
  return date.toISOString().slice(0, 10)
}

export function activityMetrics(days: readonly string[], now = new Date()) {
  const today = localDay(now)
  const ordered = [...new Set(days)].filter((day) => day <= today).sort()
  const active = new Set(ordered)
  let best = 0
  let run = 0
  let previous = ''
  for (const day of ordered) {
    run = previous && shiftDay(previous, 1) === day ? run + 1 : 1
    best = Math.max(best, run)
    previous = day
  }
  let current = 0
  let cursor = active.has(today) ? today : shiftDay(today, -1)
  while (active.has(cursor)) {
    current++
    cursor = shiftDay(cursor, -1)
  }
  return {
    current,
    best,
  }
}

export function recentAccuracy(
  sessions: RecognitionSession[],
  syllabary: SyllabarySlug,
) {
  const recent = sessions
    .filter(
      (session) =>
        session.syllabary === syllabary &&
        session.status !== 'in-progress' &&
        session.correct + session.incorrect > 0,
    )
    .sort(
      (a, b) =>
        compare(b.endedAt ?? '', a.endedAt ?? '') || compare(a.id, b.id),
    )
    .slice(0, 10)
  if (recent.length < 10) return null
  const totals = [recent.slice(0, 5), recent.slice(5)].map((block) =>
    block.reduce(
      (sum, session) => ({
        correct: sum.correct + session.correct,
        incorrect: sum.incorrect + session.incorrect,
      }),
      { correct: 0, incorrect: 0 },
    ),
  )
  if (totals.some(({ correct, incorrect }) => correct + incorrect < 20))
    return null
  const [latest, previous] = totals.map(
    ({ correct, incorrect }) => accuracy(correct, incorrect) as number,
  ) as [number, number]
  return { latest, previous, difference: (latest - previous) * 100 }
}

export function progressMetrics(snapshot: ProgressSnapshot, now = new Date()) {
  const practice = recognitionProgress(snapshot)
  const sessions = recognitionSessions(snapshot).sort(
    (a, b) => compare(b.startedAt, a.startedAt) || compare(a.id, b.id),
  )
  const summaries = syllabaries.map((syllabary) => {
    const characters = syllabary.kana.map((item) => {
      const learning = snapshot.learning[syllabary.slug][item.kana]
      const stats = practice.characters[syllabary.slug][item.kana]
      const correct = stats?.correct ?? 0
      const incorrect = stats?.incorrect ?? 0
      const group = KANA_GROUP_DEFINITIONS[item.group]
      return {
        ...item,
        syllabary: syllabary.slug,
        learning,
        correct,
        incorrect,
        attempts: correct + incorrect,
        accuracy: accuracy(correct, incorrect),
        mastered: estimatedMastery(correct, incorrect),
        lastPracticedAt: stats?.lastPracticedAt,
        practiceUrl: createPracticeGroupUrl({
          mode: 'reconocimiento',
          syllabary: syllabary.slug,
          group: group.slug,
          level: group.recommendedPracticeLevel,
        }),
      }
    })
    const consulted = characters.filter(
      (character): character is typeof character & {
        learning: NonNullable<(typeof character)['learning']>
      } => character.learning !== undefined,
    )
    return {
      syllabary,
      characters,
      consulted: consulted.length,
      practiced: characters.filter(({ attempts }) => attempts > 0).length,
      mastered: characters.filter(({ mastered }) => mastered).length,
      correct: characters.reduce((sum, item) => sum + item.correct, 0),
      incorrect: characters.reduce((sum, item) => sum + item.incorrect, 0),
      lastViewed: consulted.sort(
        (a, b) =>
          compare(b.learning.lastViewedAt, a.learning.lastViewedAt) ||
          compare(a.kana, b.kana),
      )[0],
      recent: recentAccuracy(sessions, syllabary.slug),
    }
  })
  const characters = summaries.flatMap(({ characters }) => characters)
  const correct = summaries.reduce((sum, item) => sum + item.correct, 0)
  const incorrect = summaries.reduce((sum, item) => sum + item.incorrect, 0)
  return {
    summaries,
    total: characters.length,
    consulted: summaries.reduce((sum, item) => sum + item.consulted, 0),
    practiced: summaries.reduce((sum, item) => sum + item.practiced, 0),
    attempts: correct + incorrect,
    accuracy: accuracy(correct, incorrect),
    activity: activityMetrics(snapshot.activityDays, now),
    review: characters
      .filter(({ incorrect }) => incorrect > 0)
      .sort(
        (a, b) =>
          a.correct / a.attempts - b.correct / b.attempts ||
          b.incorrect - a.incorrect ||
          compare(a.syllabary, b.syllabary) ||
          compare(a.kana, b.kana),
      )
      .slice(0, 5),
    sessions,
    completed: sessions.filter(({ status }) => status === 'completed').length,
  }
}

export type ProgressMetrics = ReturnType<typeof progressMetrics>
export type KanaProgress =
  ProgressMetrics['summaries'][number]['characters'][number]
export type KanaFilter =
  | 'all'
  | 'consulted'
  | 'unpracticed'
  | 'practicing'
  | 'mastered'
  | 'errors'

export function matchesKanaFilter(
  item: KanaProgress,
  filter: KanaFilter,
): boolean {
  switch (filter) {
    case 'consulted':
      return Boolean(item.learning)
    case 'unpracticed':
      return item.attempts === 0
    case 'practicing':
      return item.attempts > 0 && !item.mastered
    case 'mastered':
      return item.mastered
    case 'errors':
      return item.incorrect > 0
    default:
      return true
  }
}
