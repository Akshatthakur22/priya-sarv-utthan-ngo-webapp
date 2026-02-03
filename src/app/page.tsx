


import { FloatingDonate } from "@/components/layout/FloatingDonate";
import type { Metadata } from "next";
import HomeMotionSections from "@/components/sections/HomeMotionSections";
import { organizationSchema, localBusinessSchema } from "@/lib/schema-templates";

export const metadata: Metadata = {
  title: "Priya Sarv Utthan Seva Sansthan | NGO in Indore | Building Brighter Futures",
  description: "Official website of Priya Sarv Utthan Seva Sansthan - a registered NGO in Indore since 1999. Women empowerment, education, health, legal aid, and community development in Gandhi Nagar, Indore, MP.",
  keywords: [
    "NGO Indore", "NGO in Indore", "women empowerment Indore", "education NGO", "legal aid Indore", 
    "community development", "volunteer Indore", "charity Indore", "social work", "child development", 
    "skill training", "self-employment", "social justice", "Gandhi Nagar Indore", "nonprofit India",
    "Priya Sarv Utthan Seva Sansthan"
  ],
  openGraph: {
    title: "Priya Sarv Utthan Seva Sansthan | NGO in Indore",
    description: "Women empowerment, education, health, legal aid, and community development in Indore, MP since 1999.",
    url: "https://priyasarvutthan.org/",
    siteName: "Priya Sarv Utthan Seva Sansthan",
    images: [
      {
        url: "https://priyasarvutthan.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "Priya Sarv Utthan Seva Sansthan - Building Brighter Futures in Indore"
      }
    ],
    type: "website",
    locale: "en_IN"
  },
  twitter: {
    card: "summary_large_image",
    title: "Priya Sarv Utthan Seva Sansthan | NGO in Indore",
    description: "Women empowerment, education, health, legal aid, and community development in Indore, MP.",
    images: ["https://priyasarvutthan.org/og-image.png"],
    creator: "@priyasarvutthan"
  },
  alternates: { canonical: "https://priyasarvutthan.org/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <HomeMotionSections />
      <FloatingDonate />
    </>
  );
}
