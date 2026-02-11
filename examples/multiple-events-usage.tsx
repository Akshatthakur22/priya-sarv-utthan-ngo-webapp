// Advanced usage for /events page with multiple events
import StructuredData, { generateMultipleEventSchemas } from "@/components/StructuredData";

// Multiple events from your EventGallery
const upcomingEvents = [
  {
    name: "Community Health Camp",
    description: "Free health checkups and medicines distributed to 200+ families in Gandhi Nagar.",
    startDate: "2025-01-15T09:00:00+05:30",
    location: "Gandhi Nagar, Indore",
    image: "https://priyasarvutthan.org/images/real.png",
    url: "https://priyasarvutthan.org/events/community-health-camp"
  },
  {
    name: "Education for All Drive",
    description: "Distributed books, stationery, and school bags to underprivileged children.",
    startDate: "2025-02-10T10:00:00+05:30",
    location: "Indore, MP",
    image: "https://priyasarvutthan.org/images/real1.png",
    url: "https://priyasarvutthan.org/events/education-drive"
  },
  {
    name: "Women Empowerment Workshop",
    description: "Skill training and self-help group formation for 50+ women.",
    startDate: "2025-03-08T14:00:00+05:30",
    location: "Indore",
    image: "https://priyasarvutthan.org/images/real2.png",
    url: "https://priyasarvutthan.org/events/women-empowerment"
  }
];

export default function EventsPage() {
  const multipleEventsSchema = generateMultipleEventSchemas(upcomingEvents);

  return (
    <>
      {/* Multiple Events Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(multipleEventsSchema, null, 2) }}
      />
      
      {/* Individual Event Schemas for better SEO */}
      {upcomingEvents.map((event, index) => (
        <StructuredData 
          key={index}
          type="Event" 
          data={event} 
        />
      ))}
      
      {/* Your existing events page content */}
      <div>
        <h1>Upcoming Events</h1>
        <p>Join us in making a difference through our community events...</p>
        {/* EventGallery component and other content */}
      </div>
    </>
  );
}
