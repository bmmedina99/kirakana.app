import { describe, expect, it } from 'vitest'
import { getKanaForPractice } from '../getKanaForPractice'

describe('getKanaForPractice', () => {
  it('uses every basic kana when no group is selected', () => {
    const kana = getKanaForPractice({ syllabary: 'hiragana' })

    expect(kana).toHaveLength(46)
    expect(kana.every((item) => item.type === 'base')).toBe(true)
  })

  it('limits the pool to the requested group and level', () => {
    const kana = getKanaForPractice({
      syllabary: 'katakana',
      group: 'g',
      level: 'intermedio',
    })

    expect(kana).toHaveLength(5)
    expect(kana.every((item) => item.group === 'g')).toBe(true)
  })

  it('includes yōon only at the complete level', () => {
    const intermediateKana = getKanaForPractice({
      syllabary: 'hiragana',
      level: 'intermedio',
    })
    const completeKana = getKanaForPractice({
      syllabary: 'hiragana',
      level: 'completo',
    })

    expect(intermediateKana.some((item) => item.type === 'yōon')).toBe(false)
    expect(completeKana.some((item) => item.type === 'yōon')).toBe(true)
    expect(completeKana).toHaveLength(104)
  })

  it('returns an empty pool for an incompatible group and level', () => {
    expect(
      getKanaForPractice({
        syllabary: 'hiragana',
        group: 'g',
        level: 'basico',
      }),
    ).toEqual([])
  })
})
