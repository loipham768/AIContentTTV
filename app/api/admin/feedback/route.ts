import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";
import Feedback from "@/models/Feedback";
import { ADMIN_PAGE_SIZE as PAGE_SIZE } from "@/lib/adminConfig";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const me = (await User.findById(session.user.id).lean()) as any;
  const isAdmin = !!(me?.isAdmin || me?.email === process.env.ADMIN_EMAIL);
  if (!isAdmin)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1") || 1);
  const status = searchParams.get("status") ?? "";

  const filter = status ? { status } : {};

  const [total, docs] = await Promise.all([
    Feedback.countDocuments(filter),
    Feedback.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
  ]);

  const rows = (docs as any[]).map((f) => ({
    _id: f._id.toString(),
    userId: f.userId ?? null,
    userEmail: f.userEmail ?? null,
    category: f.category,
    title: f.title,
    content: f.content,
    status: f.status,
    adminNote: f.adminNote ?? "",
    createdAt: (f.createdAt as Date).toISOString(),
  }));

  return NextResponse.json({ rows, total, page });
}
