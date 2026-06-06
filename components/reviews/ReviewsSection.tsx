import { Star, LogIn, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { dbConnect } from '@/lib/mongodb'
import Review from '@/models/Review'
import ReviewForm from './ReviewForm'

interface Props {
  userId?: string
}

const PLAN_BADGE: Record<string, { label: string; cls: string }> = {
  designer: { label: 'Designer', cls: 'bg-violet-500/20 text-violet-300' },
  basic:    { label: 'Basic',    cls: 'bg-indigo-500/20 text-indigo-300' },
  pro:      { label: 'Pro',      cls: 'bg-amber-500/20  text-amber-300'  },
}

function Stars({ rating, size = 4 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-${size} h-${size}`}
          fill={s <= rating ? '#f59e0b' : 'none'}
          stroke={s <= rating ? '#f59e0b' : '#4b5563'}
          strokeWidth={1.5}
        />
      ))}
    </span>
  )
}

export async function getReviewStats() {
  await dbConnect()
  const [stats, recent] = await Promise.all([
    Review.aggregate([
      { $match: { isApproved: true } },
      { $group: { _id: null, avg: { $avg: '$rating' }, count: { $sum: 1 } } },
    ]),
    Review.find({ isApproved: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean() as Promise<any[]>,
  ])
  const s = stats[0]
  return { avg: s ? +s.avg.toFixed(1) : 0, count: s?.count ?? 0, recent }
}

export default async function ReviewsSection({ userId }: Props) {
  await dbConnect()

  const [reviews, stats, userReview] = await Promise.all([
    Review.find({ isApproved: true }).sort({ createdAt: -1 }).limit(6).lean() as Promise<any[]>,
    Review.aggregate([
      { $match: { isApproved: true } },
      {
        $group: {
          _id: null,
          avg: { $avg: '$rating' },
          count: { $sum: 1 },
          dist: { $push: '$rating' },
        },
      },
    ]),
    userId ? Review.findOne({ userId }).lean() : Promise.resolve(null),
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
    <section style={{ background: '#0d0b1f' }} className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs font-semibold text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20">
            <Star className="w-3.5 h-3.5" fill="#f59e0b" strokeWidth={0} /> Đánh giá từ người dùng thực
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Người dùng nói gì về AITaoPage?
          </h2>
          {totalCount > 0 && (
            <div className="flex items-center justify-center gap-2 mt-3">
              <Stars rating={Math.round(avgRating)} size={5} />
              <span className="text-2xl font-extrabold text-white">{avgRating}</span>
              <span className="text-gray-400 text-sm">/ 5 · {totalCount} đánh giá</span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">

          {/* Left — reviews grid */}
          <div>
            {reviews.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {reviews.map((r: any) => {
                  const badge = PLAN_BADGE[r.plan]
                  return (
                    <div
                      key={r._id.toString()}
                      className="rounded-2xl border border-white/8 p-5 flex flex-col gap-3"
                      style={{ background: 'rgba(255,255,255,0.04)' }}
                    >
                      <div className="flex items-center justify-between">
                        <Stars rating={r.rating} />
                        {badge && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badge.cls}`}>
                            {badge.label}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed flex-1">
                        "{r.content}"
                      </p>
                      <div className="flex items-center gap-2.5 pt-2 border-t border-white/6">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {r.userName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-200">{r.userName}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(r.createdAt).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-gray-600">
                <MessageSquare className="w-10 h-10 mb-3 opacity-30" />
                <p className="text-sm">Chưa có đánh giá. Hãy là người đầu tiên!</p>
              </div>
            )}

            {/* Distribution mini bar */}
            {totalCount > 0 && (
              <div className="mt-6 p-4 rounded-2xl border border-white/8 space-y-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
                {dist.map(({ star, count }) => {
                  const pct = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 w-3 text-right">{star}</span>
                      <Star className="w-3 h-3 flex-shrink-0" fill="#f59e0b" stroke="none" />
                      <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-gray-600 w-5">{count}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Right — form panel */}
          <div
            className="rounded-2xl border border-white/10 p-6"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <h3 className="text-base font-extrabold text-white mb-1">
              {hasReviewed ? 'Cảm ơn bạn đã đánh giá!' : 'Chia sẻ trải nghiệm của bạn'}
            </h3>
            <p className="text-sm text-gray-400 mb-5">
              {hasReviewed
                ? 'Đánh giá của bạn đang chờ duyệt và sẽ xuất hiện sớm.'
                : 'Đánh giá thực giúp cộng đồng và giúp AITaoPage phát triển tốt hơn.'}
            </p>

            {showForm ? (
              <ReviewForm hasReviewed={hasReviewed} />
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-500 transition-colors"
              >
                <LogIn className="w-4 h-4" /> Đăng nhập để đánh giá
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
