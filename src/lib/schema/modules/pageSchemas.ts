import type { PracticeModeSlug, SyllabarySlug } from '@/lib/routes'
import { configSite } from '@/lib/site.config'
import type { SchemaBase } from '../core'

const SYLLABARY_LABELS: Record<SyllabarySlug, string> = {
  hiragana: 'Hiragana',
  katakana: 'Katakana',
}

const MODE_LABELS: Record<PracticeModeSlug, string> = {
  reconocimiento: 'Reconocimiento',
  escucha: 'Escucha',
  escritura: 'Escritura',
}

export function webPageSchema(params: {
  url: string
  title: string
  description?: string
}): SchemaBase {
  return {
    '@type': 'WebPage',
    '@id': `${params.url}#webpage`,
    url: params.url,
    name: params.title,
    ...(params.description && { description: params.description }),
    inLanguage: configSite.lang,
    isPartOf: { '@id': `${configSite.url}#website` },
  }
}

export function homepageSchema(params: {
  url: string
  title: string
  description?: string
}): SchemaBase[] {
  return [webPageSchema(params)]
}

export function learnPageSchema(params: {
  syllabary: SyllabarySlug
  url: string
  title: string
  description: string
}): SchemaBase[] {
  const { syllabary, url, title, description } = params
  const syllabaryLabel = SYLLABARY_LABELS[syllabary] ?? syllabary
  return [
    webPageSchema({ url, title, description }),
    {
      '@type': 'Course',
      '@id': `${url}#course`,
      name: `Aprende ${syllabaryLabel}`,
      description:
        description ??
        `Aprende a leer y escribir ${syllabaryLabel}, el silabario japonés.`,
      url,
      inLanguage: configSite.lang,
      isAccessibleForFree: true,
      educationalLevel: 'Beginner',
      teaches: [
        `Lectura de ${syllabaryLabel}`,
        `Escritura de ${syllabaryLabel}`,
      ],
      provider: { '@id': `${configSite.url}#organization` },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
      },
    },
    {
      '@type': 'LearningResource',
      '@id': `${url}#learning-resource`,
      name: title,
      url,
      inLanguage: configSite.lang,
      learningResourceType: 'Lección interactiva',
      educationalUse: 'Aprendizaje',
      teaches: syllabaryLabel,
      isAccessibleForFree: true,
      isPartOf: { '@id': `${url}#course` },
    },
  ]
}

export function learnSyllabarySchema() {}

export function practicePageSchema(params: {
  mode: PracticeModeSlug
  syllabary: SyllabarySlug
  url: string
  title: string
  description: string
}): SchemaBase[] {
  const { mode, syllabary, url, title, description } = params
  const syllabaryLabel = SYLLABARY_LABELS[syllabary] ?? syllabary
  const modeLabel = MODE_LABELS[mode] ?? mode

  return [
    webPageSchema({ url, title, description }),
    {
      '@type': 'LearningResource',
      '@id': `${url}#learning-resource`,
      name: title,
      description:
        description ??
        `Practica ${syllabaryLabel} con ejercicios de tipo ${modeLabel}.`,
      url,
      inLanguage: configSite.lang,
      learningResourceType: 'Ejercicio interactivo',
      educationalUse: 'Práctica',
      teaches: syllabaryLabel,
      isAccessibleForFree: true,
      provider: { '@id': `${configSite.url}#organization` },
    },
  ]
}

export function practiceModeSchema() {}

export function practiceSessionSchema() {}

export function progressSchema() {}
