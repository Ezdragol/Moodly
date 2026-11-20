# Sprint 2 — Implementación hasta HU-04

**Periodo del Sprint 2:** 11/11/2026–26/11/2026  
**Alcance de este avance:** HU-02, HU-03 y HU-04.  
**Tecnología:** React Native, TypeScript, React Native Elements y Expo SDK 58.

## HU-02 — Navegar entre las secciones de Moodly

| Tarea | Implementación | Evidencia sugerida |
|---|---|---|
| Configurar navegación entre pantallas | `src/navigation/AppNavigator.tsx` controla la pantalla activa y conserva el estado compartido. | Capturas de Inicio y Diario, más el cambio entre ambas. |
| Implementar barra inferior de navegación | `src/components/BottomNavigation.tsx` permite seleccionar Inicio, Diario, Estadísticas y Autocuidado. | Captura de la barra con cada sección seleccionada. |
| Comprobar el flujo entre vistas | La app permite pasar de Inicio a Diario, volver a Inicio y abrir las secciones provisionales. | Video corto mostrando el recorrido. |

Estadísticas y Autocuidado aparecen como destinos provisionales para comprobar la navegación; sus funcionalidades completas no se desarrollan en este alcance.

## HU-03 — Iniciar sesión en Moodly

| Tarea | Implementación | Evidencia sugerida |
|---|---|---|
| Crear formulario de inicio de sesión | `src/screens/LoginScreen.tsx` contiene los campos Usuario y Contraseña y el botón Iniciar sesión. | Captura de la pantalla de acceso. |
| Implementar validación básica de acceso | Se impide continuar si el usuario o la contraseña están vacíos. Al completar ambos campos se entra a Inicio. | Captura del mensaje de validación y video de acceso correcto. |

El acceso es una demostración local: cualquier usuario y contraseña no vacíos permiten continuar. No existe autenticación real, base de datos de usuarios ni backend.

## HU-04 — Consultar el resumen de mi estado emocional

| Tarea | Implementación | Evidencia sugerida |
|---|---|---|
| Diseñar pantalla Home | `src/screens/HomeScreen.tsx` presenta el saludo, acceso para registrar el ánimo, resumen emocional y último registro. | Captura completa de Inicio. |
| Mostrar último registro y resumen semanal | `getWeeklySummary()` en `src/data/diary.ts` calcula los registros de los últimos siete días, intensidad promedio, emoción más frecuente y último registro. | Captura del resumen antes y después de agregar una entrada. |

## Reglas del resumen

- Se consideran los registros cuya fecha esté dentro de las últimas 168 horas.
- La intensidad promedio se calcula con las entradas del periodo y se muestra con un decimal.
- La emoción más frecuente es la que aparece más veces en el periodo.
- El último registro se determina por la fecha más reciente de todo el historial disponible.
- Si no existen entradas en el periodo, la pantalla muestra un mensaje sin datos.

## Fuera del alcance de este avance

- HU-06 — Guardar mis registros emocionales: no se integra AsyncStorage ni persistencia local. Los registros se conservan en memoria hasta que se cierre o reinicie la app.
- HU-08 — Buscar entradas de mi diario: se conserva la búsqueda ya creada en el Sprint 1, sin ampliar esta historia.
- Estadísticas completas, autocuidado, grabación de voz y autenticación por huella: quedan para sus etapas correspondientes.

## Criterios para marcar las tareas

No marcar las tareas como Done/Closed solo por tener el código. Ejecutar la app en Expo Go o emulador, revisar los flujos y adjuntar capturas o video reales. Si una prueba no se ha realizado, mantener la tarea en Active o New según su estado.
