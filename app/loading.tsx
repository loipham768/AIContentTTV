export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navbar */}
      <div className="h-16 bg-white border-b border-gray-100 flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between">
          <div className="h-7 w-36 bg-gray-200 animate-pulse rounded-lg" />
          <div className="hidden md:flex items-center gap-3">
            {[56, 72, 56].map((w, i) => (
              <div key={i} className="h-5 bg-gray-100 animate-pulse rounded-lg" style={{ width: `${w}px` }} />
            ))}
            <div className="h-8 w-28 bg-gray-200 animate-pulse rounded-lg ml-2" />
          </div>
          <div className="md:hidden h-8 w-8 bg-gray-200 animate-pulse rounded-lg" />
        </div>
      </div>

      {/* Hero */}
      <section
        className="relative py-20 sm:py-28"
        style={{ background: 'linear-gradient(135deg, #ddd6fe 0%, #faf5ff 45%, #e0e7ff 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-14">
            {/* Left text block */}
            <div className="flex-1 flex flex-col items-center lg:items-start gap-5 w-full">
              <div className="h-7 w-56 bg-indigo-200/60 animate-pulse rounded-full" />
              <div className="space-y-3 w-full max-w-lg">
                <div className="h-10 bg-indigo-200/50 animate-pulse rounded-xl w-full" />
                <div className="h-10 bg-indigo-200/50 animate-pulse rounded-xl w-4/5" />
                <div className="h-10 bg-indigo-200/50 animate-pulse rounded-xl w-3/5" />
              </div>
              <div className="h-5 w-80 bg-indigo-100/60 animate-pulse rounded-lg" />
              <div className="flex gap-3 mt-2">
                <div className="h-12 w-40 bg-indigo-300/50 animate-pulse rounded-xl" />
                <div className="h-12 w-36 bg-white/60 animate-pulse rounded-xl" />
              </div>
            </div>

            {/* Right mockup */}
            <div className="flex-1 w-full max-w-lg">
              <div className="h-80 bg-white/40 animate-pulse rounded-2xl shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-7 w-64 bg-gray-200 animate-pulse rounded-xl mx-auto mb-10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-gray-50 p-5 space-y-3">
                <div className="w-9 h-9 rounded-xl bg-gray-200 animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
                <div className="h-3 w-full bg-gray-100 animate-pulse rounded" />
                <div className="h-3 w-5/6 bg-gray-100 animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
