import { Hiragana, Katakana } from '@/site.config'

export const dataset = (mode: string | null) =>
  mode === 'hiragana' ? Hiragana : Katakana

export const totalKanas = (mode: string | null) =>
  mode === 'hiragana' ? Hiragana.length : Katakana.length
