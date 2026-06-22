
import { getEvents } from "@/services/event.service";
import { FloatingDonate } from "@/components/layout/FloatingDonate";
import EventGallery from "@/components/events/EventGallery";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import type { Metadata } from "next";
import { Users, Calendar } from "lucide-react";
import { generateCanonicalUrl, generateBreadcrumbSchema } from "@/lib/seo-utils";
import { generateEventSchema } from "@/lib/schema-utils";

const canonicalUrl = generateCanonicalUrl("/events");

export const metadata: Metadata = {
  title: "Events & Social Initiatives | Priya Sarv Utthan Seva Sansthan, Indore",
  description: "See our latest events, health camps, and education drives in Indore. Join Priya Sarv Utthan Seva Sansthan to make a difference in your community.",
  keywords: [
    "NGO events Indore",
    "community health camp",
    "education drive",
    "Priya Sarv Utthan events",
    "Indore social work",
    "volunteer Indore",
    "charity events MP"
  ],
  openGraph: {
    title: "Events & Social Initiatives | Priya Sarv Utthan Seva Sansthan, Indore",
    description: "See our latest events, health camps, and education drives in Indore. Join Priya Sarv Utthan Seva Sansthan to make a difference in your community.",
    url: canonicalUrl,
    siteName: "Priya Sarv Utthan Seva Sansthan",
    images: [
      {
        url: "/images/og-events.jpg",
        width: 1200,
        height: 630,
        alt: "NGO Events in Indore - Priya Sarv Utthan Seva Sansthan"
      }
    ],
    type: "website",
    locale: "en_IN"
  },
  twitter: {
    card: "summary_large_image",
    title: "Events & Social Initiatives | Priya Sarv Utthan Seva Sansthan, Indore",
    description: "See our latest events, health camps, and education drives in Indore. Join us to make a difference.",
    images: ["/images/og-events.jpg"]
  },
  alternates: { canonical: canonicalUrl },
  authors: [{ name: "Akshat Thakur" }],
  creator: "Akshat Thakur",
  publisher: "Akshat Thakur"
};

export default async function EventsPage() {
  const events = await getEvents();

  const eventSchema = events.map((event: any) =>
    generateEventSchema({
      name: event.title,
      description: event.description,
      startDate: event.date,
      location: event.location || "Indore, Madhya Pradesh",
      image: event.image,
    })
  );

  // Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema("/events");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-surface-cream to-accent-peach-light py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent-coral/10 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 text-center md:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-primary shadow-sm mb-6">
            <Users className="h-4 w-4 text-primary" />
            Our Journey of Service
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-ink mb-6 leading-tight">
            Events That <span className="text-primary">Touch Hearts</span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-body max-w-2xl mx-auto leading-relaxed">
            Every image tells a story of hope, compassion, and community.
          </p>
        </div>
      </section>
      <UpcomingEvents events={events} />
      <EventGallery events={events} />
      {/* CTA */}
      <section className="bg-gradient-to-r from-primary-dark to-accent-coral-dark py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Want to Be Part of Our Story?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Join hundreds of volunteers making a difference.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-primary shadow-lg transition hover:bg-white/90 hover:shadow-xl"
          >
            Get Involved
          </a>
        </div>
      </section>
      <FloatingDonate />
    </>
  );
}
