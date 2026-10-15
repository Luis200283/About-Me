# About-Me — Portafolio personal

Landing page personal de **Luis**, desarrollador de software: editorial, sofisticada y profundamente interactiva. Construida con **Next.js + Tailwind CSS + Motion**, orquestada por un **workflow multi-agente** con validación independiente.

> Estado: `W0 ✅ · W1 ✅ (brief + 3 propuestas) · W1.5 ✅ (5 variaciones Playground verificadas) · W3 🔄 (4 mezclas V1+V2+V3 en paralelo) · W2 ✅ (scaffold + tokens + contenido real + build verde)`

---

## 1. Visión

Que quien entre quiera quedarse: narrativa clara (quién soy → qué hago → qué he construido → cómo contactarme), calidad visual de estudio y micro-interacciones con carácter. La página debe sentirse **hecha a mano**, no plantilla.

Referencias canónicas (extraer principios, nunca copiar):

| Referencia | Qué tomamos |
|---|---|
| [Josh Comeau — About](https://www.joshwcomeau.com/about-josh/) | Interactividad con encanto: easter eggs, widgets propios, copy con voz propia, celebración del detalle |
| [Tubik — Ecotourism Home Page](https://dribbble.com/shots/11919522-Ecotourism-Website-Home-Page) | Elegancia editorial: tipografía serif a gran escala, formas orgánicas, ritmo calmo, narrativa por scroll |

**Fusión objetivo:** editorial sofisticado + interactividad con humor. Que se vea premium y se sienta vivo.

---

## 2. Registro de decisiones (ADR)

| # | Decisión | Elección | Alternativas consideradas | Razón | Estado |
|---|---|---|---|---|---|
| D1 | Stack | Next.js (App Router) + TypeScript + Tailwind CSS v4 + Motion + Lenis | Astro, Vite/React SPA, HTML puro | Máxima expresividad para animación + SEO/SSG + deploy trivial en Vercel | ✅ |
| D2 | Idioma del sitio | Inglés | Español, bilingüe ES/EN | Alcance internacional (mercado tech) | ✅ |
| D3 | Deploy | Vercel | GitHub Pages, Netlify, local | CI/CD con `git push`, previews por rama, dominio gestionado | ✅ |
| D4 | Gestión de contenido | Fuente única tipada `src/content/site.ts` | Copy embebido por componente | Sustituir placeholders por contenido real sin tocar la UI | ✅ |
| D5 | Workflow | Olas paralelas de subagentes con propiedad de archivos y validación cruzada | Desarrollo secuencial monolítico | Velocidad + calidad + revisión independiente | ✅ |
| D6 | Dirección de diseño | **B · Playground** (elegida por el usuario: orgánica, con personalidad y atrapa a la vista) | Verdant, Studio | El usuario priorizó impacto inmediato, calidez y personalidad sobre sobriedad | ✅ |
| D7 | Variación Playground | **Mezcla V1+V2+V3** (indicación del usuario) | V1, V2, V3 aisladas | Pidió una sola página scrollable que combine terminal + scrapbook + doodle | ⏳ |
| D8 | Scaffold | Next.js **16.4.0** + React **19.3.0** + Tailwind **4.3.3** + Motion **14.2.0** + Lenis **1.3.26** | versiones menores | Verificado en `docs/research/BRIEF.md` §3 y build verde de referencia | ✅ |
| D9 | Idioma de los mockups | Inglés (mismo idioma del sitio) | — | Coherencia con D2; los placeholders se sustituyen por contenido real sin tocar UI | ✅ |
| D10 | Posicionamiento | **Fullstack Engineer · IA Engineer** (explícitamente "no junior") | Junior / en formación | Instrucción directa del usuario; cambia todo el tono de la narrativa | ✅ |
| D11 | Narrativa | Trayectoria de ingeniero: electrónica → mecatrónica → electricidad industrial → software | Narrativa genérica de dev | Diferenciador real y creíble; respaldado por hechos verificables | ✅ |
| D12 | Personaje / mascota | **Sin mascota** — el diseño ganador es V1 "Terminal-first" | Mascota doodle (V3), mascota ruda | El usuario eligió V1 como diseño único y definitivo | ✅ |
| D13 | Sonido | Web Audio opt-in, **siempre apagado al cargar**, sin persistir | Persistir en localStorage | "Nunca autoplay" es la regla; cada visita vuelve a aceptar | ✅ |
| D14 | Atajo de teclado | `K` dispara confetti + anunciado `aria-live` | Solo visual | Efectos nunca exclusivamente visuales | ✅ |

---

## 3. Alcance v1

**Secciones:** Hero · About · Skills/Stack · Projects (3–6) · Experience (timeline) · Contact + Footer.

**Global:** dark/light adaptativo, smooth scroll, respeto de `prefers-reduced-motion`, SEO + Open Graph, favicon e imagen OG, página 404 personalizada, navegación por teclado.

**Fuera de v1 (backlog):** blog/MDX, i18n, CMS, analítica con consentimiento.

---

## 4. Arquitectura (propuesta)

```
src/
├── app/                  # App Router: layout, page, metadata, sitemap, 404
├── components/
│   ├── layout/           # Nav, Footer, ThemeProvider
│   ├── sections/         # Hero, About, Skills, Projects, Experience, Contact
│   ├── motion/           # Primitivas: Reveal, Magnetic, Marquee, Tilt, ScrollProgress
│   └── ui/               # Button, Tag, Card, Toggle (presentacionales)
├── content/site.ts       # FUENTE ÚNICA de contenido (tipada)
└── lib/                  # utilidades (cx, hooks, constantes)
```

Principios:
- **Contenido desacoplado:** ningún componente escribe copy propio; todo sale de `site.ts`.
- **Motion centralizado:** cada efecto tiene su primitiva en `components/motion` con fallback automático de reduced-motion.
- **Tokens primero:** paleta/tipografía/espaciado como variables CSS en `globals.css` (Tailwind v4 `@theme`), sin hex sueltos en componentes.

---

## 5. Interacciones planeadas (shortlist)

Selección final tras W1 (ver `docs/research/BRIEF.md`):

- Reveals al scroll (progressive disclosure por secciones)
- Parallax sutil en elementos decorativos
- Botones magnéticos y hover con resorte
- Cursor personalizado contextual (desktop)
- Tarjetas con tilt/spotlight en Projects
- Marquee tipográfico en Skills/stack
- Contadores animados en stats
- Barra de progreso de lectura
- Easter egg(s) tipo Josh Comeau (descubrible, opcional, accesible)
- Celebración al copiar email / conectar (confetti contenido)

---

## 6. Workflow de orquestación

Yo actúo como **orquestador**: defino contratos y acepto trabajo; los subagentes construyen o validan tareas acotadas. Plan completo en **[docs/PLAN.md](docs/PLAN.md)**.

| Ola | Contenido | Paralelismo |
|---|---|---|
| W0 | Reconocimiento + decisiones | — |
| W1 | Research (R1) + 3 propuestas de diseño | R1 ∥ Orquestador |
| W1.5 | 5 variaciones de la dirección Playground (V1–V5) | 5 subagentes ∥ (4 modelos distintos) |
| W2 | Fundaciones: scaffold, tokens, contenido, UI base | Orquestador (tocado: tokens críticos) |
| W3 | 4 mezclas V1+V2+V3 en UNA página scrollable | 4 subagentes ∥ (4 modelos distintos) |
| W4 | Secciones/pulido sobre la mezcla ganadora | hasta 6 ∥ |
| W5 | Validación: a11y, performance, responsive, copy edit | 4 ∥ |
| W6 | Integración final, limpieza, README, deploy Vercel | Orquestador |

Cada tarea delegada incluye: **archivos de propiedad exclusiva**, criterios de aceptación y evidencia obligatoria (lint/typecheck + captura o medición). Quien construye **no valida su propio trabajo**: la validación es una ola independiente.

**Lecciones aplicadas de W1.5 (por qué el workflow debe cambiar):**
1. Los subagentes de diseño se interrumpieron con frecuencia por el límite de 12 KB: el brief de diseño debe bajar el listón de tamaño y priorizar terminación sobre complejidad.
2. Para exponer los mockups hubo que montar un servidor local + navegador colaborativo: se documenta el procedimiento reutilizable en `docs/PLAYBOOK.md`.

---

## 7. Gates de calidad (definition of done)

- `pnpm lint` y `pnpm typecheck` sin errores; `pnpm build` verde.
- Lighthouse (móvil): ≥95 Performance, 100 A11y, 100 SEO — se documenta la medición real.
- WCAG AA en contraste; foco visible; toda interacción operable por teclado.
- `prefers-reduced-motion` respetado en cada efecto.
- Responsive 360 → 1920 sin overflow horizontal.
- Cero errores/warnings de consola en runtime.

---

## 8. Cómo correr localmente

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Verificaciones disponibles: `pnpm typecheck`, `pnpm lint`, `pnpm build`.

---

## 9. Estado del proyecto

- [x] W0 — Recon: repo vacío, entorno verificado (Node 26, pnpm 12), proveedores de orquestación auditados
- [x] W1 — Brief de investigación (R1) + 3 propuestas → dirección **B · Playground** elegida por ti
- [x] W1.5 — 5 variaciones Playground (V1–V5) verificadas en navegador, 5/5 render correcto
- [x] W1.5b — 5 mezclas V1+V2+V3 en UNA página scrollable (MIX 1–5), 10/10 verificadas
- [x] W2 — Scaffold + tokens + secciones (Hero, About, Skills, Work, Contact) + nav + 404 + robots/sitemap, todo con build/typecheck/lint verdes
- [x] W3 — Lenguaje **V1 Terminal-first** construido en el proyecto real (terminal viva, squiggle, stickers, confetti, sonido)
- [x] W5 (parcial) — Auditoría a11y del sitio real + 3 defectos corregidos (contraste, targets táctiles, glifo en H3)
- [x] W5b — **Auditoría de contraste en ambos temas** con medidor propio (Oklab→sRGB, AA 4.5/3.0). 3 defectos reales más: la terminal se invertía en dark (`bg-ink` → 1.43:1, ahora `--color-terminal` no tematizado), texto heredado sobre amarillo en dark (1.31:1 → `text-on-accent`), y texto `sr-only` invisible. **Resultado: 0 fallos en claro y 0 en oscuro**
- [ ] **Tu decisión: mezcla ganadora** (MIX 1–5) ← único bloqueo real
- [ ] W4 — Aplicar la mezcla ganadora + cinemática (timing, resortes, marquee, tilt)
- [ ] W4b — Contenido real pendiente: email, ubicación, LinkedIn/X, foto, detalle de File-Up-loader, stack de IA
- [ ] W5 (resto) — Lighthouse / performance + copy edit
- [ ] W6 — Deploy a Vercel + bio de GitHub

---

## Despliegue

**Producción:** https://about-me-two-zeta.vercel.app

| Dato | Valor |
|---|---|
| Proyecto Vercel | `about-me` (scope `luishernandezopsu2019-5472s-projects`) |
| Deploy | vía Vercel CLI (`vercel --prod --yes`) |
| Build | Next.js 16.4.0 · Turbopack · Cache Components |
| Verificado | `200` home, `404` controlada, `200` robots/sitemap, CSS 34.6 KB |

**Dominio propio `luishswe.com`** — ya añadido al proyecto con `vercel domains add luishswe.com`.
Vercel responde *"not configured properly"*: falta el DNS. Comprado en **Namecheap**.

**Opción A — registrar un A (recomendada; conservas los DNS de Namecheap):**

1. https://ap.www.namecheap.com/ → *Domain List* → `luishswe.com` → **Manage** → pestaña **Advanced DNS**.
2. En *Host Records*, agrega:

| Type | Host | Value | TTL |
|---|---|---|---|
| `A Record` | `@` | `76.76.21.21` | Automatic |
| `CNAME Record` | `www` | `cname.vercel-dns.com` | Automatic |

3. Guarda. Vercel verifica y emite el certificado TLS solo (minutos).

**Opción B — delegar el DNS a Vercel** (gestionas todo desde Vercel):

| Campo | Valor |
|---|---|
| Nameserver 1 | `ns1.vercel-dns.com` |
| Nameserver 2 | `ns2.vercel-dns.com` |

En Namecheap: *Domain* → *Manage* → **Nameservers** → *Custom DNS*.

**Comprobar:**
```bash
dig +short luishswe.com A          # debe salir 76.76.21.21
curl -sI https://luishswe.com | head -1
```

**Auto-deploy con Git:** el proyecto ya está **conectado** a https://github.com/Luis200283/About-Me.
El commit `e926d96` está solo en local; al hacer `git push -u origin main` cada push a `main`
volverá a desplegar automáticamente.

---

## 11. Pendiente para la próxima sesión

1. **Elección de la mezcla ganadora** (MIX 1–5 en `docs/design/playground/`).
2. Contenido real: email, ubicación, LinkedIn/X, foto, detalle de `File-Up-loader`, stack de IA.
3. `git push -u origin main` para activar el auto-deploy.
4. Dominio propio + OG image.

| Fecha | Hito |
|---|---|
| 2026-10-14 | W0: recon, decisiones D1–D5, lanzamiento de R1 (research) y creación de las 3 propuestas de diseño |
| 2026-10-14 | W1: brief de investigación completado (versiones de stack verificadas, catálogo de 15 interacciones con a11y, budgets numéricos); 3 propuestas de diseño renderizadas; dirección **B · Playground** elegida por el usuario |
| 2026-10-14 | W1.5: 5 variaciones Playground producidas en paralelo (V1 Terminal, V2 Scrapbook, V3 Doodle, V4 Retro OS, V5 Lab) y verificadas una por una en navegador real (0 errores de consola, `prefers-reduced-motion` presente, sin imágenes externas) |
| 2026-10-14 | Scaffold Next.js 16.4.0 + React 19.3.0 + Tailwind 4.3.3 + Motion 14.2.0 + Lenis 1.3.26 sobre el repo, con `typecheck`/`lint`/`build` verdes y `pnpm add motion lenis` versionado |
| 2026-10-14 | W2/W3: scaffold, tokens Playground, tema claro/oscuro, secciones (Hero, About, Skills, Work, Contact), nav sticky con menú móvil, 404, robots, sitemap, confetti y sound toggle — todo con build/typecheck/lint verdes |
| 2026-10-14 | W6: commit inicial `e926d96` (63 archivos) y **deploy a producción en Vercel** — https://about-me-two-zeta.vercel.app. Proyecto `about-me` creado y conectado a GitHub; verificado home/404/robots/sitemap y CSS en producción |
| 2026-10-15 | W5b — Auditoría de contraste en ambos temas con medidor propio en navegador. Corregidos: terminal que se invertía en dark (`bg-ink` → tokens `--color-terminal*` no tematizados), texto heredado sobre superficies amarillas en dark (→ `text-on-accent`), y texto `sr-only` invisible en el toggle de tema. Resultado: **0 fallos de contraste en claro y 0 en oscuro** |
