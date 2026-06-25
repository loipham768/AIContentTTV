"use client";

import { useEffect, useRef, useState } from "react";
import { GOOGLE_FONTS_URL, FONT_AWESOME_URL } from "@/lib/editor/googleFonts";
import type { Editor } from "grapesjs";
import {
  Eye,
  EyeOff,
  ZoomIn,
  ZoomOut,
  Trash2,
  Undo2,
  Redo2,
  Monitor,
  Smartphone,
  Code2,
  Plus,
  Download,
  FileText,
  Lock,
  Crown,
  LayoutTemplate,
  Sparkles,
  Gem,
  PenTool,
  Save,
  Check,
  AlertCircle,
  ChevronDown,
  Copy,
  Globe,
  ExternalLink,
  RefreshCw,
  FilePlus2,
  EyeOff as Unpublish,
} from "lucide-react";
import Logo from "@/components/Logo";
import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";

type SaveStatus = "idle" | "saving" | "saved" | "error";
type ExportAction = "copy" | "download" | "pdf";

interface TopBarProps {
  editorRef: React.RefObject<Editor | null>;
  editor?: Editor | null;
  userEmail: string;
  fullName?: string;
  avatarUrl?: string;
  isPreview: boolean;
  onTogglePreview: () => void;
  canExport: boolean;
  canPublish?: boolean;
  plan: string;
  projectId?: string | null;
  onSave?: () => Promise<void>;
  saveStatus?: SaveStatus;
  guestMode?: boolean;
}

