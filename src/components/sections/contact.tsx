"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      const el = document.getElementById("contact-email");
      if (!el) return;
      const range = document.createRange();
      range.selectNodeContents(el);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      setCopied(true);
    }
  };

  return (
    <span className="inline-flex flex-wrap items-center justify-center gap-3">
      <code
        id="contact-email"
        className="font-mono text-[0.8125rem] tracking-[0.02em] text-ink"
      >
        {site.email}
      </code>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "rounded-full border-[1.5px] border-ink bg-sun px-3 py-1.5",
          "font-mono text-[0.625rem] uppercase tracking-[0.12em] text-on-accent",
          "shadow-[2px_2px_0_var(--color-ink)] transition-transform duration-200",
          "ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5",
        )}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </span>
  );
}

export function Contact() {
  const { contact, socials } = site;

  return (
    <section
      id="contact"
      className="px-6 py-24 sm:px-10"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading kicker="04 — CONTACT" id="contact-title" className="mx-auto text-center">
          {contact.heading}
        </SectionHeading>

        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-[48ch] text-[1.0625rem] leading-relaxed text-muted">
            {contact.body}
          </p>

          <div className="mt-8">
            <CopyEmail />
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
            <Button href={`mailto:${site.email}`} size="lg">
              {contact.cta}
            </Button>
            {socials[0] && (
              <Button href={socials[0].href} variant="ghost" size="lg">
                GitHub →
              </Button>
            )}
          </div>

          <p className="mt-7 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
            {site.availability} · {site.location}
          </p>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center py-2 text-muted underline decoration-ink/30 underline-offset-4 transition-colors hover:text-ink"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
