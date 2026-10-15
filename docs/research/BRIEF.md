# About-Me Portfolio Research Brief

**Research snapshot:** 2026-10-14. Version numbers below are the latest stable registry releases observed on that date; pin them in the lockfile and re-check Next.js security advisories before deployment.

## 1. Reference Deconstruction

### Josh Comeau — About Josh

**Observed patterns**

- **Story/layout:** A long, mostly linear first-person biography. Profile image and short opening establish the person, then career facts, personal details, photos, custom illustrations, projects, talks, and courses unfold in editorial reading order. Inline widgets break up prose without replacing it; links and proof points remain part of the story.
- **Copy voice:** Warm, precise, self-deprecating, and specific. Small asides (“for some reason, this surprises a lot of people”) and honest facts do the work; the page does not rely on generic “creative developer” claims.
- **Contextual controls:** Clickable pride-flag selector, pronunciation audio, imperial/metric height switch, Q/W/E/R soundboard (also keyboard-operated), a cosmetic machine power toggle, and pettable cat illustration. Each control is near the fact or image it personalizes; the page text still makes sense without interacting.
- **Theme/audio:** Site-wide footer controls expose dark mode and sound on/off. Sounds are an optional layer, not the only feedback. The About page describes the controls and their effects.
- **Cursor/easter eggs:** No full custom cursor is evident on this About page. Josh’s homepage has a cursor-responsive rainbow; his own write-up notes a delayed “edit” affordance/configurator easter egg. The About page has discoverable-but-labeled illustrative interactions, not a hidden navigation maze.
- **Accessibility cues:** Images have descriptive alternatives, controls explain their effect in nearby prose, soundboard supports keyboard keys, and the page has ordinary links/forms and linear reading order. Reuse the explicitness, not the exact mechanics.

**Principles to extract, not copy:** Make a control a small demonstration of the person’s actual interests; attach it to a true fact; preserve a readable static version; let keyboard, touch, and pointer users reach equivalent functionality; make sound optional and explain it.

**What makes it memorable**

1. The page reads like a person speaking, with claims grounded in biographical detail.
2. Small interactions reveal personality and craft exactly where they are relevant.
3. The cat, machine, and soundboard turn custom illustration into usable interface, not decoration alone.
4. The content is still a coherent biography when every animation and widget is ignored.
5. Global theme/audio choices and local widget explanations make the whimsy feel intentional rather than a collection of traps.

### Tubik — “Ecotourism Website Home Page” Dribbble shot

**Evidence boundary:** This is a static concept shot, not a runnable prototype. The visual brief and title support a lush nature/editorial direction, but do not establish the original design’s actual scroll behavior or motion timings. Treat motion below as a suitable interpretation, not a claim about the shot.

**Visual language / principles**

- **Type:** Oversized, high-contrast serif headlines carry the emotional voice; smaller, quieter sans-serif copy, labels, and navigation handle utility. Let a few short lines dominate rather than making every section large.
- **Palette:** Use a restrained, nature-led range: warm paper/ivory, deep botanical green, muted leaf/stone neutrals, and one sun-warmed accent. The screenshot is a visual reference, not a source of sampled hex values.
- **Composition:** A clear editorial grid with generous margins, asymmetric image/text balance, and moments where photography can run large. Let a heading sit beside or lightly overlap an image only where legibility is assured; retain whitespace as an active part of the composition.
- **Image treatment:** Place authentic landscapes, plants, places, or human-scale details in deliberate crops with consistent aspect ratios. Favor rich photographic color and depth over stock-photo mosaics, heavy gradients, or decorative foliage unrelated to the story. Reserve a hero image large enough to establish an immediate mood.
- **Motion implied by the concept:** Calm, scroll-paced reveals, image drift/parallax of only a few pixels, and section-to-section color or crop changes could support a journey. Motion should amplify sequence and scale; the screenshot itself does not prove any of these effects.

**What makes it memorable**

1. It signals a subject and mood immediately through organic imagery and a quiet, nature-led palette.
2. A very large serif gives the experience a recognizable editorial voice rather than a generic SaaS-landing-page voice.
3. Contrasting scale between typography and expansive imagery creates a cinematic first impression.
4. Restrained colors and whitespace make lushness feel composed and premium rather than busy.
5. The travel/ecology subject naturally suggests a paced, place-by-place story that a portfolio can translate into a personal career narrative.

## 2. Design Synthesis

