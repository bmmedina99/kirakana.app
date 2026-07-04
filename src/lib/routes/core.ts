import { configSite } from '../site.config'

export type AppRoute = `/${string}`

export type SyllabarySlug = 'hiragana' | 'katakana'

export type PracticeModeSlug = 'reconocimiento' | 'escucha' | 'escritura'

export type PracticeLevel = 'basico' | 'intermedio' | 'completo' | string

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
