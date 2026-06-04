export default function TemplatesLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="h-7 w-32 bg-gray-200 animate-pulse rounded-lg" />
          <div className="h-8 w-24 bg-gray-100 animate-pulse rounded-lg" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Title + filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-lg" />
          <div className="flex gap-2">
            {[60, 80, 70, 90, 65].map((w, i) => (
              <div key={i} className="h-8 bg-gray-200 animate-pulse rounded-full" style={{ width: `${w}px` }} />
            ))}
          </div>
        </div>

        {/* Template grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="h-44 bg-gray-200 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
                <div className="h-3 w-1/2 bg-gray-100 animate-pulse rounded" />
                <div className="h-8 w-full bg-gray-100 animate-pulse rounded-lg mt-3" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