Editorial hierarchy should carry the page; interaction earns attention by making the developer’s process and personality tangible. Avoid pasting botanical motifs onto an unrelated identity or reproducing Josh’s widgets. Keep the surface quiet, use real evidence, and spend motion on revealing meaning.

| Pattern | Synthesis | Concrete portfolio example |
|---|---|---|
| **1. Quiet frame, one live detail** | Use a strict editorial grid, large serif hero, measured body copy, and one prominent interactive element at a time. The interaction is the punctuation, not the whole page. | A restrained two-column opening: “I build software that makes complicated things feel simple.” Beside it, a small hand-drawn system diagram responds to one keyboard/pointer control, with a static diagram and caption as the default. |
| **2. Evidence becomes an explorable object** | Pair a factual career/project claim with a light interaction that explains it. Whimsy stays credible because it reveals engineering judgment rather than distracting from it. | A case-study “before → after” slider reveals the real UX or architecture trade-off; an adjacent monospace rail states role, stack, and measurable outcome. Keyboard arrows and labeled range input provide a non-pointer path. |
| **3. Scroll as chaptering, not spectacle** | Borrow the calm pacing and image-led scale of editorial storytelling; use subtle, once-only transitions and persistent landmarks. Make each section independently readable and navigable. | A sticky left-side chapter index tracks “Practice / Selected work / Outside the editor” while the right column advances through short sections and a full-width personal photograph. With reduced motion, the sticky layout remains but all reveals/parallax become static. |

Use expressive details with a reason: a warm accent identifies active states, a custom SVG can annotate a genuine project, and one optional sound can reward an opt-in control. Keep the portfolio’s actual work, contact path, and readable biography more prominent than easter eggs.

## 3. Stack Verification (as of October 2026)

| Package | Latest stable observed | Notes |
|---|---:|---|
| Next.js | **16.4.1** | App Router; Node.js `>=20.9`. Next 16.4 recommends Cache Components for new apps; `create-next-app` defaults include Cache Components. |
| React / React DOM | **19.3.1 / 19.3.1** | Install as a matched pair. Next 16.4 ships with React 19.3; Motion supports React 18.2+. |
| Tailwind CSS | **4.3.3** | CSS-first theme tokens with `@theme`; Next’s PostCSS adapter is the separate `@tailwindcss/postcss` package, also **4.3.3**. |
| Motion | **14.2.0** | Current package is `motion`, replacing the `framer-motion` package/import convention. React imports are from `motion/react` or `motion/react-client`. |
| Lenis | **1.3.26** | React adapter is exported by the same package at `lenis/react`; do not install the old `@studio-freight/react-lenis` package for a new project. |

**Minimal npm setup**

```bash
npx create-next-app@latest about-me --yes
cd about-me
npm install next@16.4.1 react@19.3.1 react-dom@19.3.1 tailwindcss@4.3.3 @tailwindcss/postcss@4.3.3 postcss motion@14.2.0 lenis@1.3.26
npm run dev
```

`create-next-app --yes` supplies TypeScript, ESLint, App Router, Tailwind, Turbopack, and the default alias. The explicit install pins the verified versions; retain the lockfile. Its generated `postcss.config.mjs` should enable `@tailwindcss/postcss` (for a manual setup: `export default { plugins: { "@tailwindcss/postcss": {} } }`). Load the selected variable fonts once and attach their variables to the root `<html>` element:

```tsx
// app/fonts.ts
import { Fraunces, IBM_Plex_Mono, Manrope } from "next/font/google";

export const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});
export const body = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});
export const code = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});
```

Apply the three `.variable` values to the root `<html>` `className` in `app/layout.tsx`; then map them to Tailwind utilities in the imported global CSS:

```css
@import "tailwindcss";

@theme inline {
  --font-display: var(--font-fraunces);
  --font-sans: var(--font-manrope);
  --font-mono: var(--font-ibm-plex-mono);
  --color-paper: #f3f0e7;
  --color-ink: #202923;
  --color-forest: #355b45;
}
```

The `--color-*`, `--font-*`, and `--text-*` namespaces create utilities; use ordinary `:root`/`[data-theme]` CSS variables for theme values not intended to map to Tailwind utilities.

**Motion + Lenis integration**

