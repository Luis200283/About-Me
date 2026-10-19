"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { playBurst, playFinale, playLaunch, playParty, playPop } from "@/lib/sfx";

const COLORS = ["#FF5C7A", "#FFC95C", "#8B7CFF", "#3FC7A9", "#221D2E"];
const BASE = {
  colors: COLORS,
  disableForReducedMotion: true,
  zIndex: 100,
};

const FIREWORK_COLORS = [
  "#FFC95C",
  "#FFF6EC",
  "#FF5C7A",
  "#FFC95C",
  "#FFF6EC",
];
const FIREWORK_BASE = {
  colors: FIREWORK_COLORS,
  disableForReducedMotion: true,
  zIndex: 100,
  shapes: ["circle", "star"] as confetti.Shape[],
};

const BURST_GUARD_MS = 400;
const FIREWORKS_LAUNCH_MS = 4600;
const FIREWORKS_SHOW_MS = 6200;
const PARTY_RAIN_MS = 5200;
const PARTY_SHOW_MS = 7600;
const MOBILE_BREAKPOINT = 640;
const MOBILE_SCALE = 0.6;

export type EffectName = "confetti" | "fireworks" | "party";

let lastBurstAt = 0;
const activeShowUntil: Record<"fireworks" | "party", number> = {
  fireworks: 0,
  party: 0,
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scaleCount(count: number): number {
  if (typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT) {
    return Math.max(1, Math.round(count * MOBILE_SCALE));
  }
  return count;
}

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/**
 * Fireworks read as sparks, not paper: thin golden comet trails climb up,
 * then a bright flash plus circle/star particles that linger and fall slowly.
 */
function fireworkBurst(x: number, y: number, count: number, scalar: number): void {
  confetti({
    ...FIREWORK_BASE,
    particleCount: 8,
    spread: 360,
    startVelocity: 6,
    decay: 0.9,
    ticks: 24,
    scalar: 2.4,
    colors: ["#FFF6EC", "#FFC95C"],
    shapes: ["circle"],
    origin: { x, y },
  });
  confetti({
    ...FIREWORK_BASE,
    particleCount: scaleCount(count),
    spread: 360,
    startVelocity: 32,
    gravity: 0.55,
    decay: 0.945,
    ticks: 170,
    scalar,
    origin: { x, y },
  });
}

function fireworkLaunch(x: number, y: number): void {
  confetti({
    ...FIREWORK_BASE,
    particleCount: 2,
    angle: 90,
    spread: 12,
    startVelocity: 72,
    ticks: 28,
    gravity: 1.5,
    scalar: 0.45,
    colors: ["#FFC95C", "#FFF6EC"],
    shapes: ["circle"],
    origin: { x, y: 1 },
  });
  playLaunch();
  window.setTimeout(() => {
    fireworkBurst(x, y, 110, 0.75);
    playBurst();
  }, 380);
}

function launchFireworksShow(): void {
  const end = Date.now() + FIREWORKS_LAUNCH_MS;

  const launch = () => {
    if (Date.now() > end) {
      finale();
      return;
    }

    const x = randomBetween(0.2, 0.8);
    const y = randomBetween(0.25, 0.6);

    fireworkLaunch(x, y);

    window.setTimeout(launch, randomBetween(550, 900));
  };

  const finale = () => {
    playFinale();
    for (let i = 0; i < 6; i += 1) {
      window.setTimeout(() => {
        const x = randomBetween(0.15, 0.85);
        const y = randomBetween(0.25, 0.65);
        fireworkBurst(x, y, 80, 0.95);
        if (i % 2 === 0) playBurst();
      }, i * 140);
    }
  };

  launch();
}

export function fireConfetti(): void {
  if (prefersReducedMotion()) return;

  const now = Date.now();
  if (now - lastBurstAt < BURST_GUARD_MS) return;
  lastBurstAt = now;

  playPop();
  confetti({
    ...BASE,
    particleCount: scaleCount(90),
    spread: 100,
    startVelocity: 45,
    ticks: 220,
    origin: { x: 0.5, y: 0.45 },
  });
  confetti({
    ...BASE,
    particleCount: scaleCount(60),
    spread: 70,
    angle: 60,
    startVelocity: 55,
    origin: { x: 0, y: 0.7 },
  });
  confetti({
    ...BASE,
    particleCount: scaleCount(60),
    spread: 70,
    angle: 120,
    startVelocity: 55,
    origin: { x: 1, y: 0.7 },
  });

  window.setTimeout(() => {
    confetti({
      ...BASE,
      particleCount: scaleCount(55),
      spread: 120,
      startVelocity: 40,
      ticks: 180,
      origin: { x: 0.5, y: 0.5 },
    });
    playPop();
  }, 320);
}

export function fireFireworks(): void {
  if (prefersReducedMotion()) return;

  const now = Date.now();
  if (activeShowUntil.fireworks > now) return;
  activeShowUntil.fireworks = now + FIREWORKS_SHOW_MS;

  launchFireworksShow();
}

export function fireParty(): void {
  if (prefersReducedMotion()) return;

  const now = Date.now();
  if (activeShowUntil.party > now) return;
  activeShowUntil.party = now + PARTY_SHOW_MS;

  const rainEnd = now + PARTY_RAIN_MS;
  const rain = () => {
    if (Date.now() > rainEnd) return;
    confetti({
      ...BASE,
      particleCount: scaleCount(28),
      angle: 270,
      spread: 120,
      startVelocity: 0,
      gravity: 0.6,
      ticks: 400,
      drift: randomBetween(-1, 1),
      origin: { x: Math.random(), y: -0.1 },
    });
    window.setTimeout(rain, randomBetween(180, 360));
  };

  playParty();
  const sideEnd = now + PARTY_RAIN_MS;
  const side = () => {
    if (Date.now() > sideEnd) return;
    playPop();
    confetti({
      ...BASE,
      particleCount: scaleCount(70),
      spread: 70,
      angle: 60,
      startVelocity: 55,
      origin: { x: 0, y: 0.75 },
    });
    window.setTimeout(() => {
      confetti({
        ...BASE,
        particleCount: scaleCount(70),
        spread: 70,
        angle: 120,
        startVelocity: 55,
        origin: { x: 1, y: 0.75 },
      });
    }, 120);
    window.setTimeout(side, randomBetween(700, 1200));
  };

  rain();
  side();

  window.setTimeout(() => {
    const t = Date.now();
    if (activeShowUntil.fireworks <= t) {
      activeShowUntil.fireworks = t + FIREWORKS_SHOW_MS;
      launchFireworksShow();
    }
  }, 1000);
}

export function runEffect(name: EffectName): void {
  if (name === "fireworks") {
    fireFireworks();
    return;
  }
  if (name === "party") {
    fireParty();
    return;
  }
  fireConfetti();
}

export function Confetti() {
  const [message, setMessage] = useState("");
  const lastFired = useRef(0);

  const fire = useCallback(() => {
    const now = Date.now();
    if (now - lastFired.current < BURST_GUARD_MS) return;
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
    <p aria-live="polite" className="sr-only">
      {message}
    </p>
  );
}
