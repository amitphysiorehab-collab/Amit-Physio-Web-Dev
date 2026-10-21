import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#0284c7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Amit Rehabilitation Centre | Move Better • Live Stronger",
  description:
    "Amit Rehabilitation Centre located in E-Block, Beta 1, Greater Noida. Specialized physical therapy, orthopedic rehabilitation, stroke neuro-rehab, sports injury recovery, and elderly mobility care.",
  keywords: [
    "Amit Rehabilitation Centre",
    "Physiotherapy Greater Noida",
    "Rehabilitation Centre Beta 1",
    "Neuro Rehab Greater Noida",
    "Orthopedic Physical Therapy",
    "Stroke Rehabilitation",
    "Sports Injury Clinic Noida",
  ],
  authors: [{ name: "Amit Rehabilitation Centre" }],
  openGraph: {
    title: "Amit Rehabilitation Centre | Move Better • Live Stronger",
    description:
      "Compassionate, evidence-based rehabilitation in E-Block, Beta 1, Greater Noida. Book an evaluation with our certified physical therapy specialists.",
    siteName: "Amit Rehabilitation Centre",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased bg-white selection:bg-brand-100 selection:text-brand-900`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
