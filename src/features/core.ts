export interface KanaItem {
  kana: string
  romaji: string
}

export interface ScoreEntry {
  date: string
  kanaType: string
  correct: number
  total: number
}

export type Feedback = 'correct' | 'incorrect' | null
