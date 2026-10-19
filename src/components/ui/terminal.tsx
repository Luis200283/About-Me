"use client";

import { cn } from "@/lib/utils";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

export type TerminalIntroLine =
  | { cmd: string; out: string }
  | { cmd: string; chips: readonly string[] };

export type TerminalEntry =
  | { kind: "cmd"; cmd: string }
  | { kind: "out"; text: string }
  | { kind: "chips"; chips: readonly string[] }
  | {
      kind: "suggestions";
      items: readonly { name: string; description: string }[];
    };

export type TerminalSection = "top" | "about" | "skills" | "work" | "contact";
export type TerminalEffect = "confetti" | "fireworks" | "party";

export type TerminalActions = {
  navigate: (target: TerminalSection) => void;
  runEffect: (name: TerminalEffect) => void;
  toggleTheme: () => void;
};

export type TerminalContext = {
  args: readonly string[];
  print: (text: string) => void;
  printChips: (chips: readonly string[]) => void;
  printSuggestions: (
    items: readonly { name: string; description: string }[],
  ) => void;
  clear: () => void;
} & TerminalActions;

export type TerminalCommand = {
  name: string;
  aliases?: readonly string[];
  description: string;
  usage?: string;
  hidden?: boolean;
  run: (ctx: TerminalContext) => void;
};

export type TerminalProps = {
  title: string;
  intro: readonly TerminalIntroLine[];
  commands: readonly TerminalCommand[];
  actions: TerminalActions;
  hint?: string;
};

type InternalEntry = TerminalEntry | { kind: "error"; text: string };

