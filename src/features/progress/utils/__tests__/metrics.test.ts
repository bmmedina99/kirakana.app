import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  accuracy,
  activityMetrics,
  dateTime,
  estimatedMastery,
  matchesKanaFilter,
  percent,
  progressMetrics,
  recentAccuracy,
} from '../metrics'
import {
  addRecognitionSession,
  applyPracticeAnswers,
  createRecognitionSession,
  type RecognitionSession,
} from '../practiceProgress'
import { applyLearningView, emptyProgress } from '../progress'

const instant = '2026-09-25T10:00:00.000Z'
const now = new Date(instant)

afterEach(() => vi.unstubAllEnvs())

describe('metric formatting', () => {
  it('formats missing and present accuracy and timestamps', () => {
    expect(percent(null)).toBe('Sin respuestas')
    expect(percent(0.8)).toContain('80')
    expect(dateTime(instant)).toMatch(/2026/)
  })
})

describe('dashboard metrics', () => {
  it('keeps absent accuracy distinct from zero and weights by answers', () => {
    expect(accuracy(0, 0)).toBeNull()
    expect(accuracy(0, 2)).toBe(0)
    expect(accuracy(8, 2)).toBe(0.8)
    let snapshot = addRecognitionSession(
      emptyProgress(),
      createRecognitionSession(
        'one',
        'hiragana',
        { group: null, level: 'basico' },
        instant,
      ),
    )
    snapshot = applyPracticeAnswers(snapshot, 'one', [
      {
        index: 1,
        kana: 'あ',
        isCorrect: true,
        answeredAt: instant,
        activityDay: '2026-09-25',
      },
      {
        index: 2,
        kana: 'あ',
        isCorrect: true,
        answeredAt: instant,
        activityDay: '2026-09-25',
      },
      {
        index: 3,
        kana: 'い',
        isCorrect: false,
        answeredAt: instant,
        activityDay: '2026-09-25',
      },
    ])
    const metrics = progressMetrics(snapshot, now)
    expect(metrics.accuracy).toBeCloseTo(2 / 3)
    expect(metrics.practiced).toBe(2)
    expect(metrics.consulted).toBe(0)
    expect(metrics.completed).toBe(0)
  })

  it.each([
    [9, 0, false],
    [8, 2, true],
    [7, 3, false],
    [8, 3, false],
    [80, 20, true],
  ])(
    'estimates mastery for %i correct and %i incorrect',
    (correct: number, incorrect: number, expected: unknown) => {
      expect(estimatedMastery(correct, incorrect)).toBe(expected)
    },
  )

  it('supports empty and learning-only documents without treating views as practice', () => {
    const empty = progressMetrics(emptyProgress(), now)
    expect(empty.total).toBe(208)
    expect(empty.accuracy).toBeNull()
    expect(empty.sessions).toEqual([])
    expect(empty.activity.current).toBe(0)
    let snapshot = applyLearningView(
      emptyProgress(),
      'hiragana',
      'あ',
      instant,
      '2026-09-25',
    )
    snapshot = applyLearningView(
      snapshot,
      'hiragana',
      'い',
      instant,
      '2026-09-25',
    )
    snapshot.practice = { future: { arbitrary: true } }
    snapshot.sessions = [{ id: 'future', mode: 'future' }]
    const metrics = progressMetrics(snapshot, now)
    expect(metrics.consulted).toBe(2)
    expect(metrics.practiced).toBe(0)
    expect(metrics.summaries[0]?.mastered).toBe(0)
    expect(metrics.summaries[0]?.lastViewed?.kana).toBe('あ')
    expect(metrics.sessions).toEqual([])
    expect(snapshot.sessions).toHaveLength(1)
  })

  it('keeps mastery, consultation and historical errors as overlapping filters', () => {
    const snapshot = applyLearningView(
      emptyProgress(),
      'hiragana',
      'あ',
      instant,
      '2026-09-25',
    )
    snapshot.practice = {
      reconocimiento: {
        characters: {
          hiragana: {
            あ: { correct: 8, incorrect: 2, lastPracticedAt: instant },
            い: { correct: 0, incorrect: 2, lastPracticedAt: instant },
            き: { correct: 0, incorrect: 2, lastPracticedAt: instant },
            う: { correct: 0, incorrect: 3, lastPracticedAt: instant },
            ぎゃ: { correct: 1, incorrect: 1, lastPracticedAt: instant },
          },
          katakana: {
            ア: { correct: 0, incorrect: 2, lastPracticedAt: instant },
          },
        },
      },
    }
    const metrics = progressMetrics(snapshot, now)
    expect(metrics.review.map(({ kana }) => kana)).toEqual([
      'う',
      'い',
      'き',
      'ア',
      'ぎゃ',
    ])
    const mastered = metrics.summaries[0]?.characters[0]
    if (!mastered) throw new Error('Missing kana fixture')
    expect(matchesKanaFilter(mastered, 'consulted')).toBe(true)
    expect(matchesKanaFilter(mastered, 'all')).toBe(true)
    expect(matchesKanaFilter(mastered, 'mastered')).toBe(true)
    expect(matchesKanaFilter(mastered, 'errors')).toBe(true)
    expect(matchesKanaFilter(mastered, 'practicing')).toBe(false)
    expect(matchesKanaFilter(mastered, 'unpracticed')).toBe(false)
    expect(metrics.review[4]?.practiceUrl).toBe(
      '/practicar/reconocimiento/hiragana/?group=gya&level=completo',
    )
    expect(metrics.summaries[0]?.characters).toHaveLength(104)
  })

  it('sorts sessions by start and id without mutating the document', () => {
    const snapshot = emptyProgress()
    snapshot.sessions = ['b', 'a', 'c'].map((id) =>
      createRecognitionSession(
        id,
        'hiragana',
        { group: null, level: 'basico' },
        id === 'c' ? '2026-09-24T10:00:00.000Z' : instant,
      ),
    )
    const metrics = progressMetrics(snapshot, now)
    expect(metrics.sessions.map(({ id }) => id)).toEqual(['a', 'b', 'c'])
    expect(snapshot.sessions.map(({ id }) => id)).toEqual(['b', 'a', 'c'])
    expect(metrics.accuracy).toBeNull()
  })
})

