"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FaqItem } from "@/types";

interface FaqSectionProps {
  items: FaqItem[];
  limit?: number;
  showTitle?: boolean;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  items,
  limit,
  showTitle = true,
}) => {
  // Default first item open to mirror Screenshot 1
  const [openIds, setOpenIds] = useState<string[]>(["faq-1"]);

  const displayedItems = limit ? items.slice(0, limit) : items;

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-20 bg-white content-auto" aria-labelledby="faq-main-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="text-center mb-14">
            <h2
              id="faq-main-heading"
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
            >
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-500 font-normal">
              Common questions about starting therapy, session durations, and what to expect.
            </p>
          </div>
        )}

        {/* Accordion list matching Screenshot 1 */}
        <div className="space-y-4">
          {displayedItems.map((item) => {
            const isOpen = openIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-brand-50/50 border-brand-200 shadow-sm"
                    : "bg-white border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between px-6 sm:px-8 py-5 text-left focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-1 rounded-2xl"
                >
                  <span
                    className={`text-base sm:text-lg font-semibold transition-colors ${
                      isOpen ? "text-brand-500 font-bold" : "text-slate-800"
                    }`}
                  >
                    {item.question}
                  </span>
                  <span className="ml-4 shrink-0 text-slate-500">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-brand-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed animate-fadeIn">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
