"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const SWITCH_BASE = cn(
  "relative block h-4 w-9 rounded-full border-[1.5px] border-ink transition-colors duration-200",
);

/**
 * Honest opt-in sound: a short Web Audio blip on interaction.
 * Always starts OFF — sound is never autoplayed and never the only feedback.
 * The preference is intentionally not persisted: every visit opts in again.
 */
export function SoundToggle({ label }: { label: string }) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  const ensureContext = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    const w = window as unknown as {
      AudioContext?: typeof AudioContext;
      webkitAudioContext?: typeof AudioContext;
    };
    const Ctor = w.AudioContext ?? w.webkitAudioContext;
    if (!Ctor) return null;
    ctxRef.current = new Ctor();
    return ctxRef.current;
  }, []);

  const blip = useCallback(
    (frequency: number) => {
      const ctx = ensureContext();
      if (!ctx) return;
      if (ctx.state === "suspended") void ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    },
    [ensureContext],
  );

  // Subscribing to a real DOM event — a legitimate effect.
  useEffect(() => {
    if (!enabled) return;
    const onClick = (event: MouseEvent) => {
      const el = event.target as HTMLElement | null;
      if (!el?.closest("a, button")) return;
      blip(660);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [enabled, blip]);

  const knob = (
    <span
      aria-hidden="true"
      className={cn(
        SWITCH_BASE,
        "absolute right-0 bottom-0",
        enabled ? "bg-mint" : "bg-surface",
      )}
    >
      <span
        className={cn(
          "absolute top-[1px] h-[11px] w-[11px] rounded-full border-[1.5px] border-ink bg-surface transition-all duration-200 ease-[cubic-bezier(.22,1,.36,1)]",
          enabled ? "left-[17px]" : "left-[1px]",
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
        if (next) blip(880);
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
      <span className="relative block h-4 w-9">{knob}</span>
      <span className="sr-only">{enabled ? "on" : "off"}</span>
    </button>
  );
}
