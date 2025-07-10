import { useCallback, useEffect, useState } from 'react'

interface KanaItem {
  kana: string
  romanji: string
}

const HIRAGANA: KanaItem[] = [
  { kana: 'あ', romanji: 'a' },
  { kana: 'い', romanji: 'i' },
  { kana: 'う', romanji: 'u' },
  { kana: 'え', romanji: 'e' },
  { kana: 'お', romanji: 'o' },
]

export default function Practice() {
  const [mode, setMode] = useState<string>()
  const [currentKana, setCurrentKana] = useState<KanaItem | null>()
  const [remainingKana, setRemainingKana] = useState<KanaItem[]>([])
  const [options, setOptions] = useState<string[]>([])
  const [feedback, setFeedback] = useState<string | null>()

  const initialPuzzle = (selectMode: string) => {
    setMode(selectMode)
    setCurrentKana(null)
    setRemainingKana([...HIRAGANA])
    setOptions([])
    setFeedback(null)
  }

  const handleSelection = (option: string) => {
    if (option === currentKana?.romanji) setFeedback('correct')
    else setFeedback('fail')

    setTimeout(() => {
      setFeedback(null)
      nextKana()
    }, 1000)
  }

  const nextKana = useCallback(() => {
    const [next, ...rest] = remainingKana
    const generateOptions: string[] = next ? [next.romanji] : []

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

    console.log(`Next: ${next}`)
    setCurrentKana(next)
    console.log(currentKana)
    setRemainingKana(rest)
    setOptions(generateOptions)
  }, [remainingKana, currentKana])

  useEffect(() => {
    if (mode && remainingKana.length > 0 && !currentKana) nextKana()
  }, [mode, remainingKana, nextKana, currentKana])

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

  return (
    <section className='flex flex-col items-center gap-4 p-4'>
      <div className='flex items-center justify-center p-8 text-6xl bg-white border rounded shadow-lg size-24'>
        {currentKana ? currentKana?.kana : ''}
      </div>
      <div className='grid w-full max-w-md grid-cols-2 gap-4'>
        {options.map((opcion) => (
          <button
            type='button'
            key={opcion}
            onClick={() => handleSelection(opcion)}
            className={`px-4 py-2 rounded border text-lg transition-all duration-200
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
