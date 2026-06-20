import { listeningMode } from './listening'
import { recognitionMode } from './recognition'

export const practiceModes = [recognitionMode, listeningMode] as const

export type PracticeMode = (typeof practiceModes)[number]

export function getPracticeModeBySlug(slug: string) {
  return practiceModes.find((mode) => mode.slug === slug)
}
