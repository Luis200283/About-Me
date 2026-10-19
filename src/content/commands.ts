import type { TerminalCommand } from "@/components/ui/terminal";
import { site } from "@/content/site";

const SECTIONS = ["about", "skills", "work", "contact"] as const;

type Section = (typeof SECTIONS)[number];

function isSection(value: string): value is Section {
  return (SECTIONS as readonly string[]).includes(value);
}

export const terminalCommands: readonly TerminalCommand[] = [
  {
    name: "help",
    description: "list every trick this terminal knows",
    run: (ctx) => {
      ctx.printSuggestions(
        terminalCommands
          .filter((command) => !command.hidden)
          .map(({ name, description }) => ({ name, description })),
      );
    },
  },
  {
    name: "whoami",
    description: "the human behind this machine",
    run: (ctx) => {
      ctx.print(`${site.name} — ${site.role} & ${site.roleSecondary}.`);
      ctx.print(`${site.location} · ${site.availability}.`);
    },
  },
  {
    name: "about",
    description: "the short story — mechatronics, volts and TypeScript",
    run: (ctx) => {
      ctx.print(
        "Engineer, not a bootcamp graduate: mechatronics, then three years wiring industrial panels, now fullstack & AI.",
      );
      ctx.print("The long version lives one scroll down — try `open about`.");
    },
  },
  {
    name: "skills",
    description: "tools I reach for, grouped by trade",
    run: (ctx) => {
      for (const group of site.skills.groups) {
        ctx.print(`${group.name} — ${group.items.join(" · ")}`);
      }
    },
  },
  {
    name: "work",
    aliases: ["projects"],
    description: "things I actually shipped",
    run: (ctx) => {
      for (const item of site.work.items) {
        ctx.print(`${item.name} — ${item.tags.join(", ")}`);
      }
      ctx.print("run `open work` to see them rendered");
    },
  },
  {
    name: "contact",
    description: "the good part — how to reach me",
    run: (ctx) => {
      ctx.print(`${site.email} — I answer fast.`);
      ctx.print("Opening the good part…");
      ctx.navigate("contact");
    },
  },
  {
    name: "socials",
    aliases: ["links"],
    description: "my corners of the internet",
    run: (ctx) => {
      for (const social of site.socials) {
        ctx.print(`${social.label} — ${social.href}`);
      }
    },
  },
  {
    name: "ls",
    description: "list the sections of this page",
    run: (ctx) => {
      ctx.print("sections/");
      ctx.printChips(["about", "skills", "work", "contact"]);
    },
  },
  {
    name: "open",
    description: "jump straight to a section",
    usage: "open <about | skills | work | contact>",
    run: (ctx) => {
      const [section] = ctx.args;
      if (!section) {
        ctx.print("open: which section? try about, skills, work, contact");
        return;
      }
      if (!isSection(section)) {
        ctx.print(
          `open: no such section "${section}" — try about, skills, work, contact`,
        );
        return;
      }
      ctx.print(
        section === "contact" ? "Opening the good part…" : `Opening ${section}…`,
      );
      ctx.navigate(section);
    },
  },
  {
    name: "confetti",
    description: "a tiny celebration, right here",
    run: (ctx) => {
      ctx.runEffect("confetti");
      ctx.print("Confetti deployed. Carry on.");
    },
  },
  {
    name: "fireworks",
    description: "because small wins deserve big noise",
    run: (ctx) => {
      ctx.runEffect("fireworks");
      ctx.print("Fireworks incoming. Look up.");
    },
  },
  {
    name: "party",
    description: "confetti, fireworks — the whole department",
    run: (ctx) => {
      ctx.runEffect("party");
      ctx.print("Party protocol engaged. Nobody leaves.");
    },
  },
  {
    name: "theme",
    description: "flip the lights on this page",
    run: (ctx) => {
      ctx.toggleTheme();
      ctx.print("Toggling the lights…");
    },
  },
  {
    name: "clear",
    description: "wipe the output, keep the intro",
    run: (ctx) => {
      ctx.clear();
    },
  },
  {
    name: "sudo",
    description: "definitely not available",
    hidden: true,
    run: (ctx) => {
      ctx.print("Nice try. With great power comes great responsibility.");
    },
  },
  {
    name: "rm",
    description: "please don't",
    hidden: true,
    run: (ctx) => {
      const target = ctx.args.join(" ");
      ctx.print(
        target.includes("/")
          ? "Permission denied — this portfolio is load-bearing."
          : "rm: nothing to remove — everything here is hand-typed.",
      );
    },
  },
  {
    name: "exit",
    description: "there is no exit",
    hidden: true,
    run: (ctx) => {
      ctx.print(
        "You can check out any time you like, but you can never leave. Try `open contact`.",
      );
    },
  },
];
