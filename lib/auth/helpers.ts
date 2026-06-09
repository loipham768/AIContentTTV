import bcrypt from "bcryptjs";
import { z } from "zod";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function authorize(
  credentials: Record<string, unknown> | undefined,
) {
  const parsed = signInSchema.safeParse(credentials);
  if (!parsed.success) {
    console.warn('[auth] validate fail:', parsed.error.issues[0]?.message);
    return null;
  }

  await dbConnect();
  const user = (await User.findOne({ email: parsed.data.email.toLowerCase() }).lean()) as any;
  if (!user) {
    console.warn('[auth] user not found:', parsed.data.email);
    return null;
  }

  const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!valid) {
    console.warn('[auth] wrong password for:', parsed.data.email);
    return null;
  }

  if (user.isActive === false) {
    console.warn('[auth] account inactive:', parsed.data.email);
    return null;
  }

  return { id: user._id.toString(), email: user.email as string };
}

export async function jwtCallback({
  token,
  user,
}: {
  token: JWT;
  user?: { id?: string };
}) {
  if (user?.id) {
    token.id = user.id;
    return token;
  }

  // On subsequent requests, verify user still exists and is active
  if (token.id) {
    await dbConnect();
    const dbUser = await User.findById(token.id).select("isActive").lean() as any;
    if (!dbUser || dbUser.isActive === false) return null;
  }

  return token;
}

export function sessionCallback({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}): Session {
  if (token.id) session.user.id = token.id as string;
  return session;
}
