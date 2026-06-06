"use client";
import { useState } from "react";
import { X, MessageSquarePlus, Send, CheckCircle2 } from "lucide-react";

const CATEGORIES = [
  { value: "feature", label: "Tính năng mới" },
  { value: "improvement", label: "Cải thiện hiện có" },
  { value: "bug", label: "Báo lỗi" },
  { value: "other", label: "Khác" },
] as const;

type Category = (typeof CATEGORIES)[number]["value"];

interface Props {
  trigger?: React.ReactNode;
}

export default function FeedbackModal({ trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<Category>("improvement");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function reset() {
    setCategory("improvement");
    setTitle("");
    setContent("");
    setError("");
    setDone(false);
  }

  function handleClose() {
    setOpen(false);
    setTimeout(reset, 300);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, title, content }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Có lỗi xảy ra, vui lòng thử lại.");
        return;
      }
      setDone(true);
    } catch {
      setError("Không thể kết nối, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {trigger ?? (
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors">
            <MessageSquarePlus className="w-4 h-4" />
            Góp ý cải thiện
          </button>
        )}
      </span>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <MessageSquarePlus className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 text-sm leading-tight">
                    Góp ý cải thiện hệ thống
                  </h2>
                  <p className="text-xs text-gray-400 leading-tight mt-0.5">
                    Ý kiến của bạn giúp chúng tôi phát triển tốt hơn
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {done ? (
                <div className="py-8 flex flex-col items-center gap-3 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Cảm ơn bạn đã góp ý!
                  </h3>
                  <p className="text-sm text-gray-500 max-w-xs">
                    Chúng tôi sẽ xem xét và cân nhắc cải thiện hệ thống dựa trên phản hồi của bạn.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-2 px-5 py-2 text-sm font-medium rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                  >
                    Đóng
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Category */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Loại góp ý
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {CATEGORIES.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => setCategory(c.value)}
                          className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all text-left ${
                            category === c.value
                              ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Tiêu đề <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Tóm tắt góp ý của bạn…"
                      maxLength={100}
                      required
                      className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Mô tả chi tiết <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Mô tả rõ vấn đề hoặc tính năng bạn mong muốn…"
                      maxLength={2000}
                      required
                      rows={4}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                    />
                    <p className="text-right text-xs text-gray-400 mt-1">
                      {content.length}/2000
                    </p>
                  </div>

                  {error && (
                    <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                      {error}
                    </p>
                  )}

                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 py-2.5 text-sm font-medium rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-2.5 text-sm font-medium rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      {loading ? "Đang gửi…" : "Gửi góp ý"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
