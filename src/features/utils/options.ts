import type { KanaItem } from '@/features/core'
import { shuffle } from './shuffle'

export function Options(correctRomanji: string, pool: KanaItem[]): string[] {
  const opts = new Set<string>([correctRomanji])
  while (opts.size < 4 && pool.length > 0) {
    const pick = pool[(Math.random() * pool.length) | 0]?.romaji
    if (pick) opts.add(pick)
  }
  return shuffle([...opts])
}
