export default function KienThucLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="h-7 w-32 bg-gray-200 animate-pulse rounded-lg" />
          <div className="h-8 w-24 bg-gray-100 animate-pulse rounded-lg" />
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-900 to-violet-900 py-14 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="h-10 w-2/3 mx-auto bg-white/10 animate-pulse rounded-xl" />
          <div className="h-5 w-1/2 mx-auto bg-white/10 animate-pulse rounded-lg" />
          <div className="h-10 w-64 mx-auto bg-white/10 animate-pulse rounded-full mt-4" />
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-6">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {[70, 80, 90, 75, 85, 65, 95].map((w, i) => (
            <div key={i} className="h-8 bg-gray-200 animate-pulse rounded-full" style={{ width: `${w}px` }} />
          ))}
        </div>

        {/* Article cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="h-40 bg-gray-200 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-20 bg-gray-100 animate-pulse rounded-full" />
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-4/5 bg-gray-200 animate-pulse rounded" />
                <div className="h-3 w-2/3 bg-gray-100 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
