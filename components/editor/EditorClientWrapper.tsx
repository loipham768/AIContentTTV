"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import type { Editor, Component } from "grapesjs";
import { resolveCssVariables } from "@/lib/cssIsolation";
import {
  Loader2, LayoutGrid, Palette, Layers, History,
  Trash2, Copy, ArrowUp, ArrowDown, EyeOff, Monitor, X, Sparkles, UserPlus,
} from "lucide-react";
import Link from "next/link";
import TopBar from "@/components/editor/TopBar";
import ImagePickerModal from "@/components/editor/ImagePickerModal";


const GrapesEditor = dynamic(() => import("@/components/editor/GrapesEditor"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-1 items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
          <Loader2 className="w-6 h-6 text-white animate-spin" />
        </div>
        <p className="text-sm text-slate-500 font-medium">Đang khởi động trình soạn thảo...</p>
      </div>
    </div>
  ),
});
const HistoryPanel = dynamic(() => import("@/components/editor/HistoryPanel"), { ssr: false });

type RightTab  = "style" | "layers" | "history";
type MobileTab = "canvas" | "blocks" | "panel";

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

interface EditorClientWrapperProps {
  userEmail: string
  fullName?: string
  avatarUrl?: string
  initialData?: object | null
  projectId?: string | null
  canExport: boolean
  plan: string
  guestMode?: boolean
}

