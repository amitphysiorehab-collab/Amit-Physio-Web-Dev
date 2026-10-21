import React from "react";
import Link from "next/link";
import { FaqSection } from "@/components/FaqSection";
import { faqData } from "@/data/faqData";
import { Phone, Mail, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions | Amit Rehabilitation Centre",
  description:
    "Find answers to common questions about physical therapy, doctor referrals, session durations, clothing recommendations, and fees at Amit Rehabilitation Centre Greater Noida.",
};

export default function FaqPage() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Full FAQ Accordion matching Screenshot 1 */}
        <FaqSection items={faqData} showTitle={true} />

        {/* Still Have Questions? Banner */}
        <div className="mt-16 bg-slate-50 border border-slate-200/80 rounded-2xl p-8 sm:p-10 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Have a Specific Question About Your Condition?
          </h3>
          <p className="text-slate-500 text-sm max-w-lg mx-auto mb-6">
            Our clinical team is happy to discuss your symptoms, previous treatments, and how our specialized programs can help.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+917903992329"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-2xs hover:bg-slate-50 transition-colors"
            >
              <Phone className="w-4 h-4 text-brand-600" />
              <span>Call +91 7903992329</span>
            </a>

            <a
              href={`https://wa.me/917903992329?text=${encodeURIComponent("Hello Amit Rehabilitation Centre, I have a question regarding therapy sessions.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Ask on WhatsApp</span>
            </a>

            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 rounded-lg shadow-2xs transition-colors"
            >
              <span>Book Consultation</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
