import { Metadata } from "next";
import { generateCanonicalUrl, generateBreadcrumbSchema } from "@/lib/seo-utils";
import ContactClient from "./ContactClient";

const canonicalUrl = generateCanonicalUrl("/contact");

export const metadata: Metadata = {
  title: "Contact Us | Priya Sarv Utthan Seva Sansthan, Indore",
  description: "Get in touch with Priya Sarv Utthan Seva Sansthan in Indore. Call us at +91 9977177059 or email priyasarvuthan@gmail.com for NGO services and volunteering.",
  keywords: [
    "contact NGO Indore",
    "Priya Sarv Utthan contact",
    "NGO phone number Indore",
    "volunteer contact Indore",
    "charity organization contact",
    "social work Indore",
    "Gandhi Nagar NGO",
    "Indore NGO address"
  ],
  openGraph: {
    title: "Contact Us | Priya Sarv Utthan Seva Sansthan, Indore",
    description: "Get in touch with Priya Sarv Utthan Seva Sansthan in Indore. Call us or visit our Gandhi Nagar office for NGO services and volunteering opportunities.",
    url: canonicalUrl,
    siteName: "Priya Sarv Utthan Seva Sansthan",
    images: [
      {
        url: "/images/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Priya Sarv Utthan Seva Sansthan - NGO in Indore"
      }
    ],
    type: "website",
    locale: "en_IN"
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Priya Sarv Utthan Seva Sansthan, Indore",
    description: "Get in touch with Priya Sarv Utthan Seva Sansthan in Indore. Call us or visit our Gandhi Nagar office for NGO services and volunteering opportunities.",
    images: ["/images/og-contact.jpg"]
  },
  alternates: { canonical: canonicalUrl },
  authors: [{ name: "Akshat Thakur" }],
  creator: "Akshat Thakur",
  publisher: "Akshat Thakur"
};

export default function ContactPage() {
  // Contact Page Schema
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Priya Sarv Utthan Seva Sansthan",
    "description": "Contact page for Priya Sarv Utthan Seva Sansthan NGO in Indore",
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "Organization",
      "name": "Priya Sarv Utthan Seva Sansthan",
      "email": "priyasarvuthan@gmail.com",
      "telephone": "+91 9977177059",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "69B, Mangal Marg, Gandhi Nagar",
        "addressLocality": "Indore",
        "addressRegion": "Madhya Pradesh",
        "postalCode": "452005",
        "addressCountry": "IN"
      },
      "contactType": "Customer Service",
      "availableLanguage": ["Hindi", "English"],
      "areaServed": "Indore, Madhya Pradesh"
    }
  };

  // Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema("/contact");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ContactClient />
    </>
  );
}