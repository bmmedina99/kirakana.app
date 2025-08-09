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

export type Mode = 'hiragana' | 'katakana' | null

export type Feedback = 'correct' | 'incorrect' | null