const MAX_ENTRIES = 80;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function Terminal({
  title,
  intro,
  commands,
  actions,
  hint = 'type "help"',
}: TerminalProps) {
  const [entries, setEntries] = useState<InternalEntry[]>([]);
  const [value, setValue] = useState("");
  const [caret, setCaret] = useState<number | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const draftRef = useRef("");
  const copyTimerRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(
    () => () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    },
    [],
  );

  const commandsByName = useMemo(() => {
    const map = new Map<string, TerminalCommand>();
    for (const command of commands) {
      map.set(command.name, command);
      for (const alias of command.aliases ?? []) map.set(alias, command);
    }
    return map;
  }, [commands]);

  const append = useCallback((next: InternalEntry[]) => {
    setEntries((prev) => [...prev, ...next].slice(-MAX_ENTRIES));
  }, []);

  const runCommand = useCallback(
    (command: TerminalCommand, args: readonly string[]) => {
      const buffer: InternalEntry[] = [];
      let didClear = false;
      const ctx: TerminalContext = {
        args,
        print: (text) => buffer.push({ kind: "out", text }),
        printChips: (chips) => buffer.push({ kind: "chips", chips }),
        printSuggestions: (items) => buffer.push({ kind: "suggestions", items }),
        clear: () => {
          didClear = true;
          buffer.length = 0;
        },
        ...actions,
      };
      command.run(ctx);
      setEntries((prev) => {
        const base = didClear ? [] : prev;
        return [...base, ...buffer].slice(-MAX_ENTRIES);
      });
    },
    [actions],
  );

  const runLine = useCallback(
    (raw: string) => {
      const line = raw.trim().replace(/\s+/g, " ");
      if (!line) return;
      const [name, ...args] = line.split(" ");
      const command = commandsByName.get(name);
      if (!command) {
        append([
          { kind: "cmd", cmd: line },
          { kind: "error", text: `zsh: command not found: ${name} — try "help"` },
        ]);
        return;
      }
      append([{ kind: "cmd", cmd: line }]);
      runCommand(command, args);
    },
    [append, commandsByName, runCommand],
  );

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    node.scrollTo({ top: node.scrollHeight, behavior: "auto" });
  }, [entries, value, reducedMotion]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const line = value.trim().replace(/\s+/g, " ");
    setValue("");
    setCaret(null);
    setHistoryIndex(null);
    draftRef.current = "";
    if (line) setHistory((prev) => [...prev, line]);
    runLine(value);
    inputRef.current?.focus();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setCaret(event.target.selectionStart ?? null);
    if (historyIndex !== null) setHistoryIndex(null);
  };

  const recall = (text: string) => {
    setValue(text);
    setCaret(null);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      if (historyIndex === null) {
        draftRef.current = value;
        const index = history.length - 1;
        setHistoryIndex(index);
        recall(history[index]);
      } else if (historyIndex > 0) {
        const index = historyIndex - 1;
        setHistoryIndex(index);
        recall(history[index]);
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === null) return;
      if (historyIndex < history.length - 1) {
        const index = historyIndex + 1;
        setHistoryIndex(index);
        recall(history[index]);
      } else {
        setHistoryIndex(null);
        recall(draftRef.current);
      }
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const parts = value.split(" ");
      const token = parts[0] ?? "";
      if (!token) return;
      const matches: TerminalCommand[] = [];
      for (const command of commands) {
        if (command.hidden || matches.includes(command)) continue;
        const names = [command.name, ...(command.aliases ?? [])];
        if (names.some((name) => name.startsWith(token))) matches.push(command);
      }
      if (matches.length === 1) {
        parts[0] = matches[0].name;
        recall(parts.join(" "));
      } else if (matches.length > 1) {
        append([{ kind: "chips", chips: matches.map((match) => match.name) }]);
      }
    }
  };

  const handleBodyClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("a, button")) return;
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) return;
    inputRef.current?.focus();
  };

  const showCopied = () => {
    setCopied(true);
    if (copyTimerRef.current !== null) window.clearTimeout(copyTimerRef.current);
    copyTimerRef.current = window.setTimeout(() => setCopied(false), 1500);
  };

  const handleTextMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;
    const node = selection.anchorNode;
    if (!node || !scrollRef.current?.contains(node)) return;
    const text = selection.toString().trim();
    if (!text || text.length > 4000) return;

    const fallbackCopy = () => {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
      } catch {
        /* clipboard unavailable */
      }
      area.remove();
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(showCopied, () => {
        fallbackCopy();
        showCopied();
      });
    } else {
      fallbackCopy();
      showCopied();
    }
  };

  const runSuggestion = (name: string) => {
    runLine(name);
    inputRef.current?.focus();
  };

  const caretPos = caret === null ? value.length : Math.min(caret, value.length);
  const blinkingCursor = (
    <span
      aria-hidden="true"
      className="inline-block text-sun"
      style={
        reducedMotion
          ? undefined
          : { animation: "caret-blink 1.1s steps(1) infinite" }
      }
    >
      ▍
    </span>
  );

  return (
    <div
      className={cn(
        "relative rotate-[-1deg] rounded-[14px] border-[1.5px] border-ink bg-terminal p-0",
        "shadow-[6px_6px_0_var(--color-line)] dark:shadow-[6px_6px_0_var(--color-ink)]",
        "transition-colors focus-within:border-sun",
      )}
    >
      <div className="flex items-center gap-2 border-b border-terminal-dim/25 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-coral" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-sun" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-mint" aria-hidden="true" />
        <span className="ml-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-terminal-dim">
          {title}
        </span>
        <span
          aria-live="polite"
          className={cn(
            "pointer-events-none absolute right-3 top-2.5 rounded-full border-[1.5px] border-ink bg-sun px-2.5 py-0.5",
            "font-mono text-[0.625rem] uppercase tracking-[0.12em] text-on-accent shadow-[2px_2px_0_var(--color-ink)]",
            "transition-all duration-300 ease-out",
            copied ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
          )}
        >
          {copied ? "copied" : ""}
        </span>
      </div>

      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-label="Terminal output"
        data-lenis-prevent
        onClick={handleBodyClick}
        onMouseUp={handleTextMouseUp}
        className={cn(
          "h-[20.5rem] overflow-y-auto overscroll-contain px-5 py-5",
          "font-mono text-[0.8125rem] leading-[1.9] text-terminal-text",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {intro.map((line, index) => (
          <div key={`intro-${index}`}>
            <p>
              <span className="text-mint">➜</span> luis.dev{" "}
              <span className="text-sun">{line.cmd}</span>
            </p>
            {"chips" in line ? (
              <ul className="mt-1.5 flex flex-wrap gap-2">
                {line.chips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full bg-mint px-2.5 py-1 font-mono text-[0.6875rem] text-on-accent"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-terminal-dim">{line.out}</p>
            )}
          </div>
        ))}

        {entries.map((entry, index) => {
          if (entry.kind === "cmd") {
            return (
              <p key={`entry-${index}`}>
                <span className="text-mint">➜</span> luis.dev{" "}
                <span className="text-sun">{entry.cmd}</span>
              </p>
            );
          }

          if (entry.kind === "out") {
            return (
              <p key={`entry-${index}`} className="text-terminal-dim">
                {entry.text}
              </p>
            );
          }

          if (entry.kind === "error") {
            return (
              <p key={`entry-${index}`} className="text-coral">
                {entry.text}
              </p>
            );
          }

          if (entry.kind === "chips") {
            return (
              <ul
                key={`entry-${index}`}
                className="mt-1.5 flex flex-wrap gap-2"
              >
                {entry.chips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full bg-mint px-2.5 py-1 font-mono text-[0.6875rem] text-on-accent"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            );
          }

          return (
            <ul
              key={`entry-${index}`}
              className="mt-1.5 flex flex-col gap-0.5"
            >
              {entry.items.map((item) => (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => runSuggestion(item.name)}
                    className={cn(
                      "flex w-full flex-wrap items-baseline gap-x-2 rounded-lg px-2 py-0.5 text-left",
                      "transition-colors hover:bg-terminal-dim/10 focus-visible:bg-terminal-dim/10",
                    )}
                  >
                    <span className="text-sun">{item.name}</span>
                    <span className="text-terminal-dim">
                      {item.description}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          );
        })}

        <form onSubmit={handleSubmit} className="mt-1">
          <div className="flex items-baseline">
            <span className="text-mint">➜</span>
            <span className="ml-1.5 shrink-0">luis.dev</span>
            <span className="relative ml-1.5 min-w-0 flex-1">
              <span className="break-all">
                {value ? (
                  <>
                    <span className="text-sun">{value.slice(0, caretPos)}</span>
                    <span className={caretPos > 0 ? "ml-1" : undefined}>
                      {blinkingCursor}
                    </span>
                    <span className="text-sun">{value.slice(caretPos)}</span>
                  </>
                ) : (
                  <>
                    {blinkingCursor}
                    {hint ? (
                      <span
                        aria-hidden="true"
                        className="ml-1.5 text-terminal-dim"
                      >
                        {hint}
                      </span>
                    ) : null}
                  </>
                )}
              </span>
              <input
                ref={inputRef}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onSelect={(event) =>
                  setCaret(event.currentTarget.selectionStart)
                }
                aria-label="Terminal command"
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="go"
                className="absolute inset-0 w-full cursor-text bg-transparent caret-transparent opacity-0 outline-none"
                style={{ fontSize: "16px" }}
              />
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
