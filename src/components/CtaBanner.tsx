import React from "react";
import Link from "next/link";

export const CtaBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-24 bg-[#fbfcfd] border-y border-slate-100 content-auto" aria-label="Book Consultation Call to Action">
      {/* Left abstract geometric circles & dot matrix matching Screenshot 4 */}
      <div className="absolute left-[-40px] top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block">
        <svg
          width="260"
          height="260"
          viewBox="0 0 260 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Cyan decorative soft circles */}
          <circle cx="90" cy="110" r="70" fill="#bae6fd" opacity="0.4" />
          <circle cx="160" cy="80" r="50" fill="#7dd3fc" opacity="0.3" />
          <circle cx="10" cy="170" r="60" fill="#38bdf8" opacity="0.2" />

          {/* Dot grid matrix */}
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 5 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={90 + col * 18}
                cy={70 + row * 18}
                r="3"
                fill="#38bdf8"
                opacity="0.5"
              />
            ))
          )}
        </svg>
      </div>

      {/* Right abstract concentric dashed circles & dots matching Screenshot 4 */}
      <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block">
        <svg
          width="280"
          height="280"
          viewBox="0 0 280 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Concentric dashed rings */}
          <circle
            cx="170"
            cy="140"
            r="110"
            stroke="#94a3b8"
            strokeWidth="2.5"
            strokeDasharray="6 8"
            opacity="0.4"
          />
          <circle
            cx="170"
            cy="140"
            r="85"
            stroke="#64748b"
            strokeWidth="2"
            strokeDasharray="5 7"
            opacity="0.45"
          />
          <circle
            cx="170"
            cy="140"
            r="60"
            stroke="#475569"
            strokeWidth="2"
            strokeDasharray="4 6"
            opacity="0.5"
          />
          <circle
            cx="170"
            cy="140"
            r="35"
            stroke="#334155"
            strokeWidth="2"
            strokeDasharray="3 5"
            opacity="0.6"
          />

          {/* Soft dot pattern */}
          {Array.from({ length: 5 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
              <circle
                key={`r-${row}-${col}`}
                cx={80 + col * 16}
                cy={180 + row * 16}
                r="2.5"
                fill="#fed7aa"
                opacity="0.4"
              />
            ))
          )}
        </svg>
      </div>

      {/* Center Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Start Your Recovery Journey Today
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-normal">
          Over 2,000 patients have regained mobility, confidence, and comfort with our dedicated care team.
        </p>

        <div className="mt-10">
          <Link
            href="/appointment"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-lg shadow-sm hover:shadow transition-all active:scale-[0.98]"
          >
            Book Your Initial Consultation
          </Link>
        </div>
      </div>
    </section>
  );
};
