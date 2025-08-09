import type { Config, KanaItem } from './types'

export const configSite: Config = {
  title: 'KiraKana',
  description:
    'Domina los silabarios japoneses Hiragana y Katakana a través de nuestra plataforma interactiva. Practica cada kana con un puzzle intuitivo.',
  lang: 'es',
  author: 'bmmedina99',
  url: 'https://kirakana.app',
}

export const navLinks = [
  {
    title: 'Inicio',
    href: '/',
  },
  {
    title: 'Aprender',
    href: '/aprender',
  },
  {
    title: 'Practicar',
    href: '/practicar',
  },
  {
    title: 'Estadísticas',
    href: '/estadisticas',
  },
]

export const Hiragana: KanaItem[] = [
  { kana: 'あ', romanji: 'a' },
  { kana: 'い', romanji: 'i' },
  { kana: 'う', romanji: 'u' },
  { kana: 'え', romanji: 'e' },
  { kana: 'お', romanji: 'o' },
]

export const Katakana: KanaItem[] = [
  { kana: 'ア', romanji: 'a' },
  { kana: 'イ', romanji: 'i' },
  { kana: 'ウ', romanji: 'u' },
  { kana: 'エ', romanji: 'e' },
  { kana: 'オ', romanji: 'o' },
]
