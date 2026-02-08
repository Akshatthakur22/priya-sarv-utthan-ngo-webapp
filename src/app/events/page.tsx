import { getEvents } from "@/services/event.service";
import { FloatingDonate } from "@/components/layout/FloatingDonate";
import type { Metadata } from "next";
import { MapPin, Calendar, Heart, Users, Sparkles, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Events | Priya Sarv Utthan Seva Sansthan",
  description: "Explore our community events, health camps, education drives, and social initiatives. See the impact we're making in Indore and beyond.",
  keywords: [
    "events", "NGO", "Indore", "community", "health camp", "education drive", "workshop", "social work", "outreach", "India", "nonprofit", "impact", "children", "women empowerment"
  ],
  openGraph: {
    title: "Our Events & Impact | Priya Sarv Utthan Seva Sansthan",
    description: "Explore our community events, health camps, education drives, and social initiatives.",
    url: "https://priyasarvutthan.org/events",
    images: [
      {
        url: "https://priyasarvutthan.org/icon.png",
        width: 512,
        height: 512,
        alt: "Priya Sarv Utthan Seva Sansthan events"
      }
    ],
    type: "article"
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Events & Impact | Priya Sarv Utthan Seva Sansthan",
    description: "Explore our community events, health camps, education drives, and social initiatives.",
    images: ["https://priyasarvutthan.org/icon.png"]
  },
  alternates: { canonical: "https://priyasarvutthan.org/events" }
};

const eventGallery = [
  {
    id: 1,
    image: "/images/real.png",
    title: "Community Health Camp",
    description: "Free health checkups and medicines distributed to 200+ families in Gandhi Nagar.",
    hindiLine: "स्वस्थ समाज, सुखी जीवन",
    location: "Gandhi Nagar, Indore",
    date: "January 2025",
    category: "Health",
    icon: Shield
  },
  {
    id: 2,
    image: "/images/real1.png",
    title: "Education for All Drive",
    description: "Distributed books, stationery, and school bags to underprivileged children.",
    hindiLine: "पढ़ेगा इंदौर, बढ़ेगा इंदौर",
    location: "Indore, MP",
    date: "December 2024",
    category: "Education",
    icon: Sparkles
  },
  {
    id: 3,
    image: "/images/real2.png",
    title: "Women Empowerment Workshop",
    description: "Skill training and self-help group formation for 50+ women.",
    hindiLine: "शक्ति महिला, शक्ति समाज",
    location: "Indore",
    date: "November 2024",
    category: "Empowerment",
    icon: Users
  },
  {
    id: 4,
    image: "/images/real3.png",
    title: "Children's Day Celebration",
    description: "Joyful event with games, gifts, and meals for orphanage children.",
    hindiLine: "हंसते बच्चे, रोशन कल",
    location: "Indore Orphanage",
    date: "November 2024",
    category: "Children",
    icon: Heart
  },
  {
    id: 5,
    image: "/images/real4.png",
    title: "Food Distribution Drive",
    description: "Nutritious meals served to 500+ people in slum areas during festivals.",
    hindiLine: "अन्न है तो प्राण है",
    location: "Slum Areas, Indore",
    date: "October 2024",
    category: "Food",
    icon: Heart
  },
  {
    id: 6,
    image: "/images/real5.png",
    title: "Blood Donation Camp",
    description: "Community members donated 150+ units of blood to save lives.",
    hindiLine: "रक्तदान है महादान",
    location: "City Hospital, Indore",
    date: "September 2024",
    category: "Health",
    icon: Shield
  },
  {
    id: 7,
    image: "/images/real6.png",
    title: "Old Age Pension Issue Awareness",
    description: "Awareness drive and support for elderly citizens regarding old age pension schemes and issues.",
    hindiLine: "वृद्धावस्था पेंशन, हर बुजुर्ग का अधिकार",
    location: "Indore",
    date: "August 2024",
    category: "Care",
    icon: Heart
  },
  {
    id: 8,
    image: "/images/real7.png",
    title: "Legal Awareness Camp",
    description: "Free legal counseling and awareness on women's rights.",
    hindiLine: "जानो अधिकार, बढ़ो आगे",
    location: "Community Center",
    date: "July 2024",
    category: "Legal Aid",
    icon: Shield
  },
  {
    id: 9,
    image: "/images/real8.png",
    title: "Senior Citizen Care Day",
    description: "Medical checkups and companionship for elderly residents.",
    hindiLine: "आदर वृद्धों का, धरोहर समाज की",
    location: "Old Age Home, Indore",
    date: "June 2025",
    category: "Care",
    icon: Heart
  },
  {
    id: 10,
    image: "/images/real9.png",
    title: "Sports for Youth",
    description: "Inter-school sports competition promoting fitness and teamwork.",
    hindiLine: "खेल से शक्ति, शक्ति से प्रगति",
    location: "Sports Ground, Indore",
    date: "May 2025",
    category: "Sports",
    icon: Users
  },
  {
    id: 11,
    image: "/images/real10.png",
    title: "Skill Development Training",
    description: "Computer and vocational training for unemployed youth.",
    hindiLine: "कौशल से रोजगार, रोजगार से समृद्धि",
    location: "Training Center",
    date: "April 2025",
    category: "Training",
    icon: Sparkles
  },
  {
    id: 12,
    image: "/images/real11.png",
    title: "Women Empowerment Sewing Training",
    description: "Skill development and sewing training for women to promote self-reliance and employment.",
    hindiLine: "स्वावलंबन की ओर, सशक्त महिलाएं",
    location: "Indore",
    date: "March 2025",
    category: "Empowerment",
    icon: Users
  },
  {
    id: 13,
    image: "/images/real12.png",
    title: "Festival with Elders and Children",
    description: "Diwali celebration bringing joy to senior citizens and children together.",
    hindiLine: "ट्योहार की रोशनी, दिलों में खुशी",
    location: "Senior Care Center",
    date: "November 2025",
    category: "Celebration",
    icon: Heart
  },
  {
    id: 14,
    image: "/images/real13.png",
    title: "Legal Literacy Camp",
    description: "Awareness and legal rights session for 200+ girls at local girls' school.",
    hindiLine: "कानूनी ज्ञान, बेटियों का सम्मान",
    location: "Girls' School, Indore",
    date: "December 2025",
    category: "Legal Aid",
    icon: Shield
  }
];

