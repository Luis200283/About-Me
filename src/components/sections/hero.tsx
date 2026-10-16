"use client";

import { Button } from "@/components/ui/button";
import { Confetti, fireConfetti } from "@/components/motion/confetti";
import { SoundToggle } from "@/components/ui/sound-toggle";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 14"
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute left-[-4%] w-[108%]",
        className,
      )}
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
        style={{
          animation: "squiggle-draw 2.8s ease-in-out infinite alternate",
        }}
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
      className={cn(
        "absolute select-none font-display leading-none",
        className,
      )}
      style={{ color, animation: "doodle-bob 5s ease-in-out infinite" }}
    >
      ✦
    </span>
  );
}

function SocialIcon({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const paths: Record<string, ReactNode> = {
    GitHub: (
      <>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </>
    ),
    LinkedIn: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
    X: <path d="M4 4l16 16M20 4L4 20" />,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[label]}
    </svg>
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
                    className="absolute inset-x-[-0.18em] bottom-[0.06em] z-0 h-[42%] -rotate-1 bg-sun dark:bg-violet dark:opacity-40"
                  />
                  <span className="relative z-10 font-semibold text-ink">
                    {run.text}
                  </span>
                </span>
              ) : "underline" in run ? (
                <span
                  key={i}
                  className="relative inline-block whitespace-nowrap"
                >
                  <span className="relative z-10 font-semibold text-ink">
                    {run.text}
                  </span>
                  <Squiggle className="bottom-[-0.4em] h-[0.2em]" />
                </span>
              ) : (
                <span key={i}>{run.text}</span>
              ),
            )}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Button href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </Button>

            <ul
              className="mt-2 flex items-center justify-center gap-3"
              aria-label="Social links"
            >
              {site.socials.map((social, i) => (
                <li
                  key={social.label}
                  style={{
                    transform: `rotate(${[-2.5, 2, -1.5][i % 3]}deg)`,
                    animation: `doodle-bob 7s ease-in-out ${i * 0.4}s infinite`,
                  }}
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className={cn(
                      "inline-flex h-11 w-11 items-center justify-center rounded-[10px] border-[1.5px] border-ink",
                      "bg-sky-400 shadow-[2px_2px_0_var(--color-ink)] transition-transform duration-200",
                      "ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 hover:bg-surface hover:text-ink",
                      i % 3 === 0 &&
                        "bg-sun text-on-accent hover:bg-surface hover:text-ink",
                      i % 3 === 2 &&
                        "bg-violet text-on-accent hover:bg-surface hover:text-ink",
                    )}
                  >
                    <SocialIcon label={social.label} className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative">
          <DoodleStar
            className="left-[6%] top-[8%] text-lg"
            color="var(--color-violet)"
          />
          <DoodleStar
            className="right-[8%] top-[2%] text-sm"
            color="var(--color-mint)"
          />
          <DoodleStar
            className="bottom-[30%] left-[2%] text-xs"
            color="var(--color-sun)"
          />

          <div className="relative rotate-[-1deg] rounded-[14px] border-[1.5px] border-ink bg-terminal p-0 shadow-[6px_6px_0_var(--color-line)] dark:shadow-[6px_6px_0_var(--color-ink)]">
            <div className="flex items-center gap-2 border-b border-terminal-dim/25 px-4 py-3">
              <span
                className="h-2.5 w-2.5 rounded-full bg-coral"
                aria-hidden="true"
              />
              <span
                className="h-2.5 w-2.5 rounded-full bg-sun"
                aria-hidden="true"
              />
              <span
                className="h-2.5 w-2.5 rounded-full bg-mint"
                aria-hidden="true"
              />
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

          <div className="mt-6 flex justify-between items-center">
            <button
              type="button"
              onClick={fireConfetti}
              className={cn(
                "flex items-center gap-2 relative left-3 rounded-lg border-[1.5px] border-dashed border-ink/45",
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
            <SoundToggle label={hero.sound.label} />
          </div>

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
        </div>
      </div>

      <Confetti />
    </section>
  );
}
