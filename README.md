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
- **Aprende** — organización de referencia visual para identificar y memorizar los 46 caracteres de hiragana y katakana, con pronunciación en romaji.
- **Practica** — ejercicios de reconocimiento de caracteres (Kana → Romaji) con feedback inmediato tras cada intento.
- **Progreso** — consultas, dominio estimado por kana, sugerencias de repaso, actividad diaria e historial de sesiones. Guardado en el mismo navegador.
- **Sin registro** — acceso completo sin inicio de sesión ni datos personales.
- **Responsive** — interfaz adaptada para multiples dispositivos.

### Próximamente
- **Trazo** — visualiza el trazado de cada kana para aprender como escribir.
- **Escucha** — reproduce el sonido de un kana y selecciona el símbolo correcto.

## Tecnologías

| Tecnología | Descripción |
|---|---|
| [Astro](https://astro.build/) | Framework principal, genera contenido estático con islands interactivas |
| [React](https://react.dev) | Componentes interactivos (islands) para los modos de práctica |
| [TypeScript](https://www.typescriptlang.org/) | Aporta tipado estático al código |
| [Tailwind CSS](https://tailwindcss.com/) | Framework de estilos CSS y diseño responsive |

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
│   │   │       └── [silabario].astro # hiragana o katakana
│   │   └── progreso/
│   │       └── index.astro      # Panel de progreso
│   │
│   ├── features/         # Lógica de negocio y hooks personalizados
│   ├── components/          # Componentes reutilizables (.astro)
│   ├── layouts/             # Layouts base de las páginas
│   └── lib/                # Datos de caracteres hiragana y katakana
│
├── astro.config.ts           # Configuración de Astro
├── biome.json               # Configuración de Biome (linting y formateo)
└── package.json
```

---

## Licencia

El código de KiraKana se ofrece bajo la [GNU Affero General Public License, versión 3 (AGPL-3.0-only)](./LICENSE).

Copyright (c) 2025 bmmedina99.

La licencia permite usar, modificar y distribuir el código, también con fines comerciales, cumpliendo sus condiciones. Al distribuir versiones cubiertas deben mantenerse los avisos y facilitarse el código fuente correspondiente. Si modificas el programa y tu versión permite interacción remota por red, debes ofrecer a sus usuarios acceso al código fuente correspondiente de esa versión, conforme a la sección 13.

Las contribuciones mediante pull requests son bienvenidas y se incorporan bajo esta misma licencia. Consulta [CONTRIBUTING](./CONTRIBUTING.md).

## Autor

Diseñado y desarrollado por [bmmedina99](https://github.com/bmmedina99) - [bmmedina.dev](https://bmmedina.dev)

## Apoyo al proyecto

KiraKana es completamente gratuito y de código abierto. Si te ha resultado útil y quieres apoyar su desarrollo, puedes hacer una pequeña aportación voluntaria.

☕ [Apoyar a KiraKana](https://ko-fi.com/bmmedina99)
