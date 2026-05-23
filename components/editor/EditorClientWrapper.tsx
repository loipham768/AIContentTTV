"use client";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { Editor } from "grapesjs";
import { Loader2, LayoutGrid, Palette, Layers, History } from "lucide-react";
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

  function handleEditor(editor: Editor) {
    editorRef.current = editor;
    setEditorInstance(editor);
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

  return (
    <div className="flex flex-col h-screen">
      <TopBar editorRef={editorRef} editor={editorInstance} userEmail={userEmail} />

      <div className="flex flex-1 overflow-hidden">

        {/* ── Left: Blocks panel ─────────────────────────────────────── */}
        <div className="w-56 flex-shrink-0 border-r border-gray-200 bg-white flex flex-col overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
            <LayoutGrid className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Khối nội dung</span>
          </div>
          {/* GrapesJS block manager renders here */}
          <div id="gjs-blocks-panel" className="flex-1 overflow-y-auto" />
        </div>

        {/* ── Center: Canvas ─────────────────────────────────────────── */}
        <div className="flex flex-col flex-1 overflow-hidden min-w-0">
          <GrapesEditor onEditor={handleEditor} />
        </div>

        {/* ── Right: Style / Layers / History tabs ───────────────────── */}
        <div className="w-64 flex-shrink-0 border-l border-gray-200 bg-white flex flex-col overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            {tabBtn("style",   <Palette className="w-3 h-3" />,  "Kiểu dáng")}
            {tabBtn("layers",  <Layers  className="w-3 h-3" />,  "Lớp")}
            {tabBtn("history", <History className="w-3 h-3" />,  "Lịch sử")}
          </div>

          {/* Panel content — all three mounted; CSS hides inactive ones */}
          <div className="flex-1 overflow-hidden relative">

            {/* Style + Traits tab */}
            <div
              className="absolute inset-0 overflow-y-auto"
              style={{ display: rightTab === "style" ? "block" : "none" }}
            >
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

      <PromptBar editorRef={editorRef} onSuccess={() => setHistoryKey(k => k + 1)} />
    </div>
  );
}
