import type { KanaGroup, KanaGroupSlug, KanaItem } from '@/features/data/groups'
import type { PracticeLevel } from '@/lib/routes'
import { shuffle } from '../modes/core'

export const DEFAULT_PRACTICE_LEVEL: PracticeLevel = 'basico'

export const PRACTICE_LEVELS: PracticeLevel[] = [
  'basico',
  'intermedio',
  'completo',
]

export const PRACTICE_LEVEL_LABELS: Record<PracticeLevel, string> = {
  basico: 'Básico',
  intermedio: 'Intermedio',
  completo: 'Completo',
}

export type PracticeFilters = {
  group: KanaGroupSlug | null
  level: PracticeLevel
}

export type ResolvedPracticeFilters = PracticeFilters & {
  invalidGroup: string | null
  invalidLevel: string | null
}

export function isPracticeLevel(value: string): value is PracticeLevel {
  return PRACTICE_LEVELS.some((level) => level === value)
}

export function resolvePracticeFilters(
  search: string,
  validGroups: readonly Pick<KanaGroup, 'slug' | 'recommendedPracticeLevel'>[],
): ResolvedPracticeFilters {
  const params = new URLSearchParams(search)
  const requestedGroup = params.get('group')
  const requestedLevel = params.get('level')
  const selectedGroup = validGroups.find(({ slug }) => slug === requestedGroup)
  const group = selectedGroup?.slug ?? null
  const level =
    requestedLevel && isPracticeLevel(requestedLevel)
      ? requestedLevel
      : (selectedGroup?.recommendedPracticeLevel ?? DEFAULT_PRACTICE_LEVEL)

  return {
    group,
    level,
    invalidGroup: requestedGroup && !group ? requestedGroup : null,
    invalidLevel:
      requestedLevel && !isPracticeLevel(requestedLevel)
        ? requestedLevel
        : null,
  }
}

export function createPracticeOptions(
  currentKana: KanaItem,
  pool: readonly KanaItem[],
): string[] {
  const alternatives = [
    ...new Set(
      pool
        .map((item) => item.romaji)
        .filter((romaji) => romaji !== currentKana.romaji),
    ),
  ]

  return shuffle([currentKana.romaji, ...shuffle(alternatives).slice(0, 3)])
}

export function createPracticeSession(pool: readonly KanaItem[]): KanaItem[] {
  return shuffle(pool)
}
