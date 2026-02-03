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



// Example testimonials data for Review schema
const testimonials = [
  {
    "@type": "Review",
    "reviewBody": "Thanks to Priya Sarv Utthan Seva Sansthan, I was able to complete my education and start my own business.",
    "author": { "@type": "Person", "name": "Meena Kumari" },
    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
    "image": "/images/woman1.png"
  },
  {
    "@type": "Review",
    "reviewBody": "The health camps organized by the NGO helped my family access vital medical care. My children now receive regular check-ups.",
    "author": { "@type": "Person", "name": "Sunita Devi" },
    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
    "image": "/images/woman2.png"
  },
  {
    "@type": "Review",
    "reviewBody": "Volunteering with Priya Sarv Utthan Seva Sansthan has been a life-changing experience. I've learned so much.",
    "author": { "@type": "Person", "name": "Kavita Singh" },
    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
    "image": "/images/woman3.png"
  },
  {
    "@type": "Review",
    "reviewBody": "The tailoring skills I learned here helped me become financially independent. Now I support my entire family.",
    "author": { "@type": "Person", "name": "Rekha Verma" },
    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
    "image": "/images/woman4.png"
  },
  {
    "@type": "Review",
    "reviewBody": "My daughter got free tuition and school supplies. Today she dreams of becoming a doctor!",
    "author": { "@type": "Person", "name": "Geeta Bai" },
    "reviewRating": { "@type": "Rating", "ratingValue": "5" },
    "image": "/images/woman5.png"
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
      
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img 
          src="/images/random.png" 
          alt="Community stories" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-orange-200 border border-orange-400/30 mb-4">
            💬 Real Stories
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Voices of Change</h1>
          <p className="text-lg text-white/80 max-w-xl">Hear from the people whose lives have been touched by our work</p>
        </div>
      </div>

      <div className="bg-neutral-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white rounded-[2rem] p-6 shadow-lg border border-neutral-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={t.image} 
                    alt={t.author.name} 
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-orange-100"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-neutral-900">{t.author.name}</h2>
                    <div className="flex gap-1 text-orange-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-neutral-600 leading-relaxed italic">"{t.reviewBody}"</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a href="/donate" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105">
              Support Our Work
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
