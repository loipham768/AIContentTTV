import type { Metadata } from "next";
import { auth } from "@/auth";
import { SITE_URL } from "@/lib/constants";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import {
  PLAN_PRICES,
  CREDIT_PACKS,
  CREDIT_PRICE_PER_UNIT,
  CREDIT_MIN_QTY,
  CREDIT_MAX_QTY,
  type CreditPackId,
} from "@/lib/planConfig";
import { sendNewOrderAdminEmail } from "@/lib/email";
import { generateOrderId } from "@/lib/orderUtils";

export const metadata: Metadata = {
  title: "Nâng cấp gói — TaoPage",
  description:
    "Nâng cấp lên Basic hoặc Pro để tạo không giới hạn landing page, bài viết và quảng cáo bằng AI.",
  openGraph: {
    title: "Nâng cấp gói — TaoPage",
    description:
      "Nâng cấp lên Basic hoặc Pro để tạo không giới hạn landing page, bài viết và quảng cáo bằng AI.",
    url: `${SITE_URL}/upgrade`,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export const runtime = "nodejs";

type SearchParams = {
  plan?: string;
  billing?: string;
  type?: string;
  pack?: string;
  qty?: string;
};

export default async function UpgradePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await auth();
  const params = await searchParams;

  const isCredits = params.type === "credits";

  // Not logged in → go register, preserve all params
  if (!session?.user?.id) {
    const qs = isCredits
      ? params.qty
        ? `type=credits&qty=${params.qty}`
        : `type=credits&pack=${params.pack ?? ""}`
      : `plan=${params.plan ?? ""}&billing=${params.billing ?? "monthly"}`;
    redirect(`/login?${qs}`);
  }

  await dbConnect();

  // ── Credits flow ──────────────────────────────────────────────────────
  if (isCredits) {
    let creditsCount: number;
    let amount: number;

    if (params.qty) {
      // New qty-based flow: 15,000đ per lượt, self-selected quantity
      const qty = parseInt(params.qty, 10);
      if (isNaN(qty) || qty < CREDIT_MIN_QTY || qty > CREDIT_MAX_QTY) redirect("/#pricing");
      creditsCount = qty;
      amount = qty * CREDIT_PRICE_PER_UNIT;
    } else {
      // Legacy pack-based flow (backward compat for old links)
      const packId = params.pack as CreditPackId;
      const pack = CREDIT_PACKS.find((p) => p.id === packId);
      if (!pack) redirect("/#pricing");
      creditsCount = pack!.credits;
      amount = pack!.amount;
    }

    const existing = (await Order.findOne({
      userId: session.user.id,
      status: "pending",
      expiresAt: { $gt: new Date() },
    }).lean()) as any;

    if (existing) {
      if (existing.type === "credits" && existing.amount === amount) {
        redirect(`/checkout/${existing.orderId}`);
      }
      await Order.updateOne({ _id: existing._id }, { $set: { status: "cancelled" } });
    }

    const orderId = generateOrderId();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await Order.create({
      orderId,
      userId: session.user.id,
      type: "credits",
      creditsHtml: creditsCount,
      amount,
      expiresAt,
    });

    const userDoc = (await User.findById(session.user.id, {
      email: 1,
    }).lean()) as any;
    sendNewOrderAdminEmail({
      orderId,
      userEmail: userDoc?.email ?? session.user.id,
      type: "credits",
      amount,
    }).catch(console.error);

    redirect(`/checkout/${orderId}`);
  }

  // ── Subscription flow ─────────────────────────────────────────────────
  const plan = params.plan;
  const billing: "monthly" | "yearly" =
    params.billing === "yearly" ? "yearly" : "monthly";

  if (!plan || (plan !== "designer" && plan !== "basic" && plan !== "pro"))
    redirect("/#pricing");

  const existing = (await Order.findOne({
    userId: session.user.id,
    status: "pending",
    expiresAt: { $gt: new Date() },
  }).lean()) as any;

  if (existing) {
    // Same plan + billing → resume
    if (
      existing.type === "subscription" &&
      existing.plan === plan &&
      existing.billing === billing
    ) {
      redirect(`/checkout/${existing.orderId}`);
    }
    // Different plan or billing → cancel old, create new
    await Order.updateOne({ _id: existing._id }, { $set: { status: "cancelled" } });
  }

  const orderId = generateOrderId();
  const amount = PLAN_PRICES[plan as "designer" | "basic" | "pro"][billing];
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await Order.create({
    orderId,
    userId: session.user.id,
    type: "subscription",
    plan,
    billing,
    amount,
    expiresAt,
  });

  const userDoc = (await User.findById(session.user.id, {
    email: 1,
  }).lean()) as any;
  sendNewOrderAdminEmail({
    orderId,
    userEmail: userDoc?.email ?? session.user.id,
    type: "subscription",
    plan,
    billing,
    amount,
  }).catch(console.error);

  redirect(`/checkout/${orderId}`);
}
