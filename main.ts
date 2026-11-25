// The One-Liner Groan-Off — make.fun bounty entry
// Entry: one original one-line dad joke (at most 140 characters, plain text).
// The program prints the line to stdout and writes it to /output/entry.txt,
// the absolute path the make.fun program/v1 gate reads. It validates the
// gate itself (1-140 characters, single line, not only whitespace) and
// exits non-zero if the entry ever fails it, so a bad entry can never
// silently pass as valid.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Our printer finally got a promotion: after years of jamming, it really made an impression.";

const OUTPUT_PATH = "/output/entry.txt";

// Gate check, same rules the sealed scorer applies: UTF-8 text of 1 to 140
// characters, not only whitespace, a single line.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 140) {
  console.error(`entry is ${chars.length} characters, must be 1-140`);
  process.exit(1);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  console.error("entry must be one non-blank line");
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY + "\n", "utf8");
console.error(`wrote ${OUTPUT_PATH} (${chars.length} characters, 1 line)`);

// process.stdout.write (not console.log) so stdout is byte-identical to entry.txt.
process.stdout.write(ENTRY + "\n");
