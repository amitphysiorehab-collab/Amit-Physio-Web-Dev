import React from "react";

export const WhyTrustUs: React.FC = () => {
  const features = [
    {
      title: "Tailored Recovery Plans",
      description:
        "Every condition is unique. We evaluate your functional baseline to create a targeted recovery roadmap.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-brand-500"
          aria-hidden="true"
        >
          {/* Wheelchair accessible / mobility icon */}
          <circle cx="12" cy="4" r="2" />
          <path d="m18 19 1-7-6 1" />
          <path d="m5 8 3-3 5.5 3-2.36 3.5" />
          <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
          <path d="M13.76 17.5a5 5 0 0 0-1.76-7.5" />
        </svg>
      ),
    },
    {
      title: "Licensed Specialists",
      description:
        "Our clinicians hold certified credentials in orthopedics, neuro-rehab, and sports injury recovery.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-brand-500"
          aria-hidden="true"
        >
          {/* Pulse / Heartbeat in heart icon */}
          <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
          <path d="M12 7v4l2.5 2.5" />
        </svg>
      ),
    },
    {
      title: "Patient-First Care",
      description:
        "We listen, support, and adjust every step of your therapy to ensure comfort and sustainable well-being.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-brand-500"
          aria-hidden="true"
        >
          {/* Heart with supportive embrace */}
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          <path d="M8 12h8" stroke="#ffffff" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-slate-50/50 content-auto" aria-labelledby="why-trust-us-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching Screenshot 2 */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            id="why-trust-us-heading"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Why Patients Trust Us
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-500 font-normal">
            Dedicated to compassionate rehabilitation, measurable progress, and lasting results.
          </p>
        </div>

        {/* 3 Rounded Cards matching Screenshot 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group"
            >
              {/* Light blue circular icon badge */}
              <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center mb-8 group-hover:scale-105 transition-transform">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
