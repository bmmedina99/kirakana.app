import { useCallback, useMemo, useState } from 'react'
import Icon from '@/components/ui/Icon'
import { getKanaSoundPath, type KanaGroupSlug } from '@/features/data/groups'
import type { Syllabary } from '@/features/data/syllabaries'
import type { WordGroups } from '@/features/data/wordGroups'
import { KanaGroupSidebar } from '../components/KanaGroupSidebar'
import { KanaWords } from '../components/KanaWords'
import { useAudioPlayer } from '../hooks/useAudioPlayer'
import { getKanaNote } from '../utils/getKanaNote'

type Props = {
  syllabary: Syllabary
  practiceHref: string
  wordGroups: WordGroups
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <Icon
      name='arrow'
      className={`${direction === 'left' ? 'rotate-90' : '-rotate-90'} size-5`}
    />
  )
}

export default function LearnSyllabaryExperience({
  syllabary,
  practiceHref,
  wordGroups,
}: Props) {
  const [activeGroupSlug, setActiveGroupSlug] = useState<KanaGroupSlug>(
    syllabary.groups[0]?.slug ?? 'vocales',
  )
  const [activeKanaIndex, setActiveKanaIndex] = useState(0)
  const { error: audioError, playingId, play, stop } = useAudioPlayer()

  const activeGroup = useMemo(
    () =>
      syllabary.groups.find((group) => group.slug === activeGroupSlug) ??
      syllabary.groups[0],
    [activeGroupSlug, syllabary.groups],
  )

  const activeGroupIndex = useMemo(
    () =>
      syllabary.groups.findIndex((group) => group.slug === activeGroup?.slug),
    [activeGroup?.slug, syllabary.groups],
  )

  const activeKana =
    activeGroup?.items[activeKanaIndex] ?? activeGroup?.items[0]

  const selectGroup = useCallback(
    (slug: KanaGroupSlug) => {
      stop()
      setActiveGroupSlug(slug)
      setActiveKanaIndex(0)

      if (window.innerWidth < 1024) {
        window.requestAnimationFrame(() => {
          document
            .querySelector('#learn-content')
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      }
    },
    [stop],
  )

  const selectKana = useCallback(
    (kana: string) => {
      const index = activeGroup?.items.findIndex((item) => item.kana === kana)
      if (index === undefined || index < 0) return

      stop()
      setActiveKanaIndex(index)
    },
    [activeGroup?.items, stop],
  )

  const moveToGroup = useCallback(
    (direction: -1 | 1) => {
      if (activeGroupIndex < 0) return

      const group = syllabary.groups[activeGroupIndex + direction]
      if (group) selectGroup(group.slug)
    },
    [activeGroupIndex, selectGroup, syllabary.groups],
  )

  if (!activeGroup || !activeKana) return null

  const activeWordEntry = wordGroups[activeGroup.slug][activeKana.kana]
  if (!activeWordEntry) return null

  const activeKanaPlaybackId = `kana:${activeKana.romaji}`

  return (
    <section className='container mx-auto'>
      <header className='mb-8 grid gap-5 border-b border-linen-150 pb-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end'>
        <div>
          <p
            className={`mb-2 text-sm font-semibold font-japanese uppercase tracking-widest ${syllabary.theme.text}`}
          >
            {syllabary.japaneseName}
            <span className='text-neutral-800'>を学ぶ</span>
          </p>
          <h1 className='text-4xl font-semibold sm:text-5xl'>
            Aprende{' '}
            <span className={`${syllabary.theme.text}`}>{syllabary.name}</span>
          </h1>
          <p className='max-w-3xl mt-4 text-base leading-relaxed sm:text-lg'>
            {syllabary.longDescription}
          </p>
        </div>
        <dl className='flex gap-6 px-5 py-4 text-sm shadow-sm rounded-2xl bg-linen-50'>
          <div>
            <dt className='text-copper-200'>Grupos</dt>
            <dd className='mt-1 font-semibold'>{syllabary.groups.length}</dd>
          </div>
          <div className='pl-6 border-l border-linen-150'>
            <dt className='text-copper-200'>Caracteres totales</dt>
            <dd className={`mt-1 font-semibold ${syllabary.theme.text}`}>
              {syllabary.kana.length}
            </dd>
          </div>
        </dl>
      </header>
      <div className='mb-6 lg:hidden'>
        <details className='p-4 border group rounded-2xl border-linen-150 bg-linen-50'>
          <summary className='flex items-center justify-between font-semibold list-none cursor-pointer'>
            Elegir grupo
            <span
              aria-hidden='true'
              className='transition group-open:rotate-90'
            >
              <ArrowIcon direction='right' />
            </span>
          </summary>
          <div className='pt-5 mt-5 border-t border-linen-150'>
            <KanaGroupSidebar
              groups={syllabary.groups}
              activeGroupSlug={activeGroup.slug}
              theme={syllabary.theme}
              onSelectGroup={selectGroup}
            />
          </div>
        </details>
      </div>
      <div className='grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] xl:gap-12'>
        <aside className='hidden lg:block'>
          <div className='p-5 border shadow-sm rounded-3xl border-linen-150 bg-linen-50'>
            <p className='mb-5 text-sm leading-relaxed'>
              Avanza por familias de sonidos y selecciona cada carácter para
              estudiarlo con calma.
            </p>
            <KanaGroupSidebar
              groups={syllabary.groups}
              activeGroupSlug={activeGroup.slug}
              theme={syllabary.theme}
              onSelectGroup={selectGroup}
              collapsible
            />
          </div>
        </aside>
        <section
          id='learn-content'
          aria-labelledby='group-title'
          className='min-w-0 scroll-mt-6'
        >
          <header className='flex flex-col gap-4 mb-6 sm:flex-row sm:items-start sm:justify-between'>
            <div>
              <p className='text-sm text-copper-200'>
                Grupo {activeGroupIndex + 1} de {syllabary.groups.length}
              </p>
              <h2
                id='group-title'
                className='mt-1 text-3xl font-semibold '
              >
                {activeGroup.title}
              </h2>
              <p className='max-w-2xl mt-2 leading-relaxed'>
                {activeGroup.description}
              </p>
            </div>
            <span
              className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-widest ${syllabary.theme.softBackground} ${syllabary.theme.text}`}
            >
              {activeKanaIndex + 1} / {activeGroup.items.length} kana
            </span>
          </header>
          <div className='grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(15rem,0.7fr)]'>
            <div className='relative flex items-center justify-center p-8 overflow-hidden border shadow-sm bg-mauve-50 isolate min-h-80 rounded-3xl border-linen-150 sm:min-h-96'>
              <span
                lang='ja'
                aria-hidden='true'
                className={`absolute top-20 translate-y-1/2 -z-10 flex items-center justify-center pointer-events-none text-8xl sm:text-[10rem] opacity-25 font-japanese`}
              >
                {activeKana.kana}
              </span>
              <button
                type='button'
                onClick={() =>
                  play(getKanaSoundPath(activeKana), activeKanaPlaybackId)
                }
                className={`group relative rounded-3xl p-4 outline-none focus-visible:ring-2 focus-visible:ring-offset-4 disabled:cursor-default ${syllabary.theme.focusRing}`}
                aria-label={`Escuchar ${activeKana.kana}, ${activeKana.romaji}`}
                aria-pressed={playingId === activeKanaPlaybackId}
              >
                <span
                  className={`mx-auto mb-4 grid size-12 place-items-center rounded-full bg-linen-50 text-copper-100 shadow-sm group-hover:inset-shadow-sm transition group-hover:scale-105`}
                >
                  <Icon
                    name='speaker'
                    className='size-5'
                  />
                </span>
                <span
                  lang='ja'
                  className={`block font-japanese text-9xl leading-none sm:text-[12rem] ${syllabary.theme.text}`}
                >
                  {activeKana.kana}
                </span>
                <span
                  className={`mx-auto mt-8 inline-flex min-w-12 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold ${syllabary.theme.softBackground} ${syllabary.theme.text}`}
                >
                  {activeKana.romaji}
                </span>
              </button>
            </div>
            <aside className='flex flex-col justify-between p-6 border rounded-3xl border-linen-150 bg-linen-50'>
              <div>
                <p className='text-xs font-semibold tracking-widest uppercase text-copper-200'>
                  Carácter actual
                </p>
                <div className='flex flex-wrap gap-2 mt-4'>
                  {activeGroup.items.map((item, index) => (
                    <div
                      key={item.kana}
                      className='flex flex-col items-center'
                    >
                      <button
                        type='button'
                        onClick={() => selectKana(item.kana)}
                        aria-label={`Ver ${item.kana}, ${item.romaji}`}
                        aria-pressed={index === activeKanaIndex}
                        className={`grid size-10 place-items-center rounded-xl font-japanese text-lg outline-none transition bg-mauve-50 focus-visible:ring-2 focus-visible:ring-offset-2 ${syllabary.theme.focusRing} ${index === activeKanaIndex ? `${syllabary.theme.text} ${syllabary.theme.border} border-2` : 'border-linen-150 border'}`}
                      >
                        {item.kana}
                      </button>
                      <p
                        className={`${index === activeKanaIndex ? `${syllabary.theme.text} text-xl` : ''}`}
                      >
                        {item.romaji}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={`mt-8 rounded-2xl p-5 ${syllabary.theme.background} text-mauve-50`}
              >
                <p className='text-xs font-semibold tracking-widest uppercase text-mauve-50/75'>
                  Pista visual
                </p>
                <p className='mt-3 text-sm leading-relaxed'>
                  {getKanaNote(activeKana)}
                </p>
              </div>
            </aside>
          </div>
          <section
            className='mt-8'
            aria-labelledby='kana-words-title'
          >
            <div className='mb-4 flex items-end justify-between gap-4 border-b border-linen-150 pb-3'>
              <div>
                <p className={`text-sm font-semibold ${syllabary.theme.text}`}>
                  Palabras
                </p>
                <h3
                  id='kana-words-title'
                  className='mt-1 text-xl font-semibold'
                >
                  Ejemplos con {activeKana.kana}
                </h3>
              </div>
              <p className='hidden text-sm text-copper-200 sm:block'>
                {activeKana.romaji}
              </p>
            </div>
            <KanaWords
              activeKana={activeKana.kana}
              entry={activeWordEntry}
              playingId={playingId}
              theme={syllabary.theme}
              onPlayAudio={play}
            />
            {audioError && (
              <p
                role='status'
                className='mt-3 text-sm text-copper-200'
              >
                {audioError}
              </p>
            )}
          </section>
          <footer className='flex flex-col gap-4 pt-6 mt-10 border-t border-linen-150 sm:flex-row sm:items-center sm:justify-between'>
            <button
              type='button'
              onClick={() => moveToGroup(-1)}
              disabled={activeGroupIndex === 0}
              className={`inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-35 focus-visible:ring-2 ${syllabary.theme.focusRing}`}
            >
              <ArrowIcon direction='left' />
              Grupo anterior
            </button>
            <a
              href={practiceHref}
              className={`btn text-sm text-mauve-50 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${syllabary.theme.background} ${syllabary.theme.focusRing}`}
            >
              Practicar {syllabary.name}
            </a>
            <button
              type='button'
              onClick={() => moveToGroup(1)}
              disabled={activeGroupIndex === syllabary.groups.length - 1}
              className={`inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-35 focus-visible:ring-2 ${syllabary.theme.focusRing}`}
            >
              Grupo siguiente
              <ArrowIcon direction='right' />
            </button>
          </footer>
        </section>
      </div>
    </section>
  )
}