- Use `motion/react` in small Client Components for event-driven gestures/state. In compatible server-rendered pieces, `motion/react-client` can avoid turning the whole component into a client boundary. Prefer tree-shakeable imports and animate transforms/opacity. Motion 14.0 itself reports no breaking React API changes; its notable October 2026 additions include hardware-accelerated independent transforms in 14.2.0.
- For Lenis, import `ReactLenis`/`useLenis` from `lenis/react` and `lenis/dist/lenis.css`. Put the root instance in one small `"use client"` component mounted by the App Router root layout; do not instantiate once per section or run an extra RAF loop when the adapter already owns it. If using the vanilla class instead, set up/cancel its RAF and destroy the instance in the Client Component lifecycle.
- Keep anchors and browser scroll semantics working. Configure anchor handling if Lenis should smooth in-page links (`anchors: true`); `stopInertiaOnNavigate: true` is available to prevent momentum carrying across internal navigation. Retain native scroll on touch unless testing establishes an accessible reason otherwise.
- Lenis 1.3.26 respects `prefers-reduced-motion` by default: smoothing and programmatic scroll animation are disabled under the preference. Do not opt out. Check nested scroll areas (use `data-lenis-prevent` when appropriate), modal locking, hash/anchor offsets, route changes, Safari, and iOS before shipping.

**Breaking changes / pitfalls**

- **Next 16:** Node 20.9+; asynchronous request APIs and other 16 migration changes apply; Turbopack is the default; `next build` no longer runs lint automatically, so CI must invoke lint/typecheck explicitly. Cache Components are opt-out/default for new scaffolds, so follow the new caching boundaries instead of assuming older implicit App Router cache behavior. Check the October 14, 2026 security bulletin before deploy and remain on the patched 16.4 line.
- **Tailwind 4:** Use `@import "tailwindcss"`, not the v3 `@tailwind base/components/utilities` directives. The PostCSS integration moved to `@tailwindcss/postcss`; JavaScript config is not auto-detected (explicit `@config` only for legacy migration). `@theme` must be top-level. Tailwind 4 targets Safari 16.4+, Chrome 111+, and Firefox 128+; stay on 3.4 only if older browser support is mandatory. Review changed utilities/defaults, including ring width/color, outline behavior, `space-*`, border defaults, hover-on-touch, and the rename of `shadow-sm` semantics.
- **Motion:** Remove `framer-motion` and change imports to `motion/react`; avoid having both packages installed. Motion works with React 18.2+, but use matching React 19.3 versions with this Next release. For App Router, event handlers require a client boundary; `motion/react-client` is the server-compatible entry for supported declarative animation.
- **Lenis:** This is an enhancement over native scroll, not a prerequisite. A duplicated RAF loop, duplicate instances during route changes, stale inertia, blocked hash links, nested scrolls, or over-aggressive touch smoothing can make navigation feel broken. Lenis is capped at 60fps on Safari (and 30fps low-power mode); do not use it to disguise scroll-jank.
- **`next/font`:** It self-hosts Google Font files; the Google CSS/font fetch occurs at build time, not in the visitor’s browser. A disconnected/restricted build environment can fail if a Google font import cannot be fetched, so either verify build network access or ship the font locally with `next/font/local`. Prefer variable fonts, `subsets: ["latin"]`, `display: "swap"`, `adjustFontFallback`, and only preload the fonts used above the fold. Avoid loading three full families/weights globally.
- **Vercel:** Import the Git repository or use `vercel` CLI; Next.js is auto-detected, so preserve default framework/build/output settings unless a real need requires customization. A mostly static portfolio can use the static shell/CDN path while keeping App Router defaults. Do not set `output: "export"` unless deliberately accepting the limitations of static export. Preview deployments on pull requests are useful for checking animation, fonts, and mobile layout; monitor real-user Core Web Vitals separately from Lighthouse lab runs.

## 4. Interaction Catalog

Complexity is for a polished, robust implementation, not a demo. Every effect needs a useful static/fallback state; interaction is an enhancement, never a prerequisite for content or navigation.

