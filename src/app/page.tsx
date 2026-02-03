


import { Hero } from "@/components/sections/Hero";
import { FloatingDonate } from "@/components/layout/FloatingDonate";
import type { Metadata } from "next";
import HomeMotionSections from "@/components/sections/HomeMotionSections";
export const metadata: Metadata = {
  title: "Priya Sarv Utthan Seva Sansthan | Building brighter futures in Indore",
  description: "Official NGO site for Priya Sarv Utthan Seva Sansthan. Women empowerment, education, health, legal aid, and community development in Indore, MP.",
  keywords: [
    "NGO", "Indore", "women empowerment", "education", "health", "legal aid", "community development", "volunteer", "charity", "social work", "child development", "skill training", "self-employment", "social justice", "India", "nonprofit"
  ],
  openGraph: {
    title: "Priya Sarv Utthan Seva Sansthan | Building brighter futures in Indore",
    description: "Official NGO site for Priya Sarv Utthan Seva Sansthan. Women empowerment, education, health, legal aid, and community development in Indore, MP.",
    url: "https://priyasarvutthan.org/",
    siteName: "Priya Sarv Utthan Seva Sansthan",
    images: [
      {
        url: "https://priyasarvutthan.org/icon.png",
        width: 512,
        height: 512,
        alt: "Priya Sarv Utthan Seva Sansthan logo"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Priya Sarv Utthan Seva Sansthan | Building brighter futures in Indore",
    description: "Official NGO site for Priya Sarv Utthan Seva Sansthan. Women empowerment, education, health, legal aid, and community development in Indore, MP.",
    images: ["https://priyasarvutthan.org/icon.png"]
  },
  alternates: { canonical: "https://priyasarvutthan.org/" }
};

import { organizationSchema } from "@/lib/schema-templates";


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Priya Sarv Utthan Seva Sansthan",
  "url": "https://priyasarvutthan.org",
  "logo": "https://priyasarvutthan.org/icon.png",
  "description": "A registered NGO dedicated to women empowerment, education, and community development in Indore.",
  "contactPoint": [{
    "@type": "ContactPoint",
    "telephone": "+91-70000 78439",
    "contactType": "Customer Service",
    "email": "contact@priyasarvutthan.org"
  }],
  "sameAs": [
    "https://facebook.com/priyasarvutthan",
    "https://twitter.com/priyasarvutthan",
    "https://instagram.com/priyasarvutthan"
  ]
};
import Link from "next/link";
import { motion } from "framer-motion";

const values = [
  {
    title: "Community First",
    hindi: "समुदाय के साथ चलना ही असली रास्ता है।",
    desc: "We don't decide for people — we listen, understand, and work together with families in Gandhi Nagar to find what really helps."
  },
  {
    title: "Built on Trust",
    hindi: "भरोसा सबसे बड़ी चीज़ है।",
    desc: "As a registered NGO, we're committed to being open about where donations go and what impact they create. You can count on us."
  },
  {
    title: "Lasting Change",
    hindi: "जल्दबाज़ी में कुछ नहीं होता।",
    desc: "Quick fixes don't work. We focus on programs that make a real, long-term difference in people's lives."
  }
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <HomeMotionSections />
      <FloatingDonate />
    </>
  );
}
