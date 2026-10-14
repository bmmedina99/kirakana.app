import { configSite } from '@/lib/site.config'
import type { SchemaBase } from '../core'
import {
  MODE_DESCRIPTIONS,
  MODE_LABELS,
  PRACTICE_MODES,
  webPageSchema,
} from './shared'

export function practiceIndexSchema(params: {
  url: string
  title: string
  description: string
}): SchemaBase[] {
  const { url, title, description } = params
  return [
    webPageSchema({ url, title, description, type: 'CollectionPage' }),
    ...PRACTICE_MODES.map(
      (mode): SchemaBase => ({
        '@type': 'LearningResource',
        '@id': `${url}/${mode}/#learning-resource`,
        name: `Práctica de ${MODE_LABELS[mode]}`,
        description: MODE_DESCRIPTIONS[mode],
        url: `${url}/${mode}`,
        inLanguage: configSite.lang,
        learningResourceType: 'Ejercicio interactivo',
        educationalUse: 'Práctica',
        isAccessibleForFree: true,
        provider: { '@id': `${configSite.url}/#organization` },
        isPartOf: { '@id': `${url}/#webpage` },
      }),
    ),
  ]
}
