"use client";

interface StructuredDataProps {
  type: "Event" | "DonateAction" | "ContactPoint";
  data?: any;
}

// Event Schema Generator
export const generateEventSchema = (eventData: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  image?: string;
  url?: string;
  organizer?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "name": eventData.name,
  "description": eventData.description,
  "startDate": eventData.startDate,
  "endDate": eventData.endDate || eventData.startDate,
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": eventData.location,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": eventData.location.includes("Indore") ? "Indore" : eventData.location,
      "addressRegion": "Madhya Pradesh",
      "addressCountry": "IN"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": eventData.organizer || "Priya Sarv Utthan Seva Sansthan",
    "url": "https://priyasarvutthan.org"
  },
  "image": eventData.image || "https://priyasarvutthan.org/images/og-default.jpg",
  "url": eventData.url || "https://priyasarvutthan.org/events",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "validFrom": eventData.startDate
  },
  "performer": {
    "@type": "Organization",
    "name": "Priya Sarv Utthan Seva Sansthan"
  }
});

// DonateAction Schema Generator
export const generateDonateActionSchema = (donateData?: {
  amount?: string;
  currency?: string;
  purpose?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "DonateAction",
  "agent": {
    "@type": "Organization",
    "name": "Priya Sarv Utthan Seva Sansthan",
    "url": "https://priyasarvutthan.org",
    "logo": "https://priyasarvutthan.org/icon.png",
    "description": "A registered NGO dedicated to women empowerment, education, and community development in Madhya Pradesh since 1999."
  },
  "object": {
    "@type": "MonetaryAmount",
    "amount": donateData?.amount || "500",
    "currency": donateData?.currency || "INR"
  },
  "purpose": donateData?.purpose || "Support women empowerment, child education, and community development programs",
  "recipient": {
    "@type": "Organization",
    "name": "Priya Sarv Utthan Seva Sansthan",
    "url": "https://priyasarvutthan.org",
    "taxID": "IND 4124/99",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "69B, Mangal Marg, Gandhi Nagar",
      "addressLocality": "Indore",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "452005",
      "addressCountry": "IN"
    }
  },
  "actionStatus": "https://schema.org/PotentialActionStatus",
  "target": {
    "@type": "EntryPoint",
    "urlTemplate": "https://priyasarvutthan.org/donate",
    "inLanguage": "en-IN",
    "actionPlatform": "https://schema.org/Website"
  }
});

// ContactPoint Schema Generator
export const generateContactPointSchema = (contactData?: {
  telephone?: string;
  email?: string;
  availableLanguage?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "ContactPoint",
  "telephone": contactData?.telephone || "+91-70000-78439",
  "email": contactData?.email || "priyasarvuthan@gmail.com",
  "contactType": ["customer support", "legal aid", "donations", "volunteer coordination"],
  "areaServed": {
    "@type": "Country",
    "name": "IN"
  },
  "availableLanguage": contactData?.availableLanguage || ["Hindi", "English", "Marathi", "Gujarati"],
  "hoursAvailable": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
      ],
      "opens": "11:00",
      "closes": "17:00"
    }
  ],
  "serviceChannel": [
    {
      "@type": "ServiceChannel",
      "serviceType": "customer support",
      "servicePhone": {
        "@type": "Telephone",
        "telephone": "+91-70000-78439"
      }
    },
    {
      "@type": "ServiceChannel",
      "serviceType": "legal aid",
      "servicePhone": {
        "@type": "Telephone",
        "telephone": "+91-70000-78439"
      }
    }
  ]
});

export default function StructuredData({ type, data }: StructuredDataProps) {
  let schema: any = {};

  switch (type) {
    case "Event":
      if (!data) {
        console.error("Event schema requires event data");
        return null;
      }
      schema = generateEventSchema(data);
      break;
    
    case "DonateAction":
      schema = generateDonateActionSchema(data);
      break;
    
    case "ContactPoint":
      schema = generateContactPointSchema(data);
      break;
    
    default:
      console.error("Unsupported schema type:", type);
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

// Helper function to generate multiple event schemas
export const generateMultipleEventSchemas = (events: Array<{
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  image?: string;
  url?: string;
}>) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Upcoming Events - Priya Sarv Utthan Seva Sansthan",
  "description": "List of upcoming events and activities by Priya Sarv Utthan Seva Sansthan",
  "itemListElement": events.map((event, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": generateEventSchema(event)
  }))
});
