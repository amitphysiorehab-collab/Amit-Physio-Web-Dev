import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  withLink?: boolean;
  variant?: "auto" | "horizontal" | "badge" | "emblem";
  showTagline?: boolean;
  priority?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  withLink = true,
  variant = "auto",
  showTagline = true,
  priority,
}) => {
  // Determine actual display style
  // 'horizontal' is optimal for navbar headers so text is prominently readable
  // 'badge' is optimal for footers and hero/admin cards where full vertical emblem + typography is centered
  const effectiveVariant =
    variant === "auto" ? (size === "lg" || size === "xl" ? "badge" : "horizontal") : variant;

  const content = (() => {
    // 1. Full Badge Mode (Perfect for Footer, About Hero, or Staff Sign In)
    if (effectiveVariant === "badge") {
      const badgeDimensions = {
        sm: { width: 110, height: 118, wrapper: "w-28" },
        md: { width: 140, height: 151, wrapper: "w-36" },
        lg: { width: 180, height: 194, wrapper: "w-44" },
        xl: { width: 220, height: 237, wrapper: "w-56" },
      }[size];

      return (
        <div
          className={`group flex flex-col items-center text-center transition-all duration-300 ${badgeDimensions.wrapper} ${className}`}
        >
          <div className="relative p-1.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-sky-100/80 shadow-[0_4px_20px_rgba(14,165,233,0.08)] group-hover:shadow-[0_8px_28px_rgba(14,165,233,0.18)] group-hover:border-sky-200 transition-all duration-300">
            <Image
              src="/images/logo.png"
              alt="Amit Rehabilitation Centre - Move Better, Live Stronger"
              width={badgeDimensions.width}
              height={badgeDimensions.height}
              priority={priority ?? false}
              loading={priority ? "eager" : "lazy"}
              className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
        </div>
      );
    }

    // 2. Emblem Only Mode
    if (effectiveVariant === "emblem") {
      const emblemSizes = {
        sm: 36,
        md: 48,
        lg: 64,
        xl: 80,
      }[size];

      return (
        <div
          className={`group relative inline-flex items-center justify-center transition-all duration-300 ${className}`}
        >
          <div className="relative rounded-full p-0.5 bg-gradient-to-tr from-sky-400/30 via-emerald-400/20 to-brand-500/30 group-hover:from-sky-400 group-hover:to-emerald-500 transition-all duration-300">
            <div className="rounded-full bg-white p-1 shadow-sm group-hover:shadow-md transition-shadow">
              <Image
                src="/images/logo-emblem.png"
                alt="Amit Rehabilitation Centre Emblem"
                width={emblemSizes}
                height={emblemSizes}
                priority
                className="rounded-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      );
    }

    // 3. Horizontal Lockup Mode (Emblem + Premium Typography — Perfect for Navigation Bar)
    const iconDimension = {
      sm: { size: 36, px: 36 },
      md: { size: 50, px: 50 },
      lg: { size: 64, px: 64 },
      xl: { size: 76, px: 76 },
    }[size];

    return (
      <div className={`group inline-flex items-center gap-3 select-none ${className}`}>
        {/* Glowing circular emblem container */}
        <div className="relative shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full blur-[6px] opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
          <div className="relative rounded-full bg-white p-0.5 border border-sky-100 shadow-[0_2px_8px_rgba(2,132,199,0.12)] group-hover:shadow-[0_4px_14px_rgba(2,132,199,0.22)] transition-all duration-300">
            <Image
              src="/images/logo-emblem.png"
              alt="Amit Rehabilitation Centre Emblem"
              width={iconDimension.px}
              height={iconDimension.px}
              priority
              className="rounded-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Brand Typography Lockup */}
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-xl sm:text-2xl tracking-wider bg-gradient-to-r from-sky-700 via-brand-600 to-sky-600 bg-clip-text text-transparent group-hover:from-sky-600 group-hover:to-emerald-600 transition-colors duration-300">
              AMIT
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
          </div>

          <span className="mt-0.5 text-[9px] sm:text-[10px] font-bold text-slate-800 tracking-[0.2em] uppercase">
            Rehabilitation Centre
          </span>

          {showTagline && size !== "sm" && (
            <div className="mt-1 flex items-center gap-1.5 text-[8px] sm:text-[8.5px] font-semibold text-emerald-600 tracking-wider">
              <span className="h-[1px] w-3 bg-emerald-400" />
              <span>MOVE BETTER • LIVE STRONGER</span>
              <span className="h-[1px] w-3 bg-emerald-400" />
            </div>
          )}
        </div>
      </div>
    );
  })();

  if (withLink) {
    return (
      <Link
        href="/"
        className="inline-flex items-center focus:outline-none focus:ring-2 focus:ring-brand-400 rounded-xl transition-transform"
        aria-label="Amit Rehabilitation Centre - Home"
      >
        {content}
      </Link>
    );
  }

  return content;
};
