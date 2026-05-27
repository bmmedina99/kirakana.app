export const modeCards = [
  {
    title: 'Reconocimiento',
    slug: 'reconocimiento',
    description: 'Practica identicando caracteres japoneses',
    icon: 'hiragana',
    color: 'text-charcoal-100',
    bgColor: 'bg-charcoal-100',
    characters: [
      { char: 'あ', romaji: 'a' },
      { char: 'い', romaji: 'i' },
      { char: 'う', romaji: 'u' },
      { char: 'え', romaji: 'e' },
      { char: 'お', romaji: 'o' },
    ],
    buttonShadow: 'shadow-charcoal-100',
  },
  {
    title: 'Escucha',
    slug: 'escucha',
    description: 'Practica escuchando sonidos japoneses',
    icon: 'katakana',
    color: 'text-copper-100',
    bgColor: 'bg-copper-100',
    characters: [
      { char: 'ア', romaji: 'a' },
      { char: 'イ', romaji: 'i' },
      { char: 'ウ', romaji: 'u' },
      { char: 'エ', romaji: 'e' },
      { char: 'オ', romaji: 'o' },
    ],
    buttonShadow: 'shadow-copper-100',
  },
] as const
