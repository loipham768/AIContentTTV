"use client";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { Editor } from "grapesjs";
import { Loader2 } from "lucide-react";
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

interface EditorClientWrapperProps { userEmail: string; }

export default function EditorClientWrapper({ userEmail }: EditorClientWrapperProps) {
  const editorRef = useRef<Editor | null>(null);
  const [historyKey, setHistoryKey] = useState(0);
  const [editorInstance, setEditorInstance] = useState<Editor | null>(null);

  function handleEditor(editor: Editor) {
    editorRef.current = editor;
    setEditorInstance(editor);
  }

  return (
    <div className="flex flex-col h-screen">
      <TopBar editorRef={editorRef} editor={editorInstance} userEmail={userEmail} />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 overflow-hidden">
          <GrapesEditor onEditor={handleEditor} />
        </div>
        <HistoryPanel editorRef={editorRef} refreshKey={historyKey} />
      </div>
      <PromptBar editorRef={editorRef} onSuccess={() => setHistoryKey(k => k + 1)} />
    </div>
  );
}
