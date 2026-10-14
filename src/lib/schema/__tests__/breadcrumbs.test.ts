import { describe, expect, it } from 'vitest'
import { configSite } from '@/lib/site.config'
import {
  type BreadcrumbItem,
  buildBreadcrumbItems,
  shouldHaveBreadcrumbs,
} from '..'

const BREADCRUMB_LEARN_HIRAGANA: BreadcrumbItem[] = [
  { name: 'Inicio', url: configSite.url },
  { name: 'Aprender', url: `${configSite.url}/aprender` },
  { name: 'Hiragana', url: `${configSite.url}/aprender/hiragana` },
]

const BREADCRUMB_PRACTICE_RECOGNITION: BreadcrumbItem[] = [
  { name: 'Inicio', url: configSite.url },
  { name: 'Practicar', url: `${configSite.url}/practicar` },
  { name: 'Reconocimiento', url: `${configSite.url}/practicar/reconocimiento` },
  {
    name: 'Hiragana',
    url: `${configSite.url}/practicar/reconocimiento/hiragana`,
  },
]

const URLS = {
  home: `${configSite.url}`,
  learnHiragana: `${configSite.url}/aprender/hiragana`,
  learnKatakana: `${configSite.url}/aprender/katakana`,
  practiceRecognition: `${configSite.url}/practicar/reconocimiento/hiragana`,
  practiceListening: `${configSite.url}/practicar/escucha/katakana`,
  practiceWriting: `${configSite.url}/practicar/escritura/hiragana`,
} as const

describe('shouldHaveBreadcrumbs', () => {
  it.each([
    '/aprender',
    '/aprender/hiragana',
    '/practicar/reconocimiento/hiragana',
  ])('returns true for breadcrumb-enabled route "%s"', (path) => {
    expect(shouldHaveBreadcrumbs(path)).toBe(true)
  })

  it.each(['', '/'])('returns false for root-like route "%s"', (path) => {
    expect(shouldHaveBreadcrumbs(path)).toBe(false)
  })
})

describe('buildBreadcrumbItems', () => {
  describe('learn hiragana route', () => {
    const items = buildBreadcrumbItems(URLS.learnHiragana)

    it('builds exactly three breadcrumb items', () => {
      expect(items).toHaveLength(3)
    })

    it('uses Home as the first breadcrumb item pointing to the site root', () => {
      expect(items[0]?.name).toBe('Inicio')
      expect(items[0]?.url).toBe(configSite.url)
    })

    it('uses Learn as the second breadcrumb item with the expected URL', () => {
      expect(items[1]?.name).toBe('Aprender')
      expect(items[1]?.url).toBe(`${configSite.url}/aprender`)
    })

    it('uses Hiragana as the third breadcrumb item with its canonical URL', () => {
      expect(items[2]?.name).toBe('Hiragana')
      expect(items[2]?.url).toBe(URLS.learnHiragana)
    })

    it('matches the learn hiragana breadcrumb fixture exactly', () => {
      expect(items).toEqual(BREADCRUMB_LEARN_HIRAGANA)
    })
  })

  describe('practice recognition hiragana route', () => {
    const items = buildBreadcrumbItems(URLS.practiceRecognition)

    it('builds four breadcrumb items for a three-segment route', () => {
      expect(items).toHaveLength(4)
    })

    it('returns breadcrumb labels in the expected hierarchy order', () => {
      expect(items.map((item) => item.name)).toEqual([
        'Inicio',
        'Practicar',
        'Reconocimiento',
        'Hiragana',
      ])
    })

    it('matches the practice recognition breadcrumb fixture exactly', () => {
      expect(items).toEqual(BREADCRUMB_PRACTICE_RECOGNITION)
    })
  })

  describe('unknown route segments', () => {
    it('falls back to capitalized labels for unregistered segments', () => {
      const items = buildBreadcrumbItems(
        `${configSite.url}/recursos/guia-basica`,
      )

      expect(items[1]?.name).toBe('Recursos')
      expect(items[2]?.name).toBe('Guia-basica')
    })
  })

  describe('absolute URLs', () => {
    it('uses the configured site URL when building breadcrumb URLs', () => {
      const items = buildBreadcrumbItems(URLS.learnKatakana)

      items.forEach((item) => {
        expect(item.url.startsWith(configSite.url)).toBe(true)
      })
    })
  })
})
