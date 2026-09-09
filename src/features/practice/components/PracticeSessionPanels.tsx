import type { RefObject } from 'react'
import Icon from '@/components/ui/Icon'
import type { Syllabary } from '@/features/data/syllabaries'
import { routes } from '@/lib/routes'

type MetricCardProps = {
  label: string
  value: number | string
  detail: string
}

type PracticeMetricsProps = {
  syllabary: Syllabary
  progress: number
  answeredCount: number
  totalCharacters: number
  correctAnswers: number
  errors: number
  currentStreak: number
  bestStreak: number
  settingsOpen: boolean
}

type PracticeSummaryProps = {
  syllabary: Syllabary
  answeredCount: number
  correctAnswers: number
  errors: number
  accuracy: number
  bestStreak: number
  recommendations: string[]
  headingRef: RefObject<HTMLHeadingElement | null>
  onRestart: () => void
  onOpenSettings: () => void
}

function MetricCard({ label, value, detail }: MetricCardProps) {
  return (
    <div className='p-4 border rounded-2xl border-linen-150 bg-linen-50'>
      <dt className='text-xs font-semibold tracking-widest uppercase text-copper-200'>
        {label}
      </dt>
      <dd className='mt-2 text-3xl font-semibold text-charcoal-100'>
        {value}
        <span className='block mt-1 text-xs font-normal text-copper-100'>
          {detail}
        </span>
      </dd>
    </div>
  )
}

export function PracticeMetrics({
  syllabary,
  progress,
  answeredCount,
  totalCharacters,
  correctAnswers,
  errors,
  currentStreak,
  bestStreak,
  settingsOpen,
}: PracticeMetricsProps) {
  return (
    <aside
      aria-labelledby='metrics-title'
      className={`p-6 border shadow-sm rounded-3xl border-linen-150 bg-linen-50 ${settingsOpen ? 'hidden' : ''}`}
    >
      <div className='flex items-center justify-between gap-3'>
        <div>
          <h2
            id='metrics-title'
            className='mt-1 text-xl font-semibold text-charcoal-100'
          >
            Tu sesión
          </h2>
          <p className={`text-xs font-semibold ${syllabary.theme.text}`}>
            En tiempo real
          </p>
        </div>
        <span
          className={`grid size-12 place-items-center rounded-full ${syllabary.theme.softBackground} ${syllabary.theme.text}`}
        >
          <Icon name='recognize' />
        </span>
      </div>
      <div className='mt-6'>
        <div className='flex items-center justify-between text-sm'>
          <span className='font-semibold text-charcoal-100'>Progreso</span>
          <span className={syllabary.theme.text}>{progress}%</span>
        </div>
        <div
          role='progressbar'
          aria-label='Progreso de la sesión'
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className='h-3 mt-2 overflow-hidden rounded-full bg-linen-150'
        >
          <div
            className={`h-full rounded-full transition-[width] duration-500 ${syllabary.theme.background}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className='mt-2 text-xs text-copper-100'>
          {answeredCount} de {totalCharacters} respondidos
        </p>
      </div>
      <dl className='grid grid-cols-2 gap-3 mt-6'>
        <MetricCard
          label='Aciertos'
          value={correctAnswers}
          detail='Correctos'
        />
        <MetricCard
          label='Errores'
          value={errors}
          detail='A repasar'
        />
        <MetricCard
          label='Racha'
          value={currentStreak}
          detail={`Máxima: ${bestStreak}`}
        />
        <MetricCard
          label='Total'
          value={totalCharacters}
          detail='Caracteres'
        />
      </dl>
    </aside>
  )
}

export function PracticeSummary({
  syllabary,
  answeredCount,
  correctAnswers,
  errors,
  accuracy,
  bestStreak,
  recommendations,
  headingRef,
  onRestart,
  onOpenSettings,
}: PracticeSummaryProps) {
  return (
    <section className='p-6 border shadow-sm rounded-3xl border-linen-150 bg-linen-50 sm:p-10'>
      <p
        className={`text-sm font-semibold uppercase tracking-widest ${syllabary.theme.text}`}
      >
        Sesión completada
      </p>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className='mt-2 text-3xl font-semibold outline-none text-charcoal-100 sm:text-4xl'
      >
        Resultado de tu práctica
      </h2>
      <p className='max-w-2xl mt-3 text-copper-100'>
        Has practicado {answeredCount} caracteres de {syllabary.name} con una
        precisión del {accuracy}%.
      </p>
      <dl className='grid gap-3 mt-8 md:grid-cols-3'>
        <MetricCard
          label='Aciertos'
          value={correctAnswers}
          detail='Respuestas correctas'
        />
        <MetricCard
          label='Errores'
          value={errors}
          detail='Intentos a repasar'
        />
        <MetricCard
          label='Mejor racha'
          value={bestStreak}
          detail='Aciertos consecutivos'
        />
      </dl>
      <section
        aria-labelledby='recommendations-title'
        className={`mt-8 rounded-2xl p-5 ${syllabary.theme.softBackground}`}
      >
        <h3
          id='recommendations-title'
          className={`font-semibold ${syllabary.theme.text}`}
        >
          Para tu próxima sesión
        </h3>
        <ul className='mt-4 space-y-3 text-sm leading-relaxed text-copper-200'>
          {recommendations.map((recommendation) => (
            <li
              key={recommendation}
              className='flex gap-2'
            >
              <span aria-hidden='true'>•</span>
              <span>{recommendation}</span>
            </li>
          ))}
        </ul>
      </section>
      <div className='flex flex-col gap-3 mt-8 sm:flex-row sm:flex-wrap'>
        <button
          type='button'
          onClick={onRestart}
          className={`rounded-xl px-6 py-3 font-semibold text-mauve-50 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 ${syllabary.theme.background} ${syllabary.theme.focusRing}`}
        >
          Repetir objetivo
        </button>
        <button
          type='button'
          onClick={onOpenSettings}
          className='px-6 py-3 font-semibold transition border rounded-xl border-linen-150 text-copper-200 hover:bg-linen-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-200'
        >
          Cambiar ajustes
        </button>
        <a
          href={routes.learn.syllabary(syllabary.slug)}
          className='px-6 py-3 font-semibold text-center transition rounded-xl text-copper-200 hover:bg-linen-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-200'
        >
          Volver a aprender
        </a>
      </div>
    </section>
  )
}
