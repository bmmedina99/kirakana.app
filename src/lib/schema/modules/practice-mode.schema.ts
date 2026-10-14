import type { PracticeModeSlug, SyllabarySlug } from '@/lib/routes'
import { configSite } from '@/lib/site.config'
import type { SchemaBase } from '../core'
import {
  MODE_DESCRIPTIONS,
  MODE_LABELS,
  SYLLABARY_LABELS,
  webPageSchema,
} from './shared'

const SYLLABARIES: SyllabarySlug[] = ['hiragana', 'katakana']

export function practiceModeSchema(params: {
  mode: PracticeModeSlug
  url: string
  title: string
  description: string
}): SchemaBase[] {
  const { mode, url, title, description } = params
  const modeLabel = MODE_LABELS[mode]
  return [
    webPageSchema({ url, title, description, type: 'CollectionPage' }),
    ...SYLLABARIES.map((syllabary): SchemaBase => {
      const syllabaryLabel = SYLLABARY_LABELS[syllabary]
      const syllabaryUrl = `${url}/${syllabary}`

      return {
        '@type': 'LearningResource',
        '@id': `${syllabaryUrl}/#learning-resource`,
        name: `${modeLabel} de ${syllabaryLabel}`,
        description: `${MODE_DESCRIPTIONS[mode]} Silabario: ${syllabaryLabel}.`,
        url: syllabaryUrl,
        inLanguage: configSite.lang,
        learningResourceType: 'Ejercicio interactivo',
        educationalUse: 'Práctica',
        teaches: syllabaryLabel,
        isAccessibleForFree: true,
        provider: { '@id': `${configSite.url}/#organization` },
        isPartOf: { '@id': `${url}/#webpage` },
      }
    }),
  ]
}
