import { Gavel, AlertTriangle, Heart, MessageCircle, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help & Legal Support | Priya Sarva Utthaan Seva Sansthan",
  description:
    "Free legal aid, grievance redressal, and welfare support in Indore. Priya Sarva Utthaan Seva Sansthan connects you with advocates, authorities, and community resources.",
  keywords: [
    "NGO legal aid Indore",
    "free legal help India",
    "grievance redressal NGO",
    "welfare support Indore",
    "Priya Sarva Utthaan",
  ],
  openGraph: {
    title: "Help & Legal Support | Priya Sarva Utthaan",
    description:
      "Get free legal aid, file complaints, and access welfare support in Indore. We're committed to justice and community care.",
    url: "https://priyautthaan.org/help",
    siteName: "Priya Sarva Utthaan Seva Sansthan",
    images: [
      {
        url: "/images/og-legal-aid.jpg",
        width: 1200,
        height: 630,
        alt: "Legal Aid and Support in Indore",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Help & Legal Support | Priya Sarva Utthaan",
    description: "Free legal aid and welfare support in Indore.",
  },
};

const SERVICES = [
  {
    id: "legal",
    title: "Legal Advocacy",
    description:
      "Connect with advocates and legal authorities for justice, rights protection, and urgent legal help. We guide you through the process.",
    icon: Gavel,
    bg: "bg-blue-50",
    border: "border-blue-100",
    iconColor: "text-blue-500",
    titleColor: "text-blue-800",
    textColor: "text-blue-900",
    btnBg: "bg-blue-600 hover:bg-blue-700",
    link: "/help/legal",
    cta: "Get Legal Aid",
  },
  {
    id: "grievance",
    title: "Grievance Redressal",
    description:
      "Report social injustice, local issues, or any grievance. We ensure your voice is heard and escalate to the right authorities.",
    icon: AlertTriangle,
    bg: "bg-red-50",
    border: "border-red-100",
    iconColor: "text-red-500",
    titleColor: "text-red-800",
    textColor: "text-red-900",
    btnBg: "bg-red-600 hover:bg-red-700",
    link: "/help/complaint",
    cta: "File a Complaint",
  },
  {
    id: "welfare",
    title: "General Welfare",
    description:
      "Need help with education, health, or community support? Our team is here for you and your family.",
    icon: Heart,
    bg: "bg-orange-50",
    border: "border-orange-100",
    iconColor: "text-orange-500",
    titleColor: "text-orange-800",
    textColor: "text-orange-900",
    btnBg: "bg-orange-500 hover:bg-orange-600",
    link: "/help/welfare",
    cta: "Get Support",
  },
];

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-neutral-50/60 px-3 py-8 md:px-6 md:py-12 font-sans">
      <section className="max-w-5xl mx-auto" aria-labelledby="help-heading">
        {/* Header */}
        <header className="mb-10 text-center md:text-left">
          <p className="text-xs font-extrabold text-orange-500 tracking-widest uppercase mb-2">
            Help & Support
          </p>
          <h1
            id="help-heading"
            className="text-3xl md:text-4xl font-black text-neutral-900 mb-3 tracking-tight"
          >
            How can we help you today?
          </h1>
          <p className="text-neutral-500 text-base md:text-lg max-w-2xl mx-auto md:mx-0">
            Choose a service below or chat with us for immediate assistance. We're here 24/7.
          </p>
        </header>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {SERVICES.map((service) => (
            <section
              key={service.id}
              id={service.id}
              className={`rounded-3xl p-7 ${service.bg} ${service.border} border shadow-lg flex flex-col items-center text-center transition-transform hover:scale-[1.02] active:scale-100`}
              aria-labelledby={`${service.id}-title`}
            >
              <service.icon className={`${service.iconColor} mb-4`} size={40} aria-hidden="true" />
              <h2
                id={`${service.id}-title`}
                className={`font-bold text-lg ${service.titleColor} mb-2`}
              >
                {service.title}
              </h2>
              <p className={`${service.textColor} mb-5 text-sm leading-relaxed`}>
                {service.description}
              </p>
              <Link
                href={service.link}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${service.btnBg} text-white font-bold text-sm shadow transition-all active:scale-95 touch-manipulation`}
                aria-label={service.cta}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {service.cta} <ArrowRight size={16} />
              </Link>
            </section>
          ))}
        </div>

        {/* Crisis Banner */}
        <section
          className="rounded-3xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 text-white p-7 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
          aria-labelledby="crisis-banner"
        >
          <div className="flex items-center gap-4">
            <MessageCircle size={36} className="text-white shrink-0" aria-hidden="true" />
            <div>
              <h2 id="crisis-banner" className="font-bold text-lg md:text-xl">
                In crisis? We're just a message away.
              </h2>
              <p className="text-white/80 text-sm">
                Chat with our team on WhatsApp for immediate help, 24/7.
              </p>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <a
              href="https://wa.me/919806502882"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-orange-600 font-black text-base shadow hover:bg-orange-50 transition-all active:scale-95 touch-manipulation"
              aria-label="Chat on WhatsApp"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <MessageCircle size={20} /> WhatsApp
            </a>
            <a
              href="tel:+919806502882"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 text-white border border-white/40 font-bold text-base shadow hover:bg-white/30 transition-all active:scale-95 touch-manipulation"
              aria-label="Call Now"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <Phone size={20} /> Call Now
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
