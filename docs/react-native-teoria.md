# Teoria de React Native  NoteFlow

## 1. React Native vs App nativa

React Native no genera HTML ni usa un WebView. Cuando escribes `<View>` o `<Text>`, React Native habla directamente con el sistema operativo (Android o iOS) para crear vistas nativas reales. Esto le da el aspecto y rendimiento de una app nativa sin tener que escribir en Java/Kotlin o Swift.

La diferencia con una app nativa pura es que la lógica corre en un hilo JavaScript (JS Thread) que se comunica con el hilo de UI nativo. Si el JS Thread se bloquea, la interfaz se congela.

## 2. Metro Bundler

Metro es el empaquetador de JavaScript que usa React Native. Su función es similar a Webpack en proyectos web: toma todos los archivos del proyecto, resuelve los imports y genero un bundle que el dispositivo puede ejecutar.

Cuando ejecutas `npx expo start`, Metro arranca un servidor local. Cada vez que guardas un archivo, Metro rebundlea solo los módulos afectados y los envía al dispositivo via Fast Refresh.

## 3. Por qué Expo Go no es suficiente en proyectos reales?

Expo Go es una app genérica que puede ejecutar cualquier proyecto Expo escaneando un QR. Es útil para aprender y prototipar, pero tiene limitaciones:

- No soporta módulos nativos personalizados (cámara avanzada, biometría, notificaciones push propias)
- No puedes personalizar el ícono ni el splash de la app
- No sirve para publicar en la App Store o Play Store.

En proyectos reales se una un Development Build: un binario compilado y específico para tu proyecto generado con EAS Build.

## 4. Sistemas de diseño - Por qué elegimos React Native Paper?

Comparamos dos librerías:

**Gluestack UI**: Filosofía similar a Tailwind, altamente personalizable.
Sin embargo, su versión 1 tiene una dependencia de `react-dom` que es incompatible con entornos React Native puros (no existe el DOM en móviles).
Intentamos instalarlo pero falló en tiempo de ejecución con React 19 + Expo SDK 54. La versión 2 no nos hubiera dado problemas ya que retiraron la dependenci de `react-dom`.

**React Native Paper**: implementación de Material Design, estable y compatible con React 19. No depende de `react-dom`. Elegimos esta librería por us compatibiidad garantizada con nuestro stack.

## 5. Navegación con Expo Router

Expo Router usa el sistema de archivos para definir rutas, igual que Next.js.
Cada archivo en la carpeta `app/` se convierte en una ruta automáticamente.

### Tipos de navegación usados en NoteFlow

**Tabs**: barra de pestañas inferior. Usada como navegación principal porque
NoteFlow tiene tres secciones independientes (notas, checklists, ideas).

**Stack**: navegación en pila donde cada pantalla se apila sobre la anterior.
Usada dentro de cada pestaña para navegar del listado al detalle, y a nivel
raíz para el modal de creación.

**Modal**: pantalla que aparece desde abajo. Usada para el formulario de
nueva nota porque es una acción temporal que no forma parte del flujo
principal.

## 6. Type Guards en TypeScript

NoteFlow tiene tres tipos de nota que comparten una base común (`BaseNote`)
pero tienen propiedades distintas. El tipo `AnyNote` permite funciones que
aceptan cualquier tipo de nota.

Para distinguirlos en tiempo de ejecución usamos type guards:

```typescript
if ('items' in note) {
  // TypeScript sabe que es ChecklistNote
  console.log(note.items.length);
}
```

El operador `in` comprueba si una propiedad existe en el objeto. Como
`items` solo existe en `ChecklistNote`, TypeScript puede inferir el tipo
correctamente dentro del bloque.

## 7. Gestión de estado — useState vs Context API vs Zustand

**useState**: estado local de un componente. No se puede compartir entre
pantallas. Útil para formularios o toggles locales.

**Context API**: estado global mediante un Provider. Funciona pero tiene
un problema de rendimiento: cualquier cambio en el contexto provoca el
re-render de todos los componentes suscritos, aunque no les afecte.

**Zustand**: cada componente se suscribe solo a la parte del estado que
necesita. Si añades una nota, solo los componentes que usan `notes` se
re-renderizan. Es más simple que Redux y más eficiente que Context API.

En NoteFlow usamos Zustand para gestionar las tres colecciones de datos
(notes, checklists, ideas) y todas sus acciones (añadir, eliminar, togglear).

## 8. Rendimiento en listas — FlashList vs FlatList

FlatList, el componente nativo de React Native, destruye y recrea componentes
al hacer scroll. Con listas largas esto provoca pantallas en blanco.

FlashList de Shopify recicla los componentes existentes cambiando solo sus
datos, sin destruirlos. La propiedad `estimatedItemSize` le indica cuánto
espacio ocupará cada elemento antes de renderizarlo — cuanto más preciso,
mejor el rendimiento.

## 9. Persistencia con AsyncStorage — Rehidratación

AsyncStorage guarda datos en el dispositivo como pares clave-valor en texto
JSON. Sus limitaciones: sin cifrado, límite de tamaño y solo local (sin
sincronización en la nube).

Integramos AsyncStorage con Zustand mediante el middleware `persist`. Cuando
la app arranca, Zustand lee automáticamente los datos guardados y los carga
en memoria. Este proceso se llama **rehidratación**.

Durante la rehidratación existe un momento donde el store está vacío antes
de llenarse. Para evitar mostrar contenido vacío momentáneamente, se podría
añadir un estado `isHydrated` al store y mostrar un indicador de carga
mientras `isHydrated` es `false`.