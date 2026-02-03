import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testimonials | Your NGO Name',
  description: 'Read testimonials and reviews from people whose lives have been touched by Your NGO Name. Discover the impact of our work through their stories.',
  keywords: [
    'testimonials',
    'reviews',
    'stories',
    'impact',
    'Your NGO Name',
    'NGO',
    'nonprofit',
    'community',
    'feedback',
    'supporters',
    'beneficiaries',
    'social work',
    'charity'
  ],
  openGraph: {
    title: 'Testimonials | Priya Sarv Utthan Seva Sansthan',
    description: 'Read inspiring stories from our beneficiaries and supporters.',
    url: 'https://priyasarvutthan.org/testimonials',
    type: 'website',
    images: [
      {
        url: '/images/og-testimonials.jpg',
        width: 1200,
        height: 630,
        alt: 'Testimonials for Priya Sarv Utthan Seva Sansthan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Testimonials | Priya Sarv Utthan Seva Sansthan',
    description: 'Read inspiring stories from our beneficiaries and supporters.',
    images: ['/images/og-testimonials.jpg'],
    site: '@priyasarvutthan',
    creator: '@priyasarvutthan',
  },
  alternates: {
    canonical: 'https://priyasarvutthan.org/testimonials',
  },
};

import Script from 'next/script';

export const metadata: Metadata = {
  title: "Testimonials | Priya Sarv Utthan Seva Sansthan",
  description: "Read inspiring stories from our beneficiaries and supporters.",
  keywords: ["testimonials", "stories", "NGO", "Priya Sarv Utthan Seva Sansthan"],
  openGraph: {
    title: "Testimonials | Priya Sarv Utthan Seva Sansthan",
    description: "Read inspiring stories from our beneficiaries and supporters.",
    url: "https://priyasarvutthan.org/testimonials",
    type: "article"
  },
  twitter: {
    card: "summary",
    title: "Testimonials | Priya Sarv Utthan Seva Sansthan",
    description: "Read inspiring stories from our beneficiaries and supporters."
  },
  alternates: { canonical: "https://priyasarvutthan.org/testimonials" }
};


// Example testimonials data for Review schema
const testimonials = [
  {
    "@type": "Review",
    "reviewBody": "Thanks to Priya Sarv Utthan Seva Sansthan, I was able to complete my education and start my own business.",
    "author": { "@type": "Person", "name": "Meena Kumari" },
    "reviewRating": { "@type": "Rating", "ratingValue": "5" }
  },
  {
    "@type": "Review",
    "reviewBody": "The health camps organized by the NGO helped my family access vital medical care.",
    "author": { "@type": "Person", "name": "Ravi Patel" },
    "reviewRating": { "@type": "Rating", "ratingValue": "5" }
  },
  {
    "@type": "Review",
    "reviewBody": "Volunteering with Priya Sarv Utthan Seva Sansthan has been a life-changing experience.",
    "author": { "@type": "Person", "name": "Suman Singh" },
    "reviewRating": { "@type": "Rating", "ratingValue": "5" }
  }
];

const reviewsJsonLd = {
  "@context": "https://schema.org",
  "@graph": testimonials
};

export default function TestimonialsPage() {
  return (
    <>
      <Script
        id="testimonials-reviews-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
      <div className="bg-white py-12 px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Testimonials</h1>
        <div className="space-y-8 mb-12">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-6 shadow">
              <h2 className="text-xl font-semibold mb-2">{t.author.name}</h2>
              <p className="text-gray-700">{t.reviewBody}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a href="/donate" className="inline-block bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700">Support Our Work</a>
        </div>
      </div>
    </>
  );
}
