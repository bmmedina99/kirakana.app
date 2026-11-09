import { describe, expect, it } from 'vitest'
import { configSite } from '@/lib/site.config'
import {
  baseSchemas,
  buildJsonLd,
  homepageSchema,
  learnIndexSchema,
  learnSyllabarySchema,
  practiceIndexSchema,
  practiceModeSchema,
  practiceSessionSchema,
  progressSchema,
} from '..'
import { normalizePageUrl } from '../modules/shared'

const page = { title: 'Título', description: 'Descripción' }
const pages = [
  { path: '', build: homepageSchema },
  { path: '/aprender', build: learnIndexSchema },
  ...(['hiragana', 'katakana'] as const).map((syllabary) => ({
    path: `/aprender/${syllabary}`,
    build: (params: typeof page & { url: string }) =>
      learnSyllabarySchema({ ...params, syllabary }),
  })),
  { path: '/practicar', build: practiceIndexSchema },
  {
    path: '/practicar/reconocimiento',
    build: (params: typeof page & { url: string }) =>
      practiceModeSchema({ ...params, mode: 'reconocimiento' }),
  },
  ...(['hiragana', 'katakana'] as const).map((syllabary) => ({
    path: `/practicar/reconocimiento/${syllabary}`,
    build: (params: typeof page & { url: string }) =>
      practiceSessionSchema({ ...params, mode: 'reconocimiento', syllabary }),
  })),
  { path: '/progreso', build: progressSchema },
]

function collectSiteUrls(value: unknown): string[] {
  if (typeof value === 'string') {
    return value.startsWith(configSite.url) ? [value] : []
  }
  if (value && typeof value === 'object') {
    return Object.values(value).flatMap(collectSiteUrls)
  }
  return []
}

describe('schema page URLs', () => {
  it.each(pages)(
    'uses canonical URLs throughout the JSON-LD graph for "$path"',
    ({ path, build }) => {
      const url = `${configSite.url}${path}/`
      const schemas = build({ ...page, url })

      expect(build({ ...page, url: url.slice(0, -1) })).toEqual(schemas)
      expect(schemas[0]?.url).toBe(url)
      expect(schemas[0]?.['@id']).toBe(`${url}#webpage`)

      const graph = buildJsonLd({ ...page, url, schemas })
      const urls = collectSiteUrls(graph)
      expect(urls.length).toBeGreaterThan(0)
      for (const value of urls) {
        const parsed = new URL(value)
        expect(parsed.pathname).not.toContain('//')
        if (parsed.pathname.startsWith('/assets/')) {
          expect(value).toBe(
            `${configSite.url}/assets/images/kirakana-logo.webp`,
          )
        } else {
          expect(value.split('#')[0]).toMatch(/\/$/)
        }
      }
    },
  )

  it('uses the canonical home URL in every base schema', () => {
    for (const schema of baseSchemas) {
      expect(schema.url).toBe(`${configSite.url}/`)
    }
  })

  it('links collection entries to the same entities as their detail pages', () => {
    const learn = learnIndexSchema({
      ...page,
      url: `${configSite.url}/aprender/`,
    })
    const practice = practiceModeSchema({
      ...page,
      url: `${configSite.url}/practicar/reconocimiento/`,
      mode: 'reconocimiento',
    })

    for (const syllabary of ['hiragana', 'katakana'] as const) {
      const learnUrl = `${configSite.url}/aprender/${syllabary}/`
      const practiceUrl = `${configSite.url}/practicar/reconocimiento/${syllabary}/`
      expect(learn.find((schema) => schema.url === learnUrl)?.['@id']).toBe(
        learnSyllabarySchema({ ...page, url: learnUrl, syllabary })[1]?.['@id'],
      )
      expect(
        practice.find((schema) => schema.url === practiceUrl)?.['@id'],
      ).toBe(
        practiceSessionSchema({
          ...page,
          url: practiceUrl,
          mode: 'reconocimiento',
          syllabary,
        })[1]?.['@id'],
      )
    }
  })
})

describe('normalizePageUrl', () => {
  it.each(['', '/', '///'])(
    'ensures a single trailing slash for suffix "%s"',
    (suffix) => {
      const url = `${configSite.url}/aprender${suffix}`
      expect(normalizePageUrl(url)).toBe(`${configSite.url}/aprender/`)
    },
  )

  it('adds the slash to the pathname before the query and fragment', () => {
    expect(
      normalizePageUrl(`${configSite.url}/aprender?group=vocales#kana`),
    ).toBe(`${configSite.url}/aprender/?group=vocales#kana`)
  })
})
