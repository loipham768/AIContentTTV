"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Loader2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Send,
  Pencil,
  Info,
  FileText,
  Briefcase,
  BookOpen,
  CalendarDays,
  Receipt,
  BarChart2,
} from "lucide-react";
import Logo from "@/components/Logo";

interface GeminiMessage {
  role: "user" | "model";
  parts: [{ text: string }];
}

interface DisplayPair {
  question: string;
  answer: string;
}

interface CurrentQuestion {
  question: string;
  hint?: string;
  options: string[];
  items?: string[];
  isConfirm?: boolean;
}

type Phase = "initial" | "questioning" | "generating" | "done" | "error";

type ContentTypeId = "report" | "proposal" | "case-study" | "meeting" | "quotation";

type SampleItem = { text: string; desc: string };

const CONTENT_META: Record<
  ContentTypeId,
  { label: string; desc: string; icon: React.ReactNode }
> = {
  report: {
    label: "Report",
    desc: "Business, financial & KPI reports",
    icon: <BarChart2 className="w-5 h-5" />,
  },
  proposal: {
    label: "Proposal",
    desc: "Project & business proposals",
    icon: <Briefcase className="w-5 h-5" />,
  },
  "case-study": {
    label: "Case Study",
    desc: "Client success stories",
    icon: <BookOpen className="w-5 h-5" />,
  },
  meeting: {
    label: "Meeting Minutes",
    desc: "Meeting records & action items",
    icon: <CalendarDays className="w-5 h-5" />,
  },
  quotation: {
    label: "Quotation",
    desc: "Price quotes & one-pagers",
    icon: <Receipt className="w-5 h-5" />,
  },
};

const CONTENT_POOL: Record<ContentTypeId, SampleItem[]> = {
  report: [
    { text: "June 2025 sales performance report for a fashion retailer", desc: "Sales" },
    { text: "Q2 2025 financial report for investor presentation", desc: "Finance" },
    { text: "Q2 F&B industry market analysis report", desc: "Market Analysis" },
    { text: "May performance report for a Facebook Ads marketing campaign", desc: "Marketing" },
    { text: "HR report: recruitment, attrition, and training Q1/2025", desc: "HR" },
    { text: "2024 annual business results and 2025 growth plan", desc: "Annual" },
    { text: "Competitor analysis report for the e-commerce industry", desc: "Competitor" },
    { text: "IT project summary report for internal management system", desc: "IT Project" },
    { text: "Q2 ROI analysis report for digital marketing channels", desc: "ROI" },
    { text: "Customer satisfaction survey results after product launch", desc: "CSAT" },
  ],
  proposal: [
    { text: "Project proposal for building a mobile app for a retail client", desc: "Mobile App" },
    { text: "Website development proposal for an e-commerce startup", desc: "Web Dev" },
    { text: "Digital marketing campaign proposal for a product launch", desc: "Marketing" },
    { text: "Office interior renovation proposal for a corporate client", desc: "Interior" },
    { text: "IT infrastructure upgrade proposal for a manufacturing company", desc: "IT" },
    { text: "Partnership proposal for co-branding collaboration", desc: "Partnership" },
    { text: "ERP implementation proposal for a mid-size enterprise", desc: "ERP" },
    { text: "Training program proposal for new employee onboarding", desc: "HR" },
  ],
  "case-study": [
    { text: "How we helped a retail chain increase online sales by 40%", desc: "Retail" },
    { text: "Digital transformation case study for a manufacturing company", desc: "Manufacturing" },
    { text: "Case study: reducing supply chain costs by 25% with automation", desc: "Logistics" },
    { text: "Customer success story: scaling from 100 to 10,000 users", desc: "SaaS" },
    { text: "Case study: CRM implementation for a nationwide retail chain", desc: "CRM" },
    { text: "How a marketing agency tripled client ROI in 6 months", desc: "Marketing" },
    { text: "Case study: migrating legacy systems to cloud infrastructure", desc: "Cloud" },
  ],
  meeting: [
    { text: "Board meeting — Q2 2025 business review and strategy update", desc: "Board" },
    { text: "Project kickoff meeting for new ERP implementation", desc: "Project" },
    { text: "Weekly product team sync — sprint planning and blockers", desc: "Product" },
    { text: "Client meeting — project requirements and scope discussion", desc: "Client" },
    { text: "Annual strategy planning meeting — management team", desc: "Strategy" },
    { text: "Post-mortem meeting — analysis of Q2 campaign results", desc: "Retrospective" },
    { text: "Vendor evaluation meeting — software procurement decision", desc: "Procurement" },
  ],
  quotation: [
    { text: "Quotation for website design and development services", desc: "Web Dev" },
    { text: "Digital marketing monthly retainer service quotation", desc: "Marketing" },
    { text: "Equipment supply quotation for manufacturing plant expansion", desc: "Equipment" },
    { text: "One-pager: B2B SaaS product overview and pricing tiers", desc: "SaaS" },
    { text: "IT consulting and support service quotation", desc: "IT" },
    { text: "Corporate training program quotation and package details", desc: "Training" },
    { text: "Branding and visual identity service pricing proposal", desc: "Branding" },
  ],
};

