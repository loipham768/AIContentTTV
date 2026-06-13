"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  Plus, Pencil, Trash2, X, Save, Loader2, Search,
  LayoutTemplate, BookOpen, ChevronLeft, ChevronRight, Eye,
  AlertTriangle, CheckCircle2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ContentTab = "templates" | "articles";

interface TemplateMeta {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  accentColor: string;
  order: number;
}

interface TemplateForm {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string;        // comma-sep
  gradient: string;
  accentColor: string;
  html: string;
}

interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: string;
  keywords: string[];
  image?: string;
}

interface ArticleForm {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: string;
  keywords: string;    // comma-sep
  image: string;
  content: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TEMPLATE_CATEGORIES = [
  { value: "landing", label: "Landing Page" },
  { value: "article", label: "Bài viết" },
  { value: "ads",     label: "Quảng cáo" },
];

const ARTICLE_CATEGORIES = [
  "Hướng dẫn", "Landing Page", "So sánh", "Quảng cáo",
  "Kỹ thuật", "Content", "SEO",
];

const GRADIENT_PRESETS = [
  "from-indigo-500 to-violet-600",
  "from-blue-500 to-indigo-600",
  "from-teal-500 to-cyan-600",
  "from-green-500 to-emerald-600",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-600",
  "from-slate-700 to-gray-900",
  "from-purple-500 to-violet-700",
];

const PAGE_SIZE = 20;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

const EMPTY_TEMPLATE: TemplateForm = {
  id: "", name: "", category: "landing", description: "",
  tags: "", gradient: "from-indigo-500 to-violet-600",
  accentColor: "#6366f1", html: "",
};

const EMPTY_ARTICLE: ArticleForm = {
  slug: "", title: "", description: "", category: "Hướng dẫn",
  readTime: "5 phút đọc", publishedDate: new Date().toISOString().slice(0, 10),
  author: "AITaoPage", keywords: "", image: "", content: "",
};

// ─── Toast ───────────────────────────────────────────────────────────────────

function Toast({ msg, type, onClose }: { msg: string; type: "ok" | "err"; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={`fixed bottom-6 right-6 z-[200] flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-sm font-semibold text-white max-w-xs ${
        type === "ok" ? "bg-emerald-600" : "bg-red-600"
      }`}
    >
      {type === "ok" ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertTriangle className="w-4 h-4 flex-shrink-0" />}
      <span>{msg}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X className="w-3.5 h-3.5" /></button>
    </div>
  );
}

// ─── Field components ────────────────────────────────────────────────────────

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white";
const textareaCls = `${inputCls} resize-y font-mono leading-relaxed`;

// ─── Confirm modal ────────────────────────────────────────────────────────────

function ConfirmDelete({ name, onConfirm, onCancel }: { name: string; onConfirm: () => Promise<void>; onCancel: () => void }) {
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    try { await onConfirm(); } finally { setLoading(false); }
  }

