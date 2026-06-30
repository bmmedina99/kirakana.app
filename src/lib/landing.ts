import aprender from '@/assets/images/aprender-kirakana.avif'
import practicar from '@/assets/images/practicar-kirakana.avif'

export const howItWorkSteps = [
  {
    id: 'aprende',
    stepNumber: '01',
    stepLabel: 'Paso 01',
    badgeClass: 'bg-sun-100',
    title: 'Aprende Hiragana y Katakana con inmersión guiada',
    description:
      'Explora los caracteres japoneses organizados por grupos fonéticos. Cada lección incluye audio, guías de trazado y asociaciones visuales para entender y recordar cada símbolo de forma natural.',
    bullets: [
      'Aprendizaje progresivo desde cero',
      'Tabla de hiragana y katakana completa',
      'Audio para aprender pronunciación japonesa',
    ],
    image: aprender,
    imageAlt:
      'Pantalla de selección de KiraKana, para aprender hiragana y katakana',
    imageFirst: true,
  },
  {
    id: 'practica',
    stepNumber: '02',
    stepLabel: 'Paso 02',
    badgeClass: 'bg-copper-100 text-mauve-50',
    title: 'Practica Hiragana y Katakana con ejercicios interactivos',
    description:
      'Refuerza lo aprendido con ejercicios de reconocimiento rápido. Entrena tu memoria para identificar caracteres japoneses al instante mediante desafíos  visuales y auditivos.',
    bullets: [
      'Reconocimiento rápido de kana',
      'Feedback de errores en tiempo real',
      'Ejercicios de reconocimiento japonés',
    ],
    image: practicar,
    imageAlt:
      'Ejercicio interactivo de KiraKana para practicar el reconocimiento de los kanas',
    imageFirst: false,
  },
  {
    id: 'progresa',
    stepNumber: '03',
    stepLabel: 'Paso 03',
    badgeClass: 'bg-ochre-200 text-mauve-50',
    title: 'Domina el japonés básico con seguimiento de progreso',
    description:
      'Consolida tu aprendizaje con un sistema de progreso inteligente. Visualiza qué caracteres dominas y cuáles necesitas repasar para mejorar tu fluidez en hiragana y katakana.',
    bullets: [
      'Seguimiento del progreso guardado localmente, sin cuenta ni contraseña',
      'Identificación de puntos débiles',
      'Aprendizaje personalizado',
    ],
    image: aprender,
    imageAlt:
      'Panel de progreso de KiraKana mostrando caracteres dominados y pendientes de repaso',
    imageFirst: true,
  },
]

export const audiences = [
  {
    id: 0,
    accent: 'Para principiantes',
    title: 'Aprende japonés desde cero',
    icon: '初',
    description:
      'Sin conocimientos previos de japonés, comienza con lo esencial. Aprende paso a paso con ejercicios simples y sin estrés.',
  },
  {
    id: 1,
    accent: 'Para viajeros',
    title: 'Aprende japonés para viajar',
    icon: '旅',
    description:
      'Aprende a leer menús, carteles y señales en Japón. Domina hiragana y katakana para moverte con confianza durante tu viaje y disfrutar.',
  },
  {
    id: 2,
    accent: 'Para fans del anime',
    title: 'Aprende japonés por diversión',
    icon: '静',
    description:
      'Si te encanta el anime, manga o la cultura japonesa, aprende para disfrutar de tus series favoritas sin subtítulos y entender mejor el idioma.',
  },
]

export const reasons = [
  {
    icon: 'free-content',
    title: 'Aprende hiragana y katakana gratis, sin suscripciones',
    description:
      'Accede a ejercicios interactivos de japonés sin pagar. KiraKana es una plataforma gratuita para aprender desde cero.',
  },
  {
    icon: 'speaker',
    title: 'Aprende la pronunciación correcta del hiragana y katakana',
    description:
      'Ejercicios de reconocimiento visual con audio para dominar la pronunciación de cada carácter.',
  },
  {
    icon: 'dont-stress',
    title: 'Aprende japonés a tu ritmo, sin presión',
    description:
      'Estudia hiragana y katakana sin estrés. Sin temporizadores ni presión, solo aprendizaje progresivo y efectivo.',
  },
]

export const questions = [
  {
    question: '¿Necesito saber japonés para usar KiraKana?',
    answer:
      'No. KiraKana está diseñado para empezar desde cero absoluto. Las primeras lecciones parten de los sonidos vocálicos básicos, igual que cuando aprendiste a leer tu propio idioma.',
  },
  {
    question: '¿Cuánto tiempo se tarda en aprender hiragana y katakana?',
    answer:
      'Con 10-15 minutos de práctica diaria, la mayoría de estudiantes puede memorizar hiragana y katakana en 2 a 3 semanas. La clave no es estudiar muchas horas de golpe, sino practicar con constancia cada día.',
  },
  {
    question: '¿KiraKana es completamente gratis?',
    answer:
      'Sí, totalmente. KiraKana es un proyecto gratuito y de código abierto, sin costos ocultos ni funciones bloqueadas. El enlace que verás de [Apoyar a KiraKana] al final de esta página es completamente voluntario.',
  },
  {
    question: '¿Puedo usar KiraKana en el móvil?',
    answer:
      'Sí. KiraKana es una aplicación web adaptada a móvil, tablet y ordenador. Puedes practicar hiragana y katakana desde donde quieras.',
  },
  {
    question: '¿KiraKana guarda mi progreso?',
    answer:
      'Sí. Tu progreso se guarda localmente en el navegador usando almacenamiento local. Mientras no borres los datos del sitio o la caché del navegador, tu progreso seguirá disponible en el mismo dispositivo.',
  },
  {
    question: '¿Se puede aprender japonés solo con hiragana y katakana?',
    answer:
      'No completamente. Hiragana y katakana son la base del japonés escrito y te ayudan a entender la fonética del idioma. Para leer textos completos también necesitarás kanji, vocabulario y gramática, pero dominar los dos silabarios es el primer paso imprescindible.',
  },
]
