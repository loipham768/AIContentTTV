import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import { PLAN_PRICES, CREDIT_PACKS, CREDIT_PRICE_PER_UNIT, CREDIT_MIN_QTY, CREDIT_MAX_QTY } from "@/lib/planConfig";
import { sendNewOrderAdminEmail } from "@/lib/email";
import { generateOrderId } from "@/lib/orderUtils";

export const runtime = "nodejs";

const subscriptionSchema = z.object({
  type: z.literal("subscription"),
  plan: z.enum(["designer", "basic", "pro"]),
  billing: z.enum(["monthly", "yearly"]),
});

const creditsSchema = z.object({
  type: z.literal("credits"),
  qty: z.number().int().min(CREDIT_MIN_QTY).max(CREDIT_MAX_QTY),
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

  // If there's an existing pending order for the same plan/billing/pack → resume it
  // If different → cancel old and allow creating a new one
  const existing = (await Order.findOne({
    userId: session.user.id,
    status: "pending",
  }).lean()) as any;

  if (existing) {
    const input = parsed.data;
    const isSame =
      input.type === "subscription"
        ? existing.type === "subscription" &&
          existing.plan === input.plan &&
          existing.billing === input.billing
        : existing.type === "credits" &&
          existing.amount === input.qty * CREDIT_PRICE_PER_UNIT;

    if (isSame) {
      return NextResponse.json(
        { orderId: existing.orderId, amount: existing.amount },
        { status: 200 },
      );
    }
    // Different product → cancel old order
    await Order.updateOne({ _id: existing._id }, { $set: { status: "cancelled" } });
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
    const { qty } = input;
    const amount = qty * CREDIT_PRICE_PER_UNIT;
    orderData = {
      orderId,
      userId: session.user.id,
      type: "credits",
      creditsHtml: qty,
      amount,
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
