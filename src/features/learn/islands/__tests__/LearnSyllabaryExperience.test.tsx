import { renderToString } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { syllabaries } from '@/features/data/syllabaries'
import { wordsHiragana } from '@/features/data/wordsHiragana'
import { wordsKatakana } from '@/features/data/wordsKatakana'
import LearnSyllabaryExperience from '../LearnSyllabaryExperience'

afterEach(() => vi.unstubAllGlobals())

describe('learning server rendering', () => {
  it.each(syllabaries)(
    'renders $name without accessing browser storage',
    (syllabary) => {
      const accessStorage = vi.fn(() => {
        throw new Error('Storage is unavailable during rendering')
      })
      vi.stubGlobal('window', {
        get localStorage() {
          return accessStorage()
        },
      })

      const html = renderToString(
        <LearnSyllabaryExperience
          syllabary={syllabary}
          practiceHref={`/practicar/reconocimiento/${syllabary.slug}/`}
          wordGroups={
            syllabary.slug === 'hiragana' ? wordsHiragana : wordsKatakana
          }
        />,
      )

      expect(html).toContain('Aprende')
      expect(html).toContain(syllabary.name)
      expect(accessStorage).not.toHaveBeenCalled()
      expect(html).not.toContain('No se ha podido guardar')
    },
  )
})
