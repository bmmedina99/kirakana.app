import type { PracticeModeSlug, SyllabarySlug } from '@/lib/routes'
import { configSite } from '@/lib/site.config'
import type { SchemaBase } from '../core'

export const SYLLABARY_LABELS: Record<SyllabarySlug, string> = {
  hiragana: 'Hiragana',
  katakana: 'Katakana',
}

export const PRACTICE_MODES: PracticeModeSlug[] = ['reconocimiento']

export const MODE_LABELS: Record<PracticeModeSlug, string> = {
  reconocimiento: 'Reconocimiento',
  escucha: 'Escucha',
  escritura: 'Escritura',
}

export const MODE_DESCRIPTIONS: Record<PracticeModeSlug, string> = {
  reconocimiento: 'Identifica el carácter correcto a partir de su lectura.',
  escucha: 'Escucha el sonido y selecciona el carácter correspondiente.',
  escritura: 'Trazando los caracteres con la secuencia correcta de trazos.',
}

export function webPageSchema(params: {
  url: string
  title: string
  description?: string
  type?: 'WebPage' | 'CollectionPage'
}): SchemaBase {
  const { url, title, description, type = 'WebPage' } = params
  return {
    '@type': type,
    '@id': `${url}/#webpage`,
    url: url,
    name: title,
    ...(description && { description }),
    inLanguage: configSite.lang,
    isPartOf: { '@id': `${configSite.url}/#website` },
  }
}
