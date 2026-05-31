import type { SyllabarySlug } from '@/lib/routes'
import type { KanaGroup, KanaItem } from './groups'
import { hiraganaGroups, hiraganaKana } from './hiragana'
import { katakanaGroups, katakanaKana } from './katakana'

export type Syllabary = {
  slug: SyllabarySlug
  name: string
  japaneseName: string
  description: string
  longDescription: string
  groups: KanaGroup[]
  kana: KanaItem[]
}

export const syllabaries: Syllabary[] = [
  {
    slug: 'hiragana',
    name: 'Hiragana',
    japaneseName: 'ひらがな',
    description:
      'El silabario básico usado para palabras japonesas nativas, partículas y formas gramaticales.',
    longDescription:
      'Hiragana es uno de los dos silabarios principales del japonés. Es ideal para empezar porque aparece en partículas, terminaciones gramaticales y palabras nativas.',
    groups: hiraganaGroups,
    kana: hiraganaKana,
  },
  {
    slug: 'katakana',
    name: 'Katakana',
    japaneseName: 'カタカナ',
    description:
      'El silabario usado para palabras extranjeras, nombres, préstamos lingüísticos y énfasis.',
    longDescription:
      'Katakana se usa principalmente para palabras extranjeras, nombres propios, sonidos, préstamos lingüísticos y énfasis visual dentro del japonés.',
    groups: katakanaGroups,
    kana: katakanaKana,
  },
]

export function getSyllabaryBySlug(slug: string): Syllabary | undefined {
  return syllabaries.find((syllabary) => syllabary.slug === slug)
}

export function getSyllabaryKana(slug: string): KanaItem[] {
  return getSyllabaryBySlug(slug)?.kana ?? []
}
