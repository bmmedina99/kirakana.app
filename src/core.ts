export interface Config {
  name: string
  description: string
  lang: string
  locale: string
  author: string
  url: string
}

export interface KanaItem {
  kana: string
  romaji: string
}

export interface KanaCard {
  basePath: string
  buttonLabel: string
}

export interface ScoreEntry {
  date: string
  kanaType: string
  correct: number
  total: number
}

export type Feedback = 'correct' | 'incorrect' | null
