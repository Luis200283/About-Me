/**
 * Frozen Playground typography (docs/design/TOKENS.md):
 * display = Bricolage Grotesque, body = Inter, mono = JetBrains Mono.
 * Loaded once via next/font and exposed as CSS variables on <html>.
 */
import {
  Bricolage_Grotesque,
  Inter,
  JetBrains_Mono,
} from "next/font/google";

export const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});
