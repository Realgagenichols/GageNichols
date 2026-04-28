#!/usr/bin/env node
/**
 * PII scanner — fail-fast guard against leaking personal contact info.
 *
 * Scans:
 *  - shared/data.js and shared/components/** (where humans hand-edit content)
 *  - each theme's src/ tree
 *  - each theme's dist/ output (only if it exists)
 *
 * Two scan tiers, per L1 in tasks/lessons.md:
 *  1. Targeted strings — known-private values from the resume.  Always reliable.
 *  2. Heuristic patterns — broad email + phone regex.  Only run on SOURCE files
 *     because minified bundles produce noisy false positives in digit sequences.
 *
 * Exit code 1 on any match, 0 on clean.  CI uses this as a gate.
 */

import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');

const SOURCE_TARGETS = [
  'shared',
  'themes/control-room/src',
  'themes/control-room/index.html',
  'themes/exhibition/src',
  'themes/exhibition/index.html',
  'themes/magazine/src',
  'themes/magazine/index.html',
];

const DIST_TARGETS = [
  'themes/control-room/dist',
  'themes/exhibition/dist',
  'themes/magazine/dist',
];

// Tier 1: targeted strings — always run, against source AND dist
const TARGETED_PATTERNS = [
  { name: 'iCloud email handle', re: /gagetnichols/i },
  { name: 'common consumer email domain', re: /@(icloud|gmail|outlook|yahoo|hotmail|protonmail)\.[a-z]+/i },
  { name: 'specific phone number', re: /210[\s.\-)]*823[\s.\-]*6663|2108236663/ },
  { name: 'resume reference (file or download)', re: /resume\.pdf|download[^"]*resume|resume[^"]*download/i },
  { name: 'me/ directory import', re: /['"`]\.\.?\/(me\/|\.\.\/me\/)/ },
];

// Tier 2: heuristic patterns — source only (minified bundles produce false positives)
const HEURISTIC_PATTERNS = [
  { name: 'email-shaped string', re: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g },
  { name: 'phone-shaped string', re: /\(\d{3}\)\s?\d{3}[\s.\-]\d{4}|\b\d{3}[\s.\-]\d{3}[\s.\-]\d{4}\b/g },
];

const TEXT_EXT = new Set(['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.json', '.md', '.mjs', '.cjs', '.svg', '.txt']);

function isTextFile(path) {
  const dot = path.lastIndexOf('.');
  if (dot === -1) return false;
  return TEXT_EXT.has(path.slice(dot));
}

async function walk(target) {
  const abs = join(ROOT, target);
  if (!existsSync(abs)) return [];
  const st = await stat(abs);
  if (st.isFile()) return [abs];
  const out = [];
  const stack = [abs];
  while (stack.length) {
    const dir = stack.pop();
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      // Skip dependencies, vcs, build output, and TEST FILES — tests
      // intentionally plant fake PII fixtures to verify the privacy guard,
      // and scanning them produces noisy false positives.
      if (
        entry.name === 'node_modules' ||
        entry.name === '.git' ||
        entry.name === '__tests__' ||
        entry.name === 'dist'
      ) continue;
      if (entry.name.endsWith('.test.js') || entry.name.endsWith('.test.jsx')) continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (isTextFile(full)) {
        out.push(full);
      }
    }
  }
  return out;
}

function isAllowedMatch(filePath, matchedString) {
  // The PII scanner script itself contains the patterns and known-private
  // values as DATA — those should not be flagged as leaks.
  if (filePath.endsWith('scripts/scan-pii.mjs')) return true;
  return false;
}

async function scanFile(filePath, patterns, mode) {
  const content = await readFile(filePath, 'utf8');
  const findings = [];
  for (const pat of patterns) {
    pat.re.lastIndex = 0;
    if (pat.re.global) {
      let m;
      while ((m = pat.re.exec(content)) !== null) {
        if (isAllowedMatch(filePath, m[0])) continue;
        const lineNo = content.slice(0, m.index).split('\n').length;
        findings.push({ file: filePath, line: lineNo, match: m[0], pattern: pat.name, mode });
      }
    } else {
      const m = content.match(pat.re);
      if (m && !isAllowedMatch(filePath, m[0])) {
        const idx = content.indexOf(m[0]);
        const lineNo = content.slice(0, idx).split('\n').length;
        findings.push({ file: filePath, line: lineNo, match: m[0], pattern: pat.name, mode });
      }
    }
  }
  return findings;
}

async function main() {
  let allFindings = [];

  // Source scan: targeted + heuristic
  for (const target of SOURCE_TARGETS) {
    const files = await walk(target);
    for (const f of files) {
      const targeted = await scanFile(f, TARGETED_PATTERNS, 'source-targeted');
      const heuristic = await scanFile(f, HEURISTIC_PATTERNS, 'source-heuristic');
      allFindings.push(...targeted, ...heuristic);
    }
  }

  // Dist scan: targeted only
  for (const target of DIST_TARGETS) {
    const files = await walk(target);
    for (const f of files) {
      const targeted = await scanFile(f, TARGETED_PATTERNS, 'dist-targeted');
      allFindings.push(...targeted);
    }
  }

  if (allFindings.length === 0) {
    console.log('[pii:scan] ✓ clean — no PII patterns detected in source or dist');
    process.exit(0);
  }

  console.error(`[pii:scan] ✗ ${allFindings.length} potential PII leak(s) found:\n`);
  for (const f of allFindings) {
    console.error(`  ${relative(ROOT, f.file)}:${f.line}  [${f.pattern}]  → ${JSON.stringify(f.match)}`);
  }
  console.error(`\n[pii:scan] failing build.  Review tasks/lessons.md L1 for source vs dist scan strategy.`);
  process.exit(1);
}

main().catch((err) => {
  console.error('[pii:scan] crashed:', err);
  process.exit(2);
});
