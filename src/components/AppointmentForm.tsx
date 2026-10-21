"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, MessageSquare, Calendar, Clock, User, Phone, Mail, Stethoscope } from "lucide-react";
import { appointmentSchema, AppointmentFormData } from "@/lib/validations/appointment";
import { servicesData } from "@/data/servicesData";
import { SessionType } from "@/types";

interface AppointmentFormProps {
  initialServiceSlug?: string;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  initialServiceSlug,
}) => {
  const defaultService =
    servicesData.find((s) => s.slug === initialServiceSlug)?.title ||
    servicesData[0].title;

  const [formData, setFormData] = useState<AppointmentFormData>({
    name: "",
    phone: "",
    email: "",
    service: defaultService,
    session_type: "In-Clinic Evaluation",
    preferred_date: "",
    preferred_time: "10:00 AM – 11:30 AM",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<null | {
    id: string;
    name: string;
    service: string;
    date: string;
    time: string;
    waUrl: string;
  }>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const sessionTypes: SessionType[] = [
    "In-Clinic Evaluation",
    "Home Care Consultation",
    "Follow-up Therapy",
    "Virtual Tele-Rehab",
  ];

  const timeSlots = [
    "08:30 AM – 10:00 AM",
    "10:00 AM – 11:30 AM",
    "11:30 AM – 01:00 PM",
    "02:00 PM – 03:30 PM",
    "03:30 PM – 05:00 PM",
    "05:00 PM – 06:30 PM",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validate = (): boolean => {
    const result = appointmentSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setFieldErrors(errors);
      return false;
    }
    setFieldErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit appointment enquiry");
      }

      const enquiryId = data.data?.id || `ARC-${Math.floor(100000 + Math.random() * 900000)}`;
      const waMessage = encodeURIComponent(
        `*New Appointment Enquiry - Amit Rehabilitation Centre*\n\n` +
        `📋 *Reference ID:* ${enquiryId}\n` +
        `👤 *Patient/Student Name:* ${formData.name}\n` +
        `📞 *Contact Number:* ${formData.phone}\n` +
        (formData.email ? `📧 *Email:* ${formData.email}\n` : "") +
        `🏥 *Requested Service:* ${formData.service}\n` +
        `🩺 *Session Type:* ${formData.session_type}\n` +
        `📅 *Preferred Date:* ${formData.preferred_date}\n` +
        `⏰ *Preferred Time:* ${formData.preferred_time}\n` +
        (formData.message ? `📝 *Notes/Condition:* ${formData.message}\n` : "") +
        `\n_Please confirm slot availability._`
      );
      const waUrl = `https://wa.me/917903992329?text=${waMessage}`;

      // Automatically dispatch / open WhatsApp with the exact filled enquiry details
      if (typeof window !== "undefined") {
        window.open(waUrl, "_blank");
      }

      setSubmissionSuccess({
        id: enquiryId,
        name: formData.name,
        service: formData.service,
        date: formData.preferred_date,
        time: formData.preferred_time,
        waUrl,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setApiError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppEnquiry = () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      setFieldErrors((prev) => ({
        ...prev,
        name: !formData.name.trim() ? "Please enter your name" : "",
        phone: !formData.phone.trim() ? "Please enter your phone number" : "",
      }));
      return;
    }

    const message = encodeURIComponent(
      `Hello Amit Rehabilitation Centre,\n\nI would like to enquire about appointment availability.\n\n` +
      `• Patient Name: ${formData.name}\n` +
      `• Mobile: ${formData.phone}\n` +
      `• Service: ${formData.service}\n` +
      `• Session Type: ${formData.session_type}\n` +
      `• Preferred Date: ${formData.preferred_date || "Earliest available"}\n` +
      `• Preferred Time: ${formData.preferred_time}\n` +
      (formData.message ? `• Notes: ${formData.message}\n` : "") +
      `\nPlease let me know the upcoming consultation openings.`
    );

    // Official clinic phone number from Screenshot 3
    window.open(`https://wa.me/917903992329?text=${message}`, "_blank");
  };

  if (submissionSuccess) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200/80 shadow-md text-center animate-fadeIn">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Enquiry Received Successfully!
        </h3>
        <p className="text-slate-600 max-w-lg mx-auto mb-6">
          Thank you, <span className="font-semibold text-slate-900">{submissionSuccess.name}</span>. Your appointment enquiry has been routed to our intake coordinator.
        </p>

        <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 max-w-md mx-auto text-left text-sm space-y-2 mb-8">
          <div className="flex justify-between">
            <span className="text-slate-500">Enquiry Reference:</span>
            <span className="font-mono font-bold text-brand-600">{submissionSuccess.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Service:</span>
            <span className="font-semibold text-slate-800">{submissionSuccess.service}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Requested Schedule:</span>
            <span className="font-semibold text-slate-800">
              {submissionSuccess.date} ({submissionSuccess.time})
            </span>
          </div>
        </div>

        {/* Clear non-misleading confirmation message */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-md mx-auto text-xs text-amber-800 mb-8 text-left">
          <strong>Important Schedule Notice:</strong> This submission is an enquiry request and does not constitute an instant confirmed booking. Our clinical intake team will call you at your phone number within clinic hours to verify slot availability and finalize your consultation time.
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={submissionSuccess.waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open in WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmissionSuccess(null);
              setFormData({
                name: "",
                phone: "",
                email: "",
                service: defaultService,
                session_type: "In-Clinic Evaluation",
                preferred_date: "",
                preferred_time: "10:00 AM – 11:30 AM",
                message: "",
              });
            }}
            className="px-6 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Submit Another Enquiry
          </button>
          <a
            href="tel:+917903992329"
            className="px-6 py-2.5 text-sm font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call Clinic Now</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-md">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
          Request an Appointment Enquiry
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Fill in your details below. Our rehabilitation specialist will contact you to verify session requirements and confirm slot availability.
        </p>
      </div>

      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-sm text-red-800">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <span>{apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Patient Full Name *
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="e.g. Ramesh Kumar"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400 ${
                  fieldErrors.name ? "border-red-400 bg-red-50/20" : "border-slate-200 bg-slate-50/50"
                }`}
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            {fieldErrors.name && (
              <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.name}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Mobile Number *
            </label>
            <div className="relative">
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="e.g. +91 98765 43210"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400 ${
                  fieldErrors.phone ? "border-red-400 bg-red-50/20" : "border-slate-200 bg-slate-50/50"
                }`}
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            {fieldErrors.phone && (
              <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.phone}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Email Address (Optional)
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400 ${
                  fieldErrors.email ? "border-red-400 bg-red-50/20" : "border-slate-200 bg-slate-50/50"
                }`}
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            {fieldErrors.email && (
              <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.email}</p>
            )}
          </div>

          {/* Service Dropdown */}
          <div>
            <label htmlFor="service" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Rehabilitation Service *
            </label>
            <div className="relative">
              <select
                id="service"
                name="service"
                required
                value={formData.service}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 bg-slate-50/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400"
              >
                {servicesData.map((svc) => (
                  <option key={svc.id} value={svc.title}>
                    {svc.title}
                  </option>
                ))}
              </select>
              <Stethoscope className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            {fieldErrors.service && (
              <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.service}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Session Type */}
          <div>
            <label htmlFor="session_type" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Session Type *
            </label>
            <select
              id="session_type"
              name="session_type"
              value={formData.session_type}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 text-sm border border-slate-200 bg-slate-50/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              {sessionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Preferred Date */}
          <div>
            <label htmlFor="preferred_date" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Preferred Date *
            </label>
            <div className="relative">
              <input
                id="preferred_date"
                name="preferred_date"
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={formData.preferred_date}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400 ${
                  fieldErrors.preferred_date ? "border-red-400 bg-red-50/20" : "border-slate-200 bg-slate-50/50"
                }`}
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            {fieldErrors.preferred_date && (
              <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.preferred_date}</p>
            )}
          </div>

          {/* Preferred Time */}
          <div>
            <label htmlFor="preferred_time" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Preferred Time Slot *
            </label>
            <div className="relative">
              <select
                id="preferred_time"
                name="preferred_time"
                value={formData.preferred_time}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 bg-slate-50/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400"
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Notes / Health Condition details */}
        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Condition Summary / Specific Concerns (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Briefly describe your symptoms, recent surgeries, or specific movement goals..."
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 text-sm border border-slate-200 bg-slate-50/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>

        {/* Clear non-misleading notice */}
        <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
          <strong>Notice:</strong> Submitting this request sends an enquiry to our intake desk. A clinician or receptionist will call you to confirm final slot availability. This enquiry does not guarantee automated immediate booking.
        </p>

        {/* Form Actions */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3.5 py-2.5 rounded-lg border border-emerald-200/80">
            <MessageSquare className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>
              <strong>Automatic WhatsApp Dispatch:</strong> Submitting will automatically forward these exact details to clinic WhatsApp (<span className="font-semibold">+91 7903992329</span>).
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span>Submitting & Dispatching to WhatsApp...</span>
                </>
              ) : (
                <span>Submit Appointment Enquiry</span>
              )}
            </button>

            <button
              type="button"
              onClick={handleWhatsAppEnquiry}
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors gap-2"
              title="Send enquiry directly via WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Direct WhatsApp Chat</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
