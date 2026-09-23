import type { KanaItem, KanaType } from '@/features/data/groups'
import { getSyllabaryKana } from '@/features/data/syllabaries'
import type { PracticeLevel, SyllabarySlug } from '@/lib/routes'

type GetKanaForPracticeOptions = {
  syllabary: SyllabarySlug
  group?: string | null
  level?: PracticeLevel
}

const levelTypes: Record<PracticeLevel, KanaType[]> = {
  basico: ['base'],
  intermedio: ['base', 'dakuten', 'handakuten'],
  completo: ['base', 'dakuten', 'handakuten', 'yōon'],
}

export function getKanaForPractice({
  syllabary,
  group,
  level = 'basico',
}: GetKanaForPracticeOptions): KanaItem[] {
  const kana = getSyllabaryKana(syllabary)
  const includedTypes = levelTypes[level as PracticeLevel] ?? levelTypes.basico

  return kana.filter((item) => {
    const matchesGroup = !group || item.group === group
    const matchesLevel = includedTypes?.includes(item.type)

    return matchesGroup && matchesLevel
  })
}
