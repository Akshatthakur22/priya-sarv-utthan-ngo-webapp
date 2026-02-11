# StructuredData Component - Technical SEO Implementation

## Overview
The `StructuredData` component provides comprehensive JSON-LD schema implementation for NGO websites, designed to improve search engine visibility and rich snippet appearance.

## Available Schema Types

### 1. Event Schema (`type="Event"`)
Perfect for events pages, individual event listings, and community gatherings.

**Required Data:**
```typescript
{
  name: string;           // Event title
  description: string;     // Detailed description
  startDate: string;       // ISO 8601 format: "2025-01-15T09:00:00+05:30"
  location: string;        // Event location
  image?: string;         // Event image URL
  url?: string;           // Event page URL
  organizer?: string;    // Organizer name (defaults to NGO name)
}
```

**Generated Schema Features:**
- Event status and attendance mode
- Complete location with address
- Organizer information
- Free admission offers
- Performer details

### 2. DonateAction Schema (`type="DonateAction"`)
Essential for donation pages to indicate transaction points to Google.

**Optional Data:**
```typescript
{
  amount?: string;        // Default: "500"
  currency?: string;      // Default: "INR"
  purpose?: string;       // Custom donation purpose
}
```

**Generated Schema Features:**
- Organization details
- Monetary amount specification
- Recipient information with tax ID
- Action target (donation page)
- Complete NGO address

### 3. ContactPoint Schema (`type="ContactPoint"`)
Ideal for contact pages with multiple contact roles.

**Optional Data:**
```typescript
{
  telephone?: string;           // Default: "+91-70000-78439"
  email?: string;              // Default: "priyasarvuthan@gmail.com"
  availableLanguage?: string[]; // Default: ["Hindi", "English", "Marathi", "Gujarati"]
}
```

**Generated Schema Features:**
- Multiple contact types: customer support, legal aid, donations, volunteer coordination
- Service area specification
- Operating hours
- Multi-language support
- Service channels for different contact types

## Usage Examples

### Basic Event Implementation
```tsx
import StructuredData from "@/components/StructuredData";

const eventData = {
  name: "Community Health Camp",
  description: "Free health checkups and medicines distributed to 200+ families",
  startDate: "2025-01-15T09:00:00+05:30",
  location: "Gandhi Nagar, Indore"
};

export default function EventPage() {
  return (
    <>
      <StructuredData type="Event" data={eventData} />
      {/* Your page content */}
    </>
  );
}
```

### DonateAction Implementation
```tsx
import StructuredData from "@/components/StructuredData";

export default function DonatePage() {
  return (
    <>
      <StructuredData type="DonateAction" />
      {/* Donation form and content */}
    </>
  );
}
```

### ContactPoint Implementation
```tsx
import StructuredData from "@/components/StructuredData";

export default function ContactPage() {
  return (
    <>
      <StructuredData type="ContactPoint" />
      {/* Contact form and information */}
    </>
  );
}
```

## Advanced Features

### Multiple Events Schema
Use the helper function for events listing pages:

```tsx
import { generateMultipleEventSchemas } from "@/components/StructuredData";

const events = [
  { name: "Event 1", startDate: "2025-01-15T09:00:00+05:30", location: "Indore" },
  { name: "Event 2", startDate: "2025-02-10T10:00:00+05:30", location: "Bhopal" }
];

const schema = generateMultipleEventSchemas(events);

// Manual implementation
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
/>
```

## SEO Benefits

### Event Schema
- Rich snippets in search results with date, location, and ticket info
- Google Calendar integration
- Event discovery in Google Maps
- Enhanced visibility in event-related searches

### DonateAction Schema
- "Donate" rich cards in search results
- Google Pay integration readiness
- Enhanced trust signals for non-profit organizations
- Better visibility in donation-related searches

### ContactPoint Schema
- Rich contact cards in search results
- Multiple contact methods displayed
- Business hours visibility
- Language support indicators

## Best Practices

1. **Always provide required data** for Event schema
2. **Use ISO 8601 format** for dates
3. **Include high-quality images** for better visual appeal
4. **Keep descriptions concise but informative** (150-300 characters)
5. **Update schemas regularly** to reflect current information
6. **Test schemas** using Google's Rich Results Test tool

## Integration with Existing SEO

The StructuredData component works seamlessly with your existing SEO setup:
- Complements Next.js metadata
- Enhances existing schema templates
- Maintains consistency with your NGO's branding
- Supports your current SEO strategy

## Technical Notes

- Uses `dangerouslySetInnerHTML` for proper JSON-LD rendering
- Client-side component for flexibility
- TypeScript support for type safety
- Error handling for missing required data
- Automatic formatting for readability