function shufflePick(items: SampleItem[], n: number): SampleItem[] {
  return [...items].sort(() => Math.random() - 0.5).slice(0, n);
}

const CONTENT_TYPE_IDS: ContentTypeId[] = ["report", "proposal", "case-study", "meeting", "quotation"];

export default function CreatePageClient({
  plan: _plan = "pro",
}: {
  plan?: string;
}) {
  const router = useRouter();

  const [messages, setMessages] = useState<GeminiMessage[]>([]);
  const [history, setHistory] = useState<DisplayPair[]>([]);
  const [current, setCurrent] = useState<CurrentQuestion | null>(null);
  const [custom, setCustom] = useState("");
  const [initialPrompt, setInitialPrompt] = useState("");

  const [phase, setPhase] = useState<Phase>("initial");
  const [errorMsg, setErrorMsg] = useState("");
  const [projectId, setProjectId] = useState<string | null>(null);
  const [longWait, setLongWait] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const longWaitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [selectedType, setSelectedType] = useState<ContentTypeId | null>(null);
  const [displayedSamples, setDisplayedSamples] = useState<SampleItem[]>([]);
  const [initialInput, setInitialInput] = useState("");
  const [blankLoading, setBlankLoading] = useState(false);
  const [blankError, setBlankError] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const customInputRef = useRef<HTMLTextAreaElement>(null);
  const initialInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, current, phase]);

  async function sendAnswer(answerText: string, currentQ: CurrentQuestion) {
    const trimmed = answerText.trim();
    if (!trimmed) return;

    setHistory((prev) => [
      ...prev,
      { question: currentQ.question, answer: trimmed },
    ]);
    setCurrent(null);
    setCustom("");

    const modelJson = currentQ.isConfirm
      ? JSON.stringify({
          type: "confirm",
          question: currentQ.question,
          items: currentQ.items ?? [],
          options: currentQ.options,
        })
      : JSON.stringify({
          type: "question",
          question: currentQ.question,
          ...(currentQ.hint ? { hint: currentQ.hint } : {}),
          options: currentQ.options,
        });

    const modelMsg: GeminiMessage = {
      role: "model",
      parts: [{ text: modelJson }],
    };
    const userMsg: GeminiMessage = { role: "user", parts: [{ text: trimmed }] };
    const updatedMessages = [...messages, modelMsg, userMsg];
    setMessages(updatedMessages);
    setPhase("questioning");
    setErrorMsg("");
    await callGemini(updatedMessages);
  }

  async function sendInitial(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setInitialPrompt(trimmed);
    setPhase("questioning");
    setErrorMsg("");
    const userMsg: GeminiMessage = { role: "user", parts: [{ text: trimmed }] };
    const newMessages = [userMsg];
    setMessages(newMessages);
    await callGemini(newMessages);
  }

  async function callGemini(msgs: GeminiMessage[]) {
    setLongWait(false);
    longWaitTimer.current = setTimeout(() => setLongWait(true), 5000);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: msgs,
          initialPrompt,
          contentType: selectedType ?? undefined,
        }),
      });

      const data = await res.json();

      if (longWaitTimer.current) {
        clearTimeout(longWaitTimer.current);
        longWaitTimer.current = null;
      }
      setLongWait(false);

      if (!res.ok) {
        setErrorMsg(data.error ?? "An error occurred. Please try again.");
        setPhase("error");
        return;
      }

      if (data.type === "question") {
        setCurrent({
          question: data.question,
          hint: data.hint,
          options: data.options ?? [],
        });
        setPhase("questioning");
        setTimeout(() => customInputRef.current?.focus(), 150);
        return;
      }

      if (data.type === "confirm") {
        setCurrent({
          question: data.question,
          options: data.options ?? ["Generate content now!"],
          items: data.items ?? [],
          isConfirm: true,
        });
        setPhase("questioning");
        setTimeout(() => customInputRef.current?.focus(), 150);
        return;
      }

      if (data.type === "html") {
        setProjectId(data.projectId ?? null);
        setPhase("done");
        return;
      }

      if (data.type === "error") {
        setErrorMsg(data.content ?? "An error occurred. Please try again.");
        setPhase("error");
        return;
      }

      setErrorMsg("Invalid response. Please try again.");
      setPhase("error");
    } catch {
      if (longWaitTimer.current) {
        clearTimeout(longWaitTimer.current);
        longWaitTimer.current = null;
      }
      setLongWait(false);
      setErrorMsg("Cannot connect to server. Please try again.");
      setPhase("error");
    }
  }

  function handleTypeClick(typeId: ContentTypeId) {
    if (selectedType === typeId) {
      setSelectedType(null);
      setDisplayedSamples([]);
    } else {
      setSelectedType(typeId);
      setDisplayedSamples(shufflePick(CONTENT_POOL[typeId], 5));
    }
  }

  function handleOptionClick(option: string) {
    if (!current) return;
    sendAnswer(option, current);
  }

  function handleCustomSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!current || !custom.trim()) return;
    sendAnswer(custom, current);
  }

  function handleCustomKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (current && custom.trim()) sendAnswer(custom, current);
    }
  }

  function handleInitialKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (initialInput.trim()) sendInitial(initialInput);
    }
  }

  function handleReset() {
    setMessages([]);
    setHistory([]);
    setCurrent(null);
    setCustom("");
    setInitialPrompt("");
    setProjectId(null);
    setPhase("initial");
    setErrorMsg("");
    setSelectedType(null);
    setDisplayedSamples([]);
    setInitialInput("");
    setTimeout(() => initialInputRef.current?.focus(), 100);
  }

  async function handleOpenBlankEditor() {
    if (blankLoading) return;
    setBlankLoading(true);
    setBlankError("");
    try {
      const res = await fetch("/api/projects/blank", { method: "POST" });
      if (!res.ok) {
        setBlankError("An error occurred. Please try again.");
        return;
      }
      const { projectId: pid } = await res.json();
      router.push(`/editor?project=${pid}`);
    } catch {
      setBlankError("Connection error. Please try again.");
    } finally {
      setBlankLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col">
      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 flex-shrink-0">
        <Logo iconSize={44} uid="create-logo" dark iconOnly />
        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenBlankEditor}
            disabled={blankLoading}
            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {blankLoading ? "Creating..." : "Blank Editor"}
            </span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-2xl w-full mx-auto px-4 py-8 overflow-hidden">
        {/* ── Initial screen ── */}
        {phase === "initial" && (
          <div className="flex flex-col items-center flex-1">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                AI-powered business documents
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
                What document do you need?
              </h1>
              <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                Choose a type below — AI will ask the right questions and generate a professional document
              </p>
            </div>

            {/* content type selector */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
              {CONTENT_TYPE_IDS.map((typeId) => {
                const meta = CONTENT_META[typeId];
                const active = selectedType === typeId;
                return (
                  <button
                    key={typeId}
                    onClick={() => handleTypeClick(typeId)}
                    className={[
                      "text-left px-4 py-5 rounded-2xl border transition-all flex flex-col gap-2",
                      active
                        ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                        : "bg-white/[0.03] border-white/[0.08] text-slate-400 hover:bg-white/[0.07] hover:border-white/[0.14] hover:text-slate-200",
                    ].join(" ")}
                  >
                    <span className={active ? "text-white" : "text-indigo-400"}>
                      {meta.icon}
                    </span>
                    <div>
                      <div className="text-base font-bold leading-tight mb-0.5">
                        {meta.label}
                      </div>
                      <div
                        className={`text-xs leading-tight ${active ? "text-indigo-200" : "text-slate-500"}`}
                      >
                        {meta.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Sample prompts */}
            {selectedType && displayedSamples.length > 0 && (
              <div className="w-full space-y-1.5 mb-4">
                {displayedSamples.map((sample, i) => (
                  <button
                    key={i}
                    onClick={() => sendInitial(sample.text)}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-indigo-600/20 hover:border-indigo-500/30 transition-all flex items-baseline gap-2 group"
                  >
                    <span className="text-sm text-slate-200 group-hover:text-white flex-1 transition-colors">
                      {sample.text}
                    </span>
                    <span className="text-xs text-slate-500 flex-shrink-0">
                      {sample.desc}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-4">
              <textarea
                ref={initialInputRef}
                autoFocus
                value={initialInput}
                onChange={(e) => setInitialInput(e.target.value)}
                placeholder={
                  selectedType
                    ? "Don't see a fitting suggestion? Enter your request here..."
                    : "Enter your request here, or choose a content type above"
                }
                rows={5}
                maxLength={5000}
                onKeyDown={handleInitialKeyDown}
                className="w-full resize-none bg-transparent text-white text-sm placeholder:text-slate-500 focus:outline-none leading-relaxed"
              />
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                <span className="text-xs text-slate-500">
                  Enter to submit · Shift+Enter for new line
                </span>
                <button
                  onClick={() => {
                    if (initialInput.trim()) sendInitial(initialInput);
                  }}
                  disabled={!initialInput.trim()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-semibold transition-all"
                >
                  <Send className="w-3 h-3" />
                  Start
                </button>
              </div>
            </div>

            {blankError && (
              <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {blankError}
              </p>
            )}

            <div className="w-full mt-3 flex items-start gap-2 px-1">
              <Info className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-500 leading-relaxed">
                AI will generate ~80% of the content based on your input. Once
                done, you can freely edit in the editor.
              </p>
            </div>
          </div>
        )}

        {/* ── Conversation ── */}
        {phase !== "initial" && (
          <div className="flex flex-col flex-1 overflow-hidden">
            {initialPrompt && (
              <div className="flex justify-end mb-4 flex-shrink-0">
                <div className="max-w-[80%] bg-indigo-600 text-white text-sm rounded-2xl rounded-br-sm px-4 py-2.5 leading-relaxed">
                  {initialPrompt}
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto space-y-5 mb-4 pr-1">
              {history.map((pair, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-white/[0.06] border border-white/10 text-slate-200 text-sm rounded-2xl rounded-tl-sm px-4 py-2.5 leading-relaxed max-w-[85%]">
                      {pair.question}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[75%] bg-indigo-600 text-white text-sm rounded-2xl rounded-br-sm px-4 py-2.5 leading-relaxed">
                      {pair.answer}
                    </div>
                  </div>
                </div>
              ))}

              {(phase === "questioning" && !current) ||
              phase === "generating" ? (
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
                        Please wait! Content is being generated...
                      </p>
                    )}
                  </div>
                </div>
              ) : null}

              {phase === "done" && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm rounded-2xl rounded-tl-sm px-4 py-3 space-y-1.5">
                      <p className="font-medium">Content has been generated!</p>
                      <p className="text-emerald-400/80 text-xs leading-relaxed">
                        This is a ~80% draft based on your input. Open the
                        editor to refine and finalize.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (isNavigating) return;
                      setIsNavigating(true);
                      router.push(
                        projectId ? `/editor?project=${projectId}` : "/editor",
                      );
                    }}
                    disabled={isNavigating}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]"
                  >
                    {isNavigating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Opening...
                      </>
                    ) : (
                      <>
                        Open Editor <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 text-sm transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Start New
                  </button>
                </div>
              )}

              {phase === "error" && (
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
                    Start Over
                  </button>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Current question card */}
            {current && phase === "questioning" && (
              <div className="flex-shrink-0 space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="flex-1">
                    {current.isConfirm &&
                      current.items &&
                      current.items.length > 0 && (
                        <ul className="mb-2 space-y-1">
                          {current.items.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-1.5 text-sm text-slate-300 leading-snug"
                            >
                              <span className="text-indigo-400 mt-0.5 flex-shrink-0">
                                •
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    <p className="text-white text-sm font-medium leading-relaxed">
                      {current.question}
                    </p>
                    {current.hint && (
                      <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                        {current.hint}
                      </p>
                    )}
                  </div>
                </div>

                {current.options.length > 0 && (
                  <div className="flex flex-wrap gap-2 pl-9">
                    {current.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(opt)}
                        className={[
                          "px-4 py-2 rounded-xl border text-sm transition-all active:scale-[0.97]",
                          current.isConfirm && i === 0
                            ? "bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500"
                            : "bg-white/[0.06] border-white/10 hover:bg-indigo-600 hover:border-indigo-500 text-slate-200 hover:text-white",
                        ].join(" ")}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                <div className="pl-9 space-y-1.5">
                  {current.options.length > 0 && (
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <span className="inline-block w-3 h-px bg-slate-600" />
                      Or type your own answer
                    </p>
                  )}
                  <form
                    onSubmit={handleCustomSubmit}
                    className="flex items-end gap-2"
                  >
                    <textarea
                      ref={customInputRef}
                      value={custom}
                      onChange={(e) => setCustom(e.target.value)}
                      onKeyDown={handleCustomKeyDown}
                      placeholder={
                        current.options.length > 0
                          ? "Enter your answer..."
                          : "Enter your answer..."
                      }
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
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
