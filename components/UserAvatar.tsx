import Image from 'next/image'

interface UserAvatarProps {
  avatarUrl?: string
  fullName?: string
  email?: string
  size?: number      // px, default 32
  className?: string
}

function getInitials(fullName?: string, email?: string) {
  if (fullName?.trim()) {
    const parts = fullName.trim().split(/\s+/)
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase()
  }
  if (email) return email[0].toUpperCase()
  return '?'
}

const GRADIENTS = [
  'from-indigo-500 to-violet-600',
  'from-blue-500 to-cyan-600',
  'from-emerald-500 to-teal-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
]

function gradientFor(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) & 0xffff
  return GRADIENTS[h % GRADIENTS.length]
}

export default function UserAvatar({ avatarUrl, fullName, email, size = 32, className = '' }: UserAvatarProps) {
  const initials = getInitials(fullName, email)
  const grad     = gradientFor(email ?? fullName ?? '?')
  const fontSize = Math.max(8, Math.round(size * 0.38))

  if (avatarUrl) {
    return (
      <div
        className={`rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/20 ${className}`}
        style={{ width: size, height: size }}
      >
        <Image src={avatarUrl} alt={initials} width={size} height={size} className="object-cover w-full h-full" />
      </div>
    )
  }

  return (
    <div
      className={`rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${grad} ring-2 ring-white/20 ${className}`}
      style={{ width: size, height: size, fontSize }}
    >
      <span className="font-bold text-white leading-none">{initials}</span>
    </div>
  )
}
