#!/usr/bin/env node
/**
 * Builds a STANDALONE gallery of every Playground proposal (V1-V5 + MIX1-5).
 * Each proposal is embedded as <iframe srcdoc="...">, so the resulting file
 * needs zero network access and zero local assets — perfect for html_render.
 *
 * Usage: node scripts/build-gallery.mjs [outfile]
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "docs/design/playground");

const META = {
  "v1-terminal": { key: "V1", name: "Terminal-first" },
  "v2-scrapbook": { key: "V2", name: "Scrapbook" },
  "v3-doodle": { key: "V3", name: "Doodle" },
  "v4-retro-os": { key: "V4", name: "Retro desktop OS" },
  "v5-lab": { key: "V5", name: "Lab / control panel" },
  "mix1-together": { key: "MIX 1", name: "Together" },
  "mix2-scrapbook-terminal": { key: "MIX 2", name: "Scrapbook + terminal" },
  "mix3-analog-digital": { key: "MIX 3", name: "Analog-digital" },
  "mix4-notebook": { key: "MIX 4", name: "Cuaderno de ingeniero" },
  "mix5-terminal-doodle-panel": { key: "MIX 5", name: "Terminal + doodle + panel" },
};

const escapeAttr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

const files = (await readdir(dir)).filter((f) => f.endsWith(".html") && META[f.replace(".html", "")]);
const entries = files
  .map((f) => ({ id: f.replace(".html", ""), meta: META[f.replace(".html", "")] }))
  .filter((e) => e.meta);

const frames = [];
for (const { id, meta } of entries) {
  const html = await readFile(join(dir, `${id}.html`), "utf8");
  frames.push(`
  <section class="proposal">
    <div class="p-head">
      <span class="k">${meta.key}</span>
      <h2>${meta.name}</h2>
      <span class="dim">${id}</span>
    </div>
    <iframe class="shot" height="820" scrolling="no" title="${meta.name}" srcdoc="${escapeAttr(html)}"></iframe>
  </section>`);
}

const doc = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>About-Me — Galería de propuestas (Playground)</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Inter:wght@300..700&family=JetBrains+Mono:wght@400;500&display=swap');
*{box-sizing:border-box}
body{margin:0;background:#EDEAE3;color:#221D2E;font-family:'Inter',system-ui,sans-serif}
.wrap{max-width:840px;margin:0 auto;padding:42px 24px 70px}
.head .over{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8B7CFF}
.head h1{font-family:'Bricolage Grotesque',sans-serif;font-size:31px;font-weight:700;letter-spacing:-.02em;margin:8px 0 8px}
.head p{margin:0;font-size:14.5px;line-height:1.65;color:#574E63;max-width:62ch}
.proposal{margin-top:42px}
.p-head{display:flex;align-items:baseline;gap:11px;flex-wrap:wrap;margin-bottom:11px}
.k{font-family:'JetBrains Mono',monospace;font-size:12px;color:#FF5C7A;letter-spacing:.08em}
.p-head h2{font-family:'Bricolage Grotesque',sans-serif;font-size:20px;font-weight:650;margin:0;letter-spacing:-.01em}
.dim{font-family:'JetBrains Mono',monospace;font-size:10.5px;color:#8b8797}
iframe.shot{width:100%;border:0;display:block;border-radius:14px;background:#FFF6EC}
</style>
</head>
<body>
<div class="wrap">
  <header class="head">
    <div class="over">W1.5 · W3 · Dirección B · Playground</div>
    <h1>${entries.length} propuestas, un solo lenguaje</h1>
    <p>Variaciones originales (V1–V5) y mezclas V1+V2+V3 en una página scrollable (MIX 1–5). Todas con animaciones vivas: pasa el cursor por comandos, controles y notas.</p>
  </header>
  ${frames.join("\n")}
</div>
</body>
</html>
`;

const out = process.argv[2] ? join(root, process.argv[2]) : join(dir, "gallery-all.html");
await writeFile(out, doc, "utf8");
console.log(`wrote ${out} (${(doc.length / 1024).toFixed(1)} KB, ${entries.length} proposals)`);
