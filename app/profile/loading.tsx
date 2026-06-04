export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="h-7 w-32 bg-gray-200 animate-pulse rounded-lg" />
          <div className="h-5 w-28 bg-gray-100 animate-pulse rounded-lg" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-lg" />

        {/* Avatar + info block */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-5 w-40 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-56 bg-gray-100 animate-pulse rounded" />
          </div>
          <div className="h-8 w-20 bg-gray-100 animate-pulse rounded-lg" />
        </div>

        {/* Plan card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="h-5 w-32 bg-gray-200 animate-pulse rounded" />
          <div className="flex items-center justify-between">
            <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-full" />
            <div className="h-4 w-32 bg-gray-100 animate-pulse rounded" />
          </div>
          <div className="h-2 w-full bg-gray-100 animate-pulse rounded-full" />
        </div>

        {/* Form fields */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div className="h-5 w-36 bg-gray-200 animate-pulse rounded" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="h-3.5 w-24 bg-gray-100 animate-pulse rounded" />
              <div className="h-10 w-full bg-gray-100 animate-pulse rounded-xl" />
            </div>
          ))}
          <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-xl mt-2" />
        </div>
      </main>
    </div>
  )
}
