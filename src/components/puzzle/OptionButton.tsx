import type { Feedback } from '@/types'

interface Props {
  option: string
  current: string | null
  selected: string | null
  feedback: Feedback
  onSelect: (opt: string) => void
}

export default function OptionButton({
  option,
  current,
  selected,
  feedback,
  onSelect,
}: Props) {
  const isCorrect = feedback && option === current
  const isSelected = feedback && option === selected

  let style = 'px-4 py-2 rounded-md border text-lg transition-all duration-200 '
  if (feedback === null) style += 'hover:bg-yellow-100'
  if (feedback === 'correct' && isCorrect) style += ' bg-green-400'
  if (feedback === 'incorrect') {
    if (isCorrect) style += ' bg-green-400'
    if (isSelected) style += ' bg-red-400'
    if (option !== current) style += ' opacity-50'
  }

  return (
    <button
      type='button'
      className={style}
      onClick={() => onSelect(option)}
      disabled={feedback !== null}
    >
      {option}
    </button>
  )
}
