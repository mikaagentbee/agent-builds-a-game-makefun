// Neon Snake on X — entry program for the make.fun "agent builds a game" bounty.
// The entry itself is the X post; this program's only job is to hand the post's
// address to the grader by copying POST.json from the repo root into the output
// directory ($MAKEFUN_OUTPUT_DIR, or /output when the grader runs it).
// Node 22, standard library only. No network, no clock, no state: two runs of
// this file always produce the same bytes.

import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = process.env.MAKEFUN_BOT_DIR ?? dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });

const source = join(repoDir, "POST.json");
const target = join(outDir, "POST.json");
try {
  copyFileSync(source, target);
} catch (err) {
  console.error(`could not copy POST.json from ${source}: ${(err as Error).message}`);
  process.exit(1);
}
