# Kirakana 🍒

> できるまでやってみよう — *«Inténtalo hasta lograrlo»*

**KiraKana** es una aplicación web interactiva y gratuita para aprender los silabarios japoneses **hiragana** y **katakana**. A través de ejercicios visuales y progresivos, los estudiantes pueden memorizar los caracteres, practicar su reconocimiento y hacer seguimiento de su avance sin necesidad de registro ni instalación.

**Visita:** [kirakana.app](https://kirakana.app)

---

## Índice

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Colaboración](/CONTRIBUTING.md)
- [Licencia](#licencia)
- [Autor](#autor)

---

## Características

### Disponibles
- **Aprende** — fichas de referencia visual para identificar y memorizar los 46 caracteres de hiragana y katakana, con pronunciación en romaji.
- **Practica** — ejercicios de reconocimiento de caracteres (Kana → Romaji) con feedback inmediato tras cada intento.
- **Progreso** — seguimiento del avance del usuario guardado localmente en el navegador, sin necesidad de cuenta.
- **Sin registro** — acceso completo sin inicio de sesión ni datos personales.
- **Responsive** — interfaz adaptada para escritorio y móvil.

### En desarrollo
- **Escucha y responde** — escuchar el sonido de un kana y seleccionar el símbolo correspondiente.
- **Niveles de dificultad** — modos diferenciados para principiantes y estudiantes avanzados.
- **Estadísticas mejoradas** — métricas detalladas de aciertos, errores y racha de práctica.

---

## Tecnologías

| Tecnología | Rol en el proyecto |
|---|---|
| [Astro](https://astro.build/) | Framework principal, genera contenido estático con islands interactivas |
| [React](https://react.dev) | Componentes interactivos (islands) para los modos de práctica |
| [TypeScript](https://www.typescriptlang.org/) | Aporta tipado estático al código |
| [Tailwind CSS](https://tailwindcss.com/) | Framework de estilos CSS y diseño responsive |

---

## Estructura del proyecto

```
kirakana.app/
├── public/                  # Assets estáticos
├── src/
│   ├── pages/
│   │   ├── index.astro          # Landing page
│   │   ├── aprender/
│   │   │   ├── index.astro      # Selección de silabario
│   │   │   ├── [silabario].astro   # Tabla de hiragana o katakana
│   │   ├── practicar/
│   │   │   ├── index.astro      # Selección de modo
│   │   │   └── [modo]/
│   │   │       ├── index.astro     # Modo de práctica (Kana → Romaji)
│   │   │       └── [silabario].astro # Variantes para hiragana o katakana
│   │   └── progreso/
│   │       └── index.astro      # Panel de progreso
│   │
│   ├── features/         # Lógica de negocio y hooks personalizados
│   ├── components/          # Componentes reutilizables (.astro)
│   ├── layouts/             # Layouts base de las páginas
│   ├── lib/                # Datos de caracteres hiragana y katakana
│   └── site.config.ts     # Configuración de rutas y metadatos
│
├── astro.config.ts           # Configuración de Astro
├── astro.config.ts           # Configuración de Astro
├── biome.json               # Configuración de Biome (linting y formateo)
└── package.json
```

---

## Licencia

Este proyecto está bajo la [Licencia MIT](./LICENSE). Puedes usarlo, modificarlo y distribuirlo libremente.

---

## Autor

Diseñado y desarrollado por [bmmedina99](https://github.com/bmmedina99) - [bmmedina.dev](https://bmmedina.dev)
