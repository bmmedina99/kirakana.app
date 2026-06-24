import type { PracticeMode } from './core'

export const recognitionMode = {
  slug: 'reconocimiento',
  name: 'Reconocimiento',
  description:
    'Identifica kana individuales y elige su lectura correcta en romaji.',
  longDescription:
    'Practica el reconocimiento visual de hiragana y katakana asociando cada carácter japonés con su lectura correcta en romaji.',
  supportedSyllabaries: ['hiragana', 'katakana'],
  island: 'recognition',
  status: 'disponible',
  disabledReason: '',
  icon: 'learn',
  theme: {
    buttonClass: 'bg-charcoal-100 btn w-full text-mauve-50',
  },
  decoration: {
    type: 'recognition-card',
    backgroundKana: 'あ',
    cards: [
      {
        kana: 'あ',
        rotation: '-rotate-6 text-ochre-200',
      },
      {
        kana: 'ア',
        rotation: 'rotate-6 text-cyan-900',
      },
    ],
  },
  teaches: ['Reconocimiento visual de kana', 'Romaji'],
} satisfies PracticeMode