describe('calendar streaks', () => {
  it.each([
    [[], 0, 0],
    [['2026-09-25'], 1, 1],
    [['2026-09-23', '2026-09-24'], 2, 2],
    [['2026-09-21', '2026-09-22', '2026-09-23'], 0, 3],
    [['2026-09-25', '2026-09-23', '2026-09-24', '2026-09-24'], 3, 3],
  ])('calculates current and best for %j', (days: readonly string[], current: number, best: number) => {
    const metrics = activityMetrics(days, now)
    expect(metrics.current).toBe(current)
    expect(metrics.best).toBe(best)
  })

  it('uses local midnight across the year boundary', () => {
    vi.stubEnv('TZ', 'Asia/Tokyo')
    const metrics = activityMetrics(
      ['2026-12-31', '2027-01-01'],
      new Date('2026-12-31T15:01:00Z'),
    )
    expect(metrics.current).toBe(2)
  })

  it.each([
    ['2026-03-27', '2026-03-28', '2026-03-29', '2026-03-30'],
    ['2026-10-23', '2026-10-24', '2026-10-25', '2026-10-26'],
    ['2024-02-27', '2024-02-28', '2024-02-29', '2024-03-01'],
  ])('handles daylight saving and leap days starting %s', (...days: readonly string[]) => {
    vi.stubEnv('TZ', 'Europe/Madrid')
    expect(
      activityMetrics(days, new Date(`${days[3]}T12:00:00Z`)).current,
    ).toBe(4)
  })
})

describe('recent accuracy comparison', () => {
  const sessions: RecognitionSession[] = Array.from(
    { length: 10 },
    (_, index) => ({
      ...createRecognitionSession(
        String(index),
        'hiragana',
        { group: null, level: 'basico' },
        instant,
      ),
      endedAt: new Date(Date.parse(instant) + index * 1000).toISOString(),
      status: index % 2 ? 'abandoned' : 'out-of-lives',
      correct: index < 5 ? 3 : 5,
      incorrect: 5,
    }),
  )
  it('compares weighted blocks of five completed or interrupted sessions', () => {
    expect(recentAccuracy(sessions, 'hiragana')).toEqual({
      latest: 0.5,
      previous: 0.375,
      difference: 12.5,
    })
    expect(recentAccuracy(sessions, 'katakana')).toBeNull()
  })
  it('breaks equal completion times by session id', () => {
    expect(
      recentAccuracy(
        sessions.map((session) => ({ ...session, endedAt: instant })),
        'hiragana',
      ),
    ).toEqual({ latest: 0.375, previous: 0.5, difference: -12.5 })
  })
  it('sorts sessions with missing completion times after dated sessions', () => {
    expect(
      recentAccuracy(
        sessions.map((session, index) => ({
          ...session,
          endedAt: index < 5 ? null : session.endedAt,
        })),
        'hiragana',
      ),
    ).toEqual({ latest: 0.5, previous: 0.375, difference: 12.5 })
  })
  it('requires enough sessions and answers, excluding unfinished and empty ones', () => {
    expect(recentAccuracy(sessions.slice(1), 'hiragana')).toBeNull()
    expect(
      recentAccuracy(
        sessions.map((s) => ({ ...s, correct: 1, incorrect: 0 })),
        'hiragana',
      ),
    ).toBeNull()
    expect(
      recentAccuracy(
        sessions.map((s, i) =>
          i === 0 ? { ...s, status: 'in-progress', endedAt: null } : s,
        ),
        'hiragana',
      ),
    ).toBeNull()
    expect(
      recentAccuracy(
        sessions.map((s, i) =>
          i === 0 ? { ...s, correct: 0, incorrect: 0 } : s,
        ),
        'hiragana',
      ),
    ).toBeNull()
  })
})
