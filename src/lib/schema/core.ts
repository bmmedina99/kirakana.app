export type SchemaPageType =
  | 'Organization'
  | 'WebSite'
  | 'SoftwareApplication'
  | 'WebPage'
  | 'BreadcrumbList'
  | 'ListItem'
  | 'EducationalOccupationalProgram'
  | 'Course'
  | 'LearningResource'
  | 'FAQPage'
  | 'Question'
  | 'Answer'

export interface SchemaBase {
  '@type': SchemaPageType | SchemaPageType[]
  '@id'?: string
  [key: string]: unknown
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface PageSchemaContext {
  url: string
  title: string
  description?: string
  schemas?: SchemaBase[]
  breadcrumbs?: BreadcrumbItem[] | false
}
