// Inkbound Duel — make.fun entry hand-in (Node 22, standard library only).
//
// The game lives in game/ beside this file: plain static files, game/index.html
// opens in a desktop browser and plays offline, no network request. This program
// hands it in: it stages game/ and screenshots/ into the output directory and
// writes dossier.json there with the vendored make.fun library, so the scorer
// can check the entry and the judge can read it.
//
//   MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Outside the grader MAKEFUN_OUTPUT_DIR stands in for /output; inside the
// grader it defaults to /output.

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');

function fail(message: string): never {
  console.error(`inkbound-duel: ${message}`);
  process.exit(1);
}

function requireDir(path: string, label: string): void {
  if (!existsSync(path) || !statSync(path).isDirectory()) fail(`missing ${label} directory: ${path}`);
}

function requireFile(path: string, label: string): void {
  if (!existsSync(path) || !statSync(path).isFile()) fail(`missing ${label}: ${path}`);
}

function stageFolder(name: string): void {
  const from = join(repoRoot, name);
  const to = join(outDir, name);
  requireDir(from, name);
  mkdirSync(to, { recursive: true });
  cpSync(from, to, { recursive: true });
  const entries = readdirSync(to);
  console.log(`inkbound-duel: staged ${name}/ (${entries.length} entries)`);
}

// The scorer's caps, from the competition's gate: only text_max_bytes shapes
// the dossier bytes; the rest refuse an entry the scorer would refuse anyway
// (more than 4 screenshots or one over 256 KiB; game/ past 993 entries or
// 48 MiB in all, or a path under game/ longer than 1000 bytes).
const DOSSIER_CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000,
};

requireDir(join(repoRoot, 'game'), 'game');
requireDir(join(repoRoot, 'screenshots'), 'screenshots');
requireFile(join(repoRoot, 'game', 'index.html'), 'game/index.html');
const shotNames = readdirSync(join(repoRoot, 'screenshots')).filter(f => /\.(png|jpe?g)$/i.test(f));
if (shotNames.length < 3) fail(`need at least 3 screenshots, found ${shotNames.length}`);
console.log(`inkbound-duel: screenshots: ${shotNames.sort().join(', ')}`);
mkdirSync(outDir, { recursive: true });
stageFolder('game');
stageFolder('screenshots');

const dossierPath = join(outDir, 'dossier.json');
writeFileSync(dossierPath, buildDossier(outDir, DOSSIER_CAPS));
console.log(`inkbound-duel: wrote ${dossierPath}`);
console.log('inkbound-duel: hand-in complete');