const eventList = [
  {
    name: "Health Camp 2026",
    startDate: "2026-03-15",
    location: "Indore, India"
  },
  {
    name: "Education Drive",
    startDate: "2026-04-10",
    location: "Indore, India"
  }
];


const eventsJsonLd = {
  "@context": "https://schema.org",
  "@graph": eventList.map(evt => ({
    "@type": "Event",
    "name": evt.name,
    "startDate": evt.startDate,
    "location": {
      "@type": "Place",
      "name": evt.location
    }
  }))
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }} />
      
      {/* Hero Section - Warm and Inviting */}
      <section className="relative bg-gradient-to-br from-primary/10 via-surface-cream to-accent-peach-light py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent-coral/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative mx-auto max-w-6xl px-4 text-center md:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-primary shadow-sm mb-6">
            <Heart className="h-4 w-4 fill-primary" />
            Our Journey of Service
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-ink mb-6 leading-tight">
            Events That <span className="text-primary">Touch Hearts</span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-body max-w-2xl mx-auto leading-relaxed">
            Every image tells a story of hope, compassion, and community. 
            Explore our journey of making a difference together.
          </p>
        </div>
      </section>

      {/* Impact Stats - Quick Overview */}
      <section className="bg-white border-y border-neutral-muted/10">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-bold text-primary">14+</p>
              <p className="text-sm text-neutral-muted">Major Events</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-bold text-accent-coral">2000+</p>
              <p className="text-sm text-neutral-muted">Lives Impacted</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-bold text-support-green">500+</p>
              <p className="text-sm text-neutral-muted">Volunteers</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-bold text-support-blue-dark">50+</p>
              <p className="text-sm text-neutral-muted">Communities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Gallery - Image First Design */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-20 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-ink mb-3">
            Gallery of Impact
          </h2>
          <p className="text-neutral-muted">Visual stories from our recent initiatives</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {eventGallery.map((event) => {
            const IconComponent = event.icon;
            return (
              <article 
                key={event.id} 
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-muted/10"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-neutral-ink shadow-sm">
                    <IconComponent className="h-3.5 w-3.5 text-primary" />
                    {event.category}
                  </span>
                  
                  {/* Hindi Impact Line - Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-bold text-lg md:text-xl leading-tight drop-shadow-lg">
                      {event.hindiLine}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-lg text-neutral-ink leading-snug">
                    {event.title}
                  </h3>
                  
                  <p className="text-sm text-neutral-body leading-relaxed">
                    {event.description}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 pt-2 text-xs text-neutral-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.location}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="bg-surface-offwhite py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary-dark mb-4">
              <Calendar className="h-4 w-4" />
              Coming Soon
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-ink mb-3">
              Upcoming Events
            </h2>
            <p className="text-neutral-muted">Join us in our upcoming initiatives</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {events.map((evt) => (
              <div key={evt.id} className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-muted/10 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-neutral-ink mb-1">{evt.title}</h3>
                  <p className="text-sm text-neutral-muted">{evt.date} • {evt.location}</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-support-green/10 px-3 py-1.5 text-xs font-semibold text-support-green-dark w-fit">
                  Open to volunteers
                </span>
              </div>
            ))}
            {events.length === 0 && (
              <div className="bg-white rounded-2xl p-8 text-center">
                <p className="text-neutral-body">
                  We regularly conduct awareness programs, training workshops, and community outreach activities in Gandhi Nagar, Indore. 
                  Check back soon for upcoming events or contact us to learn about our ongoing initiatives.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-dark to-accent-coral-dark py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-ink mb-4">
            Want to Be Part of Our Story?
          </h2>
          <p className="text-neutral-body mb-8 max-w-xl mx-auto">
            Join hundreds of volunteers who are making a difference in our community.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-primary-dark hover:shadow-xl"
          >
            Get Involved
          </a>
        </div>
      </section>

      <FloatingDonate />
    </>
  );
}