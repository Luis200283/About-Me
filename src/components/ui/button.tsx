import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "solid" | "ghost" | "outline";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold " +
  "tracking-tight transition-transform duration-200 ease-[cubic-bezier(.22,1,.36,1)] " +
  "hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  solid: "ink-border hard-shadow bg-coral text-on-accent hover:shadow-[5px_5px_0]",
  ghost: "text-ink underline decoration-ink/40 decoration-2 underline-offset-4 hover:decoration-ink",
  outline: "ink-border hard-shadow bg-surface text-ink",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-[0.9375rem]",
  lg: "px-6 py-3 text-base",
} as const;

export interface ButtonProps extends ComponentPropsWithoutRef<"a"> {
  variant?: Variant;
  size?: keyof typeof sizes;
}

/** Renders as <a> by default (portfolio is link-driven); pass `as="button"` for real buttons. */
export function Button({
  variant = "solid",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return <a className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