| Interaction | Behavior / implementation | Complexity | Accessibility and reduced-motion behavior |
|---|---|:---:|---|
| **Scroll reveal** | Reveal section headings/images once with `IntersectionObserver` or Motion `whileInView`; `opacity` + small `y`. | S | Content is present in DOM and reading order without JS; no hidden-on-load text. Under reduce, render visible immediately. |
| **Parallax image** | Move a decorative image layer a small distance from scroll progress using Motion `useScroll`/`useTransform` or CSS scroll-driven animation. | M | Never convey unique information with motion; keep foreground fixed and image alt intact. Disable on reduce, touch, and low-power layouts. |
| **Magnetic CTA** | On hover-capable pointer, move decorative button content slightly toward pointer; Motion values or RAF-updated CSS variables. | M | Use a real `<a>`/`<button>` with normal focus outline and hit area; no magnetism on keyboard/touch; reduce = no displacement. |
| **Custom cursor accent** | Optional small cursor-following dot/label on desktop using pointer coordinates and one RAF; never replace the OS pointer. | M | `aria-hidden`, `pointer-events:none`; native cursor remains. Disable for touch, keyboard-only, coarse pointers, and reduced motion. |
| **Tilt project card** | Subtle perspective/rotation computed from pointer position; reset on leave. | M | Card remains a link/button with visible focus; no tilt on touch/keyboard, no meaning encoded in angle; reduce = static card. |
| **Editorial marquee** | Slow looping project keywords or a personal line using CSS keyframes or Motion. | M | Duplicate line is `aria-hidden`; expose one static equivalent. Pause control for prolonged auto-motion; pause on focus/hover; stop under reduce. |
| **Text decode/scramble** | On user action, briefly decode a decorative label with JS/Motion, then settle to real text. | M | Keep a stable accessible name (`aria-label` or visually hidden text); don't scramble the only heading/copy. Reduced motion = instant final label. |
| **Confetti reward** | Small canvas/SVG burst after an explicit action (e.g. copy email), not on page load. | S–M | Mark particles decorative; announce the real result (“Email copied”) through a polite live region. No burst under reduce; don't block focus. |
| **Page/section transition** | Crossfade or shared-element transition for a project detail/modal, using Motion `AnimatePresence`/layout or React 19.3 View Transitions where route support is sound. | L | Preserve URL/history, focus, heading order, and back behavior. Reduced motion = instant change; avoid delaying navigation. |
| **Command palette** | `Ctrl/⌘K` or `/` opens searchable links to sections, work, and contact; JS index plus Motion opacity transition. | M | Native dialog or correctly managed dialog, focus trap/return, Escape, arrow/Enter, labeled results. Opens without motion under reduce. |
| **Scroll progress** | A thin top/side bar tracks page or chapter progress using Motion `useScroll` or CSS scroll timeline. | S | Mark decorative or use `<progress aria-label="Page reading progress">`; don't rely on color alone. Reduced motion can update directly with no easing. |
| **Sticky storytelling** | A sticky chapter title/index remains while adjacent biography or project story advances; CSS `position: sticky` first, Motion only for chapter indicator. | M | Keep DOM order logical; no scroll-jacking. On narrow screens unstick/collapse to ordinary flow; on reduced motion preserve layout, remove animated transitions. |
| **Inline fact toggle** | Toggle a meaningful detail (metric/imperial, work mode/time zone, or short “why this tool” explainer). | S | Native labeled button/switch; announce changed value; keyboard/touch equivalent. Reduced motion = immediate value swap. |
| **Audio detail / soundboard** | A small opt-in sound preview tied to a true fact or instrument/tool; Web Audio or short local audio, explicit global mute. | M | Never autoplay; initialize only after a user gesture; visible mute state and text alternative. Under reduce, sound remains user-controlled; sound-off default is safest. |
| **Theme switch** | System-aware light/dark theme with manual override persisted locally; CSS custom properties drive colors. | M | Labeled button, visible focus, correct `color-scheme`; avoid hydration flash with safe early theme initialization. No animated full-screen wipe under reduce. |
| **Image annotation/reveal** | Click/focus a project/photo marker to reveal a caption, technical note, or alternate crop using Motion opacity/clip reveal. | M | Provide button and descriptive text in DOM; keyboard toggles it; image alt describes image, caption carries detail. Reduced motion = show/hide immediately. |

**Prioritize for the first release:** scroll reveal (subtle), sticky chapters, progress indicator, one evidence-based inline widget, theme toggle. Add cursor, marquee, sound, and text effects only after mobile, keyboard, reduced-motion, and performance checks.

## 5. Performance + Accessibility Budget

**Targets**

