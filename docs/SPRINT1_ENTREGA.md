# Moodly — Entrega técnica del Sprint 1

**Periodo:** 21 de octubre al 6 de noviembre de 2026.

**Objetivo:** entregar una primera versión de la pantalla Diario basada en el prototipo de Figma, con componentes reutilizables y el formulario «Nueva entrada» integrado.

## HU-01 — Visualizar una interfaz consistente

| Tarea | Implementación o evidencia |
| --- | --- |
| 1. Revisar las cinco pantallas del prototipo Figma | Se utiliza la tercera pantalla (Diario) como referencia visual: título Diario de Kevin, buscador, tarjetas, botón lila y barra inferior; se conservan las secciones restantes en la barra visual. |
| 2. Configurar React Native Elements y tema visual | `src/theme/theme.ts` contiene los colores y el tema global; `App.tsx` aplica `ThemeProvider`. La interfaz utiliza `Text`, `Input`, `Button` y `Overlay` de `@rneui/themed`. |
| 3. Organizar componentes y estilos base | `src/screens`, `src/components`, `src/theme` y `src/data` separan pantalla, componentes, estilos y lógica. |

## HU-05 — Abrir el formulario de nueva entrada

| Tarea | Implementación o evidencia |
| --- | --- |
| 4. Integrar el código previo en la pantalla Diario | El botón «+ Nueva entrada» abre `NewEntryModal.tsx`, y `DiarioScreen.tsx` recibe los datos mediante `onSave`. |
| 5. Implementar selección de emoción e intensidad | Seis opciones de emociones con emojis y control de intensidad del 1 al 5, con estado seleccionado visible. |
| 6. Agregar campos de contexto y notas | Cinco chips de contexto, nota multilinea con contador de 500 caracteres, validación de nota vacía y confirmación al guardar. |

## HU-07 — Consultar mis entradas anteriores

| Tarea | Implementación o evidencia |
| --- | --- |
| 7. Diseñar pantalla Diario según Figma | Encabezado, buscador, sección de entradas recientes, botón y barra inferior, con paleta lila y tarjetas redondeadas. |
| 8. Crear tarjetas con emoji, fecha, contexto y nota | `DiaryEntryCard.tsx` muestra esos datos más emoción e intensidad. |
| 9. Mostrar registros de ejemplo y verificar la interfaz | Tres entradas de ejemplo en `src/data/diary.ts`, seis pruebas unitarias y verificación de TypeScript y exportación Android. Se requiere además una prueba visual en el teléfono del usuario. |

## Verificaciones técnicas realizadas

- Compilación de TypeScript mediante `node node_modules/typescript/bin/tsc --noEmit`: sin errores.
- Ejecución de seis pruebas en `tests/diary.test.cjs`: 6/6 correctas.
- Exportación de bundle Android mediante Expo: completada correctamente en el entorno de construcción.

## Checklist manual en Expo Go o emulador

- [ ] Abrir la app y comprobar que se muestra «Diario de Kevin».
- [ ] Comprobar que aparecen las tres entradas de ejemplo.
- [ ] Buscar «trabajo» y confirmar que solo se muestra la entrada correspondiente.
- [ ] Pulsar «+ Nueva entrada» y comprobar que abre el formulario.
- [ ] Seleccionar cualquier emoción y una intensidad distinta de la predeterminada.
- [ ] Cambiar contexto, escribir una nota y guardarla.
- [ ] Confirmar que la nueva tarjeta aparece al principio del historial.
- [ ] Cerrar el formulario sin guardar y verificar que no se crea una entrada.
- [ ] Comprobar la visualización en el teléfono o emulador Android.

## Importante

La comprobación de TypeScript y la exportación Android no sustituyen las pruebas visuales en un dispositivo real. No marques las nueve tareas como «Done» hasta revisar el resultado en tu instalación. El almacenamiento persistente y la navegación real corresponden al Sprint 2.
