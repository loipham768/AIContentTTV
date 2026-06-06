import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/mongodb";
import Feedback from "@/models/Feedback";
import { z } from "zod";

const schema = z.object({
  category: z.enum(["feature", "bug", "improvement", "other"]),
  title: z.string().min(5, "Tiêu đề tối thiểu 5 ký tự").max(100),
  content: z.string().min(10, "Nội dung tối thiểu 10 ký tự").max(2000),
});

export async function POST(req: NextRequest) {
  const session = await auth();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const issues = parsed.error.issues ?? (parsed.error as any).errors ?? [];
    const msg = issues[0]?.message ?? "Dữ liệu không hợp lệ";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  await dbConnect();

  await Feedback.create({
    userId: session?.user?.id ?? null,
    userEmail: session?.user?.email ?? null,
    category: parsed.data.category,
    title: parsed.data.title,
    content: parsed.data.content,
  });

  return NextResponse.json({ success: true });
}
