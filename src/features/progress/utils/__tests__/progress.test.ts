import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  applyLearningView,
  emptyProgress,
  isProgressSnapshot,
  localDay,
} from '../progress'

afterEach(() => vi.unstubAllEnvs())

describe('learning progress', () => {
  it('starts empty and gives each document independent collections', () => {
    const first = emptyProgress()
    const second = emptyProgress()
    first.activityDays.push('2026-09-20')
    expect(second).toEqual({
      version: 1,
      learning: { hiragana: {}, katakana: {} },
      activityDays: [],
    })
    expect(isProgressSnapshot(second)).toBe(true)
  })

  it('records explicit views without mutating the previous document', () => {
    const initial = emptyProgress()
    const result = applyLearningView(
      initial,
      'hiragana',
      'あ',
      '2026-09-20T10:00:00.000Z',
      '2026-09-20',
    )
    expect(result.learning.hiragana.あ).toEqual({
      firstViewedAt: '2026-09-20T10:00:00.000Z',
      lastViewedAt: '2026-09-20T10:00:00.000Z',
    })
    expect(result.activityDays).toEqual(['2026-09-20'])
    expect(initial).toEqual(emptyProgress())
    expect(result).not.toHaveProperty('characters')
    expect(result).not.toHaveProperty('sessions')
  })

  it('keeps the first view, updates the last and deduplicates activity days', () => {
    const first = applyLearningView(
      emptyProgress(),
      'hiragana',
      'あ',
      '2026-09-20T10:00:00.000Z',
      '2026-09-20',
    )
    const second = applyLearningView(
      first,
      'hiragana',
      'あ',
      '2026-09-20T12:00:00.000Z',
      '2026-09-20',
    )
    const third = applyLearningView(
      second,
      'hiragana',
      'あ',
      '2026-09-21T08:00:00.000Z',
      '2026-09-21',
    )
    expect(third.learning.hiragana.あ).toEqual({
      firstViewedAt: '2026-09-20T10:00:00.000Z',
      lastViewedAt: '2026-09-21T08:00:00.000Z',
    })
    expect(third.activityDays).toEqual(['2026-09-20', '2026-09-21'])
  })

  it('does not move the last view backwards after a delayed event', () => {
    const first = applyLearningView(
      emptyProgress(),
      'hiragana',
      'あ',
      '2026-09-20T10:00:00.000Z',
      '2026-09-20',
    )
    const result = applyLearningView(
      first,
      'hiragana',
      'あ',
      '2026-09-19T10:00:00.000Z',
      '2026-09-19',
    )
    expect(result.learning.hiragana.あ).toEqual(first.learning.hiragana.あ)
    expect(result.activityDays).toEqual(['2026-09-19', '2026-09-20'])
    expect(isProgressSnapshot(result)).toBe(true)
  })

  it('distinguishes kana with the same reading, syllabaries and combinations', () => {
    let result = emptyProgress()
    for (const kana of ['じ', 'ぢ', 'きゃ']) {
      result = applyLearningView(
        result,
        'hiragana',
        kana,
        '2026-09-20T10:00:00.000Z',
        '2026-09-20',
      )
    }
    result = applyLearningView(
      result,
      'katakana',
      'ジ',
      '2026-09-20T10:00:00.000Z',
      '2026-09-20',
    )
    expect(Object.keys(result.learning.hiragana)).toEqual(['じ', 'ぢ', 'きゃ'])
    expect(Object.keys(result.learning.katakana)).toEqual(['ジ'])
    expect(isProgressSnapshot(result)).toBe(true)
  })

  it('preserves other progress sections without introducing practice data', () => {
    const initial = { ...emptyProgress(), extension: { marker: 7 } }
    const result = applyLearningView(
      initial,
      'hiragana',
      'あ',
      '2026-09-20T10:00:00.000Z',
      '2026-09-20',
    )
    expect(result.extension).toEqual({ marker: 7 })
  })

  it.each(['a', 'ア', 'unknown', '__proto__'])(
    'rejects invalid hiragana identifier %s',
    (kana) => {
      expect(() =>
        applyLearningView(
          emptyProgress(),
          'hiragana',
          kana,
          '2026-09-20T10:00:00.000Z',
          '2026-09-20',
        ),
      ).toThrow()
    },
  )

  it('uses the local day even when the UTC calendar day differs', () => {
    vi.stubEnv('TZ', 'Asia/Tokyo')
    const date = new Date('2026-12-31T15:30:00.000Z')
    expect(localDay(date)).toBe('2027-01-01')
    expect(date.toISOString()).toBe('2026-12-31T15:30:00.000Z')
  })

  it('handles local calendar dates on both sides of daylight saving changes', () => {
    vi.stubEnv('TZ', 'Europe/Madrid')
    expect(localDay(new Date('2026-03-28T23:30:00.000Z'))).toBe('2026-03-29')
    expect(localDay(new Date('2026-03-29T22:30:00.000Z'))).toBe('2026-03-30')
  })
})

describe('progress validation', () => {
  it.each([
    null,
    [],
    {},
    { ...emptyProgress(), version: 2 },
    { ...emptyProgress(), learning: { hiragana: {} } },
    { ...emptyProgress(), learning: { hiragana: {}, katakana: {}, other: {} } },
    { ...emptyProgress(), activityDays: ['2026-02-30'] },
    { ...emptyProgress(), activityDays: ['2026-09-20', '2026-09-20'] },
    { ...emptyProgress(), activityDays: ['20/09/2026'] },
    { ...emptyProgress(), activityDays: [42] },
  ])('rejects malformed document %#', (value) => {
    expect(isProgressSnapshot(value)).toBe(false)
  })

  it.each([
    { firstViewedAt: 'invalid', lastViewedAt: '2026-09-20T10:00:00.000Z' },
    {
      firstViewedAt: '2026-09-21T10:00:00.000Z',
      lastViewedAt: '2026-09-20T10:00:00.000Z',
    },
    {
      firstViewedAt: '2026-02-30T10:00:00.000Z',
      lastViewedAt: '2026-03-01T10:00:00.000Z',
    },
    {
      firstViewedAt: '2026-09-20T12:00:00+02:00',
      lastViewedAt: '2026-09-20T10:00:00.000Z',
    },
  ])('rejects invalid view dates %#', (entry) => {
    const snapshot = emptyProgress()
    snapshot.learning.hiragana.あ = entry
    expect(isProgressSnapshot(snapshot)).toBe(false)
  })

  it('rejects stored kana that do not belong to their syllabary', () => {
    const snapshot = emptyProgress()
    snapshot.learning.hiragana.ア = {
      firstViewedAt: '2026-09-20T10:00:00.000Z',
      lastViewedAt: '2026-09-20T10:00:00.000Z',
    }
    expect(isProgressSnapshot(snapshot)).toBe(false)
  })
})
