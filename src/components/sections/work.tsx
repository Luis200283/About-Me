import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { site, type WorkIcon } from "@/content/site";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const ICON_PATHS: Record<WorkIcon, ReactNode> = {
  book: (
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  ),
  upload: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </>
  ),
  chat: (
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  ),
  cart: (
    <>
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </>
  ),
};

const ICON_TONES = ["bg-sun", "bg-violet", "bg-mint", "bg-coral"] as const;

function WorkIconGlyph({ icon, className }: { icon: WorkIcon; className?: string }) {
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
      {ICON_PATHS[icon]}
    </svg>
  );
}

export function Work() {
  const { work } = site;

  return (
    <section
      id="work"
      className="border-b border-ink/15 px-6 py-20 sm:px-10"
      aria-labelledby="work-title"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="03 — WORK" id="work-title">
          {work.heading}
        </SectionHeading>

        <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted">
          {work.blurb}
        </p>

        <p className="mt-6 font-mono text-[0.6875rem] tracking-[0.1em] text-muted">
          $ ls ~/projects --featured
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {work.items.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.08}>
              <article className="group flex h-full flex-col justify-between gap-6 rounded-[14px] border-[1.5px] border-ink bg-surface p-6 shadow-[6px_6px_0_var(--color-ink)] transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={cn(
                          "flex h-10 w-10 shrink-0 -rotate-2 items-center justify-center rounded-[10px]",
                          "border-[1.5px] border-ink text-on-accent shadow-[3px_3px_0_var(--color-ink)]",
                          "transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:rotate-0",
                          ICON_TONES[i % ICON_TONES.length],
                        )}
                      >
                        <WorkIconGlyph icon={project.icon} className="h-5 w-5" />
                      </span>
                      <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-ink">
                        {project.name}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">
                    {project.blurb}
                  </p>

                  <ul className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <Tag tone="plain">{tag}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    href={project.repo}
                    variant="ghost"
                    size="sm"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Code →
                  </Button>
                  {project.live && (
                    <Button
                      href={project.live}
                      variant="outline"
                      size="sm"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Live demo
                    </Button>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
