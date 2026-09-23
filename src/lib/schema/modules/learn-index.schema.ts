import { configSite } from '@/lib/site.config'
import type { SchemaBase } from '../core'
import { webPageSchema } from './shared'

export function learnIndexSchema(params: {
  url: string
  title: string
  description: string
}): SchemaBase[] {
  const { url, title, description } = params
  return [
    webPageSchema({ url, title, description, type: 'CollectionPage' }),
    {
      '@type': 'Course',
      '@id': `${url}/hiragana/#course`,
      name: `Aprende hiragana`,
      description:
        'Aprende a leer y escribir Hiragana, el silabario japonés fundamental.',
      url: `${url}/hiragana`,
      inLanguage: configSite.lang,
      isAccessibleForFree: true,
      educationalLevel: 'Beginner',
      teaches: ['Lectura de Hiragana', 'Escritura de Hiragana'],
      provider: { '@id': `${configSite.url}/#organization` },
    },
    {
      '@type': 'Course',
      '@id': `${url}/katakana/#course`,
      name: `Aprende katakana`,
      description:
        'Aprende a leer y escribir Katakana, el silabario para palabras extranjeras.',
      url: `${url}/katakana`,
      inLanguage: configSite.lang,
      isAccessibleForFree: true,
      educationalLevel: 'Beginner',
      teaches: ['Lectura de Katakana', 'Escritura de Katakana'],
      provider: { '@id': `${configSite.url}/#organization` },
    },
  ]
}
