import { dbConnect } from './mongodb'
import User from '@/models/User'
import { PLAN_LIMITS, type Plan } from './planConfig'

export type GateError = {
  allowed: false
  reason: string
  code: 'quota_exceeded' | 'plan_required' | 'not_found'
  upgradeRequired: boolean
}
export type GateOk = { allowed: true }
export type GateResult = GateOk | GateError

function currentMonth() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

async function loadAndRefreshUser(userId: string) {
  await dbConnect()
  const user = await User.findById(userId)
  if (!user) return null

  const now = new Date()

  // Auto-downgrade if subscription expired
  if (user.plan !== 'free' && user.planExpiresAt && user.planExpiresAt < now) {
    user.plan = 'free'
    user.planExpiresAt = null
  }

  // One-time migration: merge legacy creditsLandingPages → credits
  if (user.creditsLandingPages > 0) {
    user.credits += user.creditsLandingPages
    user.creditsTotal = (user.creditsTotal ?? 0) + user.creditsLandingPages
    user.creditsLandingPages = 0
  }

  // Lazy monthly reset
  const month = currentMonth()
  if (user.usageMonth !== month) {
    user.generationsUsed = 0
    user.usageMonth = month
  }

  return user
}

export async function checkAndIncrementGeneration(userId: string): Promise<GateResult> {
  const user = await loadAndRefreshUser(userId)
  if (!user) return { allowed: false, reason: 'Không tìm thấy tài khoản.', code: 'not_found', upgradeRequired: false }

  const plan: Plan = user.plan ?? 'free'
  const limits = PLAN_LIMITS[plan]

  if (user.generationsUsed < limits.generationsPerMonth) {
    user.generationsUsed += 1
    user.lastAiGeneratedAt = new Date()
    await user.save()
    return { allowed: true }
  }

  // Fallback: deduct from credits
  if (user.credits > 0) {
    user.credits -= 1
    user.lastAiGeneratedAt = new Date()
    await user.save()
    return { allowed: true }
  }

  await user.save()
  return {
    allowed: false,
    reason: 'Bạn đã dùng hết lượt tạo nội dung tháng này. Mua thêm lượt (15.000đ/lượt) hoặc nâng cấp gói Cơ bản để có 20 lượt/tháng.',
    code: 'quota_exceeded',
    upgradeRequired: true,
  }
}

export async function checkOutputAllowed(userId: string): Promise<GateResult> {
  const user = await loadAndRefreshUser(userId)
  if (!user) return { allowed: false, reason: 'Không tìm thấy tài khoản.', code: 'not_found', upgradeRequired: false }

  const plan: Plan = user.plan ?? 'free'

  // Paid plans: export/copy/publish are always free
  if (plan !== 'free') {
    await user.save()
    return { allowed: true }
  }

  // Free plan: every output action costs 1 lượt (same counter as AI)
  const limits = PLAN_LIMITS[plan]
  if (user.generationsUsed < limits.generationsPerMonth) {
    user.generationsUsed += 1
    await user.save()
    return { allowed: true }
  }

  if (user.credits > 0) {
    user.credits -= 1
    await user.save()
    return { allowed: true }
  }

  await user.save()
  return {
    allowed: false,
    reason: 'Bạn đã dùng hết 5 lượt tháng này. Xuất HTML, PDF, sao chép và xuất bản đều dùng chung giới hạn này. Mua thêm lượt (15.000đ/lượt) hoặc nâng cấp gói Cơ bản.',
    code: 'quota_exceeded',
    upgradeRequired: true,
  }
}

export async function checkExportAllowed(userId: string): Promise<GateResult> {
  const user = await loadAndRefreshUser(userId)
  if (!user) return { allowed: false, reason: 'Không tìm thấy tài khoản.', code: 'not_found', upgradeRequired: false }

  const plan: Plan = user.plan ?? 'free'
  const limits = PLAN_LIMITS[plan]

  await user.save()

  if (!limits.canExport) {
    return {
      allowed: false,
      reason: 'Gói của bạn không hỗ trợ xuất mã HTML. Vui lòng nâng cấp lên gói Cơ bản hoặc Pro.',
      code: 'plan_required',
      upgradeRequired: true,
    }
  }

  return { allowed: true }
}

export async function checkPublishAllowed(userId: string): Promise<GateResult> {
  const user = await loadAndRefreshUser(userId)
  if (!user) return { allowed: false, reason: 'Không tìm thấy tài khoản.', code: 'not_found', upgradeRequired: false }

  const plan: Plan = user.plan ?? 'free'
  const limits = PLAN_LIMITS[plan]

  await user.save()

  if (!limits.canPublish) {
    return {
      allowed: false,
      reason: 'Gói miễn phí không hỗ trợ xuất bản trang. Vui lòng nâng cấp lên gói Cơ bản hoặc Pro.',
      code: 'plan_required',
      upgradeRequired: true,
    }
  }

  return { allowed: true }
}

export async function getUserPlanInfo(userId: string) {
  const user = await loadAndRefreshUser(userId)
  if (!user) return null

  const plan: Plan = user.plan ?? 'free'
  const limits = PLAN_LIMITS[plan]
  await user.save()

  return {
    plan,
    canExport:        limits.canExport,
    canPublish:       limits.canPublish,
    generationsUsed:  user.generationsUsed,
    generationsLimit: limits.generationsPerMonth,
    credits:          user.credits,
    creditsTotal:     user.creditsTotal ?? user.credits,
    planExpiresAt:    user.planExpiresAt?.toISOString() ?? null,
  }
}
