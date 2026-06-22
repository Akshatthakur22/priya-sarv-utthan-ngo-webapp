const BASE_URL = "https://priyasarvutthan.org";
const IST_OFFSET = "+05:30";

const MONTH_MAP: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};

/** Convert human-readable or partial dates to ISO 8601 datetime (IST). */
export function toIso8601Date(date: string): string {
  const trimmed = date.trim();

  if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed)) {
    return trimmed;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return `${trimmed}T09:00:00${IST_OFFSET}`;
  }

  const monthYearMatch = trimmed.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (monthYearMatch) {
    const month = MONTH_MAP[monthYearMatch[1].toLowerCase()];
    if (month) {
      return `${monthYearMatch[2]}-${month}-01T09:00:00${IST_OFFSET}`;
    }
  }

  const parsed = new Date(trimmed);
  if (!isNaN(parsed.getTime())) {
    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, "0");
    const day = String(parsed.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}T09:00:00${IST_OFFSET}`;
  }

  return `${new Date().getFullYear()}-01-01T09:00:00${IST_OFFSET}`;
}

export function toAbsoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function generateEventSchema(
  eventData: {
    name: string;
    description: string;
    startDate: string;
    endDate?: string;
    location: string;
    image?: string;
    url?: string;
    organizer?: string;
  },
  options?: { includeContext?: boolean }
) {
  const startDate = toIso8601Date(eventData.startDate);
  const endDate = eventData.endDate ? toIso8601Date(eventData.endDate) : startDate.replace("T09:00:00", "T18:00:00");

  const schema = {
    "@type": "Event",
    name: eventData.name,
    description: eventData.description,
    startDate,
    endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: eventData.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: eventData.location.includes("Indore") ? "Indore" : eventData.location,
        addressRegion: "Madhya Pradesh",
        addressCountry: "IN",
      },
    },
    organizer: {
      "@type": "Organization",
      name: eventData.organizer || "Priya Sarv Utthan Seva Sansthan",
      url: BASE_URL,
    },
    image: eventData.image ? toAbsoluteUrl(eventData.image) : `${BASE_URL}/images/og-default.jpg`,
    url: eventData.url || `${BASE_URL}/events`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      validFrom: startDate,
    },
    performer: {
      "@type": "Organization",
      name: "Priya Sarv Utthan Seva Sansthan",
    },
  };

  if (options?.includeContext === false) {
    return schema;
  }

  return {
    "@context": "https://schema.org",
    ...schema,
  };
}

const EMPLOYMENT_TYPE_MAP: Record<string, string> = {
  internship: "INTERN",
  volunteer: "VOLUNTEER",
  "part-time": "PART_TIME",
  "full-time": "FULL_TIME",
  contract: "CONTRACTOR",
};

function mapEmploymentType(commitment: string): string {
  const normalized = commitment.toLowerCase();
  for (const [key, value] of Object.entries(EMPLOYMENT_TYPE_MAP)) {
    if (normalized.includes(key)) return value;
  }
  return "OTHER";
}

export function generateJobPostingSchema(job: {
  title: string;
  description: string;
  commitment: string;
  datePosted?: string;
  validThrough?: string;
}) {
  const datePosted = job.datePosted || new Date().toISOString().split("T")[0];
  const validThrough =
    job.validThrough ||
    new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  return {
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted,
    validThrough,
    employmentType: mapEmploymentType(job.commitment),
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "69B, Mangal Marg, Gandhi Nagar",
        addressLocality: "Indore",
        addressRegion: "Madhya Pradesh",
        postalCode: "452005",
        addressCountry: "IN",
      },
    },
    hiringOrganization: {
      "@type": "Organization",
      name: "Priya Sarv Utthan Seva Sansthan",
      sameAs: BASE_URL,
      logo: `${BASE_URL}/icon.png`,
      description:
        "A registered NGO dedicated to women empowerment, education, and community development in Indore since 1999.",
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "INR",
      value: {
        "@type": "QuantitativeValue",
        value: 0,
        unitText: "MONTH",
      },
    },
  };
}
