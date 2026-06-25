export type Plan = "free" | "designer" | "basic" | "pro";

export interface PlanLimits {
  // FREE: counts ALL output actions (AI generate + export HTML/PDF + copy + publish).
  // PAID: counts ONLY AI generation calls. Export/copy/publish never consume quota.
  generationsPerMonth: number; // Infinity = unlimited, 0 = none
  canExport: boolean;
  canPublish: boolean;
  historyDays: number | null;
  maxTemplates: number;
}

export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free: {
    generationsPerMonth: 5,
    canExport: true,
    canPublish: true,
    historyDays: null,
    maxTemplates: Infinity,
  },
  designer: {
    // kept for backward compat with existing users — no longer sold
    generationsPerMonth: 0,
    canExport: true,
    canPublish: true,
    historyDays: 30,
    maxTemplates: Infinity,
  },
  basic: {
    generationsPerMonth: 20,
    canExport: true,
    canPublish: true,
    historyDays: 30,
    maxTemplates: Infinity,
  },
  pro: {
    generationsPerMonth: Infinity,
    canExport: true,
    canPublish: true,
    historyDays: null,
    maxTemplates: Infinity,
  },
};

export const PLAN_PRICES = {
  designer: { monthly: 59_000, yearly: 564_000 }, // kept for backward compat
  basic: { monthly: 69_000, yearly: 660_000 },    // yearly = 55,000đ/tháng
  pro: { monthly: 149_000, yearly: 1_428_000 },   // yearly = 119,000đ/tháng
} as const;

// Pay-as-you-go credit pricing
export const CREDIT_PRICE_PER_UNIT = 15_000; // VND per generation
export const CREDIT_MIN_QTY = 1;
export const CREDIT_MAX_QTY = 200;

// Kept for backward compat with PlanUpgradeButton & old orders in DB
export const CREDIT_PACKS = [
  { id: "c1", amount: 20_000, credits: 4, label: "4 lượt tạo HTML" },
  { id: "c2", amount: 50_000, credits: 12, label: "12 lượt tạo HTML" },
  {
    id: "c3",
    amount: 100_000,
    credits: 30,
    label: "30 lượt tạo HTML",
    featured: true,
  },
  { id: "c4", amount: 200_000, credits: 72, label: "72 lượt tạo HTML" },
] as const;

export type CreditPackId = (typeof CREDIT_PACKS)[number]["id"];

export const BANK_INFO = {
  bank: process.env.BANK_NAME ?? "Vietcombank",
  // VietQR BIN — 970436 = Vietcombank. Change via BANK_BIN env var if using another bank.
  bankId: process.env.BANK_BIN ?? "970436",
  accountNumber: process.env.BANK_ACCOUNT ?? "0251002752085",
  accountHolder: process.env.BANK_HOLDER ?? "PHAM VAN LOI",
  branch: process.env.BANK_BRANCH ?? "Chi nhánh TP.HCM",
};
