"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { TrustSection } from "@/components/sections/TrustSection";
import { WorkInAction } from "@/components/sections/WorkInAction";
import { MasonryGallery } from "@/components/sections/MasonryGallery";
import { StorySections } from "@/components/sections/StorySections";
import { ImpactTicker } from "@/components/sections/ImpactTicker";
import { triggerButtonHaptic } from "@/utils/haptics";
import { ChevronLeft, ChevronRight } from "lucide-react";

const values = [
  {
    title: "Community First",
    hindi: "समुदाय के साथ चलना ही असली रास्ता है।",
    desc: "We don't decide for people — we listen, understand, and work together with families in Gandhi Nagar to find what really helps.",
    emoji: "🤝"
  },
  {
    title: "Built on Trust",
    hindi: "भरोसा सबसे बड़ी चीज़ है।",
    desc: "As a registered NGO, we're committed to being open about where donations go and what impact they create. You can count on us.",
    emoji: "💎"
  },
  {
    title: "Lasting Change",
    hindi: "जल्दबाज़ी में कुछ नहीं होता।",
    desc: "Quick fixes don't work. We focus on programs that make a real, long-term difference in people's lives.",
    emoji: "🌱"
  }
];

export default function HomeMotionSections() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.85;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Full-width Hero Slider */}
      <HeroSlider />

      {/* Image-to-Text Story Sections */}
      <StorySections />

      {/* Work in Action */}
      <WorkInAction />

      {/* Trust & Credibility Section */}
      <TrustSection />

      {/* Values Section - Mobile: Horizontal Swipe Carousel */}
      <section className="bg-surface-paper py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600 mb-4">
              🙏 What We Believe
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-neutral-900">
              Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Values</span>
            </h2>
            <p className="text-base text-neutral-body leading-relaxed mt-4">
              We uphold <strong>Transparency</strong>, <strong>Corruption-free Administration</strong>, and <strong>Legal Literacy</strong> as the pillars of our organization. Every initiative is designed to empower communities with trust and accountability.
            </p>
          </motion.div>

          {/* Mobile: Horizontal Carousel */}
          <div className="relative md:hidden">
            {/* Carousel Navigation Buttons */}
            <button
              onClick={() => scrollCarousel("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-neutral-600 active:scale-90 touch-manipulation -ml-2"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-neutral-600 active:scale-90 touch-manipulation -mr-2"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {values.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="flex-shrink-0 w-[85vw] max-w-[320px] snap-center bg-white rounded-[2rem] p-6 border border-neutral-100 shadow-sm active:scale-[0.98] touch-manipulation transition-transform"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                  <p className="mt-3 text-neutral-600 leading-relaxed text-sm">{item.desc}</p>
                  <p className="mt-4 text-sm italic text-orange-500 font-medium">{item.hindi}</p>
                </motion.div>
              ))}
            </div>

            {/* Swipe Hint */}
            <p className="text-center text-xs text-neutral-400 mt-2 pb-16">← Swipe to explore →</p>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid gap-6 md:grid-cols-3">
            {values.map((item, index) => (
              <motion.div
                key={item.title}
                className="group bg-white rounded-[2rem] p-6 md:p-8 border border-neutral-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-500 active:scale-[0.98]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-bold text-neutral-900 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                <p className="mt-3 text-neutral-600 leading-relaxed">{item.desc}</p>
                <p className="mt-4 text-sm italic text-orange-500 font-medium">{item.hindi}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-10 md:mt-12 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            <a
              href="/donate"
              onClick={() => triggerButtonHaptic(100)}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 
                         px-8 py-4 min-h-[52px] text-base sm:text-lg font-semibold text-white 
                         shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 
                         active:scale-95 touch-manipulation transition-all"
            >
              Join This Mission
            </a>
            <a
              href="/careers"
              onClick={() => triggerButtonHaptic(100)}
              className="inline-flex items-center justify-center rounded-full border-2 border-neutral-200 bg-white 
                         px-8 py-4 min-h-[52px] text-base sm:text-lg font-semibold text-neutral-700 
                         hover:border-orange-200 hover:bg-orange-50 
                         active:scale-95 touch-manipulation transition-all"
            >
              Work With Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* Masonry Gallery */}
      <MasonryGallery />

      {/* Live Impact Ticker */}
      <ImpactTicker />
    </>
  );
}
