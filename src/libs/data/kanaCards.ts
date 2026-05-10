export const kanaCards = [
  {
    japanese: 'ひらがな',
    title: 'Hiragana',
    description:
      'El silabario básico que representa los sonidos nativos del japonés.',
    icon: 'hiragana',
    color: 'ochre-200',
    characters: [
      { char: 'あ', romaji: 'a' },
      { char: 'い', romaji: 'i' },
      { char: 'う', romaji: 'u' },
      { char: 'え', romaji: 'e' },
      { char: 'お', romaji: 'o' },
    ],
    buttonShadow: 'shadow-ochre-200',
    slug: 'hiragana',
  },
  {
    japanese: 'カタカナ',
    title: 'Katakana',
    description:
      'El silabario utilizado para palabras extranjeras y onomatopeyas.',
    icon: 'katakana',
    color: 'cyan-900',
    characters: [
      { char: 'ア', romaji: 'a' },
      { char: 'イ', romaji: 'i' },
      { char: 'ウ', romaji: 'u' },
      { char: 'エ', romaji: 'e' },
      { char: 'オ', romaji: 'o' },
    ],
    buttonShadow: 'shadow-cyan-900',
    slug: 'katakana',
  },
] as const
