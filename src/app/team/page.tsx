import type { Metadata } from "next";
import { getMetadata } from "@/lib/seo-utils";
import { TeamMemberImage } from "@/components/ui/OptimizedImage";

export const metadata: Metadata = getMetadata("/team", {
  title: "Our Team | Priya Sarv Utthan Seva Sansthan",
  description: "Meet the dedicated team behind Priya Sarv Utthan Seva Sansthan.",
  keywords: ["team", "NGO", "leadership", "Priya Sarv Utthan Seva Sansthan"],
  ogImage: "/images/og-team.jpg",
  ogType: "profile"
});

const team = [
  ,
  {
    name: "Preeti Jadhav",
    role: "Secretary",
    image: "/images/Preeti_Jadhav.png",
    bio: "Mrs. Preeti Jadhav is the Secretary of the organization, leading administrative work and women empowerment programs."
  },
  {
    name: "Jyoti Mandal",
    role: "Division In-Charge (Ujjain)",
    image: "/images/Jyoti_Mandal.png",
    bio: "उज्जैन संभाग प्रभारी श्रीमती ज्योति मंडल. Address: 62 Shivdham Colony, Hamukhedi, Dewas Road, Ujjain, M.P. Contact: 8770669350"
  },
  {
    name: "Sunita Chauhan",
    role: "Vice President",
    image: "/images/Sunita_chauhan.png",
    bio: "Sunita oversees all program operations and community outreach initiatives. श्रीमती संगठीता चोहन कोषाध्यक्ष (Commitment to women's empowerment)"
  },
  {
    name: "Renu Thakur",
    role: "Education Coordinator",
    image: "/images/Renu_Thakur.png",
    bio: ""
  },
  {
    name: "Baal Sadhvi Vimla Devi Jain",
    role: "Animal & Bird Welfare Lead",
    image: "/images/Vimla_Devi.png",
    bio: "Baal Sadhvi Vimla Devi Jain leads our Animal & Bird Welfare initiatives, focusing on compassion, care, feeding, and protection of animals and birds. (पशु पक्षी सेवा)"
  },
  {
  "name": "Akshat Thakur",
  "role": "Software Developer & Platform Builder",
  "image": "/images/akki.png",
  "bio": "Akshat built and manages the NGO’s complete web platform, handling frontend, backend, automation, and integrations. A B.Tech CSE student, he leverages technology to drive impact and scale the organization’s reach."
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
                <TeamMemberImage src={member.image} alt={member.name} name={member.name} />
                <h2 className="text-xl font-bold text-neutral-900 mb-1">{member.name}</h2>
                <p className="text-orange-600 font-semibold mb-3">{member.role}</p>
                <p className="text-neutral-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>

          {/* Team Group Photo Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Together We Make a Difference</h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">Our united team working hand in hand to serve communities across Madhya Pradesh</p>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="/images/group_photo.png" 
                  alt="Priya Sarv Utthan Seva Sansthan Team - Group photo of all team members together" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              
              {/* Floating badges */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg px-4 py-2">
                <p className="text-xs text-orange-600 font-semibold">Team Strength</p>
                <p className="text-lg font-bold text-neutral-900">6+ Members</p>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-lg px-6 py-3">
                <p className="text-xs text-orange-100">Serving Since</p>
                <p className="text-lg font-bold text-white">1999</p>
              </div>
            </div>
          </div>

          {/* Team Achievements Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">Our Achievements</h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">Recognition and milestones that mark our journey of service</p>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-orange-50 to-amber-50 p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <img 
                      src="/images/achivement.png" 
                      alt="Team Achievements - Awards and recognition received by Priya Sarv Utthan Seva Sansthan" 
                      className="w-48 h-48 md:w-64 md:h-64 object-contain"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">Excellence in Service</h3>
                    <ul className="space-y-3 text-neutral-700">
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                        <span>State-level recognition for women empowerment programs</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                        <span>Award for excellence in education initiatives</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                        <span>Community service excellence award 2023</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                        <span>Recognition for sustainable development goals</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Achievement badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-lg p-4">
                <div className="text-center">
                  <span className="text-2xl">🏆</span>
                  <p className="text-xs text-white font-bold mt-1">Awarded</p>
                </div>
              </div>
            </div>
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
