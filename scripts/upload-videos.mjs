import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { put, list } from "@vercel/blob";

const VIDEO_DIR = new URL("../public/videos/", import.meta.url);

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("Missing BLOB_READ_WRITE_TOKEN. Run `vercel env pull .env.local` first.");
  process.exit(1);
}

const existing = new Set(
  (await list()).blobs.map((b) => b.pathname),
);

const files = await readdir(VIDEO_DIR);
const mp4s = files.filter((f) => f.toLowerCase().endsWith(".mp4"));

if (mp4s.length === 0) {
  console.log("No .mp4 files found in public/videos/");
  process.exit(0);
}

console.log(`Found ${mp4s.length} mp4 file(s). Uploading...\n`);

let baseUrl = null;

for (const name of mp4s) {
  if (existing.has(name)) {
    console.log(`= ${name} (already uploaded — skipping)`);
    continue;
  }
  const path = join(VIDEO_DIR.pathname, name);
  const { size } = await stat(path);
  const buf = await readFile(path);
  process.stdout.write(`↑ ${name} (${(size / 1024 / 1024).toFixed(1)} MB) ... `);
  const blob = await put(name, buf, {
    access: "public",
    addRandomSuffix: false,
    contentType: "video/mp4",
    allowOverwrite: true,
  });
  console.log("done");
  if (!baseUrl) {
    const u = new URL(blob.url);
    baseUrl = `${u.protocol}//${u.host}`;
  }
}

if (!baseUrl) {
  const any = (await list()).blobs[0];
  if (any) {
    const u = new URL(any.url);
    baseUrl = `${u.protocol}//${u.host}`;
  }
}

console.log("\n──────────────────────────────────────────────");
console.log("Set this Vercel env var:");
console.log(`  NEXT_PUBLIC_VIDEO_CDN=${baseUrl}`);
console.log("──────────────────────────────────────────────");
