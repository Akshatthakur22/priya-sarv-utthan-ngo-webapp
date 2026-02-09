"use client";
import React from "react";
import Script from "next/script";
import { motion } from "framer-motion";

const termsSections = [
  {
    title: "1. Acceptance of Terms",
    hindi: "इस वेबसाइट का उपयोग करके, आप हमारे नियमों को स्वीकार करते हैं।",
    content: "By accessing priyasarvutthan.org, you agree to be bound by these Terms and Conditions. Our services are intended to provide legal literacy and social support to the community."
  },
  {
    title: "2. Donation & Refund Policy",
    hindi: "दान की प्रक्रिया और पारदर्शिता।",
    content: "Donations are processed via secure channels. As per Indian law, donations once made are generally non-refundable. We provide 80G tax-exemption receipts for all eligible donations made within India."
  },
  {
    title: "3. Legal Aid Disclaimer",
    hindi: "विधिक जानकारी और परामर्श की सीमाएँ।",
    content: "Information provided on this platform regarding New Criminal Laws (BNS 2023) or human rights is for educational purposes. It does not constitute a formal lawyer-client relationship until a specific case is officially taken up by our legal cell."
  },
  {
    title: "4. Intellectual Property",
    hindi: "सामग्री के उपयोग के नियम।",
    content: "All content, including the mission details of Mr. Jagdish Jadhav and our organizational logos, are the property of Priya Sarv Utthan Seva Sansthan. Unauthorized reproduction is strictly prohibited."
  },
  {
    title: "5. Limitation of Liability",
    hindi: "हमारी जिम्मेदारी की सीमा।",
    content: "While we strive for 100% accuracy in our legal literacy missions, the Sansthan is not liable for actions taken by individuals based solely on website content without professional consultation."
  }
];

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms and Conditions | Priya Sarv Utthan Seva Sansthan",
    "url": "https://priyasarvutthan.org/terms",
    "description": "Official terms and conditions governing the use of our NGO platform and donation services.",
    "logo": "https://priyasarvutthan.org/logo.png",
    "address": "Indore, Madhya Pradesh",
    "telephone": "+91-XXXXXXXXXX"
  };

  return (
    <>
      <head>
        <link rel="canonical" href="https://priyasarvutthan.org/terms" />
      </head>
      <div className="terms-container">
        <style jsx>{`
          .terms-container {
            background-color: #f4f7f6;
            min-height: 100vh;
            padding: 5rem 1rem;
            font-family: 'Inter', sans-serif;
          }
          .content-card {
            max-width: 850px;
            margin: 0 auto;
            background: #ffffff;
            padding: 4rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            border-top: 8px solid #1a2a6c;
          }
          h1 {
            font-size: 2.8rem;
            color: #1a2a6c;
            text-align: center;
            margin-bottom: 0.5rem;
          }
          .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 2rem;
            font-weight: 500;
          }
          .hindi-lead {
            font-family: 'Mukta', sans-serif;
            display: block;
            background: #fff5eb;
            padding: 1rem;
            border-radius: 8px;
            color: #d35400;
            text-align: center;
            margin-bottom: 2.5rem;
            font-weight: 600;
          }
          .section {
            margin-bottom: 2.2rem;
          }
          .section-title {
            font-size: 1.5rem;
            color: #1a2a6c;
            margin-bottom: 0.5rem;
            font-weight: 700;
          }
          .hindi-sub {
            font-family: 'Mukta', sans-serif;
            color: #7f8c8d;
            font-size: 1.1rem;
            margin-bottom: 0.8rem;
            display: block;
          }
          .text {
            color: #2c3e50;
            line-height: 1.8;
            font-size: 1.05rem;
          }
          .footer-note {
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid #eee;
            font-size: 0.95rem;
            color: #7f8c8d;
          }
          @media (max-width: 768px) {
            .content-card { padding: 2.5rem 1.2rem; }
            h1 { font-size: 2rem; }
            .terms-container { padding: 2.5rem 0.5rem; }
            .section { margin-bottom: 1.5rem; }
          }
        `}</style>

        <Script
          id="terms-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="content-card"
        >
          <header>
            <h1>Terms & Conditions</h1>
            <p className="subtitle">Operational Guidelines of Priya Sarv Utthan Seva Sansthan. For more about our mission, see our <a href="/about" style={{color:'#1a2a6c', textDecoration:'underline'}}>About page</a>.</p>
            <p className="last-updated" style={{color:'#666', fontSize:'0.95rem', marginTop:'0.5rem'}}>Last Updated: February 2026</p>
          </header>

          <span className="hindi-lead">
            "नियम और शर्तें हमारे सेवा कार्यों की पारदर्शिता और सत्यनिष्ठा सुनिश्चित करती हैं।"
          </span>

          {termsSections.map((section, index) => (
            <div key={index} className="section">
              <h2 className="section-title">{section.title}</h2>
              <span className="hindi-sub">{section.hindi}</span>
              <p className="text">{section.content}</p>
            </div>
          ))}

          <div className="section">
            <h2 className="section-title">Your Rights</h2>
            <p className="text">
              You have the right to view, correct, or request deletion of your personal data held by us. To exercise these rights, please contact us at <a href="mailto:priyasarvutthan@gmail.com" style={{color:'#1a2a6c', textDecoration:'underline'}}>priyasarvutthan@gmail.com</a>.
            </p>
          </div>

          <div className="footer-note">
            <p>
              For any clarifications regarding our operational terms, please reach out to us at:
              <br />
              <strong>Email:</strong> priyasarvutthan@gmail.com
              <br />
              <strong>Location:</strong> Indore, Madhya Pradesh
            </p>
          </div>
        </motion.div>
      </div>
    </>
  )}