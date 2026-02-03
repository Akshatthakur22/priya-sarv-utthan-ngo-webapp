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
    "email": "contact@priyasarvutthan.org"
  }],
  "sameAs": [
    "https://facebook.com/priyasarvutthan",
    "https://twitter.com/priyasarvutthan",
    "https://instagram.com/priyasarvutthan"
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