| Measure | Target |
|---|---:|
| Core Web Vitals at 75th percentile, separately on mobile and desktop | **LCP ≤ 2.5 s; INP ≤ 200 ms; CLS ≤ 0.10** |
| Internal goal (mobile Lighthouse lab, cold cache) | **LCP ≤ 2.0 s; CLS ≤ 0.05; TBT ≤ 200 ms** (TBT is a lab proxy; Lighthouse cannot measure field INP without real interaction) |
| Lighthouse CI (mobile, representative production URL) | **Performance ≥ 95; Accessibility 100; Best Practices ≥ 95; SEO 100**. Treat as a regression guard; verify with field data too. |
| Initial route JavaScript | **≤ 100 KB gzip total**, with **≤ 50 KB gzip of portfolio-specific client JS** as the working budget. Keep Lenis and gesture-heavy modules out of routes/sections that do not need them. |
| Critical first-view transfer | **≤ 700 KB compressed** (HTML/CSS/JS/fonts/hero image); hero image target **≤ 250 KB** AVIF/WebP at actual rendered dimensions; above-fold fonts combined **≤ 100 KB**. |
| Third-party scripts | **0 by default**, no more than 1 justified provider; defer nonessential analytics until consent/idle and measure its cost. |

CWV “good” thresholds are official field thresholds (75th percentile), not Lighthouse scores: LCP 2.5 s, INP 200 ms, CLS 0.1. Use RUM/CrUX once traffic exists; do not claim lab TBT is INP. Use Lighthouse in CI to catch regressions, not as a replacement for field performance.

**Animation rules**

- Prefer `transform` and `opacity` for continuous animation. Avoid animating `top/left`, dimensions, margins, or other layout properties unless the effect’s small, measurable cost is necessary. Blur/filter, large shadows, masks, and full-screen compositing can also be expensive.
- Avoid layout thrash: batch geometry reads before writes; use Motion values/CSS variables rather than React state for per-frame pointer/scroll updates; throttle raw pointer/scroll work to a single `requestAnimationFrame`.
- Do not blanket-apply `will-change`. Apply only to a small number of elements shortly before an animation and remove it after; permanent layers consume memory and can change stacking behavior.
- Trigger viewport effects with Intersection Observer/Motion viewport tracking, animate once where possible, pause continuous animation when offscreen (`IntersectionObserver`) and when the document is hidden (`visibilitychange`). Avoid dozens of independent requestAnimationFrame loops.
- Size/reserve image and widget space in layout; use responsive `next/image` dimensions/`sizes`, AVIF/WebP, and lazy-load below-fold photography. Do not lazy-load the LCP hero; prioritize it. Avoid video backgrounds unless a still image cannot tell the story.
- Keep text legible and present before animation; no intro gate, loading curtain, or long blocking sequence. Essential section content must not depend on animation hydration.

**Reduced motion and a11y policy**

- Default to `prefers-reduced-motion: reduce` for all decorative entrance, parallax, cursor follower, tilt, marquee, confetti, page wipes, and spring overshoot: render a still state or an instant state change. Lenis 1.3.26 already respects this; also gate custom Motion/JS effects via MotionConfig/useReducedMotion or `matchMedia` and CSS media queries.
- Honor preference changes while the page is open. Provide a visible site-level motion toggle only if the design has meaningful persistent motion; never override the OS request without an explicit user choice.
- For self-running movement lasting over five seconds, provide a visible pause/stop control. Never flash content above three times per second. Sound is never autoplayed and never the sole feedback channel.
- Preserve keyboard operation, visible `:focus-visible`, semantic links/buttons, meaningful alt text, contrast, reduced-motion testing, and screen-reader announcement only for actual state changes. Decorative motion is `aria-hidden`; do not announce every frame.

## 6. Typography + Palette Directions

All three sets are Google Fonts families suitable for `next/font/google` and local self-hosting. Import as variable fonts where available, set only Latin subsets needed, and verify generated font downloads at build time. Use no more than two expressive families plus mono; a system mono may replace a third downloaded family.

| Display | Body | Mono | Rationale |
|---|---|---|---|
| **Fraunces** | **Manrope** | **IBM Plex Mono** | Recommended direction: warm, slightly idiosyncratic display serif for an editorial voice; crisp, contemporary body copy; mono feels technical without making the whole page look like a terminal. |
| **Cormorant Garamond** | **DM Sans** | **Space Mono** | High-contrast literary/editorial feel; use generous size and line spacing to keep the narrow, delicate display face legible. DM Sans neutralizes it; Space Mono adds a restrained archival/technical note. |
| **Newsreader** | **Source Sans 3** | **JetBrains Mono** | More publication-like and legible over long reading; Source Sans 3 is calm and robust at small sizes; JetBrains Mono keeps project metadata/code cues familiar. |

