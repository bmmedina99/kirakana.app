import type { PracticeModeSlug, SyllabarySlug } from '@/lib/routes'
import { configSite } from '@/lib/site.config'
import type { SchemaBase } from '../core'
import { SYLLABARY_LABELS, webPageSchema } from './shared'

export function practiceSessionSchema(params: {
  mode: PracticeModeSlug
  syllabary: SyllabarySlug
  url: string
  title: string
  description: string
}): SchemaBase[] {
  const { mode, syllabary, url, title, description } = params
  const syllabaryLabel = SYLLABARY_LABELS[syllabary]
  return [
    webPageSchema({ url, title, description }),
    {
      '@type': 'LearningResource',
      '@id': `${url}/#learning-resource`,
      name: title,
      description,
      url,
      inLanguage: configSite.lang,
      learningResourceType: 'Ejercicio interactivo',
      educationalUse: 'Práctica',
      teaches: syllabaryLabel,
      isAccessibleForFree: true,
      about: { '@id': `${configSite.url}/aprender/${syllabary}/#course` },
      provider: { '@id': `${configSite.url}/#organization` },
      isPartOf: { '@id': `${configSite.url}/practicar/${mode}/#webpage` },
    },
  ]
}
