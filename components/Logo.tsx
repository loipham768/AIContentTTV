import Link from 'next/link'

interface LogoIconProps {
  size?: number
  /** unique suffix to avoid duplicate SVG gradient IDs on same page */
  uid?: string
}

export function LogoIcon({ size = 36, uid = 'a' }: LogoIconProps) {
  const gBg    = `tp-bg-${uid}`
  const gDepth = `tp-dp-${uid}`
  const gStar  = `tp-st-${uid}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Background: deep midnight → electric indigo */}
        <linearGradient id={gBg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#0d0a2e" />
          <stop offset="58%"  stopColor="#2d1b69" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>

        {/* Inner depth glow — bottom-right warm violet */}
        <radialGradient id={gDepth} cx="72%" cy="74%" r="55%">
          <stop offset="0%"   stopColor="#7c3aed" stopOpacity="0.50" />
          <stop offset="100%" stopColor="#0d0a2e" stopOpacity="0"   />
        </radialGradient>

        {/* Star fill: bright white core → light violet */}
        <radialGradient id={gStar} cx="40%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#f5f0ff" />
          <stop offset="100%" stopColor="#a78bfa" />
        </radialGradient>
      </defs>

      {/* ── Background ─────────────────────────── */}
      <rect width="40" height="40" rx="10" fill={`url(#${gBg})`} />
      <rect width="40" height="40" rx="10" fill={`url(#${gDepth})`} />

      {/* Subtle top-edge shine */}
      <rect x="0.5" y="0.5" width="39" height="13" rx="9.5"
            fill="white" fillOpacity="0.05" />

      {/* Outer border */}
      <rect x="0.5" y="0.5" width="39" height="39" rx="9.5"
            stroke="white" strokeOpacity="0.10" strokeWidth="1" />

      {/* ── Document / Page icon ────────────────── */}
      {/* Body with dog-ear at top-right */}
      <path d="M7,12 H21 L28,19 V34 H7 Z"
            fill="white" fillOpacity="0.08"
            stroke="white" strokeOpacity="0.42" strokeWidth="1"
            strokeLinejoin="round" />

      {/* Dog-ear fold triangle */}
      <path d="M21,12 L28,19 H21 Z"
            fill="white" fillOpacity="0.18"
            stroke="white" strokeOpacity="0.22" strokeWidth="0.75"
            strokeLinejoin="round" />

      {/* Content rows — three text lines */}
      <line x1="10.5" y1="22.5" x2="24.5" y2="22.5"
            stroke="white" strokeOpacity="0.52" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="10.5" y1="26.5" x2="20.0" y2="26.5"
            stroke="white" strokeOpacity="0.36" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="10.5" y1="30.5" x2="22.5" y2="30.5"
            stroke="white" strokeOpacity="0.24" strokeWidth="1.3" strokeLinecap="round" />

      {/* ── AI Sparkle — 4-pointed star ─────────── */}
      {/* Halo glow behind star */}
      <circle cx="31" cy="9" r="6" fill="#6d28d9" fillOpacity="0.25" />

      {/* Main 4-pointed star centered at (31, 9), outer R=4.5, inner r=1.8 */}
      {/* Points: top(31,4.5) tr-inner(32.27,7.73) right(35.5,9) br-inner(32.27,10.27)
                 bottom(31,13.5) bl-inner(29.73,10.27) left(26.5,9) tl-inner(29.73,7.73) */}
      <path d="M31,4.5 L32.27,7.73 L35.5,9 L32.27,10.27 L31,13.5 L29.73,10.27 L26.5,9 L29.73,7.73 Z"
            fill={`url(#${gStar})`} />

      {/* Smaller secondary star — top-right corner sparkle */}
      {/* Centered at (35.5, 5), outer R=2, inner r=0.8 */}
      <path d="M35.5,3 L36.07,4.43 L37.5,5 L36.07,5.57 L35.5,7 L34.93,5.57 L33.5,5 L34.93,4.43 Z"
            fill="white" fillOpacity="0.50" />

      {/* Dashed "creation thread" from star bottom → page dog-ear corner */}
      <path d="M29.5,11.5 Q25.5,13.5 21,12"
            stroke="white" strokeOpacity="0.20" strokeWidth="0.8"
            fill="none" strokeDasharray="1.6 1.4" strokeLinecap="round" />

      {/* Constellation accent dots */}
      <circle cx="36.5" cy="11.5" r="1.0" fill="white" fillOpacity="0.38" />
      <circle cx="33.5" cy="3.5"  r="0.75" fill="white" fillOpacity="0.28" />
    </svg>
  )
}

interface LogoProps {
  iconSize?: number
  iconOnly?: boolean
  dark?: boolean
  className?: string
  uid?: string
}

export default function Logo({
  iconSize = 36,
  iconOnly = false,
  dark = false,
  className = '',
  uid = 'a',
}: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <LogoIcon size={iconSize} uid={uid} />
      {!iconOnly && (
        <span className="font-extrabold text-[1.05rem] leading-none tracking-tight whitespace-nowrap">
          <span
            className={`bg-gradient-to-r ${
              dark ? 'from-indigo-300 to-violet-300' : 'from-indigo-500 to-violet-600'
            } bg-clip-text text-transparent`}
          >
            AI
          </span>
          <span className={dark ? 'text-white' : 'text-slate-800'}>Tao</span>
          <span
            className={dark ? 'text-white/50' : 'text-slate-400'}
            style={{ fontWeight: 600 }}
          >
            Page
          </span>
        </span>
      )}
    </Link>
  )
}
