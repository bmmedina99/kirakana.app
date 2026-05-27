import {
  type AppRoute,
  buildUrl,
  type PracticeGroupUrlParams,
  type PracticeModeSlug,
  type SyllabarySlug,
} from '../core'

const BASE = '/practicar'

export const practiceRoutes = {
  index: (): AppRoute => `${BASE}/`,
  mode: (mode: PracticeModeSlug | string): AppRoute => `${BASE}/${mode}/`,
  modeSyllabary: (
    mode: PracticeModeSlug | string,
    syllabary: SyllabarySlug | string,
  ): AppRoute => `${BASE}/${mode}/${syllabary}/`,
} as const

export function createPracticeGroupUrl({
  mode,
  syllabary,
  group,
  level,
}: PracticeGroupUrlParams): string {
  return buildUrl(practiceRoutes.modeSyllabary(mode, syllabary), {
    grupo: group ?? '',
    nivel: level ?? '',
  })
}

export const practiceRoutesLabels: Record<string, string> = {
  '/practicar/': 'Practicar',
  '/practicar/reconocimiento/': 'Reconocimiento',
  '/practicar/reconocimiento/hiragana/': 'Hiragana',
  '/practicar/reconocimiento/katakana/': 'Katakana',
}
