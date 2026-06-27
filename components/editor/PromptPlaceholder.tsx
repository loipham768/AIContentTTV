export default function PromptPlaceholder() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-t border-gray-200 bg-white">
      <textarea
        disabled
        placeholder="Enter prompt — will be available soon"
        className="flex-1 resize-none border border-gray-200 rounded px-3 py-2 text-sm text-gray-400 bg-gray-50 cursor-not-allowed opacity-50"
        rows={2}
      />
      <button
        disabled
        className="px-6 py-2 bg-gray-200 text-gray-400 rounded text-sm font-medium cursor-not-allowed opacity-50"
      >
        Generate
      </button>
    </div>
  )
}
