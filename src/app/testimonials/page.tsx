
"use client";
import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { generateCanonicalUrl, generateBreadcrumbSchema } from "@/lib/seo-utils";

const canonicalUrl = generateCanonicalUrl("/testimonials");

const testimonials = [
  {
    name: "Smt. Kamla Devi",
    role: "Pension Beneficiary",
    hindi: "जगदीश जी की मदद से मेरी पेंशन शुरू हुई, अब मुझे किसी पर निर्भर नहीं रहना पड़ता।",
    english: "With Mr. Jagdish's help, my pension finally started. I no longer have to depend on others for my basic needs.",
    color: "#e67e22"
  },
  {
    name: "Rahul Sharma",
    role: "Law Student / Volunteer",
    hindi: "विधिक साक्षरता शिविरों के माध्यम से मुझे कानून की शक्ति का सही ज्ञान मिला।",
    english: "Through the legal literacy camps, I gained real knowledge about the power of our constitutional rights.",
    color: "#1a2a6c"
  },
  {
    name: "Sunita Ahirwar",
    role: "Skill Training Student",
    hindi: "संस्था के सिलाई प्रशिक्षण केंद्र से जुड़कर मैं आज आत्मनिर्भर बन गई हूँ।",
    english: "By joining the NGO's vocational training center, I am now self-reliant and supporting my family.",
    color: "#27ae60"
  },
  {
    name: "Dr. Alok Gupta",
    role: "Community Supporter",
    hindi: "समाज के अंतिम व्यक्ति तक न्याय पहुँचाने का यह मिशन वास्तव में सराहनीय है।",
    english: "This mission to bring justice to the very last person in society is truly commendable and transparent.",
    color: "#1a2a6c"
  },
  {
    name: "Meena Bi",
    role: "Widow Pension Mission",
    hindi: "₹600 पेंशन बढ़ाने की लड़ाई में जगदीश जाधव जी हमारे सबसे बड़े साथी हैं।",
    english: "In the fight to increase the ₹600 pension, Mr. Jagdish Jadhav is our strongest ally and voice.",
    color: "#e67e22"
  }
];


