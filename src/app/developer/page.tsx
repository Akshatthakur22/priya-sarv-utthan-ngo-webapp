import { Metadata } from "next";
import { generateCanonicalUrl, generateBreadcrumbSchema } from "@/lib/seo-utils";
import DeveloperClient from "./DeveloperClient";

const canonicalUrl = generateCanonicalUrl("/developer");

export const metadata: Metadata = {
  title: "Akshat Thakur - Software Developer | Creator of SafeExam, MailMyCertificate, Calcuzy",
  description: "Akshat Thakur is a software developer focused on building scalable web applications, AI-powered products, and digital systems. Creator of SafeExam, MailMyCertificate, Calcuzy, and developer of Priya Sarv Utthan NGO platform.",
  keywords: [
    "Akshat Thakur",
    "software developer",
    "web developer Indore",
    "full-stack developer",
    "Next.js developer",
    "React developer",
    "TypeScript developer",
    "SafeExam creator",
    "MailMyCertificate creator",
    "Calcuzy creator",
    "NGO website developer",
    "AI developer",
    "Python developer",
    "software developer India"
  ],
  openGraph: {
    title: "Akshat Thakur - Software Developer",
    description: "Builder of SafeExam, MailMyCertificate, Calcuzy, and the Priya Sarv Utthan NGO platform. Specializing in scalable web applications and digital systems.",
    url: canonicalUrl,
    siteName: "Priya Sarv Utthan Seva Sansthan",
    images: [
      {
        url: "/images/akshat-og.jpg",
        width: 1200,
        height: 630,
        alt: "Akshat Thakur - Software Developer"
      }
    ],
    type: "profile",
    locale: "en_IN"
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshat Thakur - Software Developer",
    description: "Creator of SafeExam, MailMyCertificate, Calcuzy. Building scalable web applications and digital systems.",
    images: ["/images/akshat-og.jpg"]
  },
  alternates: { canonical: canonicalUrl },
  authors: [{ name: "Akshat Thakur" }],
  creator: "Akshat Thakur",
  publisher: "Akshat Thakur"
};

export default function DeveloperPage() {
  // Person Schema for Akshat Thakur (ADIS Compliant)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Akshat Thakur",
    "jobTitle": "Software Developer",
    "url": canonicalUrl,
    "email": "akshatthakur22@gmail.com",
    "telephone": "+91 9755533614",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Indore",
      "addressRegion": "Madhya Pradesh",
      "addressCountry": "IN"
    },
    "image": "https://priyasarvutthan.org/images/akki.png",
    "description": "Akshat Thakur is a software developer focused on building scalable web applications, AI-powered products, developer tools, educational platforms, and digital systems that solve real-world problems.",
    "sameAs": [
      "https://github.com/Akshatthakur22",
      "https://www.linkedin.com/in/akshatthakur22/",
      "https://x.com/akshatt66612958",
      "https://www.producthunt.com/@akshat_thakur3",
      "https://priyasarvutthan.org/developer"
    ],
    "knowsAbout": [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "Tailwind CSS",
      "API Development",
      "Database Design",
      "SEO Optimization",
      "UI/UX Design",
      "Web Development",
      "AI Integration",
      "Full-Stack Development",
      "Performance Optimization",
      "Accessibility",
      "DevOps"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Self-employed",
      "url": "https://priyasarvutthan.org"
    },
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "B.Tech Computer Science Engineering"
      }
    ],
    "award": ["3+ Academic Awards", "5+ Project Recognitions"],
    "makesOffer": [
      {
        "@type": "Offer",
        "name": "SafeExam - AI-powered examination platform",
        "url": "https://safexam.in"
      },
      {
        "@type": "Offer",
        "name": "MailMyCertificate - Certificate generation platform",
        "url": "https://mailmycertificate.tech"
      },
      {
        "@type": "Offer",
        "name": "Calcuzy - Productivity platform",
        "url": "https://calcuzy.app"
      }
    ]
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
