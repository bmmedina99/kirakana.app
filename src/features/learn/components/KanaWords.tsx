import { memo } from 'react'
import Icon from '@/components/ui/Icon'
import type { SyllabaryTheme } from '@/features/data/syllabaries'
import type { KanaWordEntry, Word } from '@/features/data/wordGroups'
import { getWordAudioPath } from '@/features/data/wordGroups'

type Props = {
  activeKana: string
  entry: KanaWordEntry
  playingId: string | null
  theme: SyllabaryTheme
  onPlayAudio: (source: string, id: string) => void
}

function HighlightedKana({
  kana,
  word,
  theme,
}: {
  kana: string
  word: string
  theme: SyllabaryTheme
}) {
  const fragments = []
  let cursor = 0
  let matchIndex = word.indexOf(kana)

  while (matchIndex >= 0) {
    if (matchIndex > cursor) {
      fragments.push(
        <span key={`text-${cursor}`}>{word.slice(cursor, matchIndex)}</span>,
      )
    }

    fragments.push(
      <span
        key={`kana-${matchIndex}`}
        className={theme.text}
      >
        {kana}
      </span>,
    )
    cursor = matchIndex + kana.length
    matchIndex = word.indexOf(kana, cursor)
  }

  if (cursor < word.length) {
    fragments.push(<span key={`text-${cursor}`}>{word.slice(cursor)}</span>)
  }

  return fragments
}

function getWordPlaybackId(word: Word): string {
  return `word:${word.audioKey ?? word.romaji}`
}

function KanaWordsComponent({
  activeKana,
  entry,
  playingId,
  theme,
  onPlayAudio,
}: Props) {
  if (entry.words.length === 0) {
    return (
      <div className='rounded-2xl border border-linen-150 bg-linen-50 p-6'>
        <p className='font-semibold'>Sin ejemplos frecuentes</p>
        <p className='mt-2 max-w-2xl text-sm leading-relaxed text-copper-200'>
          {entry.emptyReason}
        </p>
      </div>
    )
  }

  return (
    <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
      {entry.words.map((word) => {
        const playbackId = getWordPlaybackId(word)
        const isPlaying = playbackId === playingId

        return (
          <article
            key={`${word.word}-${word.meaning}`}
            className='relative rounded-2xl border border-linen-150 bg-linen-50 p-5 shadow-sm'
          >
            <p
              lang='ja'
              className='pr-12 font-japanese text-3xl'
            >
              <HighlightedKana
                kana={activeKana}
                word={word.word}
                theme={theme}
              />
            </p>
            <p className='mt-5 text-xs font-semibold uppercase tracking-widest text-copper-200'>
              {word.romaji}
            </p>
            <p className='mt-1 text-sm'>{word.meaning}</p>
            <button
              type='button'
              onClick={() => onPlayAudio(getWordAudioPath(word), playbackId)}
              aria-label={`Escuchar ${word.word}, ${word.romaji}`}
              aria-pressed={isPlaying}
              className={`absolute right-4 top-4 grid size-10 place-items-center rounded-full outline-none transition focus-visible:ring-2 focus-visible:ring-offset-2 ${theme.focusRing} ${isPlaying ? `${theme.softBackground} ${theme.text}` : 'bg-mauve-50 text-copper-100 hover:bg-linen-100'}`}
            >
              <Icon
                name='speaker'
                className='size-5'
              />
            </button>
          </article>
        )
      })}
    </div>
  )
}

export const KanaWords = memo(KanaWordsComponent)
