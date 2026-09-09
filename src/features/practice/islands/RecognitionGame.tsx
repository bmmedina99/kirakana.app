import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Icon from '@/components/ui/Icon'
import type { KanaGroupSlug, KanaItem } from '@/features/data/groups'
import type { Syllabary } from '@/features/data/syllabaries'
import type { PracticeLevel } from '@/lib/routes'
import {
  PracticeLives,
  PracticeMetrics,
  PracticeSummary,
} from '../components/PracticeSessionPanels'
import { getKanaForPractice } from '../utils/getKanaForPractice'
import {
  createPracticeOptions,
  createPracticeSession,
  DEFAULT_PRACTICE_LEVEL,
  MAX_PRACTICE_LIVES,
  PRACTICE_LEVEL_LABELS,
  PRACTICE_LEVELS,
  type PracticeFilters,
  resolvePracticeFilters,
  resolvePracticeTurn,
  type SessionEndReason,
} from '../utils/practiceSession'

type Props = {
  modeName: string
  modeDescription: string
  syllabary: Syllabary
}

type SessionPhase = 'ready' | 'active' | 'complete'

type AnswerRecord = {
  kana: string
  romaji: string
  selectedAnswer: string
  isCorrect: boolean
}

const levelDescriptions: Record<PracticeLevel, string> = {
  basico: 'Kana base.',
  intermedio: 'Kana base, dakuten y handakuten.',
  completo: 'Todos los kana, incluidas las combinaciones yōon.',
}

function getRecommendations(
  accuracy: number,
  answers: AnswerRecord[],
  filters: PracticeFilters,
): string[] {
  const incorrectKana = [
    ...new Set(
      answers
        .filter((answer) => !answer.isCorrect)
        .map((answer) => `${answer.kana} (${answer.romaji})`),
    ),
  ]
  const recommendations: string[] = []

  if (accuracy >= 90) {
    recommendations.push(
      filters.level === 'completo'
        ? 'Mantén el nivel completo y repite la sesión buscando una ronda perfecta.'
        : 'Tu precisión es alta: prueba el siguiente nivel cuando te sientas preparado.',
    )
  } else if (accuracy >= 70) {
    recommendations.push(
      'Vas por buen camino. Repite este objetivo una vez más para consolidarlo.',
    )
  } else {
    recommendations.push(
      'Reduce el objetivo a un grupo concreto y repásalo antes de otra ronda.',
    )
  }

  if (incorrectKana.length > 0) {
    recommendations.push(
      `Repasa especialmente ${incorrectKana.slice(0, 3).join(', ')}.`,
    )
  } else {
    recommendations.push(
      'No has tenido errores: cambia de grupo o amplía el nivel para seguir avanzando.',
    )
  }

  return recommendations
}

