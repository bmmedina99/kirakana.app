import type { PageSchemaContext, SchemaBase } from '../core'
import { baseSchemas } from './base.schema'
import { buildBreadcrumbSchema, getBreadcrumbSchema } from './breadcrumbs'

export function composeSchemas(context: PageSchemaContext): SchemaBase[] {
  const { url, schemas: pageSchemas = [], breadcrumbs } = context

  const composed: SchemaBase[] = [...baseSchemas]

  if (pageSchemas.length > 0) {
    composed.push(...pageSchemas)
  }

  if (breadcrumbs !== false) {
    const breadcrumbSchema = Array.isArray(breadcrumbs)
      ? buildBreadcrumbSchema(breadcrumbs)
      : getBreadcrumbSchema(url)

    if (breadcrumbSchema) {
      composed.push(breadcrumbSchema)
    }
  }

  return composed
}

export function buildJsonLd(context: PageSchemaContext): object {
  return {
    '@context': 'https://schema.org',
    '@graph': composeSchemas(context),
  }
}
