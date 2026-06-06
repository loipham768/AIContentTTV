import Link from 'next/link'

interface LogoIconProps {
  size?: number
  uid?: string
}

export function LogoIcon({ size = 36, uid = 'a' }: LogoIconProps) {
  const gBg  = `z-bg-${uid}`
  const gBar = `z-br-${uid}`
  const gLeg = `z-lg-${uid}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      style={{ overflow: 'hidden' }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Near-black so neon crossbar pops */}
        <linearGradient id={gBg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#08061a" />
          <stop offset="100%" stopColor="#170c38" />
        </linearGradient>

        {/* Legs: white → soft lavender top-to-bottom */}
        <linearGradient id={gLeg} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#ffffff" />
          <stop offset="100%" stopColor="#a5b4fc" />
        </linearGradient>

        {/* Crossbar: electric cyan → violet → fuchsia (user-space so it works on a stroke) */}
        <linearGradient id={gBar} x1="11" y1="22" x2="29" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#22d3ee" />
          <stop offset="50%"  stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#f0abfc" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="40" height="40" rx="10" fill={`url(#${gBg})`} />

      {/* Ambient bloom behind the mark */}
      <ellipse cx="20" cy="22" rx="14" ry="11"
               fill="#7c3aed" fillOpacity="0.14" />

      {/* Border ring */}
      <rect x="0.5" y="0.5" width="39" height="39" rx="9.5"
            stroke="white" strokeOpacity="0.08" strokeWidth="1" />

      {/* ── "A" lettermark ───────────────────────── */}

      {/* Left leg: apex → bottom-left */}
      <line x1="20" y1="6" x2="7" y2="35"
            stroke={`url(#${gLeg})`} strokeWidth="3.5" strokeLinecap="round" />

      {/* Right leg: apex → bottom-right */}
      <line x1="20" y1="6" x2="33" y2="35"
            stroke={`url(#${gLeg})`} strokeWidth="3.5" strokeLinecap="round" />

      {/* Neon crossbar — 3 layers: wide soft glow → tight core */}
      <line x1="11" y1="22" x2="29" y2="22"
            stroke={`url(#${gBar})`} strokeWidth="11" strokeLinecap="round" opacity="0.07" />
      <line x1="11" y1="22" x2="29" y2="22"
            stroke={`url(#${gBar})`} strokeWidth="6.5" strokeLinecap="round" opacity="0.16" />
      <line x1="11" y1="22" x2="29" y2="22"
            stroke={`url(#${gBar})`} strokeWidth="3.5" strokeLinecap="round" />

      {/* Apex dot — subtle highlight at the top of the A */}
      <circle cx="20" cy="5.8" r="2" fill="white" fillOpacity="0.55" />
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
              dark
                ? 'from-sky-300 via-violet-300 to-fuchsia-300'
                : 'from-sky-500 via-violet-500 to-fuchsia-600'
            } bg-clip-text text-transparent`}
          >
            AI
          </span>
          <span className={dark ? 'text-white' : 'text-slate-800'}>Tao</span>
          <span
            className={dark ? 'text-white/45' : 'text-slate-400'}
            style={{ fontWeight: 600 }}
          >
            Page
          </span>
        </span>
      )}
    </Link>
  )
}
