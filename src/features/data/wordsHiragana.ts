import { defineWordGroups } from './wordGroups'

export const wordsHiragana = defineWordGroups({
  vocales: {
    あ: {
      words: [
        { word: 'あめ', romaji: 'ame', meaning: 'lluvia' },
        { word: 'あか', romaji: 'aka', meaning: 'rojo' },
        { word: 'あさ', romaji: 'asa', meaning: 'mañana' },
      ],
    },
    い: {
      words: [
        { word: 'いえ', romaji: 'ie', meaning: 'casa' },
        { word: 'いぬ', romaji: 'inu', meaning: 'perro' },
        { word: 'いろ', romaji: 'iro', meaning: 'color' },
      ],
    },
    う: {
      words: [
        { word: 'うみ', romaji: 'umi', meaning: 'mar' },
        { word: 'うた', romaji: 'uta', meaning: 'canción' },
        { word: 'うで', romaji: 'ude', meaning: 'brazo' },
      ],
    },
    え: {
      words: [
        { word: 'えき', romaji: 'eki', meaning: 'estación' },
        { word: 'えん', romaji: 'en', meaning: 'yen (moneda)' },
        { word: 'えほん', romaji: 'ehon', meaning: 'libro ilustrado' },
      ],
    },
    お: {
      words: [
        { word: 'おと', romaji: 'oto', meaning: 'sonido' },
        { word: 'おちゃ', romaji: 'ocha', meaning: 'té' },
        { word: 'おかね', romaji: 'okane', meaning: 'dinero' },
      ],
    },
  },
  k: {
    か: {
      words: [
        { word: 'かさ', romaji: 'kasa', meaning: 'paraguas' },
        { word: 'かお', romaji: 'kao', meaning: 'cara' },
        { word: 'かみ', romaji: 'kami', meaning: 'papel' },
      ],
    },
    き: {
      words: [
        { word: 'きた', romaji: 'kita', meaning: 'norte' },
        { word: 'きいろ', romaji: 'kiiro', meaning: 'amarillo' },
        { word: 'きもの', romaji: 'kimono', meaning: 'kimono' },
      ],
    },
    く: {
      words: [
        { word: 'くも', romaji: 'kumo', meaning: 'nube' },
        { word: 'くつ', romaji: 'kutsu', meaning: 'zapato' },
        { word: 'くるま', romaji: 'kuruma', meaning: 'coche' },
      ],
    },
    け: {
      words: [
        { word: 'けさ', romaji: 'kesa', meaning: 'esta mañana' },
        { word: 'けむり', romaji: 'kemuri', meaning: 'humo' },
        { word: 'けが', romaji: 'kega', meaning: 'herida' },
      ],
    },
    こ: {
      words: [
        { word: 'こえ', romaji: 'koe', meaning: 'voz' },
        { word: 'こども', romaji: 'kodomo', meaning: 'niño' },
        { word: 'こおり', romaji: 'koori', meaning: 'hielo' },
      ],
    },
  },
  s: {
    さ: {
      words: [
        { word: 'さかな', romaji: 'sakana', meaning: 'pez' },
        { word: 'さくら', romaji: 'sakura', meaning: 'cerezo' },
        { word: 'さる', romaji: 'saru', meaning: 'mono' },
      ],
    },
    し: {
      words: [
        { word: 'しお', romaji: 'shio', meaning: 'sal' },
        { word: 'しろ', romaji: 'shiro', meaning: 'blanco' },
        { word: 'しま', romaji: 'shima', meaning: 'isla' },
      ],
    },
    す: {
      words: [
        { word: 'すし', romaji: 'sushi', meaning: 'sushi' },
        { word: 'すいか', romaji: 'suika', meaning: 'sandía' },
        { word: 'すな', romaji: 'suna', meaning: 'arena' },
      ],
    },
    せ: {
      words: [
        { word: 'せかい', romaji: 'sekai', meaning: 'mundo' },
        { word: 'せなか', romaji: 'senaka', meaning: 'espalda' },
        { word: 'せんせい', romaji: 'sensei', meaning: 'profesor' },
      ],
    },
    そ: {
      words: [
        { word: 'そら', romaji: 'sora', meaning: 'cielo' },
        { word: 'そと', romaji: 'soto', meaning: 'fuera' },
        { word: 'そば', romaji: 'soba', meaning: 'fideos soba' },
      ],
    },
  },
  t: {
    た: {
      words: [
        { word: 'たまご', romaji: 'tamago', meaning: 'huevo' },
        { word: 'たいよう', romaji: 'taiyou', meaning: 'sol' },
        { word: 'たこ', romaji: 'tako', meaning: 'pulpo' },
      ],
    },
    ち: {
      words: [
        { word: 'ちず', romaji: 'chizu', meaning: 'mapa' },
        { word: 'ちいさい', romaji: 'chiisai', meaning: 'pequeño' },
        { word: 'ちから', romaji: 'chikara', meaning: 'fuerza' },
      ],
    },
    つ: {
      words: [
        { word: 'つき', romaji: 'tsuki', meaning: 'luna' },
        { word: 'つくえ', romaji: 'tsukue', meaning: 'escritorio' },
        { word: 'つめ', romaji: 'tsume', meaning: 'uña' },
      ],
    },
    て: {
      words: [
        { word: 'てがみ', romaji: 'tegami', meaning: 'carta' },
        {
          word: 'てんき',
          romaji: 'tenki',
          meaning: 'tiempo',
        },
        { word: 'てぶくろ', romaji: 'tebukuro', meaning: 'guante' },
      ],
    },
    と: {
      words: [
        { word: 'とり', romaji: 'tori', meaning: 'pájaro' },
        { word: 'ともだち', romaji: 'tomodachi', meaning: 'amigo' },
        { word: 'とけい', romaji: 'tokei', meaning: 'reloj' },
      ],
    },
  },
  n: {
    な: {
      words: [
        { word: 'なつ', romaji: 'natsu', meaning: 'verano' },
        { word: 'なまえ', romaji: 'namae', meaning: 'nombre' },
        { word: 'なみ', romaji: 'nami', meaning: 'ola' },
      ],
    },
    に: {
      words: [
        { word: 'にく', romaji: 'niku', meaning: 'carne' },
        { word: 'にわ', romaji: 'niwa', meaning: 'jardín' },
        { word: 'にじ', romaji: 'niji', meaning: 'arcoíris' },
      ],
    },
    ぬ: {
      words: [
        { word: 'ぬの', romaji: 'nuno', meaning: 'tela' },
        { word: 'いぬ', romaji: 'inu', meaning: 'perro' },
        { word: 'ぬま', romaji: 'numa', meaning: 'pantano' },
      ],
    },
    ね: {
      words: [
        { word: 'ねこ', romaji: 'neko', meaning: 'gato' },
        { word: 'ねつ', romaji: 'netsu', meaning: 'fiebre' },
        { word: 'ねる', romaji: 'neru', meaning: 'dormir' },
      ],
    },
    の: {
      words: [
        { word: 'のみもの', romaji: 'nomimono', meaning: 'bebida' },
        { word: 'のり', romaji: 'nori', meaning: 'alga nori' },
        { word: 'きのう', romaji: 'kinou', meaning: 'ayer' },
      ],
    },
  },
  h: {
    は: {
      words: [
        { word: 'はな', romaji: 'hana', meaning: 'flor' },
        { word: 'はし', romaji: 'hashi', meaning: 'puente' },
        { word: 'はる', romaji: 'haru', meaning: 'primavera' },
      ],
    },
    ひ: {
      words: [
        { word: 'ひと', romaji: 'hito', meaning: 'persona' },
        { word: 'ひかり', romaji: 'hikari', meaning: 'luz' },
        { word: 'ひる', romaji: 'hiru', meaning: 'mediodía' },
      ],
    },
    ふ: {
      words: [
        { word: 'ふゆ', romaji: 'fuyu', meaning: 'invierno' },
        { word: 'ふね', romaji: 'fune', meaning: 'barco' },
        { word: 'ふうせん', romaji: 'fuusen', meaning: 'globo' },
      ],
    },
    へ: {
      words: [
        { word: 'へや', romaji: 'heya', meaning: 'habitación' },
        { word: 'へび', romaji: 'hebi', meaning: 'serpiente' },
        { word: 'へそ', romaji: 'heso', meaning: 'ombligo' },
      ],
    },
    ほ: {
      words: [
        { word: 'ほし', romaji: 'hoshi', meaning: 'estrella' },
        { word: 'ほん', romaji: 'hon', meaning: 'libro' },
        { word: 'ほお', romaji: 'hoo', meaning: 'mejilla' },
      ],
    },
  },
  m: {
    ま: {
      words: [
        { word: 'まど', romaji: 'mado', meaning: 'ventana' },
        { word: 'まち', romaji: 'machi', meaning: 'ciudad' },
        { word: 'まめ', romaji: 'mame', meaning: 'judía' },
      ],
    },
    み: {
      words: [
        { word: 'みず', romaji: 'mizu', meaning: 'agua' },
        { word: 'みみ', romaji: 'mimi', meaning: 'oreja' },
        { word: 'みち', romaji: 'michi', meaning: 'camino' },
      ],
    },
    む: {
      words: [
        { word: 'むし', romaji: 'mushi', meaning: 'insecto' },
        { word: 'むら', romaji: 'mura', meaning: 'aldea' },
        { word: 'むすこ', romaji: 'musuko', meaning: 'hijo' },
      ],
    },
    め: {
      words: [
        { word: 'めがね', romaji: 'megane', meaning: 'gafas' },
        { word: 'さめ', romaji: 'same', meaning: 'tiburón' },
        { word: 'うめ', romaji: 'ume', meaning: 'ciruela japonesa' },
      ],
    },
    も: {
      words: [
        { word: 'もり', romaji: 'mori', meaning: 'bosque' },
        { word: 'もも', romaji: 'momo', meaning: 'melocotón' },
        { word: 'もん', romaji: 'mon', meaning: 'portón' },
      ],
    },
  },
  y: {
    や: {
      words: [
        { word: 'やま', romaji: 'yama', meaning: 'montaña' },
        { word: 'やさい', romaji: 'yasai', meaning: 'verdura' },
        { word: 'やね', romaji: 'yane', meaning: 'techo' },
      ],
    },
    ゆ: {
      words: [
        { word: 'ゆき', romaji: 'yuki', meaning: 'nieve' },
        { word: 'ゆび', romaji: 'yubi', meaning: 'dedo' },
        { word: 'ゆめ', romaji: 'yume', meaning: 'sueño' },
      ],
    },
    よ: {
      words: [
        { word: 'よる', romaji: 'yoru', meaning: 'noche' },
        { word: 'よこ', romaji: 'yoko', meaning: 'lado' },
        { word: 'よん', romaji: 'yon', meaning: 'cuatro' },
      ],
    },
  },
  r: {
    ら: {
      words: [
        { word: 'さくら', romaji: 'sakura', meaning: 'cerezo' },
        { word: 'そら', romaji: 'sora', meaning: 'cielo' },
        { word: 'からい', romaji: 'karai', meaning: 'picante' },
      ],
    },
    り: {
      words: [
        { word: 'りんご', romaji: 'ringo', meaning: 'manzana' },
        { word: 'とり', romaji: 'tori', meaning: 'pájaro' },
        { word: 'くり', romaji: 'kuri', meaning: 'castaña' },
      ],
    },
    る: {
      words: [
        { word: 'くるま', romaji: 'kuruma', meaning: 'coche' },
        { word: 'さる', romaji: 'saru', meaning: 'mono' },
        { word: 'つる', romaji: 'tsuru', meaning: 'grulla' },
      ],
    },
    れ: {
      words: [
        { word: 'これ', romaji: 'kore', meaning: 'esto' },
        { word: 'それ', romaji: 'sore', meaning: 'eso' },
        { word: 'だれ', romaji: 'dare', meaning: 'quién' },
      ],
    },
    ろ: {
      words: [
        { word: 'しろ', romaji: 'shiro', meaning: 'blanco' },
        { word: 'くろ', romaji: 'kuro', meaning: 'negro' },
        { word: 'ろうそく', romaji: 'rousoku', meaning: 'vela' },
      ],
    },
  },
  w: {
    わ: {
      words: [
        { word: 'わたし', romaji: 'watashi', meaning: 'yo' },
        { word: 'わに', romaji: 'wani', meaning: 'cocodrilo' },
        { word: 'かわ', romaji: 'kawa', meaning: 'río' },
      ],
    },
    を: {
      words: [],
      emptyReason:
        'No hay palabras comunes que utilicen を dentro de una palabra; su uso moderno es casi exclusivamente como partícula.',
    },
    ん: {
      words: [
        { word: 'ほん', romaji: 'hon', meaning: 'libro' },
        { word: 'さん', romaji: 'san', meaning: 'señor' },
        { word: 'てん', romaji: 'ten', meaning: 'punto' },
      ],
    },
  },
  g: {
    が: {
      words: [
        { word: 'がっこう', romaji: 'gakkou', meaning: 'escuela' },
        { word: 'めがね', romaji: 'megane', meaning: 'gafas' },
        { word: 'かがみ', romaji: 'kagami', meaning: 'espejo' },
      ],
    },
    ぎ: {
      words: [
        { word: 'ぎんこう', romaji: 'ginkou', meaning: 'banco' },
        { word: 'かぎ', romaji: 'kagi', meaning: 'llave' },
        { word: 'うさぎ', romaji: 'usagi', meaning: 'conejo' },
      ],
    },
    ぐ: {
      words: [
        { word: 'どうぐ', romaji: 'dougu', meaning: 'herramienta' },
        { word: 'かぐ', romaji: 'kagu', meaning: 'mueble' },
        { word: 'ぐあい', romaji: 'guai', meaning: 'condición' },
      ],
    },
    げ: {
      words: [
        {
          word: 'げんき',
          romaji: 'genki',
          meaning: 'salud',
        },
        { word: 'かげ', romaji: 'kage', meaning: 'sombra' },
        { word: 'ひげ', romaji: 'hige', meaning: 'barba' },
      ],
    },
    ご: {
      words: [
        { word: 'ごはん', romaji: 'gohan', meaning: 'arroz' },
        { word: 'ごご', romaji: 'gogo', meaning: 'tarde (PM)' },
        { word: 'りんご', romaji: 'ringo', meaning: 'manzana' },
      ],
    },
  },
  z: {
    ざ: {
      words: [
        { word: 'ざっし', romaji: 'zasshi', meaning: 'revista' },
        { word: 'ひざ', romaji: 'hiza', meaning: 'rodilla' },
        { word: 'かざん', romaji: 'kazan', meaning: 'volcán' },
      ],
    },
    じ: {
      words: [
        { word: 'じかん', romaji: 'jikan', meaning: 'tiempo' },
        { word: 'かじ', romaji: 'kaji', meaning: 'incendio' },
        { word: 'もじ', romaji: 'moji', meaning: 'letra' },
      ],
    },
    ず: {
      words: [
        { word: 'みず', romaji: 'mizu', meaning: 'agua' },
        { word: 'かず', romaji: 'kazu', meaning: 'número' },
        { word: 'ちず', romaji: 'chizu', meaning: 'mapa' },
      ],
    },
    ぜ: {
      words: [
        { word: 'かぜ', romaji: 'kaze', meaning: 'viento' },
        { word: 'なぜ', romaji: 'naze', meaning: 'por qué' },
        { word: 'ぜんぶ', romaji: 'zenbu', meaning: 'todo' },
      ],
    },
    ぞ: {
      words: [
        { word: 'ぞう', romaji: 'zou', meaning: 'elefante' },
        { word: 'かぞく', romaji: 'kazoku', meaning: 'familia' },
        { word: 'なぞ', romaji: 'nazo', meaning: 'misterio' },
      ],
    },
  },
  d: {
    だ: {
      words: [
        {
          word: 'だいすき',
          romaji: 'daisuki',
          meaning: 'encantar',
        },
        { word: 'からだ', romaji: 'karada', meaning: 'cuerpo' },
        { word: 'だれ', romaji: 'dare', meaning: 'quién' },
      ],
    },
    ぢ: {
      words: [
        { word: 'はなぢ', romaji: 'hanaji', meaning: 'hemorragia nasal' },
        { word: 'ちぢむ', romaji: 'chijimu', meaning: 'encogerse' },
      ],
    },
    づ: {
      words: [
        { word: 'つづく', romaji: 'tsuzuku', meaning: 'continuar' },
        { word: 'みかづき', romaji: 'mikazuki', meaning: 'luna creciente' },
      ],
    },
    で: {
      words: [
        { word: 'でんわ', romaji: 'denwa', meaning: 'teléfono' },
        { word: 'でぐち', romaji: 'deguchi', meaning: 'salida' },
        { word: 'そで', romaji: 'sode', meaning: 'manga (de una prenda)' },
      ],
    },
    ど: {
      words: [
        { word: 'どようび', romaji: 'doyoubi', meaning: 'sábado' },
        { word: 'まど', romaji: 'mado', meaning: 'ventana' },
        { word: 'みどり', romaji: 'midori', meaning: 'verde' },
      ],
    },
  },
  b: {
    ば: {
      words: [
        { word: 'ばしょ', romaji: 'basho', meaning: 'lugar' },
        { word: 'たばこ', romaji: 'tabako', meaning: 'cigarrillo' },
        { word: 'そば', romaji: 'soba', meaning: 'fideos soba' },
      ],
    },
    び: {
      words: [
        { word: 'びょうき', romaji: 'byouki', meaning: 'enfermedad' },
        { word: 'えび', romaji: 'ebi', meaning: 'gamba' },
        { word: 'さび', romaji: 'sabi', meaning: 'óxido' },
      ],
    },
    ぶ: {
      words: [
        { word: 'ぶた', romaji: 'buta', meaning: 'cerdo' },
        { word: 'ぶどう', romaji: 'budou', meaning: 'uva' },
        { word: 'ぜんぶ', romaji: 'zenbu', meaning: 'todo' },
      ],
    },
    べ: {
      words: [
        {
          word: 'べんきょう',
          romaji: 'benkyou',
          meaning: 'estudio',
        },
        { word: 'たべる', romaji: 'taberu', meaning: 'comer' },
        { word: 'かべ', romaji: 'kabe', meaning: 'pared' },
      ],
    },
    ぼ: {
      words: [
        { word: 'ぼうし', romaji: 'boushi', meaning: 'sombrero' },
        { word: 'そぼ', romaji: 'sobo', meaning: 'abuela' },
        { word: 'ぼく', romaji: 'boku', meaning: 'yo (masculino, informal)' },
      ],
    },
  },
  p: {
    ぱ: {
      words: [
        { word: 'ぱん', romaji: 'pan', meaning: 'pan' },
        { word: 'いっぱい', romaji: 'ippai', meaning: 'lleno' },
        { word: 'かんぱい', romaji: 'kanpai', meaning: '¡salud! (brindis)' },
      ],
    },
    ぴ: {
      words: [
        { word: 'えんぴつ', romaji: 'enpitsu', meaning: 'lápiz' },
        {
          word: 'ぴかぴか',
          romaji: 'pikapika',
          meaning: 'brillante, reluciente',
        },
        {
          word: 'はっぴょう',
          romaji: 'happyou',
          meaning: 'presentación',
        },
      ],
    },
    ぷ: {
      words: [
        { word: 'てんぷら', romaji: 'tenpura', meaning: 'tempura' },
        { word: 'いっぷく', romaji: 'ippuku', meaning: 'un breve descanso' },
        {
          word: 'ぷんぷん',
          romaji: 'punpun',
          meaning: 'enfadado',
        },
      ],
    },
    ぺ: {
      words: [
        { word: 'ぺらぺら', romaji: 'perapera', meaning: 'hablar con fluidez' },
      ],
    },
    ぽ: {
      words: [
        { word: 'さんぽ', romaji: 'sanpo', meaning: 'paseo' },
        { word: 'たんぽぽ', romaji: 'tanpopo', meaning: 'diente de león' },
        {
          word: 'ぽかぽか',
          romaji: 'pokapoka',
          meaning: 'calentito, agradable',
        },
      ],
    },
  },
  kya: {
    きゃ: {
      words: [
        { word: 'きゃく', romaji: 'kyaku', meaning: 'cliente' },
        {
          word: 'おきゃくさん',
          romaji: 'okyakusan',
          meaning: 'cliente (honorífico)',
        },
      ],
    },
    きゅ: {
      words: [
        { word: 'きゅうり', romaji: 'kyuuri', meaning: 'pepino' },
        { word: 'やきゅう', romaji: 'yakyuu', meaning: 'béisbol' },
      ],
    },
    きょ: {
      words: [
        { word: 'きょう', romaji: 'kyou', meaning: 'hoy' },
        { word: 'きょうしつ', romaji: 'kyoushitsu', meaning: 'aula' },
      ],
    },
  },
  sha: {
    しゃ: {
      words: [
        { word: 'しゃしん', romaji: 'shashin', meaning: 'foto' },
        { word: 'かいしゃ', romaji: 'kaisha', meaning: 'empresa' },
        { word: 'いしゃ', romaji: 'isha', meaning: 'médico' },
      ],
    },
    しゅ: {
      words: [
        { word: 'しゅくだい', romaji: 'shukudai', meaning: 'tarea' },
        { word: 'しゅみ', romaji: 'shumi', meaning: 'afición' },
      ],
    },
    しょ: {
      words: [
        { word: 'しょくじ', romaji: 'shokuji', meaning: 'comida' },
        { word: 'としょかん', romaji: 'toshokan', meaning: 'biblioteca' },
        {
          word: 'しょうがっこう',
          romaji: 'shougakkou',
          meaning: 'escuela primaria',
        },
      ],
    },
  },
  cha: {
    ちゃ: {
      words: [
        { word: 'おちゃ', romaji: 'ocha', meaning: 'té' },
        { word: 'ちゃいろ', romaji: 'chairo', meaning: 'marrón' },
        { word: 'あかちゃん', romaji: 'akachan', meaning: 'bebé' },
      ],
    },
    ちゅ: {
      words: [
        {
          word: 'ちゅうしゃ',
          romaji: 'chuusha',
          meaning: 'inyección',
        },
        { word: 'ちゅうごく', romaji: 'chuugoku', meaning: 'China' },
      ],
    },
    ちょ: {
      words: [
        { word: 'ちょうちょ', romaji: 'chouchou', meaning: 'mariposa' },
        { word: 'ちょきん', romaji: 'chokin', meaning: 'ahorro' },
      ],
    },
  },
  nya: {
    にゃ: {
      words: [
        {
          word: 'にゃんこ',
          romaji: 'nyanko',
          meaning: 'gatito (forma cariñosa)',
        },
        {
          word: 'こんにゃく',
          romaji: 'konnyaku',
          meaning: 'konjac (alimento)',
        },
      ],
    },
    にゅ: {
      words: [
        {
          word: 'にゅうがく',
          romaji: 'nyuugaku',
          meaning: 'ingreso en un centro educativo',
        },
        { word: 'ぎゅうにゅう', romaji: 'gyuunyuu', meaning: 'leche' },
      ],
    },
    にょ: {
      words: [
        {
          word: 'にょろにょろ',
          romaji: 'nyoronyoro',
          meaning: 'serpenteante (onomatopeya)',
        },
      ],
    },
  },
  hya: {
    ひゃ: {
      words: [{ word: 'ひゃく', romaji: 'hyaku', meaning: 'cien' }],
    },
    ひゅ: {
      words: [
        {
          word: 'ひゅう',
          romaji: 'hyuu',
          meaning: 'sonido del viento (onomatopeya)',
        },
      ],
    },
    ひょ: {
      words: [
        { word: 'ひょう', romaji: 'hyou', meaning: 'leopardo' },
        { word: 'ひょうか', romaji: 'hyouka', meaning: 'evaluación' },
      ],
    },
  },
  mya: {
    みゃ: {
      words: [{ word: 'みゃく', romaji: 'myaku', meaning: 'pulso' }],
    },
    みゅ: {
      words: [],
      emptyReason:
        'No hay palabras comunes de uso general con みゅ; aparece principalmente en nombres y efectos expresivos.',
    },
    みょ: {
      words: [
        { word: 'みょうじ', romaji: 'myouji', meaning: 'apellido' },
        { word: 'みょうにち', romaji: 'myounichi', meaning: 'mañana (formal)' },
      ],
    },
  },
  rya: {
    りゃ: {
      words: [{ word: 'りゃくご', romaji: 'ryakugo', meaning: 'abreviatura' }],
    },
    りゅ: {
      words: [
        { word: 'りゅう', romaji: 'ryuu', meaning: 'dragón' },
        {
          word: 'りゅうがく',
          romaji: 'ryuugaku',
          meaning: 'estudiar en el extranjero',
        },
      ],
    },
    りょ: {
      words: [
        { word: 'りょこう', romaji: 'ryokou', meaning: 'viaje' },
        { word: 'りょうり', romaji: 'ryouri', meaning: 'cocina' },
        { word: 'りょうしん', romaji: 'ryoushin', meaning: 'padres' },
      ],
    },
  },
  gya: {
    ぎゃ: {
      words: [{ word: 'ぎゃく', romaji: 'gyaku', meaning: 'opuesto' }],
    },
    ぎゅ: {
      words: [
        { word: 'ぎゅうにゅう', romaji: 'gyuunyuu', meaning: 'leche' },
        { word: 'ぎゅうにく', romaji: 'gyuuniku', meaning: 'carne de vacuno' },
      ],
    },
    ぎょ: {
      words: [
        { word: 'ぎょうざ', romaji: 'gyouza', meaning: 'empanadillas (gyoza)' },
        { word: 'きんぎょ', romaji: 'kingyo', meaning: 'pez dorado' },
      ],
    },
  },
  ja: {
    じゃ: {
      words: [
        { word: 'じゃがいも', romaji: 'jagaimo', meaning: 'patata' },
        { word: 'じゃま', romaji: 'jama', meaning: 'molestia' },
      ],
    },
    じゅ: {
      words: [
        { word: 'じゅう', romaji: 'juu', meaning: 'diez' },
        { word: 'じゅぎょう', romaji: 'jugyou', meaning: 'clase' },
      ],
    },
    じょ: {
      words: [
        { word: 'じょうず', romaji: 'jouzu', meaning: 'hábil, bueno en algo' },
        { word: 'じょうぶ', romaji: 'joubu', meaning: 'fuerte, resistente' },
      ],
    },
  },
  bya: {
    びゃ: {
      words: [],
      emptyReason: 'No hay palabras comunes de uso general con びゃ.',
    },
    びゅ: {
      words: [
        {
          word: 'びゅうびゅう',
          romaji: 'byuubyuu',
          meaning: 'viento soplando con fuerza',
        },
      ],
    },
    びょ: {
      words: [
        { word: 'びょういん', romaji: 'byouin', meaning: 'hospital' },
        { word: 'びょうき', romaji: 'byouki', meaning: 'enfermedad' },
      ],
    },
  },
  pya: {
    ぴゃ: {
      words: [],
      emptyReason: 'No hay palabras comunes de uso general con ぴゃ.',
    },
    ぴゅ: {
      words: [
        {
          word: 'ぴゅう',
          romaji: 'pyuu',
          meaning: 'silbido agudo',
        },
      ],
    },
    ぴょ: {
      words: [
        {
          word: 'ぴょんぴょん',
          romaji: 'pyonpyon',
          meaning: 'saltando (onomatopeya)',
        },
      ],
    },
  },
})
