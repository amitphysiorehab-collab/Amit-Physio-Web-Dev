import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Clock, Calendar } from "lucide-react";
import { servicesData } from "@/data/servicesData";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata = {
  title: "Clinical Services | Amit Rehabilitation Centre",
  description:
    "Comprehensive physical therapy services including orthopedic rehabilitation, neuro-rehabilitation, sports injury recovery, spine alignment, and senior care in Greater Noida.",
};

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-brand-50/50 via-white to-white py-16 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-100/60 px-3 py-1 rounded-full">
            Evidence-Based Care
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Rehabilitation Programs
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-normal">
            Specialized physical therapy pathways tailored to your orthopedic, neurological, athletic, and mobility goals.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {servicesData.map((service, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12"
                >
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-5 relative h-64 sm:h-80 lg:h-auto min-h-[260px] ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 480px"
                      className="object-cover"
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 shadow-sm flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-600" />
                      <span>{service.sessionDuration}</span>
                    </div>
                  </div>

                  {/* Text Column */}
                  <div
                    className={`lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                        {service.title}
                      </h2>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                        {service.fullDescription}
                      </p>

                      <div className="mb-6">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                          Key Conditions Treated:
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.conditions.slice(0, 4).map((cond, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                              <span>{cond}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors"
                      >
                        <span>Read Full Program Details</span>
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Link>

                      <Link
                        href={`/appointment?service=${encodeURIComponent(service.slug)}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 rounded-lg shadow-sm transition-all"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Enquire for this Service</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
