import { afterEach, describe, expect, it, vi } from 'vitest'
import { emptyProgress } from '../progress'
import {
  clearProgress,
  clearStoredProgress,
  learningStorageMessage,
  PROGRESS_STORAGE_KEY,
  readProgress,
  recordLearningView,
  saveProgress,
} from '../storage'

function memoryStorage() {
  const values = new Map<string, string>()
  return {
    values,
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      values.set(key, value)
    }),
    removeItem: vi.fn((key: string) => {
      values.delete(key)
    }),
  }
}

function browser(storage = memoryStorage()) {
  let queue: Promise<unknown> = Promise.resolve()
  const request = vi.fn((_name: string, callback: () => unknown) => {
    const pending = queue.then(callback)
    queue = pending.catch(() => undefined)
    return pending
  })
  vi.stubGlobal('window', {
    localStorage: storage,
    navigator: { locks: { request } },
  })
  return { storage, request }
}

const now = new Date('2026-09-20T10:00:00.000Z')

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
})

describe('progress storage', () => {
  it('provides a message for every learning storage error', () => {
    expect(learningStorageMessage('invalid-data')).toContain(
      'historial tiene datos',
    )
    expect(learningStorageMessage('unsupported-version')).toContain(
      'otra versión',
    )
    expect(learningStorageMessage('coordination-unavailable')).toContain(
      'no está disponible',
    )
    expect(learningStorageMessage('write-failed')).toContain(
      'No se ha podido guardar',
    )
  })

  it('returns an empty document without writing on read', () => {
    const storage = memoryStorage()
    expect(readProgress(storage)).toEqual({
      snapshot: emptyProgress(),
      error: null,
    })
    expect(storage.setItem).not.toHaveBeenCalled()
  })

  it('round-trips only the owned key', () => {
    const storage = memoryStorage()
    storage.values.set('unrelated', 'keep')
    expect(saveProgress(storage, emptyProgress())).toBe(true)
    expect(readProgress(storage)).toEqual({
      snapshot: emptyProgress(),
      error: null,
    })
    expect(storage.values.get('unrelated')).toBe('keep')
    expect(storage.setItem).toHaveBeenCalledWith(
      PROGRESS_STORAGE_KEY,
      JSON.stringify(emptyProgress()),
    )
  })

  it.each([
    ['{broken', 'invalid-data'],
    ['null', 'invalid-data'],
    ['{}', 'invalid-data'],
    ['{"version":2}', 'unsupported-version'],
  ])('preserves unreadable document %s', async (raw, error) => {
    const { storage } = browser()
    storage.values.set(PROGRESS_STORAGE_KEY, raw)
    expect(readProgress(storage)).toEqual({ snapshot: null, error })
    expect(await recordLearningView('hiragana', 'あ', now)).toEqual({
      ok: false,
      error,
    })
    expect(storage.values.get(PROGRESS_STORAGE_KEY)).toBe(raw)
    expect(storage.setItem).not.toHaveBeenCalled()
  })

  it('reports blocked reads', () => {
    const storage = memoryStorage()
    storage.getItem.mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(readProgress(storage)).toEqual({
      snapshot: null,
      error: 'unavailable',
    })
  })

  it('does not save an invalid snapshot', () => {
    const storage = memoryStorage()
    expect(
      saveProgress(storage, { ...emptyProgress(), activityDays: ['invalid'] }),
    ).toBe(false)
    expect(storage.setItem).not.toHaveBeenCalled()
  })

  it('reports quota errors without replacing the previous document', async () => {
    const { storage } = browser()
    storage.values.set(PROGRESS_STORAGE_KEY, JSON.stringify(emptyProgress()))
    storage.setItem.mockImplementation(() => {
      throw new DOMException('Full', 'QuotaExceededError')
    })
    expect(await recordLearningView('hiragana', 'あ', now)).toEqual({
      ok: false,
      error: 'write-failed',
    })
    expect(readProgress(storage).snapshot).toEqual(emptyProgress())
  })

  it('clears only KiraKana progress, including an invalid document', () => {
    const storage = memoryStorage()
    storage.values.set('unrelated', 'keep')
    storage.values.set(PROGRESS_STORAGE_KEY, '{broken')
    expect(clearProgress(storage)).toBe(true)
    expect(storage.values.has(PROGRESS_STORAGE_KEY)).toBe(false)
    expect(storage.values.get('unrelated')).toBe('keep')
  })

  it('reports deletion failures', async () => {
    const { storage } = browser()
    storage.removeItem.mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(await clearStoredProgress()).toEqual({
      ok: false,
      error: 'write-failed',
    })
  })
})