export default function EditorClientWrapper({ userEmail, fullName, avatarUrl, initialData, projectId: initialProjectId, canExport, plan, guestMode = false }: EditorClientWrapperProps) {
  const editorRef = useRef<Editor | null>(null);
  const [historyKey, setHistoryKey] = useState(0);
  const [editorInstance, setEditorInstance] = useState<Editor | null>(null);
  const [rightTab, setRightTab] = useState<RightTab>("style");
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>("canvas");
  const [showEditHint, setShowEditHint] = useState(!!initialData);
  const [isMobile, setIsMobile] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(initialProjectId ?? null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Image picker modal state
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const imagePickerSelectRef = useRef<((url: string) => void) | null>(null);
  const imagePickerCancelRef = useRef<(() => void) | null>(null);

  const openImagePicker = useCallback((onSelect: (url: string) => void, onCancel: () => void) => {
    imagePickerSelectRef.current = onSelect;
    imagePickerCancelRef.current = onCancel;
    setImagePickerOpen(true);
  }, []);

  const closeImagePicker = useCallback(() => {
    setImagePickerOpen(false);
    imagePickerCancelRef.current?.(); // báo GrapesJS AM đóng nếu user cancel
    imagePickerSelectRef.current = null;
    imagePickerCancelRef.current = null;
  }, []);

  const handleEditor = useCallback((editor: Editor) => {
    editorRef.current = editor;
    setEditorInstance(editor);
    editor.on('component:selected',   (c: Component) => setSelectedComponent(c));
    editor.on('component:deselected', () => setSelectedComponent(null));

    if (initialData) {
      const data = initialData as Record<string, unknown>;
      if (data.type === 'html' && typeof data.html === 'string') {
        // Parse the full Gemini HTML to separate <style> from body content.
        // GrapesJS setComponents() drops <head>/<style>, so we must extract CSS
        // manually and inject it via setStyle() so editor.getCss() returns it
        // and the juice css-isolation step can inline it correctly on export.
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.html, 'text/html');

        const rawCss = Array.from(doc.querySelectorAll('style'))
          .map(s => s.textContent ?? '')
          .join('\n');

        // Resolve var() before loading into GrapesJS — GrapesJS may drop :root
        // declarations through setStyle()/getCss(), leaving var() unresolvable on export.
        const styleContent = rawCss.trim() ? resolveCssVariables(rawCss) : rawCss;

        editor.setComponents(doc.body.innerHTML);
        if (styleContent.trim()) {
          editor.setStyle(styleContent);
        }
      } else {
        // GrapesJS project JSON (legacy Claude format)
        editor.loadProjectData(initialData as Parameters<typeof editor.loadProjectData>[0]);
      }
      setHistoryKey(k => k + 1);
    }

    // When user changes "color" via style manager, sync -webkit-text-fill-color so gradient-text
    // elements become editable. If gradient text was active, also clear the gradient background.
    // opts.__up=true means GrapesJS is loading the target's current style — skip those.
    editor.on('style:property:update', ({ property, value, opts }: { property: any; value: string; opts: any }) => {
      if (property?.getName?.() !== 'color') return;
      if (opts?.__up) return;
      const selected = editor.getSelected();
      if (!selected) return;
      const cur = selected.getStyle();
      if (value) {
        const next: Record<string, string> = { ...cur, '-webkit-text-fill-color': value };
        // If gradient-text was active inline, clear it so solid color takes over cleanly
        if (cur['-webkit-background-clip'] === 'text') {
          delete next['background'];
          delete next['-webkit-background-clip'];
          delete next['background-clip'];
        }
        selected.setStyle(next);
      } else {
        const next = { ...cur };
        delete next['-webkit-text-fill-color'];
        selected.setStyle(next);
      }
    });

    // Click-to-add: mobile only (< 1024px). Desktop keeps drag-and-drop.
    editor.on('block:click', (block: any) => {
      if (typeof window === 'undefined' || window.innerWidth >= 1024) return;

      const content = block.get('content');
      if (content == null) return;

      const wrapper = editor.getWrapper();
      if (!wrapper) return;

      const selected = editor.getSelected();
      if (selected && selected !== wrapper) {
        const parent = selected.parent() || wrapper;
        const idx = parent.components().indexOf(selected);
        parent.components().add(content as any, { at: idx + 1 });
      } else {
        wrapper.append(content as any);
      }

      // Close blocks panel so the user can see the result on canvas
      setMobileTab('canvas');
    });

    // Mobile touch fix: GrapesJS binds mousedown → startDrag on each block element,
    // which initialises the sorter and breaks touch taps. We intercept mousedown in
    // capture phase (before GrapesJS sees it) and stop propagation so startDrag
    // never runs.  The browser still synthesises `click` from touchend, so
    // block:click fires normally and tap-to-add works correctly.
    editor.on('load', () => {
      if (typeof window === 'undefined' || window.innerWidth >= 1024) return;
      const blocksPanel = document.getElementById('gjs-blocks-panel');
      if (!blocksPanel) return;
      blocksPanel.addEventListener(
        'mousedown',
        (e) => {
          if (!(e.target as Element).closest('.gjs-block')) return;
          e.stopImmediatePropagation();
        },
        true, // capture — fires before GrapesJS target-phase listener
      );
    });
  }, [initialData]);

  async function handleSave() {
    const ed = editorRef.current;
    if (!ed) return;

    setSaveStatus('saving');
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

    try {
      const blockData = ed.getProjectData();

      let projectId = currentProjectId;

      if (projectId) {
        const res = await fetch(`/api/projects/${projectId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ blockData }),
        });
        if (!res.ok) throw new Error('save_failed');
      } else {
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: `Dự án ${new Date().toLocaleDateString('vi-VN')}`,
            prompt: '(Tạo thủ công)',
            blockData,
          }),
        });
        if (!res.ok) throw new Error('save_failed');
        const { project } = await res.json();
        projectId = project._id as string;
        setCurrentProjectId(projectId);
        window.history.replaceState(null, '', `/editor?project=${projectId}`);
      }

      setSaveStatus('saved');
      saveTimerRef.current = setTimeout(() => setSaveStatus('idle'), 2500);
    } catch {
      setSaveStatus('error');
      saveTimerRef.current = setTimeout(() => setSaveStatus('idle'), 3000);
    }
  }

  function exitPreview() {
    editorRef.current?.stopCommand('core:preview');
    setIsPreview(false);
  }

  function handleTogglePreview() {
    if (isPreview) {
      exitPreview();
    } else {
      editorRef.current?.runCommand('core:preview');
      setIsPreview(true);
    }
  }

  // Escape key always exits preview regardless of GrapesJS z-index
  useEffect(() => {
    if (!isPreview) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') exitPreview(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isPreview]);

  // Detect mobile once on mount (client-side only)
  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  // Auto-dismiss the edit hint after 12s
  useEffect(() => {
    if (!showEditHint) return;
    const t = setTimeout(() => setShowEditHint(false), 12000);
    return () => clearTimeout(t);
  }, [showEditHint]);

  function handleDeleteComponent() {
    if (!selectedComponent) return;
    selectedComponent.remove();
    setSelectedComponent(null);
  }

  function handleCloneComponent() {
    const ed = editorRef.current;
    if (!ed || !selectedComponent) return;
    ed.runCommand('core:copy');
    ed.runCommand('core:paste');
  }

  function handleMoveUp() {
    if (!selectedComponent) return;
    const parent = selectedComponent.parent();
    if (!parent) return;
    const idx = parent.components().indexOf(selectedComponent);
    if (idx > 0) selectedComponent.move(parent, { at: idx - 1 });
  }

  function handleMoveDown() {
    if (!selectedComponent) return;
    const parent = selectedComponent.parent();
    if (!parent) return;
    const comps = parent.components();
    const idx   = comps.indexOf(selectedComponent);
    if (idx < comps.length - 1) selectedComponent.move(parent, { at: idx + 2 });
  }

  const rightTabBtn = (tab: RightTab, icon: React.ReactNode, label: string) => (
    <button
      key={tab}
      onClick={() => setRightTab(tab)}
      className={`flex-1 flex items-center justify-center gap-1 py-2.5 text-xs font-semibold transition-all border-b-2 ${
        rightTab === tab
          ? "text-blue-600 border-blue-500 bg-white"
          : "text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50"
      }`}
    >
      {icon}{label}
    </button>
  );

  const mobileNavBtn = (
    tab: MobileTab,
    icon: React.ReactNode,
    label: string,
    onClick?: () => void,
    active?: boolean,
  ) => {
    const isActive = active ?? mobileTab === tab;
    return (
      <button
        key={label}
        onClick={onClick ?? (() => setMobileTab(tab))}
        className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-1 text-xs font-medium transition-all relative ${
          isActive ? 'text-blue-600' : 'text-slate-500 active:bg-slate-50'
        }`}
      >
        {isActive && <span className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-blue-500 rounded-b-full" />}
        {icon}
        <span>{label}</span>
      </button>
    );
  };

  const actionBtn = "p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors";

  return (
    // data-preview attribute triggers CSS to hide panels / prompt bar in preview mode
    <div
      className="flex flex-col gjs-editor-wrap"
      data-preview={isPreview ? "" : undefined}
    >
      <TopBar
        editorRef={editorRef}
        editor={editorInstance}
        userEmail={userEmail}
        fullName={fullName}
        avatarUrl={avatarUrl}
        isPreview={isPreview}
        onTogglePreview={handleTogglePreview}
        canExport={canExport}
        plan={plan}
        onSave={guestMode ? undefined : handleSave}
        saveStatus={saveStatus}
        guestMode={guestMode}
      />

      {/* Guest mode signup banner */}
      {guestMode && !isPreview && (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs flex-shrink-0">
          <Sparkles className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
          <p className="flex-1 leading-relaxed">
            <span className="font-semibold">Bạn đang dùng bản demo.</span>{" "}
            Đăng ký miễn phí để lưu dự án, dùng AI tạo nội dung và xuất HTML.
          </p>
          <Link
            href="/login?tab=register"
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-indigo-50 transition-colors whitespace-nowrap"
          >
            <UserPlus className="w-3 h-3" /> Đăng ký miễn phí
          </Link>
        </div>
      )}

      {/* Edit hint banner — shown when content is loaded (AI or template), auto-dismissed after 12s */}
      {showEditHint && !isPreview && (
        <div className="flex items-center gap-2.5 px-4 py-2 bg-indigo-600 text-white text-xs flex-shrink-0">
          <Sparkles className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
          <p className="flex-1 leading-relaxed">
            <span className="font-semibold">Mọi thứ đều chỉnh sửa được!</span>
            {" "}Nhấn vào bất kỳ phần tử nào để đổi màu chữ, màu nền, gradient, animation, hình ảnh, bố cục...
            {isMobile
              ? " Chuyển tab Khối bên dưới, nhấn vào khối để thêm nội dung mới."
              : " Kéo thả các khối ở bên trái để thêm nội dung mới."}
          </p>
          <button
            onClick={() => setShowEditHint(false)}
            className="p-0.5 rounded hover:bg-white/20 transition-colors flex-shrink-0"
            title="Đóng"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Component action bar */}
      {selectedComponent && !isPreview && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white border-b border-slate-200 shadow-sm flex-shrink-0">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-100 truncate max-w-[160px]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
            {selectedComponent.getName() || selectedComponent.get('tagName') || 'Phần tử'}
          </span>
          <div className="flex items-center gap-0.5 ml-auto">
            <button onClick={handleMoveUp}   className={actionBtn} title="Di chuyển lên"><ArrowUp   className="w-3.5 h-3.5" /></button>
            <button onClick={handleMoveDown} className={actionBtn} title="Di chuyển xuống"><ArrowDown className="w-3.5 h-3.5" /></button>
            <div className="w-px h-4 bg-slate-200 mx-1" />
            <button onClick={handleCloneComponent} className={actionBtn} title="Nhân đôi"><Copy className="w-3.5 h-3.5" /></button>
            <button onClick={handleDeleteComponent} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Xóa phần tử">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/*
        Main editor area.
        data-mtab drives CSS: which panel is visible on mobile (< 1024px).
        Panels use class gjs-panel-left / gjs-panel-right so CSS can control them.
      */}
      <div className="flex flex-1 overflow-hidden relative" data-mtab={mobileTab}>

        {/* ── Left: Blocks panel — always mounted so GrapesJS keeps its render target ── */}
        <div className="gjs-panel-left flex-shrink-0 w-56 border-r border-slate-200 bg-white flex flex-col overflow-hidden">
          <div className="px-3 py-2.5 border-b border-slate-200 bg-slate-50 flex items-center gap-2 min-h-[44px]">
            <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center flex-shrink-0">
              <LayoutGrid className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Khối</span>
            <button
              onClick={() => setMobileTab('canvas')}
              className="gjs-mob-close ml-auto items-center justify-center w-7 h-7 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700"
              title="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Mobile hint */}
          <div className="gjs-mob-only px-3 py-2 bg-blue-50 border-b border-blue-100">
            <p className="text-xs text-blue-600">Nhấn vào khối để thêm vào canvas</p>
          </div>
          <div id="gjs-blocks-panel" className="flex-1 overflow-y-auto" />
        </div>

        {/* ── Center: Canvas ─────────────────────────────────────────── */}
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          <GrapesEditor onEditor={handleEditor} onOpenImagePicker={openImagePicker} />
        </div>

        {/* ── Right: Style / Layers / History — always mounted so GrapesJS keeps its render targets ── */}
        <div className="gjs-panel-right flex-shrink-0 w-64 border-l border-slate-200 bg-white flex flex-col overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-slate-200 bg-slate-50">
            {rightTabBtn("style",   <Palette className="w-3 h-3" />, "Kiểu dáng")}
            {rightTabBtn("layers",  <Layers  className="w-3 h-3" />, "Lớp")}
            {rightTabBtn("history", <History className="w-3 h-3" />, "Lịch sử")}
            {/* gjs-mob-close: hidden on desktop, shown on mobile via CSS */}
            <button
              onClick={() => setMobileTab('canvas')}
              className="gjs-mob-close items-center justify-center px-3 border-b-2 border-transparent text-slate-400 hover:text-slate-700 hover:bg-slate-50"
              title="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Panel content */}
          <div className="flex-1 overflow-hidden relative">

            {/* Style + Traits tab */}
            <div
              className="absolute inset-0 overflow-y-auto"
              style={{ display: rightTab === "style" ? "block" : "none" }}
            >
              {!selectedComponent && (
                <p className="px-4 py-6 text-xs text-slate-400 text-center leading-relaxed">
                  Chọn một phần tử trên canvas để chỉnh sửa kiểu dáng.
                </p>
              )}
              <div id="gjs-styles-panel" />

              <div id="gjs-traits-panel" className="border-t border-gray-100" />
            </div>

            {/* Layers tab */}
            <div
              className="absolute inset-0 overflow-y-auto"
              style={{ display: rightTab === "layers" ? "block" : "none" }}
            >
              <div id="gjs-layers-panel" />
            </div>

            {/* History tab */}
            <div
              className="absolute inset-0 overflow-y-auto"
              style={{ display: rightTab === "history" ? "flex" : "none" }}
            >
              <HistoryPanel editorRef={editorRef} refreshKey={historyKey} />
            </div>

          </div>
        </div>

      </div>

      {/*
        Mobile bottom tab bar.
        gjs-mob-only: hidden on desktop, shown as flex row on mobile via CSS.
        Mobile bottom nav bar.
      */}
      <div className="gjs-mob-only flex-shrink-0 border-t border-slate-200 bg-white min-h-[52px]">
        {mobileNavBtn('blocks', <LayoutGrid className="w-5 h-5" />, 'Khối')}
        {mobileNavBtn('canvas', <Monitor   className="w-5 h-5" />, 'Canvas')}
        {mobileNavBtn(
          'panel',
          <Palette className="w-5 h-5" />,
          'Kiểu dáng',
          () => { setMobileTab('panel'); setRightTab('style'); },
          mobileTab === 'panel' && rightTab === 'style',
        )}
        {mobileNavBtn(
          'panel',
          <Layers className="w-5 h-5" />,
          'Lớp',
          () => { setMobileTab('panel'); setRightTab('layers'); },
          mobileTab === 'panel' && rightTab === 'layers',
        )}
      </div>

      {/* Guest AI locked bar — shown at bottom of editor in demo mode */}
      {guestMode && !isPreview && (
        <div className="flex-shrink-0 border-t border-slate-200 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between px-4 pt-2.5 pb-1">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-semibold text-slate-500">Tạo nội dung với AI</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2 px-4 pb-3">
            <div className="flex-1 relative">
              <textarea
                disabled
                placeholder="Để sử dụng AI tạo nội dung, bạn cần đăng ký tài khoản và kích hoạt gói dịch vụ..."
                rows={2}
                className="w-full resize-none rounded-xl px-3.5 py-2.5 text-sm border border-slate-200 bg-slate-50 cursor-not-allowed placeholder:text-slate-600 placeholder:font-medium"
              />
              <div className="absolute inset-0 rounded-xl flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
                <Link
                  href="/login?tab=register"
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-semibold rounded-lg shadow-lg shadow-indigo-500/25 hover:opacity-90 transition-opacity"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Đăng ký để dùng AI
                </Link>
              </div>
            </div>
            <button
              disabled
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-400 cursor-not-allowed sm:w-auto w-full flex-shrink-0"
            >
              <Sparkles className="w-4 h-4 flex-shrink-0" />
              Tạo nội dung
            </button>
          </div>
          <p className="px-4 pb-3 text-[11px] text-slate-400 leading-relaxed">
            Tính năng AI yêu cầu đăng ký tài khoản và kích hoạt gói dịch vụ.{" "}
            <Link href="/login?tab=register" className="text-indigo-500 hover:text-indigo-700 font-medium underline underline-offset-2">
              Đăng ký miễn phí ngay →
            </Link>
          </p>
        </div>
      )}

      {/* Floating exit button — fixed above GrapesJS canvas overlay when in preview */}
      {isPreview && (
        <button
          onClick={exitPreview}
          className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-full shadow-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors"
          title="Thoát xem trước (Esc)"
        >
          <EyeOff className="w-4 h-4" />
          Thoát xem trước
        </button>
      )}

      <ImagePickerModal
        open={imagePickerOpen}
        onSelect={(url) => {
          // Null cancelRef trước để closeImagePicker không gọi amClose lần 2
          imagePickerCancelRef.current = null;
          imagePickerSelectRef.current?.(url);
          setImagePickerOpen(false);
          imagePickerSelectRef.current = null;
        }}
        onClose={closeImagePicker}
      />
    </div>
  );
}
