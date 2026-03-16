"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Scale, BookOpen, Heart, Users } from "lucide-react";

const stories = [
  {
    id: "legal",
    image: "/images/random1.png",
    imageAlt: "Legal aid camp in progress by Priya Sarv Utthan Seva Sansthan - Free legal consultation and rights education for marginalized communities in Madhya Pradesh",
    imagePosition: "left",
    icon: Scale,
    badge: "Legal Aid",
    title: "Justice for the Voiceless",
    description:
      "Our free legal aid camps have helped over 500 families navigate the legal system. From property disputes to domestic violence cases, we provide free consultation, document assistance, and court representation for those who cannot afford it.",
    stats: [
      { label: "Cases Handled", value: "500+" },
      { label: "Free Consultations", value: "2,000+" },
    ],
    cta: { text: "Get Legal Help", href: "/help/legal" },
  },
  {
    id: "education",
    image: "/images/child3.png",
    imageAlt: "Happy child with a book at Priya Sarv Utthan learning center in Gandhi Nagar, Indore - Free education and mentorship for underprivileged children",
    imagePosition: "right",
    icon: BookOpen,
    badge: "Education",
    title: "Opening Doors Through Learning",
    description:
      "Every child deserves an education, regardless of their family's income. Our learning centers in Gandhi Nagar provide free tuition, school supplies, and mentorship to children who might otherwise fall through the cracks.",
    stats: [
      { label: "Children Enrolled", value: "350+" },
      { label: "First-Gen Learners", value: "85%" },
    ],
    cta: { text: "Support Education", href: "/donate" },
  },
  {
    id: "women",
    image: "/images/woman2.png",
    imageAlt: "Women learning vocational skills at Priya Sarv Utthan Seva Sansthan - Economic empowerment through tailoring, handicrafts, and computer literacy programs",
    imagePosition: "left",
    icon: Heart,
    badge: "Women Empowerment",
    title: "When Women Rise, Families Thrive",
    description:
      "Through skill training in tailoring, handicrafts, and computer literacy, we help women become financially independent. Our self-help groups create a support network where women learn, earn, and grow together.",
    stats: [
      { label: "Women Trained", value: "1,200+" },
      { label: "Now Self-Employed", value: "60%" },
    ],
    cta: { text: "Join Our Programs", href: "/careers" },
  },
  {
    id: "community",
    image: "/images/child4.png",
    imageAlt: "Community health and welfare camp by Priya Sarv Utthan Seva Sansthan - Healthcare services and ration distribution for rural families in Madhya Pradesh",
    imagePosition: "right",
    icon: Users,
    badge: "Community Welfare",
    title: "Building Stronger Communities",
    description:
      "From health camps to ration distribution, we address immediate needs while building long-term resilience. Our volunteers work directly with families to understand and solve their unique challenges.",
    stats: [
      { label: "Families Supported", value: "3,000+" },
      { label: "Health Camps", value: "100+" },
    ],
    cta: { text: "Volunteer With Us", href: "/careers" },
  },
];

export function StorySections() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600 mb-4">
            ✨ Our Impact Areas
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-neutral-900 mb-3 md:mb-4">
            Stories of <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Transformation</span>
          </h2>
          <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
            Real change happens when we address root causes.
          </p>
        </motion.div>

        {/* Story Sections - Mobile: Image on top (vertical), Desktop: Alternating */}
        <div className="space-y-12 md:space-y-24">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col gap-6 md:gap-12 lg:gap-16 ${
                story.imagePosition === "right"
                  ? "md:flex-row-reverse"
                  : "md:flex-row"
              } items-center`}
            >
              {/* Image - Always on top on mobile for vertical storytelling */}
              <div className="flex-1 w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative aspect-[4/3] rounded-2xl md:rounded-[3rem] overflow-hidden shadow-xl md:shadow-2xl shadow-neutral-200 active:scale-[0.98] touch-manipulation transition-transform"
                >
                  <Image
                    src={story.image}
                    alt={story.imageAlt}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBRIhBhMiMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEQA/AK6f1Jdx6lapdW6yQu4DxHHII96rp+sXUOoW7XFuksCuN0ePIr/aKKE2nZWp6F2f/9k="
                  />
                  {/* Floating Badge */}
                  <div className="absolute top-4 left-4 md:top-6 md:left-6">
                    <div className="flex items-center gap-1.5 md:gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2 shadow-lg">
                      <story.icon className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                      <span className="text-xs md:text-sm font-semibold text-neutral-800">{story.badge}</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-4 md:space-y-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight">
                  {story.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed">
                  {story.description}
                </p>

                {/* Stats - Mobile: Smaller */}
                <div className="flex gap-6 md:gap-8">
                  {story.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                        {stat.value}
                      </p>
                      <p className="text-xs md:text-sm text-neutral-500">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* CTA - Mobile: Full width, 50px+ height */}
                <Link
                  href={story.cta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 
                             px-6 py-3.5 min-h-[50px] text-sm font-semibold text-white 
                             shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 
                             active:scale-95 touch-manipulation transition-all w-full sm:w-auto"
                >
                  {story.cta.text}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