  return (
    <div className="fixed inset-0 z-[150] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
            <Trash2 className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">Xoá mục này?</p>
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{name}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-5">Hành động này không thể hoàn tác.</p>
        <div className="flex gap-2">
          <button onClick={onCancel} disabled={loading} className="flex-1 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50">Huỷ</button>
          <button onClick={handleConfirm} disabled={loading} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            {loading ? "Đang xoá…" : "Xoá"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Template Form Panel ─────────────────────────────────────────────────────

function TemplateFormPanel({
  initial,
  isEdit,
  onSave,
  onClose,
}: {
  initial: TemplateForm;
  isEdit: boolean;
  onSave: (f: TemplateForm) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState<TemplateForm>(initial);
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  function set(k: keyof TemplateForm, v: string) {
    setForm((f) => {
      const next = { ...f, [k]: v };
      // Auto-gen id from name if not editing
      if (!isEdit && k === "name") {
        const prefix = next.category === "landing" ? "lp-" : next.category === "article" ? "article-" : "ads-";
        next.id = prefix + slugify(v.replace(/^(Landing Page|Bài Viết|Bài viết|Quảng Cáo|Quảng cáo)\s*/i, ""));
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-black/50 flex items-start justify-end">
        <div className="h-full w-full max-w-2xl bg-white shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
              <LayoutTemplate className="w-4 h-4 text-indigo-600" />
            </div>
            <h2 className="font-bold text-gray-900 flex-1">
              {isEdit ? "Sửa mẫu" : "Thêm mẫu mới"}
            </h2>
            {form.html && (
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100"
              >
                <Eye className="w-3.5 h-3.5" /> Xem trước
              </button>
            )}
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Tên mẫu" required>
                <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Landing Page Skincare..." required />
              </Field>
              <Field label="Danh mục" required>
                <select className={inputCls} value={form.category} onChange={(e) => set("category", e.target.value)}>
                  {TEMPLATE_CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="ID (slug)" required>
              <input className={inputCls} value={form.id} onChange={(e) => set("id", e.target.value)} placeholder="lp-skincare" required />
              <p className="text-[11px] text-gray-400 mt-1">Chỉ dùng chữ thường, số và dấu gạch ngang. Tự động sinh từ tên.</p>
            </Field>

            <Field label="Mô tả">
              <textarea className={textareaCls} rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Trang landing page cho thương hiệu skincare..." />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Tags (cách nhau bởi dấu phẩy)">
                <input className={inputCls} value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="Skincare, Beauty, E-commerce" />
              </Field>
              <Field label="Màu nhấn (accentColor)">
                <div className="flex gap-2 items-center">
                  <input type="color" value={form.accentColor} onChange={(e) => set("accentColor", e.target.value)} className="w-10 h-9 rounded-lg border border-gray-200 p-0.5 cursor-pointer" />
                  <input className={`${inputCls} flex-1`} value={form.accentColor} onChange={(e) => set("accentColor", e.target.value)} placeholder="#6366f1" />
                </div>
              </Field>
            </div>

            <Field label="Gradient (Tailwind classes)">
              <input className={inputCls} value={form.gradient} onChange={(e) => set("gradient", e.target.value)} placeholder="from-indigo-500 to-violet-600" />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {GRADIENT_PRESETS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => set("gradient", g)}
                    className={`h-6 w-20 rounded-md bg-gradient-to-br ${g} text-[10px] font-bold text-white flex-shrink-0 ring-2 transition-all ${form.gradient === g ? "ring-indigo-500" : "ring-transparent"}`}
                  />
                ))}
              </div>
            </Field>

            <Field label="HTML" required>
              <textarea
                className={`${textareaCls} text-xs`}
                rows={18}
                value={form.html}
                onChange={(e) => set("html", e.target.value)}
                placeholder="<!DOCTYPE html>&#10;<html lang=&quot;vi&quot;>&#10;..."
                required
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Paste HTML do AI generate. {form.html.length > 0 && `${(form.html.length / 1024).toFixed(1)} KB`}
              </p>
            </Field>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-100 flex-shrink-0 bg-gray-50">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50">Huỷ</button>
            <button
              type="submit"
              form=""
              onClick={handleSubmit as any}
              disabled={saving || !form.id || !form.name || !form.html}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isEdit ? "Lưu thay đổi" : "Tạo mẫu"}
            </button>
          </div>
        </div>
      </div>

      {/* Preview */}
      {previewOpen && (
        <div className="fixed inset-0 z-[110] bg-black/80 flex flex-col" onClick={() => setPreviewOpen(false)}>
          <div className="flex-shrink-0 h-11 bg-slate-900 flex items-center px-4 gap-3" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPreviewOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
            <span className="text-white text-sm font-semibold">{form.name} — Xem trước</span>
          </div>
          <div className="flex-1 min-h-0" onClick={(e) => e.stopPropagation()}>
            <iframe srcDoc={form.html} className="w-full h-full border-0" sandbox="allow-same-origin" title="preview" />
          </div>
        </div>
      )}
    </>
  );
}

// ─── Article Form Panel ───────────────────────────────────────────────────────

function ArticleFormPanel({
  initial,
  isEdit,
  onSave,
  onClose,
}: {
  initial: ArticleForm;
  isEdit: boolean;
  onSave: (f: ArticleForm) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ArticleForm>(initial);
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  function set(k: keyof ArticleForm, v: string) {
    setForm((f) => {
      const next = { ...f, [k]: v };
      if (!isEdit && k === "title") {
        next.slug = slugify(v);
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try { await onSave(form); }
    finally { setSaving(false); }
  }

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-black/50 flex items-start justify-end">
        <div className="h-full w-full max-w-2xl bg-white shadow-2xl flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-teal-600" />
            </div>
            <h2 className="font-bold text-gray-900 flex-1">{isEdit ? "Sửa bài viết" : "Thêm bài viết mới"}</h2>
            {form.content && (
              <button type="button" onClick={() => setPreviewOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 rounded-lg hover:bg-teal-100">
                <Eye className="w-3.5 h-3.5" /> Xem trước
              </button>
            )}
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X className="w-4 h-4 text-gray-500" /></button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            <Field label="Tiêu đề" required>
              <input className={inputCls} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Hướng dẫn tạo landing page với AI..." required />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Slug (URL)" required>
                <input className={inputCls} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="huong-dan-tao-landing-page" required />
                <p className="text-[11px] text-gray-400 mt-1">Tự động sinh từ tiêu đề.</p>
              </Field>
              <Field label="Danh mục" required>
                <select className={inputCls} value={form.category} onChange={(e) => set("category", e.target.value)}>
                  {ARTICLE_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Mô tả (meta)">
              <textarea className={textareaCls} rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Hướng dẫn chi tiết từng bước..." />
            </Field>

            <div className="grid grid-cols-3 gap-4">
              <Field label="Thời gian đọc">
                <input className={inputCls} value={form.readTime} onChange={(e) => set("readTime", e.target.value)} placeholder="5 phút đọc" />
              </Field>
              <Field label="Ngày đăng">
                <input type="date" className={inputCls} value={form.publishedDate} onChange={(e) => set("publishedDate", e.target.value)} />
              </Field>
              <Field label="Tác giả">
                <input className={inputCls} value={form.author} onChange={(e) => set("author", e.target.value)} placeholder="AITaoPage" />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Keywords (cách bởi dấu phẩy)">
                <input className={inputCls} value={form.keywords} onChange={(e) => set("keywords", e.target.value)} placeholder="landing page, ai content..." />
              </Field>
              <Field label="Ảnh bìa (URL, tuỳ chọn)">
                <input className={inputCls} value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://..." />
              </Field>
            </div>

            <Field label="Nội dung HTML" required>
              <textarea
                className={`${textareaCls} text-xs`}
                rows={20}
                value={form.content}
                onChange={(e) => set("content", e.target.value)}
                placeholder="<article>&#10;  <h1>...</h1>&#10;  <p>...</p>&#10;</article>"
                required
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Paste HTML bài viết. {form.content.length > 0 && `${(form.content.length / 1024).toFixed(1)} KB`}
              </p>
            </Field>
          </form>

          <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-100 flex-shrink-0 bg-gray-50">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50">Huỷ</button>
            <button
              onClick={handleSubmit as any}
              disabled={saving || !form.slug || !form.title || !form.content}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isEdit ? "Lưu thay đổi" : "Đăng bài"}
            </button>
          </div>
        </div>
      </div>

      {previewOpen && (
        <div className="fixed inset-0 z-[110] bg-black/80 flex flex-col" onClick={() => setPreviewOpen(false)}>
          <div className="flex-shrink-0 h-11 bg-slate-900 flex items-center px-4 gap-3" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPreviewOpen(false)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
            <span className="text-white text-sm font-semibold">{form.title} — Xem trước</span>
          </div>
          <div className="flex-1 min-h-0" onClick={(e) => e.stopPropagation()}>
            <iframe srcDoc={form.content} className="w-full h-full border-0" sandbox="allow-same-origin" title="preview" />
          </div>
        </div>
      )}
    </>
  );
}

// ─── Templates Tab ────────────────────────────────────────────────────────────

function TemplatesTab() {
  const [items, setItems] = useState<TemplateMeta[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [catFilter, setCatFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editForm, setEditForm] = useState<TemplateForm | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  async function load(p = page, cat = catFilter) {
    setLoading(true);
    const qs = new URLSearchParams({ page: String(p), limit: String(PAGE_SIZE) });
    if (cat) qs.set("category", cat);
    const res = await fetch(`/api/admin/templates?${qs}`);
    const data = await res.json();
    setItems(data.templates ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  }

  useEffect(() => { load(1, catFilter); }, [catFilter]);

  async function openEdit(id: string) {
    setEditingId(id);
    try {
      const res = await fetch(`/api/admin/templates/${id}`);
      const doc = await res.json();
      setEditForm({
        id: doc.id,
        name: doc.name,
        category: doc.category,
        description: doc.description ?? "",
        tags: (doc.tags ?? []).join(", "),
        gradient: doc.gradient ?? "",
        accentColor: doc.accentColor ?? "#6366f1",
        html: doc.html ?? "",
      });
      setFormOpen(true);
    } finally {
      setEditingId(null);
    }
  }

  async function handleSave(form: TemplateForm) {
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    const isEdit = !!editForm;
    const res = isEdit
      ? await fetch(`/api/admin/templates/${form.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      : await fetch("/api/admin/templates", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });

    if (!res.ok) {
      const err = await res.json();
      setToast({ msg: err.error ?? "Lỗi lưu", type: "err" });
      return;
    }
    setToast({ msg: isEdit ? "Đã cập nhật mẫu" : "Đã tạo mẫu mới", type: "ok" });
    setFormOpen(false);
    setEditForm(null);
    load(page);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const res = await fetch(`/api/admin/templates/${deleteTarget.id}`, { method: "DELETE" });
    setDeleteTarget(null);
    if (!res.ok) { setToast({ msg: "Xoá thất bại", type: "err" }); return; }
    setToast({ msg: "Đã xoá mẫu", type: "ok" });
    load(page);
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-4">
        <select
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={catFilter}
          onChange={(e) => { setCatFilter(e.target.value); setPage(1); }}
        >
          <option value="">Tất cả danh mục</option>
          {TEMPLATE_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
        <span className="text-xs text-gray-400 flex-1">{total} mẫu</span>
        <button
          onClick={() => { setEditForm(null); setFormOpen(true); }}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4" /> Thêm mẫu
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Mẫu</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Danh mục</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide hidden md:table-cell">Tags</th>
              <th className="px-4 py-3 w-24" />
            </tr>
          </thead>
          <tbody className={`divide-y divide-gray-100 ${loading ? "opacity-50" : ""}`}>
            {items.length === 0 && !loading && (
              <tr><td colSpan={4} className="text-center py-12 text-gray-400 text-sm">Chưa có mẫu nào. Thêm mẫu đầu tiên!</td></tr>
            )}
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.gradient || "from-indigo-500 to-violet-600"} flex-shrink-0`}
                      style={{ boxShadow: `0 2px 8px ${item.accentColor}40` }}
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                      <p className="text-xs text-gray-400 truncate">{item.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                    {TEMPLATE_CATEGORIES.find((c) => c.value === item.category)?.label ?? item.category}
                  </span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {(item.tags ?? []).slice(0, 3).map((t) => (
                      <span key={t} className="text-[11px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    <button onClick={() => openEdit(item.id)} disabled={editingId === item.id} className="p-1.5 rounded-lg hover:bg-indigo-50 text-gray-400 hover:text-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      {editingId === item.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Pencil className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => setDeleteTarget({ id: item.id, name: item.name })} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50">
            <span className="text-xs text-gray-500">{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} / {total}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => { setPage(page - 1); load(page - 1); }} disabled={page === 1} className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-30"><ChevronLeft className="w-4 h-4" /></button>
              <span className="text-xs font-semibold px-2">{page} / {totalPages}</span>
              <button onClick={() => { setPage(page + 1); load(page + 1); }} disabled={page >= totalPages} className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-30"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}
      </div>

      {formOpen && (
        <TemplateFormPanel
          initial={editForm ?? EMPTY_TEMPLATE}
          isEdit={!!editForm}
          onSave={handleSave}
          onClose={() => { setFormOpen(false); setEditForm(null); }}
        />
      )}
      {deleteTarget && (
        <ConfirmDelete name={deleteTarget.name} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

// ─── Articles Tab ─────────────────────────────────────────────────────────────

function ArticlesTab() {
  const [items, setItems] = useState<ArticleMeta[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [catFilter, setCatFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editForm, setEditForm] = useState<ArticleForm | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ slug: string; name: string } | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  async function load(p = page, cat = catFilter) {
    setLoading(true);
    const qs = new URLSearchParams({ page: String(p), limit: String(PAGE_SIZE) });
    if (cat) qs.set("category", cat);
    const res = await fetch(`/api/admin/articles?${qs}`);
    const data = await res.json();
    setItems(data.articles ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  }

  useEffect(() => { load(1, catFilter); }, [catFilter]);

  async function openEdit(slug: string) {
    setEditingId(slug);
    try {
      const res = await fetch(`/api/admin/articles/${slug}`);
      const doc = await res.json();
      setEditForm({
        slug: doc.slug,
        title: doc.title,
        description: doc.description ?? "",
        category: doc.category,
        readTime: doc.readTime ?? "5 phút đọc",
        publishedDate: doc.publishedDate ?? "",
        author: doc.author ?? "AITaoPage",
        keywords: (doc.keywords ?? []).join(", "),
        image: doc.image ?? "",
        content: doc.content ?? "",
      });
      setFormOpen(true);
    } finally {
      setEditingId(null);
    }
  }

  async function handleSave(form: ArticleForm) {
    const payload = {
      ...form,
      keywords: form.keywords.split(",").map((k) => k.trim()).filter(Boolean),
      image: form.image || null,
    };
    const isEdit = !!editForm;
    const res = isEdit
      ? await fetch(`/api/admin/articles/${form.slug}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      : await fetch("/api/admin/articles", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });

    if (!res.ok) {
      const err = await res.json();
      setToast({ msg: err.error ?? "Lỗi lưu", type: "err" });
      return;
    }
    setToast({ msg: isEdit ? "Đã cập nhật bài viết" : "Đã đăng bài mới", type: "ok" });
    setFormOpen(false);
    setEditForm(null);
    load(page);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const res = await fetch(`/api/admin/articles/${deleteTarget.slug}`, { method: "DELETE" });
    setDeleteTarget(null);
    if (!res.ok) { setToast({ msg: "Xoá thất bại", type: "err" }); return; }
    setToast({ msg: "Đã xoá bài viết", type: "ok" });
    load(page);
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <select
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={catFilter}
          onChange={(e) => { setCatFilter(e.target.value); setPage(1); }}
        >
          <option value="">Tất cả danh mục</option>
          {ARTICLE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <span className="text-xs text-gray-400 flex-1">{total} bài viết</span>
        <button
          onClick={() => { setEditForm(null); setFormOpen(true); }}
          className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700"
        >
          <Plus className="w-4 h-4" /> Thêm bài
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Bài viết</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Danh mục</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide hidden md:table-cell">Ngày đăng</th>
              <th className="px-4 py-3 w-24" />
            </tr>
          </thead>
          <tbody className={`divide-y divide-gray-100 ${loading ? "opacity-50" : ""}`}>
            {items.length === 0 && !loading && (
              <tr><td colSpan={4} className="text-center py-12 text-gray-400 text-sm">Chưa có bài viết nào.</td></tr>
            )}
            {items.map((item) => (
              <tr key={item.slug} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-semibold text-gray-900 text-sm line-clamp-1">{item.title}</p>
                  <p className="text-xs text-gray-400">/kien-thuc/{item.slug}</p>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700">{item.category}</span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-xs text-gray-500">
                  {item.publishedDate}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    <button onClick={() => openEdit(item.slug)} disabled={editingId === item.slug} className="p-1.5 rounded-lg hover:bg-teal-50 text-gray-400 hover:text-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      {editingId === item.slug ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Pencil className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => setDeleteTarget({ slug: item.slug, name: item.title })} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50">
            <span className="text-xs text-gray-500">{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} / {total}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => { setPage(page - 1); load(page - 1); }} disabled={page === 1} className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-30"><ChevronLeft className="w-4 h-4" /></button>
              <span className="text-xs font-semibold px-2">{page} / {totalPages}</span>
              <button onClick={() => { setPage(page + 1); load(page + 1); }} disabled={page >= totalPages} className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-30"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}
      </div>

      {formOpen && (
        <ArticleFormPanel
          initial={editForm ?? EMPTY_ARTICLE}
          isEdit={!!editForm}
          onSave={handleSave}
          onClose={() => { setFormOpen(false); setEditForm(null); }}
        />
      )}
      {deleteTarget && (
        <ConfirmDelete name={deleteTarget.name} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AdminContentManager() {
  const searchParams = useSearchParams();
  const section = (searchParams.get("section") ?? "templates") as ContentTab;

  return (
    <div>
      {section === "templates" && <TemplatesTab />}
      {section === "articles" && <ArticlesTab />}
    </div>
  );
}