export default function RecognitionGame({
  modeName,
  modeDescription,
  syllabary,
}: Props) {
  const defaultFilters: PracticeFilters = {
    group: null,
    level: DEFAULT_PRACTICE_LEVEL,
  }
  const [filters, setFilters] = useState<PracticeFilters>(defaultFilters)
  const [draftGroup, setDraftGroup] = useState<KanaGroupSlug | null>(null)
  const [draftLevel, setDraftLevel] = useState<PracticeLevel>(
    DEFAULT_PRACTICE_LEVEL,
  )
  const [phase, setPhase] = useState<SessionPhase>('ready')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [errors, setErrors] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [remainingLives, setRemainingLives] = useState(MAX_PRACTICE_LIVES)
  const [endReason, setEndReason] = useState<SessionEndReason | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answers, setAnswers] = useState<AnswerRecord[]>([])
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settingsError, setSettingsError] = useState<string | null>(null)
  const [filterNotice, setFilterNotice] = useState<string | null>(null)
  const advanceTimerRef = useRef<number | null>(null)
  const questionHeadingRef = useRef<HTMLHeadingElement | null>(null)
  const summaryHeadingRef = useRef<HTMLHeadingElement | null>(null)

  const kanaPool = useMemo(
    () =>
      getKanaForPractice({
        syllabary: syllabary.slug,
        group: filters.group,
        level: filters.level,
      }),
    [filters.group, filters.level, syllabary.slug],
  )

  const [sessionKana, setSessionKana] = useState<KanaItem[]>(() =>
    getKanaForPractice({
      syllabary: syllabary.slug,
      group: null,
      level: DEFAULT_PRACTICE_LEVEL,
    }),
  )

  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimerRef.current === null) return

    window.clearTimeout(advanceTimerRef.current)
    advanceTimerRef.current = null
  }, [])

  const resetMetrics = useCallback(() => {
    clearAdvanceTimer()
    setCurrentIndex(0)
    setCorrectAnswers(0)
    setErrors(0)
    setCurrentStreak(0)
    setBestStreak(0)
    setRemainingLives(MAX_PRACTICE_LIVES)
    setEndReason(null)
    setSelectedAnswer(null)
    setAnswers([])
  }, [clearAdvanceTimer])

  const prepareSession = useCallback(
    (nextFilters: PracticeFilters) => {
      const nextPool = getKanaForPractice({
        syllabary: syllabary.slug,
        group: nextFilters.group,
        level: nextFilters.level,
      })

      resetMetrics()
      setSessionKana(createPracticeSession(nextPool))
      setPhase('ready')
    },
    [resetMetrics, syllabary.slug],
  )

  useEffect(() => {
    const resolved = resolvePracticeFilters(
      window.location.search,
      syllabary.groups,
    )
    const nextFilters = {
      group: resolved.group,
      level: resolved.level,
    }
    const notices = []

    if (resolved.invalidGroup) {
      notices.push(`el grupo “${resolved.invalidGroup}” no existe`)
    }
    if (resolved.invalidLevel) {
      notices.push(`el nivel “${resolved.invalidLevel}” no existe`)
    }

    setFilters(nextFilters)
    setDraftGroup(nextFilters.group)
    setDraftLevel(nextFilters.level)
    setFilterNotice(
      notices.length > 0
        ? `Se ha preparado una sesión por defecto porque ${notices.join(' y ')}.`
        : null,
    )
    prepareSession(nextFilters)
  }, [prepareSession, syllabary.groups])

  useEffect(() => () => clearAdvanceTimer(), [clearAdvanceTimer])

  const currentKana = sessionKana[currentIndex]
  const options = useMemo(
    () => (currentKana ? createPracticeOptions(currentKana, sessionKana) : []),
    [currentKana, sessionKana],
  )
  const answeredCount = answers.length
  const totalCharacters = sessionKana.length
  const accuracy =
    answeredCount > 0 ? Math.round((correctAnswers / answeredCount) * 100) : 0
  const progress =
    totalCharacters > 0
      ? Math.round((answeredCount / totalCharacters) * 100)
      : 0
  const activeGroup = filters.group
    ? syllabary.groups.find((group) => group.slug === filters.group)
    : null

  const startSession = useCallback(() => {
    resetMetrics()
    setSessionKana(createPracticeSession(kanaPool))
    setPhase('active')
    window.requestAnimationFrame(() => questionHeadingRef.current?.focus())
  }, [kanaPool, resetMetrics])

  function updatePracticeUrl(nextFilters: PracticeFilters) {
    const url = new URL(window.location.href)

    if (nextFilters.group) url.searchParams.set('group', nextFilters.group)
    else url.searchParams.delete('group')

    if (nextFilters.level !== DEFAULT_PRACTICE_LEVEL || nextFilters.group)
      url.searchParams.set('level', nextFilters.level)
    else url.searchParams.delete('level')

    window.history.replaceState({}, '', `${url.pathname}${url.search}`)
  }

  function applySettings() {
    const nextFilters = { group: draftGroup, level: draftLevel }
    const nextPool = getKanaForPractice({
      syllabary: syllabary.slug,
      group: nextFilters.group,
      level: nextFilters.level,
    })

    if (nextPool.length === 0) {
      setSettingsError(
        'El ajuste elegido no tiene caracteres para practicar. Cambia el grupo o el nivel.',
      )
      return
    }

    setSettingsError(null)
    setFilterNotice(null)
    setFilters(nextFilters)
    prepareSession(nextFilters)
    updatePracticeUrl(nextFilters)
    setSettingsOpen(false)
  }

  function handleAnswer(answer: string) {
    if (!currentKana || selectedAnswer || phase !== 'active') return

    const isCorrect = answer === currentKana.romaji
    const nextStreak = isCorrect ? currentStreak + 1 : 0
    const turnResult = resolvePracticeTurn({
      isCorrect,
      isLastQuestion: currentIndex >= sessionKana.length - 1,
      remainingLives,
    })

    setSelectedAnswer(answer)
    setRemainingLives(turnResult.remainingLives)
    setAnswers((currentAnswers) => [
      ...currentAnswers,
      {
        kana: currentKana.kana,
        romaji: currentKana.romaji,
        selectedAnswer: answer,
        isCorrect,
      },
    ])

    if (isCorrect) {
      setCorrectAnswers((score) => score + 1)
      setCurrentStreak(nextStreak)
      setBestStreak((streak) => Math.max(streak, nextStreak))
    } else {
      setErrors((count) => count + 1)
      setCurrentStreak(0)
    }

    advanceTimerRef.current = window.setTimeout(() => {
      advanceTimerRef.current = null
      setSelectedAnswer(null)

      if (turnResult.endReason) {
        setEndReason(turnResult.endReason)
        setPhase('complete')
        window.requestAnimationFrame(() => summaryHeadingRef.current?.focus())
        return
      }

      setCurrentIndex((index) => index + 1)
      window.requestAnimationFrame(() => questionHeadingRef.current?.focus())
    }, 1800)
  }

  const recommendations = getRecommendations(accuracy, answers, filters)

  return (
    <section className='max-w-6xl mx-auto sm:px-12'>
      <header className='mb-8 grid gap-5 border-b border-linen-150 pb-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end'>
        <div>
          <p
            className={`mb-2 text-sm font-semibold uppercase tracking-widest ${syllabary.theme.text}`}
          >
            Práctica de {syllabary.name}
          </p>
          <h1 className='text-4xl font-semibold text-charcoal-100 sm:text-5xl'>
            {modeName} de{' '}
            <span className={syllabary.theme.text}>{syllabary.name}</span>
          </h1>
          <p className='max-w-3xl mt-4 text-base leading-relaxed text-copper-100 sm:text-lg'>
            {modeDescription}
          </p>
        </div>
      </header>
      <section className='flex items-center justify-between gap-3 px-4 py-2 my-6 border shadow-sm rounded-2xl border-linen-150 bg-linen-50'>
        <div className='flex flex-wrap gap-2 lg:max-w-80 lg:justify-end'>
          <span
            className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-widest ${syllabary.theme.softBackground} ${syllabary.theme.text}`}
          >
            Nivel {PRACTICE_LEVEL_LABELS[filters.level]}
          </span>
          <span className='rounded-full bg-linen-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-copper-200'>
            {activeGroup?.title ?? 'Todos los grupos'}
          </span>
        </div>
        <button
          type='button'
          onClick={() => {
            setSettingsError(null)
            setSettingsOpen((open) => !open)
          }}
          aria-expanded={settingsOpen}
          aria-controls='practice-settings'
          className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${syllabary.theme.focusRing} ${settingsOpen ? `${syllabary.theme.border} ${syllabary.theme.softBackground} ${syllabary.theme.text}` : 'border-linen-150 text-copper-200'}`}
        >
          Ajustes
        </button>
      </section>
      {filterNotice && (
        <p
          role='status'
          className='px-5 py-4 mb-4 text-sm border rounded-2xl border-sun-100 bg-sun-50 text-copper-200'
        >
          {filterNotice}
        </p>
      )}
      <div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]'>
        <div className='min-w-0'>
          {phase === 'ready' && (
            <section className='flex flex-col items-center justify-center p-6 text-center border shadow-sm min-h-136 rounded-3xl border-linen-150 bg-linen-50 sm:p-10'>
              {totalCharacters > 0 ? (
                <>
                  <p
                    className={`text-sm font-semibold uppercase tracking-widest ${syllabary.theme.text}`}
                  >
                    Sesión preparada
                  </p>
                  <div
                    className='flex flex-wrap items-center justify-center gap-3 my-8 min-h-28'
                    aria-hidden='true'
                  >
                    {sessionKana.slice(0, 5).map((item, index) => (
                      <span
                        key={item.kana}
                        lang='ja'
                        className={`select-none grid size-20 place-items-center rounded-2xl border bg-linen-100 font-japanese text-4xl shadow-sm hover:animate-wiggle ${syllabary.theme.border} ${syllabary.theme.text} ${index % 2 === 0 ? '-rotate-6' : 'rotate-6'}`}
                      >
                        {item.kana}
                      </span>
                    ))}
                  </div>
                  <h2 className='text-3xl font-semibold text-charcoal-100 sm:text-4xl'>
                    Practica {totalCharacters} caracteres a tu ritmo
                  </h2>
                  <p className='max-w-lg mt-4 leading-relaxed text-pretty text-copper-100'>
                    Responde una vez por carácter. Verás el resultado de cada
                    intento y podrás revisar tus métricas durante toda la ronda.
                    La sesión termina si pierdes tus cinco vidas.
                  </p>
                  <PracticeLives
                    syllabary={syllabary}
                    remainingLives={remainingLives}
                    maxLives={MAX_PRACTICE_LIVES}
                    className='mt-6'
                  />
                  <button
                    type='button'
                    onClick={startSession}
                    className={`mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 font-semibold text-mauve-50 shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 ${syllabary.theme.background} ${syllabary.theme.focusRing}`}
                  >
                    <Icon
                      name='recognize'
                      className='size-5'
                    />
                    Comenzar sesión
                  </button>
                </>
              ) : (
                <>
                  <p className='text-sm font-semibold tracking-widest uppercase text-copper-200'>
                    Sesión no disponible
                  </p>
                  <h2 className='mt-3 text-3xl font-semibold text-charcoal-100'>
                    No hay caracteres para esta combinación
                  </h2>
                  <p className='max-w-xl mt-4 text-copper-100'>
                    El grupo elegido no pertenece al nivel indicado. Cambia uno
                    de los dos ajustes para preparar la sesión.
                  </p>
                  <button
                    type='button'
                    onClick={() => setSettingsOpen(true)}
                    className={`mt-7 rounded-xl px-6 py-3 font-semibold text-mauve-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 ${syllabary.theme.background} ${syllabary.theme.focusRing}`}
                  >
                    Revisar ajustes
                  </button>
                </>
              )}
            </section>
          )}
          {phase === 'active' && currentKana && (
            <section
              aria-labelledby='question-title'
              className='p-6 border shadow-sm rounded-3xl border-linen-150 bg-linen-50 sm:p-10'
            >
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <p className='text-sm font-semibold text-copper-200'>
                  Pregunta {Math.min(answeredCount + 1, totalCharacters)} de{' '}
                  {totalCharacters}
                </p>
                <PracticeLives
                  syllabary={syllabary}
                  remainingLives={remainingLives}
                  maxLives={MAX_PRACTICE_LIVES}
                />
              </div>
              <div className='py-10 text-center sm:py-14'>
                <h2
                  id='question-title'
                  ref={questionHeadingRef}
                  tabIndex={-1}
                  className='outline-none'
                >
                  <span className='sr-only'>
                    ¿Cuál es la lectura de este kana?
                  </span>
                  <span
                    lang='ja'
                    aria-hidden='true'
                    className={`font-japanese text-9xl leading-none sm:text-[12rem] ${syllabary.theme.text}`}
                  >
                    {currentKana.kana}
                  </span>
                </h2>
              </div>
              <div className='grid gap-3 sm:grid-cols-2'>
                {options.map((option) => {
                  const answerIsLocked = selectedAnswer !== null
                  const isCorrectOption = option === currentKana.romaji
                  const isSelectedOption = option === selectedAnswer
                  const feedbackClasses = answerIsLocked
                    ? isCorrectOption
                      ? 'border-sun-100 bg-sun-50 text-copper-200'
                      : isSelectedOption
                        ? 'border-copper-200 bg-lavender-100 text-copper-200'
                        : 'border-linen-150 bg-linen-100 text-copper-100'
                    : 'border-linen-150 bg-linen-100 text-charcoal-100 hover:border-copper-100 hover:bg-linen-50'

                  return (
                    <button
                      key={option}
                      type='button'
                      onClick={() => handleAnswer(option)}
                      disabled={answerIsLocked}
                      className={`min-h-16 rounded-2xl border-2 px-5 py-4 text-xl font-semibold outline-none transition disabled:cursor-default focus-visible:ring-2 focus-visible:ring-offset-2 ${syllabary.theme.focusRing} ${feedbackClasses}`}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
              <div
                aria-live='polite'
                aria-atomic='true'
                className='mt-5 min-h-14'
              >
                {selectedAnswer && (
                  <p
                    className={`rounded-xl px-4 py-3 text-center text-sm font-semibold ${selectedAnswer === currentKana.romaji ? 'bg-sun-50 text-copper-200' : 'bg-lavender-100 text-copper-200'}`}
                  >
                    {selectedAnswer === currentKana.romaji
                      ? '¡Correcto! Sigue así.'
                      : remainingLives === 0
                        ? `La respuesta correcta es ${currentKana.romaji}. Te has quedado sin vidas.`
                        : `La respuesta correcta es ${currentKana.romaji}. Pierdes una vida. ${remainingLives === 1 ? 'Te queda 1 vida.' : `Te quedan ${remainingLives} vidas.`}`}
                  </p>
                )}
              </div>
            </section>
          )}
          {phase === 'complete' && endReason && (
            <PracticeSummary
              syllabary={syllabary}
              answeredCount={answeredCount}
              totalCharacters={totalCharacters}
              correctAnswers={correctAnswers}
              errors={errors}
              accuracy={accuracy}
              bestStreak={bestStreak}
              remainingLives={remainingLives}
              maxLives={MAX_PRACTICE_LIVES}
              endReason={endReason}
              recommendations={recommendations}
              headingRef={summaryHeadingRef}
              onRestart={startSession}
              onOpenSettings={() => setSettingsOpen(true)}
            />
          )}
        </div>
        <PracticeMetrics
          syllabary={syllabary}
          progress={progress}
          answeredCount={answeredCount}
          totalCharacters={totalCharacters}
          correctAnswers={correctAnswers}
          errors={errors}
          currentStreak={currentStreak}
          bestStreak={bestStreak}
          settingsOpen={settingsOpen}
        />
        {settingsOpen && (
          <aside
            id='practice-settings'
            aria-labelledby='practice-settings-title'
            className='p-6 border shadow-sm rounded-3xl border-linen-150 bg-linen-50'
          >
            <div className='flex flex-col gap-2'>
              <h2
                id='practice-settings-title'
                className='mt-1 text-xl font-semibold text-charcoal-100'
              >
                Ajusta tu sesión
              </h2>
              <p className='text-sm text-copper-100'>
                Aplicar cambios prepara una ronda nueva con los ajustes
                seleccionados.
              </p>
            </div>
            {phase === 'active' && (
              <p className='rounded-md mt-4 text-pretty bg-charcoal-100 px-3 py-1.5 text-xs text-sun-50'>
                Sesión en curso detectada. Aplicar cambios reiniciará la sesión.
              </p>
            )}
            <div className='grid gap-5 mt-6'>
              <label
                id='practice-level'
                className='text-sm font-semibold text-charcoal-100'
              >
                Nivel
                <div className='relative'>
                  <select
                    name='practice-level'
                    value={draftLevel}
                    onChange={(event) => {
                      setDraftLevel(event.target.value as PracticeLevel)
                      setSettingsError(null)
                    }}
                    className={`appearance-none mt-2 w-full rounded-xl border border-linen-150 bg-linen-100 px-4 py-3 font-normal outline-none focus-visible:ring-2 ${syllabary.theme.focusRing}`}
                  >
                    {PRACTICE_LEVELS.map((level) => (
                      <option
                        key={level}
                        value={level}
                        className='text-sm font-normal text-charcoal-100'
                      >
                        {PRACTICE_LEVEL_LABELS[level]} -{' '}
                        {levelDescriptions[level]}
                      </option>
                    ))}
                  </select>
                  <Icon
                    name='menu-expand'
                    className='absolute pointer-events-none -translate-y-2/3 right-4 top-2/3'
                  />
                </div>
              </label>
              <label
                id='practice-group'
                className='text-sm font-semibold text-charcoal-100'
              >
                Grupo
                <div className='relative'>
                  <select
                    name='practice-group'
                    value={draftGroup ?? ''}
                    onChange={(event) => {
                      const groupSlug =
                        (event.target.value as KanaGroupSlug) || null
                      const group = syllabary.groups.find(
                        ({ slug }) => slug === groupSlug,
                      )

                      setDraftGroup(groupSlug)
                      if (
                        group &&
                        getKanaForPractice({
                          syllabary: syllabary.slug,
                          group: groupSlug,
                          level: draftLevel,
                        }).length === 0
                      ) {
                        setDraftLevel(group.recommendedPracticeLevel)
                      }
                      setSettingsError(null)
                    }}
                    className={`appearance-none mt-2 w-full rounded-xl border border-linen-150 bg-linen-100 px-4 py-3 font-normal outline-none focus-visible:ring-2 ${syllabary.theme.focusRing}`}
                  >
                    <option value=''>Todos los grupos del nivel</option>
                    {syllabary.groups.map((group) => (
                      <option
                        key={group.slug}
                        value={group.slug}
                      >
                        {group.title} - {group.items.length} kana
                      </option>
                    ))}
                  </select>
                  <Icon
                    name='menu-expand'
                    className='absolute pointer-events-none -translate-y-2/3 right-4 top-2/3'
                  />
                </div>
              </label>
            </div>
            {settingsError && (
              <p
                role='alert'
                className='px-4 py-3 mt-4 text-sm rounded-xl bg-charcoal-100 text-lavender-100 text-pretty'
              >
                {settingsError}
              </p>
            )}
            <div className='flex flex-col gap-3 mt-6 sm:justify-end'>
              <button
                type='button'
                onClick={() => setSettingsOpen(false)}
                className='px-5 py-3 text-sm font-semibold transition border rounded-xl border-linen-150 text-copper-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-200'
              >
                Continuar sin cambios
              </button>
              <button
                type='button'
                onClick={applySettings}
                className={`rounded-xl px-5 py-3 text-sm font-semibold text-mauve-50 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${syllabary.theme.background} ${syllabary.theme.focusRing}`}
              >
                Aplicar para nueva sesión
              </button>
            </div>
          </aside>
        )}
      </div>
    </section>
  )
}
