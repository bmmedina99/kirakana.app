import { describe, expect, it } from 'vitest'
import type { KanaItem } from '@/features/data/groups'
import { getKanaNote } from '../getKanaNote'

describe('getKanaNote', () => {
  it('describes a base kana without inventing extra data', () => {
    const item: KanaItem = {
      kana: 'あ',
      romaji: 'a',
      type: 'base',
      group: 'vocales',
    }

    expect(getKanaNote(item)).toBe(
      'Observa su forma, escucha el sonido y relaciónalo con su lectura.',
    )
  })

  it('explains the source character for a modified kana', () => {
    const item: KanaItem = {
      kana: 'が',
      romaji: 'ga',
      type: 'dakuten',
      group: 'g',
      baseKana: 'か',
    }

    expect(getKanaNote(item)).toBe(
      'Parte del carácter か y modifica su sonido.',
    )
  })

  it('explains the composition of a yōon kana', () => {
    const item: KanaItem = {
      kana: 'きゃ',
      romaji: 'kya',
      type: 'yōon',
      group: 'kya',
      baseKana: 'き',
      composedOf: ['き', 'ゃ'],
    }

    expect(getKanaNote(item)).toBe('Combina き + ゃ en un único sonido.')
  })
})
