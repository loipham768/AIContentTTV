"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = {
  q: string;
  a: React.ReactNode;
  accent: string;
};

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map(({ q, a, accent }, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={q}
            className={`rounded-2xl border-l-4 ${accent} overflow-hidden transition-all duration-200 ${isOpen ? "bg-white shadow-lg border border-indigo-200" : "bg-white shadow-sm border border-indigo-100"}`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className={`w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 ${isOpen ? "bg-indigo-50/60" : "hover:bg-gray-50"}`}
              aria-expanded={isOpen}
            >
              <span className={`font-semibold text-sm sm:text-base leading-snug transition-colors duration-200 ${isOpen ? "text-indigo-700" : "text-gray-900"}`}>
                {q}
              </span>
              <ChevronDown
                className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${isOpen ? "rotate-180 text-indigo-500" : "text-gray-400"}`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-5 pt-1 text-sm text-gray-500 leading-relaxed space-y-2">
                  {a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
