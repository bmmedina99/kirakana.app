import { useMemo, useState } from 'react'
import type { PracticeLevel, SyllabarySlug } from '@/lib/routes'
import { getKanaForPractice } from '../utils/getKanaForPractice'

type Props = {
  syllabary: SyllabarySlug
  group?: string | null
  level?: PracticeLevel
}

type Option = {
  label: string
  isCorrect: boolean
}

export default function RecognitionGame({
  syllabary,
  group = null,
  level = 'basico',
}: Props) {
  const kanaPool = useMemo(() => {
    return getKanaForPractice({
      syllabary,
      group,
      level,
    })
  }, [syllabary, group, level])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const currentKana = kanaPool[currentIndex]

  const options = useMemo<Option[]>(() => {
    if (!currentKana) return []

    const wrongOptions = kanaPool
      .filter((item) => item.romaji !== currentKana.romaji)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((item) => ({
        label: item.romaji,
        isCorrect: false,
      }))

    return [
      {
        label: currentKana.romaji,
        isCorrect: true,
      },
      ...wrongOptions,
    ].sort(() => Math.random() - 0.5)
  }, [currentKana, kanaPool])

  function handleAnswer(option: Option) {
    setSelectedAnswer(option.label)

    if (option.isCorrect) {
      setScore((currentScore) => currentScore + 1)
    }

    window.setTimeout(() => {
      setSelectedAnswer(null)
      setCurrentIndex((index) => (index + 1) % kanaPool.length)
    }, 700)
  }

  if (!currentKana) {
    return (
      <div className='rounded-2xl border p-6 text-center'>
        No hay kana disponibles para esta práctica.
      </div>
    )
  }

  return (
    <div className='rounded-3xl border border-linen-200 bg-white p-6 shadow-sm'>
      <div className='mb-6 flex items-center justify-between'>
        <span className='text-sm font-medium text-neutral-600'>
          Puntuación: {score}
        </span>

        <span className='text-sm font-medium text-neutral-600'>
          {currentIndex + 1} / {kanaPool.length}
        </span>
      </div>

      <div className='mb-8 text-center'>
        <p className='mb-2 text-sm uppercase tracking-wide text-neutral-500'>
          ¿Cuál es la lectura de este kana?
        </p>

        <p className='text-8xl font-semibold text-neutral-900'>
          {currentKana.kana}
        </p>
      </div>

      <div className='grid gap-3 sm:grid-cols-2'>
        {options.map((option) => (
          <button
            key={option.label}
            type='button'
            onClick={() => handleAnswer(option)}
            className='rounded-2xl border border-linen-200 px-4 py-3 text-lg font-medium transition hover:bg-linen-100'
          >
            {option.label}
          </button>
        ))}
      </div>

      {selectedAnswer && (
        <p className='mt-4 text-center text-sm text-neutral-600'>
          Has elegido: {selectedAnswer}
        </p>
      )}
    </div>
  )
}
