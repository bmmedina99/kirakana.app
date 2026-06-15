import { baseSchema } from '@/lib/seo/baseSchema'

export const practiceShema = {
  '@context': 'https://schema.org',
  '@graph': [
    ...baseSchema,
    {
      '@type': 'CollectionPage',
      '@id': 'https://kirakana.app/practicar/#webpage',
      url: 'https://kirakana.app/practicar/',
      name: 'Practicar Hiragana y Katakana | KiraKana',
      description:
        'Practica Hiragana y Katakana con ejercicios interactivos de reconocimiento visual y escucha.',
      inLanguage: 'es',
      isPartOf: {
        '@id': 'https://kirakana.app/#website',
      },
      mainEntity: {
        '@id': 'https://kirakana.app/practicar/#learning-resource',
      },
    },
    {
      '@type': 'LearningResource',
      '@id': 'https://kirakana.app/practicar/#learning-resource',
      name: 'Práctica de Hiragana y Katakana',
      description:
        'Ejercicios interactivos para practicar Hiragana y Katakana mediante reconocimiento visual y escucha.',
      inLanguage: 'es',
      isAccessibleForFree: true,
      educationalLevel: 'Beginner',
      educationalUse: 'Practice',
      teaches: [
        'Hiragana',
        'Katakana',
        'Lectura de kana',
        'Reconocimiento de kana',
      ],
      learningResourceType: ['Interactive exercise', 'Practice activity'],
      provider: {
        '@id': 'https://kirakana.app/#organization',
      },
      isPartOf: {
        '@id': 'https://kirakana.app/#app',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://kirakana.app/practicar/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: 'https://kirakana.app/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Practicar',
          item: 'https://kirakana.app/practicar/',
        },
      ],
    },
  ],
}
