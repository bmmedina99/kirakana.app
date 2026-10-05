# Colaboración a KiraKana

¡Las contribuciones son bienvenidas! Tanto si quieres corregir un error, mejorar la documentación o proponer una nueva funcionalidad, Esta guía explica cómo preparar un cambio, solicitar revisión y mantener el historial que utiliza la publicación automática.

## Antes de empezar

Busca primero si ya existe una issue o un pull request (PR) sobre el cambio.
Para funcionalidades nuevas o cambios de alcance considerable, abre una issue para acordar el comportamiento antes de implementarlo.

Al comunicar un error, incluye los pasos para reproducirlo, el resultado esperado, el resultado obtenido y el navegador o entorno utilizado. Añade capturas si ayudan a entender el problema.

Mantén cada PR centrado en un objetivo. Evita mezclar una corrección con refactorizaciones o cambios de formato ajenos a ella. En las revisiones, explica tus decisiones y comenta el código de forma respetuosa y concreta.

## Ramas y forma de integrar cambios

| Origen | Destino | Método | Responsable |
| --- | --- | --- | --- |
| Rama de trabajo | `develop` | PR con **Squash and merge** | Colaboradores y mantenedor |
| `develop` | `production` | PR con **Create a merge commit** | Mantenedor |
| `production` | `develop` | Merge de sincronización tras el release | Mantenedor |

`develop` reúne los cambios en desarrollo. **Abre los PR de contribuciones
contra `develop`**, no contra `production`.

El push directo a `develop` está reservado a `@bmmedina99`. El resto de
contribuciones debe pasar por PR. Esta excepción no cambia la necesidad de
comprobar los cambios ni de usar Conventional Commits.

`production` contiene los cambios publicados. No hagas force-push
sobre las ramas compartidas ni modifiques tags de versiones publicadas.

## Preparar el entorno y una rama

A continuación se verán los pasaos para para la instalación y ejecución de la aplicación. Utiliza el gestor de paquetes y las versiones indicadas por el proyecto; conserva su lockfile y evita generar lockfiles de otro gestor.

### 1. Haz un fork del repositorio

Desde la página del repositorio en GitHub, haz clic en **Fork** para crear tu propia copia.

### 2. Clona tu fork

```bash
git clone git@github.com:TU_USUARIO/kirakana.app.git
cd kirakana.app
```

### 3. Instala las dependencias

```bash
pnpm install
```

### 4. Ejecuta el entorno de desarrollo

```bash
pnpm run dev
```

La aplicación estará disponible en [http://localhost:4000](http://localhost:4000).

### 5. Crea una rama para tu cambio

Usa nombres descriptivos como feat/kana-practice, fix/keyboard-navigation o docs/contributing. Comprueba que no tienes cambios pendientes antes de cambiar de rama.

```bash
git switch -c feat/nombre-de-la-funcionalidad
# o para correcciones:
git switch -c fix/descripcion-del-bug
```

### 6. Realiza tus cambios y haz commit

Sigue la convención [Conventional Commits](https://www.conventionalcommits.org/es/) para los mensajes:

```bash
git add .
git commit -m "feat(<scope>): [mensaje descriptivo del cambio en inglés]"
```

Ejemplos:

```text
feat(kana): add practice mode
fix(keyboard): restore arrow navigation
docs: clarify local setup
refactor: simplify answer validation
test: cover incorrect answers
ci: update release checks
chore: update development dependencies
```

| Prefijo | Cuándo usarlo |
|---|---|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de un error |
| `perf:` | Mejora de rendimiento |
| `docs:` | Cambios en documentación |
| `style:` | Cambios de formato o estilo (sin lógica) |
| `chore:` | Tareas de mantenimiento general |
| `refactor:` | Refactorización de código existente |

Para un cambio incompatible, utiliza `!` antes de los dos puntos y explica cómo
adaptarse. También se reconoce el pie `BREAKING CHANGE:` o `BREAKING-CHANGE:`:

```text
feat(storage)!: change saved progress format

BREAKING CHANGE: saved progress must be migrated to the new format.
```

Describe el impacto en el PR y conserva el aviso en el mensaje final del squash. Si la incompatibilidad aparece únicamente en la descripción del PR, comprueba que se copie al cuerpo del commit: la publicación analiza los mensajes de Git.

No añadas `[skip ci]` a tus contribuciones: los checks deben ejecutarse. El commit automático de release es una excepción gestionada por el workflow.

### 7. Abre un Pull Request

Ejecuta las comprobaciones de formato, lint, tests y build que correspondan al cambio y estén documentadas en el proyecto. Revisa los scripts disponibles en [package.json](package.json); no añadas comandos o dependencias solo para abrir un PR.

Sube tu rama a tu fork y abre un Pull Request hacia la rama `develop` del repositorio original. El titulo de la PR deberá seguir el estandar de Conventional Commits

En la descripción explica qué problema resuelve, qué comportamiento cambia y cómo lo has comprobado. Enlaza la issue relacionada si existe, adjunta capturas para cambios visuales e indica cualquier cambio incompatible o migración.

Antes de marcarlo como listo para revisión:

- [ ] La rama base es `develop` y el título sigue Conventional Commits.
- [ ] El diff contiene únicamente cambios relacionados con el objetivo del PR.
- [ ] He realizado las comprobaciones correspondientes y descrito sus resultados.
- [ ] He actualizado la documentación o los tests cuando el cambio lo requiere.
- [ ] Los cambios incompatibles están identificados y explicados.
- [ ] No he editado manualmente la versión de `package.json` ni `CHANGELOG.md`.

Puedes abrir un PR en borrador mientras trabajas. Cuando esté listo, solicita revisión a `@bmmedina99` para las contribuciones. Resuelve los comentarios y espera a que los checks requeridos pasen antes de integrar. El PR será revisado en un plazo de pocos días. Si necesitas hacer ajustes, puedes seguir haciendo commits en la misma rama y el PR se actualizará automáticamente.

## Licencia de las contribuciones

El código se distribuye bajo [AGPL-3.0-only](./LICENSE), que permite también el uso comercial. Al enviar una contribución para incorporarla al proyecto, aceptas que se distribuya bajo esa licencia y confirmas que tienes derecho a aportarla. Conserva los avisos de autoría y licencia que correspondan al código de terceros.
