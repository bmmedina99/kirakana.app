# Colaboración

¡Las contribuciones son bienvenidas! Tanto si quieres corregir un error, mejorar la documentación o proponer una nueva funcionalidad, aquí tienes cómo hacerlo.

## Requisitos previos

- [Node.js](https://nodejs.org/) v22 o superior
- [pnpm](https://pnpm.io/) v11 o superior

---

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

Usa un nombre descriptivo que refleje el cambio que vas a hacer:

```bash
git switch -c feat/nombre-de-la-funcionalidad
# o para correcciones:
git switch -c fix/descripcion-del-bug
```

### 6. Realiza tus cambios y haz commit

Sigue la convención [Conventional Commits](https://www.conventionalcommits.org/es/) para los mensajes:

```bash
git add .
git commit -m "feat(<scope>): [mensaje descriptivo del cambio]"
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

### 7. Abre un Pull Request

Sube tu rama a tu fork y abre un Pull Request hacia la rama `production` del repositorio original. En la descripción del PR incluye:

- **Qué** cambia o añade.
- **Por qué** es necesario el cambio.
- Capturas de pantalla si hay cambios visuales.

El PR será revisado en un plazo de pocos días. Si necesitas hacer ajustes, puedes seguir haciendo commits en la misma rama y el PR se actualizará automáticamente.

### ¿Tienes una idea pero no sabes por dónde empezar?

Abre un [Issue](https://github.com/bmmedina99/kirakana.app/issues) describiendo tu propuesta. Es el mejor lugar para discutir nuevas funcionalidades antes de ponerse a programar.
