

'use client';

import { MapPin, Calendar, Heart, Users, Sparkles, Shield, X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { generateEventSchema } from "@/lib/schema-utils";

const eventGallery = [
  {
    id: 1,
    image: "/images/real.png",
    title: "Community Health Camp",
    description: "Free health checkups and medicines distributed to 200+ families in Gandhi Nagar.",
    hindiLine: "स्वस्थ समाज, सुखी राष्ट्र",
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
    hindiLine: "शिक्षा सबका अधिकार, बेहतर भविष्य की ओर",
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
      hindiLine: "सशक्त महिला, सशक्त राष्ट्र",
      location: "Indore",
      date: "November 2024",
      category: "Empowerment",
      icon: Users,
    },
    {
      id: 4,
      image: "/images/real3.png",
      title: "Children's Day Celebration",
      description: "Joyful event with games, gifts, and meals for orphanage children.",
      hindiLine: "बचपन की मुस्कान, देश की शान",
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
      hindiLine: "भोजन ही जीवन है, सेवा ही धर्म है",
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
      hindiLine: "रक्तदान महादान, जीवनदान परम धर्म",
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
      hindiLine: "वृद्धजन सम्मान, सामाजिक धर्म",
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
      hindiLine: "कानूनी जागरूकता, सशक्त नागरिक",
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
      hindiLine: "बुजुर्गों का सम्मान, समाज का धर्म",
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
      hindiLine: "खेल कुशलता, युवा शक्ति",
      location: "Sports Ground, Indore",
      date: "May 2025",
      category: "Sports",
      icon: Users,
    },
    {
      id: 11,
      image: "/images/real10.png",
      title: "Skill Development Training",
      description: "Computer and vocational training for unemployed youth.",
      hindiLine: "कौशल विकास, रोजगार सृजन",
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
      hindiLine: "सिलाई कौशल, आत्मनिर्भरता",
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
      hindiLine: "त्योहार की खुशियां, सबके साथ",
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
      hindiLine: "कानूनी साक्षरता, बेटियों की सुरक्षा",
      location: "Girls' School, Indore",
      date: "December 2025",
      category: "Legal Aid",
      icon: Shield
    },
    {
      id: 15,
      image: "/events/event16-1.png",
      title: "Fruit Distribution for Cancer Patients",
      description: "Grapes were distributed to cancer patients receiving treatment at MY Hospital to support their health and bring comfort during treatment.",
      hindiLine: "पीड़ितों की सेवा ही सच्ची मानवता है",
      location: "MY Hospital, Indore",
      date: "2026-03-10",
      category: "Health Support",
      icon: Shield
    },
    {
      id: 16,
      image: "/events/event15-3.png",
      title: "Summer Fruit Service for Leprosy Families",
      description: "Distribution of approximately 230 kg of mixed fruits including watermelon, muskmelon, and chikoo for leprosy patients and their families.",
      hindiLine: "सेवा, करुणा और मानवता का संदेश",
      location: "Leprosy Colony, Pitra Parvat, Indore",
      date: "2026-03-15",
      category: "Food Service",
      icon: Heart
    },
    {
      id: 17,
      image: "/events/event15-1.png",
      title: "Community Fruit Service Initiative",
      description: "Fruit service program benefiting around 150 people including leprosy patients, their families, and other needy individuals in the community.",
      hindiLine: "परहित सरिस धर्म नहि भाई",
      location: "Pitra Parvat Area, Indore",
      date: "2026-03-15",
      category: "Community Service",
      icon: Users

    }
  ];

  const sortedEvents = [...eventGallery].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


interface EventGalleryProps {
  events: any[];
}

const eventsJsonLd = {
  "@context": "https://schema.org",
  "@graph": eventGallery.map((event) =>
    generateEventSchema(
      {
        name: event.title,
        description: event.description,
        startDate: event.date,
        location: event.location,
        image: Array.isArray(event.image) ? event.image[0] : event.image,
      },
      { includeContext: false }
    )
  ),
};


export default function EventGallery({ events }: EventGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<typeof eventGallery[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use sortedEvents for all rendering and navigation
  const openLightbox = (event: typeof eventGallery[0]) => {
    const index = sortedEvents.findIndex(e => e.id === event.id);
    setCurrentIndex(index);
    setSelectedImage(event);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    let newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0) newIndex = sortedEvents.length - 1;
    if (newIndex >= sortedEvents.length) newIndex = 0;
    setCurrentIndex(newIndex);
    setSelectedImage(sortedEvents[newIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!selectedImage) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateImage('prev');
    if (e.key === 'ArrowRight') navigateImage('next');
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }} />

      {/* Event Gallery - Image First Design */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-20 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-ink mb-3">
            Gallery of Impact
          </h2>
          <p className="text-neutral-muted">Visual stories from our recent initiatives</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {sortedEvents.map((event) => {
            const IconComponent = event.icon;
            const thumbnail = Array.isArray(event.image) ? event.image[0] : event.image;
            return (
              <article 
                key={event.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ease-out border border-neutral-muted/10 transform hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => openLightbox(event)}>
                  <img 
                    src={thumbnail}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Zoom Indicator */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(event);
                    }}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/95 backdrop-blur-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                    aria-label="View image"
                  >
                    <ZoomIn className="h-4 w-4 text-neutral-ink" />
                  </button>
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
                <div className="p-4 space-y-3">
                  <h3 className="font-bold text-base text-neutral-ink leading-snug line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-neutral-body leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                  {/* Meta Info */}
                  <div className="flex items-center justify-between pt-2 text-xs text-neutral-muted">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(event.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="truncate max-w-20">{event.location}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
            className="absolute left-4 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
            className="absolute right-4 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
          {/* Image */}
          <div className="max-w-4xl max-h-[80vh] mx-auto px-4">
            <img
              src={Array.isArray(selectedImage.image) ? selectedImage.image[0] : selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-full object-contain rounded-lg"
            />
            {/* Image Info */}
            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-lg mb-2">{selectedImage.hindiLine}</p>
              <p className="text-sm opacity-80">{selectedImage.description}</p>
              <div className="flex items-center justify-center gap-4 mt-2 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(selectedImage.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {selectedImage.location}
                </span>
              </div>
            </div>
          </div>
          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-white/20 px-3 py-1 rounded-full">
            {currentIndex + 1} / {sortedEvents.length}
          </div>
        </div>
      )}
    </>
  );
}
