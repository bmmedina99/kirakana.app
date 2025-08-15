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
  { kana: 'か', romanji: 'ka' },
  { kana: 'き', romanji: 'ki' },
  { kana: 'く', romanji: 'ku' },
  { kana: 'け', romanji: 'ke' },
  { kana: 'こ', romanji: 'ko' },
  { kana: 'さ', romanji: 'sa' },
  { kana: 'し', romanji: 'shi' },
  { kana: 'す', romanji: 'su' },
  { kana: 'せ', romanji: 'se' },
  { kana: 'そ', romanji: 'so' },
  { kana: 'た', romanji: 'ta' },
  { kana: 'ち', romanji: 'chi' },
  { kana: 'つ', romanji: 'tsu' },
  { kana: 'て', romanji: 'te' },
  { kana: 'と', romanji: 'to' },
  { kana: 'な', romanji: 'na' },
  { kana: 'に', romanji: 'ni' },
  { kana: 'ぬ', romanji: 'nu' },
  { kana: 'ね', romanji: 'ne' },
  { kana: 'の', romanji: 'no' },
  { kana: 'は', romanji: 'ha' },
  { kana: 'ひ', romanji: 'hi' },
  { kana: 'ふ', romanji: 'hu' },
  { kana: 'へ', romanji: 'he' },
  { kana: 'ほ', romanji: 'ho' },
  { kana: 'ま', romanji: 'ma' },
  { kana: 'み', romanji: 'mi' },
  { kana: 'む', romanji: 'mu' },
  { kana: 'め', romanji: 'me' },
  { kana: 'も', romanji: 'mo' },
  { kana: 'や', romanji: 'ya' },
  { kana: 'ゆ', romanji: 'yu' },
  { kana: 'よ', romanji: 'yo' },
  { kana: 'ら', romanji: 'ra' },
  { kana: 'り', romanji: 'ri' },
  { kana: 'る', romanji: 'ru' },
  { kana: 'れ', romanji: 're' },
  { kana: 'ろ', romanji: 'ro' },
  { kana: 'わ', romanji: 'wa' },
  { kana: 'を', romanji: 'wo' },
  { kana: 'ん', romanji: 'n' },
]

export const Katakana: KanaItem[] = [
  { kana: 'ア', romanji: 'a' },
  { kana: 'イ', romanji: 'i' },
  { kana: 'ウ', romanji: 'u' },
  { kana: 'エ', romanji: 'e' },
  { kana: 'オ', romanji: 'o' },
]
