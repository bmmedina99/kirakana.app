import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { getKanaSoundPath, type KanaGroup } from '../groups'
import { hiraganaGroups } from '../hiragana'
import { katakanaGroups } from '../katakana'
import { getWordAudioPath, type WordGroups } from '../wordGroups'
import { wordsHiragana } from '../wordsHiragana'
import { wordsKatakana } from '../wordsKatakana'

const syllabaries: Array<{
  name: string
  groups: KanaGroup[]
  wordGroups: WordGroups
}> = [
  {
    name: 'hiragana',
    groups: hiraganaGroups,
    wordGroups: wordsHiragana,
  },
  {
    name: 'katakana',
    groups: katakanaGroups,
    wordGroups: wordsKatakana,
  },
]

describe.each(syllabaries)('$name word groups', ({ groups, wordGroups }) => {
  it('uses the same group slugs and kana as its syllabary', () => {
    expect(Object.keys(wordGroups)).toEqual(groups.map((group) => group.slug))

    for (const group of groups) {
      expect(Object.keys(wordGroups[group.slug])).toEqual(
        group.items.map((item) => item.kana),
      )
    }
  })

  it('contains up to three valid words or an explanation', () => {
    for (const group of Object.values(wordGroups)) {
      for (const [kana, entry] of Object.entries(group)) {
        expect(entry.words.length).toBeLessThanOrEqual(3)

        if (entry.words.length === 0) {
          expect(entry.emptyReason?.trim()).toBeTruthy()
          continue
        }

        expect(entry.emptyReason).toBeUndefined()

        for (const word of entry.words) {
          expect(word.word).toContain(kana)
          expect(word.romaji.trim()).not.toBe('')
          expect(word.meaning.trim()).not.toBe('')
          expect(word.meaning).not.toContain('/')
        }
      }
    }
  })
})

describe('kana sound paths', () => {
  it('links every kana to an existing shared sound file', () => {
    for (const { groups } of syllabaries) {
      for (const group of groups) {
        for (const item of group.items) {
          const source = getKanaSoundPath(item)
          const filePath = join(process.cwd(), 'public', source.slice(1))

          expect(source).toBe(`/assets/audio/sounds/${item.romaji}.mp3`)
          expect(existsSync(filePath), filePath).toBe(true)
        }
      }
    }
  })
})
describe('getWordAudioPath', () => {
  it('uses romaji as the shared audio key by default', () => {
    expect(getWordAudioPath({ romaji: 'ame' })).toBe(
      '/assets/audio/words/ame.mp3',
    )
  })

  it('allows homophones to override the shared audio key', () => {
    expect(
      getWordAudioPath({ romaji: 'hashi', audioKey: 'hashi-bridge' }),
    ).toBe('/assets/audio/words/hashi-bridge.mp3')
  })
})
