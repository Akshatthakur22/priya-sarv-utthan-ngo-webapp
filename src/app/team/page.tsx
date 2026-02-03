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
    image: "/images/team/priya.jpg",
    bio: "Priya has led the organization since its inception, focusing on women empowerment and education."
  },
  {
    name: "Amit Verma",
    role: "Program Director",
    image: "/images/team/amit.jpg",
    bio: "Amit oversees all program operations and community outreach initiatives."
  },
  {
    name: "Sunita Joshi",
    role: "Finance Lead",
    image: "/images/team/sunita.jpg",
    bio: "Sunita manages finances and ensures transparency in all donations and expenditures."
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
    <div className="bg-white py-12 px-4 max-w-4xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-4xl font-bold mb-8 text-center">Our Team</h1>
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {team.map((member) => (
          <div key={member.name} className="bg-gray-50 rounded-lg p-6 text-center shadow">
            <img src={member.image} alt={member.name} className="w-24 h-24 mx-auto rounded-full mb-4 object-cover" />
            <h2 className="text-xl font-semibold mb-1">{member.name}</h2>
            <p className="text-blue-600 mb-2">{member.role}</p>
            <p className="text-gray-700 text-sm">{member.bio}</p>
          </div>
        ))}
      </div>
      <div className="text-center">
        <a href="/contact" className="inline-block bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700">Contact Our Team</a>
      </div>
    </div>
  );
}
