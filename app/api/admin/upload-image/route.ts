import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const u = await User.findById(session.user.id, { isAdmin: 1 }).lean() as any;
  if (!u?.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "Không có file nào được tải lên." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Chỉ hỗ trợ JPG, PNG, GIF, WebP, SVG." }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Kích thước file tối đa là 5 MB." }, { status: 400 });
  }

  const uploadType = (formData.get("type") as string | null) === "template" ? "templates" : "articles";
  const prefix = uploadType === "templates" ? "template" : "article";
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const safeName = `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  let url: string;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    try {
      const blob = await put(`${uploadType}/${safeName}`, file, { access: "public" });
      url = blob.url;
    } catch (err) {
      console.error("[/api/admin/upload-image] blob error:", err);
      return NextResponse.json({ error: "Lỗi lưu file. Vui lòng thử lại." }, { status: 500 });
    }
  } else {
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads", uploadType);
      await fs.mkdir(uploadDir, { recursive: true });
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(path.join(uploadDir, safeName), buffer);
      url = `/uploads/${uploadType}/${safeName}`;
    } catch (err) {
      console.error("[/api/admin/upload-image] local error:", err);
      return NextResponse.json({ error: "Lỗi lưu file. Vui lòng thử lại." }, { status: 500 });
    }
  }

  return NextResponse.json({ url });
}
