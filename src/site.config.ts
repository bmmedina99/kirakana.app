import type { Config } from './types'

export const configSite: Config = {
  name: 'KiraKana',
  description:
    'Aprende hiragana y katakana gratis con KiraKana: ejercicios visuales, audio y progreso sin registro. El método más fácil para empezar japonés desde cero.',
  lang: 'es',
  locale: 'es_ES',
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
    href: '/aprender/',
  },
  {
    title: 'Practicar',
    href: '/practicar/',
  },
  {
    title: 'Progreso',
    href: '/progreso/',
  },
]
