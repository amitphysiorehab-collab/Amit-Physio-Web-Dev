import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";

const XIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200/80 pt-12 pb-8 text-slate-600 content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Icons row matching Screenshot 3 & 4 */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-slate-700/80 flex items-center justify-center text-slate-800 hover:text-white hover:bg-slate-900 transition-all"
            aria-label="Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-slate-700/80 flex items-center justify-center text-slate-800 hover:text-white hover:bg-slate-900 transition-all"
            aria-label="X (Twitter)"
          >
            <XIcon className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-slate-700/80 flex items-center justify-center text-slate-800 hover:text-white hover:bg-slate-900 transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/thephyisofix?mdxt=MWZkZ29sc3c2aHl4aw=="
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-slate-700/80 flex items-center justify-center text-slate-800 hover:text-white hover:bg-pink-600 hover:border-pink-600 transition-all"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </div>

        {/* Divider line matching Screenshot 3 */}
        <div className="border-t border-slate-200 my-8" />

        {/* 3-Column main footer layout matching Screenshot 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 text-center md:text-left py-4">
          {/* Left Column: Address */}
          <div className="flex flex-col items-center md:items-start text-sm space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
              <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Clinic Location</span>
            </div>
            <a
              href="https://maps.google.com/?q=E-Block+Beta+1+Greater+Noida+Uttar+Pradesh+201308"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-center md:text-left"
              title="Open in Google Maps"
            >
              <p className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                E-Block, Beta 1, Greater Noida
              </p>
              <p className="text-xs text-slate-500 font-medium group-hover:text-slate-700 transition-colors">
                Uttar Pradesh – 201308, India
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-600 group-hover:text-brand-700 mt-0.5">
                <span>Get Directions</span>
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </a>
          </div>

          {/* Center Column: Logo */}
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>

          {/* Right Column: Contact Details */}
          <div className="flex flex-col items-center md:items-end text-sm space-y-2">
            <a
              href="tel:+917903992329"
              className="flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium transition-colors"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>+91 7903992329</span>
            </a>
            <a
              href="mailto:amityadav19242906@gmail.com"
              className="flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium transition-colors break-all"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span>amityadav19242906@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="border-t border-slate-100 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
          <p>Copyright © {new Date().getFullYear()} Amit Rehabilitation Centre. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="hover:text-slate-700 transition-colors">
              FAQ
            </Link>
            <Link href="/appointment" className="hover:text-slate-700 transition-colors">
              Book Enquiry
            </Link>
            <Link href="/admin/login" className="hover:text-slate-700 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
