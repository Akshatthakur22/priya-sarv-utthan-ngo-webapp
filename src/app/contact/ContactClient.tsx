"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Users, Instagram, Facebook, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const CONTACT = {
  email: "priyasarvuthan@gmail.com",
  phone: "+91 9977177059",
  address: "69B, Mangal Marg, Gandhi Nagar, Indore",
  whatsappGroup: "https://chat.whatsapp.com/DGYpDQSt3kK23DAGixeELC",
  instagram: "https://www.instagram.com/priyasarvutthan?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  facebook: "https://facebook.com/priyasarvutthaan",
  maps: "https://www.google.com/maps?q=69B,+Mangal+Marg,+Gandhi+Nagar,+Indore",
};

export default function ContactClient() {
  return (
    <main className="min-h-screen bg-neutral-50/60 px-2 py-6 md:px-4 md:py-10 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-black text-neutral-900 mb-2 tracking-tight">
          Contact Us
        </h1>
        <p className="text-lg text-neutral-500 font-light mb-8">
          We'd love to hear from you. Reach out for support, collaboration, or to join our community.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 gap-y-10">
          {/* Left: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl border border-amber-100 p-5 md:p-8 flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <Mail className="text-amber-500" size={22} />
              <a
                href={`mailto:${CONTACT.email}`}
                className="font-bold text-neutral-900 hover:text-amber-600 transition-colors"
              >
                {CONTACT.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-amber-500" size={22} />
              <a
                href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}
                className="font-bold text-neutral-900 hover:text-amber-600 transition-colors"
              >
                {CONTACT.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-amber-500" size={22} />
              <span className="font-bold text-neutral-900">{CONTACT.address}</span>
            </div>
            <div className="mt-8">
              <p className="text-xs font-extrabold text-neutral-400 tracking-widest mb-3">FOLLOW OUR JOURNEY</p>
              <div className="flex items-center gap-8 md:gap-6">
                <Link
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neutral-600 hover:text-pink-500 font-bold text-base transition-colors px-2 py-2 rounded-xl active:bg-neutral-100"
                  aria-label="Instagram"
                >
                  {/* Colorful Instagram SVG icon, larger for mobile */}
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="6" fill="url(#ig-gradient)"/>
                    <defs>
                      <linearGradient id="ig-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F58529"/>
                        <stop offset="0.5" stopColor="#DD2A7B"/>
                        <stop offset="1" stopColor="#515BD4"/>
                      </linearGradient>
                    </defs>
                    <path d="M16.98 2H7.02C4.25 2 2 4.25 2 7.02V16.98C2 19.75 4.25 22 7.02 22H16.98C19.75 22 22 19.75 22 16.98V7.02C22 4.25 19.75 2 16.98 2ZM20 16.98C20 18.09 18.91 19.18 16.98 19.18H7.02C5.09 19.18 4 18.09 4 16.98V7.02C4 5.91 5.09 4.82 7.02 4.82H16.98C18.91 4.82 20 5.91 20 7.02V16.98Z" fill="white"/>
                    <path d="M12 7.5C9.51 7.5 7.5 9.51 7.5 12C7.5 14.49 9.51 16.5 12 16.5C14.49 16.5 16.5 14.49 16.5 12C16.5 9.51 14.49 7.5 12 7.5ZM12 14.5C10.62 14.5 9.5 13.38 9.5 12C9.5 10.62 10.62 9.5 12 9.5C13.38 9.5 14.5 10.62 14.5 12C14.5 13.38 13.38 14.5 12 14.5Z" fill="white"/>
                    <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
                  </svg>
                  Instagram
                </Link>
                <Link
                  href={CONTACT.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neutral-600 hover:text-blue-600 font-bold text-base transition-colors px-2 py-2 rounded-xl active:bg-neutral-100"
                  aria-label="Facebook"
                >
                  {/* Colorful Facebook SVG icon, larger for mobile */}
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="6" fill="#1877F3"/>
                    <path d="M15.67 8.5H14.5V7.5C14.5 7.22 14.72 7 15 7H15.67V5H14.5C13.12 5 12 6.12 12 7.5V8.5H10V10.5H12V19H14.5V10.5H15.67L16 8.5Z" fill="white"/>
                  </svg>
                  Facebook
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right: WhatsApp Community Card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl border border-amber-100 p-5 md:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Users className="text-amber-500" size={22} />
                <span className="font-black text-neutral-900 text-lg">WhatsApp Community</span>
              </div>
              <p className="text-neutral-700 font-medium mb-4">
                Join our WhatsApp group for real-time updates, volunteering opportunities, and to connect with other change-makers.
              </p>
            </div>
            <Link
              href={CONTACT.whatsappGroup}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-lg transition-all mt-2"
            >
              <MessageCircle size={18} /> Join WhatsApp Group <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* Google Maps Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10"
        >
          <div className="w-full rounded-3xl overflow-hidden shadow-lg border border-amber-100 mb-4">
            <iframe
              src="https://www.google.com/maps?q=69B,+Mangal+Marg,+Gandhi+Nagar,+Indore&output=embed"
              title="Priya Sarva Utthaan Seva Sansthan Location - Gandhi Nagar, Indore"
              width="100%"
              height="240"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="w-full h-[220px] md:h-[320px] rounded-3xl"
            />
          </div>
          <Link
            href={CONTACT.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs md:text-sm shadow transition-all"
          >
            <MapPin size={18} /> Open Google Maps
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
