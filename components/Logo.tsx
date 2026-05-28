import Link from 'next/link'

interface LogoIconProps {
  size?: number
  /** unique suffix to avoid duplicate SVG gradient IDs on same page */
  uid?: string
}

export function LogoIcon({ size = 36, uid = 'a' }: LogoIconProps) {
  const id = `tp-g-${uid}`
  const id2 = `tp-g2-${uid}`
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
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#4f46e5" />
          <stop offset="50%"  stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <linearGradient id={id2} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="40" height="40" rx="10" fill={`url(#${id})`} />

      {/* Subtle inner shine */}
      <rect x="1" y="1" width="38" height="19" rx="9.5" fill={`url(#${id2})`} />

      {/* Outer border */}
      <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" stroke="white" strokeOpacity="0.15" strokeWidth="1" />

      {/* T monogram */}
      <path
        d="M7 9.5 H33 V15 H24.5 V32.5 H15.5 V15 H7 Z"
        fill="white"
        fillOpacity="0.95"
      />

      {/* AI sparkle accent — three dots top-right */}
      <circle cx="32" cy="6.5" r="2"   fill="white" fillOpacity="0.75" />
      <circle cx="36.5" cy="10" r="1.3" fill="white" fillOpacity="0.45" />
      <circle cx="29.5" cy="3.5" r="1"  fill="white" fillOpacity="0.35" />
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

export default function Logo({ iconSize = 36, iconOnly = false, dark = false, className = '', uid = 'a' }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <LogoIcon size={iconSize} uid={uid} />
      {!iconOnly && (
        <span className="font-extrabold text-[1.05rem] leading-none tracking-tight whitespace-nowrap">
          <span className={`bg-gradient-to-r ${dark ? 'from-indigo-300 to-sky-300' : 'from-indigo-600 to-violet-500'} bg-clip-text text-transparent`}>
            AI
          </span>
          <span className={dark ? 'text-white' : 'text-gray-800'}>TaoPage</span>
        </span>
      )}
    </Link>
  )
}
