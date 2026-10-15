import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Mono annotation chip used as a small terminal-flavoured aside. */
function LogNote() {
  return (
    <p className="mt-8 inline-flex items-center gap-2 rounded-[10px] border-[1.5px] border-ink bg-surface px-3.5 py-2 font-mono text-[0.6875rem] tracking-[0.1em] text-muted shadow-[3px_3px_0_var(--color-ink)]">
      <span className="text-mint-ink">{"//"}</span> from the log: I still own the oscilloscope
    </p>
  );
}

function DoodleArrow() {
  return (
    <svg
      viewBox="0 0 88 44"
      aria-hidden="true"
      className="mt-6 h-11 w-22 overflow-visible"
    >
      <path
        d="M4 10 C 26 4, 34 34, 62 30 C 74 28, 78 33, 84 30"
        fill="none"
        stroke="var(--color-ink)"
        strokeOpacity="0.45"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="5 7"
      />
    </svg>
  );
}

export function About() {
  const { about } = site;
  const powerIndex = about.facts.findIndex((f) => f.label === "Superpower");

  return (
    <section
      id="about"
      className="border-b border-ink/15 px-6 py-20 sm:px-10"
      aria-labelledby="about-title"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="01 — WHO" id="about-title">
          {about.heading}
        </SectionHeading>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mt-2 space-y-6">
              {about.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className="max-w-[62ch] text-[1.0625rem] leading-relaxed text-ink/85">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <LogNote />
          </div>

          <Reveal delay={0.1}>
            <dl className="grid gap-3.5">
              {about.facts.map((fact, i) => {
                    const isPower = i === powerIndex;
                    return (
                      <div
                        key={fact.label}
                        className={cn(
                          "flex flex-col gap-1 rounded-[10px] border-[1.5px] border-ink px-4 py-4 shadow-[3px_3px_0_var(--color-ink)]",
                          isPower ? "bg-sun text-on-accent" : "bg-surface text-ink",
                        )}
                    style={{
                      transform: `rotate(${i % 2 === 0 ? -0.6 : 0.6}deg)`,
                    }}
                  >
                    <dt
                      className={cn(
                        "font-mono text-[0.625rem] uppercase tracking-[0.16em]",
                        isPower ? "text-on-accent/70" : "text-muted",
                      )}
                    >
                      {fact.label}
                    </dt>
                    <dd
                      className={cn(
                        "font-display text-[0.9375rem] font-semibold tracking-[-0.01em]",
                        isPower ? "text-on-accent" : "text-ink",
                      )}
                    >
                      {fact.value}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <DoodleArrow />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
