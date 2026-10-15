# Plan de orquestación — About-Me

Este documento es el contrato operativo del proyecto: olas, tareas, roles, propiedad de archivos y gates de calidad. Se actualiza al cierre de cada ola.

## Principios operativos

1. **Olas secuenciales, tareas paralelas.** Ninguna ola empieza sin que sus dependencias estén congeladas.
2. **Contratos primero.** Antes de construir se congelan: tokens (nombres de variables CSS), tipos de contenido, interfaces de primitivas de motion y mapa de propiedad de archivos.
3. **Subagente = tarea acotada + herramientas mínimas + criterios de aceptación + evidencia.** Un subagente no elige su alcance.
4. **Nadie valida su propio trabajo.** La ola W5 es independiente de quien construyó.
5. **Todo se prueba antes de mostrarlo.** Lint, typecheck y build verdes en cada merge hacia el orquestador, más la evidencia específica de la tarea (captura, medición, diff).

## Mapa de propiedad de archivos (anti-conflictos)

| Ruta | Dueño en construcción | Valida |
|---|---|---|
| `src/app/**` | Orquestador (tras integrar secciones) | V3 |
| `src/content/site.ts` | F3 | V4 |
| `src/components/motion/**` | F4 | V1 |
| `src/components/ui/**` | F2 | V1 |
| `src/components/sections/hero/**` | B1 | V2, V3 |
| `src/components/sections/about/**` | B2 | V4 |
| `src/components/sections/skills/**` | B3 | V2 |
| `src/components/sections/projects/**` | B4 | V2, V3 |
| `src/components/sections/experience/**` | B5 | V3 |
| `src/components/sections/contact/**` | B6 | V1 |
| `public/**` | F5 | V2 |
| `README.md`, `docs/**` | Orquestador | — |

Regla: un subagente **solo** toca sus archivos. Si necesita algo de otro dueño, lo declara como dependencia en su reporte final; el orquestador lo resuelve.

---

## Roles del equipo

| ID | Rol | Modelo | Responsabilidad |
|---|---|---|---|
| O | Orquestador | deepseek-v4.1-flash (esta sesión) | Contratos, integración, revisión, README, playbook |
| R1 | Research | gpt-6-luna (OpenCode) | Brief de referencias + stack + interacciones + budgets |
| PG-V1 | Diseño (terminal) | kimi-k3 | Variación Terminal-first |
| PG-V2 | Diseño (scrapbook) | glm-5.3 | Variación Scrapbook (interrumpida; reescrita por O) |
| PG-V3 | Diseño (doodle) | qwen3.8-max | Variación Doodle |
| PG-V4 | Diseño (retro OS) | gpt-6-luna | Variación Retro desktop OS |
| PG-V5 | Diseño (lab) | deepseek-v4-pro | Variación Lab / control panel |
| F2 | Design system | por asignar | Tokens, tema dark/light, tipografía |
| F3 | Content | por asignar | Modelo de contenido tipado + copy |
| F4 | Motion primitives | por asignar | Primitivas de animación con fallback reduced-motion |
| F5 | Assets/SEO | por asignar | Favicon, OG, metadata |
| B1–B6 | Builders | por asignar | Una sección por agente |
| M1–M2 | Motion global | por asignar | Cursor, progreso, easter eggs, coreografía |
| V1–V4 | Validadores | por asignar | A11y, performance, responsive, copy edit |

---

## Olas

### W0 — Reconocimiento ✅ (2026-10-14)
- Repo vacío (solo `.git`), Node 26/pnpm 12 disponibles.
- Proveedores auditados: OpenCode operativo; Claude/Codex sin autenticar.
- Decisiones D1–D5 registradas en README.

### W1 — Research + Dirección de diseño ✅
| Tarea | Agente | Entrega | Criterio de aceptación |
|---|---|---|---|
| Brief de investigación | R1 | `docs/research/BRIEF.md` | Deconstrucción de referencias, versiones de stack, catálogo de 15 interacciones con a11y, budgets numéricos ✅ |
| 3 propuestas visuales | O | `docs/design/proposals.html` | Cada propuesta con identidad completa (paleta, tipografía, hero mockup, interacciones) ✅ |

**Gate W1 ✅:** el usuario eligió dirección **B · Playground** (2026-10-14).

### W1.5 — Variaciones de Playground ✅
| Variación | Agente | Archivo | Idea |
|---|---|---|---|
| V1 Terminal-first | kimi-k3 | `playground/v1-terminal.html` | El hero es una terminal funcional: comandos clicables y salida tipada |
| V2 Scrapbook | glm-5.3 | `playground/v2-scrapbook.html` | Escritorio físico: polaroid, notas adhesivas, washi tape (**la reescribió O** tras interrumpirse) |
| V3 Doodle | qwen3.8-max | `playground/v3-doodle.html` | Ilustración hecha a mano: mascota, marker, burbuja con voz |
| V4 Retro desktop OS | gpt-6-luna | `playground/v4-retro-os.html` | Ventanas y taskbar: el navegador como sistema operativo |
| V5 Lab / control panel | deepseek-v4-pro | `playground/v5-lab.html` | Perillas, palancas, medidor y hoja de especificaciones |

**Gate W1.5 ✅:** 5/5 verificadas en navegador real vía `docs/PLAYBOOK.md` §1 (carga, alto 580px exacto, 0 desbordes tras fix, 0 errores de consola, `prefers-reduced-motion` presente, sin imágenes externas).

### W3 — Construcción de V1 en el proyecto real ✅ (2026-10-14)
El usuario eligió **V1 Terminal-first** como diseño único y definitivo ("me voy a quedar con este diseño solo este").

