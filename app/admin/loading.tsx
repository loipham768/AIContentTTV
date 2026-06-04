export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="h-7 w-32 bg-gray-200 animate-pulse rounded-lg" />
          <div className="h-5 w-20 bg-gray-100 animate-pulse rounded-lg" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-2 shadow-sm">
              <div className="h-3 w-20 bg-gray-100 animate-pulse rounded" />
              <div className="h-7 w-16 bg-gray-200 animate-pulse rounded-lg" />
            </div>
          ))}
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
          {[80, 96, 80].map((w, i) => (
            <div key={i} className="h-9 bg-gray-200 animate-pulse rounded-lg" style={{ width: `${w}px` }} />
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="px-6 py-3 border-b border-gray-100 flex items-center gap-3">
            <div className="h-5 w-28 bg-gray-200 animate-pulse rounded" />
            <div className="ml-auto h-8 w-48 bg-gray-100 animate-pulse rounded-lg" />
          </div>
          <div className="divide-y divide-gray-50">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="px-6 py-4 flex items-center gap-4">
                <div className="h-4 w-36 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-48 bg-gray-100 animate-pulse rounded" />
                <div className="h-4 w-24 bg-gray-100 animate-pulse rounded" />
                <div className="ml-auto flex gap-2">
                  <div className="h-7 w-16 bg-gray-100 animate-pulse rounded-lg" />
                  <div className="h-7 w-16 bg-gray-100 animate-pulse rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
