export type Plan = 'free' | 'basic' | 'pro'

export interface PlanLimits {
  htmlBlocksPerMonth: number   // Infinity = unlimited
  landingPagesPerMonth: number
  canExport: boolean           // copy HTML + download file
  historyDays: number | null   // null = unlimited
  maxTemplates: number         // Infinity = all templates
}

export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free: {
    htmlBlocksPerMonth:    3,
    landingPagesPerMonth:  1,
    canExport:             false,
    historyDays:           null,
    maxTemplates:          3,
  },
  basic: {
    htmlBlocksPerMonth:    20,
    landingPagesPerMonth:  5,
    canExport:             true,
    historyDays:           30,
    maxTemplates:          Infinity,
  },
  pro: {
    htmlBlocksPerMonth:    Infinity,
    landingPagesPerMonth:  Infinity,
    canExport:             true,
    historyDays:           null,
    maxTemplates:          Infinity,
  },
}

export const PLAN_PRICES = {
  basic: { monthly: 99_000,  yearly: 948_000  },   // 79k × 12
  pro:   { monthly: 199_000, yearly: 1_908_000 },  // 159k × 12
} as const

export const CREDIT_PACKS = [
  { id: 'c1', amount: 20_000,  html: 4,  landingPages: 0, label: '4 bài viết HTML' },
  { id: 'c2', amount: 50_000,  html: 10, landingPages: 2, label: '10 bài viết + 2 landing page' },
  { id: 'c3', amount: 100_000, html: 25, landingPages: 5, label: '25 bài viết + 5 landing page', featured: true },
  { id: 'c4', amount: 200_000, html: 60, landingPages: 12, label: '60 bài viết + 12 landing page' },
] as const

export type CreditPackId = typeof CREDIT_PACKS[number]['id']

export const BANK_INFO = {
  bank:          process.env.BANK_NAME          ?? 'Vietcombank',
  accountNumber: process.env.BANK_ACCOUNT       ?? '1234567890',
  accountHolder: process.env.BANK_HOLDER        ?? 'NGUYEN VAN A',
  branch:        process.env.BANK_BRANCH        ?? 'Chi nhánh TP.HCM',
}
