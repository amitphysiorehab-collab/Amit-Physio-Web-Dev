import React from "react";
import { AppointmentForm } from "@/components/AppointmentForm";
import { MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Book Consultation | Amit Rehabilitation Centre Greater Noida",
  description:
    "Schedule your physical therapy consultation at Amit Rehabilitation Centre, Beta 1 Greater Noida. In-clinic and home care consultations available.",
};

export default function AppointmentPage() {
  return (
    <div className="bg-slate-50/50 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-100/70 px-3.5 py-1.5 rounded-full">
            Patient Intake & Consultation
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Schedule Your Therapy Evaluation
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-500 font-normal">
            Take the first proactive step toward pain-free movement. Complete the enquiry form below, and our clinical intake coordinator will contact you to finalize your booking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form (8 Cols) */}
          <div className="lg:col-span-8">
            <AppointmentForm />
          </div>

          {/* Right Column: Clinic Information & Guarantees (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Clinic Info Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Clinic Location & Contact
              </h2>

              <div className="flex items-start gap-3 text-sm text-slate-600">
                <MapPin className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Amit Rehabilitation Centre</p>
                  <p className="font-semibold text-slate-800">E-Block, Beta 1, Greater Noida</p>
                  <p className="text-xs text-slate-500 font-medium">Uttar Pradesh – 201308, India</p>
                  <a
                    href="https://maps.google.com/?q=E-Block+Beta+1+Greater+Noida+Uttar+Pradesh+201308"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-600 hover:text-brand-700 mt-1"
                  >
                    <span>Get Directions on Google Maps</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Phone className="w-5 h-5 text-brand-600 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">Phone</p>
                  <a href="tel:+917903992329" className="text-brand-600 hover:underline">
                    +91 7903992329
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail className="w-5 h-5 text-brand-600 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">Email</p>
                  <a href="mailto:amityadav19242906@gmail.com" className="text-brand-600 hover:underline break-all">
                    amityadav19242906@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-slate-600 pt-2 border-t border-slate-100">
                <Clock className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">Clinic Hours</p>
                  <p className="text-xs">Mon – Fri: 08:00 AM – 07:00 PM</p>
                  <p className="text-xs">Sat: 09:00 AM – 03:00 PM</p>
                  <p className="text-xs text-amber-600 font-medium">Sun: Closed (Emergency On-Call)</p>
                </div>
              </div>
            </div>

            {/* What to expect card */}
            <div className="bg-brand-50/50 rounded-2xl p-6 border border-brand-100/80 space-y-3">
              <div className="flex items-center gap-2 text-brand-700 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-brand-600" />
                <span>What to Expect at Your Intake</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
                <li>Comprehensive orthopedic/neurological baseline assessment</li>
                <li>Palpation, range-of-motion, and muscle strength analysis</li>
                <li>Personalized multi-week treatment roadmap</li>
                <li>Immediate ergonomic guidance & home exercise routine</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
