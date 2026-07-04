import type { SyllabarySlug } from '@/lib/routes'
import { configSite } from '@/lib/site.config'
import type { SchemaBase } from '../core'
import { SYLLABARY_LABELS, webPageSchema } from './shared'

export function learnSyllabarySchema(params: {
  syllabary: SyllabarySlug
  url: string
  title: string
  description: string
}): SchemaBase[] {
  const { syllabary, url, title, description } = params
  const teaches = SYLLABARY_LABELS[syllabary]
  return [
    webPageSchema({ url, title, description }),
    {
      '@type': 'Course',
      '@id': `${url}/#course`,
      name: `Aprende ${syllabary}`,
      description,
      url,
      inLanguage: configSite.lang,
      isAccessibleForFree: true,
      educationalLevel: 'Beginner',
      teaches: [`Lectura de ${syllabary}`, `Escritura de ${syllabary}`],
      provider: { '@id': `${configSite.url}/#organization` },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
      },
      isPartOf: { '@id': `${configSite.url}/aprender/#webpage` },
    },
    {
      '@type': 'LearningResource',
      '@id': `${url}/#learning-resource`,
      name: title,
      description,
      url,
      inLanguage: configSite.lang,
      learningResourceType: 'Lección interactiva',
      educationalUse: 'Aprendizaje',
      teaches,
      isAccessibleForFree: true,
      isPartOf: { '@id': `${url}/#course` },
    },
  ]
}
