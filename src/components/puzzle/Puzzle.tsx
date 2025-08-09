import { useCallback, useEffect, useState } from 'react'
import type { Feedback, KanaItem, Mode } from '@/types'
import { dataset, totalKanas } from '@/utils/mode'
import { shuffle } from '@/utils/shuffle'

export default function Practice() {
  const [mode, setMode] = useState<Mode>(null)
  const [lives, setLives] = useState<number>(3)
  const [correctAnswers, setCorrectAnswers] = useState<number>(0)
  const [remainingKanas, setRemainingKanas] = useState<KanaItem[]>([])
  const [currentKana, setCurrentKana] = useState<KanaItem | null>(null)
  const [options, setOptions] = useState<string[]>([])
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [isFinished, setIsFinished] = useState<boolean>(false)

  const startPuzzle = (selectedMode: Mode) => {
    setMode(selectedMode)
    setRemainingKanas(shuffle(dataset(selectedMode)))
    setLives(3)
    setCorrectAnswers(0)
    setCurrentKana(null)
    setOptions([])
    setFeedback(null)
    setIsFinished(false)
  }

  const handleSelection = (option: string) => {
    if (option === currentKana?.romanji) {
      setFeedback('correct')
      setCorrectAnswers((prev) => prev + 1)
      setTimeout(() => {
        setFeedback(null)
        nextKana()
      }, 1000)
    } else {
      setFeedback('incorrect')
      setLives((prev) => prev - 1)
      setTimeout(() => {
        setFeedback(null)
        nextKana()
      }, 1500)
    }
  }

  const nextKana = useCallback(() => {
    if (remainingKanas.length === 0) {
      setIsFinished(true)
      return
    }

    if (lives === 0) {
      setIsFinished(true)
      return
    }

    const [next, ...rest] = remainingKanas
    if (!next) {
      setCurrentKana(null)
      setOptions([])
      return
    }

    setCurrentKana(next)
    setRemainingKanas(rest)

    const generatedOptions: string[] = [next.romanji]

    while (generatedOptions.length < 4) {
      const randomIndex = Math.floor(Math.random() * totalKanas(mode))
      const randomItem = dataset(mode)[randomIndex]
      if (randomItem) {
        const randomOption = randomItem.romanji
        if (!generatedOptions.includes(randomOption)) {
          generatedOptions.push(randomOption)
        }
      }
    }

    setOptions(generatedOptions)
  }, [remainingKanas, lives, mode])

  useEffect(() => {
    if (mode && remainingKanas.length > 0 && !currentKana && !isFinished)
      nextKana()
  }, [mode, remainingKanas, nextKana, currentKana, isFinished])

  useEffect(() => {
    if (mode && lives === 0) setIsFinished(true)
  }, [lives, mode])

  if (!mode) {
    return (
      <section className='flex flex-col items-center gap-4'>
        <h1 className='font-bold font-heading'>Elige un modo</h1>
        <div className='flex items-center justify-center gap-4'>
          <button
            type='button'
            onClick={() => startPuzzle('hiragana')}
            className='px-4 py-2 transition-colors border border-red-700 rounded-lg size-32 hover:bg-red-400'
          >
            Hiragana
          </button>
          <button
            type='button'
            className='px-4 py-2 transition-colors border rounded-lg border-cyan-700 size-32 hover:bg-sky-400'
          >
            Katakana
          </button>
        </div>
      </section>
    )
  }

  if (isFinished) {
    return (
      <section className='flex flex-col items-center gap-4 [&>p]:text-lg'>
        <h1>Se ha finalizado el juego</h1>
        <p>
          {lives === 0
            ? '¡Te quedaste sin vidas!'
            : '¡Completaste todos los caracteres!'}
        </p>
        <p>
          Aciertos: {correctAnswers} / {totalKanas(mode)}
        </p>
        <button
          type='button'
          className='px-4 py-2 transition-colors bg-yellow-400 border-2 border-yellow-400 rounded-md hover:bg-yellow-100'
          onClick={() => setMode(null)}
        >
          Volver al inicio
        </button>
      </section>
    )
  }

  return (
    <section className='flex flex-col items-center gap-4 p-4'>
      <p className='text-xl font-semibold'>Vidas: {lives}</p>
      <div className='flex items-center justify-center p-8 text-6xl bg-white border rounded-md shadow-lg size-24'>
        {currentKana ? currentKana?.kana : ''}
      </div>
      <div className='grid w-full max-w-md grid-cols-2 gap-4'>
        {options.map((opcion) => (
          <button
            type='button'
            key={opcion}
            onClick={() => handleSelection(opcion)}
            className={`px-4 py-2 rounded-md border text-lg transition-all duration-200
              ${feedback && opcion === currentKana?.romanji && feedback === 'correct' ? 'bg-green-400' : ''}
              ${feedback && opcion === currentKana?.romanji && feedback === 'incorrect' ? 'bg-red-400' : ''}
              ${feedback && opcion !== currentKana?.romanji && feedback === 'incorrect' ? 'opacity-50' : ''}
              ${feedback === null ? 'hover:bg-gray-100' : ''}
            `}
            disabled={feedback !== null}
          >
            {opcion}
          </button>
        ))}
      </div>
    </section>
  )
}
