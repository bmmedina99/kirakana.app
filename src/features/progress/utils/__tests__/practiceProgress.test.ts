import { describe, expect, it } from 'vitest'
import {
  abandonRecognitionSessions,
  addRecognitionSession,
  applyPracticeAnswers,
  createRecognitionSession,
  type PracticeAnswer,
  recognitionProgress,
  recognitionSessions,
} from '../practiceProgress'
import {
  applyLearningView,
  emptyProgress,
  isProgressSnapshot,
} from '../progress'

const startedAt = '2026-09-20T10:00:00.000Z'
const vowels = ['あ', 'い', 'う', 'え', 'お']

function session(id = 'round-1') {
  return createRecognitionSession(
    id,
    'hiragana',
    { group: 'vocales', level: 'basico' },
    startedAt,
  )
}

function answer(index: number, isCorrect = true): PracticeAnswer {
  return {
    index,
    kana: vowels[index - 1] ?? 'か',
    isCorrect,
    answeredAt: '2026-09-20T10:01:00.000Z',
    activityDay: '2026-09-20',
  }
}

describe('recognition progress', () => {
  it('accepts learning-only v1 documents and preserves learning when adding practice', () => {
    const learning = applyLearningView(
      emptyProgress(),
      'katakana',
      'ア',
      startedAt,
      '2026-09-20',
    )
    expect(isProgressSnapshot(learning)).toBe(true)
    const snapshot = addRecognitionSession(learning, session())
    expect(snapshot.version).toBe(1)
    expect(snapshot.learning).toEqual(learning.learning)
    expect(snapshot.activityDays).toEqual(learning.activityDays)
    expect(recognitionSessions(snapshot)).toEqual([session()])
    expect(isProgressSnapshot(snapshot)).toBe(true)
  })

  it('starting alone contributes no activity day, attempts or character stats', () => {
    const snapshot = addRecognitionSession(emptyProgress(), session())
    expect(snapshot.activityDays).toEqual([])
    expect(recognitionProgress(snapshot).characters.hiragana).toEqual({})
    expect(recognitionSessions(snapshot)[0]?.status).toBe('in-progress')
  })

  it('records the character, session and day together without mutating the source', () => {
    const initial = addRecognitionSession(emptyProgress(), session())
    const snapshot = applyPracticeAnswers(initial, 'round-1', [
      answer(1, false),
    ])
    expect(recognitionProgress(snapshot).characters.hiragana.あ).toEqual({
      correct: 0,
      incorrect: 1,
      lastPracticedAt: '2026-09-20T10:01:00.000Z',
    })
    expect(recognitionSessions(snapshot)[0]).toMatchObject({
      correct: 0,
      incorrect: 1,
      status: 'in-progress',
      endedAt: null,
    })
    expect(snapshot.activityDays).toEqual(['2026-09-20'])
    expect(initial.activityDays).toEqual([])
    expect(isProgressSnapshot(snapshot)).toBe(true)
  })

  it('retries are idempotent and replay only answers not yet persisted', () => {
    const initial = addRecognitionSession(emptyProgress(), session())
    const first = applyPracticeAnswers(initial, 'round-1', [answer(1)])
    expect(applyPracticeAnswers(first, 'round-1', [answer(1)])).toBe(first)
    const second = applyPracticeAnswers(first, 'round-1', [
      answer(1),
      answer(2, false),
    ])
    expect(recognitionSessions(second)[0]).toMatchObject({
      correct: 1,
      incorrect: 1,
    })
    expect(isProgressSnapshot(second)).toBe(true)
  })

  it('persists completion with the final answer, without a summary or timer', () => {
    const initial = addRecognitionSession(emptyProgress(), session())
    const answers = vowels.map((_, index) => answer(index + 1))
    const snapshot = applyPracticeAnswers(initial, 'round-1', answers)
    expect(recognitionSessions(snapshot)[0]).toMatchObject({
      status: 'completed',
      correct: 5,
      incorrect: 0,
      endedAt: '2026-09-20T10:01:00.000Z',
    })
    expect(applyPracticeAnswers(snapshot, 'round-1', answers)).toBe(snapshot)
    expect(isProgressSnapshot(snapshot)).toBe(true)
  })

  it('gives losing the last life priority even on the final question', () => {
    const snapshot = applyPracticeAnswers(
      addRecognitionSession(emptyProgress(), session()),
      'round-1',
      vowels.map((_, index) => answer(index + 1, false)),
    )
    expect(recognitionSessions(snapshot)[0]).toMatchObject({
      status: 'out-of-lives',
      incorrect: 5,
      endedAt: '2026-09-20T10:01:00.000Z',
    })
    expect(isProgressSnapshot(snapshot)).toBe(true)
  })

  it('can end before covering the entire target', () => {
    const round = createRecognitionSession(
      'all',
      'hiragana',
      { group: null, level: 'basico' },
      startedAt,
    )
    const snapshot = applyPracticeAnswers(
      addRecognitionSession(emptyProgress(), round),
      'all',
      vowels.map((_, index) => answer(index + 1, false)),
    )
    expect(recognitionSessions(snapshot)[0]).toMatchObject({
      status: 'out-of-lives',
      targetCount: 46,
      incorrect: 5,
    })
    expect(isProgressSnapshot(snapshot)).toBe(true)
  })

  it('abandons unfinished sessions while preserving their accepted answers', () => {
    const initial = applyPracticeAnswers(
      addRecognitionSession(emptyProgress(), session()),
      'round-1',
      [answer(1)],
    )
    const recovered = abandonRecognitionSessions(initial, ['round-1'])
    expect(recognitionSessions(recovered)[0]).toMatchObject({
      status: 'abandoned',
      correct: 1,
      endedAt: '2026-09-20T10:01:00.000Z',
    })
    expect(recovered.activityDays).toEqual(initial.activityDays)
    expect(recognitionProgress(recovered)).toEqual(recognitionProgress(initial))
    expect(isProgressSnapshot(recovered)).toBe(true)
  })

  it('does not replace a completed result with abandonment', () => {
    const initial = applyPracticeAnswers(
      addRecognitionSession(emptyProgress(), session()),
      'round-1',
      vowels.map((_, index) => answer(index + 1)),
    )
    const snapshot = abandonRecognitionSessions(
      initial,
      ['round-1'],
      '2026-09-21T10:00:00.000Z',
    )
    expect(recognitionSessions(snapshot)).toEqual(recognitionSessions(initial))
  })

  it('keeps independent sessions and exact characters with the same reading', () => {
    let snapshot = addRecognitionSession(
      emptyProgress(),
      createRecognitionSession(
        'modified',
        'hiragana',
        { group: null, level: 'intermedio' },
        startedAt,
      ),
    )
    snapshot = applyPracticeAnswers(snapshot, 'modified', [
      { ...answer(1), kana: 'じ' },
      { ...answer(2, false), kana: 'ぢ' },
    ])
    snapshot = addRecognitionSession(
      snapshot,
      createRecognitionSession(
        'katakana',
        'katakana',
        { group: 'vocales', level: 'basico' },
        startedAt,
      ),
    )
    snapshot = applyPracticeAnswers(snapshot, 'katakana', [
      { ...answer(1), kana: 'ア' },
    ])
    expect(recognitionProgress(snapshot).characters.hiragana.じ?.correct).toBe(
      1,
    )
    expect(
      recognitionProgress(snapshot).characters.hiragana.ぢ?.incorrect,
    ).toBe(1)
    expect(recognitionProgress(snapshot).characters.katakana.ア?.correct).toBe(
      1,
    )
    expect(recognitionSessions(snapshot)).toHaveLength(2)
    expect(isProgressSnapshot(snapshot)).toBe(true)
  })

  it('preserves unfamiliar modes and their sessions without counting them as recognition', () => {
    const future = {
      ...emptyProgress(),
      practice: { future: { customScore: 99 } },
      sessions: [{ id: 'future-1', mode: 'future', customScore: 99 }],
    }
    expect(isProgressSnapshot(future)).toBe(true)
    const snapshot = applyPracticeAnswers(
      addRecognitionSession(future, session()),
      'round-1',
      [answer(1)],
    )
    expect(snapshot.practice?.future).toEqual(future.practice.future)
    expect(snapshot.sessions?.[0]).toEqual(future.sessions[0])
    expect(recognitionSessions(snapshot)).toHaveLength(1)
    expect(isProgressSnapshot(snapshot)).toBe(true)
  })

  it('rejects missing sessions, skipped indexes, invalid kana and extra answers', () => {
    const initial = addRecognitionSession(emptyProgress(), session())
    expect(() =>
      applyPracticeAnswers(initial, 'missing', [answer(1)]),
    ).toThrow()
    expect(() =>
      applyPracticeAnswers(initial, 'round-1', [answer(2)]),
    ).toThrow()
    expect(() =>
      applyPracticeAnswers(initial, 'round-1', [{ ...answer(1), kana: 'ア' }]),
    ).toThrow()
    const complete = applyPracticeAnswers(
      initial,
      'round-1',
      vowels.map((_, index) => answer(index + 1)),
    )
    expect(() =>
      applyPracticeAnswers(complete, 'round-1', [answer(6)]),
    ).toThrow()
    expect(() => addRecognitionSession(initial, session())).toThrow()
  })

  it('rejects malformed practice data instead of resetting it', () => {
    const initial = addRecognitionSession(emptyProgress(), session())
    const badSessions = [
      { ...session(), correct: 1.5 },
      { ...session(), incorrect: -1 },
      { ...session(), endedAt: startedAt },
      { ...session(), status: 'unknown' },
      { ...session(), lastActivityAt: 'invalid' },
      { ...session(), filters: { group: 'missing', level: 'basico' } },
      { ...session(), filters: { group: null, level: 'invalid' } },
      { ...session(), correct: 1 },
    ]
    for (const invalid of badSessions)
      expect(isProgressSnapshot({ ...initial, sessions: [invalid] })).toBe(
        false,
      )
    expect(
      isProgressSnapshot({ ...initial, sessions: [session(), session()] }),
    ).toBe(false)
    expect(
      isProgressSnapshot({ ...initial, practice: { reconocimiento: {} } }),
    ).toBe(false)
    expect(isProgressSnapshot({ ...initial, sessions: 'invalid' })).toBe(false)
  })
})
