import { useState } from 'react'
import { readDashboard } from '../utils/dashboard'

export function useProgressDashboard() {
  const [progress] = useState(readDashboard)
  return progress
}
