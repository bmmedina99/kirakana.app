import type { KanaGroupSlug } from './groups'

export type Word = {
  word: string
  romaji: string
  meaning: string
  audioKey?: string
}

export type AvailableWords =
  | readonly [Word]
  | readonly [Word, Word]
  | readonly [Word, Word, Word]

export type KanaWordEntry =
  | {
      words: AvailableWords
      emptyReason?: never
    }
  | {
      words: readonly []
      emptyReason: string
    }

export type WordGroup = Readonly<Record<string, KanaWordEntry>>

export type WordGroups = Readonly<Record<KanaGroupSlug, WordGroup>>

export function defineWordGroups<const T extends WordGroups>(groups: T): T {
  return groups
}

export function getWordAudioPath(
  word: Pick<Word, 'audioKey' | 'romaji'>,
): string {
  return `/assets/audio/words/${word.audioKey ?? word.romaji}.mp3`
}
