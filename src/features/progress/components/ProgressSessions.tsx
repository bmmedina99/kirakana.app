import { useState } from 'react'
import { KANA_GROUP_DEFINITIONS } from '@/features/data/groups'
import { accuracy, dateTime, percent } from '../utils/metrics'
import type { RecognitionSession } from '../utils/practiceProgress'

const statuses = {
  completed: 'Completada',
  'out-of-lives': 'Sin vidas',
  abandoned: 'Abandonada',
  'in-progress': 'Sin finalizar',
}
const levels = {
  basico: 'Básico',
  intermedio: 'Intermedio',
  completo: 'Completo',
}

export default function ProgressSessions({
  sessions,
  completed,
}: {
  sessions: RecognitionSession[]
  completed: number
}) {
  const [requestedPage, setPage] = useState(0)
  const pages = Math.max(1, Math.ceil(sessions.length / 5))
  const page = Math.min(requestedPage, pages - 1)
  return (
    <section
      className='p-5 border rounded-2xl bg-linen-50 sm:p-6 border-linen-150'
      aria-labelledby='sessions-heading'
    >
      <h2
        id='sessions-heading'
        className='text-2xl font-semibold'
      >
        Sesiones recientes
      </h2>
      <p className='mt-2 text-sm text-copper-100'>
        Reconocimiento · {sessions.length} sesiones · {completed} completadas
      </p>
      {sessions.length === 0 ? (
        <p className='mt-4'>
          Todavía no hay sesiones guardadas. Empieza una ronda desde las
          tarjetas de silabario.
        </p>
      ) : (
        <>
          <ol
            className='grid gap-3 mt-5'
            start={page * 5 + 1}
          >
            {sessions.slice(page * 5, page * 5 + 5).map((session) => (
              <li
                key={session.id}
                className='grid gap-3 p-4 border rounded-xl border-linen-150 md:grid-cols-3'
              >
                <div>
                  <p
                    className={`font-semibold ${session.syllabary === 'hiragana' ? 'text-ochre-200' : 'text-cyan-900'}`}
                  >
                    {session.syllabary === 'hiragana' ? 'Hiragana' : 'Katakana'}{' '}
                    - {levels[session.filters.level]}
                  </p>
                  <p className='text-sm'>
                    {session.filters.group
                      ? KANA_GROUP_DEFINITIONS[session.filters.group].title
                      : 'Todos los grupos del nivel'}
                  </p>
                  <time
                    dateTime={session.startedAt}
                    className='text-xs text-copper-100'
                  >
                    {dateTime(session.startedAt)}
                  </time>
                </div>
                <div className='text-sm'>
                  <p className='font-semibold'>{statuses[session.status]}</p>
                  <p>
                    {session.correct + session.incorrect} de{' '}
                    {session.targetCount} respuestas
                  </p>
                  <p>
                    {session.maxLives - session.incorrect} de {session.maxLives}{' '}
                    vidas restantes
                  </p>
                </div>
                <div className='text-sm'>
                  <p>
                    Precisión:{' '}
                    <strong>
                      {percent(accuracy(session.correct, session.incorrect))}
                    </strong>
                  </p>
                  <p>
                    {session.correct} aciertos - {session.incorrect} errores
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <nav
            aria-label='Páginas de sesiones'
            className='flex flex-wrap items-center justify-between gap-3 mt-5'
          >
            <button
              type='button'
              disabled={page === 0}
              className='text-sm border btn border-copper-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal-100'
              onClick={() => setPage(page - 1)}
            >
              Anteriores
            </button>
            <p
              role='status'
              className='text-sm'
            >
              Página {page + 1} de {pages}
            </p>
            <button
              type='button'
              disabled={page + 1 >= pages}
              className='text-sm border btn border-copper-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal-100'
              onClick={() => setPage(page + 1)}
            >
              Siguientes
            </button>
          </nav>
        </>
      )}
    </section>
  )
}
