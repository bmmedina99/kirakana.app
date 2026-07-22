import { memo } from 'react'
import type { KanaItem } from '@/features/data/groups'
import type { SyllabaryTheme } from '@/features/data/syllabaries'

type Props = {
  item: KanaItem
  isActive: boolean
  isSpeaking: boolean
  theme: SyllabaryTheme
  onSelect: (kana: string) => void
}

function KanaCardComponent({
  item,
  isActive,
  isSpeaking,
  theme,
  onSelect,
}: Props) {
  return (
    <article
      className={`relative rounded-2xl border bg-white p-4 shadow-sm transition duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md ${
        isActive
          ? `${theme.border} ${theme.softBackground}`
          : 'border-linen-150'
      }`}
    >
      <button
        type='button'
        onClick={() => onSelect(item.kana)}
        aria-pressed={isActive}
        className={`w-full rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${theme.focusRing}`}
      >
        <span
          lang='ja'
          className={`block font-japanese text-4xl leading-none ${theme.text}`}
        >
          {item.kana}
        </span>
        <span className='block mt-4 text-xs font-semibold tracking-widest uppercase text-neutral-500'>
          {item.romaji}
        </span>
        <span className='block mt-1 text-sm text-neutral-600'>
          {item.type === 'base' ? 'Kana base' : 'Kana modificado'}
        </span>
      </button>

      <button
        type='button'
        aria-label={`Escuchar ${item.kana}, ${item.romaji}`}
        title={`Escuchar ${item.romaji}`}
        className={`absolute right-3 top-3 grid size-9 place-items-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-35 ${theme.focusRing} ${
          isSpeaking
            ? `${theme.softBackground} ${theme.text}`
            : 'bg-linen-50 text-copper-100 hover:bg-linen-100'
        }`}
      >
        <svg
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
          aria-hidden='true'
          className='size-5'
        >
          <use href={`/svg/sprite.svg#speaker`}></use>
        </svg>
      </button>
    </article>
  )
}

export const KanaCard = memo(KanaCardComponent)
