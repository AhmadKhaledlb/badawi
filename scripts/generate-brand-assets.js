#!/usr/bin/env node
/**
 * BADAWI brand asset generator.
 *
 *   node scripts/generate-brand-assets.js
 *
 * Renders the Waypoint mark from src/design/brand/mark-geometry.json — the
 * SAME geometry the in-app SVG mark uses — into the platform raster assets
 * Expo needs, plus editable .svg vector sources.
 *
 * Deliberately DEPENDENCY-FREE. It adds no production dependency, no build-time
 * dependency, and no native toolchain: path flattening, scanline fill, stroke
 * expansion, supersampled downsampling, and PNG encoding are all implemented
 * here against Node's built-in `zlib` only. That keeps brand assets
 * reproducible from source on any machine, and keeps the app icon provably
 * identical to the mark rendered inside the app.
 *
 * Outputs (assets/brand/):
 *   icon.png                      1024  iOS/Expo app icon (Indigo ground)
 *   adaptive-icon-foreground.png  1024  Android adaptive foreground (alpha)
 *   adaptive-icon-monochrome.png  1024  Android themed-icon monochrome (alpha)
 *   splash-icon.png                512  splash mark (alpha, on Indigo bg)
 *   favicon.png                     64  web favicon (Indigo ground, compact)
 *   badawi-mark.svg                     editable duotone vector source
 *   badawi-mark-mono.svg                editable single-colour vector source
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const geometry = require('../src/design/brand/mark-geometry.json');

const OUT_DIR = path.join(__dirname, '..', 'assets', 'brand');
const VB = geometry.viewBoxSize;
const P = geometry.palette;

/** Supersampling factor. Every shape is rasterised at SS× then box-filtered. */
const SS = 4;

// ── Path parsing / flattening ────────────────────────────────────────────
// Minimal absolute-coordinate SVG subset: M, L, C, Z — which is all the mark
// geometry uses. Anything else is a deliberate error rather than a silent
// mis-render.

function parsePath(d) {
  const tokens = d.trim().match(/[MLCZmlcz]|-?\d*\.?\d+/g) || [];
  const subpaths = [];
  let current = null;
  let cursor = [0, 0];
  let i = 0;

  const num = () => parseFloat(tokens[i++]);

  while (i < tokens.length) {
    const cmd = tokens[i++];
    switch (cmd) {
      case 'M': {
        if (current && current.length > 1) subpaths.push(current);
        cursor = [num(), num()];
        current = [cursor];
        break;
      }
      case 'L': {
        cursor = [num(), num()];
        current.push(cursor);
        break;
      }
      case 'C': {
        const p0 = cursor;
        const p1 = [num(), num()];
        const p2 = [num(), num()];
        const p3 = [num(), num()];
        const STEPS = 48;
        for (let s = 1; s <= STEPS; s++) {
          const t = s / STEPS;
          const u = 1 - t;
          current.push([
            u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
            u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
          ]);
        }
        cursor = p3;
        break;
      }
      case 'Z':
      case 'z': {
        if (current && current.length > 1) subpaths.push(current);
        current = null;
        break;
      }
      default:
        throw new Error(`generate-brand-assets: unsupported path command "${cmd}" in "${d}"`);
    }
  }
  if (current && current.length > 1) subpaths.push(current);
  return subpaths;
}

