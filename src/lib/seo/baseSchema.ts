import { configSite } from '@/lib/site.config'

export const baseSchema = [
  {
    '@type': 'Organization',
    '@id': 'https://kirakana.app/#organization',
    name: configSite.name,
    url: configSite.url,
    logo: {
      '@type': 'ImageObject',
      url: 'https://kirakana.app/images/logo.webp',
    },
  },
  {
    '@type': 'WebSite',
    '@id': 'https://kirakana.app/#website',
    name: configSite.name,
    url: configSite.url,
    description: configSite.description,
    inLanguage: configSite.lang,
    publisher: {
      '@id': 'https://kirakana.app/#organization',
    },
  },
  {
    '@type': 'SoftwareApplication',
    '@id': 'https://kirakana.app/#app',
    name: configSite.name,
    url: configSite.url,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    description: configSite.description,
    inLanguage: configSite.lang,
    isAccessibleForFree: true,
    educationalUse: ['Aprendizaje', 'Práctica'],
    teaches: ['Hiragana', 'Katakana', 'Escritura japonesa básica'],
    learningResourceType: [
      'Ejercicios interactivos',
      'Aprendizaje autodidacta',
    ],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    publisher: {
      '@id': 'https://kirakana.app/#organization',
    },
  },
]
