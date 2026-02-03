import { getEvents } from "@/services/event.service";
import { FloatingDonate } from "@/components/layout/FloatingDonate";
import type { Metadata } from "next";
import { eventSchemaTemplate } from "@/lib/schema-templates";
import AdBanner from "@/components/ads/AdBanner";
export const metadata: Metadata = {
  title: "Events | Priya Sarv Utthan Seva Sansthan",
  description: "See upcoming and past events organized by Priya Sarv Utthan Seva Sansthan in Indore. Health camps, education drives, and more.",
  keywords: [
    "events", "NGO", "Indore", "community", "health camp", "education drive", "workshop", "legal aid", "awareness", "volunteer", "social work", "outreach", "India", "nonprofit", "impact"
  ],
  openGraph: {
    title: "Events | Priya Sarv Utthan Seva Sansthan",
    description: "See upcoming and past events organized by Priya Sarv Utthan Seva Sansthan in Indore. Health camps, education drives, and more.",
    url: "https://priyasarvutthan.org/events",
    images: [
      {
        url: "https://priyasarvutthan.org/icon.png",
        width: 512,
        height: 512,
        alt: "Priya Sarv Utthan Seva Sansthan logo"
      }
    ],
    type: "article"
  },
  twitter: {
    card: "summary_large_image",
    title: "Events | Priya Sarv Utthan Seva Sansthan",
    description: "See upcoming and past events organized by Priya Sarv Utthan Seva Sansthan in Indore. Health camps, education drives, and more.",
    images: ["https://priyasarvutthan.org/icon.png"]
  },
  alternates: { canonical: "https://priyasarvutthan.org/events" }
};

const eventList = [
  {
    name: "Health Camp 2026",
    startDate: "2026-03-15",
    location: "Indore, India"
  },
  {
    name: "Education Drive",
    startDate: "2026-04-10",
    location: "Indore, India"
  }
];


const eventsJsonLd = {
  "@context": "https://schema.org",
  "@graph": eventList.map(evt => ({
    "@type": "Event",
    "name": evt.name,
    "startDate": evt.startDate,
    "location": {
      "@type": "Place",
      "name": evt.location
    }
  }))
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }} />
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 md:px-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-primary">Events & updates</p>
          <h1 className="text-3xl font-bold text-neutral-ink">Community Events & Activities</h1>
        </div>
        <div className="grid gap-4">
          {events.map((evt) => (
            <div key={evt.id} className="card p-4">
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                <div>
                  <p className="text-sm font-semibold text-neutral-ink">{evt.title}</p>
                  <p className="text-xs text-neutral-muted">{evt.date} • {evt.location}</p>
                </div>
                <p className="text-xs font-semibold text-primary">Open to volunteers</p>
              </div>
              <p className="mt-2 text-sm text-neutral-body">{evt.description}</p>
            </div>
          ))}
          {events.length === 0 && (
            <div className="card p-6 text-center">
              <p className="text-neutral-body">We regularly conduct awareness programs, training workshops, and community outreach activities in Gandhi Nagar, Indore. Check back soon for upcoming events or contact us to learn about our ongoing initiatives.</p>
            </div>
          )}
        </div>
      </div>
      <FloatingDonate />
    </>
  );
}