export default function TestimonialsPage() {
  // Schema markup for testimonials (Review/Testimonial)
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": testimonials.map((t, i) => ({
      "@type": "Review",
      "position": i + 1,
      "reviewBody": t.english,
      "reviewBodyHindi": t.hindi,
      "author": {
        "@type": "Person",
        "name": t.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": 5,
        "bestRating": 5
      },
      "about": {
        "@type": "NGO",
        "name": "Priya Sarv Utthan Seva Sansthan"
      }
    }))
  };
  const breadcrumbSchema = generateBreadcrumbSchema("/testimonials");

  return (
    <div className="testimonial-page">
      <Head>
        <title>Testimonials &amp; Success Stories | Priya Sarv Utthan Seva Sansthan, Indore</title>
        <meta name="description" content="Read real testimonials from beneficiaries, volunteers, and supporters of Priya Sarv Utthan Seva Sansthan. Discover the impact of our NGO in Indore through authentic voices." />
        <meta name="keywords" content="NGO testimonials Indore, Priya Sarv Utthan reviews, beneficiary stories, volunteer experiences, social impact Indore, women empowerment stories, legal aid success, community development feedback" />
        <link rel="canonical" href={canonicalUrl} />
        {/* OpenGraph */}
        <meta property="og:title" content="Testimonials &amp; Success Stories | Priya Sarv Utthan Seva Sansthan, Indore" />
        <meta property="og:description" content="Read real testimonials from beneficiaries, volunteers, and supporters of Priya Sarv Utthan Seva Sansthan. Discover the impact of our NGO in Indore through authentic voices." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Priya Sarv Utthan Seva Sansthan" />
        <meta property="og:image" content="/images/og-testimonials.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Testimonials - Priya Sarv Utthan Seva Sansthan, Indore" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Testimonials &amp; Success Stories | Priya Sarv Utthan Seva Sansthan, Indore" />
        <meta name="twitter:description" content="Read real testimonials from beneficiaries, volunteers, and supporters of Priya Sarv Utthan Seva Sansthan. Discover the impact of our NGO in Indore through authentic voices." />
        <meta name="twitter:image" content="/images/og-testimonials.jpg" />
        {/* Schema.org */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>
      <style jsx>{`
        .testimonial-page {
          background: linear-gradient(120deg, #f8fafc 0%, #f3f4f6 100%);
          min-height: 100vh;
          padding: 2.5rem 0.5rem 2rem 0.5rem;
          font-family: 'Inter', sans-serif;
        }

        .header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 2.5rem auto;
        }

        .header h1 {
          font-size: 2.2rem;
          color: #1a2a6c;
          margin-bottom: 0.5rem;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .header-hindi {
          font-family: 'Mukta', sans-serif;
          font-size: 1.1rem;
          color: #e67e22;
          font-weight: 700;
          display: block;
          margin-bottom: 0.5rem;
        }

        .header h2 {
          font-size: 1.1rem;
          color: #1a2a6c;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .header p {
          color: #444;
          font-size: 1rem;
          margin-bottom: 0;
        }

        .testimonial-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          max-width: 800px;
          margin: 0 auto;
        }

        @media (min-width: 700px) {
          .testimonial-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.2rem;
          }
        }

        .card {
          background: #fff;
          padding: 1.7rem 1.3rem 1.3rem 1.3rem;
          border-radius: 20px;
          box-shadow: 0 2px 16px rgba(30,42,108,0.09);
          display: flex;
          flex-direction: column;
          align-items: stretch;
          border: none;
          position: relative;
          transition: box-shadow 0.2s, transform 0.18s;
          min-height: 220px;
        }

        .card:hover {
          box-shadow: 0 8px 32px rgba(30,42,108,0.16);
          transform: translateY(-4px) scale(1.012);
        }

        .quote-icon {
          font-size: 2.2rem;
          color: #e7eaf3;
          position: absolute;
          top: 1.1rem;
          right: 1.3rem;
          line-height: 1;
        }

        .hindi-text {
          font-family: 'Mukta', sans-serif;
          font-size: 1.13rem;
          color: #222;
          font-weight: 600;
          line-height: 1.55;
          margin-bottom: 0.5rem;
          word-break: break-word;
        }

        .english-text {
          font-size: 1.01rem;
          color: #555;
          line-height: 1.6;
          font-style: italic;
          margin-bottom: 1.1rem;
          word-break: break-word;
        }

        .profile {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }

        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1.35rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.09);
        }

        .info h4 {
          margin: 0;
          color: #1a2a6c;
          font-size: 1.08rem;
          font-weight: 700;
        }

        .info p {
          margin: 0;
          font-size: 0.85rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .internal-links {
          margin: 2.5rem auto 0 auto;
          text-align: center;
        }
        .internal-links a {
          color: #e67e22;
          margin: 0 0.8rem;
          font-weight: 600;
          text-decoration: underline;
          font-size: 1rem;
          transition: color 0.15s;
        }
        .internal-links a:hover {
          color: #1a2a6c;
        }

        .cta-section {
          text-align: center;
          margin-top: 3.5rem;
          color: #1a2a6c;
          font-weight: bold;
        }
        .cta-section button {
          background-color: #e67e22;
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 50px;
          cursor: pointer;
          margin-top: 1rem;
          font-size: 1rem;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(230,103,34,0.08);
          transition: background 0.15s;
        }
        .cta-section button:hover {
          background-color: #1a2a6c;
        }
      `}</style>

      <div className="header">
        <span className="header-hindi">जन सेवा का प्रभाव: हमारे लाभार्थियों की आवाज़</span>
        <h1>Voices of Impact</h1>
        <h2>Real Testimonials from Beneficiaries, Volunteers & Supporters</h2>
        <p>Discover how Priya Sarv Utthan Seva Sansthan is changing lives in Indore through empowerment, legal aid, and community support.</p>
      </div>

      <div className="testimonial-grid" aria-label="Testimonials">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true }}
            className="card"
            aria-label={`Testimonial by ${t.name}`}
          >
            <div className="quote-icon" aria-hidden="true">“</div>
            <p className="hindi-text">{t.hindi}</p>
            <p className="english-text">{t.english}</p>
            <div className="profile">
              <div className="avatar" style={{ backgroundColor: t.color }} aria-label={`Avatar for ${t.name}`}>
                {t.name.charAt(0)}
              </div>
              <div className="info">
                <h4>{t.name}</h4>
                <p>{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="internal-links">
        <a href="/about">About Us</a>
        <a href="/team">Our Team</a>
        <a href="/donate">Donate</a>
        <a href="/contact">Contact</a>
      </div>

      <div className="cta-section">
        <p>Join our mission to create more stories like these.</p>
        <button
          onClick={() => window.location.href = '/donate'}
          aria-label="Support Our Cause by Donating"
        >
          Support Our Cause
        </button>
      </div>
    </div>
  );
}