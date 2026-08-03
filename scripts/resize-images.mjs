import sharp from "sharp";
import { readdir, stat, mkdir } from "fs/promises";
import { join, extname } from "path";

const args = process.argv.slice(2);
const sourceDir = args[0];
const outputDir = args[1];
const maxWidth = Number(args[2]) || 1200;

if (!sourceDir || !outputDir) {
  console.error("Usage: node scripts/resize-images.mjs <sourceFolder> <outputFolder> [maxWidth]");
  process.exit(1);
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const entries = await readdir(sourceDir, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile() && extname(e.name).toLowerCase() === ".webp")
    .map((e) => e.name);

  if (files.length === 0) {
    console.log("No .webp files found.");
    return;
  }

  console.log(`Resizing ${files.length} image(s) to max width ${maxWidth}px...`);
  console.log(`Source: ${sourceDir}`);
  console.log(`Output: ${outputDir}`);

  for (const name of files) {
    const inputPath = join(sourceDir, name);
    const outputPath = join(outputDir, name);

    try {
      const before = (await stat(inputPath)).size;
      const metadata = await sharp(inputPath).metadata();

      if (!metadata.width || metadata.width <= maxWidth) {
        await sharp(inputPath).webp({ quality: 82 }).toFile(outputPath);
        console.log(`- ${name} already small, copied as-is`);
        continue;
      }

      await sharp(inputPath)
        .resize({ width: maxWidth, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(outputPath);

      const after = (await stat(outputPath)).size;
      const savedPct = (((before - after) / before) * 100).toFixed(1);

      console.log(`OK: ${name}  (${(before / 1024).toFixed(1)}KB -> ${(after / 1024).toFixed(1)}KB, -${savedPct}%)`);
    } catch (err) {
      console.error(`FAILED: ${name}:`, err.message);
    }
  }

  console.log("Done.");
}

main();
