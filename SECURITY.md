# Seguridad

## Reportar vulnerabilidades

Si encuentras un problema de seguridad en KiraKana, por favor repórtalo
privadamente mediante un [GitHub Security Advisory](https://github.com/bmmedina99/kirakana.app/security/advisories/new)

**No abras un issue público** para vulnerabilidades de seguridad.

## Alcance

KiraKana es una aplicación web client-side. Las áreas en las que
aceptamos reportes son:

- Inyección de código (XSS) en la interfaz
- Problemas en dependencias de terceros (CDN, fuentes, audio)
- Vulnerabilidades en el hosting o configuración del sitio
- Problemas de cadena de suministro (npm, etc.)

**Fuera de alcance:** problemas de rendimiento, UX o bugs funcionales
(no son vulnerabilidades de seguridad).

## Versiones soportadas

Se aceptan reportes solo para la versión más reciente publicada.

## Compromiso de respuesta

- **Reconocimiento**: intentaremos confirmar recepción en un plazo
  de 7 días.
- **Corrección**: si se confirma la vulnerabilidad, publicaremos
  un parche en un plazo razonable (típicamente 30 días).

## Divulgación

- Preferimos la **divulgación coordinada**: no publiques la
  vulnerabilidad públicamente hasta que se haya publicado la
  corrección.
- Agradecemos el crédito al investigador en el changelog, salvo
  que prefieras permanecer anónimo.

## Notas sobre la arquitectura

Al ser una app sin backend ni almacenamiento de datos personales,
el riesgo de exposición de información es prácticamente nulo.
El principal vector de ataque es la inyección de scripts en el
cliente (XSS) y la integridad de las dependencias externas.