| Componente | Archivo | Qué hace |
|---|---|---|
| Hero | `src/components/sections/hero.tsx` | Headline con squiggle bajo "human", highlight amarillo en "detail nerd", CTA coral, chip "press K", terminal oscuro con 4 comandos y chips de skills, widget de sonido, fila de stickers, doodles |
| Confetti | `src/components/motion/confetti.tsx` | 42 partículas DOM (sin canvas ni deps), atajo `K`, anunciado `aria-live`, desactivado con reduced-motion |
| Sonido | `src/components/ui/sound-toggle.tsx` | Web Audio opt-in, arranca apagado, blip al hacer clic en links |
| About | `src/components/sections/about.tsx` | Narrativa real (mecatrónica → electricidad industrial → software) + tarjetas de datos |
| Skills | `src/components/sections/skills.tsx` | 5 grupos como "sticker chips" con borde de tinta y sombra dura |
| Work | `src/components/sections/work.tsx` | 4 proyectos con tarjetas, tags y enlaces Code/Live demo |
| Contact | `src/components/sections/contact.tsx` | Email con botón de copia real (clipboard + fallback), CTA, redes |
| Nav | `src/components/layout/site-nav.tsx` | Sticky, sección activa con IntersectionObserver, menú móvil con Escape |
| Footer | `src/components/layout/site-footer.tsx` | Copyright, redes, nota mono |
| 404 | `src/app/not-found.tsx` | Terminal "zsh: command not found" con el código 404 grande |
| SEO | `src/app/sitemap.ts`, `src/app/robots.ts` | Generados (fecha determinista: `new Date(site.year,0,1)`) |

**Gate W3 ✅:** `pnpm typecheck`, `pnpm lint` y `pnpm build` en verde; 4 rutas estáticas.

### W4 — Verificación en navegador real ✅ (2026-10-14)
- Render: headline correcta ("I make the web feel human."), tipografía Bricolage cargada, terminal en #221D2E, sombras duras, sin overflow horizontal.
- **Bug encontrado y corregido:** heading duplicado en About (mismo `id` dos veces) → unificado con `SectionHeading`.
- **Bug encontrado y corregido:** "detail nerd" se renderizaba dos veces en el hero → eliminado el nodo duplicado.
- Confetti: 42 partículas, anunciado a lectores de pantalla, autolimpieza a los 1.5s.
- Tema oscuro: fondo `#17141C`, texto `#F4EDE4`, superficie `#221D2E`, acentos intactos.
- Móvil 375px: sin desbordes, nav colapsa a menú, cierra con Escape.
- 404 / sitemap.xml / robots.txt responden correctamente.

### W5 — Pendiente
Contenido real de Luis (email, ubicación, LinkedIn/X, File-Up-loader, stack de IA), assets (favicon, OG), deploy a Vercel, y auditoría de accesibilidad/performance.
| Tarea | Depende de | Entrega | Archivos |
|---|---|---|---|
| Scaffold Next.js + config | D6 | App corriendo + build verde | raíz del repo |
| F2 Tokens + tema | D6 | Variables CSS + tema dark/light | `globals.css`, `ui/**` |
| F3 Contenido tipado + copy | — | `site.ts` con esquema completo | `content/site.ts` |
| F4 Primitivas de motion | Contrato de tokens | Reveal, Magnetic, Marquee, Tilt, ScrollProgress, SmoothScroll | `components/motion/**` |
| F5 Assets + SEO | D6 | favicon, OG, metadata | `public/**`, `app/layout.tsx` (metadata) |

**Gate W2:** build verde + revisión de tokens por el orquestador.

### W3 — Secciones (paralelo, máximo 6 agentes)
Cada builder recibe: mockup de la dirección elegida, tokens congelados, contrato de primitivas, su contenido de `site.ts` y **solo** su carpeta.

**Gate W3:** cada sección build + typecheck verdes, captura de desktop y móvil; revisión del orquestador contra la propuesta elegida.

### W4 — Interacción global + pulido (paralelo)
| Tarea | Entrega |
|---|---|
| M1 | Cursor contextual, progreso de scroll, easter egg accesible |
| M2 | Coreografía entre secciones, confetti contenido, transiciones de entrada |

**Gate W4:** 60fps percibidos en hardware modesto (sin layout thrash), reduced-motion verificado.

### W5 — Validación (paralelo, independiente)
| Tarea | Entrega | Criterio |
|---|---|---|
| V1 A11y | Reporte | axe sin críticos, teclado completo, contraste AA, semántica |
| V2 Performance | Reporte con mediciones | Lighthouse ≥95/100/100, budgets cumplidos |
| V3 Responsive | Matriz de capturas | 360/768/1024/1440/1920 sin overflow ni solapamientos |
| V4 Copy edit | Diff propuesto | Ortografía, tono, claridad, SEO copy |

**Gate W5:** todo hallazgo corregido o aceptado explícitamente con justificación.

### W6 — Integración final
Bugs, limpieza de código muerto, README final (decisiones + implementaciones), deploy a Vercel, verificación en producción.

---

## Registro de ejecución

| Fecha | Ola | Evento | Resultado |
|---|---|---|---|
| 2026-10-14 | W0 | Recon completo | ✅ |
| 2026-10-14 | W1 | R1 lanzado (async) y propuestas creadas | ✅ Dirección B elegida |
| 2026-10-14 | W1.5 | 5 variaciones delegadas en paralelo | ✅ 4/5 de agentes + V2 reescrita por O; todas verificadas |
| 2026-10-14 | W2 | Scaffold creado (D8) + `typecheck`/`lint`/`build` verdes | ✅ Andamiaje |
| 2026-10-14 | W2 | Esperando elección de variación + entrevista de contenido | ⏳ |
