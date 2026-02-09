import { Metadata } from "next";
import { generateCanonicalUrl, generateBreadcrumbSchema } from "@/lib/seo-utils";
import DeveloperClient from "./DeveloperClient";

const canonicalUrl = generateCanonicalUrl("/developer");

export const metadata: Metadata = {
  title: "Akshat Thakur - Developer | Priya Sarv Utthan Seva Sansthan",
  description: "Meet Akshat Thakur, the full-stack developer behind Priya Sarv Utthan Seva Sansthan's digital platform. Expert in Next.js, React, and modern web technologies.",
  keywords: [
    "Akshat Thakur",
    "web developer Indore",
    "Next.js developer",
    "full-stack developer",
    "React developer",
    "TypeScript developer",
    "NGO website developer",
    "software developer India"
  ],
  openGraph: {
    title: "Akshat Thakur - Developer | Priya Sarv Utthan Seva Sansthan",
    description: "Full-stack developer specializing in Next.js, React, and modern web technologies. Building digital solutions for social impact.",
    url: canonicalUrl,
    siteName: "Priya Sarv Utthan Seva Sansthan",
    images: [
      {
        url: "/images/akshat-og.jpg",
        width: 1200,
        height: 630,
        alt: "Akshat Thakur - Web Developer"
      }
    ],
    type: "profile",
    locale: "en_IN"
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshat Thakur - Developer | Priya Sarv Utthan Seva Sansthan",
    description: "Full-stack developer specializing in Next.js, React, and modern web technologies. Building digital solutions for social impact.",
    images: ["/images/akshat-og.jpg"]
  },
  alternates: { canonical: canonicalUrl },
  authors: [{ name: "Akshat Thakur" }],
  creator: "Akshat Thakur",
  publisher: "Akshat Thakur"
};

export default function DeveloperPage() {
  // Person Schema for Akshat Thakur
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Akshat Thakur",
    "jobTitle": "Software Developer & Platform Builder",
    "url": canonicalUrl,
    "email": "akshatthakur22@gmail.com",
    "telephone": "+91 9755533614",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Indore",
      "addressRegion": "Madhya Pradesh",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://github.com/Akshatthakur22",
      "https://www.linkedin.com/in/akshatthakur22/",
      "https://priyasarvutthan.org/developer"
    ],
    "knowsAbout": [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "API Development",
      "Database Design",
      "SEO Optimization",
      "UI/UX Design",
      "Web Development"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Priya Sarv Utthan Seva Sansthan",
      "url": "https://priyasarvutthan.org"
    },
    "description": "Passionate 3rd-year B.Tech CSE student and full-stack developer with 2+ years of experience. Specialized in building modern web applications for social impact.",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "B.Tech Computer Science Engineering"
    },
    "award": ["3+ Academic Awards", "5+ Project Recognitions"]
  };

  // Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema("/developer");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <DeveloperClient />
    </>
  );
}
