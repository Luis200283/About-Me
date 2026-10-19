"use client";

import { useEffect, useState } from "react";
import { playUiClick, setSfxEnabled } from "@/lib/sfx";
import { cn } from "@/lib/utils";

const SWITCH_BASE = cn(
  "relative flex h-4 w-9 items-center justify-center rounded-full border-[1.5px] border-ink bg-ink transition-colors duration-200",
);

/**
 * Honest opt-in sound: real samples from the shared sfx layer.
 * Always starts OFF — sound is never autoplayed and never the only feedback.
 * The preference is intentionally not persisted: every visit opts in again.
 * Enabling it also unlocks the sound layer of the terminal effects (sfx module).
 */
export function SoundToggle({ label }: { label: string }) {
  const [enabled, setEnabled] = useState(false);

  // Subscribing to a real DOM event — a legitimate effect.
  useEffect(() => {
    if (!enabled) return;
    const onClick = (event: MouseEvent) => {
      const el = event.target as HTMLElement | null;
      if (!el?.closest("a, button")) return;
      playUiClick();
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [enabled]);

  const knob = (
    <span aria-hidden="true" className={SWITCH_BASE}>
      <span
        className={cn(
          "absolute h-3 w-3 rounded-full border-[1.5px] border-ink shadow-[2px_2px_0_var(--color-ink)] transition-colors duration-200",
          enabled ? "bg-violet right-0.5" : "bg-muted left-0.5",
        )}
      />
    </span>
  );

  return (
    <button
      type="button"
      onClick={() => {
        const next = !enabled;
        setEnabled(next);
        setSfxEnabled(next);
        if (next) playUiClick();
      }}
      aria-pressed={enabled}
      className={cn(
        "flex items-center gap-3 rounded-[12px] border-[1.5px] border-ink bg-surface px-4 py-3",
        "font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted",
        "shadow-[3px_3px_0_var(--color-ink)] transition-transform duration-200",
        "ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5",
      )}
    >
      <span>{label}</span>
      {knob}
      <span className="sr-only">{enabled ? "on" : "off"}</span>
    </button>
  );
}
