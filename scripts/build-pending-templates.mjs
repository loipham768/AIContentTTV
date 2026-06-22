/**
 * Đọc 6 file HTML từ .claude/tpl/ và tạo .claude/pending-templates.json
 * Chạy: node scripts/build-pending-templates.mjs
 */
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const tplDir = resolve(root, '.claude', 'tpl')

function readHtml(filename) {
  return readFileSync(resolve(tplDir, filename), 'utf8')
}

const templates = [
  {
    id: 'lp-khoa-hoc-lap-trinh',
    name: 'Landing Page Khóa Học Lập Trình',
    category: 'landing',
    description: 'Landing page dark mode phong cách terminal cho khóa học lập trình web full-stack. Phù hợp tech education, coding bootcamp.',
    tags: ['lập trình', 'khóa học', 'dark mode', 'tech', 'developer'],
    gradient: 'linear-gradient(135deg, #0d1117 0%, #003d20 100%)',
    accentColor: '#4ade80',
    order: 0,
    html: readHtml('lp-khoa-hoc-lap-trinh.html'),
  },
  {
    id: 'lp-thuc-pham-sach',
    name: 'Landing Page Thực Phẩm Sạch',
    category: 'landing',
    description: 'Landing page organic xanh tươi cho thực phẩm hữu cơ, rau sạch, farm-to-table. Phong cách earthy, tự nhiên, tin cậy.',
    tags: ['thực phẩm', 'hữu cơ', 'organic', 'xanh lá', 'sức khỏe'],
    gradient: 'linear-gradient(135deg, #f1f8e9 0%, #a5d6a7 50%, #2e7d32 100%)',
    accentColor: '#2e7d32',
    order: 0,
    html: readHtml('lp-thuc-pham-sach.html'),
  },
  {
    id: 'ads-fb-bat-dong-san',
    name: 'Quảng Cáo Bất Động Sản Facebook',
    category: 'ads',
    description: 'Banner quảng cáo Facebook feed cho bất động sản cao cấp. Phong cách navy-gold luxury, preview đúng khung Facebook thực tế.',
    tags: ['bất động sản', 'facebook ads', 'luxury', 'blue-gold', 'property'],
    gradient: 'linear-gradient(135deg, #0f2044 0%, #1a3a6b 50%, #c9a84c 100%)',
    accentColor: '#c9a84c',
    order: 0,
    html: readHtml('ads-fb-bat-dong-san.html'),
  },
  {
    id: 'ads-banner-app',
    name: 'Banner Quảng Cáo App Mobile',
    category: 'ads',
    description: 'Bộ 2 banner display quảng cáo app mobile: 300×250 rectangle và 728×90 leaderboard. Gradient tím-xanh hiện đại.',
    tags: ['app', 'banner', 'display ads', 'purple', 'mobile', 'SaaS'],
    gradient: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #4f46e5 100%)',
    accentColor: '#7c3aed',
    order: 0,
    html: readHtml('ads-banner-app.html'),
  },
  {
    id: 'article-checklist',
    name: 'Bài Viết Dạng Checklist',
    category: 'article',
    description: 'Template bài viết dạng checklist tương tác — người đọc có thể tick từng mục. Có progress bar, highlight box, phù hợp nội dung tips & hướng dẫn.',
    tags: ['checklist', 'tips', 'interactive', 'xanh dương', 'hướng dẫn'],
    gradient: 'linear-gradient(135deg, #f0f9ff 0%, #bae6fd 50%, #0284c7 100%)',
    accentColor: '#0284c7',
    order: 0,
    html: readHtml('article-checklist.html'),
  },
  {
    id: 'article-listicle',
    name: 'Bài Viết Top 10 Listicle',
    category: 'article',
    description: 'Template bài viết listicle Top 10 với ranking card nổi bật, pros/cons, điểm số, verdict box. Phù hợp bài review và so sánh sản phẩm.',
    tags: ['top 10', 'listicle', 'review', 'cam nóng', 'so sánh'],
    gradient: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 50%, #ea580c 100%)',
    accentColor: '#ea580c',
    order: 0,
    html: readHtml('article-listicle.html'),
  },
]

const outputPath = resolve(root, '.claude', 'pending-templates.json')
writeFileSync(outputPath, JSON.stringify(templates, null, 2), 'utf8')

console.log(`\n✅ Đã tạo pending-templates.json với ${templates.length} templates:`)
templates.forEach((t, i) => console.log(`   ${i + 1}. [${t.category}] ${t.name}`))
console.log(`\n📁 File: .claude/pending-templates.json`)
console.log(`\nChạy tiếp: node scripts/import-templates.mjs\n`)
