// GrapesJS 0.22 style manager sector configuration — Vietnamese labels
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const styleSectors: any[] = [
  // ── 1. Typography ────────────────────────────────────────────────────────
  {
    id: 'typography',
    name: 'Kiểu chữ',
    open: true,
    properties: [
      {
        property: 'font-family',
        label: 'Font chữ',
        type: 'select',
        default: '',
        options: [
          { id: '', label: '— Chọn —' },
          { id: 'Arial, Helvetica, sans-serif', label: 'Arial' },
          { id: "'Times New Roman', Times, serif", label: 'Times New Roman' },
          { id: 'Georgia, serif', label: 'Georgia' },
          { id: 'Verdana, sans-serif', label: 'Verdana' },
          { id: 'Roboto, sans-serif', label: 'Roboto' },
          { id: "'Open Sans', sans-serif", label: 'Open Sans' },
          { id: "'Montserrat', sans-serif", label: 'Montserrat' },
        ],
      },
      { property: 'font-size', label: 'Cỡ chữ', type: 'integer', units: ['px', 'em', 'rem', '%'], default: '', placeholder: '16' },
      {
        property: 'font-weight',
        label: 'Độ đậm',
        type: 'select',
        default: '',
        options: [
          { id: '', label: '— Chọn —' },
          { id: '300', label: 'Nhẹ (300)' },
          { id: '400', label: 'Bình thường (400)' },
          { id: '500', label: 'Vừa (500)' },
          { id: '600', label: 'Đậm vừa (600)' },
          { id: '700', label: 'Đậm (700)' },
          { id: '800', label: 'Rất đậm (800)' },
        ],
      },
      {
        property: 'font-style',
        label: 'Kiểu chữ',
        type: 'radio',
        default: 'normal',
        options: [
          { id: 'normal', label: 'Thường' },
          { id: 'italic', label: 'Nghiêng' },
        ],
      },
      {
        property: 'text-align',
        label: 'Căn chỉnh',
        type: 'radio',
        default: '',
        options: [
          { id: 'left', label: 'Trái' },
          { id: 'center', label: 'Giữa' },
          { id: 'right', label: 'Phải' },
          { id: 'justify', label: 'Đều' },
        ],
      },
      { property: 'color', label: 'Màu chữ', type: 'color', default: '', placeholder: '#0f172a' },
      { property: '--text-gradient', label: 'Gradient chữ', type: 'text-gradient-picker', default: '', full: true },
      { property: 'line-height', label: 'Khoảng cách dòng', type: 'integer', units: ['', 'px', 'em'], default: '', placeholder: '1.6' },
      { property: 'letter-spacing', label: 'Khoảng cách ký tự', type: 'integer', units: ['px', 'em'], default: '', placeholder: '0.05' },
      {
        property: 'text-decoration',
        label: 'Trang trí chữ',
        type: 'select',
        default: '',
        options: [
          { id: '', label: '— Chọn —' },
          { id: 'none', label: 'Không' },
          { id: 'underline', label: 'Gạch dưới' },
          { id: 'line-through', label: 'Gạch ngang' },
          { id: 'overline', label: 'Gạch trên' },
        ],
      },
      {
        property: 'text-transform',
        label: 'Chữ hoa/thường',
        type: 'select',
        default: '',
        options: [
          { id: '', label: '— Chọn —' },
          { id: 'none', label: 'Không' },
          { id: 'uppercase', label: 'HOA TẤT CẢ' },
          { id: 'lowercase', label: 'thường tất cả' },
          { id: 'capitalize', label: 'Viết Hoa Đầu Câu' },
        ],
      },
    ],
  },

  // ── 2. Background ─────────────────────────────────────────────────────────
  {
    id: 'background',
    name: 'Nền',
    open: false,
    properties: [
      { property: 'background-color', label: 'Màu nền', type: 'color', default: '', placeholder: '#ffffff' },
      { property: '--bg-gradient', label: 'Gradient nền', type: 'bg-gradient-picker', default: '', full: true },
      {
        property: 'background-size',
        label: 'Kích thước ảnh nền',
        type: 'select',
        default: '',
        options: [
          { id: '', label: '— Chọn —' },
          { id: 'cover', label: 'Bao phủ (cover)' },
          { id: 'contain', label: 'Vừa khít (contain)' },
          { id: '100% 100%', label: 'Kéo giãn' },
          { id: 'auto', label: 'Tự động' },
        ],
      },
      {
        property: 'background-position',
        label: 'Vị trí ảnh nền',
        type: 'select',
        default: '',
        options: [
          { id: '', label: '— Chọn —' },
          { id: 'center', label: 'Giữa' },
          { id: 'top center', label: 'Trên giữa' },
          { id: 'bottom center', label: 'Dưới giữa' },
          { id: 'left center', label: 'Trái giữa' },
          { id: 'right center', label: 'Phải giữa' },
        ],
      },
      {
        property: 'background-repeat',
        label: 'Lặp ảnh nền',
        type: 'select',
        default: '',
        options: [
          { id: '', label: '— Chọn —' },
          { id: 'no-repeat', label: 'Không lặp' },
          { id: 'repeat', label: 'Lặp' },
          { id: 'repeat-x', label: 'Lặp ngang' },
          { id: 'repeat-y', label: 'Lặp dọc' },
        ],
      },
    ],
  },

  // ── 3. Dimension ─────────────────────────────────────────────────────────
  {
    id: 'dimension',
    name: 'Kích thước',
    open: false,
    properties: [
      { property: 'width', label: 'Chiều rộng', type: 'integer', units: ['px', '%', 'vw', 'em', 'rem'], default: '', placeholder: '100' },
      { property: 'height', label: 'Chiều cao', type: 'integer', units: ['px', '%', 'vh', 'em', 'rem'], default: '', placeholder: '300' },
      { property: 'max-width', label: 'Rộng tối đa', type: 'integer', units: ['px', '%', 'vw'], default: '', placeholder: '1200' },
      { property: 'min-width', label: 'Rộng tối thiểu', type: 'integer', units: ['px', '%'], default: '', placeholder: '280' },
      { property: 'min-height', label: 'Cao tối thiểu', type: 'integer', units: ['px', '%', 'vh'], default: '', placeholder: '200' },
      {
        property: 'padding',
        label: 'Đệm trong (T/P/D/T)',
        type: 'composite',
        properties: [
          { property: 'padding-top', label: 'Trên', type: 'integer', units: ['px', 'em', '%'], placeholder: '24' },
          { property: 'padding-right', label: 'Phải', type: 'integer', units: ['px', 'em', '%'], placeholder: '24' },
          { property: 'padding-bottom', label: 'Dưới', type: 'integer', units: ['px', 'em', '%'], placeholder: '24' },
          { property: 'padding-left', label: 'Trái', type: 'integer', units: ['px', 'em', '%'], placeholder: '24' },
        ],
      },
      {
        property: 'margin',
        label: 'Lề ngoài (T/P/D/T)',
        type: 'composite',
        properties: [
          { property: 'margin-top', label: 'Trên', type: 'integer', units: ['px', 'em', '%'], placeholder: '0' },
          { property: 'margin-right', label: 'Phải', type: 'integer', units: ['px', 'em', '%'], placeholder: '0' },
          { property: 'margin-bottom', label: 'Dưới', type: 'integer', units: ['px', 'em', '%'], placeholder: '0' },
          { property: 'margin-left', label: 'Trái', type: 'integer', units: ['px', 'em', '%'], placeholder: '0' },
        ],
      },
    ],
  },

  // ── 4. Border ─────────────────────────────────────────────────────────────
  {
    id: 'border',
    name: 'Viền',
    open: false,
    properties: [
      { property: 'border-radius', label: 'Bo góc', type: 'integer', units: ['px', '%', 'em'], default: '', placeholder: '8' },
      {
        property: 'border-style',
        label: 'Kiểu viền',
        type: 'select',
        default: '',
        options: [
          { id: '', label: '— Chọn —' },
          { id: 'none', label: 'Không' },
          { id: 'solid', label: 'Liền nét' },
          { id: 'dashed', label: 'Đứt nét' },
          { id: 'dotted', label: 'Chấm' },
          { id: 'double', label: 'Đôi' },
        ],
      },
      { property: 'border-width', label: 'Độ dày', type: 'integer', units: ['px'], default: '', placeholder: '2' },
      { property: 'border-color', label: 'Màu viền', type: 'color', default: '', placeholder: '#e2e8f0' },
    ],
  },

  // ── 5. Layout ─────────────────────────────────────────────────────────────
  {
    id: 'layout',
    name: 'Bố cục (Flex/Grid)',
    open: false,
    properties: [
      {
        property: 'display',
        label: 'Kiểu hiển thị',
        type: 'select',
        default: '',
        options: [
          { id: '', label: '— Chọn —' },
          { id: 'block', label: 'Block' },
          { id: 'flex', label: 'Flex' },
          { id: 'grid', label: 'Grid' },
          { id: 'inline-block', label: 'Inline-block' },
          { id: 'inline', label: 'Inline' },
          { id: 'none', label: 'Ẩn' },
        ],
      },
      {
        property: 'flex-direction',
        label: 'Hướng Flex',
        type: 'select',
        default: '',
        options: [
          { id: '', label: '— Chọn —' },
          { id: 'row', label: 'Hàng ngang →' },
          { id: 'column', label: 'Cột dọc ↓' },
          { id: 'row-reverse', label: 'Ngang (đảo) ←' },
          { id: 'column-reverse', label: 'Dọc (đảo) ↑' },
        ],
      },
      {
        property: 'flex-wrap',
        label: 'Xuống dòng',
        type: 'select',
        default: '',
        options: [
          { id: '', label: '— Chọn —' },
          { id: 'nowrap', label: 'Không' },
          { id: 'wrap', label: 'Có' },
        ],
      },
      {
        property: 'justify-content',
        label: 'Căn trục chính',
        type: 'select',
        default: '',
        options: [
          { id: '', label: '— Chọn —' },
          { id: 'flex-start', label: 'Đầu' },
          { id: 'center', label: 'Giữa' },
          { id: 'flex-end', label: 'Cuối' },
          { id: 'space-between', label: 'Đều (ngoài)' },
          { id: 'space-around', label: 'Đều (trong)' },
          { id: 'space-evenly', label: 'Đều hoàn toàn' },
        ],
      },
      {
        property: 'align-items',
        label: 'Căn trục phụ',
        type: 'select',
        default: '',
        options: [
          { id: '', label: '— Chọn —' },
          { id: 'flex-start', label: 'Đầu' },
          { id: 'center', label: 'Giữa' },
          { id: 'flex-end', label: 'Cuối' },
          { id: 'stretch', label: 'Kéo giãn' },
          { id: 'baseline', label: 'Đường cơ sở' },
        ],
      },
      { property: 'gap', label: 'Khoảng cách', type: 'integer', units: ['px', 'em', 'rem'], default: '', placeholder: '16' },
      { property: 'flex', label: 'Flex tỉ lệ', type: 'integer', units: [''], default: '', placeholder: '1' },
      {
        property: 'grid-template-columns',
        label: 'Grid cột',
        type: 'select',
        default: '',
        options: [
          { id: '', label: '— Chọn —' },
          { id: 'repeat(2, 1fr)', label: '2 cột đều' },
          { id: 'repeat(3, 1fr)', label: '3 cột đều' },
          { id: 'repeat(4, 1fr)', label: '4 cột đều' },
          { id: '1fr 2fr', label: '1/3 + 2/3' },
          { id: '2fr 1fr', label: '2/3 + 1/3' },
          { id: 'repeat(auto-fit, minmax(200px, 1fr))', label: 'Tự động (200px min)' },
        ],
      },
    ],
  },

  // ── 6. Effects ────────────────────────────────────────────────────────────
  {
    id: 'effects',
    name: 'Hiệu ứng',
    open: false,
    properties: [
      {
        property: 'box-shadow',
        label: 'Bóng đổ',
        type: 'select',
        default: '',
        options: [
          { id: '', label: '— Không có —' },
          // Trung tính
          { id: '0 1px 3px rgba(0,0,0,0.12)', label: 'Nhẹ' },
          { id: '0 4px 12px rgba(0,0,0,0.15)', label: 'Vừa' },
          { id: '0 8px 24px rgba(0,0,0,0.18)', label: 'Đậm' },
          { id: '0 20px 48px rgba(0,0,0,0.25)', label: 'Rất đậm' },
          { id: 'inset 0 2px 6px rgba(0,0,0,0.12)', label: 'Âm (inset)' },
          // Tím / Indigo
          { id: '0 4px 16px rgba(79,70,229,0.35)', label: '🔵 Indigo' },
          { id: '0 4px 16px rgba(139,92,246,0.35)', label: '🟣 Violet' },
          { id: '0 4px 16px rgba(168,85,247,0.35)', label: '🟣 Tím (purple)' },
          { id: '0 4px 16px rgba(217,70,239,0.35)', label: '🟣 Tím hồng (fuchsia)' },
          // Hồng / Đỏ
          { id: '0 4px 16px rgba(236,72,153,0.35)', label: '🩷 Hồng (pink)' },
          { id: '0 4px 16px rgba(239,68,68,0.35)', label: '🔴 Đỏ' },
          { id: '0 4px 16px rgba(249,115,22,0.35)', label: '🟠 Cam' },
          // Vàng / Xanh lá
          { id: '0 4px 16px rgba(234,179,8,0.35)', label: '🟡 Vàng' },
          { id: '0 4px 16px rgba(16,185,129,0.35)', label: '🟢 Xanh lá (emerald)' },
          { id: '0 4px 16px rgba(34,197,94,0.35)', label: '🟢 Xanh lá nhạt' },
          // Xanh dương
          { id: '0 4px 16px rgba(14,165,233,0.35)', label: '🔵 Xanh dương (sky)' },
          { id: '0 4px 16px rgba(59,130,246,0.35)', label: '🔵 Xanh (blue)' },
          { id: '0 4px 16px rgba(6,182,212,0.35)', label: '🩵 Xanh cyan' },
          // Đặc biệt
          { id: '0 4px 20px rgba(79,70,229,0.5), 0 8px 40px rgba(139,92,246,0.3)', label: '✨ Glow tím' },
          { id: '0 4px 20px rgba(236,72,153,0.5), 0 8px 40px rgba(239,68,68,0.3)', label: '✨ Glow hồng-đỏ' },
          { id: '0 4px 20px rgba(16,185,129,0.5), 0 8px 40px rgba(14,165,233,0.3)', label: '✨ Glow xanh' },
        ],
      },
      {
        property: 'opacity',
        label: 'Độ mờ',
        type: 'select',
        default: '',
        options: [
          { id: '', label: 'Mặc định (100%)' },
          { id: '0.9', label: '90%' },
          { id: '0.8', label: '80%' },
          { id: '0.7', label: '70%' },
          { id: '0.5', label: '50%' },
          { id: '0.3', label: '30%' },
          { id: '0', label: '0% (ẩn)' },
        ],
      },
      {
        property: 'overflow',
        label: 'Nội dung tràn',
        type: 'select',
        default: '',
        options: [
          { id: '', label: '— Chọn —' },
          { id: 'visible', label: 'Hiển thị' },
          { id: 'hidden', label: 'Ẩn' },
          { id: 'auto', label: 'Tự động (cuộn)' },
          { id: 'scroll', label: 'Luôn cuộn' },
        ],
      },
      {
        property: 'cursor',
        label: 'Con trỏ chuột',
        type: 'select',
        default: '',
        options: [
          { id: '', label: '— Chọn —' },
          { id: 'pointer', label: 'Tay chỉ' },
          { id: 'default', label: 'Mũi tên' },
          { id: 'not-allowed', label: 'Không cho phép' },
          { id: 'move', label: 'Di chuyển' },
        ],
      },
    ],
  },
]
