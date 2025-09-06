import type { ScoreEntry } from '@/types'

function writeScores(scores: ScoreEntry[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('kirakana:scores', JSON.stringify(scores))
  } catch {
    console.warn('No se pudo guardar el score.')
  }
}

export function readScores(): ScoreEntry[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem('kirakana:scores')
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function appendScore(entry: ScoreEntry) {
  const current = readScores()
  current.push(entry)
  if (current.length > 5) current.shift()
  writeScores(current)
}
