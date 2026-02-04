"use client";
import React from "react";
import { motion } from "framer-motion";

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
  return (
    <div className="testimonial-page">
      <style jsx>{`
        .testimonial-page {
          background-color: #f8f9fa;
          min-height: 100vh;
          padding: 5rem 1.5rem;
          font-family: 'Inter', sans-serif;
        }

        .header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 4rem auto;
        }

        .header h1 {
          font-size: 3rem;
          color: #1a2a6c;
          margin-bottom: 1rem;
        }

        .header-hindi {
          font-family: 'Mukta', sans-serif;
          font-size: 1.4rem;
          color: #e67e22;
          font-weight: 600;
          display: block;
          margin-bottom: 1rem;
        }

        .testimonial-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .card {
          background: white;
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          position: relative;
          display: flex;
          flex-direction: column;
          border: 1px solid #f0f0f0;
          transition: transform 0.3s ease;
        }

        .card:hover {
          transform: translateY(-10px);
        }

        .quote-icon {
          font-size: 3rem;
          color: #eee;
          position: absolute;
          top: 1rem;
          right: 1.5rem;
          line-height: 1;
        }

        .hindi-text {
          font-family: 'Mukta', sans-serif;
          font-size: 1.25rem;
          color: #333;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
        }

        .english-text {
          font-size: 1rem;
          color: #666;
          line-height: 1.6;
          font-style: italic;
          margin-bottom: 2rem;
        }

        .profile {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .info h4 {
          margin: 0;
          color: #1a2a6c;
          font-size: 1.1rem;
        }

        .info p {
          margin: 0;
          font-size: 0.85rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .header h1 { font-size: 2.2rem; }
          .testimonial-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="header">
        <span className="header-hindi">"जन सेवा का प्रभाव: हमारे लाभार्थियों की आवाज़"</span>
        <h1>Voices of Impact</h1>
        <p>Real stories of change from the people we serve and the volunteers who lead the mission.</p>
      </div>

      <div className="testimonial-grid">
        {testimonials.map((t, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="card"
          >
            <div className="quote-icon">“</div>
            <p className="hindi-text">{t.hindi}</p>
            <p className="english-text">{t.english}</p>
            
            <div className="profile">
              <div className="avatar" style={{ backgroundColor: t.color }}>
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

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        style={{ textAlign: 'center', marginTop: '5rem', color: '#1a2a6c', fontWeight: 'bold' }}
      >
        <p>Join our mission to create more stories like these.</p>
        <button 
          onClick={() => window.location.href = '/donate'} 
          style={{ 
            backgroundColor: '#e67e22', 
            color: 'white', 
            border: 'none', 
            padding: '12px 30px', 
            borderRadius: '50px',
            cursor: 'pointer',
            marginTop: '1rem',
            fontSize: '1rem'
          }}
        >
          Support Our Cause
        </button>
      </motion.div>
    </div>
  );
}