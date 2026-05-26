'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, Loader2, AlertCircle, ArrowRight, RotateCcw, Send, Pencil } from 'lucide-react'
import Logo from '@/components/Logo'

// ─── Types ────────────────────────────────────────────────────────────────────

interface GeminiMessage {
  role: 'user' | 'model'
  parts: [{ text: string }]
}

interface DisplayPair {
  question: string
  answer: string
}

interface CurrentQuestion {
  question: string
  hint?: string
  options: string[]
}

type Phase = 'initial' | 'questioning' | 'generating' | 'done' | 'error'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SUGGESTIONS = [
  'Landing page bán sản phẩm skincare Việt Nam',
  'Trang giới thiệu dịch vụ thiết kế nội thất',
  'Landing page đăng ký khóa học lập trình',
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function CreatePageClient() {
  const router = useRouter()

  // Full message history sent to Gemini
  const [messages, setMessages] = useState<GeminiMessage[]>([])
  // Pairs of (question, answer) for display only
  const [history, setHistory] = useState<DisplayPair[]>([])
  // Current question card shown to user
  const [current, setCurrent] = useState<CurrentQuestion | null>(null)
  // Custom text input value
  const [custom, setCustom] = useState('')
  // Initial user request (for project naming)
  const [initialPrompt, setInitialPrompt] = useState('')

  const [phase, setPhase] = useState<Phase>('initial')
  const [errorMsg, setErrorMsg] = useState('')
  const [projectId, setProjectId] = useState<string | null>(null)
  const [longWait, setLongWait] = useState(false)
  const longWaitTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const bottomRef = useRef<HTMLDivElement>(null)
  const customInputRef = useRef<HTMLTextAreaElement>(null)
  const initialInputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history, current, phase])

  // ── Core: send a user answer to Gemini ──────────────────────────────────────

  async function sendAnswer(answerText: string, questionText: string) {
    const trimmed = answerText.trim()
    if (!trimmed) return

    // Add to display history
    setHistory(prev => [...prev, { question: questionText, answer: trimmed }])
    setCurrent(null)
    setCustom('')

    // Build updated message list for API
    const modelMsg: GeminiMessage = {
      role: 'model',
      parts: [{ text: questionText }],
    }
    const userMsg: GeminiMessage = {
      role: 'user',
      parts: [{ text: trimmed }],
    }
    const updatedMessages = [...messages, modelMsg, userMsg]
    setMessages(updatedMessages)

    setPhase('questioning')
    setErrorMsg('')

    await callGemini(updatedMessages)
  }

  // ── First message (initial request) ─────────────────────────────────────────

  async function sendInitial(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return

    setInitialPrompt(trimmed)
    setPhase('questioning')
    setErrorMsg('')

    const userMsg: GeminiMessage = { role: 'user', parts: [{ text: trimmed }] }
    const newMessages = [userMsg]
    setMessages(newMessages)

    await callGemini(newMessages)
  }

  // ── Call Gemini API ──────────────────────────────────────────────────────────

  async function callGemini(msgs: GeminiMessage[]) {
    // Show a friendly waiting message after 5 s (HTML generation is slow; questions are fast)
    setLongWait(false)
    longWaitTimer.current = setTimeout(() => setLongWait(true), 5000)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: msgs, initialPrompt }),
      })

      const data = await res.json()

      if (longWaitTimer.current) { clearTimeout(longWaitTimer.current); longWaitTimer.current = null }
      setLongWait(false)

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Đã xảy ra lỗi. Vui lòng thử lại.')
        setPhase('error')
        return
      }

      if (data.type === 'question') {
        setCurrent({
          question: data.question,
          hint: data.hint,
          options: data.options ?? [],
        })
        setPhase('questioning')
        setTimeout(() => customInputRef.current?.focus(), 150)
        return
      }

      if (data.type === 'html') {
        setProjectId(data.projectId ?? null)
        setPhase('done')
        return
      }

      setErrorMsg('Phản hồi không hợp lệ. Vui lòng thử lại.')
      setPhase('error')
    } catch {
      if (longWaitTimer.current) { clearTimeout(longWaitTimer.current); longWaitTimer.current = null }
      setLongWait(false)
      setErrorMsg('Không thể kết nối máy chủ. Vui lòng thử lại.')
      setPhase('error')
    }
  }

  // ── Handlers ────────────────────────────────────────────────────────────────

  function handleOptionClick(option: string) {
    if (!current) return
    sendAnswer(option, current.question)
  }

  function handleCustomSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!current || !custom.trim()) return
    sendAnswer(custom, current.question)
  }

  function handleCustomKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (current && custom.trim()) sendAnswer(custom, current.question)
    }
  }

  function handleInitialKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const val = (e.target as HTMLTextAreaElement).value
      if (val.trim()) sendInitial(val)
    }
  }

  function handleReset() {
    setMessages([])
    setHistory([])
    setCurrent(null)
    setCustom('')
    setInitialPrompt('')
    setProjectId(null)
    setPhase('initial')
    setErrorMsg('')
    setTimeout(() => initialInputRef.current?.focus(), 100)
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col">

      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 flex-shrink-0">
        <Logo iconSize={28} uid="create-logo" dark />
        <a href="/editor" className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
          <Pencil className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Mở trình soạn thảo trống</span>
        </a>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col max-w-2xl w-full mx-auto px-4 py-8 overflow-hidden">

        {/* ── Initial screen ── */}
        {phase === 'initial' && (
          <div className="flex flex-col items-center flex-1">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                Tạo trang web với AI
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
                Bạn muốn tạo trang gì?
              </h1>
              <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                Mô tả ngắn gọn. AI sẽ hỏi thêm từng bước để hiểu đúng nhu cầu rồi tạo trang hoàn chỉnh.
              </p>
            </div>

            {/* Input */}
            <div className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-4 mb-4">
              <textarea
                ref={initialInputRef}
                autoFocus
                placeholder="VD: Landing page bán sản phẩm skincare cho phụ nữ 25–35 tuổi..."
                rows={3}
                maxLength={500}
                onKeyDown={handleInitialKeyDown}
                className="w-full resize-none bg-transparent text-white text-sm placeholder:text-slate-500 focus:outline-none leading-relaxed"
              />
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                <span className="text-xs text-slate-500">Enter để gửi · Shift+Enter xuống dòng</span>
                <button
                  onClick={() => {
                    const el = initialInputRef.current
                    if (el?.value.trim()) sendInitial(el.value)
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all"
                >
                  <Send className="w-3 h-3" />
                  Bắt đầu
                </button>
              </div>
            </div>

            {/* Suggestions */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendInitial(s)}
                  className="text-left px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10 transition-all text-xs text-slate-400 hover:text-slate-300"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Conversation + current question ── */}
        {phase !== 'initial' && (
          <div className="flex flex-col flex-1 overflow-hidden">

            {/* Initial request bubble */}
            {initialPrompt && (
              <div className="flex justify-end mb-4 flex-shrink-0">
                <div className="max-w-[80%] bg-indigo-600 text-white text-sm rounded-2xl rounded-br-sm px-4 py-2.5 leading-relaxed">
                  {initialPrompt}
                </div>
              </div>
            )}

            {/* Q&A history */}
            <div className="flex-1 overflow-y-auto space-y-5 mb-4 pr-1">
              {history.map((pair, i) => (
                <div key={i} className="space-y-2">
                  {/* AI question */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-white/[0.06] border border-white/10 text-slate-200 text-sm rounded-2xl rounded-tl-sm px-4 py-2.5 leading-relaxed max-w-[85%]">
                      {pair.question}
                    </div>
                  </div>
                  {/* User answer */}
                  <div className="flex justify-end">
                    <div className="max-w-[75%] bg-indigo-600 text-white text-sm rounded-2xl rounded-br-sm px-4 py-2.5 leading-relaxed">
                      {pair.answer}
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {(phase === 'questioning' && !current) || phase === 'generating' ? (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-white/[0.06] border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:300ms]" />
                    </div>
                    {longWait && (
                      <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                        Bạn đợi xíu nha, nội dung của bạn đang được tạo...
                      </p>
                    )}
                  </div>
                </div>
              ) : null}

              {/* Done state */}
              {phase === 'done' && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm rounded-2xl rounded-tl-sm px-4 py-2.5">
                      Trang web đã được tạo xong! Mở trình soạn thảo để chỉnh sửa từng phần.
                    </div>
                  </div>
                  <button
                    onClick={() => router.push(projectId ? `/editor?project=${projectId}` : '/editor')}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]"
                  >
                    Mở trình soạn thảo
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 text-sm transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Tạo trang mới
                  </button>
                </div>
              )}

              {/* Error state */}
              {phase === 'error' && (
                <div className="space-y-3">
                  <div className="flex items-start gap-2 px-3 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                  <button
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 text-sm transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Bắt đầu lại
                  </button>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* ── Current question card ── */}
            {current && phase === 'questioning' && (
              <div className="flex-shrink-0 space-y-3">
                {/* Question */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium leading-relaxed">{current.question}</p>
                    {current.hint && (
                      <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{current.hint}</p>
                    )}
                  </div>
                </div>

                {/* Option buttons */}
                {current.options.length > 0 && (
                  <div className="flex flex-wrap gap-2 pl-9">
                    {current.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(opt)}
                        className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-indigo-600 hover:border-indigo-500 text-slate-200 hover:text-white text-sm transition-all active:scale-[0.97]"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Custom input */}
                <form onSubmit={handleCustomSubmit} className="flex items-end gap-2 pl-9">
                  <textarea
                    ref={customInputRef}
                    value={custom}
                    onChange={e => setCustom(e.target.value)}
                    onKeyDown={handleCustomKeyDown}
                    placeholder={current.options.length > 0 ? 'Hoặc nhập câu trả lời của bạn...' : 'Nhập câu trả lời...'}
                    rows={1}
                    maxLength={300}
                    className="flex-1 resize-none bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!custom.trim()}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex-shrink-0"
                  >
                    <Send className="w-3.5 h-3.5 text-white" />
                  </button>
                </form>
              </div>
            )}

          </div>
        )}

      </main>
    </div>
  )
}
