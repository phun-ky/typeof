// Renders the release banners for a major release into public/images, in the
// light look of the README on GitHub: four formats (banner, og, square and
// portrait), each at 1x and 2x, as palette PNGs. The panel on each banner
// shows typeof calls from the README with the values they return.
//
// Usage: npm run banners -- <release>, e.g. 3.0
// The content is in scripts/banners/<release>.mjs. Rendering uses system
// fonts, so nothing is downloaded, a local Chrome or Chromium
// (CHROME=/path/to/chrome to choose one), and Python with Pillow to make the
// PNGs small.
import { execFileSync } from 'node:child_process';
import {
  mkdirSync,
  mkdtempSync,
  rmSync,
  statSync,
  writeFileSync
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const OUT = join(ROOT, 'public', 'images');
const CHROME = process.env.CHROME ?? 'google-chrome';
const FORMATS = [
  { suffix: '', width: 1200, height: 600, layout: 'wide' },
  { suffix: '-og', width: 1200, height: 630, layout: 'wide' },
  { suffix: '-square', width: 1080, height: 1080, layout: 'tall' },
  { suffix: '-portrait', width: 1080, height: 1350, layout: 'tall' }
];
const SCALES = [1, 2];
// Font names of several words need no quotes in CSS
const SANS =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif';
const MONO =
  'ui-monospace, SFMono-Regular, Menlo, Consolas, Liberation Mono, monospace';
const release = process.argv[2];

if (!release) {
  console.error('Usage: npm run banners -- <release>, e.g. 3.0');
  process.exit(1);
}

const { default: content } = await import(
  pathToFileURL(join(ROOT, 'scripts', 'banners', `${release}.mjs`)).href
);
const escape = (text) =>
  String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
const title = content.title
  .map((part) =>
    typeof part === 'string'
      ? escape(part)
      : `<span class="accent">${escape(part.accent)}</span>`
  )
  .join('<br>');
const checks = content.panel.checks
  .map(
    ({ call, result }) =>
      `<div class="row"><code>${escape(call)}</code><i class="${result}">${result}</i></div>`
  )
  .join('');
// GitHub's light colours; muted text, true and false are 4.5:1 or more on white
const page = (layout, format) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><style>
:root { --bg: #ffffff; --dot: #d8dee4; --border: #d1d9e0; --panel: #f6f8fa;
  --text: #1f2328; --muted: #59636e; --accent: #0969da; --true: #1a7f37; --false: #cf222e; }
* { box-sizing: border-box; margin: 0; }
html, body { width: 100%; height: 100%; }
body { position: relative; overflow: hidden; color: var(--text); font-family: ${SANS};
  background: var(--bg) radial-gradient(circle, var(--dot) 1.5px, transparent 1.6px) center top / 28px 28px; }
/* Text sits on the background colour, never on a dot */
.pill, h1, p { position: absolute; background: var(--bg); box-shadow: 0 0 24px 20px var(--bg); }
.pill { display: inline-flex; align-items: center; gap: 14px; padding: 10px 22px 10px 10px;
  border: 1px solid var(--border); border-radius: 999px; box-shadow: none;
  font: 500 18px ${MONO}; letter-spacing: 0.02em; color: var(--muted); }
.pill b { padding: 4px 12px; border-radius: 999px; background: var(--accent); color: var(--bg); font-weight: 600; }
h1 { font-weight: 650; line-height: 1.04; letter-spacing: -0.035em; }
.accent { color: var(--accent); }
p { color: var(--muted); line-height: 1.5; }
.panel { position: absolute; border: 1px solid var(--border); border-radius: 12px; background: var(--bg);
  box-shadow: 0 1px 2px rgb(0 0 0 / 6%), 0 10px 28px rgb(0 0 0 / 7%); overflow: hidden; }
.panel header { display: flex; justify-content: space-between; padding: 16px 24px;
  border-bottom: 1px solid var(--border); background: var(--panel); font: 500 16px ${MONO}; color: var(--muted); }
.panel header b { color: var(--accent); font-weight: 500; }
.row { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px 24px; }
.row + .row { border-top: 1px solid var(--border); }
.row code { font: 500 19px ${MONO}; color: var(--text); white-space: nowrap; }
.row i { font: 600 16px ${MONO}; font-style: normal; padding: 4px 10px; border-radius: 6px;
  border: 1px solid currentcolor; }
.row i.true { color: var(--true); }
.row i.false { color: var(--false); }
/* wide: text left, the panel right */
.wide .pill { top: 64px; left: 72px; }
.wide h1 { top: 172px; left: 72px; width: 600px; font-size: 56px; }
.wide p { bottom: 72px; left: 72px; width: 580px; font-size: 20px; }
.wide .panel { top: 50%; right: 72px; width: 440px; transform: translateY(-50%); }
/* tall: text on top, the panel below */
.tall .pill { top: 80px; left: 80px; font-size: 22px; }
.tall h1 { top: 196px; left: 80px; width: 920px; font-size: 92px; }
.tall p { top: 444px; left: 80px; width: 900px; font-size: 28px; }
.tall .panel { left: 80px; right: 80px; bottom: 88px; }
.tall .panel header { padding: 20px 32px; font-size: 22px; }
.tall .row { padding: 18px 32px; }
.tall .row code { font-size: 28px; }
.tall .row i { font-size: 22px; padding: 6px 14px; }
.square .tall .row { padding: 10px 32px; }
.square .tall .row code { font-size: 24px; }
.square .tall .row i { font-size: 20px; padding: 3px 12px; }
.portrait .tall .panel { bottom: 176px; }
</style></head>
<body class="${format}"><main class="${layout}">
  <div class="pill"><b>typeof</b>${escape(content.pill)}</div>
  <h1>${title}</h1>
  <p>${escape(content.body)}</p>
  <section class="panel">
    <header><span>${escape(content.panel.label)}</span><b>${escape(content.panel.status)}</b></header>
    ${checks}
  </section>
</main></body></html>`;
const dir = mkdtempSync(join(tmpdir(), 'typeof-banners-'));
const written = [];

mkdirSync(OUT, { recursive: true });

try {
  for (const { suffix, width, height, layout } of FORMATS) {
    const file = join(dir, `${suffix || 'banner'}.html`);

    writeFileSync(file, page(layout, suffix.slice(1)));

    for (const scale of SCALES) {
      const path = join(
        OUT,
        `typeof-${content.slug}${suffix}${scale === 2 ? '@2x' : ''}.png`
      );

      execFileSync(
        CHROME,
        [
          '--headless=new',
          '--disable-gpu',
          '--hide-scrollbars',
          `--user-data-dir=${join(dir, 'profile')}`,
          '--virtual-time-budget=3000',
          `--force-device-scale-factor=${scale}`,
          `--window-size=${width},${height}`,
          `--screenshot=${path}`,
          pathToFileURL(file).href
        ],
        { stdio: 'ignore' }
      );
      written.push(path);
    }
  }
} finally {
  rmSync(dir, { recursive: true, force: true });
}

// A palette of up to 256 colours keeps flat artwork sharp and small
execFileSync(
  'python3',
  [
    '-c',
    `import sys
from PIL import Image
for path in sys.argv[1:]:
    Image.open(path).convert('RGB').quantize(256, method=Image.Quantize.MEDIANCUT).save(path, optimize=True)`,
    ...written
  ],
  { stdio: 'inherit' }
);

for (const path of written) {
  console.log(`${relative(ROOT, path)}: ${statSync(path).size} bytes`);
}
