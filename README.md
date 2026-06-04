# NoteFlow

App móvil de productividad desarrollada con React Native y Expo.
Permite capturar tres tipos de contenido: notas de texto, checklists
con items marcables e ideas con etiquetas y color personalizado.

## Stack tecnológico

- React Native + Expo SDK 54
- TypeScript
- Expo Router (navegación por archivos)npm install -g eas-cli
eas login
eas update --branch preview --message "Primera versión"
- React Native Paper (sistema de diseño)
- Shopify FlashList (listas de alto rendimiento)
- Zustand (estado global)
- AsyncStorage (persistencia local)
- Zod (validación de formularios)
- Expo Haptics (feedback táctil)

## Funcionalidades

- Crear, ver y eliminar notas de texto
- Crear, ver y marcar items de checklists con barra de progreso
- Crear, ver y etiquetar ideas con color personalizado
- Navegación por pestañas con iconos
- Persistencia local de datos
- Soporte para modo oscuro y claro
- Feedback táctil al eliminar y completar tareas
- Estados vacíos en todas las pantallas

## Gestión del proyecto

Tablero Kanban en Trello:
https://trello.com/invite/b/6a0e65900d72168c268c451d/ATTI1ecb4162fddef636485cd613a5cbcb93B28BF242/noteflow
## Documentación

- [Idea del proyecto](docs/idea.md)
- [Gestión del proyecto](docs/project-management.md)
- [Configuración de IA](docs/ai-setup.md)
- [Teoría React Native](docs/react-native-teoria.md)

## Cómo ejecutar el proyecto

```bash
npm install
npx expo start
```

Escanea el QR con Expo Go en tu móvil.