// scripts/convert-to-webp.mjs
//
// Bulk-converts all .jpg/.jpeg/.png images in a folder (and its subfolders)
// to .webp, keeping the same filename and folder structure.
//
// Usage:
//   node scripts/convert-to-webp.mjs public/images/side-project
//
// Optional: pass --delete to remove the original files after conversion.
//   node scripts/convert-to-webp.mjs public/images/side-project --delete

import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, basename } from "path";
import { unlink } from "fs/promises";

const args = process.argv.slice(2);
const targetDir = args.find((a) => !a.startsWith("--"));
const shouldDelete = args.includes("--delete");

if (!targetDir) {
  console.error("Usage: node scripts/convert-to-webp.mjs <folder> [--delete]");
  process.exit(1);
}

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (IMAGE_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

async function convertFile(filePath) {
  const dir = filePath.substring(0, filePath.lastIndexOf("/"));
  const name = basename(filePath, extname(filePath));
  const outputPath = join(dir, `${name}.webp`);

  await sharp(filePath).webp({ quality: 82 }).toFile(outputPath);

  const beforeSize = (await stat(filePath)).size;
  const afterSize = (await stat(outputPath)).size;
  const savedPct = (((beforeSize - afterSize) / beforeSize) * 100).toFixed(1);

  console.log(
    `✔ ${filePath} → ${outputPath}  (${(beforeSize / 1024).toFixed(
      1,
    )}KB → ${(afterSize / 1024).toFixed(1)}KB, -${savedPct}%)`,
  );

  if (shouldDelete) {
    await unlink(filePath);
    console.log(`  ↳ deleted original: ${filePath}`);
  }
}

async function main() {
  console.log(`Scanning ${targetDir} for images...`);
  const files = await walk(targetDir);

  if (files.length === 0) {
    console.log("No .jpg/.jpeg/.png files found.");
    return;
  }

  console.log(`Found ${files.length} image(s). Converting...\n`);

  for (const file of files) {
    try {
      await convertFile(file);
    } catch (err) {
      console.error(`✘ Failed to convert ${file}:`, err.message);
    }
  }

  console.log("\nDone.");
}

main();
