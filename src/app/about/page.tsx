import type { Metadata } from "next";
import { organizationSchema } from "@/lib/schema-templates";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Priya Sarv Utthan Seva Sansthan",
  description:
    "Learn about Priya Sarv Utthan Seva Sansthan (Reg. ID: IND 4124/99) — 27+ years of service across Indore, Jabalpur & Bhopal. Women empowerment, elderly care, education & community development.",
  keywords: [
    "about",
    "NGO",
    "mission",
    "vision",
    "Priya Sarv Utthan Seva Sansthan",
    "Indore NGO",
    "Jabalpur Old Age Home",
    "Bhopal welfare",
    "women empowerment",
    "elderly care"
  ],
  openGraph: {
    title: "About Us | Priya Sarv Utthan Seva Sansthan",
    description:
      "Registered NGO (ID: IND 4124/99) serving Madhya Pradesh since 1999. Headquarters in Indore with branches in Jabalpur & Bhopal.",
    url: "https://priyasarvutthan.org/about",
    type: "profile"
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Priya Sarv Utthan Seva Sansthan",
    description:
      "27+ years empowering communities across Madhya Pradesh. Education, elderly care, women empowerment & legal aid."
  },
  alternates: { canonical: "https://priyasarvutthan.org/about" }
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <AboutClient />
    </>
  );
}
