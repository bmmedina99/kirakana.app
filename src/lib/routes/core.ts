import { configSite } from '../site.config'

export type AppRoute = `/${string}`

export type RouteResolver = (...args: unknown[]) => AppRoute

export type SyllabarySlug = 'hiragana' | 'katakana'

export type PracticeModeSlug = 'reconocimiento'

export type PracticeIslandType = 'recognition'

// TODO: implement more practice levels in the future
export type PracticeLevelSlug = 'completo'

export interface PracticeMode {
  slug: PracticeModeSlug
  name: string
  shortName: string
  description: string
  longDescription: string
  supportedSyllabaries: SyllabarySlug[]
  island: PracticeIslandType
  teaches: string[]
}

export interface PracticeGroupUrlParams {
  mode: PracticeModeSlug | string
  syllabary: SyllabarySlug | string
  group?: string
  level?: PracticeLevelSlug
}

export function buildUrl(
  pathname: AppRoute,
  params: Record<string, string | undefined | null>,
): string {
  const url = new URL(pathname, configSite.url)

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) url.searchParams.set(key, value)
  }

  return `${url.pathname}${url.search}`
}
