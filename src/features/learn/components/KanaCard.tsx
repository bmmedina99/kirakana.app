import { memo } from 'react'
import type { KanaItem } from '@/features/data/groups'
import type { LearnAccent } from '../types'

type Props = {
  item: KanaItem
  isActive: boolean
  isSpeaking: boolean
  audioAvailable: boolean
  accent: LearnAccent
  onSelect: (kana: string) => void
  onSpeak: (kana: string) => void
}

function SpeakerIcon() {
  return (
    <svg
      aria-hidden='true'
      className='size-4'
      viewBox='0 0 24 24'
    >
      <use href='/svg/sprite.svg#speaker' />
    </svg>
  )
}

function KanaCardComponent({
  item,
  isActive,
  isSpeaking,
  audioAvailable,
  accent,
  onSelect,
  onSpeak,
}: Props) {
  return (
    <article
      className={`relative rounded-2xl border bg-white p-4 shadow-sm transition duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md ${
        isActive
          ? `${accent.border} ${accent.softBackground}`
          : 'border-linen-150'
      }`}
    >
      <button
        type='button'
        onClick={() => onSelect(item.kana)}
        aria-pressed={isActive}
        className={`w-full rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${accent.focusRing}`}
      >
        <span
          lang='ja'
          className={`block font-japanese text-4xl leading-none ${accent.text}`}
        >
          {item.kana}
        </span>
        <span className='mt-4 block text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500'>
          {item.romaji}
        </span>
        <span className='mt-1 block text-sm text-neutral-600'>
          {item.type === 'base' ? 'Kana base' : 'Kana modificado'}
        </span>
      </button>

      <button
        type='button'
        onClick={() => onSpeak(item.kana)}
        disabled={!audioAvailable}
        aria-label={`Escuchar ${item.kana}, ${item.romaji}`}
        title={
          audioAvailable
            ? `Escuchar ${item.romaji}`
            : 'La reproducción de voz no está disponible en este navegador'
        }
        className={`absolute right-3 top-3 grid size-9 place-items-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-35 ${accent.focusRing} ${
          isSpeaking
            ? `${accent.softBackground} ${accent.text}`
            : 'bg-linen-50 text-copper-100 hover:bg-linen-100'
        }`}
      >
        <SpeakerIcon />
      </button>
    </article>
  )
}

export const KanaCard = memo(KanaCardComponent)
