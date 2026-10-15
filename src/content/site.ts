/**
 * SINGLE SOURCE OF TRUTH for all site copy.
 * No component writes its own copy — everything comes from here.
 *
 * Design: V1 "Terminal-first" (chosen by Luis, 2026-10-14).
 * See docs/design/playground/v1-terminal.html for the approved mockup.
 *
 * Items marked TODO(luis) are placeholders pending real data from Luis.
 */

/** A run of the hero intro copy; `highlight` draws the sun marker, `underline` the squiggle. */
export type IntroRun =
  | { text: string }
  | { text: string; highlight: true }
  | { text: string; underline: true };

/** A single line of the hero terminal; either a chip list or plain output. */
export type TerminalCommand =
  | { cmd: string; out: string }
  | { cmd: string; chips: readonly string[] };

export const site = {
  name: "Luis Hernández Castillo",
  handle: "luis.dev",
  role: "Fullstack Engineer",
  roleSecondary: "IA Engineer",
  tagline: "I build for the internet — and I sweat the small stuff.",
  url: "https://luis.dev",
  email: "hello@luis.dev", // TODO(luis): real email
  location: "Mexico · Remote-friendly", // TODO(luis): confirm
  availability: "Open to new work",
  since: 2026,
  year: 2026,

  nav: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    eyebrow: "// HELLO, WORLD",
    headlineBefore: "I make the web feel",
    headlineAccent: "human",
    headlineAfter: ".",
    /** Rendered as runs of text; `highlight` uses the sun marker, `underline` draws the ink rule. */
    intro: [
      { text: "Fullstack & IA engineer, tinkerer, and unapologetic " },
      { text: "detail nerd", highlight: true },
      { text: ". I build for the internet — and sweat the " },
      { text: "small stuff", underline: true },
      { text: "." },
    ] as IntroRun[],
    primaryCta: { label: "Let's build something", href: "#contact" },
    secondaryCta: { label: "More about me →", href: "#about" },
    confettiHint: "press K for confetti",
    terminal: {
      title: "luis.dev — zsh",
      commands: [
        {
          cmd: "whoami",
          out: "Luis — fullstack & IA engineer. I make interfaces with personality.",
        },
        {
          cmd: "ls skills/",
          chips: ["TypeScript", "React", "Next.js", "Node", "Prisma", "PostgreSQL"],
        },
        { cmd: "cat motto.txt", out: '"Ship small, ship often, make it feel alive."' },
        { cmd: "open contact", out: "Opening the good part…" },
      ] as TerminalCommand[],
    },
    sound: { label: "Sound", defaultOn: false },
    stickers: ["TypeScript", "React", "Node", "ESP32", "CSS wizard"],
  },

  about: {
    heading: "The short version",
    paragraphs: [
      "I'm an engineer, not a bootcamp graduate. I studied Mechatronics for six semesters, where I fell in love with oscilloscopes and programming microcontrollers — PICs, Arduinos, ESP32s.",
      "Then I spent three years as an industrial electrician, which taught me the most valuable lesson of my career: things have to actually work. No exceptions, no \"it works on my machine\".",
      "These days programming is my favourite branch of engineering. I love building things, I love the tech community, and I genuinely believe AI is reshaping the world — I want to be part of it.",
    ],
    facts: [
      { label: "Experience", value: "Fullstack, production" },
      { label: "Background", value: "Mechatronics + industrial electricity" },
      { label: "Superpower", value: "I speak both volts and TypeScript" },
      { label: "Currently", value: "Next.js, Prisma and too many side quests" },
    ],
  },

  skills: {
    heading: "Tools I reach for",
    groups: [
      { name: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Motion"] },
      { name: "Backend", items: ["Node.js", "Express", "Prisma", "Passport.js", "EJS"] },
      { name: "Data", items: ["PostgreSQL", "SQL", "Schema design"] },
      { name: "Hardware", items: ["Arduino", "ESP32", "PIC", "Electronics", "Oscilloscopes"] },
      { name: "Ship it", items: ["Vercel", "Railway", "Git", "Linux"] },
    ],
  },

  work: {
    heading: "Selected work",
    blurb: "Every project here solved a problem I actually had. That's the rule.",
    items: [
      {
        name: "File-Up-loader",
        // TODO(luis): what it solves, stack, and one measurable result.
        blurb:
          "File uploads that behave — progress, validation and error handling that users can actually understand.",
        tags: ["Node", "Express"],
        repo: "https://github.com/Luis200283/File-Up-loader",
        live: null as string | null,
      },
      {
        name: "blogr-nextjs-prisma",
        blurb: "Next.js + Prisma blog platform. TypeScript end to end, deployed on Vercel.",
        tags: ["Next.js", "Prisma", "PostgreSQL"],
        repo: "https://github.com/Luis200283/blogr-nextjs-prisma",
        live: "https://blogr-nextjs-prisma-omega-sooty.vercel.app",
      },
      {
        name: "Members-Only",
        blurb: "Private-group posting with real authentication: sessions, hashed passwords, access control.",
        tags: ["Express", "Passport.js", "EJS"],
        repo: "https://github.com/Luis200283/Members-Only",
        live: null as string | null,
      },
      {
        name: "Inventory-App",
        blurb: "Store inventory system on Node, Express, PostgreSQL and EJS — CRUD that survives real data.",
        tags: ["Express", "PostgreSQL", "EJS"],
        repo: "https://github.com/Luis200283/Inventory-App",
        live: null as string | null,
      },
    ],
  },

  contact: {
    heading: "Let's build something",
    body: "Got a problem worth solving, or a team that needs someone who ships? I answer fast.",
    cta: "Say hello",
  },

  socials: [
    { label: "GitHub", href: "https://github.com/Luis200283" },
    // TODO(luis): LinkedIn and X/Bluesky handles.
  ],

  footer: {
    note: "Built with Next.js, Tailwind and a lot of care. No templates were harmed.",
  },

  meta: {
    keywords: [
      "Fullstack Engineer",
      "IA Engineer",
      "Software Developer",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "Arduino",
      "ESP32",
      "Portfolio",
    ],
  },

  notFound: {
    code: "404",
    line: "command not found",
    body: "That route doesn't exist on this machine. Try the homepage — or press K first, always.",
    cta: "Back to safety",
  },
} as const;
