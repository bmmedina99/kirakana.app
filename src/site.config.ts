import type { Config } from './types'

export const configSite: Config = {
  title: 'KiraKana',
  description:
    'Aprende Hiragana (ひらがな) y Katakana (カタカナ) con práctica interactiva de reconocimiento y escucha. Mejora tu lectura de japonés paso a paso.',
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
