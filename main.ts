// news-image-01 — "Sum up 13 November's world news in one image".
// Copies the selected candidate image to the output directory as entry.png.
// Deterministic: no network, no randomness, no clock. Two runs write
// byte-identical output.
//
// Candidates (all 1024x1024, six verified stories of Friday 13 Nov 2026):
//   1 = front-page / editorial collage, 2 = hero scene with insets,
//   3 = globe / world-map montage with labelled vignettes.
//
// Usage: edit CANDIDATE below, then run:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Output dir: MAKEFUN_OUTPUT_DIR env var, else /output.

import { copyFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Select the candidate image: 1, 2 or 3.
// Default 1 (front-page collage) — the strongest candidate.
const CANDIDATE = 3;

if (!Number.isInteger(CANDIDATE) || CANDIDATE < 1 || CANDIDATE > 3) {
  throw new Error(`CANDIDATE must be 1, 2 or 3, got: ${CANDIDATE}`);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";

const src = join(__dirname, "candidates", `cand${CANDIDATE}.jpg`);
if (!existsSync(src)) {
  throw new Error(`candidate image not found: ${src}`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
const dest = join(OUTPUT_DIR, "entry.png");
copyFileSync(src, dest);

// The competition caps entries at 1 MiB; fail loudly instead of shipping
// an oversized file.
const size = statSync(dest).size;
if (size > 1024 * 1024) {
  throw new Error(`entry.png is ${size} bytes, over the 1 MiB limit`);
}
console.log(`wrote ${dest} (candidate ${CANDIDATE}, ${size} bytes)`);
