import { defineWordGroups } from './wordGroups'

export const wordsKatakana = defineWordGroups({
  vocales: {
    ア: {
      words: [
        {
          word: 'アメリカ',
          romaji: 'amerika',
          meaning: 'América',
        },
        { word: 'アイス', romaji: 'aisu', meaning: 'helado' },
        { word: 'アニメ', romaji: 'anime', meaning: 'anime' },
      ],
    },
    イ: {
      words: [
        { word: 'イタリア', romaji: 'itaria', meaning: 'Italia' },
        { word: 'ナイフ', romaji: 'naifu', meaning: 'cuchillo' },
        { word: 'タイ', romaji: 'tai', meaning: 'Tailandia' },
      ],
    },
    ウ: {
      words: [
        { word: 'ウール', romaji: 'uuru', meaning: 'lana' },
        { word: 'パウダー', romaji: 'paudaa', meaning: 'polvo' },
        { word: 'ウエスト', romaji: 'uesuto', meaning: 'cintura' },
      ],
    },
    エ: {
      words: [
        { word: 'エレベーター', romaji: 'erebeetaa', meaning: 'ascensor' },
        { word: 'エプロン', romaji: 'epuron', meaning: 'delantal' },
        { word: 'エアコン', romaji: 'eakon', meaning: 'aire acondicionado' },
      ],
    },
    オ: {
      words: [
        { word: 'オレンジ', romaji: 'orenji', meaning: 'naranja' },
        { word: 'ラジオ', romaji: 'rajio', meaning: 'radio' },
        {
          word: 'オムレツ',
          romaji: 'omuretsu',
          meaning: 'omelette',
        },
      ],
    },
  },
  k: {
    カ: {
      words: [
        { word: 'カメラ', romaji: 'kamera', meaning: 'cámara' },
        { word: 'カフェ', romaji: 'kafe', meaning: 'café (cafetería)' },
        { word: 'スカート', romaji: 'sukaato', meaning: 'falda' },
      ],
    },
    キ: {
      words: [
        { word: 'ケーキ', romaji: 'keeki', meaning: 'pastel' },
        { word: 'キッチン', romaji: 'kicchin', meaning: 'cocina' },
        { word: 'キリン', romaji: 'kirin', meaning: 'jirafa' },
      ],
    },
    ク: {
      words: [
        { word: 'クラス', romaji: 'kurasu', meaning: 'clase' },
        { word: 'クッキー', romaji: 'kukkii', meaning: 'galleta' },
        { word: 'トラック', romaji: 'torakku', meaning: 'camión' },
      ],
    },
    ケ: {
      words: [
        { word: 'ケーキ', romaji: 'keeki', meaning: 'pastel' },
        { word: 'ケチャップ', romaji: 'kechappu', meaning: 'kétchup' },
        {
          word: 'バスケット',
          romaji: 'basuketto',
          meaning: 'cesta',
        },
      ],
    },
    コ: {
      words: [
        { word: 'コーヒー', romaji: 'koohii', meaning: 'café' },
        { word: 'コップ', romaji: 'koppu', meaning: 'vaso' },
        { word: 'チョコレート', romaji: 'chokoreeto', meaning: 'chocolate' },
      ],
    },
  },
  s: {
    サ: {
      words: [
        { word: 'サラダ', romaji: 'sarada', meaning: 'ensalada' },
        { word: 'サッカー', romaji: 'sakkaa', meaning: 'fútbol' },
        { word: 'サンドイッチ', romaji: 'sandoicchi', meaning: 'sándwich' },
      ],
    },
    シ: {
      words: [
        { word: 'タクシー', romaji: 'takushii', meaning: 'taxi' },
        { word: 'シチュー', romaji: 'shichuu', meaning: 'guiso' },
        { word: 'シーツ', romaji: 'shiitsu', meaning: 'sábana' },
      ],
    },
    ス: {
      words: [
        { word: 'バス', romaji: 'basu', meaning: 'autobús' },
        { word: 'スープ', romaji: 'suupu', meaning: 'sopa' },
        { word: 'スカート', romaji: 'sukaato', meaning: 'falda' },
      ],
    },
    セ: {
      words: [
        { word: 'セーター', romaji: 'seetaa', meaning: 'suéter' },
        { word: 'セール', romaji: 'seeru', meaning: 'rebajas' },
        { word: 'アクセサリー', romaji: 'akusesarii', meaning: 'accesorio' },
      ],
    },
    ソ: {
      words: [
        { word: 'ソース', romaji: 'soosu', meaning: 'salsa' },
        { word: 'ソファ', romaji: 'sofa', meaning: 'sofá' },
        { word: 'ソックス', romaji: 'sokkusu', meaning: 'calcetines' },
      ],
    },
  },
  t: {
    タ: {
      words: [
        { word: 'タオル', romaji: 'taoru', meaning: 'toalla' },
        { word: 'タクシー', romaji: 'takushii', meaning: 'taxi' },
        { word: 'ギター', romaji: 'gitaa', meaning: 'guitarra' },
      ],
    },
    チ: {
      words: [
        { word: 'チーズ', romaji: 'chiizu', meaning: 'queso' },
        { word: 'キッチン', romaji: 'kicchin', meaning: 'cocina' },
        { word: 'マッチ', romaji: 'macchi', meaning: 'cerilla' },
      ],
    },
    ツ: {
      words: [
        {
          word: 'ツアー',
          romaji: 'tsuaa',
          meaning: 'excursión',
        },
        {
          word: 'ツイン',
          romaji: 'tsuin',
          meaning: 'habitación doble con dos camas',
        },
        { word: 'シーツ', romaji: 'shiitsu', meaning: 'sábana' },
      ],
    },
    テ: {
      words: [
        { word: 'テレビ', romaji: 'terebi', meaning: 'televisión' },
        { word: 'テーブル', romaji: 'teeburu', meaning: 'mesa' },
        { word: 'ホテル', romaji: 'hoteru', meaning: 'hotel' },
      ],
    },
    ト: {
      words: [
        { word: 'トマト', romaji: 'tomato', meaning: 'tomate' },
        { word: 'トラック', romaji: 'torakku', meaning: 'camión' },
        { word: 'ノート', romaji: 'nooto', meaning: 'cuaderno' },
      ],
    },
  },
  n: {
    ナ: {
      words: [
        { word: 'バナナ', romaji: 'banana', meaning: 'plátano' },
        { word: 'カナダ', romaji: 'kanada', meaning: 'Canadá' },
        { word: 'サウナ', romaji: 'sauna', meaning: 'sauna' },
      ],
    },
    ニ: {
      words: [
        { word: 'テニス', romaji: 'tenisu', meaning: 'tenis' },
        {
          word: 'コンビニ',
          romaji: 'konbini',
          meaning: 'tienda de conveniencia',
        },
        { word: 'マニキュア', romaji: 'manikyua', meaning: 'manicura' },
      ],
    },
    ヌ: {
      words: [
        { word: 'カヌー', romaji: 'kanuu', meaning: 'canoa' },
        { word: 'ヌードル', romaji: 'nuudoru', meaning: 'fideos' },
      ],
    },
    ネ: {
      words: [
        { word: 'インターネット', romaji: 'intaanetto', meaning: 'internet' },
        { word: 'ネクタイ', romaji: 'nekutai', meaning: 'corbata' },
        { word: 'ネオン', romaji: 'neon', meaning: 'neón' },
      ],
    },
    ノ: {
      words: [
        { word: 'ピアノ', romaji: 'piano', meaning: 'piano' },
        { word: 'ノート', romaji: 'nooto', meaning: 'cuaderno' },
        { word: 'カジノ', romaji: 'kajino', meaning: 'casino' },
      ],
    },
  },
  h: {
    ハ: {
      words: [
        { word: 'ハンバーガー', romaji: 'hanbaagaa', meaning: 'hamburguesa' },
        { word: 'ハンカチ', romaji: 'hankachi', meaning: 'pañuelo' },
        { word: 'ハート', romaji: 'haato', meaning: 'corazón (símbolo)' },
      ],
    },
    ヒ: {
      words: [
        { word: 'コーヒー', romaji: 'koohii', meaning: 'café' },
        { word: 'ヒーター', romaji: 'hiitaa', meaning: 'calefactor' },
        { word: 'ヒーロー', romaji: 'hiiroo', meaning: 'héroe' },
      ],
    },
    フ: {
      words: [
        { word: 'スカーフ', romaji: 'sukaafu', meaning: 'bufanda' },
        { word: 'フルーツ', romaji: 'furuutsu', meaning: 'fruta' },
        { word: 'フライパン', romaji: 'furaipan', meaning: 'sartén' },
      ],
    },
    ヘ: {
      words: [
        { word: 'ヘリコプター', romaji: 'herikoputaa', meaning: 'helicóptero' },
        { word: 'ヘルメット', romaji: 'herumetto', meaning: 'casco' },
        { word: 'ヘアスタイル', romaji: 'heasutairu', meaning: 'peinado' },
      ],
    },
    ホ: {
      words: [
        { word: 'ホテル', romaji: 'hoteru', meaning: 'hotel' },
        { word: 'ホラー', romaji: 'horaa', meaning: 'terror (género)' },
        { word: 'ホームページ', romaji: 'hoomupeeji', meaning: 'página web' },
      ],
    },
  },
  m: {
    マ: {
      words: [
        { word: 'マスク', romaji: 'masuku', meaning: 'mascarilla' },
        { word: 'マラソン', romaji: 'marason', meaning: 'maratón' },
        { word: 'トマト', romaji: 'tomato', meaning: 'tomate' },
      ],
    },
    ミ: {
      words: [
        { word: 'ミルク', romaji: 'miruku', meaning: 'leche' },
        { word: 'ミント', romaji: 'minto', meaning: 'menta' },
        { word: 'アルミ', romaji: 'arumi', meaning: 'aluminio' },
      ],
    },
    ム: {
      words: [
        { word: 'アルバム', romaji: 'arubamu', meaning: 'álbum' },
        { word: 'ガム', romaji: 'gamu', meaning: 'chicle' },
        { word: 'ホームページ', romaji: 'hoomupeeji', meaning: 'página web' },
      ],
    },
    メ: {
      words: [
        { word: 'メール', romaji: 'meeru', meaning: 'correo electrónico' },
        { word: 'メニュー', romaji: 'menyuu', meaning: 'menú' },
        { word: 'メイク', romaji: 'meiku', meaning: 'maquillaje' },
      ],
    },
    モ: {
      words: [
        { word: 'メモ', romaji: 'memo', meaning: 'nota' },
        { word: 'レモン', romaji: 'remon', meaning: 'limón' },
        { word: 'モデル', romaji: 'moderu', meaning: 'modelo' },
      ],
    },
  },
  y: {
    ヤ: {
      words: [
        { word: 'タイヤ', romaji: 'taiya', meaning: 'neumático' },
        { word: 'パパイヤ', romaji: 'papaiya', meaning: 'papaya' },
      ],
    },
    ユ: {
      words: [
        { word: 'ユニフォーム', romaji: 'yunifoomu', meaning: 'uniforme' },
        { word: 'ユーモア', romaji: 'yuumoa', meaning: 'humor' },
        { word: 'ユーロ', romaji: 'yuuro', meaning: 'euro (moneda)' },
      ],
    },
    ヨ: {
      words: [
        { word: 'ヨーグルト', romaji: 'yooguruto', meaning: 'yogur' },
        { word: 'ヨガ', romaji: 'yoga', meaning: 'yoga' },
        { word: 'ヨット', romaji: 'yotto', meaning: 'yate' },
      ],
    },
  },
  r: {
    ラ: {
      words: [
        { word: 'ラジオ', romaji: 'rajio', meaning: 'radio' },
        { word: 'サラダ', romaji: 'sarada', meaning: 'ensalada' },
        { word: 'トラック', romaji: 'torakku', meaning: 'camión' },
      ],
    },
    リ: {
      words: [
        { word: 'アメリカ', romaji: 'amerika', meaning: 'América' },
        { word: 'イタリア', romaji: 'itaria', meaning: 'Italia' },
        { word: 'リボン', romaji: 'ribon', meaning: 'lazo' },
      ],
    },
    ル: {
      words: [
        { word: 'テーブル', romaji: 'teeburu', meaning: 'mesa' },
        { word: 'ホテル', romaji: 'hoteru', meaning: 'hotel' },
        { word: 'タオル', romaji: 'taoru', meaning: 'toalla' },
      ],
    },
    レ: {
      words: [
        { word: 'テレビ', romaji: 'terebi', meaning: 'televisión' },
        { word: 'カレー', romaji: 'karee', meaning: 'curri' },
        { word: 'チョコレート', romaji: 'chokoreeto', meaning: 'chocolate' },
      ],
    },
    ロ: {
      words: [
        { word: 'ロボット', romaji: 'robotto', meaning: 'robot' },
        { word: 'ヒーロー', romaji: 'hiiroo', meaning: 'héroe' },
        { word: 'クロワッサン', romaji: 'kurowassan', meaning: 'cruasán' },
      ],
    },
  },
  w: {
    ワ: {
      words: [
        { word: 'ワイン', romaji: 'wain', meaning: 'vino' },
        {
          word: 'ワンピース',
          romaji: 'wanpiisu',
          meaning: 'vestido (de una pieza)',
        },
        { word: 'ハワイ', romaji: 'hawai', meaning: 'Hawái' },
      ],
    },
    ヲ: {
      words: [],
      emptyReason:
        'No hay préstamos comunes de uso general con ヲ; su uso normal corresponde a la partícula を.',
    },
    ン: {
      words: [
        { word: 'パン', romaji: 'pan', meaning: 'pan' },
        { word: 'ペン', romaji: 'pen', meaning: 'bolígrafo' },
        { word: 'レストラン', romaji: 'resutoran', meaning: 'restaurante' },
      ],
    },
  },
  g: {
    ガ: {
      words: [
        { word: 'ガム', romaji: 'gamu', meaning: 'chicle' },
        { word: 'ガラス', romaji: 'garasu', meaning: 'vidrio' },
        { word: 'マンガ', romaji: 'manga', meaning: 'manga (cómic)' },
      ],
    },
    ギ: {
      words: [
        { word: 'ギター', romaji: 'gitaa', meaning: 'guitarra' },
        { word: 'ギフト', romaji: 'gifuto', meaning: 'regalo' },
        { word: 'エネルギー', romaji: 'enerugii', meaning: 'energía' },
      ],
    },
    グ: {
      words: [
        { word: 'グラス', romaji: 'gurasu', meaning: 'copa' },
        { word: 'グループ', romaji: 'guruupu', meaning: 'grupo' },
        {
          word: 'ハンバーグ',
          romaji: 'hanbaagu',
          meaning: 'hamburguesa (filete)',
        },
      ],
    },
    ゲ: {
      words: [
        { word: 'ゲーム', romaji: 'geemu', meaning: 'juego' },
        { word: 'ゲスト', romaji: 'gesuto', meaning: 'invitado' },
        {
          word: 'ゲームセンター',
          romaji: 'geemusentaa',
          meaning: 'sala de videojuegos',
        },
      ],
    },
    ゴ: {
      words: [
        { word: 'ゴール', romaji: 'gooru', meaning: 'meta' },
        { word: 'ゴム', romaji: 'gomu', meaning: 'goma' },
        { word: 'タンゴ', romaji: 'tango', meaning: 'tango (baile)' },
      ],
    },
  },
  z: {
    ザ: {
      words: [
        { word: 'ピザ', romaji: 'piza', meaning: 'pizza' },
        { word: 'ビザ', romaji: 'biza', meaning: 'visado' },
        { word: 'デザート', romaji: 'dezaato', meaning: 'postre' },
      ],
    },
    ジ: {
      words: [
        { word: 'レジ', romaji: 'reji', meaning: 'caja registradora' },
        { word: 'ジーンズ', romaji: 'jiinzu', meaning: 'vaqueros' },
        { word: 'マッサージ', romaji: 'massaaji', meaning: 'masaje' },
      ],
    },
    ズ: {
      words: [
        { word: 'チーズ', romaji: 'chiizu', meaning: 'queso' },
        { word: 'サイズ', romaji: 'saizu', meaning: 'talla' },
        { word: 'ズボン', romaji: 'zubon', meaning: 'pantalón' },
      ],
    },
    ゼ: {
      words: [
        { word: 'ゼロ', romaji: 'zero', meaning: 'cero' },
        { word: 'ゼリー', romaji: 'zerii', meaning: 'gelatina' },
        { word: 'ゼミ', romaji: 'zemi', meaning: 'seminario (universidad)' },
      ],
    },
    ゾ: {
      words: [
        { word: 'リゾート', romaji: 'rizooto', meaning: 'complejo turístico' },
        { word: 'ゾンビ', romaji: 'zonbi', meaning: 'zombi' },
        { word: 'ゾウ', romaji: 'zou', meaning: 'elefante' },
      ],
    },
  },
  d: {
    ダ: {
      words: [
        { word: 'パンダ', romaji: 'panda', meaning: 'panda' },
        { word: 'サラダ', romaji: 'sarada', meaning: 'ensalada' },
        { word: 'カナダ', romaji: 'kanada', meaning: 'Canadá' },
      ],
    },
    ヂ: {
      words: [],
      emptyReason:
        'No hay préstamos comunes de uso general con ヂ; normalmente se emplea ジ.',
    },
    ヅ: {
      words: [],
      emptyReason:
        'No hay préstamos comunes de uso general con ヅ; normalmente se emplea ズ.',
    },
    デ: {
      words: [
        { word: 'デザート', romaji: 'dezaato', meaning: 'postre' },
        { word: 'デート', romaji: 'deeto', meaning: 'cita romántica' },
        { word: 'アイデア', romaji: 'aidea', meaning: 'idea' },
      ],
    },
    ド: {
      words: [
        { word: 'ドア', romaji: 'doa', meaning: 'puerta' },
        { word: 'ドライブ', romaji: 'doraibu', meaning: 'paseo en coche' },
        {
          word: 'ハンドバッグ',
          romaji: 'handobaggu',
          meaning: 'bolso de mano',
        },
      ],
    },
  },
  b: {
    バ: {
      words: [
        { word: 'バス', romaji: 'basu', meaning: 'autobús' },
        { word: 'バナナ', romaji: 'banana', meaning: 'plátano' },
        { word: 'バッグ', romaji: 'baggu', meaning: 'bolso' },
      ],
    },
    ビ: {
      words: [
        { word: 'テレビ', romaji: 'terebi', meaning: 'televisión' },
        { word: 'ビール', romaji: 'biiru', meaning: 'cerveza' },
        {
          word: 'コンビニ',
          romaji: 'konbini',
          meaning: 'tienda de conveniencia',
        },
      ],
    },
    ブ: {
      words: [
        { word: 'ブラウス', romaji: 'burausu', meaning: 'blusa' },
        { word: 'ブーツ', romaji: 'buutsu', meaning: 'botas' },
        { word: 'テーブル', romaji: 'teeburu', meaning: 'mesa' },
      ],
    },
    ベ: {
      words: [
        { word: 'ベッド', romaji: 'beddo', meaning: 'cama' },
        { word: 'ベルト', romaji: 'beruto', meaning: 'cinturón' },
        { word: 'ベランダ', romaji: 'beranda', meaning: 'balcón' },
      ],
    },
    ボ: {
      words: [
        { word: 'ボール', romaji: 'booru', meaning: 'pelota' },
        { word: 'ボタン', romaji: 'botan', meaning: 'botón' },
        { word: 'ロボット', romaji: 'robotto', meaning: 'robot' },
      ],
    },
  },
  p: {
    パ: {
      words: [
        { word: 'パン', romaji: 'pan', meaning: 'pan' },
        { word: 'パンダ', romaji: 'panda', meaning: 'panda' },
        { word: 'パーティー', romaji: 'paatii', meaning: 'fiesta' },
      ],
    },
    ピ: {
      words: [
        { word: 'ピアノ', romaji: 'piano', meaning: 'piano' },
        { word: 'ピザ', romaji: 'piza', meaning: 'pizza' },
        { word: 'コピー', romaji: 'kopii', meaning: 'copia' },
      ],
    },
    プ: {
      words: [
        { word: 'プール', romaji: 'puuru', meaning: 'piscina' },
        { word: 'コップ', romaji: 'koppu', meaning: 'vaso' },
        { word: 'プレゼント', romaji: 'purezento', meaning: 'regalo' },
      ],
    },
    ペ: {
      words: [
        { word: 'ページ', romaji: 'peeji', meaning: 'página' },
        { word: 'ペン', romaji: 'pen', meaning: 'bolígrafo' },
        { word: 'ペット', romaji: 'petto', meaning: 'mascota' },
      ],
    },
    ポ: {
      words: [
        {
          word: 'ポテト',
          romaji: 'poteto',
          meaning: 'patata',
        },
        { word: 'スポーツ', romaji: 'supootsu', meaning: 'deporte' },
        { word: 'ポケット', romaji: 'poketto', meaning: 'bolsillo' },
      ],
    },
  },
  kya: {
    キャ: {
      words: [
        { word: 'キャンプ', romaji: 'kyanpu', meaning: 'campamento' },
        { word: 'キャベツ', romaji: 'kyabetsu', meaning: 'repollo' },
        { word: 'キャンディー', romaji: 'kyandii', meaning: 'caramelo' },
      ],
    },
    キュ: {
      words: [
        { word: 'バーベキュー', romaji: 'baabekyuu', meaning: 'barbacoa' },
        { word: 'マニキュア', romaji: 'manikyua', meaning: 'manicura' },
        { word: 'キュウリ', romaji: 'kyuuri', meaning: 'pepino' },
      ],
    },
    キョ: {
      words: [
        {
          word: 'キョロキョロ',
          romaji: 'kyorokyoro',
          meaning: 'mirar alrededor inquietamente',
        },
      ],
    },
  },
  sha: {
    シャ: {
      words: [
        { word: 'シャワー', romaji: 'shawaa', meaning: 'ducha' },
        { word: 'シャツ', romaji: 'shatsu', meaning: 'camisa' },
        { word: 'シャンプー', romaji: 'shanpuu', meaning: 'champú' },
      ],
    },
    シュ: {
      words: [
        {
          word: 'シュークリーム',
          romaji: 'shuukuriimu',
          meaning: 'petisú (repostería)',
        },
        { word: 'シューズ', romaji: 'shuuzu', meaning: 'zapatillas' },
        {
          word: 'ラッシュ',
          romaji: 'rasshu',
          meaning: 'hora punta',
        },
      ],
    },
    ショ: {
      words: [
        { word: 'ショッピング', romaji: 'shoppingu', meaning: 'ir de compras' },
        { word: 'ショー', romaji: 'shoo', meaning: 'espectáculo' },
        { word: 'ショート', romaji: 'shooto', meaning: 'corto' },
      ],
    },
  },
  cha: {
    チャ: {
      words: [
        { word: 'チャンス', romaji: 'chansu', meaning: 'oportunidad' },
        { word: 'チャンピオン', romaji: 'chanpion', meaning: 'campeón' },
        { word: 'チャイム', romaji: 'chaimu', meaning: 'timbre' },
      ],
    },
    チュ: {
      words: [
        { word: 'チューリップ', romaji: 'chuurippu', meaning: 'tulipán' },
        { word: 'チューインガム', romaji: 'chuuingamu', meaning: 'chicle' },
      ],
    },
    チョ: {
      words: [
        { word: 'チョコレート', romaji: 'chokoreeto', meaning: 'chocolate' },
        { word: 'チョーク', romaji: 'chooku', meaning: 'tiza' },
        { word: 'チョッキ', romaji: 'chokki', meaning: 'chaleco' },
      ],
    },
  },
  nya: {
    ニャ: {
      words: [
        { word: 'ニャー', romaji: 'nyaa', meaning: 'miau (onomatopeya)' },
      ],
    },
    ニュ: {
      words: [
        { word: 'ニュース', romaji: 'nyuusu', meaning: 'noticias' },
        {
          word: 'ニュートン',
          romaji: 'nyuuton',
          meaning: 'newton (unidad de fuerza)',
        },
      ],
    },
    ニョ: {
      words: [
        {
          word: 'ニョキニョキ',
          romaji: 'nyokinyoki',
          meaning: 'brotar o aparecer uno tras otro',
        },
      ],
    },
  },
  hya: {
    ヒャ: {
      words: [],
      emptyReason:
        'No hay préstamos comunes de uso general con ヒャ; aparece principalmente en interjecciones expresivas.',
    },
    ヒュ: {
      words: [
        { word: 'ヒューズ', romaji: 'hyuuzu', meaning: 'fusible' },
        { word: 'ヒューマン', romaji: 'hyuuman', meaning: 'humano (adjetivo)' },
      ],
    },
    ヒョ: {
      words: [{ word: 'ヒョウ', romaji: 'hyou', meaning: 'leopardo' }],
    },
  },
  mya: {
    ミャ: {
      words: [{ word: 'ミャンマー', romaji: 'myanmaa', meaning: 'Myanmar' }],
    },
    ミュ: {
      words: [
        { word: 'ミュージック', romaji: 'myuujikku', meaning: 'música' },
        {
          word: 'ミュージカル',
          romaji: 'myuujikaru',
          meaning: 'musical (teatro)',
        },
        {
          word: 'コミュニケーション',
          romaji: 'komyunikeeshon',
          meaning: 'comunicación',
        },
      ],
    },
    ミョ: {
      words: [
        {
          word: 'ミョウガ',
          romaji: 'myouga',
          meaning: 'mioga',
        },
      ],
    },
  },
  rya: {
    リャ: {
      words: [{ word: 'リャマ', romaji: 'ryama', meaning: 'llama' }],
    },
    リュ: {
      words: [{ word: 'リュック', romaji: 'ryukku', meaning: 'mochila' }],
    },
    リョ: {
      words: [],
      emptyReason: 'No hay préstamos comunes de uso general con リョ.',
    },
  },
  gya: {
    ギャ: {
      words: [
        { word: 'ギャグ', romaji: 'gyagu', meaning: 'chiste' },
        { word: 'ギャラリー', romaji: 'gyararii', meaning: 'galería' },
      ],
    },
    ギュ: {
      words: [
        {
          word: 'レギュラー',
          romaji: 'regyuraa',
          meaning: 'regular',
        },
      ],
    },
    ギョ: {
      words: [
        {
          word: 'ギョウザ',
          romaji: 'gyouza',
          meaning: 'gyoza',
        },
      ],
    },
  },
  ja: {
    ジャ: {
      words: [
        { word: 'ジャム', romaji: 'jamu', meaning: 'mermelada' },
        { word: 'ジャケット', romaji: 'jaketto', meaning: 'chaqueta' },
        { word: 'ジャズ', romaji: 'jazu', meaning: 'jazz' },
      ],
    },
    ジュ: {
      words: [
        { word: 'ジュース', romaji: 'juusu', meaning: 'zumo' },
        { word: 'ジュエリー', romaji: 'juerii', meaning: 'joyería' },
      ],
    },
    ジョ: {
      words: [
        {
          word: 'ジョギング',
          romaji: 'jogingu',
          meaning: 'carrera suave',
        },
        { word: 'ジョーク', romaji: 'jooku', meaning: 'broma' },
      ],
    },
  },
  bya: {
    ビャ: {
      words: [],
      emptyReason: 'No hay préstamos comunes de uso general con ビャ.',
    },
    ビュ: {
      words: [
        { word: 'インタビュー', romaji: 'intabyuu', meaning: 'entrevista' },
        { word: 'レビュー', romaji: 'rebyuu', meaning: 'reseña' },
      ],
    },
    ビョ: {
      words: [],
      emptyReason: 'No hay préstamos comunes de uso general con ビョ.',
    },
  },
  pya: {
    ピャ: {
      words: [],
      emptyReason: 'No hay préstamos comunes de uso general con ピャ.',
    },
    ピュ: {
      words: [
        { word: 'コンピューター', romaji: 'konpyuutaa', meaning: 'ordenador' },
        { word: 'ピュア', romaji: 'pyua', meaning: 'puro' },
      ],
    },
    ピョ: {
      words: [
        {
          word: 'ピョンピョン',
          romaji: 'pyonpyon',
          meaning: 'saltar repetidamente',
        },
      ],
    },
  },
})
