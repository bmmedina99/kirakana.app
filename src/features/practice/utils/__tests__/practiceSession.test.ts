import { describe, expect, it } from 'vitest'
import type { KanaGroup, KanaItem } from '@/features/data/groups'
import {
  createPracticeOptions,
  createPracticeSession,
  resolvePracticeFilters,
} from '../practiceSession'

const groups: Array<Pick<KanaGroup, 'slug' | 'recommendedPracticeLevel'>> = [
  { slug: 'vocales', recommendedPracticeLevel: 'basico' },
  { slug: 'k', recommendedPracticeLevel: 'basico' },
  { slug: 'g', recommendedPracticeLevel: 'intermedio' },
]

const kanaPool: KanaItem[] = [
  { kana: 'あ', romaji: 'a', type: 'base', group: 'vocales' },
  { kana: 'い', romaji: 'i', type: 'base', group: 'vocales' },
  { kana: 'う', romaji: 'u', type: 'base', group: 'vocales' },
  { kana: 'え', romaji: 'e', type: 'base', group: 'vocales' },
  { kana: 'お', romaji: 'o', type: 'base', group: 'vocales' },
]

describe('resolvePracticeFilters', () => {
  it('uses every group and the basic level without query parameters', () => {
    expect(resolvePracticeFilters('', groups)).toEqual({
      group: null,
      level: 'basico',
      invalidGroup: null,
      invalidLevel: null,
    })
  })

  it('uses the recommended level when only a group is provided', () => {
    expect(resolvePracticeFilters('?group=g', groups)).toEqual({
      group: 'g',
      level: 'intermedio',
      invalidGroup: null,
      invalidLevel: null,
    })
  })

  it('falls back safely and reports invalid values', () => {
    expect(
      resolvePracticeFilters('?group=desconocido&level=experto', groups),
    ).toEqual({
      group: null,
      level: 'basico',
      invalidGroup: 'desconocido',
      invalidLevel: 'experto',
    })
  })
})

describe('createPracticeOptions', () => {
  it('includes the answer and up to three unique alternatives', () => {
    const options = createPracticeOptions(kanaPool[0] as KanaItem, kanaPool)

    expect(options).toHaveLength(4)
    expect(options).toContain('a')
    expect(new Set(options).size).toBe(options.length)
  })

  it('uses fewer options when the practice pool is small', () => {
    const options = createPracticeOptions(
      kanaPool[0] as KanaItem,
      kanaPool.slice(0, 3),
    )

    expect(options).toHaveLength(3)
    expect(options).toContain('a')
  })
})

describe('createPracticeSession', () => {
  it('contains every selected kana exactly once', () => {
    const session = createPracticeSession(kanaPool)

    expect(session).toHaveLength(kanaPool.length)
    expect(session).toEqual(expect.arrayContaining(kanaPool))
    expect(new Set(session.map((item) => item.kana)).size).toBe(kanaPool.length)
  })
})
