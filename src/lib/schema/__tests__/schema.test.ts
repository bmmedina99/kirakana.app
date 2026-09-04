import { describe, expect, it } from 'vitest'
import { configSite } from '@/lib/site.config'
import {
  baseSchemas,
  organizationSchema,
  softwareAppSchema,
  websiteSchema,
} from '..'

describe('organizationSchema', () => {
  it('has "Organization" as @type', () => {
    expect(organizationSchema['@type']).toBe('Organization')
  })

  it('has a canonical @id with the #organization suffix', () => {
    expect(organizationSchema['@id']).toBe(`${configSite.url}/#organization`)
  })

  it('uses the configured site name', () => {
    expect(organizationSchema.name).toBe(configSite.name)
  })

  it('uses the configured site root URL', () => {
    expect(organizationSchema.url).toBe(configSite.url)
  })

  it('uses a logo URL that belongs to the site domain', () => {
    const logo = organizationSchema.logo as Record<string, unknown>

    expect((logo.url as string).startsWith(configSite.url)).toBe(true)
  })
})

describe('websiteSchema', () => {
  it('has "WebSite" as @type', () => {
    expect(websiteSchema['@type']).toBe('WebSite')
  })

  it('has a canonical @id with the #website suffix', () => {
    expect(websiteSchema['@id']).toBe(`${configSite.url}/#website`)
  })

  it('has a non-empty description', () => {
    expect(typeof websiteSchema.description).toBe('string')
    expect((websiteSchema.description as string).length).toBeGreaterThan(0)
  })

  it('uses the configured site language', () => {
    expect(websiteSchema.inLanguage).toBe(configSite.lang)
  })

  it('references the organization as publisher', () => {
    const publisher = websiteSchema.publisher as Record<string, unknown>

    expect(publisher['@id']).toBe(`${configSite.url}/#organization`)
  })
})

describe('softwareAppSchema', () => {
  it('has "SoftwareApplication" as @type', () => {
    expect(softwareAppSchema['@type']).toBe('SoftwareApplication')
  })

  it('has a canonical @id with the #app suffix', () => {
    expect(softwareAppSchema['@id']).toBe(`${configSite.url}/#app`)
  })

  it('uses "Web" as operating system', () => {
    expect(softwareAppSchema.operatingSystem).toBe('Web')
  })

  it('is marked as freely accessible', () => {
    expect(softwareAppSchema.isAccessibleForFree).toBe(true)
  })

  it('teaches both Hiragana and Katakana', () => {
    const teaches = softwareAppSchema.teaches as string[]

    expect(teaches).toContain('Hiragana')
    expect(teaches).toContain('Katakana')
  })
})

describe('baseSchemas', () => {
  it('exports exactly three base schemas', () => {
    expect(baseSchemas).toHaveLength(3)
  })

  it('contains Organization, WebSite, and SoftwareApplication in order', () => {
    expect(baseSchemas[0]?.['@type']).toBe('Organization')
    expect(baseSchemas[1]?.['@type']).toBe('WebSite')
    expect(baseSchemas[2]?.['@type']).toBe('SoftwareApplication')
  })

  it('defines an @type for every base schema', () => {
    baseSchemas.forEach((schema) => {
      expect(schema['@type']).toBeDefined()
    })
  })

  it('defines a site-based @id for every base schema', () => {
    baseSchemas.forEach((schema) => {
      expect(typeof schema['@id']).toBe('string')
      expect((schema['@id'] as string).startsWith(configSite.url)).toBe(true)
    })
  })

  it('uses unique @id values across all base schemas', () => {
    const ids = baseSchemas.map((schema) => schema['@id'])
    const uniqueIds = new Set(ids)

    expect(uniqueIds.size).toBe(baseSchemas.length)
  })
})
