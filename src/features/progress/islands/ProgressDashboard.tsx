import { useMemo, useState } from 'react'
import Icon from '@/components/ui/Icon'
import { KANA_GROUP_DEFINITIONS } from '@/features/data/groups'
import { routes } from '@/lib/routes'
import ProgressSessions from '../components/ProgressSessions'
import { useProgressDashboard } from '../hooks/useProgressDashboard'
import { dashboardErrorMessage } from '../utils/dashboard'
import { dateTime, percent, progressMetrics } from '../utils/metrics'
import { clearStoredProgress } from '../utils/storage'

export default function ProgressDashboard() {
  const progress = useProgressDashboard()
  const [clearing, setClearing] = useState(false)
  const [clearMessage, setClearMessage] = useState('')
  const metrics = useMemo(
    () =>
      progress.snapshot
        ? progressMetrics(progress.snapshot, progress.loadedAt)
        : null,
    [progress.snapshot, progress.loadedAt],
  )

  const clear = async () => {
    if (
      clearing ||
      !window.confirm(
        '¿Quieres borrar tu historial de KiraKana? Esta acción no se puede deshacer.',
      )
    )
      return
    setClearing(true)
    const result = await clearStoredProgress()
    if (result.ok) {
      window.location.reload()
      return
    }
    setClearMessage(
      'No se ha podido borrar el historial. Comprueba que el navegador permite acceder a los datos del sitio e inténtalo de nuevo.',
    )
    setClearing(false)
  }

  return (
    <section className='container mx-auto'>
      <header className='grid gap-5 pb-8 mb-8 border-b border-linen-150'>
        <div>
          <p className='mb-2 text-sm font-semibold tracking-widest uppercase font-japanese'>
            あなたの進捗状況
          </p>
          <h1 className='text-4xl font-semibold sm:text-5xl'>
            <span className='text-ochre-200'>Tu progreso</span> aprendiendo
            japonés
          </h1>
          <p className='max-w-2xl mt-4 text-base leading-relaxed text-copper-100 sm:text-lg'>
            Aquí podrás ver cuánto has explorado de{' '}
            <span className='text-ochre-200'>hiragana</span> y{' '}
            <span className='text-cyan-900'>katakana</span>, revisa tu
            reconocimiento y elige qué repasar. Historial local, sin cuenta ni
            registro. Los datos se actualizan al recargar la página.
          </p>
        </div>
      </header>
      <div className='space-y-6'>
        {progress.error && (
          <div
            role='status'
            className='p-5 text-center border rounded-2xl bg-linen-50 sm:p-6 border-linen-150'
          >
            <p>{dashboardErrorMessage(progress.error)}</p>
            <button
              type='button'
              onClick={() => window.location.reload()}
              className='mt-3 text-sm border btn border-copper-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal-100'
            >
              Recargar página
            </button>
          </div>
        )}
        {!progress.canWrite && (
          <p
            role='status'
            className='p-5 text-sm border rounded-2xl bg-linen-50 sm:p-6 border-linen-150'
          >
            Puedes consultar el historial disponible, pero este navegador no
            permite guardar ni borrar el progreso. Prueba un navegador
            actualizado que permita guardar los datos del sitio.
          </p>
        )}
        {metrics && (
          <>
            {metrics.consulted === 0 && metrics.sessions.length === 0 && (
              <div className='p-4 border-2 rounded-2xl bg-charcoal-100 sm:p-6 border-sun-50'>
                <h2 className='text-xl font-semibold text-sun-50'>
                  Parece que todavía no has empezado a aprender japonés
                </h2>
                <p className='mt-2 text-lavender-100'>
                  Consulta las fichas de aprendizaje, practica reconocimiento y
                  repasa los kana que más te cuesten. Después encontrarás aquí
                  tus avances y sugerencias de repaso.
                </p>
                <div className='flex flex-wrap gap-4 mt-3'>
                  <a
                    href={routes.learn.index()}
                    className='text-sm border btn border-lavender-100 text-lavender-100 hover:bg-linen-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun-50'
                  >
                    Empezar a aprender
                  </a>
                  <a
                    href={routes.practice.mode('reconocimiento')}
                    className='text-sm underline btn underline-offset-4 text-lavender-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun-50'
                  >
                    Practicar reconocimiento
                  </a>
                </div>
              </div>
            )}
            <section aria-label='Resumen de tu progreso'>
              <dl className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
                {[
                  {
                    label: 'Kana consultados',
                    value: `${metrics.consulted} / ${metrics.total}`,
                    detail: 'Fichas vistas en Aprender',
                  },
                  {
                    label: 'Kana practicados',
                    value: `${metrics.practiced} / ${metrics.total}`,
                    detail: 'Reconocimiento visual',
                  },
                  {
                    label: 'Precisión',
                    value:
                      metrics.accuracy === null
                        ? 'Sin práctica todavía'
                        : percent(metrics.accuracy),
                    detail: `${metrics.attempts} respuestas en total`,
                  },
                  {
                    label: 'Racha diaria',
                    value: `${metrics.activity.current} ${metrics.activity.current === 1 ? 'día' : 'días'}`,
                    detail: 'Actividad de aprendizaje y práctica',
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className='p-5 border rounded-2xl bg-linen-50 sm:p-6 border-linen-150'
                  >
                    <dt className='text-sm text-copper-100'>{stat.label}</dt>
                    <dd className='mt-2 text-xl font-semibold sm:text-2xl'>
                      {stat.value}
                    </dd>
                    <dd className='mt-2 text-xs text-copper-100 text-pretty'>
                      {stat.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
            <div className='grid gap-4 md:grid-cols-2'>
              {metrics.summaries.map((summary) => {
                const { syllabary } = summary
                return (
                  <section
                    key={syllabary.slug}
                    className={`rounded-2xl border bg-linen-50 p-4 sm:p-6 border-t-2 ${syllabary.theme.border}`}
                    aria-labelledby={`${syllabary.slug}-progress`}
                  >
                    <div
                      className={`flex items-center justify-between gap-3 ${syllabary.theme.text}`}
                    >
                      <h2
                        id={`${syllabary.slug}-progress`}
                        className='text-2xl font-semibold'
                      >
                        {syllabary.name}
                      </h2>
                      <Icon
                        name={syllabary.slug}
                        className='size-8'
                      />
                    </div>
                    <dl className='my-5 space-y-3'>
                      {[
                        ['Consultados', summary.consulted],
                        ['Practicados', summary.practiced],
                        ['Dominio estimado', summary.mastered],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className='flex justify-between gap-3'
                        >
                          <dt>{label}</dt>
                          <dd className='font-semibold tabular-nums'>
                            {value} / {syllabary.kana.length}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <p className='text-sm text-copper-100 text-pretty'>
                      Última ficha de aprender consultada:{' '}
                      {summary.lastViewed?.learning ? (
                        <>
                          {
                            KANA_GROUP_DEFINITIONS[summary.lastViewed.group]
                              .title
                          }{' '}
                          ·{' '}
                          <span
                            lang='ja'
                            className='font-japanese'
                          >
                            {summary.lastViewed.kana}
                          </span>{' '}
                          ({summary.lastViewed.romaji}), el día{' '}
                          {dateTime(summary.lastViewed.learning.lastViewedAt)}
                        </>
                      ) : (
                        'Todavía ninguna.'
                      )}
                    </p>
                    {summary.recent && (
                      <p className='mt-3 text-sm'>
                        Precisión reciente: {percent(summary.recent.latest)}{' '}
                        frente a {percent(summary.recent.previous)} (
                        {summary.recent.difference > 0 ? '+' : ''}
                        {summary.recent.difference.toLocaleString('es', {
                          maximumFractionDigits: 1,
                        })}{' '}
                        puntos porcentuales). Últimas cinco sesiones finalizadas
                        con respuestas frente a las cinco anteriores; los
                        filtros y la dificultad pueden variar.
                      </p>
                    )}
                    <div className='flex flex-wrap gap-3 mt-5'>
                      <a
                        href={routes.learn.syllabary(syllabary.slug)}
                        className={`btn text-sm text-linen-50 ${syllabary.theme.background} focus-visible:outline-2 focus-visible:outline-offset-4 ${syllabary.theme.focusOutline}`}
                      >
                        Aprender {syllabary.slug}
                      </a>
                      <a
                        href={routes.practice.modeSyllabary(
                          'reconocimiento',
                          syllabary.slug,
                        )}
                        className={`btn txt-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 ${syllabary.theme.focusOutline} ${syllabary.theme.text}`}
                        aria-label={`Practicar reconocimiento de ${syllabary.slug}`}
                      >
                        Practicar reconocimiento
                      </a>
                    </div>
                  </section>
                )
              })}
            </div>
            <section
              className='p-4 border rounded-2xl bg-linen-50 sm:p-6 border-linen-150'
              aria-labelledby='review-heading'
            >
              <h2
                id='review-heading'
                className='text-2xl font-semibold'
              >
                Sugerencias de repaso
              </h2>
              <p className='mt-2 text-sm text-copper-100'>
                Repasa los 5 kana con errores históricos, empezando por los de
                menor precisión. Puedes repasar su grupo completo.
              </p>
              {metrics.review.length === 0 ? (
                <p className='mt-5'>
                  {metrics.attempts === 0
                    ? 'Empieza a practicar para ver sugerencias de repaso.'
                    : 'Excelente, no hay errores. Sigue practicando para dominarlos.'}
                </p>
              ) : (
                <ul className='mt-4 divide-y divide-linen-150'>
                  {metrics.review.map((item) => (
                    <li
                      key={`${item.syllabary}-${item.kana}`}
                      className='py-3'
                    >
                      <div className='flex flex-wrap items-baseline justify-between gap-2'>
                        <p>
                          <span
                            lang='ja'
                            className={`font-japanese text-2xl ${item.syllabary === 'hiragana' ? 'text-ochre-200' : 'text-cyan-900'}`}
                          >
                            {item.kana}
                          </span>{' '}
                          <strong>{item.romaji}</strong>{' '}
                          <span className='text-xs text-copper-100'>
                            - {item.syllabary}
                          </span>
                        </p>
                        <p className='text-sm'>
                          {percent(item.accuracy)} - {item.attempts} intentos -{' '}
                          {item.incorrect} errores
                        </p>
                      </div>
                      {item.attempts < 5 && (
                        <p className='mt-1 text-xs text-copper-100'>
                          Muestra pequeña: menos de 5 intentos.
                        </p>
                      )}
                      <a
                        href={item.practiceUrl}
                        className={`inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4 ${item.syllabary === 'hiragana' ? 'text-ochre-200' : 'text-cyan-900'}`}
                        aria-label={`Practicar grupo ${KANA_GROUP_DEFINITIONS[item.group].shortTitle} de ${item.syllabary} para repasar ${item.kana}`}
                      >
                        Practicar grupo{' '}
                        {KANA_GROUP_DEFINITIONS[item.group].shortTitle}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
            <ProgressSessions
              sessions={metrics.sessions}
              completed={metrics.completed}
            />
          </>
        )}

        <section
          className={`p-4 text-center border-2 rounded-2xl bg-charcoal-100 sm:p-6 border-sun-50 border-dashed`}
          aria-labelledby='local-data-heading'
        >
          <h2
            id='local-data-heading'
            className='text-xl font-semibold text-sun-50'
          >
            Tus datos en este navegador
          </h2>
          <p className='max-w-3xl mx-auto mt-2 text-sm text-lavender-100'>
            Tu historial se guarda en este navegador y dispositivo, sin cuenta.
            Si borras los datos del sitio, puedes perderlo. Borrar el historial
            elimina las consultas, los resultados y los días de actividad de
            KiraKana.
          </p>
          <button
            type='button'
            onClick={clear}
            disabled={clearing || !progress.canWrite}
            className='mt-4 text-sm border text-lavender-100 btn border-sun-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun-100'
            aria-describedby='clear-progress-status'
          >
            {clearing ? 'Borrando…' : 'Borrar historial'}
          </button>
          <p
            id='clear-progress-status'
            role='status'
            className='mt-2 text-sm text-sun-50'
          >
            {clearMessage}
          </p>
        </section>
      </div>
    </section>
  )
}
