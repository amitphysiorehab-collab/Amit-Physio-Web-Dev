import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";

export const OperatingHours: React.FC = () => {
  const schedule = [
    { days: "Monday – Friday", hours: "08:00 AM – 07:00 PM" },
    { days: "Saturday", hours: "09:00 AM – 03:00 PM" },
    { days: "Sunday", hours: "Closed (Emergency On-Call)" },
  ];

  return (
    <section className="py-20 bg-white content-auto" aria-labelledby="operating-hours-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text & Hours Schedule */}
          <div>
            <h2
              id="operating-hours-heading"
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
            >
              Clinic Operating Hours
            </h2>
            <p className="mt-4 text-slate-500 text-base sm:text-lg leading-relaxed">
              We offer flexible morning, afternoon, and weekend hours so that you can easily schedule your care around daily commitments.
            </p>

            <div className="mt-8 space-y-4">
              {schedule.map((slot, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-3 border-b border-slate-100 text-sm sm:text-base"
                >
                  <span className="font-semibold text-slate-800">
                    {slot.days}
                  </span>
                  <span className={`font-medium ${slot.days.includes("Sunday") ? "text-amber-600" : "text-slate-600"}`}>
                    {slot.hours}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/appointment"
                className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-lg shadow-sm hover:shadow transition-all active:scale-[0.98]"
              >
                Schedule a Visit
              </Link>
            </div>
          </div>

          {/* Right Column: Rehabilitation clinic photo matching Screenshot 5 */}
          <div className="relative">
            <div className="relative w-full h-[380px] sm:h-[440px] rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=75"
                alt="Rehabilitation clinician supporting patient during gait training at Amit Rehabilitation Centre"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
            </div>

            {/* Quick Badge */}
            <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-xl shadow-md border border-slate-100 hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Same-Week Bookings</p>
                <p className="text-[11px] text-slate-500">Flexible slots in Greater Noida</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
