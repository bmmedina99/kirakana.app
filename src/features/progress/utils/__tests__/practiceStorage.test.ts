import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  addRecognitionSession,
  createRecognitionSession,
  recognitionProgress,
  recognitionSessions,
} from '../practiceProgress'
import {
  createPracticeRecorder,
  type PracticeRecorder,
  recoverInterruptedPractice,
} from '../practiceStorage'
import { emptyProgress, isProgressSnapshot } from '../progress'
import {
  clearStoredProgress,
  PROGRESS_STORAGE_KEY,
  readProgress,
  recordLearningView,
} from '../storage'

const filters = { group: 'vocales', level: 'basico' } as const
const vowels = ['あ', 'い', 'う', 'え', 'お']
const recorders: PracticeRecorder[] = []

function browser() {
  const values = new Map<string, string>()
  const storage = {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      values.set(key, value)
    }),
    removeItem: vi.fn((key: string) => {
      values.delete(key)
    }),
  }
  const held = new Set<string>()
  const queues = new Map<string, Promise<unknown>>()
  type Callback = (lock: { name: string } | null) => unknown
  const request = vi.fn(
    (
      name: string,
      options: Callback | { ifAvailable: boolean },
      callback?: Callback,
    ) => {
      const run = typeof options === 'function' ? options : callback
      if (!run) throw new Error('Missing callback')
      if (
        typeof options !== 'function' &&
        options.ifAvailable &&
        held.has(name)
      )
        return Promise.resolve(run(null))
      const result = (queues.get(name) ?? Promise.resolve()).then(async () => {
        held.add(name)
        try {
          return await run({ name })
        } finally {
          held.delete(name)
        }
      })
      queues.set(
        name,
        result.catch(() => undefined),
      )
      return result
    },
  )
  const locks = {
    request,
    query: vi.fn(
      async (): Promise<{ held: { name: string }[] | undefined }> => ({
        held: [...held].map((name) => ({ name })),
      }),
    ),
  }
  const target = Object.assign(new EventTarget(), {
    localStorage: storage,
    navigator: { locks },
  })
  vi.stubGlobal('window', target)
  const snapshot = () => {
    const result = readProgress(storage)
    expect(result.error).toBeNull()
    if (!result.snapshot) throw new Error('Unreadable snapshot')
    expect(isProgressSnapshot(result.snapshot)).toBe(true)
    return result.snapshot
  }
  return { values, storage, held, locks, target, snapshot }
}

function recorder(syllabary: 'hiragana' | 'katakana' = 'hiragana') {
  const notify = vi.fn()
  const instance = createPracticeRecorder(syllabary, filters, notify)
  recorders.push(instance)
  return { instance, notify }
}

afterEach(async () => {
  for (const instance of recorders.splice(0)) await instance.close()
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
})

