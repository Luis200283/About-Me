"use client";

/**
 * Sample-based sound layer for site effects.
 * Sound starts OFF and is only enabled through the SoundToggle, so nothing
 * ever autoplays and no AudioContext or sample is touched before that opt-in.
 * Every play function is a no-op while disabled.
 */

type SoundName = "pop" | "launch" | "boom" | "finale" | "cheer" | "party";

const SOUNDS: Record<SoundName, string> = {
  pop: "/sounds/confetti-pop.mp3",
  launch: "/sounds/firework-whistle.mp3",
  boom: "/sounds/firework-boom.mp3",
  finale: "/sounds/firework-finale.mp3",
  cheer: "/sounds/crowd-cheer.mp3",
  party: "/sounds/party-launch.mp3",
};

let enabled = false;
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
const buffers = new Map<SoundName, AudioBuffer>();
const loading = new Set<SoundName>();

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (ctx) return ctx;
  const w = window as unknown as {
    AudioContext?: typeof AudioContext;
    webkitAudioContext?: typeof AudioContext;
  };
  const Ctor = w.AudioContext ?? w.webkitAudioContext;
  if (!Ctor) return null;
  ctx = new Ctor();
  return ctx;
}

function getMaster(c: AudioContext): GainNode {
  if (master) return master;
  const gain = c.createGain();
  gain.gain.value = 0.8;
  const limiter = c.createDynamicsCompressor();
  limiter.threshold.value = -18;
  limiter.knee.value = 12;
  limiter.ratio.value = 4;
  limiter.attack.value = 0.003;
  limiter.release.value = 0.25;
  gain.connect(limiter).connect(c.destination);
  master = gain;
  return master;
}

function loadSamples(c: AudioContext): void {
  for (const name of Object.keys(SOUNDS) as SoundName[]) {
    if (buffers.has(name) || loading.has(name)) continue;
    loading.add(name);
    fetch(SOUNDS[name])
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.arrayBuffer();
      })
      .then((data) => c.decodeAudioData(data))
      .then((buffer) => buffers.set(name, buffer))
      .catch(() => undefined)
      .finally(() => loading.delete(name));
  }
}

export function setSfxEnabled(value: boolean): void {
  enabled = value;
  if (!value) return;
  const c = getContext();
  if (!c) return;
  if (c.state === "suspended") void c.resume();
  loadSamples(c);
}

type PlayOptions = {
  gain?: number;
  rate?: number;
  delay?: number;
};

function play(name: SoundName, options: PlayOptions = {}): void {
  if (!enabled) return;
  const c = getContext();
  if (!c) return;
  if (c.state === "suspended") void c.resume();
  const buffer = buffers.get(name);
  if (!buffer) return;
  const { gain = 1, rate = 1, delay = 0 } = options;
  const source = c.createBufferSource();
  source.buffer = buffer;
  source.playbackRate.value = rate;
  const volume = c.createGain();
  volume.gain.value = gain;
  source.connect(volume).connect(getMaster(c));
  source.start(c.currentTime + delay);
}

/** Small pitch spread so repeated samples never sound identical. */
function jitter(spread = 0.06): number {
  return 1 - spread / 2 + Math.random() * spread;
}

/** Tactile click for interface buttons (short popper transient). */
export function playUiClick(): void {
  play("pop", { gain: 0.22, rate: 1.35 });
}

/** Confetti cannon pops. */
export function playPop(): void {
  play("pop", { gain: 0.85, rate: jitter(0.12) });
}

/** Rocket whistle as a shell climbs. */
export function playLaunch(): void {
  play("launch", { gain: 0.55, rate: jitter(0.1) });
}

/** Single firework explosion. */
export function playBurst(): void {
  play("boom", { gain: 0.9, rate: jitter(0.14) });
}

/** Layered finale: rolling explosions plus the crowd losing it. */
export function playFinale(): void {
  play("finale", { gain: 0.75 });
  play("cheer", { gain: 0.6, delay: 0.35 });
}

/** Party opener: shells launching with people cheering. */
export function playParty(): void {
  play("party", { gain: 0.7 });
}
