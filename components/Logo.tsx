interface LogoIconProps {
  size?: number
  /** unique suffix to avoid duplicate SVG gradient IDs on same page */
  uid?: string
}

export function LogoIcon({ size = 36, uid = 'a' }: LogoIconProps) {
  const id = `aicb-g-${uid}`
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
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="55%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
      </defs>

      {/* Rounded square background */}
      <rect width="40" height="40" rx="10" fill={`url(#${id})`} />

      {/* Outer decorative ring (subtle) */}
      <rect x="1" y="1" width="38" height="38" rx="9.5" stroke="white" strokeOpacity="0.12" strokeWidth="1" />

      {/* Lightning bolt — the "Booster" symbol */}
      <path
        d="M22.5 6 L12 22 H18.5 L17 34 L28 18 H21.5 L22.5 6Z"
        fill="white"
        fillOpacity="0.95"
      />

      {/* Small accent sparkle dots */}
      <circle cx="9"  cy="11" r="1.8" fill="white" fillOpacity="0.35" />
      <circle cx="31" cy="29" r="1.4" fill="white" fillOpacity="0.28" />
      <circle cx="7"  cy="30" r="1"   fill="white" fillOpacity="0.2"  />
    </svg>
  )
}

interface LogoProps {
  iconSize?: number
  /** hide the text wordmark, show icon only */
  iconOnly?: boolean
  /** white text for dark backgrounds */
  dark?: boolean
  className?: string
  uid?: string
}

export default function Logo({ iconSize = 36, iconOnly = false, dark = false, className = '', uid = 'a' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <LogoIcon size={iconSize} uid={uid} />
      {!iconOnly && (
        <span className="font-extrabold text-[1.05rem] leading-none tracking-tight whitespace-nowrap">
          <span className={`bg-gradient-to-r ${dark ? 'from-indigo-300 to-violet-300' : 'from-indigo-600 to-violet-600'} bg-clip-text text-transparent`}>
            AI
          </span>
          <span className={dark ? 'text-white' : 'text-gray-800'}> Content Booster</span>
        </span>
      )}
    </span>
  )
}
