export type Plan = 'free' | 'basic' | 'pro'

export interface PlanLimits {
  generationsPerMonth: number  // Infinity = unlimited
  canExport: boolean
  historyDays: number | null
  maxTemplates: number
}

export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free: {
    generationsPerMonth: 4,
    canExport:           false,
    historyDays:         null,
    maxTemplates:        3,
  },
  basic: {
    generationsPerMonth: 25,
    canExport:           true,
    historyDays:         30,
    maxTemplates:        Infinity,
  },
  pro: {
    generationsPerMonth: Infinity,
    canExport:           true,
    historyDays:         null,
    maxTemplates:        Infinity,
  },
}

export const PLAN_PRICES = {
  basic: { monthly: 99_000,  yearly: 948_000  },
  pro:   { monthly: 199_000, yearly: 1_908_000 },
} as const

export const CREDIT_PACKS = [
  { id: 'c1', amount: 20_000,  credits: 4,  label: '4 lượt tạo HTML' },
  { id: 'c2', amount: 50_000,  credits: 12, label: '12 lượt tạo HTML' },
  { id: 'c3', amount: 100_000, credits: 30, label: '30 lượt tạo HTML', featured: true },
  { id: 'c4', amount: 200_000, credits: 72, label: '72 lượt tạo HTML' },
] as const

export type CreditPackId = typeof CREDIT_PACKS[number]['id']

export const BANK_INFO = {
  bank:          process.env.BANK_NAME          ?? 'Vietcombank',
  accountNumber: process.env.BANK_ACCOUNT       ?? '1234567890',
  accountHolder: process.env.BANK_HOLDER        ?? 'NGUYEN VAN A',
  branch:        process.env.BANK_BRANCH        ?? 'Chi nhánh TP.HCM',
}
