"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const COLORS = ["#FF5C7A", "#FFC95C", "#8B7CFF", "#3FC7A9", "#221D2E"] as const;

/** Fires a short, deterministic-ish burst of DOM particles. No canvas, no deps. */
export function fireConfetti() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const layer = document.getElementById("confetti-layer");
  if (!layer) return;

  const count = 42;
  const originX = window.innerWidth / 2;
  const originY = window.innerHeight * 0.32;

  for (let i = 0; i < count; i += 1) {
    const p = document.createElement("span");
    const size = 6 + Math.random() * 8;
    const angle = Math.random() * Math.PI * 2;
    const distance = 90 + Math.random() * 220;

    p.style.cssText = [
      "position:absolute",
      `left:${originX}px`,
      `top:${originY}px`,
      `width:${size}px`,
      `height:${size * (Math.random() > 0.5 ? 1 : 0.45)}px`,
      `background:${COLORS[i % COLORS.length]}`,
      `border-radius:${Math.random() > 0.6 ? "50%" : "2px"}`,
      "pointer-events:none",
      "will-change:transform,opacity",
      `--tx:${Math.cos(angle) * distance}px`,
      `--ty:${Math.sin(angle) * distance + 120}px`,
      `--rot:${Math.random() * 720 - 360}deg`,
      "animation:confetti-burst 900ms cubic-bezier(.17,.67,.35,1) forwards",
    ].join(";");

    layer.appendChild(p);
    p.addEventListener("animationend", () => p.remove(), { once: true });
  }

  window.setTimeout(() => {
    layer.querySelectorAll("span").forEach((el) => el.remove());
  }, 1600);
}

/**
 * Mounts the confetti overlay and wires the "K" shortcut.
 * Announces the result politely so the effect is not visual-only.
 */
export function Confetti() {
  const [message, setMessage] = useState("");
  const lastFired = useRef(0);

  const fire = useCallback(() => {
    const now = Date.now();
    if (now - lastFired.current < 400) return;
    lastFired.current = now;
    fireConfetti();
    setMessage("Confetti! Nice press.");
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      const typing =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target?.isContentEditable === true;
      if (typing || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "k" || event.key === "K") {
        event.preventDefault();
        fire();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fire]);

  useEffect(() => {
    if (!message) return;
    const t = window.setTimeout(() => setMessage(""), 1500);
    return () => window.clearTimeout(t);
  }, [message]);

  return (
    <>
      <div
        id="confetti-layer"
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-9999 overflow-hidden"
      />
      <p aria-live="polite" className="sr-only">
        {message}
      </p>
    </>
  );
}