export default function TopBar({
  editorRef,
  editor,
  userEmail,
  fullName,
  avatarUrl,
  isPreview,
  onTogglePreview,
  canExport,
  canPublish = false,
  plan,
  projectId,
  onSave,
  saveStatus = "idle",
  guestMode = false,
}: TopBarProps) {
  const [activeDevice, setActiveDevice] = useState<"desktop" | "mobile">(
    "desktop",
  );
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);
  const [exported, setExported] = useState(false);
  const [pdfExported, setPdfExported] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [clearPending, setClearPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newProjectLoading, setNewProjectLoading] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [exportConfirm, setExportConfirm] = useState<ExportAction | null>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  // Publish state
  const [publishLoading, setPublishLoading] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState<string | null>(null);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishLinkCopied, setPublishLinkCopied] = useState(false);
  const [unpublishPending, setUnpublishPending] = useState(false);

  useEffect(() => {
    if (!editor) return;
    function update() {
      setCanUndo(editor!.UndoManager.hasUndo());
      setCanRedo(editor!.UndoManager.hasRedo());
    }
    update();
    editor.on("undo redo update", update);
    return () => {
      editor.off("undo redo update", update);
    };
  }, [editor]);

  useEffect(() => {
    if (!clearPending) return;
    const t = setTimeout(() => setClearPending(false), 3000);
    return () => clearTimeout(t);
  }, [clearPending]);

  // Load publish status when projectId is available
  useEffect(() => {
    if (!projectId || guestMode) return;
    fetch(`/api/publish?projectId=${projectId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.published) {
          setPublishedSlug(data.slug);
          setPublishedUrl(data.url);
        }
      })
      .catch(() => {});
  }, [projectId, guestMode]);

  useEffect(() => {
    if (!showExportMenu) return;
    function handleClick(e: MouseEvent) {
      if (
        exportMenuRef.current &&
        !exportMenuRef.current.contains(e.target as Node)
      ) {
        setShowExportMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showExportMenu]);

  // Extract interactive JS scripts from HTML (sliders, navbars)
  function generateInteractiveScripts(html: string): string {
    const parts: string[] = [];
    const sliderRe = /id="(s[a-z0-9]{4,8})-wrap"/g;
    let m: RegExpExecArray | null;
    while ((m = sliderRe.exec(html)) !== null) {
      const sid = m[1];
      if (!html.includes(`id="${sid}-dots"`)) continue;
      parts.push(
        `(function(){var wrap=document.getElementById('${sid}-wrap');if(!wrap)return;var track=document.getElementById('${sid}');var dots=Array.from(document.getElementById('${sid}-dots').querySelectorAll('button'));var cur=0,total=3,timer=null;function goTo(n){cur=(n%total+total)%total;track.scrollTo({left:cur*track.offsetWidth,behavior:'smooth'});dots.forEach(function(d,i){d.style.width=i===cur?'28px':'7px';d.style.background=i===cur?'rgba(255,255,255,0.95)':'rgba(255,255,255,0.45)';});}dots.forEach(function(d,i){d.addEventListener('click',function(e){e.stopPropagation();goTo(i);resetTimer();});});function startTimer(){timer=setInterval(function(){goTo(cur+1);},4000);}function resetTimer(){clearInterval(timer);startTimer();}wrap.addEventListener('mouseenter',function(){clearInterval(timer);});wrap.addEventListener('mouseleave',startTimer);startTimer();track.addEventListener('scroll',function(){var idx=Math.round(track.scrollLeft/track.offsetWidth);if(idx!==cur){cur=idx;dots.forEach(function(d,i){d.style.width=i===cur?'28px':'7px';d.style.background=i===cur?'rgba(255,255,255,0.95)':'rgba(255,255,255,0.45)';});}},{passive:true});})();`,
      );
    }
    const navRe = /<nav\b[^>]*id="(n[a-z0-9]{4,8})"[^>]*>/g;
    while ((m = navRe.exec(html)) !== null) {
      const nid = m[1];
      if (!html.includes(`id="${nid}-toggle"`)) continue;
      parts.push(
        `(function(){var nav=document.getElementById('${nid}');if(!nav)return;var toggle=document.getElementById('${nid}-toggle');var mobile=document.getElementById('${nid}-mobile');var menu=document.getElementById('${nid}-menu');nav.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var href=a.getAttribute('href');if(!href||href==="#")return;var target=document.querySelector(href);if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}if(mobile&&mobile.style.display!=="none"){mobile.style.display="none";}});a.addEventListener('mouseenter',function(){a.style.background='#f1f5f9';a.style.color='#4f46e5';});a.addEventListener('mouseleave',function(){a.style.background='';a.style.color='';});});function checkBreak(){var sm=window.innerWidth<768;if(toggle)toggle.style.display=sm?'flex':'none';if(menu)menu.style.display=sm?'none':'flex';if(mobile&&!sm)mobile.style.display='none';}toggle&&toggle.addEventListener('click',function(){mobile.style.display=mobile.style.display==="none"?'block':'none';});checkBreak();window.addEventListener('resize',checkBreak);var links=Array.from(nav.querySelectorAll('a[href^="#"]'));window.addEventListener('scroll',function(){var scrollY=window.scrollY+80;var active=null;links.forEach(function(a){var t=document.querySelector(a.getAttribute('href'));if(t&&t.offsetTop<=scrollY)active=a;});links.forEach(function(a){a.style.color=a===active?'#4f46e5':'';a.style.fontWeight=a===active?'700':'';});},{passive:true});})();`,
      );
    }
    if (parts.length === 0) return "";
    return `<script>\n${parts.join("\n")}\n</script>`;
  }

  // Server-side export: HTML + CSS sent to /api/export-html, returns clean inlined HTML
  async function getCleanHtml(): Promise<string | null> {
    const ed = editorRef.current;
    if (!ed) return null;

    setLoading(true);
    try {
      const res = await fetch("/api/export-html", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: ed.getHtml(), css: ed.getCss() ?? "" }),
      });
      if (res.status === 403) {
        const data = await res.json().catch(() => ({}));
        if (data.upgradeRequired) setShowUpgrade(true);
        setCopyError(data.error ?? "Tài khoản không có quyền xuất HTML.");
        setTimeout(() => setCopyError(null), 5000);
        return null;
      }
      if (!res.ok) {
        setCopyError("Đã xảy ra lỗi. Vui lòng thử lại.");
        setTimeout(() => setCopyError(null), 3000);
        return null;
      }
      const { html } = await res.json();
      return html as string;
    } catch {
      setCopyError("Đã xảy ra lỗi. Vui lòng thử lại.");
      setTimeout(() => setCopyError(null), 3000);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function handleCopyHtml() {
    if (!canExport) {
      setShowUpgrade(true);
      return;
    }
    const html = await getCleanHtml();
    if (!html) return;
    const scripts = generateInteractiveScripts(html);
    try {
      await navigator.clipboard.writeText(
        html + (scripts ? "\n" + scripts : ""),
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopyError("Không thể sao chép. Thử lại.");
      setTimeout(() => setCopyError(null), 3000);
    }
  }

  async function handleExportHtml() {
    if (!canExport) {
      setShowUpgrade(true);
      return;
    }
    const body = await getCleanHtml();
    if (!body) return;
    const scripts = generateInteractiveScripts(body);
    const full = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exported Page</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link rel="stylesheet" href="${GOOGLE_FONTS_URL}">
  <link rel="stylesheet" href="${FONT_AWESOME_URL}">
  <style>*,*::before,*::after{box-sizing:border-box;}body{margin:0;padding:0;}</style>
</head>
<body>
${body}${scripts ? "\n" + scripts : ""}
</body>
</html>`;
    const blob = new Blob([full], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "index.html";
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  }

  async function handleExportPdf() {
    if (!canExport) {
      setShowUpgrade(true);
      return;
    }
    const ed = editorRef.current;
    if (!ed) return;

    setLoading(true);
    try {
      const res = await fetch("/api/export-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          html: ed.getHtml(),
          css: ed.getCss() ?? "",
          format: "A4",
          landscape: false,
        }),
      });
      if (res.status === 403) {
        const data = await res.json().catch(() => ({}));
        if (data.upgradeRequired) setShowUpgrade(true);
        setCopyError(data.error ?? "Tài khoản không có quyền xuất PDF.");
        setTimeout(() => setCopyError(null), 5000);
        return;
      }
      if (!res.ok) {
        setCopyError("Đã xảy ra lỗi khi tạo PDF. Vui lòng thử lại.");
        setTimeout(() => setCopyError(null), 3000);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "export.pdf";
      a.click();
      URL.revokeObjectURL(url);
      setPdfExported(true);
      setTimeout(() => setPdfExported(false), 3000);
    } catch {
      setCopyError("Đã xảy ra lỗi. Vui lòng thử lại.");
      setTimeout(() => setCopyError(null), 3000);
    } finally {
      setLoading(false);
    }
  }

  async function handlePublish() {
    if (!canPublish) {
      setShowUpgrade(true);
      return;
    }
    if (!projectId) {
      // Prompt user to save first
      setCopyError("Hãy lưu dự án trước khi xuất bản.");
      setTimeout(() => setCopyError(null), 4000);
      return;
    }

    const ed = editorRef.current;
    if (!ed) return;

    setPublishLoading(true);
    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          html: ed.getHtml(),
          css: ed.getCss() ?? "",
        }),
      });
      if (res.status === 403) {
        const data = await res.json().catch(() => ({}));
        if (data.upgradeRequired) setShowUpgrade(true);
        return;
      }
      if (!res.ok) {
        setCopyError("Xuất bản thất bại. Vui lòng thử lại.");
        setTimeout(() => setCopyError(null), 3000);
        return;
      }
      const data = await res.json();
      setPublishedSlug(data.slug);
      setPublishedUrl(data.url);
      setShowPublishModal(true);
    } catch {
      setCopyError("Đã xảy ra lỗi. Vui lòng thử lại.");
      setTimeout(() => setCopyError(null), 3000);
    } finally {
      setPublishLoading(false);
    }
  }

  async function handleUnpublish() {
    if (!publishedSlug) return;
    setUnpublishPending(false);
    try {
      await fetch(`/api/publish/${publishedSlug}`, { method: "DELETE" });
      setPublishedSlug(null);
      setPublishedUrl(null);
      setShowPublishModal(false);
    } catch {
      setCopyError("Gỡ xuất bản thất bại.");
      setTimeout(() => setCopyError(null), 3000);
    }
  }

  function handleZoomIn() {
    const n = Math.min(zoom + 10, 200);
    editorRef.current?.Canvas.setZoom(n);
    setZoom(n);
  }
  function handleZoomOut() {
    const n = Math.max(zoom - 10, 30);
    editorRef.current?.Canvas.setZoom(n);
    setZoom(n);
  }
  function handleZoomReset() {
    editorRef.current?.Canvas.setZoom(100);
    setZoom(100);
  }

  async function handleNewBlankProject() {
    if (newProjectLoading) return;
    setNewProjectLoading(true);
    try {
      const res = await fetch("/api/projects/blank", { method: "POST" });
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      if (res.status === 403) {
        const data = await res.json().catch(() => ({}));
        if (data.upgradeRequired) setShowUpgrade(true);
        setCopyError(data.error ?? "Hết lượt tạo project.");
        setTimeout(() => setCopyError(null), 5000);
        return;
      }
      if (!res.ok) {
        setCopyError("Đã xảy ra lỗi. Vui lòng thử lại.");
        setTimeout(() => setCopyError(null), 3000);
        return;
      }
      const { projectId } = await res.json();
      window.location.href = `/editor?project=${projectId}`;
    } catch {
      setCopyError("Lỗi kết nối. Vui lòng thử lại.");
      setTimeout(() => setCopyError(null), 3000);
    } finally {
      setNewProjectLoading(false);
    }
  }

  function handleClearCanvas() {
    if (!clearPending) {
      setClearPending(true);
      return;
    }
    editorRef.current?.DomComponents.clear();
    setClearPending(false);
  }

  const iconBtn = (
    onClick: () => void,
    icon: React.ReactNode,
    title: string,
    disabled = false,
  ) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded-md transition-all ${
        disabled
          ? "opacity-30 cursor-not-allowed text-slate-500"
          : "text-slate-400 hover:text-white hover:bg-slate-700 active:bg-slate-600"
      }`}
    >
      {icon}
    </button>
  );

  return (
    <>
      <div
        className="flex items-center justify-between px-3 md:px-4 bg-slate-900 flex-shrink-0 border-b border-slate-800"
        style={{ height: "52px" }}
      >
        {/* Brand + New */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Logo iconSize={40} uid="topbar" dark iconOnly />
          <a
            href="/create"
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-all"
            title="Tạo nội dung mới với AI"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={handleNewBlankProject}
            disabled={newProjectLoading}
            title="Tạo project trống mới (1 lượt)"
            className={`p-1.5 rounded-lg transition-all ${
              newProjectLoading
                ? "text-slate-600 cursor-wait"
                : "text-slate-400 hover:bg-slate-700 hover:text-white"
            }`}
          >
            {newProjectLoading ? (
              <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-500 border-t-slate-300 animate-spin block" />
            ) : (
              <FilePlus2 className="w-3.5 h-3.5" />
            )}
          </button>
          <a
            href="/templates"
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-all"
            title="Thư viện mẫu"
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Center controls */}
        <div className="flex items-center gap-1 flex-1 justify-center overflow-hidden">
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 gap-0.5">
            {iconBtn(
              () => editorRef.current?.runCommand("core:undo"),
              <Undo2 className="w-3.5 h-3.5" />,
              "Hoàn tác (Ctrl+Z)",
              !canUndo,
            )}
            {iconBtn(
              () => editorRef.current?.runCommand("core:redo"),
              <Redo2 className="w-3.5 h-3.5" />,
              "Làm lại (Ctrl+Y)",
              !canRedo,
            )}
          </div>

          <div className="hidden md:flex items-center bg-slate-800 rounded-lg p-0.5 gap-0.5">
            <button
              onClick={() => {
                editorRef.current?.setDevice("Desktop");
                setActiveDevice("desktop");
              }}
              title="Desktop"
              className={`p-1.5 rounded-md transition-all ${activeDevice === "desktop" ? "bg-white text-slate-800 shadow-sm" : "text-slate-400 hover:text-white"}`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                editorRef.current?.setDevice("Mobile");
                setActiveDevice("mobile");
              }}
              title="Mobile (390px)"
              className={`p-1.5 rounded-md transition-all ${activeDevice === "mobile" ? "bg-white text-slate-800 shadow-sm" : "text-slate-400 hover:text-white"}`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="hidden md:flex items-center bg-slate-800 rounded-lg overflow-hidden">
            <button
              onClick={handleZoomOut}
              className="px-1.5 py-1.5 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              title="Thu nhỏ"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <button
              onClick={handleZoomReset}
              className="px-1.5 py-1 text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-700 transition-colors w-9 text-center"
              title="Reset zoom"
            >
              {zoom}%
            </button>
            <button
              onClick={handleZoomIn}
              className="px-1.5 py-1.5 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              title="Phóng to"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>

          <div className="w-px h-4 bg-slate-700 mx-0.5 flex-shrink-0" />

          <button
            onClick={onTogglePreview}
            title={isPreview ? "Thoát xem trước (Esc)" : "Xem trước"}
            className={`flex items-center gap-1 px-2 py-1.5 text-xs font-medium rounded-lg transition-all flex-shrink-0 ${
              isPreview
                ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/30"
                : "text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
          >
            {isPreview ? (
              <EyeOff className="w-3.5 h-3.5" />
            ) : (
              <Eye className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline text-xs">
              {isPreview ? "Thoát" : "Preview"}
            </span>
          </button>

          <button
            onClick={handleClearCanvas}
            title="Xóa toàn bộ canvas"
            className={`hidden sm:flex items-center gap-1 px-2 py-1.5 text-xs font-medium rounded-lg transition-all flex-shrink-0 ${
              clearPending
                ? "bg-red-500 text-white shadow-md shadow-red-500/30"
                : "text-slate-400 hover:bg-slate-700 hover:text-white"
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">
              {clearPending ? "Xác nhận?" : "Xóa"}
            </span>
          </button>
        </div>

        {/* Right: Save + Export + user */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Save button */}
          {onSave && (
            <button
              onClick={onSave}
              disabled={saveStatus === "saving"}
              title="Lưu tiến trình"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                saveStatus === "saving"
                  ? "text-slate-400 cursor-wait"
                  : saveStatus === "saved"
                    ? "text-emerald-400"
                    : saveStatus === "error"
                      ? "text-red-400"
                      : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              {saveStatus === "saving" ? (
                <Save className="w-3.5 h-3.5 animate-pulse" />
              ) : saveStatus === "saved" ? (
                <Check className="w-3.5 h-3.5" />
              ) : saveStatus === "error" ? (
                <AlertCircle className="w-3.5 h-3.5" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">
                {saveStatus === "saving"
                  ? "Đang lưu..."
                  : saveStatus === "saved"
                    ? "Đã lưu"
                    : saveStatus === "error"
                      ? "Lỗi lưu"
                      : "Lưu"}
              </span>
            </button>
          )}

          {/* Publish button */}
          {!guestMode && (
            <button
              onClick={
                publishedSlug ? () => setShowPublishModal(true) : handlePublish
              }
              disabled={publishLoading}
              title={
                !canPublish
                  ? "Nâng cấp để xuất bản trang"
                  : publishedSlug
                    ? "Xem thông tin xuất bản"
                    : "Xuất bản trang công khai"
              }
              className={`relative flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                !canPublish
                  ? "text-slate-500 cursor-not-allowed"
                  : publishedSlug
                    ? "text-emerald-400 hover:bg-slate-700"
                    : publishLoading
                      ? "text-slate-400 cursor-wait"
                      : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              {publishLoading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Globe className="w-3.5 h-3.5" />
              )}
              {publishedSlug && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-slate-900" />
              )}
              <span className="hidden sm:inline">
                {publishLoading
                  ? "Đang xuất bản..."
                  : publishedSlug
                    ? "Đã xuất bản"
                    : "Xuất bản"}
              </span>
            </button>
          )}

          {/* Export dropdown */}
          <div className="relative" ref={exportMenuRef}>
            <button
              onClick={() => {
                if (!canExport) {
                  setShowUpgrade(true);
                  return;
                }
                setShowExportMenu((v) => !v);
              }}
              disabled={loading}
              title={canExport ? "Xuất HTML" : "Nâng cấp để xuất HTML"}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                !canExport
                  ? "text-slate-500 cursor-not-allowed"
                  : showExportMenu
                    ? "bg-slate-700 text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              {canExport ? (
                <Code2 className="w-3.5 h-3.5" />
              ) : (
                <Lock className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">Xuất HTML</span>
              {canExport && (
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${showExportMenu ? "rotate-180" : ""}`}
                />
              )}
            </button>

            {showExportMenu && (
              <div className="absolute right-0 top-full mt-1.5 w-44 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50">
                <button
                  onClick={() => {
                    setShowExportMenu(false);
                    setExportConfirm("copy");
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-400" /> Sao chép HTML
                </button>
                <div className="h-px bg-slate-700" />
                <button
                  onClick={() => {
                    setShowExportMenu(false);
                    setExportConfirm("download");
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-slate-400" /> Tải file
                  HTML
                </button>
                <div className="h-px bg-slate-700" />
                <button
                  onClick={() => {
                    setShowExportMenu(false);
                    setExportConfirm("pdf");
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" /> Xuất PDF
                </button>
              </div>
            )}
          </div>

          <div className="w-px h-4 bg-slate-700 mx-0.5" />

          {guestMode ? (
            <Link
              href="/login?tab=register"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:opacity-90 transition-opacity shadow-sm shadow-indigo-500/30"
            >
              Đăng ký miễn phí →
            </Link>
          ) : (
            <>
              {/* Plan badge */}
              <Link
                href="/profile"
                title={`Gói ${plan === "free" ? "Miễn phí" : plan === "designer" ? "Designer" : plan === "basic" ? "Basic" : "Pro"} · Xem profile`}
              >
                {plan === "free" && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-slate-400 bg-slate-800 border border-slate-700 hover:border-slate-500 transition-colors">
                    <Sparkles className="w-2.5 h-2.5" /> Free
                  </span>
                )}
                {plan === "designer" && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-teal-500 to-cyan-500 shadow-sm shadow-teal-500/30">
                    <PenTool className="w-2.5 h-2.5" /> Designer
                  </span>
                )}
                {plan === "basic" && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-500 shadow-sm shadow-indigo-500/30">
                    <Crown className="w-2.5 h-2.5" /> Basic
                  </span>
                )}
                {plan === "pro" && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-amber-900 bg-gradient-to-r from-amber-400 to-orange-400 shadow-sm shadow-amber-500/30">
                    <Gem className="w-2.5 h-2.5" /> Pro
                  </span>
                )}
              </Link>

              <Link
                href="/profile"
                title={fullName || userEmail}
                className="hover:opacity-80 transition-opacity"
              >
                <UserAvatar
                  avatarUrl={avatarUrl}
                  fullName={fullName}
                  email={userEmail}
                  size={28}
                />
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Publish modal */}
      {showPublishModal && publishedUrl && (
        <div
          className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4"
          onClick={() => {
            setShowPublishModal(false);
            setUnpublishPending(false);
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">
                  Trang đã được xuất bản
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Ai cũng có thể truy cập qua link này
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl mb-4">
              <span className="flex-1 text-xs text-slate-600 truncate font-mono">
                {publishedUrl}
              </span>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(publishedUrl);
                    setPublishLinkCopied(true);
                    setTimeout(() => setPublishLinkCopied(false), 2500);
                  } catch {}
                }}
                className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  publishLinkCopied
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {publishLinkCopied ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                {publishLinkCopied ? "Đã sao chép" : "Sao chép"}
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (!unpublishPending) {
                    setUnpublishPending(true);
                    return;
                  }
                  handleUnpublish();
                }}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl transition-colors ${
                  unpublishPending
                    ? "bg-red-500 text-white"
                    : "text-slate-500 border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                }`}
              >
                <Unpublish className="w-3.5 h-3.5" />
                {unpublishPending ? "Xác nhận gỡ?" : "Gỡ xuất bản"}
              </button>
              <a
                href={publishedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-indigo-600 border border-indigo-200 rounded-xl hover:bg-indigo-50 transition-colors"
                onClick={() => setShowPublishModal(false)}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Mở trang
              </a>
              <button
                onClick={handlePublish}
                disabled={publishLoading}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${publishLoading ? "animate-spin" : ""}`}
                />
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export confirm modal */}
      {exportConfirm && (
        <div
          className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4"
          onClick={() => setExportConfirm(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                {exportConfirm === "copy" ? (
                  <Copy className="w-5 h-5 text-white" />
                ) : exportConfirm === "pdf" ? (
                  <FileText className="w-5 h-5 text-white" />
                ) : (
                  <Download className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">
                  {exportConfirm === "copy"
                    ? "Sao chép HTML"
                    : exportConfirm === "pdf"
                      ? "Xuất PDF"
                      : "Tải file HTML"}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Xác nhận xuất nội dung
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              {exportConfirm === "copy"
                ? "Toàn bộ nội dung sẽ được xử lý và CSS nhúng inline — sẵn sàng dán vào Haravan, Sapo, các Editor hoặc bất kỳ nền tảng nào."
                : exportConfirm === "pdf"
                  ? "Nội dung sẽ được render trên server và xuất thành file PDF — chất lượng cao, giữ nguyên font chữ và màu sắc. Phù hợp cho portfolio, CV."
                  : "Toàn bộ nội dung sẽ được xử lý và CSS nhúng inline — tải xuống dưới dạng file index.html sẵn sàng dùng ngay."}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setExportConfirm(null)}
                className="flex-1 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  const action = exportConfirm;
                  setExportConfirm(null);
                  if (action === "copy") handleCopyHtml();
                  else if (action === "pdf") handleExportPdf();
                  else handleExportHtml();
                }}
                className="flex-1 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl hover:opacity-90 transition-opacity"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade prompt overlay */}
      {showUpgrade && (
        <div
          className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowUpgrade(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  {guestMode ? "Đăng ký để tiếp tục" : "Nâng cấp để mở khoá"}
                </h3>
                <p className="text-xs text-gray-500">
                  {guestMode
                    ? "Tạo tài khoản miễn phí để tiếp tục"
                    : "Tính năng dành cho gói Basic và Pro"}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-5">
              {guestMode ? (
                "Đây là bản demo. Đăng ký tài khoản miễn phí để lưu dự án và dùng AI tạo nội dung."
              ) : (
                <>
                  Gói miễn phí không hỗ trợ xuất HTML và xuất bản trang. Nâng
                  cấp lên gói <strong>Basic (69.000đ/tháng)</strong> để mở khoá
                  tính năng này.
                </>
              )}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowUpgrade(false)}
                className="flex-1 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Để sau
              </button>
              <Link
                href={guestMode ? "/login?tab=register" : "/#pricing"}
                onClick={() => setShowUpgrade(false)}
                className="flex-1 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl text-center hover:opacity-90 transition-opacity"
              >
                {guestMode ? "Đăng ký miễn phí" : "Xem bảng giá"}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Toasts */}
      {copied && (
        <div
          className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-xl text-sm font-medium z-50 border border-slate-700"
          role="status"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          Đã sao chép HTML!
        </div>
      )}
      {exported && (
        <div
          className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-xl text-sm font-medium z-50 border border-slate-700"
          role="status"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          Đã tải index.html!
        </div>
      )}
      {pdfExported && (
        <div
          className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-xl text-sm font-medium z-50 border border-slate-700"
          role="status"
        >
          <span className="w-2 h-2 rounded-full bg-rose-400" />
          Đã tải export.pdf!
        </div>
      )}
      {copyError && (
        <div
          className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-full shadow-xl text-sm font-medium z-50 max-w-sm text-center"
          role="status"
        >
          {copyError}
        </div>
      )}
      {loading && (
        <div
          className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-full shadow-xl text-sm z-50"
          role="status"
        >
          <span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          Đang xử lý...
        </div>
      )}
    </>
  );
}
