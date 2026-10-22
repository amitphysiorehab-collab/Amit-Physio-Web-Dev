import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Sparkles, Activity } from "lucide-react";
import { WhyTrustUs } from "@/components/WhyTrustUs";
import { OperatingHours } from "@/components/OperatingHours";
import { CtaBanner } from "@/components/CtaBanner";
import { FaqSection } from "@/components/FaqSection";
import { servicesData } from "@/data/servicesData";
import { faqData } from "@/data/faqData";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-brand-50/40 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-600 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Premier Physical Therapy in Greater Noida</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Restore Movement. <br />
                Rebuild Strength. <br />
                <span className="text-brand-500">Live Stronger.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Dedicated rehabilitation care at E-Block, Beta 1, Greater Noida. We combine certified clinical expertise, tailored exercises, and compassionate support to help you overcome pain and regain functional freedom.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/appointment"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 rounded-lg shadow-sm hover:shadow transition-all active:scale-[0.98]"
                >
                  Book Your Initial Consultation
                </Link>
                <Link
                  href="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4 ml-2 text-slate-400" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">Certified Clinicians</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">Evidence Protocols</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">One-on-One Care</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative h-[360px] sm:h-[420px] rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                  <Image
                    src="/images/amit-hero.jpg"
                    alt="Dr. Amit at Amit Rehabilitation Centre"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 480px"
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
                  
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-xs font-semibold text-brand-300">E-Block, Beta 1, Greater Noida</p>
                    <p className="text-base font-bold">Empowering patients with personalized therapy plans</p>
                  </div>
                </div>

                {/* Floating pill badge */}
                <div className="absolute -top-4 -right-4 bg-white px-4 py-2.5 rounded-xl shadow-md border border-slate-100 flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-800">Now Accepting New Patients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Patients Trust Us (Screenshot 2 exact match) */}
      <WhyTrustUs />

      {/* Services Overview Grid */}
      <section className="py-20 bg-white content-auto" aria-labelledby="services-section-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2
              id="services-section-heading"
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
            >
              Specialized Rehabilitation Services
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-500 font-normal">
              Targeted therapy solutions designed around your diagnosis, functional capacity, and personal lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-7 flex flex-col justify-between hover:border-brand-300 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-medium">
                    {service.sessionDuration}
                  </span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-brand-600 hover:text-brand-700 hover:bg-brand-50/50 rounded-lg transition-colors border border-brand-200"
            >
              <span>View All Clinical Programs</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Clinic Operating Hours (Screenshot 5 exact match) */}
      <OperatingHours />

      {/* Start Your Recovery Journey Today (Screenshot 4 exact match) */}
      <CtaBanner />

      {/* Frequently Asked Questions (Screenshot 1 exact match) */}
      <FaqSection items={faqData} limit={4} />
    </div>
  );
}
