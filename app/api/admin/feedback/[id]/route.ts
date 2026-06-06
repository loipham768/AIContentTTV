import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";
import Feedback from "@/models/Feedback";
import { z } from "zod";

async function checkAdmin(userId: string) {
  const me = (await User.findById(userId).lean()) as any;
  return !!(me?.isAdmin || me?.email === process.env.ADMIN_EMAIL);
}

const patchSchema = z.object({
  status: z.enum(["new", "reviewed", "archived"]).optional(),
  adminNote: z.string().max(500).optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  if (!(await checkAdmin(session.user.id)))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await req.json();
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });

  const doc = await Feedback.findByIdAndUpdate(id, parsed.data, { new: true }).lean();
  if (!doc) return NextResponse.json({ error: "Không tìm thấy" }, { status: 404 });

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  if (!(await checkAdmin(session.user.id)))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  await Feedback.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
