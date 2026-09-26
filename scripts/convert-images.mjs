import { readdir, stat, unlink } from "node:fs/promises"
import { basename, dirname, extname, join, relative, sep } from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..")
const imagesRoot = join(projectRoot, "src", "assets", "images")
const sourceExtensions = new Set([".png", ".jpg", ".jpeg"])

const folderSettings = {
  markets: { width: 1200, quality: 78, small: { width: 600, quality: 75 } },
  pages: { width: 1200, quality: 78 },
  produce: { width: 600, height: 600, fit: "cover", quality: 80 },
  brand: { width: 512, quality: 90 },
}

const defaultSettings = { width: 1200, quality: 78 }

function settingsFor(relativePath) {
  const parts = relativePath.split(sep)
  const folder = parts.length > 1 ? parts[0] : ""
  const name = basename(relativePath, extname(relativePath))
  if (folder === "pages" && name === "hero") {
    return { width: 1920, quality: 78, small: { width: 800, quality: 75 } }
  }
  return folderSettings[folder] ?? defaultSettings
}

async function collectImages(directory) {
  const found = []
  const entries = await readdir(directory, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(directory, entry.name)
    if (entry.isDirectory()) {
      found.push(...(await collectImages(full)))
    } else if (sourceExtensions.has(extname(entry.name).toLowerCase())) {
      found.push(full)
    }
  }
  return found
}

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }
  return `${(bytes / 1024).toFixed(1)} KB`
}

function pad(value, width) {
  return String(value).padEnd(width)
}

function padStart(value, width) {
  return String(value).padStart(width)
}

async function convert(file) {
  const relativePath = relative(imagesRoot, file)
  const settings = settingsFor(relativePath)
  const name = basename(file, extname(file))
  const target = join(dirname(file), `${name}.webp`)
  const oldBytes = (await stat(file)).size
  const source = sharp(file).rotate()
  const before = await source.metadata()

  await source
    .resize({
      width: settings.width,
      height: settings.height,
      fit: settings.fit ?? "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: settings.quality })
    .toFile(target)

  const newBytes = (await stat(target)).size
  const after = await sharp(target).metadata()

  const rows = [
    {
      from: relativePath.split(sep).join("/"),
      to: relative(imagesRoot, target).split(sep).join("/"),
      oldBytes,
      newBytes,
      oldDimensions: `${before.width}x${before.height}`,
      newDimensions: `${after.width}x${after.height}`,
      quality: settings.quality,
    },
  ]

  if (settings.small) {
    const smallTarget = join(dirname(file), `${name}-sm.webp`)
    await sharp(file)
      .rotate()
      .resize({
        width: settings.small.width,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: settings.small.quality })
      .toFile(smallTarget)

    const smallBytes = (await stat(smallTarget)).size
    const smallAfter = await sharp(smallTarget).metadata()
    rows.push({
      from: relativePath.split(sep).join("/"),
      to: relative(imagesRoot, smallTarget).split(sep).join("/"),
      oldBytes,
      newBytes: smallBytes,
      oldDimensions: `${before.width}x${before.height}`,
      newDimensions: `${smallAfter.width}x${smallAfter.height}`,
      quality: settings.small.quality,
    })
  }

  await unlink(file)

  return rows
}

async function main() {
  const files = (await collectImages(imagesRoot)).sort()
  if (files.length === 0) {
    console.log("No png, jpg or jpeg files found under src/assets/images.")
    return
  }

  const rows = []
  for (const file of files) {
    rows.push(...(await convert(file)))
  }

  const headers = ["source", "webp file", "old size", "new size", "saved", "old px", "new px", "q"]
  const cells = rows.map((row) => [
    row.from,
    row.to,
    formatBytes(row.oldBytes),
    formatBytes(row.newBytes),
    `${Math.round((1 - row.newBytes / row.oldBytes) * 100)}%`,
    row.oldDimensions,
    row.newDimensions,
    String(row.quality),
  ])
  const widths = headers.map((header, index) =>
    Math.max(header.length, ...cells.map((cell) => cell[index].length)),
  )

  const line = widths.map((width) => "-".repeat(width)).join("  ")
  console.log(headers.map((header, index) => (index === 0 ? pad(header, widths[0]) : padStart(header, widths[index]))).join("  "))
  console.log(line)
  for (const cell of cells) {
    console.log(cell.map((value, index) => (index === 0 ? pad(value, widths[0]) : padStart(value, widths[index]))).join("  "))
  }
  console.log(line)

  const sourceBytes = new Map(rows.map((row) => [row.from, row.oldBytes]))
  const oldTotal = [...sourceBytes.values()].reduce((sum, bytes) => sum + bytes, 0)
  const newTotal = rows.reduce((sum, row) => sum + row.newBytes, 0)
  console.log(`${sourceBytes.size} files converted into ${rows.length} webp files`)
  console.log(`total before: ${formatBytes(oldTotal)} (${oldTotal} bytes)`)
  console.log(`total after:  ${formatBytes(newTotal)} (${newTotal} bytes)`)
  console.log(`saved:        ${Math.round((1 - newTotal / oldTotal) * 100)}%`)
}

await main()
