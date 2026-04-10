import type { Metadata } from "next";
import { getMetadata, generateBreadcrumbSchema } from "@/lib/seo-utils";
import { organizationSchema } from "@/lib/schema-templates";
import AboutClient from "./AboutClient";

export const metadata: Metadata = getMetadata("/about", {
  title: "About Us | Priya Sarv Utthan Seva Sansthan - 27+ Years of Service",
  description: "Learn about Priya Sarv Utthan Seva Sansthan (Reg. ID: IND 4124/99) — 27+ years of service across Indore, Jabalpur & Bhopal. Women empowerment, elderly care, education & community development.",
  keywords: [
    "about Priya Sarv Utthan",
    "NGO Indore since 1999",
    "women empowerment NGO",
    "elderly care Jabalpur",
    "Bhopal welfare services",
    "IND 4124/99 NGO",
    "community development MP",
    "social work organization"
  ],
  ogImage: "/images/og-about.jpg",
  ogType: "profile"
});

export default function AboutPage() {
  // Enhanced Organization Schema with more details
  const enhancedOrganizationSchema = {
    ...organizationSchema,
    "foundingDate": "1999",
    "foundingLocation": {
      "@type": "Place",
      "name": "Indore, India"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Indore"
      },
      {
        "@type": "City",
        "name": "Bhopal"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Social Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Women Empowerment Programs",
            "description": "Skill development, legal awareness, and economic independence programs for women"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Elderly Care Services",
            "description": "Old age homes, healthcare support, and pension assistance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Child Education Support",
            "description": "Educational scholarships, tutoring, and school infrastructure development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Legal Aid Services",
            "description": "Free legal consultation, para-legal services, and rights awareness programs"
          }
        }
      ]
    },
    "award": [
      "Social Excellence Award 2020",
      "Best NGO in Madhya Pradesh 2018",
      "Women Empowerment Champion 2019"
    ]
  };

  // Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema("/about");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(enhancedOrganizationSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutClient />
    </>
  );
}
