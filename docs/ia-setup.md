# Configuración de herramientas de IA

## Herramientas utilizadas

### Windsurf (editor)
Windsurf es el editor principal del proyecto. Tiene soporte de IA integrado
mediante el asistente Cascade. Se ha configurado mediante el archivo
`.windsurfrules` en la raíz del proyecto.

Este archivo le indica al asistente:
- El stack tecnológico exacto del proyecto
- Las convenciones de nombres y estructura de carpetas
- Las restricciones de arquitectura (por ejemplo, usar FlashList en lugar
  de FlatList, o Zustand en lugar de Context API)

El objetivo es que cualquier sugerencia de código sea coherente con las
decisiones de diseño tomadas desde el inicio.

### Claude (asistente de aprendizaje)
Claude actúa como mentor técnico durante el desarrollo, explicando conceptos
antes de implementarlos y revisando decisiones de arquitectura.

Se utiliza con contexto persistente del proyecto: stack, estructura de
carpetas, convenciones y restricciones, para que las explicaciones sean
siempre coherentes con lo que se está construyendo.

## Por qué esta configuración

Sin configuración previa, los asistentes de IA generan código genérico que
puede contradecir las decisiones del proyecto (por ejemplo, usar FlatList
cuando hemos decidido usar FlashList, o usar any en TypeScript).

Con el contexto del proyecto definido desde el principio, el código sugerido
respeta la arquitectura y las convenciones elegidas.