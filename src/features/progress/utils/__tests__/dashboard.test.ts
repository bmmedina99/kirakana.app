import { afterEach, describe, expect, it, vi } from 'vitest'
import { dashboardErrorMessage, readDashboard } from '../dashboard'
import {
  addRecognitionSession,
  createRecognitionSession,
} from '../practiceProgress'
import { applyLearningView, emptyProgress } from '../progress'
import { PROGRESS_STORAGE_KEY } from '../storage'

const instant = '2026-09-25T10:00:00.000Z'
const sample = applyLearningView(
  emptyProgress(),
  'hiragana',
  'あ',
  instant,
  '2026-09-25',
)

function browser(raw: string | null = JSON.stringify(sample), locks = true) {
  const values = new Map<string, string>([['unrelated', 'keep']])
  if (raw !== null) values.set(PROGRESS_STORAGE_KEY, raw)
  const storage = {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  }
  const target = new EventTarget()
  const documentTarget = new EventTarget()
  const request = vi.fn()
  const query = vi.fn()
  vi.stubGlobal(
    'window',
    Object.assign(target, {
      localStorage: storage,
      navigator: { locks: locks ? { request, query } : undefined },
      setInterval: vi.fn(),
      setTimeout: vi.fn(),
    }),
  )
  vi.stubGlobal(
    'document',
    Object.assign(documentTarget, { visibilityState: 'visible' }),
  )
  return { storage, values, request, query }
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('dashboard error messages', () => {
  it.each([
    [
      'invalid-data',
      'El historial contiene datos que no se pueden interpretar. Se han conservado sin cambios.',
    ],
    [
      'unsupported-version',
      'El historial pertenece a otra versión de KiraKana. Se ha conservado sin cambios.',
    ],
    [
      'unavailable',
      'No se puede leer el historial. Comprueba que el navegador permite acceder a los datos del sitio.',
    ],
  ] as const)('describes %s errors', (error, message) => {
    expect(dashboardErrorMessage(error)).toBe(message)
  })
})

describe('dashboard snapshot', () => {
  it('reads existing data synchronously without requiring Web Locks', () => {
    const env = browser(undefined, false)
    expect(readDashboard()).toMatchObject({
      snapshot: sample,
      error: null,
      canWrite: false,
    })
    expect(env.storage.getItem).toHaveBeenCalledExactlyOnceWith(
      PROGRESS_STORAGE_KEY,
    )
    expect(env.storage.setItem).not.toHaveBeenCalled()
    expect(env.storage.removeItem).not.toHaveBeenCalled()
  })

  it('distinguishes empty history from a failed read without creating a document', () => {
    const env = browser(null)
    expect(readDashboard()).toMatchObject({
      snapshot: emptyProgress(),
      error: null,
    })
    expect(env.storage.setItem).not.toHaveBeenCalled()
    expect(env.values.has(PROGRESS_STORAGE_KEY)).toBe(false)
  })

  it('handles a throwing localStorage getter', () => {
    browser()
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('blocked')
      },
    })
    expect(readDashboard()).toMatchObject({
      snapshot: null,
      error: 'unavailable',
    })
  })

  it('handles failed reads', () => {
    const env = browser()
    env.storage.getItem.mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(readDashboard()).toMatchObject({
      snapshot: null,
      error: 'unavailable',
    })
  })

  it.each([
    ['{broken', 'invalid-data'],
    ['{"version":2}', 'unsupported-version'],
  ])('preserves unreadable history %s', (raw, error) => {
    const env = browser(raw)
    expect(readDashboard()).toMatchObject({ snapshot: null, error })
    expect(env.values.get(PROGRESS_STORAGE_KEY)).toBe(raw)
    expect(env.storage.setItem).not.toHaveBeenCalled()
    expect(env.storage.removeItem).not.toHaveBeenCalled()
  })

  it('keeps data and the calculation date unchanged across events and midnight', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-09-25T23:59:50Z'))
    const env = browser()
    const windowListener = vi.spyOn(window, 'addEventListener')
    const documentListener = vi.spyOn(document, 'addEventListener')
    const state = readDashboard()
    env.values.delete(PROGRESS_STORAGE_KEY)
    for (const key of [PROGRESS_STORAGE_KEY, null]) {
      window.dispatchEvent(Object.assign(new Event('storage'), { key }))
    }
    window.dispatchEvent(new Event('focus'))
    document.dispatchEvent(new Event('visibilitychange'))
    vi.advanceTimersByTime(120_000)
    expect(state.snapshot).toEqual(sample)
    expect(state.loadedAt.toISOString()).toBe('2026-09-25T23:59:50.000Z')
    expect(env.storage.getItem).toHaveBeenCalledTimes(1)
    expect(windowListener).not.toHaveBeenCalled()
    expect(documentListener).not.toHaveBeenCalled()
    expect(window.setInterval).not.toHaveBeenCalled()
    expect(window.setTimeout).not.toHaveBeenCalled()
  })

  it('takes current storage values on the next page load', () => {
    const env = browser()
    const previous = readDashboard()
    const next = applyLearningView(
      sample,
      'katakana',
      'ア',
      instant,
      '2026-09-25',
    )
    env.values.set(PROGRESS_STORAGE_KEY, JSON.stringify(next))
    expect(readDashboard().snapshot).toEqual(next)
    expect(previous.snapshot).toEqual(sample)
    env.values.delete(PROGRESS_STORAGE_KEY)
    expect(readDashboard().snapshot).toEqual(emptyProgress())
  })

  it('does not recover or write interrupted sessions when opening the panel', () => {
    const snapshot = addRecognitionSession(
      emptyProgress(),
      createRecognitionSession(
        'orphan',
        'hiragana',
        { group: null, level: 'basico' },
        instant,
      ),
    )
    const env = browser(JSON.stringify(snapshot))
    expect(readDashboard().snapshot).toEqual(snapshot)
    expect(env.request).not.toHaveBeenCalled()
    expect(env.query).not.toHaveBeenCalled()
    expect(env.storage.setItem).not.toHaveBeenCalled()
  })
})
