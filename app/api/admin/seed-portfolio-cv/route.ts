import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import TemplateModel from '@/models/Template'

export const runtime = 'nodejs'

async function isAdmin(userId: string) {
  const user = await User.findById(userId).lean() as any
  return !!(user?.isAdmin || user?.email === process.env.ADMIN_EMAIL)
}

const PORTFOLIO_CV_TEMPLATES = [
  {
    id: 'portfolio-creative-designer',
    name: 'Portfolio Designer Sáng Tạo',
    category: 'portfolio',
    description: 'Portfolio cá nhân cho designer với layout hiện đại, showcase dự án dạng grid, gradient tím-hồng nổi bật.',
    tags: ['portfolio', 'designer', 'creative', 'gradient', 'modern'],
    gradient: 'from-purple-500 to-pink-500',
    accentColor: '#a855f7',
    html: `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Portfolio – Nguyễn Minh Thiết</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',sans-serif;background:#0f0a1e;color:#e2d9f3;line-height:1.6}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;background:linear-gradient(135deg,#1a0533 0%,#2d1b69 50%,#0f0a1e 100%);position:relative;overflow:hidden;padding:40px 20px}
.hero::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(ellipse at center,rgba(168,85,247,.15) 0%,transparent 70%);animation:pulse 4s ease-in-out infinite}
@keyframes pulse{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.1);opacity:1}}
.avatar{width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,#a855f7,#ec4899);display:flex;align-items:center;justify-content:center;font-size:48px;margin:0 auto 24px;border:3px solid rgba(168,85,247,.4);box-shadow:0 0 40px rgba(168,85,247,.3)}
h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:800;background:linear-gradient(135deg,#e879f9,#a855f7,#818cf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:12px}
.hero-sub{font-size:1.1rem;color:#c4b5fd;margin-bottom:8px;letter-spacing:2px;text-transform:uppercase}
.hero-desc{max-width:500px;margin:16px auto 32px;color:#9ca3af;font-size:1rem}
.tags{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:36px}
.tag{padding:6px 16px;border-radius:20px;font-size:.8rem;font-weight:600;letter-spacing:.5px}
.tag-1{background:rgba(168,85,247,.2);color:#d8b4fe;border:1px solid rgba(168,85,247,.3)}
.tag-2{background:rgba(236,72,153,.2);color:#f9a8d4;border:1px solid rgba(236,72,153,.3)}
.tag-3{background:rgba(129,140,248,.2);color:#a5b4fc;border:1px solid rgba(129,140,248,.3)}
.btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.btn-primary{padding:14px 32px;background:linear-gradient(135deg,#a855f7,#ec4899);color:#fff;border:none;border-radius:12px;font-size:.95rem;font-weight:700;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:transform .2s,box-shadow .2s}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(168,85,247,.4)}
.btn-outline{padding:14px 32px;background:transparent;color:#c4b5fd;border:2px solid rgba(168,85,247,.4);border-radius:12px;font-size:.95rem;font-weight:700;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all .2s}
.btn-outline:hover{background:rgba(168,85,247,.1);border-color:#a855f7}
section{padding:80px 20px}
.container{max-width:1100px;margin:0 auto}
.section-title{text-align:center;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:800;margin-bottom:12px;color:#f3e8ff}
.section-sub{text-align:center;color:#9ca3af;margin-bottom:56px;font-size:.95rem}
.skills-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
.skill-card{background:rgba(255,255,255,.04);border:1px solid rgba(168,85,247,.15);border-radius:16px;padding:24px;transition:all .2s}
.skill-card:hover{border-color:rgba(168,85,247,.4);background:rgba(168,85,247,.06);transform:translateY(-3px)}
.skill-icon{font-size:2rem;margin-bottom:12px}
.skill-name{font-weight:700;color:#e2d9f3;margin-bottom:8px}
.skill-bar{height:6px;background:rgba(255,255,255,.1);border-radius:3px;overflow:hidden;margin-top:10px}
.skill-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,#a855f7,#ec4899)}
.projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px}
.project-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:20px;overflow:hidden;transition:all .3s}
.project-card:hover{transform:translateY(-6px);border-color:rgba(168,85,247,.3);box-shadow:0 20px 40px rgba(0,0,0,.3)}
.project-thumb{height:180px;display:flex;align-items:center;justify-content:center;font-size:4rem;position:relative;overflow:hidden}
.p1{background:linear-gradient(135deg,#1e1b4b,#312e81)}
.p2{background:linear-gradient(135deg,#1a0533,#4c1d95)}
.p3{background:linear-gradient(135deg,#0f172a,#1e3a5f)}
.project-info{padding:20px}
.project-title{font-size:1.05rem;font-weight:700;color:#f3e8ff;margin-bottom:8px}
.project-desc{color:#9ca3af;font-size:.85rem;line-height:1.6;margin-bottom:14px}
.project-tags{display:flex;gap:6px;flex-wrap:wrap}
.ptag{font-size:.7rem;padding:3px 10px;border-radius:10px;background:rgba(168,85,247,.15);color:#c4b5fd;border:1px solid rgba(168,85,247,.2)}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:20px;margin-top:60px;padding:40px;background:rgba(255,255,255,.03);border-radius:24px;border:1px solid rgba(255,255,255,.06)}
.stat{text-align:center}
.stat-num{font-size:2.5rem;font-weight:800;background:linear-gradient(135deg,#a855f7,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.stat-label{color:#9ca3af;font-size:.85rem;margin-top:4px}
.contact-section{background:linear-gradient(135deg,rgba(168,85,247,.1),rgba(236,72,153,.1));border:1px solid rgba(168,85,247,.2);border-radius:24px;padding:60px 40px;text-align:center}
.contact-email{font-size:1.4rem;font-weight:700;color:#c4b5fd;margin:20px 0}
.social-links{display:flex;gap:16px;justify-content:center;margin-top:28px}
.social-link{width:44px;height:44px;border-radius:12px;background:rgba(168,85,247,.15);border:1px solid rgba(168,85,247,.3);display:flex;align-items:center;justify-content:center;text-decoration:none;color:#c4b5fd;font-size:1rem;transition:all .2s}
.social-link:hover{background:rgba(168,85,247,.3);transform:translateY(-2px)}
footer{text-align:center;padding:40px 20px;color:#4b5563;font-size:.85rem;border-top:1px solid rgba(255,255,255,.05)}
</style>
</head>
<body>
<section class="hero">
  <div style="position:relative;z-index:1">
    <div class="avatar">✦</div>
    <div class="hero-sub">UI/UX Designer & Brand Identity</div>
    <h1>Nguyễn Minh Thiết</h1>
    <p class="hero-desc">Tôi tạo ra những trải nghiệm số đẹp và có ý nghĩa — từ giao diện người dùng đến nhận diện thương hiệu.</p>
    <div class="tags">
      <span class="tag tag-1">UI/UX Design</span>
      <span class="tag tag-2">Brand Identity</span>
      <span class="tag tag-3">Motion Design</span>
    </div>
    <div class="btns">
      <a href="#projects" class="btn-primary">📁 Xem dự án</a>
      <a href="#contact" class="btn-outline">✉ Liên hệ</a>
    </div>
  </div>
</section>

<section id="skills">
  <div class="container">
    <h2 class="section-title">Kỹ năng</h2>
    <p class="section-sub">Công cụ và lĩnh vực tôi thành thạo</p>
    <div class="skills-grid">
      <div class="skill-card">
        <div class="skill-icon">🎨</div>
        <div class="skill-name">UI Design</div>
        <div style="font-size:.8rem;color:#9ca3af">Figma, Adobe XD</div>
        <div class="skill-bar"><div class="skill-fill" style="width:95%"></div></div>
      </div>
      <div class="skill-card">
        <div class="skill-icon">🖌️</div>
        <div class="skill-name">Brand Identity</div>
        <div style="font-size:.8rem;color:#9ca3af">Illustrator, InDesign</div>
        <div class="skill-bar"><div class="skill-fill" style="width:88%"></div></div>
      </div>
      <div class="skill-card">
        <div class="skill-icon">⚡</div>
        <div class="skill-name">Motion Design</div>
        <div style="font-size:.8rem;color:#9ca3af">After Effects, Rive</div>
        <div class="skill-bar"><div class="skill-fill" style="width:78%"></div></div>
      </div>
      <div class="skill-card">
        <div class="skill-icon">💻</div>
        <div class="skill-name">Front-end</div>
        <div style="font-size:.8rem;color:#9ca3af">HTML, CSS, React</div>
        <div class="skill-bar"><div class="skill-fill" style="width:72%"></div></div>
      </div>
    </div>
    <div class="stats">
      <div class="stat"><div class="stat-num">48+</div><div class="stat-label">Dự án hoàn thành</div></div>
      <div class="stat"><div class="stat-num">32</div><div class="stat-label">Khách hàng hài lòng</div></div>
      <div class="stat"><div class="stat-num">5★</div><div class="stat-label">Đánh giá trung bình</div></div>
      <div class="stat"><div class="stat-num">4+</div><div class="stat-label">Năm kinh nghiệm</div></div>
    </div>
  </div>
</section>

<section id="projects" style="background:rgba(255,255,255,.02)">
  <div class="container">
    <h2 class="section-title">Dự án nổi bật</h2>
    <p class="section-sub">Một số công việc tôi tự hào nhất</p>
    <div class="projects-grid">
      <div class="project-card">
        <div class="project-thumb p1">🛍️</div>
        <div class="project-info">
          <div class="project-title">Redesign App Thương Mại</div>
          <div class="project-desc">Thiết kế lại toàn bộ trải nghiệm mua sắm cho ứng dụng với 500k+ người dùng, tăng conversion 34%.</div>
          <div class="project-tags"><span class="ptag">Mobile</span><span class="ptag">UX Research</span><span class="ptag">Figma</span></div>
        </div>
      </div>
      <div class="project-card">
        <div class="project-thumb p2">🎯</div>
        <div class="project-info">
          <div class="project-title">Brand Identity Startup</div>
          <div class="project-desc">Xây dựng nhận diện thương hiệu hoàn chỉnh từ logo, bộ màu, typography đến brand guideline.</div>
          <div class="project-tags"><span class="ptag">Branding</span><span class="ptag">Logo</span><span class="ptag">Guidelines</span></div>
        </div>
      </div>
      <div class="project-card">
        <div class="project-thumb p3">📊</div>
        <div class="project-info">
          <div class="project-title">Dashboard Analytics SaaS</div>
          <div class="project-desc">Thiết kế hệ thống dashboard phức tạp với 50+ component, dark mode, responsive hoàn toàn.</div>
          <div class="project-tags"><span class="ptag">Dashboard</span><span class="ptag">SaaS</span><span class="ptag">Design System</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="contact">
  <div class="container">
    <div class="contact-section">
      <h2 class="section-title">Hãy cùng tạo ra điều tuyệt vời</h2>
      <p style="color:#9ca3af;margin-top:12px">Tôi luôn mở cửa cho các dự án thú vị và cơ hội hợp tác mới.</p>
      <div class="contact-email">✉ hello@minhthiet.design</div>
      <a href="mailto:hello@minhthiet.design" class="btn-primary">Gửi lời chào →</a>
      <div class="social-links">
        <a href="#" class="social-link">in</a>
        <a href="#" class="social-link">be</a>
        <a href="#" class="social-link">dr</a>
        <a href="#" class="social-link">gh</a>
      </div>
    </div>
  </div>
</section>

<footer>
  <p>© 2025 Nguyễn Minh Thiết · Thiết kế với ❤ tại Việt Nam</p>
</footer>
</body>
</html>`,
  },
  {
    id: 'portfolio-developer',
    name: 'Portfolio Developer Dark Mode',
    category: 'portfolio',
    description: 'Portfolio dành cho lập trình viên với giao diện dark mode, terminal aesthetic, showcase dự án tech.',
    tags: ['portfolio', 'developer', 'dark mode', 'tech', 'fullstack'],
    gradient: 'from-slate-800 to-cyan-600',
    accentColor: '#06b6d4',
    html: `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Portfolio – Trần Dev</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Courier New',monospace;background:#0d1117;color:#c9d1d9;line-height:1.7}
.nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(13,17,23,.9);backdrop-filter:blur(10px);border-bottom:1px solid #21262d;padding:0 24px;height:60px;display:flex;align-items:center;justify-content:space-between}
.nav-logo{color:#58a6ff;font-weight:700;font-size:1.1rem}
.nav-links{display:flex;gap:24px}
.nav-links a{color:#8b949e;text-decoration:none;font-size:.85rem;transition:color .2s}
.nav-links a:hover{color:#58a6ff}
.hero{min-height:100vh;display:flex;align-items:center;padding:80px 24px 40px;max-width:900px;margin:0 auto}
.hero-content{flex:1}
.terminal-prompt{color:#3fb950;font-size:.9rem;margin-bottom:20px;font-family:'Courier New',monospace}
.terminal-prompt span{color:#58a6ff}
h1{font-size:clamp(2.2rem,5vw,3.8rem);font-weight:700;color:#e6edf3;line-height:1.2;margin-bottom:16px}
h1 .highlight{color:#58a6ff}
.hero-role{font-size:1.1rem;color:#3fb950;margin-bottom:20px;font-family:'Courier New',monospace}
.hero-desc{color:#8b949e;font-size:1rem;max-width:550px;margin-bottom:36px;font-family:'Segoe UI',sans-serif}
.tech-stack{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:36px}
.tech-badge{padding:5px 14px;border-radius:6px;font-size:.78rem;font-weight:600;font-family:'Segoe UI',sans-serif}
.tb-blue{background:rgba(88,166,255,.1);color:#58a6ff;border:1px solid rgba(88,166,255,.3)}
.tb-green{background:rgba(63,185,80,.1);color:#3fb950;border:1px solid rgba(63,185,80,.3)}
.tb-yellow{background:rgba(210,153,34,.1);color:#d29922;border:1px solid rgba(210,153,34,.3)}
.tb-purple{background:rgba(188,140,228,.1);color:#bc8ce4;border:1px solid rgba(188,140,228,.3)}
.hero-actions{display:flex;gap:14px;flex-wrap:wrap}
.btn-main{padding:12px 28px;background:#238636;color:#fff;border:none;border-radius:8px;font-size:.9rem;font-weight:600;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:background .2s}
.btn-main:hover{background:#2ea043}
.btn-sec{padding:12px 28px;background:transparent;color:#c9d1d9;border:1px solid #30363d;border-radius:8px;font-size:.9rem;font-weight:600;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all .2s}
.btn-sec:hover{background:#161b22;border-color:#58a6ff;color:#58a6ff}
section{padding:80px 24px;max-width:900px;margin:0 auto}
.section-header{display:flex;align-items:center;gap:12px;margin-bottom:40px}
.section-num{color:#58a6ff;font-size:.9rem;font-family:'Courier New',monospace}
h2{font-size:1.6rem;font-weight:700;color:#e6edf3}
.section-line{flex:1;height:1px;background:#21262d}
.repos-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}
.repo-card{background:#161b22;border:1px solid #30363d;border-radius:12px;padding:20px;transition:border-color .2s,transform .2s}
.repo-card:hover{border-color:#58a6ff;transform:translateY(-3px)}
.repo-top{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.repo-icon{width:18px;height:18px;opacity:.7}
.repo-name{color:#58a6ff;font-weight:600;font-size:.95rem;font-family:'Courier New',monospace}
.repo-desc{color:#8b949e;font-size:.85rem;margin-bottom:16px;font-family:'Segoe UI',sans-serif;line-height:1.5}
.repo-meta{display:flex;gap:16px;align-items:center}
.repo-lang{display:flex;align-items:center;gap:6px;font-size:.8rem;color:#8b949e}
.lang-dot{width:12px;height:12px;border-radius:50%}
.repo-stars{font-size:.8rem;color:#8b949e;display:flex;align-items:center;gap:4px}
.skills-section{background:#161b22;border:1px solid #21262d;border-radius:16px;padding:32px}
.skills-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px}
.skill-row{margin-bottom:4px}
.skill-label{display:flex;justify-content:space-between;color:#c9d1d9;font-size:.85rem;margin-bottom:6px;font-family:'Segoe UI',sans-serif}
.skill-pct{color:#58a6ff;font-family:'Courier New',monospace;font-size:.8rem}
.skill-track{height:4px;background:#21262d;border-radius:2px;overflow:hidden}
.skill-progress{height:100%;border-radius:2px;background:linear-gradient(90deg,#1f6feb,#58a6ff)}
.timeline{position:relative;padding-left:28px}
.timeline::before{content:'';position:absolute;left:8px;top:0;bottom:0;width:2px;background:#21262d}
.tl-item{position:relative;margin-bottom:32px;padding-left:24px}
.tl-dot{position:absolute;left:-28px;top:4px;width:14px;height:14px;border-radius:50%;background:#1f6feb;border:2px solid #58a6ff}
.tl-date{font-size:.75rem;color:#58a6ff;font-family:'Courier New',monospace;margin-bottom:6px}
.tl-title{font-size:1rem;font-weight:700;color:#e6edf3;margin-bottom:4px}
.tl-company{font-size:.85rem;color:#3fb950;margin-bottom:8px}
.tl-desc{font-size:.85rem;color:#8b949e;font-family:'Segoe UI',sans-serif}
.contact-box{background:#161b22;border:1px solid #30363d;border-radius:16px;padding:40px;text-align:center}
.contact-email{font-size:1.3rem;color:#58a6ff;margin:16px 0;font-family:'Courier New',monospace}
footer{text-align:center;padding:40px 24px;color:#484f58;font-size:.8rem;border-top:1px solid #21262d;font-family:'Segoe UI',sans-serif}
</style>
</head>
<body>
<nav class="nav">
  <div class="nav-logo">~/tran-dev</div>
  <div class="nav-links">
    <a href="#projects">projects</a>
    <a href="#skills">skills</a>
    <a href="#exp">experience</a>
    <a href="#contact">contact</a>
  </div>
</nav>

<div class="hero">
  <div class="hero-content">
    <div class="terminal-prompt">$ whoami → <span>fullstack_developer</span></div>
    <h1>Xin chào, tôi là<br><span class="highlight">Trần Minh Dev</span></h1>
    <div class="hero-role">// Building the web, one commit at a time</div>
    <p class="hero-desc">Fullstack developer với 5 năm kinh nghiệm xây dựng ứng dụng web hiệu suất cao. Đam mê với clean code, open source và UX tốt.</p>
    <div class="tech-stack">
      <span class="tech-badge tb-yellow">JavaScript</span>
      <span class="tech-badge tb-blue">TypeScript</span>
      <span class="tech-badge tb-green">Node.js</span>
      <span class="tech-badge tb-blue">React</span>
      <span class="tech-badge tb-purple">Next.js</span>
      <span class="tech-badge tb-yellow">PostgreSQL</span>
      <span class="tech-badge tb-blue">Docker</span>
    </div>
    <div class="hero-actions">
      <a href="#projects" class="btn-main">⚡ View Projects</a>
      <a href="#contact" class="btn-sec">📧 Get in Touch</a>
    </div>
  </div>
</div>

<section id="projects">
  <div class="section-header">
    <span class="section-num">01.</span>
    <h2>Featured Repos</h2>
    <div class="section-line"></div>
  </div>
  <div class="repos-grid">
    <div class="repo-card">
      <div class="repo-top">
        <span>📦</span>
        <span class="repo-name">nextjs-saas-starter</span>
      </div>
      <div class="repo-desc">Boilerplate hoàn chỉnh cho SaaS với auth, billing, admin dashboard, dark mode. Tiết kiệm 2 tuần setup.</div>
      <div class="repo-meta">
        <div class="repo-lang"><div class="lang-dot" style="background:#f1e05a"></div>TypeScript</div>
        <div class="repo-stars">⭐ 847</div>
        <div class="repo-stars">🍴 124</div>
      </div>
    </div>
    <div class="repo-card">
      <div class="repo-top">
        <span>🚀</span>
        <span class="repo-name">realtime-collab-editor</span>
      </div>
      <div class="repo-desc">Editor cộng tác thời gian thực dùng CRDTs, WebSocket, hỗ trợ 100+ concurrent users đồng thời.</div>
      <div class="repo-meta">
        <div class="repo-lang"><div class="lang-dot" style="background:#3572A5"></div>Python</div>
        <div class="repo-stars">⭐ 423</div>
        <div class="repo-stars">🍴 67</div>
      </div>
    </div>
    <div class="repo-card">
      <div class="repo-top">
        <span>🤖</span>
        <span class="repo-name">ai-code-reviewer</span>
      </div>
      <div class="repo-desc">GitHub Action tích hợp LLM tự động review code, phát hiện bug và security issues trong PR.</div>
      <div class="repo-meta">
        <div class="repo-lang"><div class="lang-dot" style="background:#f1e05a"></div>TypeScript</div>
        <div class="repo-stars">⭐ 1.2k</div>
        <div class="repo-stars">🍴 201</div>
      </div>
    </div>
    <div class="repo-card">
      <div class="repo-top">
        <span>🗄️</span>
        <span class="repo-name">pg-vector-search</span>
      </div>
      <div class="repo-desc">Wrapper đơn giản cho pgvector, semantic search với embeddings, hỗ trợ RAG pipeline.</div>
      <div class="repo-meta">
        <div class="repo-lang"><div class="lang-dot" style="background:#e34c26"></div>Go</div>
        <div class="repo-stars">⭐ 312</div>
        <div class="repo-stars">🍴 45</div>
      </div>
    </div>
  </div>
</section>

<section id="skills">
  <div class="section-header">
    <span class="section-num">02.</span>
    <h2>Skills &amp; Tools</h2>
    <div class="section-line"></div>
  </div>
  <div class="skills-section">
    <div class="skills-list">
      <div>
        <div class="skill-row"><div class="skill-label"><span>React / Next.js</span><span class="skill-pct">95%</span></div><div class="skill-track"><div class="skill-progress" style="width:95%"></div></div></div>
        <div class="skill-row" style="margin-top:14px"><div class="skill-label"><span>Node.js / Express</span><span class="skill-pct">90%</span></div><div class="skill-track"><div class="skill-progress" style="width:90%"></div></div></div>
        <div class="skill-row" style="margin-top:14px"><div class="skill-label"><span>TypeScript</span><span class="skill-pct">92%</span></div><div class="skill-track"><div class="skill-progress" style="width:92%"></div></div></div>
      </div>
      <div>
        <div class="skill-row"><div class="skill-label"><span>PostgreSQL / MongoDB</span><span class="skill-pct">88%</span></div><div class="skill-track"><div class="skill-progress" style="width:88%"></div></div></div>
        <div class="skill-row" style="margin-top:14px"><div class="skill-label"><span>Docker / Kubernetes</span><span class="skill-pct">75%</span></div><div class="skill-track"><div class="skill-progress" style="width:75%"></div></div></div>
        <div class="skill-row" style="margin-top:14px"><div class="skill-label"><span>AWS / GCP</span><span class="skill-pct">70%</span></div><div class="skill-track"><div class="skill-progress" style="width:70%"></div></div></div>
      </div>
    </div>
  </div>
</section>

<section id="exp">
  <div class="section-header">
    <span class="section-num">03.</span>
    <h2>Experience</h2>
    <div class="section-line"></div>
  </div>
  <div class="timeline">
    <div class="tl-item">
      <div class="tl-dot"></div>
      <div class="tl-date">2023 – Hiện tại</div>
      <div class="tl-title">Senior Fullstack Developer</div>
      <div class="tl-company">TechVN Startup · Remote</div>
      <div class="tl-desc">Lead technical architecture cho platform B2B SaaS, 15k+ active users. Cải thiện performance 60% thông qua caching và DB optimization.</div>
    </div>
    <div class="tl-item">
      <div class="tl-dot"></div>
      <div class="tl-date">2021 – 2023</div>
      <div class="tl-title">Fullstack Developer</div>
      <div class="tl-company">FPT Software · Hà Nội</div>
      <div class="tl-desc">Phát triển microservices cho hệ thống payment, xử lý 50k transactions/ngày. Team lead nhóm 5 người.</div>
    </div>
    <div class="tl-item">
      <div class="tl-dot"></div>
      <div class="tl-date">2020 – 2021</div>
      <div class="tl-title">Frontend Developer</div>
      <div class="tl-company">Freelance</div>
      <div class="tl-desc">Xây dựng 20+ website cho khách hàng SMB, tập trung vào performance, SEO và UX tốt.</div>
    </div>
  </div>
</section>

<section id="contact">
  <div class="section-header">
    <span class="section-num">04.</span>
    <h2>Contact</h2>
    <div class="section-line"></div>
  </div>
  <div class="contact-box">
    <p style="color:#8b949e;font-family:'Segoe UI',sans-serif">Tôi luôn hứng thú với cơ hội mới và dự án thú vị.</p>
    <div class="contact-email">$ echo "hello@trandev.io"</div>
    <a href="mailto:hello@trandev.io" class="btn-main" style="margin:0 auto;display:inline-flex">📨 Say Hello</a>
  </div>
</section>

<footer>Built with ❤ and ☕ · © 2025 Trần Minh Dev</footer>
</body>
</html>`,
  },
  {
    id: 'portfolio-photographer',
    name: 'Portfolio Nhiếp Ảnh Tối Giản',
    category: 'portfolio',
    description: 'Portfolio cho nhiếp ảnh gia với thiết kế minimal, gallery showcase nổi bật, màu đen trắng sang trọng.',
    tags: ['portfolio', 'photography', 'minimal', 'gallery', 'elegant'],
    gradient: 'from-zinc-800 to-zinc-600',
    accentColor: '#a1a1aa',
    html: `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Lê Ánh – Photographer</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Georgia',serif;background:#0a0a0a;color:#e4e4e7;line-height:1.7}
header{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:20px 40px;mix-blend-mode:normal}
.logo{font-size:1.1rem;letter-spacing:4px;text-transform:uppercase;color:#fff;font-family:'Helvetica Neue',sans-serif;font-weight:300}
nav{display:flex;gap:32px}
nav a{text-decoration:none;color:rgba(255,255,255,.6);font-size:.8rem;letter-spacing:2px;text-transform:uppercase;font-family:'Helvetica Neue',sans-serif;font-weight:400;transition:color .2s}
nav a:hover{color:#fff}
.hero{height:100vh;position:relative;display:flex;align-items:flex-end;padding:60px 40px;overflow:hidden;background:#0a0a0a}
.hero-bg{position:absolute;inset:0;background:linear-gradient(135deg,#1a1a1a 0%,#2d2d2d 50%,#0a0a0a 100%);opacity:.8}
.hero-grid{position:absolute;inset:0;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:2px;opacity:.4}
.hero-cell-1{background:linear-gradient(135deg,#374151,#1f2937)}
.hero-cell-2{background:linear-gradient(135deg,#1f2937,#111827)}
.hero-cell-3{background:linear-gradient(135deg,#111827,#1f2937)}
.hero-cell-4{background:linear-gradient(135deg,#1f2937,#374151)}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.9) 0%,transparent 60%)}
.hero-content{position:relative;z-index:2}
.hero-eyebrow{font-size:.75rem;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.5);font-family:'Helvetica Neue',sans-serif;font-weight:300;margin-bottom:16px}
h1{font-size:clamp(3rem,7vw,6rem);font-weight:300;color:#fff;letter-spacing:-1px;line-height:1.1;margin-bottom:24px}
h1 em{font-style:italic;font-weight:300}
.hero-cta{font-size:.8rem;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.6);font-family:'Helvetica Neue',sans-serif;display:flex;align-items:center;gap:16px}
.hero-cta::after{content:'';width:60px;height:1px;background:rgba(255,255,255,.3)}
section{padding:80px 40px}
.section-label{font-size:.7rem;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.3);font-family:'Helvetica Neue',sans-serif;font-weight:300;margin-bottom:48px}
.gallery-masonry{columns:3;gap:12px}
@media(max-width:768px){.gallery-masonry{columns:2}}
@media(max-width:480px){.gallery-masonry{columns:1}}
.gallery-item{break-inside:avoid;margin-bottom:12px;overflow:hidden;border-radius:4px;position:relative;cursor:pointer}
.gallery-item-inner{background:linear-gradient(135deg,#1f2937,#374151);transition:transform .4s}
.gallery-item:hover .gallery-item-inner{transform:scale(1.02)}
.g-tall{padding-bottom:140%}
.g-wide{padding-bottom:60%}
.g-square{padding-bottom:100%}
.g-label{position:absolute;bottom:0;left:0;right:0;padding:16px;background:linear-gradient(to top,rgba(0,0,0,.8),transparent);opacity:0;transition:opacity .3s;font-size:.75rem;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.8);font-family:'Helvetica Neue',sans-serif}
.gallery-item:hover .g-label{opacity:1}
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
@media(max-width:768px){.about-grid{grid-template-columns:1fr;gap:40px}}
.about-img{background:linear-gradient(135deg,#1f2937,#374151);border-radius:4px;height:500px}
.about-text h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:300;color:#fff;letter-spacing:-0.5px;margin-bottom:24px}
.about-text p{color:rgba(255,255,255,.5);font-size:.95rem;line-height:1.9;margin-bottom:16px}
.about-stats{display:flex;gap:40px;margin-top:40px;padding-top:40px;border-top:1px solid rgba(255,255,255,.1)}
.astat-num{font-size:2.5rem;font-weight:300;color:#fff;font-family:'Helvetica Neue',sans-serif}
.astat-label{font-size:.7rem;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.3);font-family:'Helvetica Neue',sans-serif;margin-top:4px}
.services{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.08)}
.service-item{padding:40px 32px;background:#0a0a0a;transition:background .2s}
.service-item:hover{background:#111}
.service-num{font-size:.7rem;letter-spacing:2px;color:rgba(255,255,255,.3);font-family:'Helvetica Neue',sans-serif;margin-bottom:16px}
.service-name{font-size:1.1rem;color:#fff;margin-bottom:8px}
.service-desc{font-size:.85rem;color:rgba(255,255,255,.4);line-height:1.6;font-family:'Helvetica Neue',sans-serif}
.contact-section{min-height:60vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:80px 40px;border-top:1px solid rgba(255,255,255,.08)}
.contact-section h2{font-size:clamp(2rem,5vw,4.5rem);font-weight:300;color:#fff;letter-spacing:-1px;margin-bottom:32px;line-height:1.2}
.contact-link{font-size:1.1rem;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.5);text-decoration:none;font-family:'Helvetica Neue',sans-serif;border-bottom:1px solid rgba(255,255,255,.2);padding-bottom:4px;transition:color .2s,border-color .2s}
.contact-link:hover{color:#fff;border-color:rgba(255,255,255,.6)}
footer{padding:24px 40px;border-top:1px solid rgba(255,255,255,.06);display:flex;justify-content:space-between;font-size:.75rem;letter-spacing:1px;color:rgba(255,255,255,.2);font-family:'Helvetica Neue',sans-serif}
</style>
</head>
<body>
<header>
  <div class="logo">Lê Ánh</div>
  <nav>
    <a href="#gallery">Gallery</a>
    <a href="#about">About</a>
    <a href="#services">Services</a>
    <a href="#contact">Contact</a>
  </nav>
</header>

<div class="hero">
  <div class="hero-bg"></div>
  <div class="hero-grid">
    <div class="hero-cell-1"></div>
    <div class="hero-cell-2"></div>
    <div class="hero-cell-3"></div>
    <div class="hero-cell-4"></div>
  </div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Nhiếp ảnh gia · Hà Nội, Việt Nam</div>
    <h1>Khoảnh khắc<br><em>đẹp nhất</em><br>cuộc đời bạn</h1>
    <div class="hero-cta">Scroll để khám phá</div>
  </div>
</div>

<section id="gallery">
  <div class="section-label">Portfolio — Tuyển chọn tác phẩm</div>
  <div class="gallery-masonry">
    <div class="gallery-item"><div class="gallery-item-inner g-tall" style="background:linear-gradient(160deg,#1a1a2e,#16213e)"></div><div class="g-label">Cưới · 2024</div></div>
    <div class="gallery-item"><div class="gallery-item-inner g-wide" style="background:linear-gradient(160deg,#1e2a1e,#2d4a2d)"></div><div class="g-label">Thiên nhiên</div></div>
    <div class="gallery-item"><div class="gallery-item-inner g-square" style="background:linear-gradient(160deg,#2a1a1a,#4a2d2d)"></div><div class="g-label">Chân dung</div></div>
    <div class="gallery-item"><div class="gallery-item-inner g-wide" style="background:linear-gradient(160deg,#1a1a2a,#2d2d4a)"></div><div class="g-label">Kiến trúc</div></div>
    <div class="gallery-item"><div class="gallery-item-inner g-tall" style="background:linear-gradient(160deg,#2a2a1a,#4a4a2d)"></div><div class="g-label">Ẩm thực</div></div>
    <div class="gallery-item"><div class="gallery-item-inner g-square" style="background:linear-gradient(160deg,#1a2a2a,#2d4a4a)"></div><div class="g-label">Thương mại</div></div>
  </div>
</section>

<section id="about" style="background:#060606">
  <div class="section-label">Về tôi</div>
  <div class="about-grid">
    <div class="about-img"></div>
    <div class="about-text">
      <h2>Nhìn thấy<br><em>vẻ đẹp trong</em><br>từng khoảnh khắc</h2>
      <p>Với hơn 8 năm cầm máy, tôi chuyên ghi lại những khoảnh khắc thật và cảm xúc thật. Từ đám cưới nhỏ lãng mạn đến chiến dịch thương hiệu lớn.</p>
      <p>Phong cách của tôi: ánh sáng tự nhiên, bố cục tinh tế, và trên hết — câu chuyện của bạn.</p>
      <div class="about-stats">
        <div><div class="astat-num">800+</div><div class="astat-label">Bộ ảnh</div></div>
        <div><div class="astat-num">200+</div><div class="astat-label">Cặp đôi</div></div>
        <div><div class="astat-num">8+</div><div class="astat-label">Năm</div></div>
      </div>
    </div>
  </div>
</section>

<section id="services">
  <div class="section-label">Dịch vụ</div>
  <div class="services">
    <div class="service-item">
      <div class="service-num">01</div>
      <div class="service-name">Ảnh cưới</div>
      <div class="service-desc">Lưu giữ mọi cảm xúc của ngày đặc biệt nhất cuộc đời bạn</div>
    </div>
    <div class="service-item">
      <div class="service-num">02</div>
      <div class="service-name">Chân dung</div>
      <div class="service-desc">Headshot chuyên nghiệp, ảnh cá nhân, lifestyle portrait</div>
    </div>
    <div class="service-item">
      <div class="service-num">03</div>
      <div class="service-name">Thương mại</div>
      <div class="service-desc">Ảnh sản phẩm, thương hiệu, nội thất, ẩm thực</div>
    </div>
    <div class="service-item">
      <div class="service-num">04</div>
      <div class="service-name">Sự kiện</div>
      <div class="service-desc">Hội nghị, ra mắt sản phẩm, tiệc sinh nhật, sự kiện công ty</div>
    </div>
  </div>
</section>

<div class="contact-section" id="contact">
  <div>
    <h2>Hãy tạo ra<br><em>điều đẹp</em><br>cùng nhau</h2>
    <a href="mailto:leanh.photo@gmail.com" class="contact-link">leanh.photo@gmail.com</a>
  </div>
</div>

<footer>
  <span>© 2025 Lê Ánh Photography</span>
  <span>Hà Nội, Việt Nam</span>
</footer>
</body>
</html>`,
  },
  {
    id: 'cv-modern-professional',
    name: 'CV Hiện Đại 2 Cột',
    category: 'cv',
    description: 'CV chuyên nghiệp 2 cột với sidebar màu tối, ảnh đại diện, timeline kinh nghiệm và thanh kỹ năng.',
    tags: ['cv', 'resume', 'modern', '2-column', 'professional'],
    gradient: 'from-indigo-600 to-blue-700',
    accentColor: '#4f46e5',
    html: `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>CV – Phạm Thị Thu</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',Arial,sans-serif;background:#f0f4f8;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:30px 16px}
.cv{width:100%;max-width:860px;display:grid;grid-template-columns:260px 1fr;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.15)}
@media(max-width:640px){.cv{grid-template-columns:1fr}}
.sidebar{background:#1e1b4b;color:#fff;padding:36px 24px}
.avatar{width:100px;height:100px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 20px;border:4px solid rgba(255,255,255,.2)}
.sb-name{font-size:1.3rem;font-weight:700;text-align:center;margin-bottom:6px;color:#e0e7ff}
.sb-role{font-size:.8rem;text-align:center;color:#a5b4fc;letter-spacing:1px;text-transform:uppercase;margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid rgba(255,255,255,.1)}
.sb-section{margin-bottom:28px}
.sb-section-title{font-size:.68rem;letter-spacing:2px;text-transform:uppercase;color:#818cf8;margin-bottom:14px;font-weight:600}
.contact-item{display:flex;align-items:flex-start;gap:10px;margin-bottom:10px;font-size:.82rem;color:#c7d2fe}
.contact-icon{font-size:.9rem;flex-shrink:0;margin-top:1px}
.skill-item{margin-bottom:10px}
.skill-name{font-size:.8rem;color:#c7d2fe;margin-bottom:5px;display:flex;justify-content:space-between}
.skill-pct{color:#818cf8;font-size:.72rem}
.skill-bar{height:4px;background:rgba(255,255,255,.1);border-radius:2px;overflow:hidden}
.skill-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,#6366f1,#8b5cf6)}
.lang-item{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;font-size:.82rem;color:#c7d2fe}
.lang-dots{display:flex;gap:4px}
.dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.15)}
.dot.filled{background:#818cf8}
.tag-list{display:flex;flex-wrap:wrap;gap:6px}
.tag{font-size:.72rem;padding:4px 10px;border-radius:10px;background:rgba(99,102,241,.25);color:#a5b4fc;border:1px solid rgba(99,102,241,.3)}
.main{padding:36px 32px;background:#fff}
.main-header{margin-bottom:36px;padding-bottom:24px;border-bottom:2px solid #f1f5f9}
.main-name{font-size:2rem;font-weight:800;color:#1e1b4b;margin-bottom:4px}
.main-role{font-size:.95rem;color:#6366f1;font-weight:600;letter-spacing:.5px;margin-bottom:12px}
.main-summary{font-size:.88rem;color:#64748b;line-height:1.7}
.section{margin-bottom:32px}
.section-header{display:flex;align-items:center;gap:12px;margin-bottom:20px}
.section-icon{width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:.9rem}
.section-title{font-size:1rem;font-weight:700;color:#1e1b4b}
.timeline-item{position:relative;padding-left:22px;margin-bottom:20px}
.timeline-item::before{content:'';position:absolute;left:0;top:6px;width:10px;height:10px;border-radius:50%;background:#6366f1;border:2px solid #e0e7ff}
.timeline-item::after{content:'';position:absolute;left:4px;top:18px;width:2px;bottom:-12px;background:#e0e7ff}
.timeline-item:last-child::after{display:none}
.tl-top{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:4px;margin-bottom:3px}
.tl-title{font-size:.92rem;font-weight:700;color:#1e1b4b}
.tl-date{font-size:.75rem;color:#6366f1;font-weight:600;background:#eef2ff;padding:2px 10px;border-radius:10px;white-space:nowrap}
.tl-company{font-size:.82rem;color:#6366f1;font-weight:600;margin-bottom:6px}
.tl-desc{font-size:.82rem;color:#64748b;line-height:1.6}
.tl-desc li{margin-bottom:3px;margin-left:12px}
.edu-item{display:flex;gap:16px;margin-bottom:16px}
.edu-icon{width:44px;height:44px;border-radius:10px;background:#eef2ff;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0}
.edu-degree{font-size:.9rem;font-weight:700;color:#1e1b4b;margin-bottom:2px}
.edu-school{font-size:.82rem;color:#6366f1;font-weight:600;margin-bottom:2px}
.edu-year{font-size:.78rem;color:#94a3b8}
.cert-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.cert-item{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px;border-left:3px solid #6366f1}
.cert-name{font-size:.82rem;font-weight:700;color:#1e1b4b;margin-bottom:2px}
.cert-org{font-size:.75rem;color:#94a3b8}
</style>
</head>
<body>
<div class="cv">
  <div class="sidebar">
    <div class="avatar">👩</div>
    <div class="sb-name">Phạm Thị Thu</div>
    <div class="sb-role">Marketing Manager</div>

    <div class="sb-section">
      <div class="sb-section-title">Liên hệ</div>
      <div class="contact-item"><span class="contact-icon">📧</span><span>thu.pham@email.com</span></div>
      <div class="contact-item"><span class="contact-icon">📱</span><span>0912 345 678</span></div>
      <div class="contact-item"><span class="contact-icon">📍</span><span>Quận 1, TP.HCM</span></div>
      <div class="contact-item"><span class="contact-icon">🌐</span><span>linkedin.com/in/thupham</span></div>
    </div>

    <div class="sb-section">
      <div class="sb-section-title">Kỹ năng chuyên môn</div>
      <div class="skill-item"><div class="skill-name"><span>Digital Marketing</span><span class="skill-pct">95%</span></div><div class="skill-bar"><div class="skill-fill" style="width:95%"></div></div></div>
      <div class="skill-item"><div class="skill-name"><span>Content Strategy</span><span class="skill-pct">90%</span></div><div class="skill-bar"><div class="skill-fill" style="width:90%"></div></div></div>
      <div class="skill-item"><div class="skill-name"><span>SEO / SEM</span><span class="skill-pct">85%</span></div><div class="skill-bar"><div class="skill-fill" style="width:85%"></div></div></div>
      <div class="skill-item"><div class="skill-name"><span>Data Analytics</span><span class="skill-pct">80%</span></div><div class="skill-bar"><div class="skill-fill" style="width:80%"></div></div></div>
      <div class="skill-item"><div class="skill-name"><span>Social Media</span><span class="skill-pct">92%</span></div><div class="skill-bar"><div class="skill-fill" style="width:92%"></div></div></div>
    </div>

    <div class="sb-section">
      <div class="sb-section-title">Ngôn ngữ</div>
      <div class="lang-item">
        <span>Tiếng Việt</span>
        <div class="lang-dots"><span class="dot filled"></span><span class="dot filled"></span><span class="dot filled"></span><span class="dot filled"></span><span class="dot filled"></span></div>
      </div>
      <div class="lang-item">
        <span>Tiếng Anh</span>
        <div class="lang-dots"><span class="dot filled"></span><span class="dot filled"></span><span class="dot filled"></span><span class="dot filled"></span><span class="dot"></span></div>
      </div>
      <div class="lang-item">
        <span>Tiếng Nhật</span>
        <div class="lang-dots"><span class="dot filled"></span><span class="dot filled"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
      </div>
    </div>

    <div class="sb-section">
      <div class="sb-section-title">Công cụ</div>
      <div class="tag-list">
        <span class="tag">Google Ads</span><span class="tag">Meta Ads</span><span class="tag">HubSpot</span><span class="tag">GA4</span><span class="tag">Canva</span><span class="tag">Mailchimp</span><span class="tag">Semrush</span><span class="tag">Figma</span>
      </div>
    </div>
  </div>

  <div class="main">
    <div class="main-header">
      <div class="main-name">Phạm Thị Thu</div>
      <div class="main-role">Marketing Manager | 7 năm kinh nghiệm</div>
      <div class="main-summary">Chuyên gia marketing với kinh nghiệm xây dựng và triển khai chiến lược digital từ đầu. Thành tích nổi bật: tăng trưởng doanh thu 3x trong 18 tháng tại Startup Scale-up giai đoạn Series A.</div>
    </div>

    <div class="section">
      <div class="section-header"><div class="section-icon">💼</div><div class="section-title">Kinh nghiệm làm việc</div></div>
      <div class="timeline-item">
        <div class="tl-top"><div class="tl-title">Marketing Manager</div><div class="tl-date">03/2022 – Hiện tại</div></div>
        <div class="tl-company">TechGrowth Vietnam · TP.HCM</div>
        <div class="tl-desc"><ul>
          <li>Xây dựng và quản lý toàn bộ funnel marketing B2B, từ awareness đến retention</li>
          <li>Tăng organic traffic 280% trong 12 tháng qua chiến lược SEO & content</li>
          <li>Quản lý ngân sách ads $150k/tháng, ROAS trung bình 4.2x</li>
          <li>Lead team 8 người: content, design, performance, CRM</li>
        </ul></div>
      </div>
      <div class="timeline-item">
        <div class="tl-top"><div class="tl-title">Senior Digital Marketing</div><div class="tl-date">06/2019 – 02/2022</div></div>
        <div class="tl-company">E-Commerce Co. · TP.HCM</div>
        <div class="tl-desc"><ul>
          <li>Phụ trách toàn bộ kênh paid ads: Facebook, Google, TikTok, Zalo</li>
          <li>Xây dựng hệ thống email automation tăng repeat purchase 45%</li>
          <li>Đạt KPI tháng liên tục 18 tháng, thưởng performance cao nhất phòng</li>
        </ul></div>
      </div>
      <div class="timeline-item">
        <div class="tl-top"><div class="tl-title">Content & Social Media</div><div class="tl-date">07/2017 – 05/2019</div></div>
        <div class="tl-company">Agency ABC · TP.HCM</div>
        <div class="tl-desc"><ul>
          <li>Quản lý 15+ trang mạng xã hội cho khách hàng đa ngành</li>
          <li>Sản xuất content theo lịch xuất bản đa nền tảng</li>
        </ul></div>
      </div>
    </div>

    <div class="section">
      <div class="section-header"><div class="section-icon">🎓</div><div class="section-title">Học vấn</div></div>
      <div class="edu-item">
        <div class="edu-icon">🏛️</div>
        <div>
          <div class="edu-degree">Cử nhân Quản trị Kinh doanh</div>
          <div class="edu-school">ĐH Kinh tế TP.HCM (UEH)</div>
          <div class="edu-year">2013 – 2017 · GPA: 3.5/4.0</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header"><div class="section-icon">🏆</div><div class="section-title">Chứng chỉ</div></div>
      <div class="cert-grid">
        <div class="cert-item"><div class="cert-name">Google Analytics Certified</div><div class="cert-org">Google · 2024</div></div>
        <div class="cert-item"><div class="cert-name">Meta Blueprint Professional</div><div class="cert-org">Meta · 2023</div></div>
        <div class="cert-item"><div class="cert-name">HubSpot Inbound Marketing</div><div class="cert-org">HubSpot · 2023</div></div>
        <div class="cert-item"><div class="cert-name">SEMrush SEO Certified</div><div class="cert-org">SEMrush · 2022</div></div>
      </div>
    </div>
  </div>
</div>
</body>
</html>`,
  },
  {
    id: 'cv-classic-clean',
    name: 'CV Cổ Điển Sạch Sẽ',
    category: 'cv',
    description: 'CV chuẩn ATS một cột, typography rõ ràng, phù hợp ngành tài chính, kỹ thuật, hành chính.',
    tags: ['cv', 'resume', 'classic', 'ats-friendly', 'clean'],
    gradient: 'from-gray-700 to-gray-500',
    accentColor: '#374151',
    html: `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>CV – Nguyễn Văn Hùng</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Times New Roman',Georgia,serif;background:#f5f5f0;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:30px 16px;color:#1a1a1a}
.cv{width:100%;max-width:720px;background:#fff;padding:48px 52px;box-shadow:0 4px 24px rgba(0,0,0,.1)}
@media(max-width:600px){.cv{padding:32px 24px}}
.cv-header{border-bottom:2px solid #1a1a1a;padding-bottom:20px;margin-bottom:28px}
.name{font-size:2.2rem;font-weight:700;letter-spacing:1px;color:#111;margin-bottom:6px;font-family:'Helvetica Neue',Arial,sans-serif}
.role-line{font-size:.95rem;color:#374151;margin-bottom:14px;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:500}
.contact-bar{display:flex;flex-wrap:wrap;gap:6px 20px;font-size:.8rem;color:#374151;font-family:'Helvetica Neue',Arial,sans-serif}
.contact-bar span{display:flex;align-items:center;gap:5px}
.section{margin-bottom:24px}
.section-title{font-size:.75rem;letter-spacing:3px;text-transform:uppercase;font-family:'Helvetica Neue',Arial,sans-serif;font-weight:700;color:#111;margin-bottom:14px;padding-bottom:6px;border-bottom:1px solid #e5e7eb}
.job{margin-bottom:18px}
.job-header{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:4px;margin-bottom:3px}
.job-title{font-size:.95rem;font-weight:700;color:#111;font-family:'Helvetica Neue',Arial,sans-serif}
.job-date{font-size:.8rem;color:#6b7280;font-family:'Helvetica Neue',Arial,sans-serif}
.job-company{font-size:.85rem;color:#374151;margin-bottom:8px;font-style:italic}
.job-desc{font-size:.83rem;color:#374151;line-height:1.7}
.job-desc li{margin-left:18px;margin-bottom:4px}
.edu-item{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:4px;margin-bottom:14px}
.edu-left .edu-degree{font-size:.9rem;font-weight:700;color:#111;font-family:'Helvetica Neue',Arial,sans-serif}
.edu-left .edu-school{font-size:.83rem;color:#374151;font-style:italic;margin-top:2px}
.edu-right{font-size:.8rem;color:#6b7280;font-family:'Helvetica Neue',Arial,sans-serif;text-align:right}
.skills-cols{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:480px){.skills-cols{grid-template-columns:1fr}}
.skill-group-title{font-size:.8rem;font-weight:700;color:#111;font-family:'Helvetica Neue',Arial,sans-serif;margin-bottom:6px}
.skill-list{font-size:.83rem;color:#374151;line-height:1.9}
.achievement-item{display:flex;gap:12px;margin-bottom:12px}
.ach-year{font-size:.8rem;color:#6b7280;font-family:'Helvetica Neue',Arial,sans-serif;white-space:nowrap;padding-top:1px}
.ach-text{font-size:.83rem;color:#374151;line-height:1.6}
.ach-title{font-weight:700;color:#111;font-family:'Helvetica Neue',Arial,sans-serif}
.ref-item{font-size:.82rem;color:#374151;line-height:1.7;margin-bottom:6px}
.ref-name{font-weight:700;color:#111;font-family:'Helvetica Neue',Arial,sans-serif}
</style>
</head>
<body>
<div class="cv">
  <div class="cv-header">
    <div class="name">NGUYỄN VĂN HÙNG</div>
    <div class="role-line">Kỹ sư Phần mềm Cấp cao | Chuyên về Backend &amp; Hệ thống phân tán</div>
    <div class="contact-bar">
      <span>📧 hung.nguyen@gmail.com</span>
      <span>📱 0987 654 321</span>
      <span>🌐 github.com/vanhung</span>
      <span>📍 Hà Nội, Việt Nam</span>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Tóm tắt nghề nghiệp</div>
    <div style="font-size:.88rem;color:#374151;line-height:1.8">
      Kỹ sư phần mềm với 6 năm kinh nghiệm phát triển hệ thống backend quy mô lớn. Thành thạo Java, Go, và kiến trúc microservices. Đã thiết kế và vận hành hệ thống xử lý 10 triệu request/ngày. Quan tâm đến độ tin cậy, hiệu suất và maintainability của code.
    </div>
  </div>

  <div class="section">
    <div class="section-title">Kinh nghiệm làm việc</div>
    <div class="job">
      <div class="job-header">
        <div class="job-title">Senior Software Engineer</div>
        <div class="job-date">Tháng 4/2021 – Hiện tại</div>
      </div>
      <div class="job-company">VNG Corporation · Hà Nội</div>
      <div class="job-desc"><ul>
        <li>Thiết kế kiến trúc backend cho hệ thống chat real-time 5 triệu người dùng hoạt động/ngày</li>
        <li>Giảm latency p99 từ 800ms xuống 120ms thông qua tối ưu hóa database query và caching layer</li>
        <li>Xây dựng CI/CD pipeline tự động, giảm deployment time từ 45 phút xuống 8 phút</li>
        <li>Mentor 3 engineers junior, dẫn dắt code review và engineering best practices trong team</li>
        <li>Tech lead cho dự án migration từ monolith sang microservices với zero downtime</li>
      </ul></div>
    </div>
    <div class="job">
      <div class="job-header">
        <div class="job-title">Software Engineer</div>
        <div class="job-date">Tháng 6/2019 – Tháng 3/2021</div>
      </div>
      <div class="job-company">Tiki Corporation · TP.HCM</div>
      <div class="job-desc"><ul>
        <li>Phát triển Order Management System xử lý 200k đơn hàng/ngày trong mùa sale</li>
        <li>Implement idempotency mechanism đảm bảo tính nhất quán của payment transactions</li>
        <li>Viết unit/integration test coverage từ 20% lên 75% cho các service quan trọng</li>
      </ul></div>
    </div>
    <div class="job">
      <div class="job-header">
        <div class="job-title">Junior Backend Developer</div>
        <div class="job-date">Tháng 7/2018 – Tháng 5/2019</div>
      </div>
      <div class="job-company">FPT Software · Hà Nội</div>
      <div class="job-desc"><ul>
        <li>Phát triển REST API cho hệ thống quản lý nhân sự 10,000+ nhân viên</li>
        <li>Tham gia dự án outsource cho khách hàng Nhật Bản, làm việc với team đa văn hóa</li>
      </ul></div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Học vấn</div>
    <div class="edu-item">
      <div class="edu-left">
        <div class="edu-degree">Kỹ sư Công nghệ Thông tin</div>
        <div class="edu-school">Trường ĐH Bách Khoa Hà Nội (HUST)</div>
      </div>
      <div class="edu-right"><div>2014 – 2018</div><div>GPA: 3.6 / 4.0</div></div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Kỹ năng kỹ thuật</div>
    <div class="skills-cols">
      <div>
        <div class="skill-group-title">Ngôn ngữ lập trình</div>
        <div class="skill-list">Java (Spring Boot), Go, Python, SQL</div>
        <div class="skill-group-title" style="margin-top:14px">Cơ sở dữ liệu</div>
        <div class="skill-list">PostgreSQL, MySQL, Redis, MongoDB, Elasticsearch</div>
      </div>
      <div>
        <div class="skill-group-title">Hạ tầng & DevOps</div>
        <div class="skill-list">Docker, Kubernetes, AWS (EC2/RDS/S3), GitHub Actions</div>
        <div class="skill-group-title" style="margin-top:14px">Khác</div>
        <div class="skill-list">Kafka, RabbitMQ, gRPC, REST API, GraphQL</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Thành tích & Hoạt động</div>
    <div class="achievement-item">
      <div class="ach-year">2023</div>
      <div class="ach-text"><span class="ach-title">Giải Nhất Hackathon VNG Innovation Day</span> — Xây dựng tool phân tích log tự động phát hiện anomaly</div>
    </div>
    <div class="achievement-item">
      <div class="ach-year">2022</div>
      <div class="ach-text"><span class="ach-title">Speaker tại Vietnam Web Summit</span> — Trình bày "Lessons from scaling to 10M users"</div>
    </div>
    <div class="achievement-item">
      <div class="ach-year">2021</div>
      <div class="ach-text"><span class="ach-title">Open Source Contributor</span> — Contributor tích cực tại Apache Kafka ecosystem (45+ PRs merged)</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Ngôn ngữ</div>
    <div style="font-size:.83rem;color:#374151;display:flex;gap:32px;flex-wrap:wrap">
      <span><strong>Tiếng Việt:</strong> Bản ngữ</span>
      <span><strong>Tiếng Anh:</strong> Thành thạo (TOEIC 895)</span>
      <span><strong>Tiếng Nhật:</strong> Sơ cấp (N4)</span>
    </div>
  </div>
</div>
</body>
</html>`,
  },
  {
    id: 'cv-creative-sidebar',
    name: 'CV Sáng Tạo Màu Sắc',
    category: 'cv',
    description: 'CV sáng tạo với sidebar màu gradient xanh-tím, timeline đẹp, phù hợp ngành sáng tạo, marketing, thiết kế.',
    tags: ['cv', 'resume', 'creative', 'colorful', 'designer', 'marketing'],
    gradient: 'from-teal-500 to-emerald-600',
    accentColor: '#059669',
    html: `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>CV – Lê Thị Hoa</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',Arial,sans-serif;background:#e8f5e9;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:30px 16px}
.cv{width:100%;max-width:880px;display:grid;grid-template-columns:300px 1fr;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 24px 64px rgba(0,0,0,.12)}
@media(max-width:640px){.cv{grid-template-columns:1fr}}
.sidebar{background:linear-gradient(180deg,#064e3b 0%,#065f46 50%,#047857 100%);color:#fff;padding:0}
.sb-top{padding:40px 28px 32px;background:linear-gradient(135deg,#065f46,#047857);position:relative;overflow:hidden}
.sb-top::after{content:'';position:absolute;top:-40px;right:-40px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,.06)}
.sb-top::before{content:'';position:absolute;bottom:-30px;left:-30px;width:90px;height:90px;border-radius:50%;background:rgba(255,255,255,.04)}
.avatar{width:110px;height:110px;border-radius:50%;background:linear-gradient(135deg,#34d399,#6ee7b7);margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:44px;position:relative;z-index:1;border:4px solid rgba(255,255,255,.3)}
.sb-name{font-size:1.35rem;font-weight:800;text-align:center;color:#ecfdf5;position:relative;z-index:1;line-height:1.3;margin-bottom:6px}
.sb-role{font-size:.78rem;text-align:center;color:#6ee7b7;letter-spacing:1.5px;text-transform:uppercase;position:relative;z-index:1}
.sb-body{padding:28px}
.sb-sec{margin-bottom:28px}
.sb-sec-title{font-size:.65rem;letter-spacing:3px;text-transform:uppercase;color:#6ee7b7;margin-bottom:14px;font-weight:700;display:flex;align-items:center;gap:8px}
.sb-sec-title::after{content:'';flex:1;height:1px;background:rgba(255,255,255,.1)}
.contact-item{display:flex;align-items:flex-start;gap:10px;margin-bottom:11px;font-size:.82rem;color:#d1fae5}
.ci-dot{width:28px;height:28px;border-radius:8px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.85rem}
.sb-skill{margin-bottom:12px}
.sb-skill-top{display:flex;justify-content:space-between;margin-bottom:5px;font-size:.8rem;color:#d1fae5}
.sb-skill-pct{color:#6ee7b7;font-weight:700;font-size:.75rem}
.sb-skill-bar{height:5px;background:rgba(255,255,255,.1);border-radius:3px;overflow:hidden}
.sb-skill-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,#34d399,#6ee7b7)}
.interest-tags{display:flex;flex-wrap:wrap;gap:6px}
.itag{padding:5px 12px;border-radius:20px;font-size:.75rem;background:rgba(255,255,255,.1);color:#d1fae5;border:1px solid rgba(255,255,255,.12)}
.main{padding:40px 36px}
@media(max-width:640px){.main{padding:28px 24px}}
.main-header{margin-bottom:32px}
.main-tagline{font-size:.75rem;letter-spacing:3px;text-transform:uppercase;color:#059669;font-weight:700;margin-bottom:10px}
.main-summary{font-size:.88rem;color:#4b5563;line-height:1.8}
.m-section{margin-bottom:28px}
.m-section-title{display:flex;align-items:center;gap:10px;margin-bottom:18px}
.m-section-icon{width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,#059669,#34d399);display:flex;align-items:center;justify-content:center;font-size:.85rem;flex-shrink:0}
.m-section-text{font-size:.95rem;font-weight:700;color:#1f2937}
.exp-item{display:grid;grid-template-columns:80px 1fr;gap:16px;margin-bottom:22px}
@media(max-width:400px){.exp-item{grid-template-columns:1fr;gap:4px}}
.exp-date-col{text-align:right}
.exp-year-range{font-size:.72rem;font-weight:700;color:#059669;line-height:1.4}
.exp-duration{font-size:.68rem;color:#9ca3af;margin-top:2px}
.exp-content-col{position:relative;padding-left:16px;border-left:2px solid #d1fae5}
.exp-content-col::before{content:'';position:absolute;left:-5px;top:6px;width:8px;height:8px;border-radius:50%;background:#059669;border:2px solid #fff;box-shadow:0 0 0 2px #059669}
.exp-title{font-size:.92rem;font-weight:700;color:#1f2937;margin-bottom:2px}
.exp-company{font-size:.82rem;color:#059669;font-weight:600;margin-bottom:6px}
.exp-desc{font-size:.82rem;color:#6b7280;line-height:1.6}
.exp-desc li{margin-left:14px;margin-bottom:3px}
.edu-card{background:#f0fdf4;border-radius:12px;padding:16px 18px;margin-bottom:10px;border-left:3px solid #059669}
.edu-degree{font-size:.9rem;font-weight:700;color:#1f2937;margin-bottom:3px}
.edu-school{font-size:.83rem;color:#059669;font-weight:600;margin-bottom:2px}
.edu-year{font-size:.76rem;color:#9ca3af}
.award-item{display:flex;gap:12px;align-items:flex-start;margin-bottom:12px}
.award-badge{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#059669,#34d399);display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}
.award-title{font-size:.85rem;font-weight:700;color:#1f2937;margin-bottom:2px}
.award-desc{font-size:.78rem;color:#6b7280}
</style>
</head>
<body>
<div class="cv">
  <div class="sidebar">
    <div class="sb-top">
      <div class="avatar">👩‍🎨</div>
      <div class="sb-name">Lê Thị Hoa</div>
      <div class="sb-role">Content Creator & Brand Strategist</div>
    </div>
    <div class="sb-body">
      <div class="sb-sec">
        <div class="sb-sec-title">Liên hệ</div>
        <div class="contact-item"><div class="ci-dot">📧</div><span>hoa.le.creative@gmail.com</span></div>
        <div class="contact-item"><div class="ci-dot">📱</div><span>0901 234 567</span></div>
        <div class="contact-item"><div class="ci-dot">🌐</div><span>hoale.creative</span></div>
        <div class="contact-item"><div class="ci-dot">📍</div><span>Đà Nẵng, Việt Nam</span></div>
      </div>
      <div class="sb-sec">
        <div class="sb-sec-title">Kỹ năng</div>
        <div class="sb-skill"><div class="sb-skill-top"><span>Content Strategy</span><span class="sb-skill-pct">95%</span></div><div class="sb-skill-bar"><div class="sb-skill-fill" style="width:95%"></div></div></div>
        <div class="sb-skill"><div class="sb-skill-top"><span>Copywriting</span><span class="sb-skill-pct">92%</span></div><div class="sb-skill-bar"><div class="sb-skill-fill" style="width:92%"></div></div></div>
        <div class="sb-skill"><div class="sb-skill-top"><span>Social Media</span><span class="sb-skill-pct">90%</span></div><div class="sb-skill-bar"><div class="sb-skill-fill" style="width:90%"></div></div></div>
        <div class="sb-skill"><div class="sb-skill-top"><span>Graphic Design</span><span class="sb-skill-pct">78%</span></div><div class="sb-skill-bar"><div class="sb-skill-fill" style="width:78%"></div></div></div>
        <div class="sb-skill"><div class="sb-skill-top"><span>Video Editing</span><span class="sb-skill-pct">72%</span></div><div class="sb-skill-bar"><div class="sb-skill-fill" style="width:72%"></div></div></div>
      </div>
      <div class="sb-sec">
        <div class="sb-sec-title">Sở thích</div>
        <div class="interest-tags">
          <span class="itag">📸 Photography</span>
          <span class="itag">✍ Blogging</span>
          <span class="itag">🎵 Music</span>
          <span class="itag">🏃 Yoga</span>
          <span class="itag">✈ Travel</span>
          <span class="itag">📚 Reading</span>
        </div>
      </div>
      <div class="sb-sec">
        <div class="sb-sec-title">Ngôn ngữ</div>
        <div style="font-size:.82rem;color:#d1fae5;line-height:2">
          <div>🇻🇳 Tiếng Việt — Bản ngữ</div>
          <div>🇬🇧 Tiếng Anh — Thành thạo</div>
          <div>🇰🇷 Tiếng Hàn — Giao tiếp cơ bản</div>
        </div>
      </div>
    </div>
  </div>

  <div class="main">
    <div class="main-header">
      <div class="main-tagline">✦ Content · Branding · Strategy</div>
      <div class="main-summary">Content creator và brand strategist với 5 năm kinh nghiệm xây dựng thương hiệu cá nhân và doanh nghiệp. Đã giúp 20+ thương hiệu tăng trưởng organic following từ 0 lên 100k+. Tin rằng storytelling chính là công cụ marketing mạnh mẽ nhất.</div>
    </div>

    <div class="m-section">
      <div class="m-section-title"><div class="m-section-icon">💼</div><div class="m-section-text">Kinh nghiệm</div></div>
      <div class="exp-item">
        <div class="exp-date-col">
          <div class="exp-year-range">2022<br>Nay</div>
          <div class="exp-duration">~2 năm</div>
        </div>
        <div class="exp-content-col">
          <div class="exp-title">Head of Content</div>
          <div class="exp-company">GreenLife Brand · Đà Nẵng</div>
          <div class="exp-desc"><ul>
            <li>Dẫn dắt team content 6 người, sản xuất 150+ assets/tháng đa nền tảng</li>
            <li>Xây dựng Instagram từ 8k lên 185k followers trong 14 tháng</li>
            <li>Tăng doanh thu từ social commerce 320% YoY</li>
            <li>Chiến lược influencer marketing, kết nối 50+ KOC/KOL</li>
          </ul></div>
        </div>
      </div>
      <div class="exp-item">
        <div class="exp-date-col">
          <div class="exp-year-range">2020<br>2022</div>
          <div class="exp-duration">2 năm</div>
        </div>
        <div class="exp-content-col">
          <div class="exp-title">Content Marketing Specialist</div>
          <div class="exp-company">Creative Agency X · TP.HCM</div>
          <div class="exp-desc"><ul>
            <li>Phụ trách content cho 8 brand clients đồng thời</li>
            <li>Viral campaign đạt 2M+ reach cho nhãn hàng FMCG</li>
            <li>Copywriting cho quảng cáo Facebook, Google, Landing page</li>
          </ul></div>
        </div>
      </div>
      <div class="exp-item">
        <div class="exp-date-col">
          <div class="exp-year-range">2019<br>2020</div>
          <div class="exp-duration">1 năm</div>
        </div>
        <div class="exp-content-col">
          <div class="exp-title">Freelance Content Creator</div>
          <div class="exp-company">Tự do</div>
          <div class="exp-desc"><ul>
            <li>Blog cá nhân đạt 50k pageview/tháng về lifestyle & beauty</li>
            <li>Brand collaboration với 15+ nhãn hàng beauty & fashion</li>
          </ul></div>
        </div>
      </div>
    </div>

    <div class="m-section">
      <div class="m-section-title"><div class="m-section-icon">🎓</div><div class="m-section-text">Học vấn</div></div>
      <div class="edu-card">
        <div class="edu-degree">Cử nhân Truyền thông & Marketing</div>
        <div class="edu-school">Trường ĐH Ngoại thương — Cơ sở Đà Nẵng</div>
        <div class="edu-year">2015 – 2019 · Tốt nghiệp Xuất sắc · GPA 3.7/4.0</div>
      </div>
    </div>

    <div class="m-section">
      <div class="m-section-title"><div class="m-section-icon">🏆</div><div class="m-section-text">Thành tích nổi bật</div></div>
      <div class="award-item">
        <div class="award-badge">🥇</div>
        <div>
          <div class="award-title">Top 30 Content Creator Vietnam 2023</div>
          <div class="award-desc">Được Vietnam Martech bình chọn trong danh sách creator có tầm ảnh hưởng nhất ngành</div>
        </div>
      </div>
      <div class="award-item">
        <div class="award-badge">🎖️</div>
        <div>
          <div class="award-title">Best Social Campaign — Smarties Vietnam 2022</div>
          <div class="award-desc">Chiến dịch #GreenLiving đạt giải thưởng marketing xuất sắc nhất hạng mục Social</div>
        </div>
      </div>
      <div class="award-item">
        <div class="award-badge">✨</div>
        <div>
          <div class="award-title">Speaker — Vietnam Content Marketing Summit 2023</div>
          <div class="award-desc">Trình bày chủ đề "Building authentic brand voice in the AI era"</div>
        </div>
      </div>
    </div>
  </div>
</div>
</body>
</html>`,
  },
]

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await dbConnect()
  if (!(await isAdmin(session.user.id))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const results = []
  for (const tpl of PORTFOLIO_CV_TEMPLATES) {
    const existing = await TemplateModel.findOne({ id: tpl.id })
    if (existing) {
      await TemplateModel.updateOne({ id: tpl.id }, tpl)
      results.push({ id: tpl.id, action: 'updated' })
    } else {
      const maxOrder = await TemplateModel.findOne({}, { order: 1 }).sort({ order: -1 }).lean() as any
      const order = (maxOrder?.order ?? -1) + 1
      await TemplateModel.create({ ...tpl, order })
      results.push({ id: tpl.id, action: 'created' })
    }
  }

  return NextResponse.json({ ok: true, count: results.length, results })
}

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await dbConnect()
  if (!(await isAdmin(session.user.id))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  return NextResponse.json({
    message: 'POST to this endpoint to seed portfolio & CV templates',
    templates: PORTFOLIO_CV_TEMPLATES.map(t => ({ id: t.id, name: t.name, category: t.category })),
  })
}
