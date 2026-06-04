export default function ArticleLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="h-7 w-32 bg-gray-200 animate-pulse rounded-lg" />
          <div className="h-5 w-28 bg-gray-100 animate-pulse rounded-lg" />
        </div>
      </header>

      {/* Hero banner */}
      <div className="bg-gradient-to-br from-indigo-900 to-violet-900 py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="h-4 w-24 bg-white/20 animate-pulse rounded-full" />
          <div className="h-10 w-full bg-white/20 animate-pulse rounded-xl" />
          <div className="h-10 w-3/4 bg-white/20 animate-pulse rounded-xl" />
          <div className="h-4 w-2/3 bg-white/10 animate-pulse rounded-lg" />
          <div className="flex gap-4 pt-2">
            <div className="h-4 w-20 bg-white/10 animate-pulse rounded" />
            <div className="h-4 w-20 bg-white/10 animate-pulse rounded" />
          </div>
        </div>
      </div>

      {/* Article body */}
      <main className="max-w-3xl mx-auto px-4 py-12 space-y-4">
        {[100, 95, 88, 100, 70, 92, 85, 100, 60, 94, 80, 100].map((w, i) => (
          <div
            key={i}
            className={`h-4 bg-gray-200 animate-pulse rounded ${i % 5 === 4 ? 'mb-6' : ''}`}
            style={{ width: `${w}%` }}
          />
        ))}
        <div className="h-52 bg-gray-100 animate-pulse rounded-2xl my-8" />
        {[100, 88, 95, 72, 100, 84].map((w, i) => (
          <div key={i + 20} className="h-4 bg-gray-200 animate-pulse rounded" style={{ width: `${w}%` }} />
        ))}
      </main>
    </div>
  )
}
