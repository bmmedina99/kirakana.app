import type { AppRoute, PracticeModeSlug, SyllabarySlug } from '../core'

const BASE = '/practicar'

export const practiceRoutes = {
  index: (): AppRoute => `${BASE}/`,
  mode: (mode: PracticeModeSlug): AppRoute => `${BASE}/${mode}/`,
  modesyllabary: (mode: PracticeModeSlug, syllabary: SyllabarySlug): AppRoute =>
    `${BASE}/${mode}/${syllabary}/`,
} as const

export const practiceRoutesLabels: Record<string, string> = {
  '/practicar/': 'Practicar',
  '/aprender/hiragana/': 'Hiragana',
  '/aprender/katakana/': 'Katakana',
}
