import { configSite } from '@/lib/site.config'
import type { SchemaBase } from '../core'
import { webPageSchema } from './shared'

export function homepageSchema(params: {
  url: string
  title: string
  description?: string
}): SchemaBase[] {
  const url = configSite.url
  return [
    {
      ...webPageSchema(params),
      specialCommitments: 'FreeToUse',
      mainEntity: { '@id': `${url}/#app` },
    },
  ]
}
