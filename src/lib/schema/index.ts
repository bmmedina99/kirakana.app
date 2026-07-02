export type { BreadcrumbItem, PageSchemaContext, SchemaBase } from './core'
export {
  baseSchemas,
  organizationSchema,
  softwareAppSchema,
  websiteSchema,
} from './modules/baseSchema'
export {
  buildBreadcrumbItems,
  buildBreadcrumbSchema,
  getBreadcrumbSchema,
  shouldHaveBreadcrumbs,
} from './modules/breadcrumbs'
export { buildJsonLd, composeSchemas } from './modules/composer'
export {
  homepageSchema,
  learnPageSchema,
  learnSyllabarySchema,
  practicePageSchema,
  practiceModeSchema,
  practiceSessionSchema,
  progressSchema,
} from './modules/pageSchemas'
