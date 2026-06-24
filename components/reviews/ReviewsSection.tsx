import { Star, LogIn, MessageSquare, CheckCircle2, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { unstable_cache } from 'next/cache'
import { dbConnect } from '@/lib/mongodb'
import Review from '@/models/Review'
import ReviewForm from './ReviewForm'

interface Props {
  userId?: string
}

const PLAN_BADGE: Record<string, { label: string; cls: string }> = {
  designer: { label: 'Designer', cls: 'bg-violet-500/20 text-violet-300 border border-violet-500/30' },
  basic:    { label: 'Basic',    cls: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' },
  pro:      { label: 'Pro',      cls: 'bg-amber-500/20  text-amber-300  border border-amber-500/30' },
}

const AVATAR_GRADS = [
  'from-indigo-500 to-violet-600',
  'from-violet-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
  'from-cyan-500 to-blue-600',
  'from-rose-500 to-pink-600',
]

function Stars({ rating, size = 4 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-${size} h-${size}`}
          fill={s <= rating ? '#f59e0b' : 'none'}
          stroke={s <= rating ? '#f59e0b' : '#374151'}
          strokeWidth={1.5}
        />
      ))}
    </span>
  )
}

export const getReviewStats = unstable_cache(
  async () => {
    await dbConnect()
    const [stats, recent] = await Promise.all([
      Review.aggregate([
        { $match: { isApproved: true } },
        { $group: { _id: null, avg: { $avg: '$rating' }, count: { $sum: 1 }, dist: { $push: '$rating' } } },
      ]),
      Review.find({ isApproved: true })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('-_id userName rating content plan createdAt')
        .lean() as Promise<any[]>,
    ])
    const s = stats[0]
    const dist = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: (s?.dist ?? []).filter((r: number) => r === star).length,
    }))
    const safeRecent = recent.map((r: any) => ({
      userName: r.userName ?? '',
      rating: r.rating ?? 0,
      content: r.content ?? '',
      plan: r.plan ?? '',
      createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : '',
    }))
    return { avg: s ? +s.avg.toFixed(1) : 0, count: s?.count ?? 0, recent: safeRecent, dist }
  },
  ['review-stats'],
  { revalidate: 3600 }
)

export const getCarouselReviews = unstable_cache(
  async () => {
    await dbConnect()
    return Review.find({ isApproved: true })
      .sort({ updatedAt: -1 })
      .limit(13)
      .select('-_id userName content rating plan')
      .lean() as Promise<{ _id: any; userName: string; content: string; rating: number; plan?: string }[]>
  },
  ['carousel-reviews'],
  { revalidate: 3600 }
)

export async function getUserHasReviewed(userId: string): Promise<boolean> {
  await dbConnect()
  return !!(await Review.findOne({ userId }).lean())
}

const getPublicReviews = unstable_cache(
  async () => {
    await dbConnect()
    const [reviews, stats] = await Promise.all([
      Review.find({ isApproved: true }).sort({ createdAt: -1 }).limit(6).lean() as Promise<any[]>,
      Review.aggregate([
        { $match: { isApproved: true } },
        { $group: { _id: null, avg: { $avg: '$rating' }, count: { $sum: 1 }, dist: { $push: '$rating' } } },
      ]),
    ])
    return { reviews, stats }
  },
  ['public-reviews'],
  { revalidate: 3600 }
)

export default async function ReviewsSection({ userId }: Props) {
  const [{ reviews, stats }, userReview] = await Promise.all([
    getPublicReviews(),
    userId ? (await dbConnect(), Review.findOne({ userId }).lean()) : Promise.resolve(null),
  ])

  const agg = stats[0] ?? { avg: 0, count: 0, dist: [] }
  const avgRating = agg.avg ? +agg.avg.toFixed(1) : 0
  const totalCount = agg.count ?? 0
  const dist = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: (agg.dist ?? []).filter((r: number) => r === s).length,
  }))

  const showForm = !!userId
  const hasReviewed = !!userReview

  return (
    <section style={{ background: '#080617' }} className="py-16 md:py-20 relative overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none opacity-25"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.3) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 text-xs font-semibold text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20">
            <Star className="w-3 h-3" fill="#f59e0b" strokeWidth={0} /> Đánh giá từ người dùng thực
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Người dùng nói gì về{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              TaoPage
            </span>?
          </h2>
        </div>

        {/* ── No reviews yet: centered layout ── */}
        {totalCount === 0 && (
          <div className="max-w-xl mx-auto">
            {hasReviewed ? (
              /* User reviewed but pending approval */
              <div
                className="rounded-2xl border border-emerald-500/20 p-10 text-center"
                style={{ background: 'linear-gradient(150deg, rgba(16,185,129,0.07), rgba(8,6,23,0.8))' }}
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                  <Sparkles className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Cảm ơn bạn rất nhiều! 🎉</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  Đánh giá của bạn đã được ghi nhận và đang chờ duyệt.
                  <br />
                  Bạn sẽ là một trong những người đầu tiên đánh giá TaoPage!
                </p>
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-emerald-400 border border-emerald-500/25"
                  style={{ background: 'rgba(16,185,129,0.08)' }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Đánh giá đang chờ duyệt
                </div>
              </div>
            ) : showForm ? (
              /* Logged in, hasn't reviewed yet */
              <div
                className="rounded-2xl border border-white/8 overflow-hidden"
                style={{ background: 'linear-gradient(150deg, rgba(99,102,241,0.1), #0d0b1f 60%)' }}
              >
                <div className="p-6 text-center border-b border-white/6">
                  <div className="flex justify-center gap-0.5 mb-3">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className="w-6 h-6" fill="#f59e0b" stroke="none" />
                    ))}
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">Hãy là người đầu tiên đánh giá!</h3>
                  <p className="text-xs text-gray-500">Trải nghiệm thực của bạn giúp cộng đồng tin tưởng hơn.</p>
                </div>
                <div className="p-6">
                  <ReviewForm hasReviewed={false} />
                </div>
              </div>
            ) : (
              /* Not logged in */
              <div
                className="rounded-2xl border border-white/8 p-10 text-center"
                style={{ background: 'linear-gradient(150deg, rgba(99,102,241,0.08), #0d0b1f 60%)' }}
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-5">
                  <MessageSquare className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Chưa có đánh giá nào</h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  Đăng nhập và trở thành người đầu tiên chia sẻ<br />
                  trải nghiệm thực với cộng đồng TaoPage.
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm font-bold rounded-xl transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
                >
                  <LogIn className="w-4 h-4" /> Đăng nhập để đánh giá
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ── Has reviews: stats + 2-column grid ── */}
        {totalCount > 0 && (
          <>
            {/* Stats strip */}
            <div
              className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-10 px-6 py-5 rounded-2xl border border-white/6 mx-auto max-w-2xl"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-5xl font-black text-white tabular-nums leading-none">{avgRating}</span>
                <div className="flex flex-col gap-1.5">
                  <Stars rating={Math.round(avgRating)} size={4} />
                  <p className="text-xs text-gray-500">{totalCount} đánh giá</p>
                </div>
              </div>

              <div className="w-px h-12 bg-white/8 hidden sm:block shrink-0" />

              <div className="flex-1 w-full space-y-1.5">
                {dist.map(({ star, count }) => {
                  const pct = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-[11px] text-gray-600 w-2.5 shrink-0 text-right">{star}</span>
                      <Star className="w-2.5 h-2.5 shrink-0" fill="#f59e0b" stroke="none" />
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${pct}%`,
                            background: star >= 4 ? '#f59e0b' : star === 3 ? '#6366f1' : '#374151',
                          }}
                        />
                      </div>
                      <span className="text-[11px] text-gray-700 w-3 shrink-0">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Main grid */}
            <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">

              {/* Left — review cards */}
              <div className="grid sm:grid-cols-2 gap-3">
                {reviews.map((r: any, i) => {
                  const badge = PLAN_BADGE[r.plan]
                  const grad = AVATAR_GRADS[i % AVATAR_GRADS.length]
                  return (
                    <div
                      key={r._id.toString()}
                      className="rounded-xl p-4 flex flex-col gap-2.5 border border-white/6 hover:border-indigo-500/25 transition-all duration-200 hover:-translate-y-px"
                      style={{ background: '#0f0c24' }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <Stars rating={r.rating} />
                        {badge && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${badge.cls}`}>
                            {badge.label}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed flex-1">
                        "{r.content}"
                      </p>
                      <div className="flex items-center gap-2.5 pt-2.5 border-t border-white/5">
                        <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${grad} flex items-center justify-center text-white text-[11px] font-bold shrink-0`}>
                          {r.userName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-200 truncate">{r.userName}</p>
                          <p className="text-[11px] text-gray-600">
                            {new Date(r.createdAt).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/70 shrink-0" />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Right — form panel */}
              <div className="lg:sticky lg:top-24">
                <div
                  className="rounded-xl border border-white/8 p-5 relative overflow-hidden"
                  style={{ background: 'linear-gradient(150deg, rgba(99,102,241,0.08), #0d0b1f 55%)' }}
                >
                  <div
                    className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-24 pointer-events-none opacity-50"
                    style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.35), transparent 70%)' }}
                  />

                  <div className="relative">
                    {hasReviewed ? (
                      /* Already reviewed */
                      <div className="text-center py-6">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                          <Sparkles className="w-5 h-5 text-emerald-400" />
                        </div>
                        <p className="font-bold text-white mb-1.5">Cảm ơn bạn! 🎉</p>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Đánh giá của bạn đang chờ duyệt và sẽ xuất hiện sớm.
                        </p>
                      </div>
                    ) : showForm ? (
                      <>
                        <h3 className="text-sm font-bold text-white mb-1">Chia sẻ trải nghiệm của bạn</h3>
                        <p className="text-xs text-gray-500 mb-5">
                          Đánh giá thực giúp cộng đồng và giúp TaoPage phát triển.
                        </p>
                        <ReviewForm hasReviewed={false} />
                      </>
                    ) : (
                      <>
                        <h3 className="text-sm font-bold text-white mb-1">Bạn đã dùng TaoPage chưa?</h3>
                        <p className="text-xs text-gray-500 mb-5">
                          Đăng nhập để chia sẻ trải nghiệm thực của bạn.
                        </p>
                        <Link
                          href="/login"
                          className="flex items-center justify-center gap-2 w-full py-3 text-white text-sm font-bold rounded-xl transition-all hover:opacity-90"
                          style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
                        >
                          <LogIn className="w-4 h-4" /> Đăng nhập để đánh giá
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </>
        )}

      </div>
    </section>
  )
}