**Type scale:** Hero display roughly `clamp(3rem, 8vw, 7.5rem)` with tight line-height and carefully limited measure; section heads `clamp(2rem, 4vw, 4rem)`; body `1.0625–1.1875rem` at `1.55–1.7` line-height; metadata `0.75–0.875rem` with sufficient contrast. Use editorial line breaks only where they remain natural on mobile; use `text-wrap: balance` for short headings, not long paragraphs.

**Adaptive palette direction**

- Light base: paper `#F3F0E7`, raised surface `#E8E5DA`, primary ink `#202923`, secondary ink `#59645B`, forest `#355B45`, small warm accent clay `#B85F43` or ochre `#9B702F`.
- Dark base: forest-charcoal `#171D19` (not pure black), raised surface `#232B25`, primary warm text `#EAE8DE`, secondary text `#B5B9AA`, botanical highlight `#A6C28D`, clay accent `#D58A69`.
- Treat these as starting tokens, not asserted contrast pairs: verify each foreground/background combination to WCAG AA (4.5:1 normal text, 3:1 large text/UI graphics as applicable), including focus rings, hover, visited links, and disabled states. Keep accent colors sparse and avoid low-contrast green-on-green.
- Derive both themes as coordinated palettes rather than mechanically inverting colors. Respect system theme initially, expose a clear manual toggle, persist the override, and avoid theme-dependent text that causes hydration mismatch. Use `color-scheme` so native controls follow the active theme.

## 7. Sources

URLs actually consulted for the reference observations, release versions, integration, performance, accessibility, and font availability:

- Josh Comeau About page: https://www.joshwcomeau.com/about-josh/
- Josh Comeau, “How I Built My Blog: 2024 App Router Edition” (interactive rainbow and widget context): https://www.joshwcomeau.com/blog/how-i-built-my-blog-v2/
- Josh Comeau interview on interactions and sound: https://www.epicreact.dev/bonuses/epic-react-expert-interviews/animations-and-interactions-with-josh-comeau
- Tubik Ecotourism Dribbble shot: https://dribbble.com/shots/11919522-Ecotourism-Website-Home-Page
- Next.js 16.4 release: https://nextjs.org/blog/next-16-4
- Next.js blog (October 2026 security-update notice): https://nextjs.org/blog
- Next.js App Router installation and defaults: https://nextjs.org/docs/app/getting-started/installation
- Next.js font optimization: https://nextjs.org/docs/app/api-reference/components/font
- npm stable package metadata: https://registry.npmjs.org/next/latest, https://registry.npmjs.org/react/latest, https://registry.npmjs.org/react-dom/latest, https://registry.npmjs.org/tailwindcss/latest, https://registry.npmjs.org/%40tailwindcss%2fpostcss/latest, https://registry.npmjs.org/motion/latest, https://registry.npmjs.org/lenis/latest
- Tailwind CSS Next.js installation: https://tailwindcss.com/docs/installation/framework-guides/nextjs
- Tailwind CSS v4 theme variables: https://tailwindcss.com/docs/theme
- Tailwind CSS v3-to-v4 upgrade guide: https://tailwindcss.com/docs/upgrade-guide
- Motion changelog: https://motion.dev/changelog
- Motion React installation: https://motion.dev/docs/react-installation
- Motion React component / App Router entry points: https://motion.dev/docs/react-motion-component
- Motion upgrade guide (including 14.0 and package rename): https://motion.dev/docs/react-upgrade-guide
- Lenis README and options/reduced-motion behavior: https://github.com/darkroomengineering/lenis
- Lenis React binding: https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md
- Vercel Next.js deployment, fonts, image optimization, and Cache Components: https://vercel.com/docs/frameworks/nextjs
- Core Web Vitals thresholds: https://web.dev/articles/defining-core-web-vitals-thresholds
- Lighthouse performance budgets: https://web.dev/articles/use-lighthouse-for-performance-budgets
- WCAG understanding: Animation from Interactions: https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
- Google Fonts family pages: https://fonts.google.com/specimen/Fraunces, https://fonts.google.com/specimen/Manrope, https://fonts.google.com/specimen/IBM+Plex+Mono, https://fonts.google.com/specimen/Cormorant+Garamond, https://fonts.google.com/specimen/DM+Sans, https://fonts.google.com/specimen/Space+Mono, https://fonts.google.com/specimen/Newsreader, https://fonts.google.com/specimen/Source+Sans+3, https://fonts.google.com/specimen/JetBrains+Mono
