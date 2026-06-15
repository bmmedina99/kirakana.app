import type { PracticeMode } from '@/lib/routes'

export const recognitionMode = {
  slug: 'reconocimiento',
  name: 'Reconocimiento',
  shortName: 'Reconocer kana',
  description:
    'Identifica kana individuales y elige su lectura correcta en romaji.',
  longDescription:
    'Practica el reconocimiento visual de hiragana y katakana asociando cada carácter japonés con su lectura correcta en romaji.',
  supportedSyllabaries: ['hiragana', 'katakana'],
  island: 'recognition',
  status: 'disponible',
  disabledReason: '',
  decoration: {
    icon: '◉',
    kana: 'あ',
    background: 'あ',
  },
  teaches: [
    'Reconocimiento visual de kana',
    'Romaji',
    'Lectura inicial de kana',
  ],
} satisfies PracticeMode
