import { Metadata } from "next";
import { generateCanonicalUrl, generateBreadcrumbSchema } from "@/lib/seo-utils";
import DonateClient from "./DonateClient";

const canonicalUrl = generateCanonicalUrl("/donate");

export const metadata: Metadata = {
  title: "Donate Now | Support Priya Sarv Utthan Seva Sansthan, Indore",
  description: "Make a secure donation to Priya Sarv Utthan Seva Sansthan. Your contribution helps women empowerment, education, and community development in Indore since 1999.",
  keywords: [
    "donate NGO Indore",
    "charity donation India",
    "support women education",
    "Priya Sarv Utthan donation",
    "tax exemption donation",
    "UPI donation NGO",
    "secure charity payment",
    "Indore NGO donation"
  ],
  openGraph: {
    title: "Donate Now | Support Priya Sarv Utthan Seva Sansthan, Indore",
    description: "Make a secure donation to support women empowerment, education, and community development in Indore. Every contribution matters.",
    url: canonicalUrl,
    siteName: "Priya Sarv Utthan Seva Sansthan",
    images: [
      {
        url: "/images/og-donate.jpg",
        width: 1200,
        height: 630,
        alt: "Donate to Priya Sarv Utthan Seva Sansthan - Indore NGO"
      }
    ],
    type: "website",
    locale: "en_IN"
  },
  twitter: {
    card: "summary_large_image",
    title: "Donate Now | Support Priya Sarv Utthan Seva Sansthan, Indore",
    description: "Make a secure donation to support women empowerment, education, and community development in Indore. Every contribution matters.",
    images: ["/images/og-donate.jpg"]
  },
  alternates: { canonical: canonicalUrl },
  authors: [{ name: "Akshat Thakur" }],
  creator: "Akshat Thakur",
  publisher: "Akshat Thakur"
};

export default function DonatePage() {
  // Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema("/donate");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <DonateClient />
    </>
  );
}