/**
 * Đọc 5 file HTML portfolio từ .claude/tpl/ và tạo .claude/pending-templates.json
 * Chạy: node scripts/build-portfolio-templates.mjs
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
    id: 'portfolio-architect',
    name: 'Portfolio Kiến Trúc Sư',
    category: 'portfolio',
    description: 'Portfolio kiến trúc sư và thiết kế nội thất. Phong cách minimal sang trọng với tông beige-charcoal, showcase dự án qua grid ảnh, quy trình làm việc 4 bước rõ ràng.',
    tags: ['kiến trúc', 'nội thất', 'portfolio', 'minimal', 'beige', 'sang trọng'],
    gradient: 'linear-gradient(135deg, #f5f2ee 0%, #d4c8b4 50%, #c8b89a 100%)',
    accentColor: '#c8b89a',
    order: 0,
    html: readHtml('portfolio-architect.html'),
  },
  {
    id: 'portfolio-doctor',
    name: 'Portfolio Bác Sĩ Chuyên Khoa',
    category: 'portfolio',
    description: 'Portfolio bác sĩ / chuyên gia y tế. Giao diện chuyên nghiệp navy-teal, đặt lịch khám online, timeline kinh nghiệm, bảng giá minh bạch và đánh giá bệnh nhân.',
    tags: ['y tế', 'bác sĩ', 'portfolio', 'xanh navy', 'professional', 'medical'],
    gradient: 'linear-gradient(135deg, #e8f4fd 0%, #0369a1 60%, #0d9488 100%)',
    accentColor: '#0a4d8c',
    order: 0,
    html: readHtml('portfolio-doctor.html'),
  },
  {
    id: 'portfolio-chef',
    name: 'Portfolio Đầu Bếp Fine Dining',
    category: 'portfolio',
    description: 'Portfolio đầu bếp điều hành và nghệ nhân ẩm thực. Dark luxury với tông vàng gold trên nền tối, showcase món ăn signature, form thuê chef cho sự kiện catering.',
    tags: ['đầu bếp', 'ẩm thực', 'portfolio', 'dark', 'gold', 'fine dining', 'catering'],
    gradient: 'linear-gradient(135deg, #1a1008 0%, #2d1810 50%, #c9a84c 100%)',
    accentColor: '#c9a84c',
    order: 0,
    html: readHtml('portfolio-chef.html'),
  },
  {
    id: 'portfolio-lawyer',
    name: 'Portfolio Luật Sư Chuyên Nghiệp',
    category: 'portfolio',
    description: 'Portfolio luật sư và văn phòng pháp lý. Giao diện navy-gold trang trọng, lĩnh vực hành nghề, kinh nghiệm tranh tụng, bảng phí minh bạch và form tư vấn miễn phí.',
    tags: ['luật sư', 'pháp lý', 'portfolio', 'navy gold', 'formal', 'tư vấn pháp luật'],
    gradient: 'linear-gradient(135deg, #0c1b33 0%, #1a3456 60%, #b8952a 100%)',
    accentColor: '#b8952a',
    order: 0,
    html: readHtml('portfolio-lawyer.html'),
  },
  {
    id: 'portfolio-marketing',
    name: 'Portfolio Marketing Manager',
    category: 'portfolio',
    description: 'Portfolio marketing manager và growth strategist. Dark mode tím-hồng hiện đại, metrics nổi bật, showcase chiến dịch thực tế với ROAS và KPI cụ thể, phù hợp digital marketer.',
    tags: ['marketing', 'growth', 'portfolio', 'purple', 'dark mode', 'digital marketing', 'performance'],
    gradient: 'linear-gradient(135deg, #0f0a1a 0%, #7c3aed 60%, #ec4899 100%)',
    accentColor: '#7c3aed',
    order: 0,
    html: readHtml('portfolio-marketing.html'),
  },
]

const outputPath = resolve(root, '.claude', 'pending-templates.json')
writeFileSync(outputPath, JSON.stringify(templates, null, 2), 'utf8')

console.log(`\n✅ Đã tạo pending-templates.json với ${templates.length} portfolio templates:`)
templates.forEach((t, i) => console.log(`   ${i + 1}. [${t.category}] ${t.name}`))
console.log(`\n📁 File: .claude/pending-templates.json`)
console.log(`\nChạy tiếp: node scripts/import-templates.mjs\n`)
