import type { Metadata } from "next";
import { Nunito, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Priya Sarv Utthan Seva Sansthan | Building brighter futures",
  description: "Priya Sarv Utthan Seva Sansthan - A registered NGO dedicated to women empowerment, education, and community development in Indore.",
  metadataBase: new URL("http://localhost:3000"),
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png"
  },
  openGraph: {
    title: "Priya Sarv Utthan Seva Sansthan | Building brighter futures",
    description: "Join us in creating lasting impact through education, women empowerment, and social justice.",
    url: "http://localhost:3000",
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
      <body className="min-h-screen font-body antialiased overflow-x-hidden">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
