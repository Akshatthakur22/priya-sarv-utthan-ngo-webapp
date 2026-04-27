"use client";
import { motion, Variants } from "framer-motion";
import Image from 'next/image';

// Fixed Type for Framer Motion to prevent TS Errors
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

export default function FounderClient() {
  return (
    <div className="pageWrapper">
      <style jsx>{`
        .pageWrapper {
          background-color: #ffffff;
          min-height: 100vh;
          padding: 4rem 1.5rem;
          font-family: 'Inter', sans-serif; /* Modern English Font */
          color: #1a1a1a;
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* Responsive Layout Grid */
        .mainGrid {
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        @media (min-width: 992px) {
          .mainGrid {
            flex-direction: row;
            align-items: flex-start;
          }
        }

        /* Left Side: Photo & Quick Stats */
        .sidebar {
          flex: 1;
          position: sticky;
          top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .imageFrame {
          width: 100%;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .imageFrame img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Right Side: Content */
        .contentBody {
          flex: 1.5;
        }

        .badge {
          color: #e67e22;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
          display: block;
        }

        h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          color: #1a2a6c;
          margin: 0;
          line-height: 1.1;
        }

        .hindiSubtitle {
          font-family: 'Mukta', sans-serif;
          font-size: 1.5rem;
          color: #555;
          margin: 1rem 0 2rem 0;
          border-left: 4px solid #e67e22;
          padding-left: 1rem;
        }

        /* Stats Grid */
        .statsGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .statCard {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 16px;
          text-align: center;
        }

        .statCard h2 {
          color: #1a2a6c;
          font-size: 2rem;
          margin: 0;
        }

        .statCard p {
          font-size: 0.9rem;
          color: #666;
          margin: 0.5rem 0 0 0;
        }

        /* Mission Alert Section */
        .missionBox {
          background: #1a2a6c;
          color: white;
          padding: 2rem;
          border-radius: 20px;
          margin-bottom: 3rem;
        }

        .missionBox h3 {
          color: #f39c12;
          margin-top: 0;
        }

        /* Topic Cards */
        .topicGrid {
          display: grid;
          gap: 2rem;
        }

        .topicCard h4 {
          font-size: 1.25rem;
          color: #1a2a6c;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .topicCard p {
          color: #444;
          line-height: 1.7;
        }

        .footerQuote {
          margin-top: 4rem;
          text-align: center;
          padding: 2rem;
          background: #fdf2e9;
          border-radius: 100px;
        }

        .hindiQuote {
          font-family: 'Mukta', sans-serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: #1a2a6c;
        }

        @media (max-width: 768px) {
          .statsGrid { grid-template-columns: 1fr; }
          .footerQuote { border-radius: 20px; }
        }
      `}</style>

      <div className="container">
        <div className="mainGrid">
          
          {/* LEFT SIDE: Visuals */}
          <motion.aside initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="sidebar">
            <div className="imageFrame">
              <Image 
                src="/images/founder_founderpage.png" 
                alt="Mr. Jagdish Jadhav - Founder and Social Activist"
                priority
                width={900}
                height={900}
                className="w-full h-auto"
              />
            </div>
            
            
          </motion.aside>

          {/* RIGHT SIDE: Information */}
          <motion.main variants={fadeInUp} initial="hidden" animate="visible" className="contentBody">
            <span className="badge">Founder & Social Activist</span>
            <h1>Mr. Jagdish Jadhav</h1>
            
            {/* SOLID HINDI LINE */}
            <p className="hindiSubtitle">
              समर्पित सामाजिक कार्यकर्ता एवं जनहित के लिए निरंतर सक्रिय व्यक्तित्व।
            </p>

            <p className="leadDescription">
              With a background in Social Work (BSW) and extensive legal expertise, Mr. Jagdish Jadhav 
              serves as a <strong>Para-Legal Volunteer (PLV)</strong> under the District Legal Services Authority (DLSA), 
              Indore Court. He bridges the gap between the law and the common citizen.
            </p>

            {/* PRIORITY MISSION */}
            <section className="missionBox">
              <h3>The ₹600 Pension Mission</h3>
              <p>
                Mr. Jadhav is actively campaigning to increase the current ₹600 monthly social pension 
                for the elderly, widows, and the disabled. He believes this amount is insufficient for 
                a life of dignity and works tirelessly for policy reform.
              </p>
            </section>

            <div className="topicGrid">
              <div className="topicCard">
                <h4>⚖️ Legal Literacy & BNS 2023</h4>
                <p>
                  Expert in Indian constitutional rights and the <strong>New Criminal Laws (BNS 2023)</strong>. 
                  He provides free legal guidance and effective representation before human rights commissions 
                  and administrative departments.
                </p>
              </div>

              <div className="topicCard">
                <h4>🎓 Empowerment & Education</h4>
                <p>
                  Focused on quality education for underprivileged children and career counseling for youth. 
                  Through skill training and vocational workshops, he empowers the next generation to be 
                  self-reliant (Aatmanirbhar).
                </p>
              </div>

              <div className="topicCard">
                <h4>🛡️ Transparency & Governance</h4>
                <p>
                  Advocating for a corruption-free, accountable system. He educates citizens on their 
                  rights and legal grievance procedures to ensure administrative transparency.
                </p>
              </div>
            </div>

            <div className="footerQuote">
              <p className="hindiQuote">
                "शिक्षा, कानून और ईमानदार व्यवस्था ही एक सशक्त समाज की नींव हैं।"
              </p>
              <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#666' }}>
                (Education, law, and an honest system are the foundations of a strong society)
              </p>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
}
