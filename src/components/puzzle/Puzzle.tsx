import { useCallback, useEffect, useRef, useState } from 'react'
import { dataset } from '@/libs/utils/mode'
import { appendScore } from '@/libs/utils/score'
import { shuffle } from '@/libs/utils/shuffle'
import type { Feedback, KanaItem, Mode, ScoreEntry } from '@/types'

export default function Practice() {
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null)
  const [kanaSet, setKanaSet] = useState<KanaItem[]>([])
  const [lives, setLives] = useState<number>(3)
  const [correctAnswers, setCorrectAnswers] = useState<number>(0)
  const [remainingKanas, setRemainingKanas] = useState<KanaItem[]>([])
  const [currentKana, setCurrentKana] = useState<KanaItem | null>(null)
  const [options, setOptions] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const savedScores = useRef(false)

  const startPuzzle = (mode: Mode) => {
    setSelectedMode(mode)
    const data = dataset(mode)
    setKanaSet(data)
    setRemainingKanas(shuffle(data))
    setLives(3)
    setCorrectAnswers(0)
    setCurrentKana(null)
    setOptions([])
    setSelectedOption(null)
    setFeedback(null)
    setIsFinished(false)
    savedScores.current = false
  }

  const handleSelection = (option: string) => {
    setSelectedOption(option)
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

    while (generatedOptions.length < 4 && kanaSet.length > 0) {
      const randomIndex = Math.floor(Math.random() * kanaSet.length)
      const randomItem = kanaSet[randomIndex]
      if (randomItem) {
        const randomOption = randomItem.romanji
        if (!generatedOptions.includes(randomOption)) {
          generatedOptions.push(randomOption)
        }
      }
    }

    setOptions(shuffle(generatedOptions))
  }, [remainingKanas, lives, kanaSet])

  useEffect(() => {
    if (
      kanaSet.length > 0 &&
      remainingKanas.length > 0 &&
      !currentKana &&
      !isFinished
    ) {
      nextKana()
    }
  }, [kanaSet, remainingKanas, nextKana, currentKana, isFinished])

  useEffect(() => {
    if (kanaSet.length > 0 && lives === 0) setIsFinished(true)
  }, [lives, kanaSet])

  useEffect(() => {
    if (!isFinished || !selectedMode) return
    if (savedScores.current) return

    const score: ScoreEntry = {
      date: new Date().toISOString(),
      kanaType: selectedMode,
      correct: correctAnswers,
      total: kanaSet.length,
    }
    appendScore(score)
    savedScores.current = true
  }, [kanaSet.length, selectedMode, isFinished, correctAnswers])

  if (isFinished) {
    return (
      <section className='flex flex-col items-center gap-4 [&>p]:text-lg'>
        <h1 className='font-bold text-center font-heading text-balance'>
          Se ha finalizado el juego
        </h1>
        <p className='font-semibold'>
          {lives === 0
            ? '¡Te quedaste sin vidas!'
            : '¡Completaste todos los Kanas!'}
        </p>
        <p>
          Aciertos: {correctAnswers} / {kanaSet.length}
        </p>
        <button
          type='button'
          className='px-4 py-2 transition-colors bg-yellow-400 border-2 border-yellow-400 rounded-md hover:bg-yellow-100'
          onClick={() => setSelectedMode(null)}
        >
          Volver al inicio
        </button>
      </section>
    )
  }

  return (
    <section className='flex flex-col items-center gap-4 p-4'>
      <h1 className='font-bold font-heading'>Vidas: {lives}</h1>
      <div className='flex items-center justify-center p-8 text-6xl border rounded-md shadow-lg bg-yellow-50 size-24'>
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
              ${feedback && opcion === currentKana?.romanji && feedback === 'incorrect' ? 'bg-green-400' : ''}
              ${feedback && opcion === selectedOption && feedback === 'incorrect' ? 'bg-red-400' : ''}
              ${feedback && opcion !== currentKana?.romanji && feedback === 'incorrect' ? 'opacity-50' : ''}
              ${feedback === null ? 'hover:bg-yellow-100' : ''}
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
