"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Single root Lenis instance (per docs/research/BRIEF.md §3):
 * never instantiate one per section. Lenis 1.3.26 already respects
 * `prefers-reduced-motion`, so the fallback is built in.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        anchors: true,
        stopInertiaOnNavigate: true,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
