// JSON-LD schema templates for NGO website

export const organizationSchema = {
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
    "email": "priyasarvuthan@gmail.com"
  }],
  "sameAs": [
    "https://facebook.com/priyasarvutthan",
    "https://twitter.com/priyasarvutthan",
    "https://instagram.com/priyasarvutthan"
  ]
};

// LocalBusiness schema for Google Maps and local search rankings
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://priyasarvutthan.org/#organization",
  "name": "Priya Sarv Utthan Seva Sansthan",
  "alternateName": "PSUSS",
  "description": "A registered NGO dedicated to women empowerment, education, legal aid, and community development in Indore since 1999.",
  "url": "https://priyasarvutthan.org",
  "telephone": "+91-70000-78439",
  "email": "priyasarvuthan@gmail.com",
  "image": "https://priyasarvutthan.org/icon.png",
  "logo": "https://priyasarvutthan.org/icon.png",
  "priceRange": "Free",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "69B, Mangal Marg, Gandhi Nagar",
    "addressLocality": "Indore",
    "addressRegion": "Madhya Pradesh",
    "postalCode": "452005",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "22.7196",
    "longitude": "75.8577"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "11:00",
    "closes": "17:00"
  },
  "sameAs": [
    "https://facebook.com/priyasarvutthan",
    "https://instagram.com/priyasarvutthan",
    "https://twitter.com/priyasarvutthan"
  ],
  "areaServed": {
    "@type": "City",
    "name": "Indore",
    "containedInPlace": {
      "@type": "State",
      "name": "Madhya Pradesh"
    }
  },
  "foundingDate": "1999",
  "foundingLocation": "Indore, India",
  "slogan": "Building Brighter Futures",
  "knowsAbout": [
    "Women Empowerment",
    "Child Education",
    "Legal Aid",
    "Skill Training",
    "Community Development"
  ]
};

export const eventSchemaTemplate = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Event Name",
  "startDate": "YYYY-MM-DD",
  "location": {
    "@type": "Place",
    "name": "Location Name"
  }
};

export const programSchemaTemplate = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "NGO Programs",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Program 1" },
    { "@type": "ListItem", "position": 2, "name": "Program 2" }
  ]
};

export const contactPageSchemaTemplate = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Priya Sarv Utthan Seva Sansthan",
  "url": "https://priyasarvutthan.org/contact"
};
