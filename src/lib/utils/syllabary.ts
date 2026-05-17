import { HIRAGANA } from '../data/hiragana'
import { KATAKANA } from '../data/katakana'

export const dataset = (mode: string | null) =>
  mode === 'hiragana' ? HIRAGANA : KATAKANA
