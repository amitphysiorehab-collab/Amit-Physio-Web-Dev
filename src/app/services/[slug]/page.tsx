import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, ShieldCheck, Activity, Calendar } from "lucide-react";
import { servicesData } from "@/data/servicesData";
import { AppointmentForm } from "@/components/AppointmentForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | Amit Rehabilitation Centre Greater Noida`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb / Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/services"
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          <span>Back to All Services</span>
        </Link>
      </div>

      {/* Main Service Content */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content Area (8 Cols) */}
            <div className="lg:col-span-7 space-y-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200/80">
                  Specialized Rehabilitation
                </span>
                <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                  {service.title}
                </h1>
                <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  {service.fullDescription}
                </p>
              </div>

              {/* Service Hero Image */}
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-md border border-slate-100">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 640px"
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-2 rounded-xl text-xs font-bold text-slate-800 shadow-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-600" />
                  <span>Session Length: {service.sessionDuration}</span>
                </div>
              </div>

              {/* Conditions Treated */}
              <div className="bg-slate-50/70 rounded-2xl p-6 sm:p-8 border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-600" />
                  <span>Common Conditions Evaluated & Treated</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.conditions.map((item, index) => (
                    <div key={index} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Therapeutic Techniques */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-brand-600" />
                  <span>Evidence-Based Clinical Modalities</span>
                </h2>
                <ul className="space-y-3">
                  {service.techniques.map((tech, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-brand-500 mt-2 shrink-0" />
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clinical Notice */}
              <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-900">
                <strong>Medical Notice:</strong> Treatment plans are formulated strictly following individual clinical physical assessment, medical history review, and diagnostic imaging evaluation (X-ray, MRI) at our Beta 1 Greater Noida clinic.
              </div>
            </div>

            {/* Right Column: Pre-filled Appointment Enquiry (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <AppointmentForm initialServiceSlug={service.slug} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
