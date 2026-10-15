# Playbook del orquestador — About-Me

Procedimientos reutilizables para orquestar mockups y validarlos. Se llena con lo que se aprende en cada ola.

## 1. Cómo revisar mockups HTML (procedimiento W1.5)

1. **Servir los archivos estáticos** (necesario para iframes con rutas relativas):
   ```bash
   python3 -m http.server 5179 --directory docs/design/playground &
   ```
2. **Abrir en el navegador colaborativo:** `preview_open` con `url: http://localhost:5179/gallery.html`.
3. **Verificación programática antes de mirar** (avalia cada iframe sin abrirlos uno a uno):
   ```js
   // ¿cargó? ¿tiene el .screen? ¿altura correcta?
   document.querySelectorAll('iframe').forEach(f => {
     const s = f.contentDocument.querySelector('.screen');
     console.log(f.getAttribute('src'), s && s.getBoundingClientRect().height);
   });
   // ¿hay desbordes fuera del screen?
   // (recorre todos los hijos y compara getBoundingClientRect con el del .screen)
   ```
4. **Verificación visual:** `preview_resize` a 713×3840 y `preview_snapshot` con `save: true` para dejar evidencia en `/home/luisitohc/.t3/userdata/browser-artifacts/`.
   - Para ver vistas concretas: `document.querySelectorAll('.item')[i].scrollIntoView({block:'start'})` + `window.scrollBy(0,60)`.
5. **Criterio de aprobación:** screen de alto exacto, sin errores de consola, sin imágenes externas, `prefers-reduced-motion` presente, contenido legible a 360px (media query).

## 2. Lecciones sobre delegación de diseño

| Problema observado | Causa | Corrección para las próximas olas |
|---|---|---|
| Variaciones interrumpidas antes de entregar | El brief exigía "< 12 KB" y los agentes gastaban turnos recortando | Pedir "menos de 20 KB" y una sola pasada; la optimización la hago yo en integración |
| Diseños con `position:absolute` frágiles | Los agentes priorizan el efecto over el layout | Exigir en el brief: "verifica que nada se desborde del contenedor; reporta los overflows" |
| Pantalla de referencia mal interpretada | El brief asumía ancho fijo | Los mockups deben diseñarse fluidos (100% width) y probarse en 713px y 360px |

## 3. Cómo presentar las propuestas al usuario

- Abrir la galería en el navegador colaborativo (el usuario puede interactuar).
- Adjuntar 1–2 capturas guardadas como evidencia visual en la respuesta.
- Acompañar con una pregunta de elección cerrada (letra + opción de combinación), nunca abierta sin opciones.

## 4. Cómo verificar contraste (procedimiento W5)

La paleta Playground usa colores brillantes como **relleno**; el texto encima debe ser oscuro **en los dos temas**. Ratio = (L₁+0.05)/(L₂+0.05) sobre luminancia linealizada.

Reglas derivadas (medidas, no supuestas):

| Combinación | Ratio | Veredicto |
|---|---|---|
| `--color-on-accent` (#221d2e) sobre coral / violeta / sol / menta | 5.50 / 5.01 / 10.72 / 7.76 | AA |
| `--color-coral-ink` (#c81f45) sobre paper light | 5.26 | AA |
| `--color-violet-ink` (#5b3ae0) sobre paper light | 6.28 | AA |
| `--color-mint-ink` (#177a64) sobre paper light | 4.91 | AA |
| ~~`paper` sobre `coral`~~ | 2.78 | **FAIL** — bug original corregido |
| ~~`paper` sobre `violeta`~~ | 3.06 | **FAIL** — bug original corregido |

En tema oscuro los `*-ink` se invierten a los brillantes (sobre `#17141c`: coral 6.13, violeta 8.76, menta 11.37) mientras `--color-on-accent` permanece **constante** (no se tematiza) porque los rellenos siguen siendo brillantes.

**Auditoría mínima tras cualquier cambio de color** (en el navegador, vía `preview_evaluate`):

1. Ningún `a`/`button` con área < 24×24 (WCAG 2.5.8).
2. Ningún glifo decorativo (`✦ ◆ ★ ❤ ✨`) dentro del texto de un heading o párrafo — usar SVG con `aria-hidden`.
3. `:focus-visible` presente y visible.
4. Sin `scrollWidth > clientWidth` (overflow horizontal) a 360 / 532 / 1280.
5. Orden de encabezados sin saltos (H1→H2→H3).

## 5. Trampas conocidas

- **`Date()` en prerender:** Next 16 con Cache Components lo bloquea (`blocking-prerender-current-time`). Las fechas van como constantes en `site.ts`.
- **HMR muestra contenido viejo:** si el DOM parece duplicado, recargar la página antes de reportar un bug de duplicación.
- **`evaluate` justo después de un `click()`:** React renderiza asíncrono; hay que `await setTimeout(…120)` antes de comprobar el DOM.
- **`preview_resize` no es exacto:** el viewport real puede quedar mayor (p. ej. 532 al pedir 360). Verificar siempre con `document.documentElement.clientWidth` antes de concluir sobre responsive.

## 6. Contratos que deben congelarse antes de construir

- `docs/design/TOKENS.md`: nombres de variables CSS (`--color-*`, `--font-*`) y duraciones.
- Tipos de contenido en `src/content/site.ts` (esquema tipado).
- Primitivas de motion (`components/motion/*`): props, nombres, fallback de reduced-motion.
