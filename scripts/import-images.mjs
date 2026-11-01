// Imports the curated project images into /public/images, resized for the web,
// and writes src/data/images.json (width/height per image) so next/image can
// reserve space without layout shift.
//
// Primary source: the hand-picked set in ../luxe-interiors/assets/images.
// A few extras are pulled from ../../interior-images to fill missing rooms.
//
// Usage: npm run images
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const CURATED = path.resolve(ROOT, "../luxe-interiors/assets/images");
const RAW = path.resolve(ROOT, "../../interior-images");
const OUT_DIR = path.join(ROOT, "public/images");
const DATA_FILE = path.join(ROOT, "src/data/images.json");
const MAX_WIDTH = 2400;

const curated = (slug, file, room) => ({ from: path.join(CURATED, slug, file), room });
const raw = (folder, time, room) => ({
  from: path.join(RAW, folder, `WhatsApp Image 2026-04-02 at ${time}.jpeg`),
  room,
});

// Order here is the display order within each room group.
const PROJECTS = {
  shekhertek: [
    curated("shekhertek", "foyer-1.jpeg", "foyer"),
    raw("Shekhertek Project", "3.43.04 AM (1)", "living"),
    raw("Shekhertek Project", "3.43.04 AM", "living"),
    curated("shekhertek", "dining-room-1.jpeg", "dining"),
    curated("shekhertek", "dining-room-2.jpeg", "dining"),
    curated("shekhertek", "kitchen-1.jpeg", "kitchen"),
    curated("shekhertek", "bedroom-1.jpeg", "bedroom"),
    curated("shekhertek", "bedroom-2.jpeg", "bedroom"),
    curated("shekhertek", "bedroom-wardrobe-1.jpeg", "wardrobe"),
    curated("shekhertek", "dressing-area-1.jpeg", "dressing"),
    raw("Shekhertek Project", "3.43.08 AM (2)", "bath"),
  ],
  cumilla: [
    curated("cumilla", "living-room-1.jpeg", "living"),
    raw("Cumilla Project", "3.48.14 AM (2)", "living"),
    curated("cumilla", "dining-room-1.jpeg", "dining"),
    curated("cumilla", "kitchen-1.jpeg", "kitchen"),
    curated("cumilla", "bedroom-1.jpeg", "bedroom"),
    curated("cumilla", "bedroom-2.jpeg", "bedroom"),
    curated("cumilla", "bedroom-wardrobe-1.jpeg", "wardrobe"),
    curated("cumilla", "bathroom-1.jpeg", "bath"),
    curated("cumilla", "bathroom-2.jpeg", "bath"),
  ],
};

const manifest = {};

for (const [slug, items] of Object.entries(PROJECTS)) {
  const outDir = path.join(OUT_DIR, slug);
  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(outDir, { recursive: true });

  const counters = {};
  manifest[slug] = [];

  for (const { from, room } of items) {
    counters[room] = (counters[room] ?? 0) + 1;
    const name = `${room}-${String(counters[room]).padStart(2, "0")}.jpg`;

    const { width, height } = await sharp(from)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(path.join(outDir, name));

    manifest[slug].push({ src: `/images/${slug}/${name}`, room, width, height });
  }
  console.log(`${slug}: ${items.length} images`);
}

await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
await fs.writeFile(DATA_FILE, JSON.stringify(manifest, null, 2) + "\n");
console.log(`wrote ${path.relative(ROOT, DATA_FILE)}`);
