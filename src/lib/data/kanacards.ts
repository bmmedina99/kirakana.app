export const kanaCards = [
  {
    japanese: 'ひらがな',
    title: 'Hiragana',
    slug: 'hiragana',
    description:
      'El silabario básico que representa los sonidos nativos del japonés.',
    icon: 'hiragana',
    color: 'text-ochre-200',
    bgColor: 'bg-ochre-200',
    characters: [
      { char: 'あ', romaji: 'a' },
      { char: 'い', romaji: 'i' },
      { char: 'う', romaji: 'u' },
      { char: 'え', romaji: 'e' },
      { char: 'お', romaji: 'o' },
    ],
    buttonShadow: 'shadow-ochre-200',
  },
  {
    japanese: 'カタカナ',
    title: 'Katakana',
    slug: 'katakana',
    description:
      'El silabario utilizado para palabras extranjeras y onomatopeyas.',
    icon: 'katakana',
    color: 'text-cyan-900',
    bgColor: 'bg-cyan-900',
    characters: [
      { char: 'ア', romaji: 'a' },
      { char: 'イ', romaji: 'i' },
      { char: 'ウ', romaji: 'u' },
      { char: 'エ', romaji: 'e' },
      { char: 'オ', romaji: 'o' },
    ],
    buttonShadow: 'shadow-cyan-900',
  },
] as const
