import { kanaCards } from '../data/kanacards'
import { modeCards } from '../data/modecards'

export function createCards({
  cardType,
  basePath,
  buttonLabel,
}: {
  cardType: string
  basePath: string
  buttonLabel: string
}) {
  const cards = cardType === 'kana' ? kanaCards : modeCards

  return cards.map((card) => ({
    ...card,
    href: `/${basePath}/${card.slug}/`,
    buttonText: `${buttonLabel} ${card.slug}`,
  }))
}
