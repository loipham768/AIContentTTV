import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import { PLAN_PRICES, CREDIT_PACKS } from "@/lib/planConfig";
import { sendNewOrderAdminEmail } from "@/lib/email";

export const runtime = "nodejs";

function generateOrderId(): string {
  const d = new Date();
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const random = Array.from(
    { length: 5 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
  return `VCB-${date}-${random}`;
}

const subscriptionSchema = z.object({
  type: z.literal("subscription"),
  plan: z.enum(["designer", "basic", "pro"]),
  billing: z.enum(["monthly", "yearly"]),
});

const creditsSchema = z.object({
  type: z.literal("credits"),
  packId: z.enum(["c1", "c2", "c3", "c4"]),
});

const orderBodySchema = z.discriminatedUnion("type", [
  subscriptionSchema,
  creditsSchema,
]);

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = orderBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  await dbConnect();

  // Block duplicate pending orders
  const existing = (await Order.findOne({
    userId: session.user.id,
    status: "pending",
  }).lean()) as any;
  if (existing) {
    return NextResponse.json(
      {
        error: "Bạn đang có đơn hàng chưa thanh toán.",
        orderId: existing.orderId,
      },
      { status: 409 },
    );
  }

  const orderId = generateOrderId();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h window

  let orderData: Record<string, unknown>;

  const input = parsed.data;
  if (input.type === "subscription") {
    const { plan, billing } = input;
    const amount = PLAN_PRICES[plan][billing];
    orderData = {
      orderId,
      userId: session.user.id,
      type: "subscription",
      plan,
      billing,
      amount,
      expiresAt,
    };
  } else {
    const pack = CREDIT_PACKS.find((p) => p.id === input.packId);
    if (!pack)
      return NextResponse.json({ error: "Invalid pack" }, { status: 400 });
    orderData = {
      orderId,
      userId: session.user.id,
      type: "credits",
      creditsHtml: pack.credits,
      amount: pack.amount,
      expiresAt,
    };
  }

  const order = await Order.create(orderData);

  // Notify admin (fire-and-forget)
  const userDoc = (await User.findById(session.user.id, {
    email: 1,
  }).lean()) as any;
  sendNewOrderAdminEmail({
    orderId: order.orderId,
    userEmail: userDoc?.email ?? session.user.id,
    type: order.type,
    plan: order.plan ?? null,
    billing: order.billing,
    amount: order.amount,
  }).catch(console.error);

  return NextResponse.json(
    { orderId: order.orderId, amount: order.amount },
    { status: 201 },
  );
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const orders = await Order.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();

  return NextResponse.json({ orders });
}
