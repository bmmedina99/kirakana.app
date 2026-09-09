import type { KanaGroup, KanaGroupSlug, KanaItem } from '@/features/data/groups'
import type { PracticeLevel } from '@/lib/routes'
import { shuffle } from '../modes/core'

export const DEFAULT_PRACTICE_LEVEL: PracticeLevel = 'basico'
export const MAX_PRACTICE_LIVES = 5

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

export type SessionEndReason = 'completed' | 'out-of-lives'

type ResolvePracticeTurnOptions = {
  isCorrect: boolean
  isLastQuestion: boolean
  remainingLives: number
}

export type PracticeTurnResult = {
  endReason: SessionEndReason | null
  remainingLives: number
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

export function resolvePracticeTurn({
  isCorrect,
  isLastQuestion,
  remainingLives,
}: ResolvePracticeTurnOptions): PracticeTurnResult {
  const nextRemainingLives = isCorrect
    ? remainingLives
    : Math.max(remainingLives - 1, 0)

  const endReason =
    nextRemainingLives === 0
      ? 'out-of-lives'
      : isLastQuestion
        ? 'completed'
        : null

  return {
    endReason,
    remainingLives: nextRemainingLives,
  }
}
