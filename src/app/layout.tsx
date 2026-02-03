import type { Metadata } from "next";
import Script from "next/script";
import { Nunito, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Priya Sarv Utthan Seva Sansthan | Building brighter futures",
  description: "Priya Sarv Utthan Seva Sansthan - A registered NGO dedicated to women empowerment, education, and community development in Indore.",
  metadataBase: new URL("https://priyasarvutthan.org"),
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png"
  },
  openGraph: {
    title: "Priya Sarv Utthan Seva Sansthan | Building brighter futures",
    description: "Join us in creating lasting impact through education, women empowerment, and social justice.",
    url: "https://priyasarvutthan.org",
    siteName: "Priya Sarv Utthan Seva Sansthan",
    locale: "en_US",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${inter.variable}`}> 
      <head>
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen font-body antialiased overflow-x-hidden">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
