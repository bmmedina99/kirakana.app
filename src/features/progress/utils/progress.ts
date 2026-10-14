import { syllabaries } from '@/features/data/syllabaries'
import type { SyllabarySlug } from '@/lib/routes'
import { isPracticeProgress } from './practiceProgress'
import { isInstant, isLocalDay, isRecord } from './validation'

export { isRecord } from './validation'

export type LearningEntry = {
  firstViewedAt: string
  lastViewedAt: string
}

export type ProgressSnapshot = {
  version: 1
  learning: Record<SyllabarySlug, Record<string, LearningEntry>>
  activityDays: string[]
  practice?: Record<string, unknown>
  sessions?: Record<string, unknown>[]
  [key: string]: unknown
}

const kanaBySyllabary = new Map(
  syllabaries.map(({ slug, kana }) => [
    slug,
    new Set(kana.map((item) => item.kana)),
  ]),
)

export function emptyProgress(): ProgressSnapshot {
  return {
    version: 1,
    learning: { hiragana: {}, katakana: {} },
    activityDays: [],
  }
}

export function isProgressSnapshot(value: unknown): value is ProgressSnapshot {
  if (!isRecord(value) || value.version !== 1 || !isRecord(value.learning)) {
    return false
  }

  if (
    !Array.isArray(value.activityDays) ||
    !value.activityDays.every(isLocalDay) ||
    new Set(value.activityDays).size !== value.activityDays.length ||
    Object.keys(value.learning).some(
      (slug) => slug !== 'hiragana' && slug !== 'katakana',
    )
  ) {
    return false
  }

  for (const { slug } of syllabaries) {
    const entries = value.learning[slug]
    if (!isRecord(entries)) return false

    for (const [kana, entry] of Object.entries(entries)) {
      if (
        !kanaBySyllabary.get(slug)?.has(kana) ||
        !isRecord(entry) ||
        !isInstant(entry.firstViewedAt) ||
        !isInstant(entry.lastViewedAt) ||
        entry.firstViewedAt > entry.lastViewedAt
      ) {
        return false
      }
    }
  }

  return isPracticeProgress(value)
}

export function localDay(date: Date): string {
  const year = String(date.getFullYear()).padStart(4, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function applyLearningView(
  snapshot: ProgressSnapshot,
  syllabary: SyllabarySlug,
  kana: string,
  viewedAt: string,
  activityDay: string,
): ProgressSnapshot {
  if (
    !kanaBySyllabary.get(syllabary)?.has(kana) ||
    !isInstant(viewedAt) ||
    !isLocalDay(activityDay)
  ) {
    throw new Error('Índice de respuesta inválido')
  }

  const previous = snapshot.learning[syllabary][kana]

  return {
    ...snapshot,
    learning: {
      ...snapshot.learning,
      [syllabary]: {
        ...snapshot.learning[syllabary],
        [kana]: {
          ...previous,
          firstViewedAt: previous?.firstViewedAt ?? viewedAt,
          lastViewedAt:
            previous && previous.lastViewedAt > viewedAt
              ? previous.lastViewedAt
              : viewedAt,
        },
      },
    },
    activityDays: [...new Set([...snapshot.activityDays, activityDay])].sort(),
  }
}
