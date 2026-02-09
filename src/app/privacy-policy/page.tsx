"use client";
import React from "react";
import Script from "next/script";
import { motion } from "framer-motion";

// Content in English with Solid Hindi Lines for Trust
const policySections = [
  {
    title: "1. Data Collection & Purpose",
    hindi: "हम आपकी जानकारी की सुरक्षा के लिए प्रतिबद्ध हैं।",
    content: "We collect personal information (Name, Email, Phone, PAN for 80G) only when you voluntarily provide it for donations, volunteering, or legal aid inquiries. This data is used solely for administrative and communication purposes."
  },
  {
    title: "2. Donation & Financial Security",
    hindi: "आपका दान सुरक्षित और पारदर्शी है।",
    content: "All financial transactions are processed through secure gateways. We do not store your credit/debit card details. Per Indian law, we collect PAN details to issue tax-exemption certificates (Form 10BE)."
  },
  {
    title: "3. Legal Aid Confidentiality",
    hindi: "कानूनी सहायता के दौरान आपकी जानकारी पूरी तरह गोपनीय रहती है।",
    content: "Given our work in legal literacy and child/women rights, any sensitive information shared during legal counseling is handled with the highest level of confidentiality under attorney-client privilege guidelines."
  },
  {
    title: "4. Third-Party Disclosure",
    hindi: "हम आपकी जानकारी किसी के साथ साझा नहीं करते।",
    content: "Priya Sarv Utthan Seva Sansthan does not sell, trade, or rent your personal data. We only share information with government authorities when required by law (e.g., for audit purposes)."
  }
];

export default function PrivacyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Priya Sarv Utthan Seva Sansthan",
    "url": "https://priyasarvutthan.org",
    "description": "Registered NGO dedicated to women empowerment and legal literacy.",
    "logo": "https://priyasarvutthan.org/logo.png",
    "address": "Indore, Madhya Pradesh",
  };

  return (
    <>
      <div className="page-container">
        <style jsx>{`
          .page-container {
            background-color: #fcfcfc;
            min-height: 100vh;
            padding: 4rem 1rem;
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
          }
          .policy-wrapper {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          }
          header {
            text-align: center;
            margin-bottom: 3rem;
            border-bottom: 2px solid #f0f0f0;
            padding-bottom: 2rem;
          }
          h1 {
            font-size: 2.5rem;
            color: #1a2a6c;
            margin-bottom: 1rem;
          }
          .last-updated {
            color: #666;
            font-size: 0.95rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 0.5rem;
          }
          .intro-hindi {
            font-family: 'Mukta', sans-serif;
            font-size: 1.2rem;
            color: #e67e22;
            font-weight: 600;
            text-align: center;
            margin-bottom: 2rem;
          }
          .section {
            margin-bottom: 2rem;
          }
          .section-title {
            font-size: 1.4rem;
            color: #1a2a6c;
            margin-bottom: 0.5rem;
            font-weight: 700;
          }
          .hindi-line {
            font-family: 'Mukta', sans-serif;
            font-size: 1.05rem;
            color: #555;
            font-weight: 600;
            margin-bottom: 0.75rem;
            display: block;
          }
          .content-text {
            color: #444;
            font-size: 1.05rem;
          }
          .contact-box {
            background: #f8f9fa;
            padding: 2rem;
            border-radius: 12px;
            margin-top: 2.2rem;
            border-left: 6px solid #1a2a6c;
          }
          .contact-box a {
            color: #1a2a6c;
            font-weight: 700;
            text-decoration: underline;
          }
          @media (max-width: 768px) {
            .policy-wrapper { padding: 2rem 0.8rem; }
            h1 { font-size: 2rem; }
            .page-container { padding: 2.2rem 0.5rem; }
            .section { margin-bottom: 1.2rem; }
          }
        `}</style>

        <Script
          id="ngo-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="policy-wrapper"
        >
          <header>
            <h1>Privacy Policy</h1>
            <p className="last-updated">Last Updated: February 2026</p>
          </header>

          <p className="intro-hindi">
            "आपकी गोपनीयता और हमारे बीच का विश्वास ही हमारी संस्था की नींव है।"
          </p>

          <section className="intro">
            <p className="content-text">
              At <strong>Priya Sarv Utthan Seva Sansthan</strong>, we value the trust you place in us when you support our mission for women empowerment and social justice. This policy outlines how we handle your data in compliance with Indian laws and global privacy standards. For more information, visit our <a href="/contact" style={{color:'#1a2a6c', textDecoration:'underline'}}>Contact page</a>.
            </p>
          </section>

          {policySections.map((section, index) => (
            <div key={index} className="section">
              <h2 className="section-title">{section.title}</h2>
              <span className="hindi-line">{section.hindi}</span>
              <p className="content-text">{section.content}</p>
            </div>
          ))}

          <div className="section">
            <h2 className="section-title">Your Rights</h2>
            <p className="content-text">
              You have the right to view, correct, or request deletion of your personal data held by us. To exercise these rights, please contact us at <a href="mailto:priyasarvutthan@gmail.com" style={{color:'#1a2a6c', textDecoration:'underline'}}>priyasarvutthan@gmail.com</a>.
            </p>
          </div>

          <div className="contact-box">
            <h2 className="section-title">Questions or Grievances?</h2>
            <p className="content-text">
              If you wish to access, correct, or delete your personal information, or have any concerns regarding our privacy practices, please contact our Data Protection Officer at:
              <br /><br />
              Email: <a href="mailto:priyasarvutthan@gmail.com">priyasarvutthan@gmail.com</a>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}