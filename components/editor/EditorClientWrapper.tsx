"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import type { Editor, Component } from "grapesjs";
import { Loader2, LayoutGrid, Palette, Layers, History, Trash2, Copy, ArrowUp, ArrowDown, EyeOff } from "lucide-react";
import TopBar from "@/components/editor/TopBar";
import PromptBar from "@/components/editor/PromptBar";

const GrapesEditor = dynamic(() => import("@/components/editor/GrapesEditor"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-gray-400">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="text-sm">Đang tải trình soạn thảo...</p>
      </div>
    </div>
  ),
});
const HistoryPanel = dynamic(() => import("@/components/editor/HistoryPanel"), { ssr: false });

type RightTab = "style" | "layers" | "history";

interface EditorClientWrapperProps { userEmail: string; }

export default function EditorClientWrapper({ userEmail }: EditorClientWrapperProps) {
  const editorRef = useRef<Editor | null>(null);
  const [historyKey, setHistoryKey] = useState(0);
  const [editorInstance, setEditorInstance] = useState<Editor | null>(null);
  const [rightTab, setRightTab] = useState<RightTab>("style");
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  const handleEditor = useCallback((editor: Editor) => {
    editorRef.current = editor;
    setEditorInstance(editor);
    editor.on('component:selected', (component: Component) => setSelectedComponent(component));
    editor.on('component:deselected', () => setSelectedComponent(null));
  }, []);

  function exitPreview() {
    const editor = editorRef.current;
    if (!editor) return;
    editor.stopCommand('core:preview');
    setIsPreview(false);
  }

  function handleTogglePreview() {
    const editor = editorRef.current;
    if (!editor) return;
    if (isPreview) {
      exitPreview();
    } else {
      editor.runCommand('core:preview');
      setIsPreview(true);
    }
  }

  // Escape key always exits preview regardless of GrapesJS z-index
  useEffect(() => {
    if (!isPreview) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') exitPreview();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isPreview]);

  function handleDeleteComponent() {
    if (!selectedComponent) return;
    selectedComponent.remove();
    setSelectedComponent(null);
  }

  function handleCloneComponent() {
    const editor = editorRef.current;
    if (!editor || !selectedComponent) return;
    editor.runCommand('core:copy');
    editor.runCommand('core:paste');
  }

  function handleMoveUp() {
    if (!selectedComponent) return;
    const parent = selectedComponent.parent();
    if (!parent) return;
    const idx = parent.components().indexOf(selectedComponent);
    if (idx > 0) {
      selectedComponent.move(parent, { at: idx - 1 });
    }
  }

  function handleMoveDown() {
    if (!selectedComponent) return;
    const parent = selectedComponent.parent();
    if (!parent) return;
    const components = parent.components();
    const idx = components.indexOf(selectedComponent);
    if (idx < components.length - 1) {
      selectedComponent.move(parent, { at: idx + 2 });
    }
  }

  const tabBtn = (tab: RightTab, icon: React.ReactNode, label: string) => (
    <button
      onClick={() => setRightTab(tab)}
      className={`flex-1 flex items-center justify-center gap-1 py-2 text-xs font-medium transition-colors border-b-2 ${
        rightTab === tab
          ? "text-blue-600 border-blue-600 bg-white"
          : "text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50"
      }`}
    >
      {icon}
      {label}
    </button>
  );

  const actionBtn = "p-1.5 rounded text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors";

  return (
    <div className="flex flex-col h-screen">
      <TopBar
        editorRef={editorRef}
        editor={editorInstance}
        userEmail={userEmail}
        isPreview={isPreview}
        onTogglePreview={handleTogglePreview}
      />

      {/* Component action bar — visible only when a component is selected and not in preview */}
      {selectedComponent && !isPreview && (
        <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 border-b border-blue-200 flex-shrink-0">
          <span className="text-xs text-blue-600 font-medium mr-2">
            {selectedComponent.getName() || selectedComponent.get('tagName') || 'Phần tử'}
          </span>
          <div className="flex items-center gap-0.5 ml-auto">
            <button onClick={handleMoveUp} className={actionBtn} title="Di chuyển lên">
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button onClick={handleMoveDown} className={actionBtn} title="Di chuyển xuống">
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
            <div className="w-px h-4 bg-blue-200 mx-1" />
            <button onClick={handleCloneComponent} className={actionBtn} title="Nhân đôi">
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleDeleteComponent}
              className="p-1.5 rounded text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
              title="Xóa phần tử"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">

        {/* ── Left: Blocks panel — always mounted so GrapesJS keeps its render target ── */}
        <div
          className="w-56 flex-shrink-0 border-r border-gray-200 bg-white flex flex-col overflow-hidden"
          style={{ display: isPreview ? 'none' : 'flex' }}
        >
          <div className="px-3 py-2 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
            <LayoutGrid className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Khối nội dung</span>
          </div>
          <div id="gjs-blocks-panel" className="flex-1 overflow-y-auto" />
        </div>

        {/* ── Center: Canvas ─────────────────────────────────────────── */}
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          <GrapesEditor onEditor={handleEditor} />
        </div>

        {/* ── Right: Style / Layers / History tabs — always mounted so GrapesJS keeps its render targets ── */}
        <div
          className="w-64 flex-shrink-0 border-l border-gray-200 bg-white flex flex-col overflow-hidden"
          style={{ display: isPreview ? 'none' : 'flex' }}
        >
          {/* Tab bar */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            {tabBtn("style",   <Palette className="w-3 h-3" />,  "Kiểu dáng")}
            {tabBtn("layers",  <Layers  className="w-3 h-3" />,  "Lớp")}
            {tabBtn("history", <History className="w-3 h-3" />,  "Lịch sử")}
          </div>

          {/* Panel content */}
          <div className="flex-1 overflow-hidden relative">

            {/* Style + Traits tab */}
            <div
              className="absolute inset-0 overflow-y-auto"
              style={{ display: rightTab === "style" ? "block" : "none" }}
            >
              {!selectedComponent && (
                <p className="px-4 py-6 text-xs text-gray-400 text-center leading-relaxed">
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

      <div style={{ display: isPreview ? 'none' : 'block' }}>
        <PromptBar editorRef={editorRef} onSuccess={() => setHistoryKey(k => k + 1)} />
      </div>

      {/* Floating exit button — fixed above GrapesJS canvas overlay when in preview */}
      {isPreview && (
        <button
          onClick={exitPreview}
          className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          title="Thoát xem trước (Esc)"
        >
          <EyeOff className="w-4 h-4" />
          Thoát xem trước
        </button>
      )}
    </div>
  );
}
