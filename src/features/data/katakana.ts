// src/features/kana/data/katakana.ts

import {
  createKanaGroup,
  getKanaItemsFromGroups,
  type KanaGroup,
  sortKanaGroups,
} from './groups'

export const katakanaGroups: KanaGroup[] = sortKanaGroups([
  createKanaGroup('vocales', [
    { kana: 'ア', romaji: 'a', type: 'base' },
    { kana: 'イ', romaji: 'i', type: 'base' },
    { kana: 'ウ', romaji: 'u', type: 'base' },
    { kana: 'エ', romaji: 'e', type: 'base' },
    { kana: 'オ', romaji: 'o', type: 'base' },
  ]),

  createKanaGroup('k', [
    { kana: 'カ', romaji: 'ka', type: 'base' },
    { kana: 'キ', romaji: 'ki', type: 'base' },
    { kana: 'ク', romaji: 'ku', type: 'base' },
    { kana: 'ケ', romaji: 'ke', type: 'base' },
    { kana: 'コ', romaji: 'ko', type: 'base' },
  ]),

  createKanaGroup('s', [
    { kana: 'サ', romaji: 'sa', type: 'base' },
    { kana: 'シ', romaji: 'shi', type: 'base' },
    { kana: 'ス', romaji: 'su', type: 'base' },
    { kana: 'セ', romaji: 'se', type: 'base' },
    { kana: 'ソ', romaji: 'so', type: 'base' },
  ]),

  createKanaGroup('t', [
    { kana: 'タ', romaji: 'ta', type: 'base' },
    { kana: 'チ', romaji: 'chi', type: 'base' },
    { kana: 'ツ', romaji: 'tsu', type: 'base' },
    { kana: 'テ', romaji: 'te', type: 'base' },
    { kana: 'ト', romaji: 'to', type: 'base' },
  ]),

  createKanaGroup('n', [
    { kana: 'ナ', romaji: 'na', type: 'base' },
    { kana: 'ニ', romaji: 'ni', type: 'base' },
    { kana: 'ヌ', romaji: 'nu', type: 'base' },
    { kana: 'ネ', romaji: 'ne', type: 'base' },
    { kana: 'ノ', romaji: 'no', type: 'base' },
  ]),

  createKanaGroup('h', [
    { kana: 'ハ', romaji: 'ha', type: 'base' },
    { kana: 'ヒ', romaji: 'hi', type: 'base' },
    { kana: 'フ', romaji: 'fu', type: 'base' },
    { kana: 'ヘ', romaji: 'he', type: 'base' },
    { kana: 'ホ', romaji: 'ho', type: 'base' },
  ]),

  createKanaGroup('m', [
    { kana: 'マ', romaji: 'ma', type: 'base' },
    { kana: 'ミ', romaji: 'mi', type: 'base' },
    { kana: 'ム', romaji: 'mu', type: 'base' },
    { kana: 'メ', romaji: 'me', type: 'base' },
    { kana: 'モ', romaji: 'mo', type: 'base' },
  ]),

  createKanaGroup('y', [
    { kana: 'ヤ', romaji: 'ya', type: 'base' },
    { kana: 'ユ', romaji: 'yu', type: 'base' },
    { kana: 'ヨ', romaji: 'yo', type: 'base' },
  ]),

  createKanaGroup('r', [
    { kana: 'ラ', romaji: 'ra', type: 'base' },
    { kana: 'リ', romaji: 'ri', type: 'base' },
    { kana: 'ル', romaji: 'ru', type: 'base' },
    { kana: 'レ', romaji: 're', type: 'base' },
    { kana: 'ロ', romaji: 'ro', type: 'base' },
  ]),

  createKanaGroup('w', [
    { kana: 'ワ', romaji: 'wa', type: 'base' },
    { kana: 'ヲ', romaji: 'wo', type: 'base' },
    { kana: 'ン', romaji: 'n', type: 'base' },
  ]),

  createKanaGroup('g', [
    { kana: 'ガ', romaji: 'ga', type: 'dakuten', baseKana: 'カ' },
    { kana: 'ギ', romaji: 'gi', type: 'dakuten', baseKana: 'キ' },
    { kana: 'グ', romaji: 'gu', type: 'dakuten', baseKana: 'ク' },
    { kana: 'ゲ', romaji: 'ge', type: 'dakuten', baseKana: 'ケ' },
    { kana: 'ゴ', romaji: 'go', type: 'dakuten', baseKana: 'コ' },
  ]),

  createKanaGroup('z', [
    { kana: 'ザ', romaji: 'za', type: 'dakuten', baseKana: 'サ' },
    { kana: 'ジ', romaji: 'ji', type: 'dakuten', baseKana: 'シ' },
    { kana: 'ズ', romaji: 'zu', type: 'dakuten', baseKana: 'ス' },
    { kana: 'ゼ', romaji: 'ze', type: 'dakuten', baseKana: 'セ' },
    { kana: 'ゾ', romaji: 'zo', type: 'dakuten', baseKana: 'ソ' },
  ]),

  createKanaGroup('d', [
    { kana: 'ダ', romaji: 'da', type: 'dakuten', baseKana: 'タ' },
    { kana: 'ヂ', romaji: 'ji', type: 'dakuten', baseKana: 'チ' },
    { kana: 'ヅ', romaji: 'zu', type: 'dakuten', baseKana: 'ツ' },
    { kana: 'デ', romaji: 'de', type: 'dakuten', baseKana: 'テ' },
    { kana: 'ド', romaji: 'do', type: 'dakuten', baseKana: 'ト' },
  ]),

  createKanaGroup('b', [
    { kana: 'バ', romaji: 'ba', type: 'dakuten', baseKana: 'ハ' },
    { kana: 'ビ', romaji: 'bi', type: 'dakuten', baseKana: 'ヒ' },
    { kana: 'ブ', romaji: 'bu', type: 'dakuten', baseKana: 'フ' },
    { kana: 'ベ', romaji: 'be', type: 'dakuten', baseKana: 'ヘ' },
    { kana: 'ボ', romaji: 'bo', type: 'dakuten', baseKana: 'ホ' },
  ]),

  createKanaGroup('p', [
    { kana: 'パ', romaji: 'pa', type: 'handakuten', baseKana: 'ハ' },
    { kana: 'ピ', romaji: 'pi', type: 'handakuten', baseKana: 'ヒ' },
    { kana: 'プ', romaji: 'pu', type: 'handakuten', baseKana: 'フ' },
    { kana: 'ペ', romaji: 'pe', type: 'handakuten', baseKana: 'ヘ' },
    { kana: 'ポ', romaji: 'po', type: 'handakuten', baseKana: 'ホ' },
  ]),

  createKanaGroup('kya', [
    {
      kana: 'キャ',
      romaji: 'kya',
      type: 'yoon',
      baseKana: 'キ',
      composedOf: ['キ', 'ャ'],
    },
    {
      kana: 'キュ',
      romaji: 'kyu',
      type: 'yoon',
      baseKana: 'キ',
      composedOf: ['キ', 'ュ'],
    },
    {
      kana: 'キョ',
      romaji: 'kyo',
      type: 'yoon',
      baseKana: 'キ',
      composedOf: ['キ', 'ョ'],
    },
  ]),

  createKanaGroup('sha', [
    {
      kana: 'シャ',
      romaji: 'sha',
      type: 'yoon',
      baseKana: 'シ',
      composedOf: ['シ', 'ャ'],
    },
    {
      kana: 'シュ',
      romaji: 'shu',
      type: 'yoon',
      baseKana: 'シ',
      composedOf: ['シ', 'ュ'],
    },
    {
      kana: 'ショ',
      romaji: 'sho',
      type: 'yoon',
      baseKana: 'シ',
      composedOf: ['シ', 'ョ'],
    },
  ]),

  createKanaGroup('cha', [
    {
      kana: 'チャ',
      romaji: 'cha',
      type: 'yoon',
      baseKana: 'チ',
      composedOf: ['チ', 'ャ'],
    },
    {
      kana: 'チュ',
      romaji: 'chu',
      type: 'yoon',
      baseKana: 'チ',
      composedOf: ['チ', 'ュ'],
    },
    {
      kana: 'チョ',
      romaji: 'cho',
      type: 'yoon',
      baseKana: 'チ',
      composedOf: ['チ', 'ョ'],
    },
  ]),

  createKanaGroup('nya', [
    {
      kana: 'ニャ',
      romaji: 'nya',
      type: 'yoon',
      baseKana: 'ニ',
      composedOf: ['ニ', 'ャ'],
    },
    {
      kana: 'ニュ',
      romaji: 'nyu',
      type: 'yoon',
      baseKana: 'ニ',
      composedOf: ['ニ', 'ュ'],
    },
    {
      kana: 'ニョ',
      romaji: 'nyo',
      type: 'yoon',
      baseKana: 'ニ',
      composedOf: ['ニ', 'ョ'],
    },
  ]),

  createKanaGroup('hya', [
    {
      kana: 'ヒャ',
      romaji: 'hya',
      type: 'yoon',
      baseKana: 'ヒ',
      composedOf: ['ヒ', 'ャ'],
    },
    {
      kana: 'ヒュ',
      romaji: 'hyu',
      type: 'yoon',
      baseKana: 'ヒ',
      composedOf: ['ヒ', 'ュ'],
    },
    {
      kana: 'ヒョ',
      romaji: 'hyo',
      type: 'yoon',
      baseKana: 'ヒ',
      composedOf: ['ヒ', 'ョ'],
    },
  ]),

  createKanaGroup('mya', [
    {
      kana: 'ミャ',
      romaji: 'mya',
      type: 'yoon',
      baseKana: 'ミ',
      composedOf: ['ミ', 'ャ'],
    },
    {
      kana: 'ミュ',
      romaji: 'myu',
      type: 'yoon',
      baseKana: 'ミ',
      composedOf: ['ミ', 'ュ'],
    },
    {
      kana: 'ミョ',
      romaji: 'myo',
      type: 'yoon',
      baseKana: 'ミ',
      composedOf: ['ミ', 'ョ'],
    },
  ]),

  createKanaGroup('rya', [
    {
      kana: 'リャ',
      romaji: 'rya',
      type: 'yoon',
      baseKana: 'リ',
      composedOf: ['リ', 'ャ'],
    },
    {
      kana: 'リュ',
      romaji: 'ryu',
      type: 'yoon',
      baseKana: 'リ',
      composedOf: ['リ', 'ュ'],
    },
    {
      kana: 'リョ',
      romaji: 'ryo',
      type: 'yoon',
      baseKana: 'リ',
      composedOf: ['リ', 'ョ'],
    },
  ]),

  createKanaGroup('gya', [
    {
      kana: 'ギャ',
      romaji: 'gya',
      type: 'yoon',
      baseKana: 'ギ',
      composedOf: ['ギ', 'ャ'],
    },
    {
      kana: 'ギュ',
      romaji: 'gyu',
      type: 'yoon',
      baseKana: 'ギ',
      composedOf: ['ギ', 'ュ'],
    },
    {
      kana: 'ギョ',
      romaji: 'gyo',
      type: 'yoon',
      baseKana: 'ギ',
      composedOf: ['ギ', 'ョ'],
    },
  ]),

  createKanaGroup('ja', [
    {
      kana: 'ジャ',
      romaji: 'ja',
      type: 'yoon',
      baseKana: 'ジ',
      composedOf: ['ジ', 'ャ'],
    },
    {
      kana: 'ジュ',
      romaji: 'ju',
      type: 'yoon',
      baseKana: 'ジ',
      composedOf: ['ジ', 'ュ'],
    },
    {
      kana: 'ジョ',
      romaji: 'jo',
      type: 'yoon',
      baseKana: 'ジ',
      composedOf: ['ジ', 'ョ'],
    },
  ]),

  createKanaGroup('bya', [
    {
      kana: 'ビャ',
      romaji: 'bya',
      type: 'yoon',
      baseKana: 'ビ',
      composedOf: ['ビ', 'ャ'],
    },
    {
      kana: 'ビュ',
      romaji: 'byu',
      type: 'yoon',
      baseKana: 'ビ',
      composedOf: ['ビ', 'ュ'],
    },
    {
      kana: 'ビョ',
      romaji: 'byo',
      type: 'yoon',
      baseKana: 'ビ',
      composedOf: ['ビ', 'ョ'],
    },
  ]),

  createKanaGroup('pya', [
    {
      kana: 'ピャ',
      romaji: 'pya',
      type: 'yoon',
      baseKana: 'ピ',
      composedOf: ['ピ', 'ャ'],
    },
    {
      kana: 'ピュ',
      romaji: 'pyu',
      type: 'yoon',
      baseKana: 'ピ',
      composedOf: ['ピ', 'ュ'],
    },
    {
      kana: 'ピョ',
      romaji: 'pyo',
      type: 'yoon',
      baseKana: 'ピ',
      composedOf: ['ピ', 'ョ'],
    },
  ]),
])

export const katakanaKana = getKanaItemsFromGroups(katakanaGroups)
