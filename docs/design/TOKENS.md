# Tokens de diseño — Dirección "Playground" (congelados en W2)

Especificación vinculante para todos los builders. Ningún componente introduce colores, fuentes ni duraciones fuera de aquí.

## Paleta

| Token | Valor | Uso |
|---|---|---|
| `--color-paper` | `#FFF6EC` | Fondo base (light) |
| `--color-surface` | `#FFFFFF` | Tarjetas y ventanas |
| `--color-ink` | `#221D2E` | Texto principal, bordes |
| `--color-coral` | `#FF5C7A` | Acento primario, CTA |
| `--color-sun` | `#FFC95C` | Resaltados, stickers |
| `--color-violet` | `#8B7CFF` | Acento de apoyo |
| `--color-mint` | `#3FC7A9` | Éxito, detalles mono |
| `--color-muted` | `#574E63` | Texto secundario |
| `--color-line` | `rgba(34,29,46,.16)` | Bordes suaves |

**Tema oscuro (borrador, se valida contraste en W5):** base `#17141C`, superficie `#221D2E`, texto `#F4EDE4`, secundario `#B9AFC7`, línea `rgba(244,237,228,.16)`. Coral, sol, violeta y menta se mantienen; se verifican ratios AA.

## Tipografía

| Rol | Familia | Pesos | Variable next/font |
|---|---|---|---|
| Display | Bricolage Grotesque | 600–750 | `--font-display` |
| Texto | Inter | 400–600 | `--font-sans` |
| Mono | JetBrains Mono | 400–500 | `--font-mono` |

Escala: hero `clamp(2.75rem, 6vw, 4.5rem)` (line-height 1.02–1.06, letter-spacing -0.02em); h2 `clamp(2rem, 4vw, 3rem)`; cuerpo `1.0625–1.1875rem` / 1.6; etiqueta mono `0.6875rem`, uppercase, tracking `0.14em`.

## Formas y espaciado

- Radios: pill `999px`, tarjetas/ventanas `14px`, chips `10px`.
- Bordes: `1.5px solid var(--color-ink)`.
- Sombra dura offset: `3px 3px 0 var(--color-ink)`; CTA principal `6px 6px 0`.
- Rotaciones decorativas permitidas: `-5deg` a `5deg` (solo decorativo, nunca sobre texto corrido).
- Ritmo vertical: secciones `clamp(4rem, 10vw, 8rem)`.

## Movimiento

- Duraciones: micro `180ms`, entrada `320ms`, reveal de sección `600–900ms`.
- Easing: `cubic-bezier(.22,1,.36,1)` para entradas; resortes (spring) para hover/tilt.
- Reglas: solo `transform` y `opacity`; sin animar layout; una sola lectura de geometría por frame; pausar animaciones fuera de viewport; **todo desactivado bajo `prefers-reduced-motion: reduce`**.

## Voz

Primera persona, cálida, con humor seco y específico. Frases cortas, verbos concretos, cero clichés ("apasionado por la tecnología" queda prohibido).
