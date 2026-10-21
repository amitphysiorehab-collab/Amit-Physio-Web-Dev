"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Phone,
  Search,
  Menu,
  X,
  Facebook,
  Linkedin,
  Instagram,
  User,
  Calendar,
} from "lucide-react";
import { Logo } from "./Logo";

// Custom X / Twitter SVG icon
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

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Courses", href: "/courses" },
    { label: "FAQ", href: "/faq" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isActive = (href: string) => {
    if (href === "/" && pathname !== "/") return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Primary Nav */}
          <div className="flex items-center gap-8">
            <Logo size="md" />

            <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "text-brand-600 bg-brand-50/70 font-semibold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Section (Phone, Search, Social, Auth, CTA) */}
          <div className="hidden xl:flex items-center gap-5">
            {/* Phone link */}
            <a
              href="tel:+917903992329"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-brand-600 transition-colors whitespace-nowrap"
              title="Call Amit Rehabilitation Centre"
            >
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              <span>+91 7903992329</span>
            </a>

            {/* Quick Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-36 lg:w-44 pl-3 pr-8 py-1.5 text-xs text-slate-800 bg-slate-50/90 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-400 focus:bg-white transition-all placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-600"
                aria-label="Submit search"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Social Icons matching screenshot */}
            <div className="flex items-center gap-2.5 text-slate-500">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors p-1"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 transition-colors p-1"
                aria-label="X (Twitter)"
              >
                <XIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 transition-colors p-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.instagram.com/thephyisofix?mdxt=MWZkZ29sc3c2aHl4aw=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-600 transition-colors p-1"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Sign in */}
            <Link
              href="/admin/login"
              className="text-xs font-semibold text-slate-700 hover:text-brand-600 transition-colors flex items-center gap-1"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign in</span>
            </Link>

            {/* Contact Us Primary CTA matching screenshot color */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 rounded-md shadow-sm transition-all active:scale-[0.98]"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile / Tablet Quick Actions & Hamburger */}
          <div className="flex items-center gap-3 xl:hidden">
            <Link
              href="/appointment"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-brand-500 rounded-md"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-brand-600 hover:bg-slate-100 rounded-md transition-colors"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-lg animate-fadeIn">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search services, courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-9 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Mobile Links */}
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive(link.href)
                    ? "text-brand-600 bg-brand-50 font-bold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/appointment"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Book Appointment
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Contact Us
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Staff / Admin Sign In</span>
            </Link>
          </nav>

          {/* Mobile Contact & Social */}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
            <a
              href="tel:+917903992329"
              className="flex items-center gap-2 text-sm font-semibold text-slate-800"
            >
              <Phone className="w-4 h-4 text-brand-600" />
              <span>+91 7903992329</span>
            </a>
            <div className="flex items-center gap-4 text-slate-600">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
                <XIcon className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/thephyisofix?mdxt=MWZkZ29sc3c2aHl4aw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
