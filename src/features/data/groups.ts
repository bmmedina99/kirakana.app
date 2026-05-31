import type { PracticeLevel } from '@/lib/routes'

export type KanaType = 'base' | 'dakuten' | 'handakuten' | 'yoon'

export type KanaGroupCategory = 'basico' | 'modificado' | 'combinaciones'

export type KanaGroupSlug =
  | 'vocales'
  | 'k'
  | 's'
  | 't'
  | 'n'
  | 'h'
  | 'm'
  | 'y'
  | 'r'
  | 'w'
  | 'g'
  | 'z'
  | 'd'
  | 'b'
  | 'p'
  | 'kya'
  | 'sha'
  | 'cha'
  | 'nya'
  | 'hya'
  | 'mya'
  | 'rya'
  | 'gya'
  | 'ja'
  | 'bya'
  | 'pya'

export type KanaItem = {
  kana: string
  romaji: string
  type: KanaType
  group: KanaGroupSlug
  baseKana?: string
  composedOf?: string[]
}

export type KanaGroupDefinition = {
  slug: KanaGroupSlug
  title: string
  shortTitle: string
  category: KanaGroupCategory
  type: KanaType
  description: string
  recommendedPracticeLevel: PracticeLevel
}

export type KanaGroup = KanaGroupDefinition & {
  items: KanaItem[]
}

export const KANA_GROUP_ORDER: KanaGroupSlug[] = [
  'vocales',
  'k',
  's',
  't',
  'n',
  'h',
  'm',
  'y',
  'r',
  'w',
  'g',
  'z',
  'd',
  'b',
  'p',
  'kya',
  'sha',
  'cha',
  'nya',
  'hya',
  'mya',
  'rya',
  'gya',
  'ja',
  'bya',
  'pya',
]

export const KANA_GROUP_DEFINITIONS: Record<
  KanaGroupSlug,
  KanaGroupDefinition
