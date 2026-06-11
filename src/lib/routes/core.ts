import { configSite } from '../site.config'

export type AppRoute = `/${string}`

export type RouteResolver = (...args: unknown[]) => AppRoute

export type SyllabarySlug = 'hiragana' | 'katakana'

export type PracticeModeSlug = 'reconocimiento'

export type PracticeIslandType = 'recognition'

export type PracticeLevel = 'basico' | 'intermedio' | 'completo' | string

export type PracticeModeStatus = 'disponible' | 'proximamente'

export interface PracticeMode {
  slug: PracticeModeSlug
  name: string
  shortName: string
  description: string
  longDescription: string
  supportedSyllabaries: SyllabarySlug[]
  island: PracticeIslandType
  status: PracticeModeStatus
  disabledReason?: string
  decoration: {
    icon: string
    kana: string
    background: string
  }
  teaches: string[]
}

export interface PracticeGroupUrlParams {
  mode: PracticeModeSlug | string
  syllabary: SyllabarySlug | string
  group?: string
  level?: PracticeLevel
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
