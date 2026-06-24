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
