import React from "react";
import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck } from "lucide-react";
import { AppointmentForm } from "@/components/AppointmentForm";

export const metadata = {
  title: "Contact Us | Amit Rehabilitation Centre Greater Noida",
  description:
    "Get in touch with Amit Rehabilitation Centre at E-Block, Beta 1, Greater Noida. Call +91 7903992329 or book your physiotherapy consultation online.",
};

export default function ContactPage() {
  return (
    <div className="bg-white py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200/80">
            Get in Touch
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Contact Amit Rehabilitation Centre
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-500 font-normal">
            We are here to answer your questions, assist with clinical appointments, and guide your journey to pain-free mobility.
          </p>
        </div>

        {/* 3 Contact Detail Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1: Address */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm flex flex-col items-center text-center hover:border-brand-300 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5 shadow-2xs">
              <MapPin className="w-7 h-7" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Visit Our Clinic</h2>
            <p className="text-sm font-bold text-slate-900">E-Block, Beta 1, Greater Noida</p>
            <p className="text-xs text-slate-600 font-medium mt-1">Uttar Pradesh – 201308, India</p>
            <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-[11px] font-semibold text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Ground Floor • Wheelchair Accessible</span>
            </div>
            <a
              href="https://maps.google.com/?q=E-Block+Beta+1+Greater+Noida+Uttar+Pradesh+201308"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-xs font-bold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1 group"
            >
              <span>Get Directions on Google Maps</span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>

          {/* Card 2: Phone & WhatsApp */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5">
              <Phone className="w-7 h-7" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Call & WhatsApp</h2>
            <a
              href="tel:+917903992329"
              className="text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors"
            >
              +91 7903992329
            </a>
            <p className="text-xs text-slate-500 mt-1">Direct Clinic Reception</p>
            <a
              href={`https://wa.me/917903992329?text=${encodeURIComponent("Hello Amit Rehabilitation Centre, I would like to inquire about consultation availability.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Card 3: Email & Inquiries */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5">
              <Mail className="w-7 h-7" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Email Inquiries</h2>
            <a
              href="mailto:amityadav19242906@gmail.com"
              className="text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors break-all"
            >
              amityadav19242906@gmail.com
            </a>
            <p className="text-xs text-slate-500 mt-1">24-hour response turnaround</p>
            <p className="text-xs text-slate-400 mt-2">Reports & Medical Referrals</p>
          </div>
        </div>

        {/* Operating Hours and Appointment Form Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <AppointmentForm />
          </div>

          <div className="lg:col-span-5 space-y-8">
            {/* Hours card */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-600" />
                <span>Clinic Operating Schedule</span>
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="font-semibold text-slate-700">Monday – Friday</span>
                  <span className="text-slate-600">08:00 AM – 07:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="font-semibold text-slate-700">Saturday</span>
                  <span className="text-slate-600">09:00 AM – 03:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="font-semibold text-slate-700">Sunday</span>
                  <span className="text-amber-600 font-medium">Closed (Emergency On-Call)</span>
                </div>
              </div>
            </div>

            {/* Directions & Accessibility card */}
            <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200/80 space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Facility & Accessibility Highlights</span>
              </h2>
              <ul className="text-xs text-slate-600 space-y-2.5 list-disc list-inside">
                <li>Ground-floor clinic access with wheelchair ramp.</li>
                <li>Dedicated street and patient visitor parking.</li>
                <li>Climate-controlled exercise gym with parallel rehabilitation walking bars.</li>
                <li>Strict hygiene and sanitation between every patient appointment.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
