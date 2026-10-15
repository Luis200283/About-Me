"use client";

import { Button } from "@/components/ui/button";
import { Confetti, fireConfetti } from "@/components/motion/confetti";
import { SoundToggle } from "@/components/ui/sound-toggle";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Hand-drawn style squiggle used under the accented word. */
function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 14"
      aria-hidden="true"
      className={cn("pointer-events-none absolute left-[-4%] w-[108%]", className)}
      preserveAspectRatio="none"
    >
      <path
        d="M3 9 C 22 2, 42 13, 62 6 S 102 3, 117 8"
        fill="none"
        stroke="var(--color-coral)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeDasharray="220"
        strokeDashoffset="0"
        style={{ animation: "squiggle-draw 2.8s ease-in-out infinite alternate" }}
      />
    </svg>
  );
}

function DoodleStar({
  className,
  color,
}: {
  className?: string;
  color: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("absolute select-none font-display leading-none", className)}
      style={{ color, animation: "doodle-bob 5s ease-in-out infinite" }}
    >
      ✦
    </span>
  );
}

export function Hero() {
  const { hero } = site;

  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pb-20 pt-14 sm:px-10"
      aria-labelledby="hero-title"
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        {/* ---------- copy column ---------- */}
        <div>
          <p className="mb-5 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-coral-ink">
            {hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="text-balance font-display text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.03em]"
          >
            {hero.headlineBefore}{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">{hero.headlineAccent}</span>
              <Squiggle className="bottom-[-0.15em] h-[0.22em]" />
            </span>
            {hero.headlineAfter}
          </h1>

          <p className="mt-7 max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted">
            {hero.intro.map((run, i) =>
              "highlight" in run ? (
                <span key={i} className="relative mx-[0.1em] inline-block">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-[-0.18em] bottom-[0.06em] z-0 h-[42%] -rotate-1 bg-sun"
                  />
                  <span className="relative z-10 font-semibold text-ink">{run.text}</span>
                </span>
              ) : "underline" in run ? (
                <span key={i} className="relative inline-block whitespace-nowrap">
                  <span className="relative z-10 font-semibold text-ink">{run.text}</span>
                  <Squiggle className="bottom-[-0.4em] h-[0.2em]" />
                </span>
              ) : (
                <span key={i}>{run.text}</span>
              ),
            )}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Button href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
            </Button>

            <button
              type="button"
              onClick={fireConfetti}
              className={cn(
                "group flex items-center gap-2 rounded-full border-[1.5px] border-dashed border-ink/45",
                "bg-surface/60 px-3.5 py-2 font-mono text-[0.6875rem] uppercase",
                "tracking-[0.12em] text-muted transition-colors hover:border-ink",
              )}
            >
              press{" "}
              <kbd
                className={cn(
                  "inline-flex h-5 min-w-5 items-center justify-center rounded-[5px]",
                  "border-[1.5px] border-ink bg-sun px-1 font-mono text-[0.625rem]",
                  "font-medium text-on-accent shadow-[2px_2px_0_var(--color-ink)]",
                  "transition-transform duration-200 group-hover:-translate-y-0.5",
                )}
              >
                K
              </kbd>{" "}
              for confetti
            </button>
          </div>
        </div>

        {/* ---------- terminal + widgets column ---------- */}
        <div className="relative">
          <DoodleStar className="left-[6%] top-[8%] text-lg" color="var(--color-violet)" />
          <DoodleStar
            className="right-[8%] top-[2%] text-sm"
            color="var(--color-mint)"
          />
          <DoodleStar
            className="bottom-[30%] left-[2%] text-xs"
            color="var(--color-sun)"
          />

          {/* terminal */}
          <div className="relative rotate-[-1deg] rounded-[14px] border-[1.5px] border-ink bg-terminal p-0 shadow-[6px_6px_0_var(--color-ink)]">
            <div className="flex items-center gap-2 border-b border-terminal-dim/25 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-coral" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-sun" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-mint" aria-hidden="true" />
              <span className="ml-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-terminal-dim">
                {hero.terminal.title}
              </span>
            </div>

            <div className="px-5 py-5 font-mono text-[0.8125rem] leading-[1.9] text-terminal-text">
              {hero.terminal.commands.map((command) => (
                <div key={command.cmd}>
                  <p>
                    <span className="text-mint">➜</span> luis.dev{" "}
                    <span className="text-sun">{command.cmd}</span>
                  </p>
                  {"chips" in command ? (
                    <ul className="mt-1.5 flex flex-wrap gap-2">
                      {command.chips.map((chip) => (
                        <li
                          key={chip}
                          className="rounded-full bg-mint px-2.5 py-1 font-mono text-[0.6875rem] text-on-accent"
                        >
                          {chip}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-terminal-dim">{command.out}</p>
                  )}
                </div>
              ))}
              <p className="mt-1">
                <span className="text-mint">➜</span> luis.dev{" "}
                <span className="text-sun">open contact</span>
                <span
                  aria-hidden="true"
                  className="ml-1 inline-block text-sun"
                  style={{ animation: "caret-blink 1.1s steps(1) infinite" }}
                >
                  ▍
                </span>
              </p>
            </div>
          </div>

          {/* sound widget */}
          <div className="mt-6 flex justify-end">
            <SoundToggle label={hero.sound.label} />
          </div>

          {/* stickers */}
          <ul className="mt-7 flex flex-wrap items-end gap-3">
            {hero.stickers.map((sticker, i) => (
              <li
                key={sticker}
                className={cn(
                  "rounded-[10px] border-[1.5px] border-ink px-3 py-2",
                  "font-mono text-[0.6875rem] uppercase tracking-[0.1em]",
                  "shadow-[3px_3px_0_var(--color-ink)]",
                  i % 4 === 0 && "bg-sun text-on-accent",
                  i % 4 === 1 && "bg-surface text-ink",
                  i % 4 === 2 && "bg-violet text-on-accent",
                  i % 4 === 3 && "bg-mint text-on-accent",
                )}
                style={{
                  transform: `rotate(${[-5, 3, -2, 4][i % 4]}deg)`,
                  animation: `doodle-bob 6s ease-in-out ${i * 0.35}s infinite`,
                }}
              >
                {sticker}
              </li>
            ))}
          </ul>

          {/* decorative confetti dots */}
          <span
            aria-hidden="true"
            className="absolute bottom-[8%] right-[42%] h-2 w-2 rounded-full bg-coral"
            style={{ animation: "doodle-bob 5s ease-in-out infinite" }}
          />
          <span
            aria-hidden="true"
            className="absolute right-[2%] top-[46%] h-1.5 w-1.5 rounded-full bg-violet"
            style={{ animation: "doodle-bob 7s ease-in-out 1s infinite" }}
          />
          <span
            aria-hidden="true"
            className="absolute bottom-[2%] left-[30%] h-2 w-2 rounded-full bg-mint"
            style={{ animation: "doodle-bob 6s ease-in-out 0.5s infinite" }}
          />
        </div>
      </div>

      <Confetti />
    </section>
  );
}
