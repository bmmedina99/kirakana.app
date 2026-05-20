import type { KanaCard } from '@/types'
import { kanaCards } from '../data/kanaCards'

export function createKanaCards({ basePath, buttonLabel }: KanaCard) {
  return kanaCards.map((card) => ({
    ...card,
    href: `/${basePath}/${card.slug}/`,
    buttonText: `${buttonLabel} ${card.slug}`,
  }))
}
