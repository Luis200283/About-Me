#!/usr/bin/env node
/**
 * Builds a standalone gallery for the V1 / V3 / V5 proposals.
 * Each proposal is embedded as an <iframe srcdoc> so the whole gallery is
 * ONE self-contained document (no external requests, no image assets).
 *
 * Usage: node scripts/build-gallery-v135.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "docs/design/playground");

const items = [
  {
    id: "v1-terminal",
    key: "V1",
    name: "Terminal-first",
    idea:
      "El hero es la terminal: comandos clicables y el sitio responde con tu perfil.",
    interactions: ["Comandos sugeridos", "Caret parpadeante", "Sticker “it compiles”"],
  },
  {
    id: "v3-doodle",
    key: "V3",
    name: "Doodle",
    idea:
      "Ilustración hecha a mano: mascota, marcador, garabatos y voz en burbuja.",
    interactions: ["Mascota animada", "Burbuja de voz", "Garabatos al paso del cursor"],
  },
  {
    id: "v5-lab",
    key: "V5",
    name: "Lab / control panel",
    idea:
      "Panel de ingeniería: perillas, palancas, medidor y hoja de especificaciones.",
    interactions: ["Aguja del medidor", "Perillas accionables", "Hoja de especificaciones"],
  },
];

const escapeAttr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

const frames = [];
for (const item of items) {
  const html = await readFile(join(dir, `${item.id}.html`), "utf8");
  frames.push(`
  <section class="proposal">
    <div class="p-head">
      <span class="k">${item.key}</span>
      <h2>${item.name}</h2>
      <p class="idea">${item.idea}</p>
    </div>
    <iframe class="shot" height="760" scrolling="no" title="${item.name}"
            srcdoc="${escapeAttr(html)}"></iframe>
    <ul class="tags">${item.interactions.map((t) => `<li>${t}</li>`).join("")}</ul>
  </section>`);
}

const doc = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>About-Me — V1, V3 y V5 (Playground)</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Inter:wght@300..700&family=JetBrains+Mono:wght@400;500&display=swap');
*{box-sizing:border-box}
body{margin:0;background:#EDEAE3;color:#221D2E;font-family:'Inter',system-ui,sans-serif}
.wrap{max-width:840px;margin:0 auto;padding:42px 24px 64px}
.head .over{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8B7CFF}
.head h1{font-family:'Bricolage Grotesque',sans-serif;font-size:30px;font-weight:700;letter-spacing:-.02em;margin:8px 0 8px}
.head p{margin:0;font-size:14.5px;line-height:1.65;color:#574E63;max-width:62ch}
.proposal{margin-top:44px}
.p-head{display:flex;align-items:baseline;gap:11px;flex-wrap:wrap;margin-bottom:12px}
.k{font-family:'JetBrains Mono',monospace;font-size:12px;color:#FF5C7A}
.p-head h2{font-family:'Bricolage Grotesque',sans-serif;font-size:21px;font-weight:650;margin:0;letter-spacing:-.01em}
.idea{margin:0;font-size:13px;color:#574E63;flex:1 1 240px;line-height:1.5}
iframe.shot{width:100%;border:0;display:block;border-radius:14px;background:#FFF6EC}
.tags{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0 0;padding:0;list-style:none}
.tags li{font-family:'JetBrains Mono',monospace;font-size:10.5px;padding:4px 9px;border:1px solid rgba(34,29,46,.2);border-radius:999px;color:#574E63}
</style>
</head>
<body>
<div class="wrap">
  <header class="head">
    <div class="over">W1.5 · Dirección B · Playground</div>
    <h1>V1 · Terminal &nbsp;·&nbsp; V3 · Doodle &nbsp;·&nbsp; V5 · Lab</h1>
    <p>Las tres que elegiste, cada una en su propio marco y con sus animaciones vivas. Pasa el cursor por los controles y los comandos.</p>
  </header>
  ${frames.join("\n")}
</div>
</body>
</html>
`;

const out = join(dir, "gallery-v135-standalone.html");
await writeFile(out, doc, "utf8");
console.log(`wrote ${out} (${doc.length} bytes)`);
