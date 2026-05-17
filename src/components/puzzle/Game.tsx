import { useCallback, useEffect, useRef, useState } from 'react'
import { Options } from '@/lib/utils/options'
import { appendScore } from '@/lib/utils/score'
import { shuffle } from '@/lib/utils/shuffle'
import { dataset } from '@/lib/utils/syllabary'
import type { Feedback, KanaItem, ScoreEntry, Syllabarys } from '@/types'
import OptionButton from './OptionButton'

interface GameProps {
  syllabary: Syllabarys
}

export default function Game({ syllabary }: GameProps) {
  const [selectedSyllabary, setSelectedSyllabary] =
    useState<Syllabarys | null>()
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

  useEffect(() => {
    let startGame = true
    setSelectedSyllabary(syllabary)
    const data = dataset(syllabary)
    if (!startGame) return
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
    return () => {
      startGame = false
    }
  }, [syllabary])

  const onSelect = (option: string) => {
    setSelectedOption(option)
    if (option === currentKana?.romaji) {
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
    setOptions(Options(next.romaji, kanaSet))
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
    if (!isFinished || !selectedSyllabary) return
    if (savedScores.current) return

    const score: ScoreEntry = {
      date: new Date().toISOString(),
      kanaType: selectedSyllabary,
      correct: correctAnswers,
      total: kanaSet.length,
    }
    appendScore(score)
    savedScores.current = true
  }, [kanaSet.length, isFinished, correctAnswers, selectedSyllabary])

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
        <a
          href='/practicar/'
          className='px-4 py-2 bg-yellow-400 border-2 border-yellow-400 rounded-md hover:bg-yellow-100'
        >
          Volver al inicio
        </a>
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
          <OptionButton
            key={opcion}
            option={opcion}
            current={currentKana?.romaji ?? null}
            selected={selectedOption}
            feedback={feedback}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  )
}
