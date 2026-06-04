export default function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="h-7 w-32 bg-gray-200 animate-pulse rounded-lg" />
          <div className="h-5 w-28 bg-gray-100 animate-pulse rounded-lg" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left — order details + QR */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-0">
            <div className="h-5 w-36 bg-gray-200 animate-pulse rounded mb-4" />
            {[80, 60, 72, 56, 90].map((w, i) => (
              <div key={i} className="flex justify-between items-center py-2.5 border-b border-gray-50">
                <div className="h-3.5 bg-gray-100 animate-pulse rounded w-16" />
                <div className="h-3.5 bg-gray-200 animate-pulse rounded" style={{ width: `${w}px` }} />
              </div>
            ))}
            <div className="pt-6 mt-2 border-t border-gray-50 flex justify-center">
              <div className="w-[200px] h-[200px] bg-gray-100 animate-pulse rounded-2xl" />
            </div>
          </div>

          {/* Right — payment instructions */}
          <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-6 space-y-0">
            <div className="h-5 w-48 bg-gray-200 animate-pulse rounded mb-5" />
            {[120, 140, 160, 100, 80, 110].map((w, i) => (
              <div key={i} className="flex justify-between items-center py-2.5 border-b border-gray-50">
                <div className="h-3.5 bg-gray-100 animate-pulse rounded w-20" />
                <div className="h-3.5 bg-gray-200 animate-pulse rounded" style={{ width: `${w}px` }} />
              </div>
            ))}
            <div className="h-20 bg-amber-50 animate-pulse rounded-xl mt-5" />
            <div className="h-10 bg-gray-200 animate-pulse rounded-xl mt-4" />
          </div>
        </div>
      </main>
    </div>
  )
}
