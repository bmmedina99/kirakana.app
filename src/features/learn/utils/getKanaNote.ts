import type { KanaItem } from '@/features/data/groups'

export function getKanaNote(item: KanaItem): string {
  if (item.type === 'yōon' && item.composedOf) {
    return `Combina ${item.composedOf.join(' + ')} en un único sonido.`
  }

  if (item.baseKana) {
    return `Parte del carácter ${item.baseKana} y modifica su sonido.`
  }

  return 'Observa su forma, escucha el sonido y relaciónalo con su lectura.'
}
