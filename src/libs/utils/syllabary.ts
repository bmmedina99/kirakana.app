import { HIRAGANA } from '../constants/hiragana'
import { KATAKANA } from '../constants/katakana'

export const dataset = (mode: string | null) =>
  mode === 'hiragana' ? HIRAGANA : KATAKANA
