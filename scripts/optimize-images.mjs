// Converteert projectafbeeldingen naar WebP en verkleint ze tot een redelijke breedte.
// Gebruik: npm run images            (verwerkt src/assets/**)
//          npm run images -- --keep  (bewaart de originele bestanden)
import { readdir, rename, stat, unlink } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

// Zonder dit houdt sharp op Windows een handle op het bronbestand open (EPERM bij rename).
sharp.cache(false)

const ROOT = fileURLToPath(new URL('../src/assets/', import.meta.url))
const MAX_WIDTH = 1600
const QUALITY = 78
// Afbeeldingen die klein op de pagina staan hoeven niet 1600px breed te zijn.
const WIDTH_OVERRIDES = [{ pattern: /portret/i, width: 800 }]
const maxWidthFor = file =>
  WIDTH_OVERRIDES.find(o => o.pattern.test(file))?.width ?? MAX_WIDTH
const CONVERTIBLE = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const keepOriginals = process.argv.includes('--keep')

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

async function optimize(file) {
  const ext = extname(file).toLowerCase()
  if (!CONVERTIBLE.has(ext)) return null

  const maxWidth = maxWidthFor(file)
  const { width = 0 } = await sharp(file).metadata()
  // Een WebP die al klein genoeg is laten we met rust.
  if (ext === '.webp' && width <= maxWidth) return null

  const before = (await stat(file)).size
  const buffer = await sharp(file)
    .resize({ width: Math.min(width, maxWidth), withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer()

  const target = file.slice(0, -ext.length) + '.webp'
  await sharp(buffer).toFile(`${target}.tmp`)
  await rename(`${target}.tmp`, target)
  if (target !== file && !keepOriginals) await unlink(file)

  return { file, before, after: buffer.length }
}

const kb = n => `${Math.round(n / 1024)} kB`
let saved = 0
for await (const file of walk(ROOT)) {
  try {
    const result = await optimize(file)
    if (!result) continue
    saved += result.before - result.after
    console.log(`${relative(ROOT, result.file)}: ${kb(result.before)} -> ${kb(result.after)}`)
  } catch (error) {
    console.error(`Kon ${file} niet verwerken: ${error.message}`)
    process.exitCode = 1
  }
}
console.log(`Totaal bespaard: ${kb(saved)}`)