> = {
  vocales: {
    slug: 'vocales',
    title: 'Vocales',
    shortTitle: 'Vocales',
    category: 'basico',
    type: 'base',
    description: 'Los cinco sonidos básicos del japonés: a, i, u, e, o.',
    recommendedPracticeLevel: 'basico',
  },
  k: {
    slug: 'k',
    title: 'Grupo K',
    shortTitle: 'K',
    category: 'basico',
    type: 'base',
    description: 'Combina el sonido K con las cinco vocales japonesas.',
    recommendedPracticeLevel: 'basico',
  },
  s: {
    slug: 's',
    title: 'Grupo S',
    shortTitle: 'S',
    category: 'basico',
    type: 'base',
    description: 'Introduce sonidos como sa, shi, su, se y so.',
    recommendedPracticeLevel: 'basico',
  },
  t: {
    slug: 't',
    title: 'Grupo T',
    shortTitle: 'T',
    category: 'basico',
    type: 'base',
    description: 'Incluye sonidos como ta, chi, tsu, te y to.',
    recommendedPracticeLevel: 'basico',
  },
  n: {
    slug: 'n',
    title: 'Grupo N',
    shortTitle: 'N',
    category: 'basico',
    type: 'base',
    description: 'Grupo de sonidos con N: na, ni, nu, ne y no.',
    recommendedPracticeLevel: 'basico',
  },
  h: {
    slug: 'h',
    title: 'Grupo H',
    shortTitle: 'H',
    category: 'basico',
    type: 'base',
    description: 'Incluye ha, hi, fu, he y ho.',
    recommendedPracticeLevel: 'basico',
  },
  m: {
    slug: 'm',
    title: 'Grupo M',
    shortTitle: 'M',
    category: 'basico',
    type: 'base',
    description: 'Grupo de sonidos con M: ma, mi, mu, me y mo.',
    recommendedPracticeLevel: 'basico',
  },
  y: {
    slug: 'y',
    title: 'Grupo Y',
    shortTitle: 'Y',
    category: 'basico',
    type: 'base',
    description: 'Grupo reducido con ya, yu y yo.',
    recommendedPracticeLevel: 'basico',
  },
  r: {
    slug: 'r',
    title: 'Grupo R',
    shortTitle: 'R',
    category: 'basico',
    type: 'base',
    description: 'Grupo de sonidos con R japonesa: ra, ri, ru, re y ro.',
    recommendedPracticeLevel: 'basico',
  },
  w: {
    slug: 'w',
    title: 'Grupo W + N',
    shortTitle: 'W + N',
    category: 'basico',
    type: 'base',
    description: 'Incluye wa, wo y el sonido nasal n.',
    recommendedPracticeLevel: 'basico',
  },
  g: {
    slug: 'g',
    title: 'Grupo G',
    shortTitle: 'G',
    category: 'modificado',
    type: 'dakuten',
    description: 'Se forma agregando dakuten ゛ al grupo K: ka cambia a ga.',
    recommendedPracticeLevel: 'intermedio',
  },
  z: {
    slug: 'z',
    title: 'Grupo Z',
    shortTitle: 'Z',
    category: 'modificado',
    type: 'dakuten',
    description: 'Se forma agregando dakuten ゛ al grupo S.',
    recommendedPracticeLevel: 'intermedio',
  },
  d: {
    slug: 'd',
    title: 'Grupo D',
    shortTitle: 'D',
    category: 'modificado',
    type: 'dakuten',
    description: 'Se forma agregando dakuten ゛ al grupo T.',
    recommendedPracticeLevel: 'intermedio',
  },
  b: {
    slug: 'b',
    title: 'Grupo B',
    shortTitle: 'B',
    category: 'modificado',
    type: 'dakuten',
    description: 'Se forma agregando dakuten ゛ al grupo H.',
    recommendedPracticeLevel: 'intermedio',
  },
  p: {
    slug: 'p',
    title: 'Grupo P',
    shortTitle: 'P',
    category: 'modificado',
    type: 'handakuten',
    description: 'Se forma agregando handakuten ゜ al grupo H.',
    recommendedPracticeLevel: 'intermedio',
  },
  kya: {
    slug: 'kya',
    title: 'Combinaciones KYA',
    shortTitle: 'KYA',
    category: 'combinaciones',
    type: 'yoon',
    description: 'Combinaciones con pequeño ya, yu y yo: kya, kyu, kyo.',
    recommendedPracticeLevel: 'completo',
  },
  sha: {
    slug: 'sha',
    title: 'Combinaciones SHA',
    shortTitle: 'SHA',
    category: 'combinaciones',
    type: 'yoon',
    description: 'Combinaciones con shi y pequeños ya, yu y yo.',
    recommendedPracticeLevel: 'completo',
  },
  cha: {
    slug: 'cha',
    title: 'Combinaciones CHA',
    shortTitle: 'CHA',
    category: 'combinaciones',
    type: 'yoon',
    description: 'Combinaciones con chi y pequeños ya, yu y yo.',
    recommendedPracticeLevel: 'completo',
  },
  nya: {
    slug: 'nya',
    title: 'Combinaciones NYA',
    shortTitle: 'NYA',
    category: 'combinaciones',
    type: 'yoon',
    description: 'Combinaciones con ni y pequeños ya, yu y yo.',
    recommendedPracticeLevel: 'completo',
  },
  hya: {
    slug: 'hya',
    title: 'Combinaciones HYA',
    shortTitle: 'HYA',
    category: 'combinaciones',
    type: 'yoon',
    description: 'Combinaciones con hi y pequeños ya, yu y yo.',
    recommendedPracticeLevel: 'completo',
  },
  mya: {
    slug: 'mya',
    title: 'Combinaciones MYA',
    shortTitle: 'MYA',
    category: 'combinaciones',
    type: 'yoon',
    description: 'Combinaciones con mi y pequeños ya, yu y yo.',
    recommendedPracticeLevel: 'completo',
  },
  rya: {
    slug: 'rya',
    title: 'Combinaciones RYA',
    shortTitle: 'RYA',
    category: 'combinaciones',
    type: 'yoon',
    description: 'Combinaciones con ri y pequeños ya, yu y yo.',
    recommendedPracticeLevel: 'completo',
  },
  gya: {
    slug: 'gya',
    title: 'Combinaciones GYA',
    shortTitle: 'GYA',
    category: 'combinaciones',
    type: 'yoon',
    description: 'Combinaciones con gi y pequeños ya, yu y yo.',
    recommendedPracticeLevel: 'completo',
  },
  ja: {
    slug: 'ja',
    title: 'Combinaciones JA',
    shortTitle: 'JA',
    category: 'combinaciones',
    type: 'yoon',
    description: 'Combinaciones con ji y pequeños ya, yu y yo.',
    recommendedPracticeLevel: 'completo',
  },
  bya: {
    slug: 'bya',
    title: 'Combinaciones BYA',
    shortTitle: 'BYA',
    category: 'combinaciones',
    type: 'yoon',
    description: 'Combinaciones con bi y pequeños ya, yu y yo.',
    recommendedPracticeLevel: 'completo',
  },
  pya: {
    slug: 'pya',
    title: 'Combinaciones PYA',
    shortTitle: 'PYA',
    category: 'combinaciones',
    type: 'yoon',
    description: 'Combinaciones con pi y pequeños ya, yu y yo.',
    recommendedPracticeLevel: 'completo',
  },
}

export function createKanaGroup(
  slug: KanaGroupSlug,
  items: Omit<KanaItem, 'group'>[],
): KanaGroup {
  const definition = KANA_GROUP_DEFINITIONS[slug]

  return {
    ...definition,
    items: items.map((item) => ({
      ...item,
      group: slug,
    })),
  }
}

export function sortKanaGroups(groups: KanaGroup[]): KanaGroup[] {
  return [...groups].sort(
    (a, b) =>
      KANA_GROUP_ORDER.indexOf(a.slug) - KANA_GROUP_ORDER.indexOf(b.slug),
  )
}

export function getKanaItemsFromGroups(groups: KanaGroup[]): KanaItem[] {
  return groups.flatMap((group) => group.items)
}

export function getKanaGroupBySlug(
  groups: KanaGroup[],
  slug: KanaGroupSlug | string,
): KanaGroup | undefined {
  return groups.find((group) => group.slug === slug)
}

export function getKanaGroupsByCategory(
  groups: KanaGroup[],
  category: KanaGroupCategory,
): KanaGroup[] {
  return groups.filter((group) => group.category === category)
}
