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

export type Modo = 'hiragana' | 'katakana'

export type Feedback = 'correct' | 'failed'
