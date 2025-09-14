import { useEffect, useState } from 'react'
import { readScores } from '@/libs/utils/score'
import type { ScoreEntry } from '@/types'

export default function ScorePuzzle() {
  const [scores, setScores] = useState<ScoreEntry[]>([])

  useEffect(() => {
    const loadedScores = readScores()
    setScores(loadedScores)
  }, [])

  if (scores.length === 0) {
    return <p className='text-center'>No hay puntuaciones disponibles.</p>
  }

  return (
    <>
      {scores
        .slice()
        .reverse()
        .map((score) => (
          <div
            key={score.date}
            className='flex items-center justify-between space-y-4'
          >
            <div>
              <p className='font-medium capitalize'>{score.kanaType}</p>
              <p className='text-sm text-neutral-800'>
                {new Date(score.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div className='text-right'>
              <p className='text-lg font-bold'>
                {score.correct} / {score.total}
              </p>
              <p
                className={`text-sm font-medium ${
                  score.correct >= 35
                    ? 'text-green-700'
                    : score.correct >= 15
                      ? 'text-yellow-700'
                      : 'text-red-700'
                }`}
              >
                {score.correct >= 35
                  ? 'Excelente'
                  : score.correct >= 15
                    ? 'Muy bien'
                    : 'Sigue practicando'}
              </p>
            </div>
          </div>
        ))}
    </>
  )
}
