import type { AppRoute } from '../core'

export const publicRoutes = {
  home: (): AppRoute => '/',
  progress: (): AppRoute => '/progreso/',
} as const

export const publicRoutesLabels: Record<string, string> = {
  '/': 'Inicio',
  '/progreso/': 'Progreso',
}
