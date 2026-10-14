import type { ProgressSnapshot } from './progress'
import { type ProgressError, readProgress } from './storage'

export type DashboardState = {
  snapshot: ProgressSnapshot | null
  error: ProgressError | null
  canWrite: boolean
  loadedAt: Date
}

export function readDashboard(): DashboardState {
  const loadedAt = new Date()
  const canWrite =
    typeof window !== 'undefined' && Boolean(window.navigator.locks)
  try {
    return { ...readProgress(window.localStorage), canWrite, loadedAt }
  } catch {
    return { snapshot: null, error: 'unavailable', canWrite, loadedAt }
  }
}

export function dashboardErrorMessage(error: ProgressError): string {
  if (error === 'invalid-data')
    return 'El historial contiene datos que no se pueden interpretar. Se han conservado sin cambios.'
  if (error === 'unsupported-version')
    return 'El historial pertenece a otra versión de KiraKana. Se ha conservado sin cambios.'
  return 'No se puede leer el historial. Comprueba que el navegador permite acceder a los datos del sitio.'
}
