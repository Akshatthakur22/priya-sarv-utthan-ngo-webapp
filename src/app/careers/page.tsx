
import { Metadata } from "next";
import { generateCanonicalUrl, generateBreadcrumbSchema } from "@/lib/seo-utils";
import { getJobs } from "@/services/job.service";
import { FloatingDonate } from "@/components/layout/FloatingDonate";
import CareersClient from "./CareersClient";

const canonicalUrl = generateCanonicalUrl("/careers");

export const metadata: Metadata = {
  title: "Careers & Volunteering | Join Priya Sarv Utthan Seva Sansthan, Indore",
  description: "Explore career and volunteer opportunities at Priya Sarv Utthan Seva Sansthan in Indore. Join our mission for women empowerment, education, and community development since 1999.",
  keywords: [
    "NGO careers Indore",
    "volunteer opportunities Indore",
    "social work jobs MP",
    "Priya Sarv Utthan careers",
    "NGO employment India",
    "community development jobs",
    "women empowerment careers",
    "education sector jobs Indore"
  ],
  openGraph: {
    title: "Careers & Volunteering | Join Priya Sarv Utthan Seva Sansthan, Indore",
    description: "Explore career and volunteer opportunities at Priya Sarv Utthan Seva Sansthan. Join our mission for social impact in Indore since 1999.",
    url: canonicalUrl,
    siteName: "Priya Sarv Utthan Seva Sansthan",
    images: [
      {
        url: "/images/og-careers.jpg",
        width: 1200,
        height: 630,
        alt: "Careers and Volunteering at Priya Sarv Utthan Seva Sansthan - Indore NGO"
      }
    ],
    type: "website",
    locale: "en_IN"
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers & Volunteering | Join Priya Sarv Utthan Seva Sansthan, Indore",
    description: "Explore career and volunteer opportunities at Priya Sarv Utthan Seva Sansthan. Join our mission for social impact in Indore.",
    images: ["/images/og-careers.jpg"]
  },
  alternates: { canonical: canonicalUrl },
  authors: [{ name: "Akshat Thakur" }],
  creator: "Akshat Thakur",
  publisher: "Akshat Thakur"
};

export default async function CareersPage() {
  const jobs = await getJobs({ publicOnly: true });

  const jobsJsonLd = {
    "@context": "https://schema.org",
    "@graph": jobs.map(job => ({
      "@type": "JobPosting",
      "title": job.title,
      "description": job.description,
      "datePosted": new Date().toISOString().split('T')[0],
      "employmentType": job.commitment,
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "69B, Mangal Marg, Gandhi Nagar",
          "addressLocality": "Indore",
          "addressRegion": "Madhya Pradesh",
          "postalCode": "452005",
          "addressCountry": "IN"
        }
      },
      "hiringOrganization": {
        "@type": "Organization",
        "name": "Priya Sarv Utthan Seva Sansthan",
        "sameAs": "https://priyasarvutthan.org",
        "logo": "https://priyasarvutthan.org/icon.png",
        "description": "A registered NGO dedicated to women empowerment, education, and community development in Indore since 1999."
      }
    }))
  };

  // Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema("/careers");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobsJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CareersClient jobs={jobs} />
      <FloatingDonate />
    </>
  );
}
