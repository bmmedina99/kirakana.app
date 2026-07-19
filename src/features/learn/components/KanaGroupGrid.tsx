import { memo } from 'react'
import type { KanaItem } from '@/features/data/groups'
import type { LearnAccent } from '../types'
import { KanaCard } from './KanaCard'

type Props = {
  items: KanaItem[]
  activeKana: string
  speakingKana: string | null
  audioAvailable: boolean
  accent: LearnAccent
  onSelectKana: (kana: string) => void
  onSpeak: (kana: string) => void
}

function KanaGroupGridComponent({
  items,
  activeKana,
  speakingKana,
  audioAvailable,
  accent,
  onSelectKana,
  onSpeak,
}: Props) {
  return (
    <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5'>
      {items.map((item) => (
        <KanaCard
          key={item.kana}
          item={item}
          isActive={item.kana === activeKana}
          isSpeaking={item.kana === speakingKana}
          audioAvailable={audioAvailable}
          accent={accent}
          onSelect={onSelectKana}
          onSpeak={onSpeak}
        />
      ))}
    </div>
  )
}

export const KanaGroupGrid = memo(KanaGroupGridComponent)
