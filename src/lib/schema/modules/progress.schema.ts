import { configSite } from '@/lib/site.config'
import type { SchemaBase } from '../core'
import { webPageSchema } from './shared'

export function progressSchema(params: {
  url: string
  title: string
  description: string
}): SchemaBase[] {
  const { url, title, description } = params
  return [
    {
      ...webPageSchema({ url, title, description }),
      isAccessibleForFree: true,
      about: { '@id': `${configSite.url}/#app` },
    },
  ]
}
