import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { site } from "@/content/site";

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
              <article className="flex h-full flex-col justify-between gap-6 rounded-[14px] border-[1.5px] border-ink bg-surface p-6 shadow-[6px_6px_0_var(--color-ink)] transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1">
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-ink">
                      {project.name}
                    </h3>
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
