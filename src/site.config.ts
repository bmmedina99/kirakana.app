import type { Config } from './types'

export const configSite: Config = {
  title: 'KiraKana',
  description:
    'Aplicación web interactiva para practicar y aprender Hiragana y Katakana a través de un sistema de puzzle con opciones múltiples.',
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
    title: 'Progreso',
    href: '/progreso',
  },
]
