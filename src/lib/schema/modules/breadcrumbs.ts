import { configSite } from '@/lib/site.config'
import type { BreadcrumbItem, SchemaBase } from '../core'

const EXCLUDED_PATHS = new Set(['', '/'])

const SEGMENT_LABELS: Record<string, string> = {
  aprender: 'Aprender',
  practicar: 'Practicar',
  progreso: 'Progreso',
  hiragana: 'Hiragana',
  katakana: 'Katakana',
  reconocimiento: 'Reconocimiento',
  escucha: 'Escucha',
  escritura: 'Escritura',
}

function formatSegment(segment: string): string {
  return (
    SEGMENT_LABELS[segment.toLowerCase()] ??
    segment.charAt(0).toUpperCase() + segment.slice(1)
  )
}

export function shouldHaveBreadcrumbs(pathname: string): boolean {
  if (EXCLUDED_PATHS.has(pathname)) return false
  const segments = pathname.replace(/^\/|\/$/g, '').split('/')
  return segments.length >= 1 && segments[0] !== ''
}

export function buildBreadcrumbItems(canonicalUrl: string): BreadcrumbItem[] {
  const { pathname } = new URL(canonicalUrl)
  const segments = pathname
    .replace(/^\/|\/$/g, '')
    .split('/')
    .filter(Boolean)

  const items: BreadcrumbItem[] = [{ name: 'Inicio', url: configSite.url }]

  segments.forEach((segment, index) => {
    const url = `${configSite.url}/${segments.slice(0, index + 1).join('/')}`
    items.push({ name: formatSegment(segment), url })
  })

  return items
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): SchemaBase {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function getBreadcrumbSchema(canonicalUrl: string): SchemaBase | null {
  const { pathname } = new URL(canonicalUrl)
  if (!shouldHaveBreadcrumbs(pathname)) return null
  return buildBreadcrumbSchema(buildBreadcrumbItems(canonicalUrl))
}
