export default function EditorLoading() {
  return (
    <div className="h-screen bg-gray-950 flex flex-col">
      {/* Toolbar */}
      <div className="h-12 bg-gray-900 border-b border-gray-800 flex items-center gap-3 px-4 flex-shrink-0">
        <div className="h-6 w-28 bg-gray-700 animate-pulse rounded" />
        <div className="flex-1" />
        {[40, 56, 48, 64].map((w, i) => (
          <div key={i} className="h-7 bg-gray-700 animate-pulse rounded-lg" style={{ width: `${w}px` }} />
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <div className="w-56 bg-gray-900 border-r border-gray-800 p-3 space-y-2 flex-shrink-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-9 bg-gray-800 animate-pulse rounded-lg" />
          ))}
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-gray-800 flex items-center justify-center">
          <div className="w-full max-w-3xl h-[80%] bg-white/5 animate-pulse rounded-xl" />
        </div>

        {/* Right panel */}
        <div className="w-60 bg-gray-900 border-l border-gray-800 p-3 space-y-3 flex-shrink-0">
          <div className="h-5 w-24 bg-gray-700 animate-pulse rounded" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="h-3 w-16 bg-gray-700 animate-pulse rounded" />
              <div className="h-8 bg-gray-800 animate-pulse rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
