export interface Config {
  title: string
  description: string
  lang: string
  author: string
  url: string
}

export interface KanaItem {
  kana: string
  romanji: string
}

export interface ScoreEntry {
  date: string
  kanaType: string
  correct: number
  total: number
}

export type Syllabarys = 'hiragana' | 'katakana' | null

export type Feedback = 'correct' | 'incorrect' | null
