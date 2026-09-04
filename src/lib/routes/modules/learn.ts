import type { AppRoute, SyllabarySlug } from '../core'

const BASE = '/aprender'

export const learnRoutes = {
  index: (): AppRoute => `${BASE}/`,
  syllabary: (syllabary: SyllabarySlug | string): AppRoute =>
    `${BASE}/${syllabary}/`,
} as const

export const learnRoutesLabels: Record<string, string> = {
  '/aprender/': 'Aprender',
  '/aprender/hiragana/': 'Hiragana',
  '/aprender/katakana/': 'Katakana',
}
