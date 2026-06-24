export interface GoogleFont {
  family: string;
  label: string;
  category: 'sans-serif' | 'serif' | 'monospace' | 'display';
}

export const GOOGLE_FONTS: GoogleFont[] = [
  // ── Tiếng Việt thân thiện ─────────────────────────────────────────────────
  { family: 'Be Vietnam Pro',    label: '⭐ Be Vietnam Pro',    category: 'sans-serif' },
  { family: 'Exo 2',             label: '⭐ Exo 2',             category: 'sans-serif' },
  { family: 'Baloo 2',           label: 'Baloo 2',             category: 'display'    },
  // ── Sans-serif ────────────────────────────────────────────────────────────
  { family: 'Inter',             label: 'Inter',               category: 'sans-serif' },
  { family: 'Poppins',           label: 'Poppins',             category: 'sans-serif' },
  { family: 'Roboto',            label: 'Roboto',              category: 'sans-serif' },
  { family: 'Open Sans',         label: 'Open Sans',           category: 'sans-serif' },
  { family: 'Lato',              label: 'Lato',                category: 'sans-serif' },
  { family: 'Montserrat',        label: 'Montserrat',          category: 'sans-serif' },
  { family: 'Raleway',           label: 'Raleway',             category: 'sans-serif' },
  { family: 'Nunito',            label: 'Nunito',              category: 'sans-serif' },
  { family: 'DM Sans',           label: 'DM Sans',             category: 'sans-serif' },
  { family: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans',   category: 'sans-serif' },
  { family: 'Work Sans',         label: 'Work Sans',           category: 'sans-serif' },
  { family: 'Rubik',             label: 'Rubik',               category: 'sans-serif' },
  { family: 'Outfit',            label: 'Outfit',              category: 'sans-serif' },
  { family: 'Quicksand',         label: 'Quicksand',           category: 'sans-serif' },
  { family: 'Mulish',            label: 'Mulish',              category: 'sans-serif' },
  { family: 'Josefin Sans',      label: 'Josefin Sans',        category: 'sans-serif' },
  { family: 'Cabin',             label: 'Cabin',               category: 'sans-serif' },
  { family: 'Ubuntu',            label: 'Ubuntu',              category: 'sans-serif' },
  { family: 'Karla',             label: 'Karla',               category: 'sans-serif' },
  { family: 'Noto Sans',         label: 'Noto Sans',           category: 'sans-serif' },
  { family: 'Source Sans 3',     label: 'Source Sans 3',       category: 'sans-serif' },
  // ── Serif ─────────────────────────────────────────────────────────────────
  { family: 'Playfair Display',  label: 'Playfair Display',    category: 'serif'      },
  { family: 'Merriweather',      label: 'Merriweather',        category: 'serif'      },
  { family: 'Lora',              label: 'Lora',                category: 'serif'      },
  { family: 'PT Serif',          label: 'PT Serif',            category: 'serif'      },
  { family: 'EB Garamond',       label: 'EB Garamond',         category: 'serif'      },
  { family: 'Libre Baskerville', label: 'Libre Baskerville',   category: 'serif'      },
  // ── Display ───────────────────────────────────────────────────────────────
  { family: 'Oswald',            label: 'Oswald',              category: 'display'    },
  { family: 'Bebas Neue',        label: 'Bebas Neue',          category: 'display'    },
  { family: 'Righteous',         label: 'Righteous',           category: 'display'    },
  { family: 'Abril Fatface',     label: 'Abril Fatface',       category: 'display'    },
  // ── Monospace ─────────────────────────────────────────────────────────────
  { family: 'JetBrains Mono',    label: 'JetBrains Mono',      category: 'monospace'  },
  { family: 'Fira Code',         label: 'Fira Code',           category: 'monospace'  },
  { family: 'Source Code Pro',   label: 'Source Code Pro',     category: 'monospace'  },
];

export const GOOGLE_FONTS_URL = `https://fonts.googleapis.com/css2?${
  GOOGLE_FONTS.map(f => `family=${encodeURIComponent(f.family)}:wght@300;400;500;600;700`).join('&')
}&display=swap`;

export const FONT_AWESOME_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';

export function injectGoogleFontsIntoIframe(doc: Document): void {
  if (doc.getElementById('gf-all-fonts')) return;
  const pre1 = doc.createElement('link');
  pre1.rel = 'preconnect';
  pre1.href = 'https://fonts.googleapis.com';
  const pre2 = doc.createElement('link');
  pre2.rel = 'preconnect';
  pre2.href = 'https://fonts.gstatic.com';
  pre2.crossOrigin = '';
  const link = doc.createElement('link');
  link.id = 'gf-all-fonts';
  link.rel = 'stylesheet';
  link.href = GOOGLE_FONTS_URL;
  doc.head.append(pre1, pre2, link);
}

export function injectFontAwesomeIntoIframe(doc: Document): void {
  if (doc.getElementById('fa-cdn')) return;
  const link = doc.createElement('link');
  link.id = 'fa-cdn';
  link.rel = 'stylesheet';
  link.href = FONT_AWESOME_URL;
  doc.head.appendChild(link);
}
