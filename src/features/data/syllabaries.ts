import type { SyllabarySlug } from '@/lib/routes'
import type { KanaGroup, KanaItem } from './groups'
import { hiraganaGroups, hiraganaKana } from './hiragana'
import { katakanaGroups, katakanaKana } from './katakana'

type SyllabaryTheme = {
  accentClass: string
  buttonClass: string
  badgeClass: string
}

export type Syllabary = {
  slug: SyllabarySlug
  name: string
  japaneseName: string
  description: string
  longDescription: string
  previewKana: Array<{
    kana: string
    romaji: string
  }>
  iconKana: string
  theme: SyllabaryTheme
  groups: KanaGroup[]
  kana: KanaItem[]
}

export const syllabaries: Syllabary[] = [
  {
    slug: 'hiragana',
    name: 'Hiragana',
    japaneseName: 'ひらがな',
    description:
      'El silabario básico que representa los sonidos nativos del japonés.',
    longDescription:
      'Hiragana es uno de los dos silabarios principales del japonés. Es ideal para empezar porque aparece en partículas, terminaciones gramaticales y palabras nativas.',
    previewKana: [
      { kana: 'あ', romaji: 'a' },
      { kana: 'い', romaji: 'i' },
      { kana: 'う', romaji: 'u' },
      { kana: 'え', romaji: 'e' },
      { kana: 'お', romaji: 'o' },
    ],
    iconKana: 'hiragana',
    theme: {
      accentClass: 'text-ochre-200',
      buttonClass: 'bg-ochre-200 btn w-full shadow-ochre-200 text-mauve-50',
      badgeClass: 'bg-ochre-200 text-mauve-50',
    },
    groups: hiraganaGroups,
    kana: hiraganaKana,
  },
  {
    slug: 'katakana',
    name: 'Katakana',
    japaneseName: 'カタカナ',
    description: 'El silabario usado para palabras extranjeras y onomatopeyas.',
    longDescription:
      'Katakana se usa principalmente para palabras extranjeras, nombres propios, sonidos, préstamos lingüísticos y énfasis visual dentro del japonés.',
    previewKana: [
      { kana: 'ア', romaji: 'a' },
      { kana: 'イ', romaji: 'i' },
      { kana: 'ウ', romaji: 'u' },
      { kana: 'エ', romaji: 'e' },
      { kana: 'オ', romaji: 'o' },
    ],
    iconKana: 'katakana',
    theme: {
      accentClass: 'text-cyan-900',
      buttonClass: 'bg-cyan-900 btn w-full shadow-cyan-900 text-mauve-50',
      badgeClass: 'bg-cyan-900 text-mauve-50',
    },
    groups: katakanaGroups,
    kana: katakanaKana,
  },
]

function getSyllabaryBySlug(slug: string): Syllabary | undefined {
  return syllabaries.find((syllabary) => syllabary.slug === slug)
}

export function getSyllabaryKana(slug: string): KanaItem[] {
  return getSyllabaryBySlug(slug)?.kana ?? []
}
