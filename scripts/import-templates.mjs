/**
 * Chạy: node scripts/import-templates.mjs
 * Đọc .claude/pending-templates.json và import thẳng vào MongoDB.
 */
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// ── Đọc .env.local ──────────────────────────────────────────────────────────
function loadEnv(file) {
  try {
    const content = readFileSync(resolve(root, file), 'utf8')
    const env = {}
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const idx = trimmed.indexOf('=')
      if (idx === -1) continue
      const key = trimmed.slice(0, idx).trim()
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
      env[key] = val
    }
    return env
  } catch {
    return {}
  }
}

const env = { ...loadEnv('.env'), ...loadEnv('.env.local') }
const MONGODB_URI = env.MONGODB_URI
if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI không tìm thấy trong .env.local')
  process.exit(1)
}

// ── Schema (khớp với models/Template.ts) ────────────────────────────────────
const TemplateSchema = new mongoose.Schema(
  {
    id:          { type: String, required: true, unique: true },
    name:        { type: String, required: true },
    category:    { type: String, required: true, enum: ['landing', 'article', 'ads', 'portfolio', 'cv'] },
    description: { type: String, default: '' },
    tags:        [{ type: String }],
    gradient:    { type: String, required: true },
    accentColor: { type: String, required: true },
    html:        { type: String, required: true },
    order:       { type: Number, default: 0 },
  },
  { timestamps: true }
)

const Template = mongoose.models?.Template ?? mongoose.model('Template', TemplateSchema)

// ── Đọc file JSON ────────────────────────────────────────────────────────────
const jsonPath = resolve(root, '.claude', 'pending-templates.json')
let templates
try {
  templates = JSON.parse(readFileSync(jsonPath, 'utf8'))
} catch (e) {
  console.error('❌  Không đọc được .claude/pending-templates.json:', e.message)
  process.exit(1)
}

console.log(`\n📦  Tìm thấy ${templates.length} template trong pending-templates.json\n`)

// ── Kết nối và import ────────────────────────────────────────────────────────
await mongoose.connect(MONGODB_URI, { maxPoolSize: 5 })

let added = 0, skipped = 0, failed = 0

for (const t of templates) {
  try {
    const exists = await Template.findOne({ id: t.id }).lean()
    if (exists) {
      console.log(`⏭   Bỏ qua (đã tồn tại): ${t.id}`)
      skipped++
      continue
    }

    const topOrder = await Template.findOne({}, { order: 1 }).sort({ order: -1 }).lean()
    const order = typeof t.order === 'number' ? t.order : ((topOrder?.order ?? -1) + 1)

    await Template.create({
      id:          t.id,
      name:        t.name,
      category:    t.category,
      description: t.description ?? '',
      tags:        Array.isArray(t.tags) ? t.tags : [],
      gradient:    t.gradient,
      accentColor: t.accentColor,
      html:        t.html,
      order,
    })

    console.log(`✅  Đã thêm: ${t.name} (${t.category})`)
    added++
  } catch (e) {
    console.error(`❌  Lỗi ${t.id}:`, e.message)
    failed++
  }
}

await mongoose.disconnect()

console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉  Hoàn thành import!
   ✅ Đã thêm  : ${added}
   ⏭  Bỏ qua  : ${skipped}
   ❌ Lỗi      : ${failed}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`)
