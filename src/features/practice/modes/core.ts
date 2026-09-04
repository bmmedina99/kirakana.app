import type { KanaItem } from '@/features/data/groups'
import type { PracticeModeSlug, SyllabarySlug } from '@/lib/routes'

export type PracticeIslandType = 'recognition' | 'listening' | 'writing'

export type PracticeModeStatus = 'disponible' | 'proximamente'

export type PracticeModeDecoration = {
  type: 'recognition-card'
  backgroundKana: string
  cards: Array<{
    kana: string
    rotation: string
  }>
}

export interface PracticeMode {
  slug: PracticeModeSlug
  name: string
  description: string
  longDescription: string
  supportedSyllabaries: SyllabarySlug[]
  island: PracticeIslandType
  status: PracticeModeStatus
  disabledReason: string
  icon: string
  decoration: PracticeModeDecoration
  theme: { buttonClass: string }
  teaches: string[]
}

export function shuffle<T>(array: readonly T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffled[i]
    shuffled[i] = shuffled[j] as T
    shuffled[j] = temp as T
  }
  return shuffled
}

export function Options(correctRomanji: string, pool: KanaItem[]): string[] {
  const opts = new Set<string>([correctRomanji])
  while (opts.size < 4 && pool.length > 0) {
    const pick = pool[(Math.random() * pool.length) | 0]?.romaji
    if (pick) opts.add(pick)
  }
  return shuffle([...opts])
}
