import { useCallback, useEffect, useState } from 'react'
import { HIRAGANA } from '@/site.config'
import type { KanaItem } from '@/types'

export default function Practice() {
  const [mode, setMode] = useState<string | null>(null)
  const [successes, setSuccesses] = useState<number>(0)
  const [currentKana, setCurrentKana] = useState<KanaItem | null>(null)
  const [remainingKana, setRemainingKana] = useState<KanaItem[]>([])
  const [options, setOptions] = useState<string[]>([])
  const [feedback, setFeedback] = useState<string | null>(null)
  const [finish, setFinish] = useState<boolean>(false)

  const initialPuzzle = (selectedMode: string) => {
    setMode(selectedMode)
    setSuccesses(0)
    setCurrentKana(null)
    setRemainingKana([...HIRAGANA])
    setOptions([])
    setFeedback(null)
    setFinish(false)
  }

  const handleSelection = (option: string) => {
    if (option === currentKana?.romanji) {
      setFeedback('correct')
      setSuccesses((prev) => prev + 1)
    } else setFeedback('fail')

    setTimeout(() => {
      setFeedback(null)
      nextKana()
    }, 1000)
  }

  const nextKana = useCallback(() => {
    if (remainingKana.length === 0) {
      setFinish(true)
      return
    }

    const [next, ...rest] = remainingKana
    const generateOptions: string[] = next ? [next.romanji] : []

    if (!next) {
      setCurrentKana(null)
      setOptions([])
      return
    }

    setCurrentKana(next)
    setRemainingKana(rest)

    while (generateOptions.length < 4) {
      const randomIndex = Math.floor(Math.random() * HIRAGANA.length)
      const randomItem = HIRAGANA[randomIndex]
      if (randomItem) {
        const randomOptiom = randomItem.romanji
        if (!generateOptions.includes(randomOptiom)) {
          generateOptions.push(randomOptiom)
        }
      }
    }

    setOptions(generateOptions)
  }, [remainingKana])

  useEffect(() => {
    if (mode && remainingKana.length > 0 && !currentKana && !finish) nextKana()
  }, [mode, remainingKana, nextKana, currentKana, finish])

  if (!mode) {
    return (
      <section className='flex flex-col items-center gap-4'>
        <h1 className='font-bold font-heading'>Elige un modo</h1>
        <div className='flex items-center justify-center gap-4'>
          <button
            type='button'
            onClick={() => initialPuzzle('hiragana')}
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

  if (finish) {
    const total = HIRAGANA.length
    return (
      <div className='flex flex-col items-center gap-4'>
        <h1>¡Se ha finalizado el juego!</h1>
        <p className='text-lg'>
          Correcto: {successes} / {total}
        </p>
        <button
          type='button'
          className='px-4 py-2 transition-colors bg-yellow-400 border-2 border-yellow-400 rounded-md hover:bg-yellow-100'
          onClick={() => setMode(null)}
        >
          Volver al inicio
        </button>
      </div>
    )
  }

  return (
    <section className='flex flex-col items-center gap-4 p-4'>
      <p className='text-xl font-semibold'>Correcto: {successes}</p>
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
              ${feedback && opcion === currentKana?.romanji && feedback === 'fail' ? 'bg-red-400' : ''}
              ${feedback && opcion !== currentKana?.romanji && feedback === 'fail' ? 'opacity-50' : ''}
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
