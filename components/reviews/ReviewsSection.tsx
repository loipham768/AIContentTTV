import { Star, MessageSquare, LogIn } from 'lucide-react'
import Link from 'next/link'
import { dbConnect } from '@/lib/mongodb'
import Review from '@/models/Review'
import ReviewForm from './ReviewForm'

interface ReviewDoc {
  _id: string
  userName: string
  avatarUrl?: string
  plan: string
  rating: number
  content: string
  createdAt: string
}

interface Props {
  userId?: string
}

const PLAN_LABEL: Record<string, string> = {
  free: 'Free',
  designer: 'Designer',
  basic: 'Basic',
  pro: 'Pro',
}

function StarRow({ rating, size = 4 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-${size} h-${size}`}
          fill={s <= rating ? '#f59e0b' : 'none'}
          stroke={s <= rating ? '#f59e0b' : '#d1d5db'}
          strokeWidth={1.5}
        />
      ))}
    </span>
  )
}

export async function getReviewStats() {
  await dbConnect()
  const stats = await Review.aggregate([
    { $match: { isApproved: true } },
    { $group: { _id: null, avg: { $avg: '$rating' }, count: { $sum: 1 } } },
  ])
  const s = stats[0]
  return { avg: s ? +s.avg.toFixed(1) : 0, count: s?.count ?? 0 }
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
    userId
      ? Review.findOne({ userId }).lean()
      : Promise.resolve(null),
  ])

  const agg = stats[0] ?? { avg: 0, count: 0, dist: [] }
  const avgRating = agg.avg ? +agg.avg.toFixed(1) : 0
  const totalCount = agg.count ?? 0
  const dist = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: (agg.dist ?? []).filter((r: number) => r === s).length,
  }))

  return (
    <section className="py-12 md:py-20" style={{ background: '#fafaff' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Người dùng nói gì về AITaoPage?
          </h2>
          <p className="text-gray-500">Đánh giá thực từ người dùng đã trải nghiệm</p>
        </div>

        {/* Aggregate stats */}
        {totalCount > 0 && (
          <div className="flex flex-col sm:flex-row items-center gap-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 mb-8">
            {/* Big score */}
            <div className="text-center sm:text-left flex-shrink-0">
              <div className="text-6xl font-extrabold text-gray-900 leading-none mb-2">
                {avgRating}
              </div>
              <StarRow rating={Math.round(avgRating)} size={5} />
              <p className="text-sm text-gray-500 mt-2">{totalCount} đánh giá</p>
            </div>

            <div className="w-px h-24 bg-gray-100 hidden sm:block" />

            {/* Distribution bars */}
            <div className="flex-1 w-full space-y-1.5">
              {dist.map(({ star, count }) => {
                const pct = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-xs font-medium text-gray-500 w-6 text-right">{star}</span>
                    <Star className="w-3.5 h-3.5 text-amber-400" fill="#fbbf24" strokeWidth={0} />
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-8">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Reviews grid */}
        {reviews.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {reviews.map((r: any) => (
              <div
                key={r._id.toString()}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <StarRow rating={r.rating} />
                  {r.plan && r.plan !== 'free' && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                      {PLAN_LABEL[r.plan] ?? r.plan}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed flex-1">"{r.content}"</p>
                <div className="flex items-center gap-2 pt-1 border-t border-gray-50">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {r.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{r.userName}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(r.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400 mb-8">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
          </div>
        )}

        {/* Review form */}
        <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-6 sm:p-8 max-w-xl mx-auto">
          <h3 className="text-base font-extrabold text-gray-900 mb-1">
            Chia sẻ trải nghiệm của bạn
          </h3>
          <p className="text-sm text-gray-500 mb-5">
            Đánh giá của bạn giúp người dùng khác hiểu hơn về AITaoPage.
          </p>

          {userId ? (
            <ReviewForm hasReviewed={!!userReview} />
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <LogIn className="w-4 h-4" /> Đăng nhập để đánh giá
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
