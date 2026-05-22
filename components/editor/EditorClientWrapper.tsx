"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { Editor } from "grapesjs";
import TopBar from "@/components/editor/TopBar";
import PromptBar from "@/components/editor/PromptBar";

// MANDATORY per CLAUDE.md: GrapesJS must always be dynamically imported with ssr: false
const GrapesEditor = dynamic(() => import("@/components/editor/GrapesEditor"), {
  ssr: false,
});

// HistoryPanel uses browser APIs (fetch, window.confirm) — dynamic import keeps SSR clean
const HistoryPanel = dynamic(() => import("@/components/editor/HistoryPanel"), {
  ssr: false,
});

interface EditorClientWrapperProps {
  userEmail: string;
}

export default function EditorClientWrapper({
  userEmail,
}: EditorClientWrapperProps) {
  const editorRef = useRef<Editor | null>(null);
  const [historyKey, setHistoryKey] = useState(0);

  function handleEditor(editor: Editor) {
    editorRef.current = editor;
  }

  return (
    <div className="flex flex-col h-screen">
      <TopBar editorRef={editorRef} userEmail={userEmail} />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 overflow-hidden">
          <GrapesEditor onEditor={handleEditor} />
        </div>
        <HistoryPanel editorRef={editorRef} refreshKey={historyKey} />
      </div>
      <PromptBar
        editorRef={editorRef}
        onSuccess={() => setHistoryKey(k => k + 1)}
      />
    </div>
  );
}
