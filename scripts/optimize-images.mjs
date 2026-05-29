#!/usr/bin/env node
import { mkdir, copyFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(process.cwd(), "public");
const RAW = path.join(ROOT, "_raw");

// (1) Source thumbnails that ship to the homepage stage / cards.
// next/image will re-encode these to AVIF; we just cap source dimensions
// so the optimizer doesn't have to chew on 2000-px-wide PNGs.
const THUMB_TARGETS = [
  { file: "thumbnails/buk-unboxing.png", maxW: 1600, maxH: 1100 },
  { file: "thumbnails/buk-unboxing-home.png", maxW: 1600, maxH: 1100 },
  { file: "thumbnails/data-dashboard.png", maxW: 1600, maxH: 1100 },
  { file: "thumbnails/unboxideas-1.png", maxW: 600, maxH: 1300 },
  { file: "thumbnails/unboxideas-2.png", maxW: 600, maxH: 1300 },
  { file: "thumbnails/unboxideas-stats.png", maxW: 600, maxH: 1300 },
  { file: "thumbnails/unboxideas-upvotes.png", maxW: 600, maxH: 1300 },
  { file: "thumbnails/jungschar-manager.png", maxW: 600, maxH: 1300 },
  { file: "thumbnails/jungschar-manager-2.png", maxW: 600, maxH: 1300 },
  { file: "thumbnails/putzmanager.png", maxW: 1600, maxH: 1100 },
  // Hero + About portraits are displayed at ≤ 400 px square; the 5 MB and
  // 3 MB source JPGs are pure waste for next/image's encoder.
  { file: "marco-portrait.jpg", maxW: 1000, maxH: 1000 },
  { file: "marco-about.jpg", maxW: 1200, maxH: 1200 },
];

// (2) InfiniteGrid logos. SVG <image> bypasses next/image, so we hand-resize
// to 128x128 WebP and write them under public/logos/_grid/.
const GRID_LOGOS = [
  "logos/ts_white.png",
  "logos/react_logo.png",
  "logos/nextjs.webp",
  "logos/tailwind.png",
  "logos/html_logo_white.png",
  "logos/css_logo_white.png",
  "logos/vs_code.png",
  "logos/python_logo.png",
  "logos/sql_logo.png",
  "logos/pandas.png",
  "logos/plotly.png",
  "logos/streamlit.png",
  "logos/supabase.webp",
  "logos/vercel.png",
  "logos/git_logo.png",
  "logos/figma.png",
  "logos/ps_white.png",
  "logos/ae_white.png",
  "logos/indesign_white.png",
  "logos/blender.png",
  "logos/unreal_white.webp",
  "logos/davinci_white.png",
  "logos/capcut.png",
  "logos/PowerBI.png",
  "logos/sap_white.png",
  "logos/databricks.png",
  "logos/claude_logo.png",
  "logos/Midjourney logo.png",
  "logos/runway_logo_white.png",
  "logos/11logo_white.png",
];

async function backup(rel) {
  const src = path.join(ROOT, rel);
  if (!existsSync(src)) return false;
  const dest = path.join(RAW, rel);
  await mkdir(path.dirname(dest), { recursive: true });
  if (!existsSync(dest)) await copyFile(src, dest);
  return true;
}

async function resizeInPlace(rel, maxW, maxH) {
  const ok = await backup(rel);
  if (!ok) {
    console.warn(`  skip: ${rel} (not found)`);
    return;
  }
  const src = path.join(RAW, rel);
  const dest = path.join(ROOT, rel);
  const before = (await stat(dest)).size;
  const ext = path.extname(rel).toLowerCase();
  // .rotate() with no args honors EXIF orientation before stripping metadata.
  // Without it, phone/camera photos with non-default orientation come out sideways.
  let pipeline = sharp(src)
    .rotate()
    .resize({
      width: maxW,
      height: maxH,
      fit: "inside",
      withoutEnlargement: true,
    });
  if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9, palette: true });
  } else if (ext === ".jpg" || ext === ".jpeg") {
    pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true });
  } else if (ext === ".webp") {
    pipeline = pipeline.webp({ quality: 82 });
  }
  await pipeline.toFile(dest + ".tmp");
  await (await import("node:fs/promises")).rename(dest + ".tmp", dest);
  const after = (await stat(dest)).size;
  console.log(
    `  ${rel}: ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB`,
  );
}

async function buildGridLogo(rel) {
  const src = path.join(ROOT, rel);
  if (!existsSync(src)) {
    console.warn(`  skip grid: ${rel} (not found)`);
    return null;
  }
  const outName = path.basename(rel).replace(/\.[^.]+$/, ".webp");
  const outRel = path.join("logos/_grid", outName);
  const outPath = path.join(ROOT, outRel);
  await mkdir(path.dirname(outPath), { recursive: true });
  await sharp(src)
    .resize({ width: 128, height: 128, fit: "inside" })
    .webp({ quality: 82 })
    .toFile(outPath);
  const size = (await stat(outPath)).size;
  console.log(`  grid: ${rel} → /${outRel} (${(size / 1024).toFixed(1)} KB)`);
  return outRel;
}

async function main() {
  await mkdir(RAW, { recursive: true });

  console.log("Resizing thumbnails in place (originals → public/_raw/):");
  for (const t of THUMB_TARGETS) {
    await resizeInPlace(t.file, t.maxW, t.maxH);
  }

  console.log("\nBuilding 128×128 WebP grid logos:");
  const built = [];
  for (const rel of GRID_LOGOS) {
    const out = await buildGridLogo(rel);
    if (out) built.push("/" + out.replace(/\\/g, "/"));
  }

  console.log("\nGrid logo paths (paste into LOGOS array if needed):");
  for (const p of built) console.log("  '" + p + "',");

  // Spot-check: total of grid logos
  let total = 0;
  for (const entry of await readdir(path.join(ROOT, "logos/_grid")).catch(
    () => [],
  )) {
    total += (await stat(path.join(ROOT, "logos/_grid", entry))).size;
  }
  console.log(`\nGrid logos total: ${(total / 1024).toFixed(0)} KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
