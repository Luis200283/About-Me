import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const TONES = [
  "bg-sun text-on-accent",
  "bg-surface text-ink",
  "bg-violet text-on-accent",
  "bg-mint text-on-accent",
  "bg-coral text-on-accent",
] as const;

/** Tiny hand-drawn spark — the only place a decorative accent is needed. */
function Spark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M12 2.5 C13 8.5, 15.5 11, 21.5 12 C15.5 13, 13 15.5, 12 21.5 C11 15.5, 8.5 13, 2.5 12 C8.5 11, 11 8.5, 12 2.5 Z"
        fill="var(--color-coral)"
      />
    </svg>
  );
}

export function Skills() {
  const { skills } = site;

  return (
    <section
      id="skills"
      className="border-b border-ink/15 bg-surface/60 px-6 py-20 sm:px-10"
      aria-labelledby="skills-title"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="02 — TOOLS" id="skills-title">
          {skills.heading}
        </SectionHeading>

        <div className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {skills.groups.map((group, groupIndex) => (
            <Reveal key={group.name} delay={groupIndex * 0.06}>
              <h3 className="mb-4 flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
                <span className="h-px w-7 bg-ink/25" aria-hidden="true" />
                {group.name}
                {group.name === "Hardware" && <Spark className="h-3 w-3 shrink-0" />}
              </h3>

              <ul className="flex flex-wrap gap-2.5">
                {group.items.map((item, i) => (
                  <li
                    key={item}
                    className={cn(
                      "rounded-[10px] border-[1.5px] border-ink px-3 py-2",
                      "font-mono text-[0.6875rem] uppercase tracking-[0.1em]",
                      "shadow-[3px_3px_0_var(--color-ink)]",
                      "transition-transform duration-200 ease-[cubic-bezier(.22,1,.36,1)]",
                      "hover:-translate-y-1 hover:rotate-0",
                      TONES[(groupIndex + i) % TONES.length],
                    )}
                    style={{ transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)` }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
