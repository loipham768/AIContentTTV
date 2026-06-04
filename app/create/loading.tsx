export default function CreateLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="h-7 w-32 bg-gray-200 animate-pulse rounded-lg" />
          <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 space-y-8">
        {/* Title */}
        <div className="text-center space-y-3">
          <div className="h-9 w-64 mx-auto bg-gray-200 animate-pulse rounded-xl" />
          <div className="h-4 w-80 mx-auto bg-gray-100 animate-pulse rounded" />
        </div>

        {/* Content type tabs */}
        <div className="flex gap-3 justify-center flex-wrap">
          {[100, 110, 90, 120].map((w, i) => (
            <div key={i} className="h-10 bg-gray-200 animate-pulse rounded-xl" style={{ width: `${w}px` }} />
          ))}
        </div>

        {/* Prompt area */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="h-4 w-32 bg-gray-100 animate-pulse rounded" />
          <div className="h-32 bg-gray-100 animate-pulse rounded-xl" />
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 bg-gray-100 animate-pulse rounded" />
            <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-xl" />
          </div>
        </div>
      </main>
    </div>
  )
}