describe('coordinated learning writes', () => {
  it('rereads inside the lock and preserves concurrent views and other sections', async () => {
    const { storage, request } = browser()
    storage.values.set(
      PROGRESS_STORAGE_KEY,
      JSON.stringify({ ...emptyProgress(), extension: { marker: true } }),
    )
    const results = await Promise.all([
      recordLearningView('hiragana', 'あ', now),
      recordLearningView('katakana', 'ア', now),
      recordLearningView('hiragana', 'い', now),
    ])
    expect(results.every((result) => result.ok)).toBe(true)
    const { snapshot } = readProgress(storage)
    expect(Object.keys(snapshot?.learning.hiragana ?? {})).toEqual(['あ', 'い'])
    expect(Object.keys(snapshot?.learning.katakana ?? {})).toEqual(['ア'])
    expect(snapshot?.extension).toEqual({ marker: true })
    expect(new Set(request.mock.calls.map(([name]) => name)).size).toBe(1)
  })

  it('keeps the event date when the write waits for a lock', async () => {
    vi.stubEnv('TZ', 'Asia/Tokyo')
    const { storage } = browser()
    const date = new Date('2026-12-31T15:30:00.000Z')
    const pending = recordLearningView('hiragana', 'あ', date)
    date.setUTCFullYear(2027)
    await pending
    const { snapshot } = readProgress(storage)
    expect(snapshot?.activityDays).toEqual(['2027-01-01'])
    expect(snapshot?.learning.hiragana.あ?.firstViewedAt).toBe(
      '2026-12-31T15:30:00.000Z',
    )
  })

  it('orders deletion after pending writes and permits new activity afterwards', async () => {
    const { storage, request } = browser()
    const pending = recordLearningView('hiragana', 'あ', now)
    const clear = clearStoredProgress()
    await Promise.all([pending, clear])
    expect(storage.values.has(PROGRESS_STORAGE_KEY)).toBe(false)
    expect(new Set(request.mock.calls.map(([name]) => name)).size).toBe(1)

    await recordLearningView('hiragana', 'い', now)
    expect(
      Object.keys(readProgress(storage).snapshot?.learning.hiragana ?? {}),
    ).toEqual(['い'])
  })

  it('handles a blocked localStorage property', async () => {
    browser()
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('blocked')
      },
    })
    expect(await recordLearningView('hiragana', 'あ', now)).toEqual({
      ok: false,
      error: 'unavailable',
    })
  })

  it('does not perform uncoordinated writes when Web Locks is unavailable', async () => {
    const storage = memoryStorage()
    vi.stubGlobal('window', { localStorage: storage, navigator: {} })
    expect(await recordLearningView('hiragana', 'あ', now)).toEqual({
      ok: false,
      error: 'coordination-unavailable',
    })
    expect(storage.setItem).not.toHaveBeenCalled()
  })

  it('is safe outside the browser', async () => {
    expect(await recordLearningView('hiragana', 'あ', now)).toEqual({
      ok: false,
      error: 'unavailable',
    })
  })

  it('rejects invalid event data without writing', async () => {
    const { storage } = browser()
    expect(await recordLearningView('hiragana', 'ア', now)).toEqual({
      ok: false,
      error: 'invalid-data',
    })
    expect(
      await recordLearningView('hiragana', 'あ', new Date('invalid')),
    ).toEqual({ ok: false, error: 'invalid-data' })
    expect(storage.setItem).not.toHaveBeenCalled()
  })
})
