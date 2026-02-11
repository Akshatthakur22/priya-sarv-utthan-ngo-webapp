// Example usage for /events page
import StructuredData from "@/components/StructuredData";

// Sample event data from your EventGallery
const eventData = {
  name: "Community Health Camp",
  description: "Free health checkups and medicines distributed to 200+ families in Gandhi Nagar. Join us for this vital community health initiative.",
  startDate: "2025-01-15T09:00:00+05:30",
  endDate: "2025-01-15T17:00:00+05:30",
  location: "Gandhi Nagar, Indore",
  image: "https://priyasarvutthan.org/images/real.png",
  url: "https://priyasarvutthan.org/events/community-health-camp",
  organizer: "Priya Sarv Utthan Seva Sansthan"
};

export default function EventsPage() {
  return (
    <>
      {/* Event Schema */}
      <StructuredData 
        type="Event" 
        data={eventData} 
      />
      
      {/* Your existing events page content */}
      <div>
        <h1>Upcoming Events</h1>
        {/* EventGallery component and other content */}
      </div>
    </>
  );
}
