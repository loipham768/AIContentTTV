"use client";

import { useState } from "react";
import { Star, Send, Sparkles, Loader2 } from "lucide-react";

interface Props {
  hasReviewed: boolean;
}

const LABELS = ["", "Tệ", "Chưa tốt", "Bình thường", "Tốt", "Xuất sắc! ✨"];

export default function ReviewForm({ hasReviewed }: Props) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  if (hasReviewed) return null;

  if (status === "done") {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-6 h-6 text-emerald-400" />
        </div>
        <p className="font-bold text-white mb-2">Cảm ơn bạn rất nhiều! 🎉</p>
        <p className="text-sm text-gray-500">
          Đánh giá của bạn đang chờ duyệt và sẽ hiển thị sớm.
        </p>
      </div>
    );
  }

  async function submit() {
    if (rating === 0) {
      setError("Vui lòng chọn số sao");
      return;
    }
    if (content.trim().length < 10) {
      setError("Tối thiểu 10 ký tự");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, content: content.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Có lỗi xảy ra");
        setStatus("idle");
        return;
      }
      setStatus("done");
    } catch {
      setError("Không thể kết nối, thử lại sau");
      setStatus("idle");
    }
  }

  const active = hovered || rating;

  return (
    <div className="space-y-5">
      {/* Star picker */}
      <div>
        <p className="text-[11px] font-semibold text-gray-500 mb-2.5 uppercase tracking-widest">
          Số sao của bạn
        </p>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setRating(s)}
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered(0)}
              className="transition-transform hover:scale-110 active:scale-95"
              aria-label={`${s} sao`}
            >
              <Star
                className="w-8 h-8 transition-colors"
                fill={s <= active ? "#f59e0b" : "none"}
                stroke={s <= active ? "#f59e0b" : "#374151"}
                strokeWidth={1.5}
              />
            </button>
          ))}
          {active > 0 && (
            <span className="ml-2 text-sm font-bold text-amber-400">
              {LABELS[active]}
            </span>
          )}
        </div>
      </div>

      {/* Textarea */}
      <div>
        <p className="text-[11px] font-semibold text-gray-500 mb-2.5 uppercase tracking-widest">
          Nhận xét của bạn
        </p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="AITaoPage giúp ích gì cho công việc của bạn? (tối thiểu 10 ký tự)"
          rows={4}
          maxLength={500}
          className="w-full text-sm px-4 py-3 rounded-xl border border-white/8 bg-white/4 text-gray-200 placeholder:text-gray-600 focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10 outline-none resize-none transition-all"
          style={{ background: "rgba(255,255,255,0.04)" }}
        />
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-xs text-gray-700">{content.length}/500</span>
          {error && (
            <span className="text-xs text-red-400 font-medium">{error}</span>
          )}
        </div>
      </div>

      <button
        onClick={submit}
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 py-3.5 text-white text-sm font-bold rounded-xl disabled:opacity-50 transition-all"
        style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Đang gửi...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" /> Gửi đánh giá
          </>
        )}
      </button>
    </div>
  );
}