function circlePolygon(cx, cy, r, segments = 256) {
  const points = [];
  for (let s = 0; s < segments; s++) {
    const a = (s / segments) * Math.PI * 2;
    points.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return points;
}

/**
 * Expands a polyline into filled polygons: a quad per segment plus a round
 * joint per vertex. Unioned (not wound) when filled, so overlaps never cancel.
 */
function strokePolygons(points, width) {
  const half = width / 2;
  const polygons = [];
  for (let s = 0; s < points.length - 1; s++) {
    const [x0, y0] = points[s];
    const [x1, y1] = points[s + 1];
    const dx = x1 - x0;
    const dy = y1 - y0;
    const len = Math.hypot(dx, dy);
    if (len < 1e-9) continue;
    const nx = (-dy / len) * half;
    const ny = (dx / len) * half;
    polygons.push([
      [x0 + nx, y0 + ny],
      [x1 + nx, y1 + ny],
      [x1 - nx, y1 - ny],
      [x0 - nx, y0 - ny],
    ]);
  }
  for (const [px, py] of points) polygons.push(circlePolygon(px, py, half, 16));
  return polygons;
}

// ── Rasterisation ────────────────────────────────────────────────────────

/** Union-fills one polygon into a coverage mask using even-odd scanlines. */
function fillPolygon(mask, w, h, polygon) {
  let minY = Infinity;
  let maxY = -Infinity;
  for (const [, y] of polygon) {
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const yStart = Math.max(0, Math.floor(minY));
  const yEnd = Math.min(h - 1, Math.ceil(maxY));

  for (let y = yStart; y <= yEnd; y++) {
    const sampleY = y + 0.5;
    const crossings = [];
    for (let s = 0; s < polygon.length; s++) {
      const [x0, y0] = polygon[s];
      const [x1, y1] = polygon[(s + 1) % polygon.length];
      if (y0 === y1) continue;
      if (sampleY >= Math.min(y0, y1) && sampleY < Math.max(y0, y1)) {
        crossings.push(x0 + ((sampleY - y0) / (y1 - y0)) * (x1 - x0));
      }
    }
    if (crossings.length < 2) continue;
    crossings.sort((a, b) => a - b);
    for (let c = 0; c + 1 < crossings.length; c += 2) {
      const xs = Math.max(0, Math.ceil(crossings[c] - 0.5));
      const xe = Math.min(w - 1, Math.floor(crossings[c + 1] - 0.5));
      const row = y * w;
      for (let x = xs; x <= xe; x++) mask[row + x] = 1;
    }
  }
}

function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

/** Composites a coverage mask onto an RGBA buffer, optionally clipped. */
function composite(rgba, mask, clip, w, h, hex) {
  const [r, g, b] = hexToRgb(hex);
  for (let i = 0; i < w * h; i++) {
    if (!mask[i]) continue;
    if (clip && !clip[i]) continue;
    const o = i * 4;
    rgba[o] = r;
    rgba[o + 1] = g;
    rgba[o + 2] = b;
    rgba[o + 3] = 255;
  }
}

/** Box-filters the supersampled buffer down to the final size. */
function downsample(rgba, bigW, bigH, factor) {
  const w = bigW / factor;
  const h = bigH / factor;
  const out = Buffer.alloc(w * h * 4);
  const n = factor * factor;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;
      for (let dy = 0; dy < factor; dy++) {
        for (let dx = 0; dx < factor; dx++) {
          const o = ((y * factor + dy) * bigW + (x * factor + dx)) * 4;
          const alpha = rgba[o + 3];
          // Premultiply so transparent pixels don't drag colour toward black.
          r += rgba[o] * alpha;
          g += rgba[o + 1] * alpha;
          b += rgba[o + 2] * alpha;
          a += alpha;
        }
      }
      const o = (y * w + x) * 4;
      out[o] = a > 0 ? Math.round(r / a) : 0;
      out[o + 1] = a > 0 ? Math.round(g / a) : 0;
      out[o + 2] = a > 0 ? Math.round(b / a) : 0;
      out[o + 3] = Math.round(a / n);
    }
  }
  return { data: out, width: w, height: h };
}

// ── PNG encoding (zlib only) ─────────────────────────────────────────────

