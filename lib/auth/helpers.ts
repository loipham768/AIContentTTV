import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'
import type { JWT } from 'next-auth/jwt'
import type { Session } from 'next-auth'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export async function authorize(credentials: Record<string, unknown> | undefined) {
  const parsed = signInSchema.safeParse(credentials)
  if (!parsed.success) return null

  await dbConnect()
  const user = await User.findOne({ email: parsed.data.email }).lean() as any
  if (!user) return null

  const valid = await bcrypt.compare(parsed.data.password, user.passwordHash)
  if (!valid) return null

  return { id: user._id.toString(), email: user.email as string }
}

export function jwtCallback({ token, user }: { token: JWT; user?: { id?: string } }) {
  if (user?.id) token.id = user.id
  return token
}

export function sessionCallback({
  session,
  token,
}: {
  session: Session
  token: JWT
}): Session {
  if (token.id) session.user.id = token.id as string
  return session
}
