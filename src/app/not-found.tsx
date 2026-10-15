import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "404 — command not found",
};

export default function NotFound() {
  const { notFound } = site;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 py-20">
      <div className="w-full max-w-lg rotate-[-0.8deg] rounded-[14px] border-[1.5px] border-ink bg-surface p-0 shadow-[6px_6px_0_var(--color-ink)]">
        <div className="flex items-center gap-2 border-b border-ink/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-coral" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-sun" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-mint" aria-hidden="true" />
          <span className="ml-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
            {site.handle} — zsh
          </span>
        </div>

        <div className="px-6 py-9 text-center">
          <p className="font-display text-[clamp(4rem,14vw,6.5rem)] font-bold leading-none tracking-[-0.04em] text-ink">
            {notFound.code}
          </p>
          <p className="mt-2 font-mono text-sm tracking-[0.08em] text-coral-ink">
            zsh: {notFound.line}
          </p>
          <p className="mx-auto mt-5 max-w-[42ch] text-[0.9375rem] leading-relaxed text-muted">
            {notFound.body}
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/" size="lg">
              {notFound.cta}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
