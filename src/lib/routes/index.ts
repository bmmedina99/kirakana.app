import { learnRoutes, learnRoutesLabels } from './modules/learn'
import { practiceRoutes, practiceRoutesLabels } from './modules/practice'
import { publicRoutes, publicRoutesLabels } from './modules/public'

export const routes = {
  ...publicRoutes,
  learn: learnRoutes,
  practice: practiceRoutes,
} as const

export const routeLabels: Record<string, string> = {
  ...publicRoutesLabels,
  ...learnRoutesLabels,
  ...practiceRoutesLabels,
}

export type {
  PracticeLevel,
  PracticeModeSlug,
  SyllabarySlug,
} from './core'
export { createPracticeGroupUrl } from './modules/practice'
