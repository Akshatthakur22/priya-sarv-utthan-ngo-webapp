
import Script from 'next/script';
import { getJobs } from "@/services/job.service";
import { FloatingDonate } from "@/components/layout/FloatingDonate";
import type { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers & Volunteering | Priya Sarv Utthan Seva Sansthan",
  description: "Join our mission! Explore volunteer and career opportunities at Priya Sarv Utthan Seva Sansthan, Indore's trusted NGO for 25+ years.",
  keywords: ["careers", "volunteer", "jobs", "NGO Indore", "social work", "Priya Sarv Utthan Seva Sansthan"],
  openGraph: {
    title: "Careers & Volunteering | Priya Sarv Utthan Seva Sansthan",
    description: "Join our mission! Explore volunteer and career opportunities at Priya Sarv Utthan Seva Sansthan.",
    url: "https://priyasarvutthan.org/careers",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers & Volunteering | Priya Sarv Utthan Seva Sansthan",
    description: "Join our mission! Explore volunteer and career opportunities."
  },
  alternates: { canonical: "https://priyasarvutthan.org/careers" }
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

  return (
    <>
      <Script
        id="careers-jobs-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobsJsonLd) }}
      />
      <CareersClient jobs={jobs} />
      <FloatingDonate />
    </>
  );
}