describe('practice persistence lifecycle', () => {
  it('starts only on request and saves each response before the round finishes', async () => {
    const { snapshot, values } = browser()
    await recoverInterruptedPractice()
    expect(values.size).toBe(0)
    const { instance } = recorder()
    await instance.ready
    expect(snapshot().activityDays).toEqual([])
    await instance.answer(1, 'あ', true)
    expect(recognitionSessions(snapshot())[0]).toMatchObject({
      correct: 1,
      incorrect: 0,
      status: 'in-progress',
    })
    expect(
      recognitionProgress(snapshot()).characters.hiragana.あ?.correct,
    ).toBe(1)
  })

  it('plays without saving when the session lock is already held', async () => {
    const { held, values } = browser()
    vi.stubGlobal('crypto', { randomUUID: vi.fn(() => 'blocked') })
    held.add('kirakana.practice.session:blocked')
    const { instance, notify } = recorder()
    await instance.ready
    expect(values.size).toBe(0)
    expect(notify).toHaveBeenLastCalledWith(
      expect.objectContaining({ canRetry: false }),
    )
  })

  it('reports a rejected session lock request as unavailable', async () => {
    const { locks } = browser()
    locks.request.mockImplementationOnce((name, options, callback) => {
      const run = typeof options === 'function' ? options : callback
      if (!run) throw new Error('Missing callback')
      return Promise.resolve(run({ name }))
    })
    locks.request.mockRejectedValueOnce(new Error('Locks failed'))
    const { instance, notify } = recorder()
    await instance.ready
    expect(notify).toHaveBeenLastCalledWith(
      expect.objectContaining({ canRetry: false }),
    )
  })

  it('does not abandon a session whose lock is still owned', async () => {
    const { snapshot } = browser()
    const { instance } = recorder()
    await instance.ready
    await recoverInterruptedPractice()
    expect(recognitionSessions(snapshot())[0]?.status).toBe('in-progress')
  })

  it('recovers a session when the lock query has no held collection', async () => {
    const { locks, snapshot } = browser()
    const { instance } = recorder()
    await instance.ready
    locks.query.mockResolvedValueOnce({ held: undefined })
    await recoverInterruptedPractice()
    expect(recognitionSessions(snapshot())[0]?.status).toBe('abandoned')
  })

  it('reports unreadable storage while recovering interrupted practice', async () => {
    const { values } = browser()
    values.set(PROGRESS_STORAGE_KEY, '{broken')
    await expect(recoverInterruptedPractice()).resolves.toEqual({
      ok: false,
      error: 'invalid-data',
    })
  })

  it('reports a failed recovery write', async () => {
    const { values, storage } = browser()
    values.set(
      PROGRESS_STORAGE_KEY,
      JSON.stringify(
        addRecognitionSession(
          emptyProgress(),
          createRecognitionSession(
            'orphan-write',
            'hiragana',
            filters,
            '2026-09-20T10:00:00.000Z',
          ),
        ),
      ),
    )
    storage.setItem.mockImplementationOnce(() => {
      throw new Error('Full')
    })
    await expect(recoverInterruptedPractice()).resolves.toEqual({
      ok: false,
      error: 'write-failed',
    })
  })

  it('deduplicates repeated answer delivery and retries', async () => {
    const { snapshot } = browser()
    const { instance } = recorder()
    await Promise.all([
      instance.answer(1, 'あ', true),
      instance.answer(1, 'あ', true),
      instance.retry(),
    ])
    expect(recognitionSessions(snapshot())[0]?.correct).toBe(1)
  })

  it('keeps the session unchanged when a response cannot be applied', async () => {
    const { snapshot } = browser()
    const { instance, notify } = recorder()
    await instance.answer(1, 'invalid', true)
    expect(recognitionSessions(snapshot())[0]).toMatchObject({
      correct: 0,
      incorrect: 0,
      status: 'in-progress',
    })
    expect(notify).toHaveBeenLastCalledWith(
      expect.objectContaining({ canRetry: true }),
    )
  })

  it('reports unreadable storage while flushing a response', async () => {
    const { values } = browser()
    const { instance, notify } = recorder()
    await instance.ready
    values.set(PROGRESS_STORAGE_KEY, '{broken')
    await instance.answer(1, 'あ', true)
    expect(notify).toHaveBeenLastCalledWith(
      expect.objectContaining({ canRetry: true }),
    )
  })

  it('ignores storage events for unrelated keys', async () => {
    const { target } = browser()
    const { instance, notify } = recorder()
    await instance.ready
    notify.mockClear()
    target.dispatchEvent(
      Object.assign(new Event('storage'), { key: 'unrelated-key' }),
    )
    await Promise.resolve()
    expect(notify).not.toHaveBeenCalled()
  })

  it('does not enqueue work after closing a server-side recorder', async () => {
    vi.unstubAllGlobals()
    const notify = vi.fn()
    const instance = createPracticeRecorder('hiragana', filters, notify)
    recorders.push(instance)
    await instance.ready
    await instance.close()
    await instance.retry()
    expect(notify).toHaveBeenLastCalledWith(
      expect.objectContaining({ canRetry: false }),
    )
  })

  it('persists both endings with the final response and releases session ownership', async () => {
    const { snapshot, held } = browser()
    for (const correct of [true, false]) {
      const { instance } = recorder()
      for (const [index, kana] of vowels.entries())
        await instance.answer(index + 1, kana, correct)
      expect(recognitionSessions(snapshot()).at(-1)?.status).toBe(
        correct ? 'completed' : 'out-of-lives',
      )
    }
    expect(
      [...held].filter((name) => name.startsWith('kirakana.practice.session:')),
    ).toEqual([])
    expect(recognitionSessions(snapshot())).toHaveLength(2)
  })

  it('abandons on replacement, preserves results and starts a distinct round', async () => {
    const { snapshot } = browser()
    const first = recorder().instance
    await first.answer(1, 'あ', false)
    const closing = first.close()
    const second = recorder().instance
    await Promise.all([closing, second.ready])
    const sessions = recognitionSessions(snapshot())
    expect(sessions[0]).toMatchObject({ status: 'abandoned', incorrect: 1 })
    expect(sessions[1]).toMatchObject({
      status: 'in-progress',
      correct: 0,
      incorrect: 0,
    })
    expect(sessions[0]?.id).not.toBe(sessions[1]?.id)
  })

  it('merges concurrent practice and learning without abandoning live sessions', async () => {
    const { snapshot } = browser()
    const first = recorder().instance
    const second = recorder('katakana').instance
    await Promise.all([
      first.answer(1, 'あ', true),
      second.answer(1, 'ア', false),
      recordLearningView('hiragana', 'い'),
    ])
    await recoverInterruptedPractice()
    const current = snapshot()
    expect(
      recognitionSessions(current).every(
        ({ status }) => status === 'in-progress',
      ),
    ).toBe(true)
    expect(recognitionProgress(current).characters.hiragana.あ?.correct).toBe(1)
    expect(recognitionProgress(current).characters.katakana.ア?.incorrect).toBe(
      1,
    )
    expect(current.learning.hiragana.い).toBeDefined()
  })

  it('recovers an interrupted session without using unload or adding an activity day', async () => {
    const { snapshot, held } = browser()
    const { instance } = recorder()
    await instance.answer(1, 'あ', true)
    const before = snapshot()
    for (const name of held)
      if (name.startsWith('kirakana.practice.session:')) held.delete(name)
    await recoverInterruptedPractice()
    expect(recognitionSessions(snapshot())[0]).toMatchObject({
      status: 'abandoned',
      correct: 1,
      endedAt: recognitionSessions(before)[0]?.lastActivityAt,
    })
    expect(snapshot().activityDays).toEqual(before.activityDays)
  })

  it('also recovers old zero-answer sessions when starting a new round', async () => {
    const { values, snapshot } = browser()
    values.set(
      PROGRESS_STORAGE_KEY,
      JSON.stringify(
        addRecognitionSession(
          emptyProgress(),
          createRecognitionSession(
            'orphan',
            'hiragana',
            filters,
            '2026-09-20T10:00:00.000Z',
          ),
        ),
      ),
    )
    await recorder().instance.ready
    expect(recognitionSessions(snapshot())[0]).toMatchObject({
      status: 'abandoned',
      correct: 0,
      endedAt: '2026-09-20T10:00:00.000Z',
    })
    expect(snapshot().activityDays).toEqual([])
  })

  it('does not recreate deleted history, even after learning creates a fresh document', async () => {
    const { values, snapshot } = browser()
    const { instance, notify } = recorder()
    await instance.answer(1, 'あ', true)
    await clearStoredProgress()
    expect(values.has(PROGRESS_STORAGE_KEY)).toBe(false)
    await recordLearningView('katakana', 'ア')
    await instance.answer(2, 'い', false)
    await instance.retry()
    expect(snapshot().sessions).toBeUndefined()
    expect(notify).toHaveBeenLastCalledWith(
      expect.objectContaining({
        canRetry: false,
        message: expect.stringContaining('sin guardar'),
      }),
    )
    const next = recorder().instance
    await next.answer(1, 'あ', true)
    expect(recognitionSessions(snapshot())).toHaveLength(1)
    expect(recognitionSessions(snapshot())[0]?.correct).toBe(1)
  })

  it('notifies deletion from another tab before another answer is given', async () => {
    const { target } = browser()
    const { instance, notify } = recorder()
    await instance.ready
    await clearStoredProgress()
    target.dispatchEvent(
      Object.assign(new Event('storage'), {
        key: PROGRESS_STORAGE_KEY,
        newValue: null,
      }),
    )
    await Promise.resolve()
    expect(notify).toHaveBeenLastCalledWith(
      expect.objectContaining({
        canRetry: false,
        message: expect.stringContaining('ya no está disponible'),
      }),
    )
  })

  it('does not invalidate a new round for a delayed deletion notification', async () => {
    const { target, snapshot } = browser()
    await clearStoredProgress()
    const { instance } = recorder()
    await instance.ready
    target.dispatchEvent(
      Object.assign(new Event('storage'), {
        key: PROGRESS_STORAGE_KEY,
        newValue: null,
      }),
    )
    await instance.answer(1, 'あ', true)
    expect(recognitionSessions(snapshot())[0]?.correct).toBe(1)
  })

  it('ignores storage events after deletion has disabled the recorder', async () => {
    const { target } = browser()
    const { instance, notify } = recorder()
    await instance.ready
    await clearStoredProgress()
    target.dispatchEvent(
      Object.assign(new Event('storage'), {
        key: PROGRESS_STORAGE_KEY,
        newValue: null,
      }),
    )
    await Promise.resolve()
    notify.mockClear()
    target.dispatchEvent(
      Object.assign(new Event('storage'), {
        key: PROGRESS_STORAGE_KEY,
        newValue: null,
      }),
    )
    await Promise.resolve()
    expect(notify).not.toHaveBeenCalled()
  })

  it('does not report a flush that finishes after deletion disables the recorder', async () => {
    const { locks, target, values } = browser()
    const { instance, notify } = recorder()
    await instance.ready
    let releaseUpdate = () => {}
    const updatePaused = new Promise<void>((resolve) => {
      releaseUpdate = resolve
    })
    locks.request.mockImplementationOnce(async (name, options, callback) => {
      await updatePaused
      const run = typeof options === 'function' ? options : callback
      if (!run) throw new Error('Missing callback')
      return run({ name })
    })
    const pending = instance.answer(1, 'あ', true)
    await Promise.resolve()
    values.delete(PROGRESS_STORAGE_KEY)
    target.dispatchEvent(
      Object.assign(new Event('storage'), {
        key: PROGRESS_STORAGE_KEY,
        newValue: null,
      }),
    )
    await Promise.resolve()
    releaseUpdate()
    await pending
    expect(notify).toHaveBeenLastCalledWith(
      expect.objectContaining({ canRetry: false }),
    )
  })

  it('orders deletion after session creation already requested, preventing late resurrection', async () => {
    const { values } = browser()
    const { instance } = recorder()
    const deletion = clearStoredProgress()
    await Promise.all([instance.ready, deletion])
    await instance.answer(1, 'あ', true)
    expect(values.has(PROGRESS_STORAGE_KEY)).toBe(false)
  })

  it('keeps pending results after quota failure and replays them exactly once', async () => {
    const { storage, snapshot } = browser()
    const { instance, notify } = recorder()
    await instance.ready
    storage.setItem.mockImplementationOnce(() => {
      throw new DOMException('Full', 'QuotaExceededError')
    })
    await instance.answer(1, 'あ', true)
    expect(recognitionSessions(snapshot())[0]?.correct).toBe(0)
    expect(notify).toHaveBeenLastCalledWith(
      expect.objectContaining({ canRetry: true }),
    )
    await instance.answer(2, 'い', false)
    await instance.retry()
    expect(recognitionSessions(snapshot())[0]).toMatchObject({
      correct: 1,
      incorrect: 1,
    })
    expect(notify).toHaveBeenLastCalledWith(null)
  })

  it('can retry the final answer from the summary without duplicating previous answers', async () => {
    const { storage, snapshot } = browser()
    const { instance } = recorder()
    for (const [index, kana] of vowels.slice(0, 4).entries())
      await instance.answer(index + 1, kana, true)
    storage.setItem.mockImplementationOnce(() => {
      throw new Error('Full')
    })
    await instance.answer(5, 'お', true)
    expect(recognitionSessions(snapshot())[0]?.status).toBe('in-progress')
    await instance.retry()
    expect(recognitionSessions(snapshot())[0]).toMatchObject({
      status: 'completed',
      correct: 5,
    })
  })

  it('discards failed pending writes when their history is deleted', async () => {
    const { storage, values } = browser()
    const { instance, notify } = recorder()
    await instance.ready
    storage.setItem.mockImplementationOnce(() => {
      throw new Error('Full')
    })
    await instance.answer(1, 'あ', true)
    await clearStoredProgress()
    await instance.retry()
    await instance.answer(2, 'い', true)
    expect(values.has(PROGRESS_STORAGE_KEY)).toBe(false)
    expect(notify).toHaveBeenLastCalledWith(
      expect.objectContaining({ canRetry: false }),
    )
  })

  it('does not create a partial round after its initial save failed', async () => {
    const { storage, values, held } = browser()
    storage.setItem.mockImplementationOnce(() => {
      throw new Error('Full')
    })
    const { instance, notify } = recorder()
    await instance.ready
    await instance.answer(1, 'あ', true)
    await instance.retry()
    expect(values.has(PROGRESS_STORAGE_KEY)).toBe(false)
    expect(
      [...held].filter((name) => name.startsWith('kirakana.practice.session:')),
    ).toEqual([])
    expect(notify).toHaveBeenLastCalledWith(
      expect.objectContaining({
        canRetry: false,
        message: expect.stringContaining('esta ronda no se guardará'),
      }),
    )
  })

  it.each([
    '{broken',
    '{"version":2}',
    '{"version":1,"learning":{},"activityDays":[]}',
  ])('preserves unreadable storage %s', async (raw) => {
    const { values, storage } = browser()
    values.set(PROGRESS_STORAGE_KEY, raw)
    const { instance, notify } = recorder()
    await instance.answer(1, 'あ', true)
    expect(values.get(PROGRESS_STORAGE_KEY)).toBe(raw)
    expect(storage.setItem).not.toHaveBeenCalled()
    expect(notify).toHaveBeenLastCalledWith(
      expect.objectContaining({ canRetry: false }),
    )
  })

  it('plays without saving when locks are unavailable', async () => {
    const { target, values } = browser()
    Object.defineProperty(target.navigator, 'locks', { value: undefined })
    const { instance, notify } = recorder()
    await instance.answer(1, 'あ', true)
    expect(values.size).toBe(0)
    expect(notify).toHaveBeenLastCalledWith(
      expect.objectContaining({
        canRetry: false,
        message: expect.stringContaining('Puedes jugar'),
      }),
    )
  })

  it('reports blocked storage access and releases any session lock', async () => {
    const { target, held } = browser()
    Object.defineProperty(target, 'localStorage', {
      get() {
        throw new Error('Blocked')
      },
    })
    const { instance, notify } = recorder()
    await instance.ready
    expect(notify).toHaveBeenLastCalledWith(
      expect.objectContaining({ canRetry: false }),
    )
    expect(
      [...held].filter((name) => name.startsWith('kirakana.practice.session:')),
    ).toEqual([])
  })
})
