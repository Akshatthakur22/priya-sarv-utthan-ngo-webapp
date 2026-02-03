import type { Metadata } from "next";
// Metadata for SEO and social sharing
export const metadata: Metadata = {
  title: "Our Team | Priya Sarv Utthan Seva Sansthan",
  description: "Meet the dedicated team behind Priya Sarv Utthan Seva Sansthan.",
  keywords: ["team", "NGO", "leadership", "Priya Sarv Utthan Seva Sansthan"],
  openGraph: {
    title: "Our Team | Priya Sarv Utthan Seva Sansthan",
    description: "Meet the dedicated team behind Priya Sarv Utthan Seva Sansthan.",
    url: "https://priyasarvutthan.org/team",
    type: "profile",
    images: [
      {
        url: "/images/og-team.jpg",
        width: 1200,
        height: 630,
        alt: "Our Team at Priya Sarv Utthan Seva Sansthan",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Our Team | Priya Sarv Utthan Seva Sansthan",
    description: "Meet the dedicated team behind Priya Sarv Utthan Seva Sansthan.",
    images: ["/images/og-team.jpg"],
    site: "@priyasarvutthan",
    creator: "@priyasarvutthan",
  },
  alternates: { canonical: "https://priyasarvutthan.org/team" }
};

const team = [
  {
    name: "Priya Sharma",
    role: "Founder & President",
    image: "/images/woman.png",
    bio: "Priya has led the organization since its inception, focusing on women empowerment and education."
  },
  {
    name: "Sunita Joshi",
    role: "Program Director",
    image: "/images/woman1.png",
    bio: "Sunita oversees all program operations and community outreach initiatives."
  },
  {
    name: "Meena Verma",
    role: "Finance Lead",
    image: "/images/woman4.png",
    bio: "Meena manages finances and ensures transparency in all donations and expenditures."
  },
  {
    name: "Kavita Patel",
    role: "Education Coordinator",
    image: "/images/woman2.png",
    bio: "Kavita leads our education programs and mentorship initiatives for children."
  },
  {
    name: "Rekha Singh",
    role: "Women Welfare Head",
    image: "/images/woman3.png",
    bio: "Rekha coordinates skill training programs and self-help groups for women."
  },
  {
    name: "Anita Kumari",
    role: "Community Outreach",
    image: "/images/woman5.png",
    bio: "Anita connects with local communities and manages volunteer activities."
  }
];


const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Priya Sarv Utthan Seva Sansthan",
  "url": "https://priyasarvutthan.org",
  "member": team.map(t => ({ "@type": "Person", name: t.name, jobTitle: t.role }))
};

export default function TeamPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Hero Section */}
      <div className="relative h-[35vh] min-h-[280px] overflow-hidden">
        <img 
          src="/images/child.png" 
          alt="Our dedicated team" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-orange-200 border border-orange-400/30 mb-4">
            👥 Meet The Team
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Dedicated Team</h1>
          <p className="text-lg text-white/80 max-w-xl">The passionate people driving change in our community</p>
        </div>
      </div>

      <div className="bg-neutral-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-[2rem] p-6 text-center shadow-lg border border-neutral-100 hover:shadow-xl transition-shadow">
                <img src={member.image} alt={member.name} className="w-28 h-28 mx-auto rounded-full mb-4 object-cover ring-4 ring-orange-100" />
                <h2 className="text-xl font-bold text-neutral-900 mb-1">{member.name}</h2>
                <p className="text-orange-600 font-semibold mb-3">{member.role}</p>
                <p className="text-neutral-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105">
              Contact Our Team
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
