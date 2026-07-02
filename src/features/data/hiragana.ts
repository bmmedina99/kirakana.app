import {
  createKanaGroup,
  getKanaItemsFromGroups,
  type KanaGroup,
  sortKanaGroups,
} from './groups'

export const hiraganaGroups: KanaGroup[] = sortKanaGroups([
  createKanaGroup('vocales', [
    { kana: 'あ', romaji: 'a', type: 'base' },
    { kana: 'い', romaji: 'i', type: 'base' },
    { kana: 'う', romaji: 'u', type: 'base' },
    { kana: 'え', romaji: 'e', type: 'base' },
    { kana: 'お', romaji: 'o', type: 'base' },
  ]),

  createKanaGroup('k', [
    { kana: 'か', romaji: 'ka', type: 'base' },
    { kana: 'き', romaji: 'ki', type: 'base' },
    { kana: 'く', romaji: 'ku', type: 'base' },
    { kana: 'け', romaji: 'ke', type: 'base' },
    { kana: 'こ', romaji: 'ko', type: 'base' },
  ]),

  createKanaGroup('s', [
    { kana: 'さ', romaji: 'sa', type: 'base' },
    { kana: 'し', romaji: 'shi', type: 'base' },
    { kana: 'す', romaji: 'su', type: 'base' },
    { kana: 'せ', romaji: 'se', type: 'base' },
    { kana: 'そ', romaji: 'so', type: 'base' },
  ]),

  createKanaGroup('t', [
    { kana: 'た', romaji: 'ta', type: 'base' },
    { kana: 'ち', romaji: 'chi', type: 'base' },
    { kana: 'つ', romaji: 'tsu', type: 'base' },
    { kana: 'て', romaji: 'te', type: 'base' },
    { kana: 'と', romaji: 'to', type: 'base' },
  ]),

  createKanaGroup('n', [
    { kana: 'な', romaji: 'na', type: 'base' },
    { kana: 'に', romaji: 'ni', type: 'base' },
    { kana: 'ぬ', romaji: 'nu', type: 'base' },
    { kana: 'ね', romaji: 'ne', type: 'base' },
    { kana: 'の', romaji: 'no', type: 'base' },
  ]),

  createKanaGroup('h', [
    { kana: 'は', romaji: 'ha', type: 'base' },
    { kana: 'ひ', romaji: 'hi', type: 'base' },
    { kana: 'ふ', romaji: 'fu', type: 'base' },
    { kana: 'へ', romaji: 'he', type: 'base' },
    { kana: 'ほ', romaji: 'ho', type: 'base' },
  ]),

  createKanaGroup('m', [
    { kana: 'ま', romaji: 'ma', type: 'base' },
    { kana: 'み', romaji: 'mi', type: 'base' },
    { kana: 'む', romaji: 'mu', type: 'base' },
    { kana: 'め', romaji: 'me', type: 'base' },
    { kana: 'も', romaji: 'mo', type: 'base' },
  ]),

  createKanaGroup('y', [
    { kana: 'や', romaji: 'ya', type: 'base' },
    { kana: 'ゆ', romaji: 'yu', type: 'base' },
    { kana: 'よ', romaji: 'yo', type: 'base' },
  ]),

  createKanaGroup('r', [
    { kana: 'ら', romaji: 'ra', type: 'base' },
    { kana: 'り', romaji: 'ri', type: 'base' },
    { kana: 'る', romaji: 'ru', type: 'base' },
    { kana: 'れ', romaji: 're', type: 'base' },
    { kana: 'ろ', romaji: 'ro', type: 'base' },
  ]),

  createKanaGroup('w', [
    { kana: 'わ', romaji: 'wa', type: 'base' },
    { kana: 'を', romaji: 'wo', type: 'base' },
    { kana: 'ん', romaji: 'n', type: 'base' },
  ]),

  createKanaGroup('g', [
    { kana: 'が', romaji: 'ga', type: 'dakuten', baseKana: 'か' },
    { kana: 'ぎ', romaji: 'gi', type: 'dakuten', baseKana: 'き' },
    { kana: 'ぐ', romaji: 'gu', type: 'dakuten', baseKana: 'く' },
    { kana: 'げ', romaji: 'ge', type: 'dakuten', baseKana: 'け' },
    { kana: 'ご', romaji: 'go', type: 'dakuten', baseKana: 'こ' },
  ]),

  createKanaGroup('z', [
    { kana: 'ざ', romaji: 'za', type: 'dakuten', baseKana: 'さ' },
    { kana: 'じ', romaji: 'ji', type: 'dakuten', baseKana: 'し' },
    { kana: 'ず', romaji: 'zu', type: 'dakuten', baseKana: 'す' },
    { kana: 'ぜ', romaji: 'ze', type: 'dakuten', baseKana: 'せ' },
    { kana: 'ぞ', romaji: 'zo', type: 'dakuten', baseKana: 'そ' },
  ]),

  createKanaGroup('d', [
    { kana: 'だ', romaji: 'da', type: 'dakuten', baseKana: 'た' },
    { kana: 'ぢ', romaji: 'ji', type: 'dakuten', baseKana: 'ち' },
    { kana: 'づ', romaji: 'zu', type: 'dakuten', baseKana: 'つ' },
    { kana: 'で', romaji: 'de', type: 'dakuten', baseKana: 'て' },
    { kana: 'ど', romaji: 'do', type: 'dakuten', baseKana: 'と' },
  ]),

  createKanaGroup('b', [
    { kana: 'ば', romaji: 'ba', type: 'dakuten', baseKana: 'は' },
    { kana: 'び', romaji: 'bi', type: 'dakuten', baseKana: 'ひ' },
    { kana: 'ぶ', romaji: 'bu', type: 'dakuten', baseKana: 'ふ' },
    { kana: 'べ', romaji: 'be', type: 'dakuten', baseKana: 'へ' },
    { kana: 'ぼ', romaji: 'bo', type: 'dakuten', baseKana: 'ほ' },
  ]),

  createKanaGroup('p', [
    { kana: 'ぱ', romaji: 'pa', type: 'handakuten', baseKana: 'は' },
    { kana: 'ぴ', romaji: 'pi', type: 'handakuten', baseKana: 'ひ' },
    { kana: 'ぷ', romaji: 'pu', type: 'handakuten', baseKana: 'ふ' },
    { kana: 'ぺ', romaji: 'pe', type: 'handakuten', baseKana: 'へ' },
    { kana: 'ぽ', romaji: 'po', type: 'handakuten', baseKana: 'ほ' },
  ]),

  createKanaGroup('kya', [
    {
      kana: 'きゃ',
      romaji: 'kya',
      type: 'yoon',
      baseKana: 'き',
      composedOf: ['き', 'ゃ'],
    },
    {
      kana: 'きゅ',
      romaji: 'kyu',
      type: 'yoon',
      baseKana: 'き',
      composedOf: ['き', 'ゅ'],
    },
    {
      kana: 'きょ',
      romaji: 'kyo',
      type: 'yoon',
      baseKana: 'き',
      composedOf: ['き', 'ょ'],
    },
  ]),

  createKanaGroup('sha', [
    {
      kana: 'しゃ',
      romaji: 'sha',
      type: 'yoon',
      baseKana: 'し',
      composedOf: ['し', 'ゃ'],
    },
    {
      kana: 'しゅ',
      romaji: 'shu',
      type: 'yoon',
      baseKana: 'し',
      composedOf: ['し', 'ゅ'],
    },
    {
      kana: 'しょ',
      romaji: 'sho',
      type: 'yoon',
      baseKana: 'し',
      composedOf: ['し', 'ょ'],
    },
  ]),

  createKanaGroup('cha', [
    {
      kana: 'ちゃ',
      romaji: 'cha',
      type: 'yoon',
      baseKana: 'ち',
      composedOf: ['ち', 'ゃ'],
    },
    {
      kana: 'ちゅ',
      romaji: 'chu',
      type: 'yoon',
      baseKana: 'ち',
      composedOf: ['ち', 'ゅ'],
    },
    {
      kana: 'ちょ',
      romaji: 'cho',
      type: 'yoon',
      baseKana: 'ち',
      composedOf: ['ち', 'ょ'],
    },
  ]),

  createKanaGroup('nya', [
    {
      kana: 'にゃ',
      romaji: 'nya',
      type: 'yoon',
      baseKana: 'に',
      composedOf: ['に', 'ゃ'],
    },
    {
      kana: 'にゅ',
      romaji: 'nyu',
      type: 'yoon',
      baseKana: 'に',
      composedOf: ['に', 'ゅ'],
    },
    {
      kana: 'にょ',
      romaji: 'nyo',
      type: 'yoon',
      baseKana: 'に',
      composedOf: ['に', 'ょ'],
    },
  ]),

  createKanaGroup('hya', [
    {
      kana: 'ひゃ',
      romaji: 'hya',
      type: 'yoon',
      baseKana: 'ひ',
      composedOf: ['ひ', 'ゃ'],
    },
    {
      kana: 'ひゅ',
      romaji: 'hyu',
      type: 'yoon',
      baseKana: 'ひ',
      composedOf: ['ひ', 'ゅ'],
    },
    {
      kana: 'ひょ',
      romaji: 'hyo',
      type: 'yoon',
      baseKana: 'ひ',
      composedOf: ['ひ', 'ょ'],
    },
  ]),

  createKanaGroup('mya', [
    {
      kana: 'みゃ',
      romaji: 'mya',
      type: 'yoon',
      baseKana: 'み',
      composedOf: ['み', 'ゃ'],
    },
    {
      kana: 'みゅ',
      romaji: 'myu',
      type: 'yoon',
      baseKana: 'み',
      composedOf: ['み', 'ゅ'],
    },
    {
      kana: 'みょ',
      romaji: 'myo',
      type: 'yoon',
      baseKana: 'み',
      composedOf: ['み', 'ょ'],
    },
  ]),

  createKanaGroup('rya', [
    {
      kana: 'りゃ',
      romaji: 'rya',
      type: 'yoon',
      baseKana: 'り',
      composedOf: ['り', 'ゃ'],
    },
    {
      kana: 'りゅ',
      romaji: 'ryu',
      type: 'yoon',
      baseKana: 'り',
      composedOf: ['り', 'ゅ'],
    },
    {
      kana: 'りょ',
      romaji: 'ryo',
      type: 'yoon',
      baseKana: 'り',
      composedOf: ['り', 'ょ'],
    },
  ]),

  createKanaGroup('gya', [
    {
      kana: 'ぎゃ',
      romaji: 'gya',
      type: 'yoon',
      baseKana: 'ぎ',
      composedOf: ['ぎ', 'ゃ'],
    },
    {
      kana: 'ぎゅ',
      romaji: 'gyu',
      type: 'yoon',
      baseKana: 'ぎ',
      composedOf: ['ぎ', 'ゅ'],
    },
    {
      kana: 'ぎょ',
      romaji: 'gyo',
      type: 'yoon',
      baseKana: 'ぎ',
      composedOf: ['ぎ', 'ょ'],
    },
  ]),

  createKanaGroup('ja', [
    {
      kana: 'じゃ',
      romaji: 'ja',
      type: 'yoon',
      baseKana: 'じ',
      composedOf: ['じ', 'ゃ'],
    },
    {
      kana: 'じゅ',
      romaji: 'ju',
      type: 'yoon',
      baseKana: 'じ',
      composedOf: ['じ', 'ゅ'],
    },
    {
      kana: 'じょ',
      romaji: 'jo',
      type: 'yoon',
      baseKana: 'じ',
      composedOf: ['じ', 'ょ'],
    },
  ]),

  createKanaGroup('bya', [
    {
      kana: 'びゃ',
      romaji: 'bya',
      type: 'yoon',
      baseKana: 'び',
      composedOf: ['び', 'ゃ'],
    },
    {
      kana: 'びゅ',
      romaji: 'byu',
      type: 'yoon',
      baseKana: 'び',
      composedOf: ['び', 'ゅ'],
    },
    {
      kana: 'びょ',
      romaji: 'byo',
      type: 'yoon',
      baseKana: 'び',
      composedOf: ['び', 'ょ'],
    },
  ]),

  createKanaGroup('pya', [
    {
      kana: 'ぴゃ',
      romaji: 'pya',
      type: 'yoon',
      baseKana: 'ぴ',
      composedOf: ['ぴ', 'ゃ'],
    },
    {
      kana: 'ぴゅ',
      romaji: 'pyu',
      type: 'yoon',
      baseKana: 'ぴ',
      composedOf: ['ぴ', 'ゅ'],
    },
    {
      kana: 'ぴょ',
      romaji: 'pyo',
      type: 'yoon',
      baseKana: 'ぴ',
      composedOf: ['ぴ', 'ょ'],
    },
  ]),
])

export const hiraganaKana = getKanaItemsFromGroups(hiraganaGroups)
