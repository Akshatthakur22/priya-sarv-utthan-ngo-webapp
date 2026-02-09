import { Metadata } from "next";
import { generateCanonicalUrl, generateBreadcrumbSchema } from "@/lib/seo-utils";
import FounderClient from "./FounderClient";

const canonicalUrl = generateCanonicalUrl("/founder");

export const metadata: Metadata = {
  title: "Mr. Jagdish Jadhav - Founder | Priya Sarv Utthan Seva Sansthan",
  description: "Meet Mr. Jagdish Jadhav, founder of Priya Sarv Utthan Seva Sansthan. Para-legal volunteer, social activist, and champion for ₹600 pension reform in Indore.",
  keywords: [
    "Jagdish Jadhav",
    "founder Priya Sarv Utthan",
    "social activist Indore",
    "para legal volunteer",
    "DLSA Indore",
    "pension reform India",
    "legal aid activist",
    "social worker MP"
  ],
  openGraph: {
    title: "Mr. Jagdish Jadhav - Founder | Priya Sarv Utthan Seva Sansthan",
    description: "Meet Mr. Jagdish Jadhav, founder and social activist. Para-legal volunteer fighting for pension reform and social justice in Indore.",
    url: canonicalUrl,
    siteName: "Priya Sarv Utthan Seva Sansthan",
    images: [
      {
        url: "/images/og-founder.jpg",
        width: 1200,
        height: 630,
        alt: "Mr. Jagdish Jadhav - Founder of Priya Sarv Utthan Seva Sansthan"
      }
    ],
    type: "profile",
    locale: "en_IN"
  },
  twitter: {
    card: "summary_large_image",
    title: "Mr. Jagdish Jadhav - Founder | Priya Sarv Utthan Seva Sansthan",
    description: "Meet Mr. Jagdish Jadhav, founder and social activist. Para-legal volunteer fighting for pension reform and social justice in Indore.",
    images: ["/images/og-founder.jpg"]
  },
  alternates: { canonical: canonicalUrl },
  authors: [{ name: "Akshat Thakur" }],
  creator: "Akshat Thakur",
  publisher: "Akshat Thakur"
};

export default function FounderPage() {
  // Person Schema for Mr. Jagdish Jadhav
  const founderSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mr. Jagdish Jadhav",
    "jobTitle": "Founder & Social Activist",
    "url": canonicalUrl,
    "worksFor": {
      "@type": "Organization",
      "name": "Priya Sarv Utthan Seva Sansthan",
      "url": "https://priyasarvutthan.org",
      "foundingDate": "1999"
    },
    "knowsAbout": [
      "Social Work",
      "Legal Aid",
      "Para-Legal Services",
      "Pension Reform",
      "Women Empowerment",
      "Child Education",
      "Community Development",
      "Constitutional Rights",
      "New Criminal Laws (BNS 2023)"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Bachelor of Social Work (BSW)"
    },
    "description": "Dedicated social activist and Para-Legal Volunteer under District Legal Services Authority (DLSA), Indore Court. Founder of Priya Sarv Utthan Seva Sansthan with 50K+ lives impacted through legal literacy, empowerment programs, and community development initiatives.",
    "award": ["Social Service Excellence Award", "Legal Aid Champion Recognition"],
    "sameAs": [
      "https://priyasarvutthan.org/founder"
    ]
  };

  // Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema("/founder");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FounderClient />
    </>
  );
}