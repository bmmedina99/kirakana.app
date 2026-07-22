import { memo } from 'react'
import type { KanaItem } from '@/features/data/groups'
import type { SyllabaryTheme } from '@/features/data/syllabaries'
import { KanaCard } from './KanaCard'

type Props = {
  items: KanaItem[]
  activeKana: string
  speakingKana: string | null
  theme: SyllabaryTheme
  onSelectKana: (kana: string) => void
}

function KanaGroupGridComponent({
  items,
  activeKana,
  speakingKana,
  theme,
  onSelectKana,
}: Props) {
  return (
    <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5'>
      {items.map((item) => (
        <KanaCard
          key={item.kana}
          item={item}
          isActive={item.kana === activeKana}
          isSpeaking={item.kana === speakingKana}
          theme={theme}
          onSelect={onSelectKana}
        />
      ))}
    </div>
  )
}

export const KanaGroupGrid = memo(KanaGroupGridComponent)