function crc32(buf) {
  let c;
  const table = crc32.table || (crc32.table = (() => {
    const t = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c;
    }
    return t;
  })());
  let crc = -1;
  for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  return (crc ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

function encodePng(data, width, height) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0; // filter: none
    data.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // colour type RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// ── The mark ─────────────────────────────────────────────────────────────

/**
 * @param {object} options
 * @param {number} options.size      final edge length in px
 * @param {string|null} options.ground   background hex, or null for transparent
 * @param {string} options.ink       ring / terrain / line-work colour
 * @param {string|null} options.accent   star colour; falls back to `ink` (mono)
 * @param {boolean} options.compact  drop horizon, north tick, far ridge
 * @param {number} options.inset     fraction of the canvas left as clear space
 */
function renderMark({ size, ground, ink, accent, compact = false, inset = 0.14 }) {
  const W = size * SS;
  const H = size * SS;
  const scale = (W * (1 - inset * 2)) / VB;
  const offset = (W - VB * scale) / 2;
  const T = ([x, y]) => [x * scale + offset, y * scale + offset];
  const S = (v) => v * scale;

  const rgba = Buffer.alloc(W * H * 4);
  if (ground) {
    const [r, g, b] = hexToRgb(ground);
    for (let i = 0; i < W * H; i++) {
      const o = i * 4;
      rgba[o] = r;
      rgba[o + 1] = g;
      rgba[o + 2] = b;
      rgba[o + 3] = 255;
    }
  }

  const newMask = () => new Uint8Array(W * H);
  const paint = (polygons, hex, clip) => {
    const mask = newMask();
    for (const poly of polygons) fillPolygon(mask, W, H, poly);
    composite(rgba, mask, clip, W, H, hex);
  };

  // Terrain clip: the ring's inner edge.
  const clipR = geometry.bezel.r - geometry.bezel.strokeWidth / 2;
  const clip = newMask();
  fillPolygon(clip, W, H, circlePolygon(...T([geometry.bezel.cx, geometry.bezel.cy]), S(clipR)));

  // 1. The instrument ring.
  const [bx, by] = T([geometry.bezel.cx, geometry.bezel.cy]);
  paint(
    strokePolygons(
      [...circlePolygon(bx, by, S(geometry.bezel.r), 256), circlePolygon(bx, by, S(geometry.bezel.r), 256)[0]],
      S(geometry.bezel.strokeWidth)
    ),
    ink
  );

  if (!compact) {
    // 2. Horizon.
    paint(
      strokePolygons(
        [T([geometry.horizon.x1, geometry.horizon.y]), T([geometry.horizon.x2, geometry.horizon.y])],
        S(geometry.horizon.strokeWidth)
      ),
      ink,
      clip
    );
    // 3. Far ridge.
    for (const sub of parsePath(geometry.farRidgePath)) {
      paint(strokePolygons(sub.map(T), S(geometry.farRidgeStrokeWidth)), ink, clip);
    }
  }

  // 4. Near dune.
  paint(parsePath(geometry.nearDunePath).map((sub) => sub.map(T)), ink, clip);

  // 5. Orientation star.
  paint(parsePath(geometry.starPath).map((sub) => sub.map(T)), accent || ink);

  const small = downsample(rgba, W, H, SS);
  return encodePng(small.data, small.width, small.height);
}

// ── SVG export ───────────────────────────────────────────────────────────

function renderSvg({ ink, accent, compact = false }) {
  const g = geometry;
  const parts = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB} ${VB}" width="${VB}" height="${VB}">`,
    '  <!-- BADAWI "Waypoint" mark. Generated by scripts/generate-brand-assets.js',
    '       from src/design/brand/mark-geometry.json. Edit the JSON, not this file. -->',
    '  <defs>',
    `    <clipPath id="terrain"><circle cx="${g.bezel.cx}" cy="${g.bezel.cy}" r="${g.bezel.r - g.bezel.strokeWidth / 2}"/></clipPath>`,
    '  </defs>',
    `  <circle cx="${g.bezel.cx}" cy="${g.bezel.cy}" r="${g.bezel.r}" fill="none" stroke="${ink}" stroke-width="${g.bezel.strokeWidth}"/>`,
    '  <g clip-path="url(#terrain)">',
  ];
  if (!compact) {
    parts.push(
      `    <line x1="${g.horizon.x1}" y1="${g.horizon.y}" x2="${g.horizon.x2}" y2="${g.horizon.y}" stroke="${ink}" stroke-width="${g.horizon.strokeWidth}" opacity="0.55"/>`,
      `    <path d="${g.farRidgePath}" fill="none" stroke="${ink}" stroke-width="${g.farRidgeStrokeWidth}" opacity="0.55"/>`
    );
  }
  parts.push(`    <path d="${g.nearDunePath}" fill="${ink}"/>`, '  </g>');
  parts.push(`  <path d="${g.starPath}" fill="${accent || ink}"/>`, '</svg>', '');
  return parts.join('\n');
}

// ── Build ────────────────────────────────────────────────────────────────

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const write = (name, buf) => {
    fs.writeFileSync(path.join(OUT_DIR, name), buf);
    const kb = (buf.length / 1024).toFixed(1);
    console.log(`  ${name.padEnd(32)} ${kb} KB`);
  };

  console.log('BADAWI brand assets →', path.relative(process.cwd(), OUT_DIR));

  // App icon: Ecru mark with the Terracotta star on the Indigo ground.
  // Duotone is safe here because the star sits on Indigo *inside the ring's
  // terrain-free upper quadrant*, where it reads as a graphic element, not text.
  write(
    'icon.png',
    renderMark({ size: 1024, ground: P.indigo, ink: P.ecru, accent: P.terracotta, inset: 0.17 })
  );

  // Android adaptive foreground: transparent, extra inset for the 66% safe zone.
  write(
    'adaptive-icon-foreground.png',
    renderMark({ size: 1024, ground: null, ink: P.ecru, accent: P.terracotta, inset: 0.28 })
  );

  // Android themed icon: single colour, alpha only.
  write(
    'adaptive-icon-monochrome.png',
    renderMark({ size: 1024, ground: null, ink: '#FFFFFF', accent: null, inset: 0.28 })
  );

  // Splash mark: sits on the Indigo splash background declared in app.json.
  write(
    'splash-icon.png',
    renderMark({ size: 512, ground: null, ink: P.ecru, accent: P.terracotta, inset: 0.06 })
  );

  // Favicon: compact variant — at 64px the horizon rule and north tick blur.
  write(
    'favicon.png',
    renderMark({ size: 64, ground: P.indigo, ink: P.ecru, accent: P.terracotta, compact: true, inset: 0.12 })
  );

  write('badawi-mark.svg', Buffer.from(renderSvg({ ink: P.brown, accent: P.terracotta }), 'utf8'));
  write('badawi-mark-mono.svg', Buffer.from(renderSvg({ ink: P.brown, accent: null }), 'utf8'));

  console.log('Done.');
}

main();
