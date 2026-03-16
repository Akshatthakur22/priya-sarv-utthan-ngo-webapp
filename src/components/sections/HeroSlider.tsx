"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const heroSlides = [
  {
    src: "/images/child1.png",
    alt: "Children receiving quality education at Priya Sarv Utthan Seva Sansthan's learning center in Indore - Empowering underprivileged students through academic excellence",
    headline: "Every Child Deserves a Chance",
    subtext: "Education opens doors that change lives forever.",
  },
  {
    src: "/images/woman.png",
    alt: "Women empowerment session at Priya Sarv Utthan Seva Sansthan - Skill development and economic independence programs in Madhya Pradesh",
    headline: "Empowering Women, Building Futures",
    subtext: "When women rise, families and communities rise with them.",
  },
  {
    src: "/images/child3.png",
    alt: "Happy children at Priya Sarv Utthan learning center in Gandhi Nagar, Indore - Transforming young lives through education since 1999",
    headline: "Hope Begins Here",
    subtext: "In Gandhi Nagar, Indore — transforming lives since 1999.",
  },
  {
    src: "/images/woman2.png",
    alt: "Women learning new skills together at Priya Sarv Utthan vocational training center - Building economic independence through skill development",
    headline: "Skills That Transform Lives",
    subtext: "From tailoring to computers — creating paths to independence.",
  },
  {
    src: "/images/child4.png",
    alt: "Children enjoying educational activities at Priya Sarv Utthan Seva Sansthan - Holistic child development and learning programs",
    headline: "Nurturing Tomorrow's Leaders",
    subtext: "Every smile tells a story of hope and possibilities.",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight - 100, behavior: "smooth" });
  };

  return (
    <section className="relative h-[100svh] md:h-[85vh] min-h-[550px] md:min-h-[600px] w-full overflow-hidden">
      {/* Image Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={heroSlides[currentSlide].src}
            alt={heroSlides[currentSlide].alt}
            fill
            priority
            fetchPriority="high"
            className="object-cover object-top md:object-center"
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBRIhBhMiMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEQA/AK6f1Jdx6lapdW6yQu4DxHHII96rp+sXUOoW7XFuksCuN0ePIr/aKKE2nZWp6F2f/9k="
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Gradient Overlay - Enhanced for mobile text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 md:from-black/80 md:via-black/40 md:to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:from-black/50" />

      {/* Content - Mobile: Bottom aligned for vertical storytelling */}
      <div className="relative z-10 flex h-full flex-col justify-end md:justify-center px-4 pb-28 md:pb-0 md:px-12 lg:px-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4 md:mb-6 inline-flex items-center gap-2 rounded-full bg-orange-500/20 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold text-orange-300 border border-orange-400/30"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            27 Years of Impact • Since 1999
          </motion.span>

          {/* Headline - Mobile optimized font sizes */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`headline-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3 md:mb-4"
            >
              {heroSlides[currentSlide].headline}
            </motion.h1>
          </AnimatePresence>

          {/* Subtext - Mobile optimized */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`subtext-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-6 md:mb-8 max-w-2xl leading-relaxed"
            >
              {heroSlides[currentSlide].subtext}
            </motion.p>
          </AnimatePresence>

          {/* CTA Buttons - Mobile: Full width, 50px+ height for thumb tapping */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Link
              href="/donate"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 
                         px-6 sm:px-8 py-4 min-h-[52px] text-base sm:text-lg font-semibold text-white 
                         shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 
                         active:scale-95 touch-manipulation transition-all w-full sm:w-auto"
            >
              ❤️ Support Our Mission
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-sm 
                         px-6 sm:px-8 py-4 min-h-[52px] text-base sm:text-lg font-semibold text-white 
                         hover:bg-white/20 active:scale-95 touch-manipulation transition-all w-full sm:w-auto"
            >
              Our Story
            </Link>
          </motion.div>
        </div>

        {/* Slide Indicators - Mobile: Centered */}
        <div className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 lg:left-20 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 md:h-2 rounded-full transition-all duration-300 active:scale-90 touch-manipulation ${
                currentSlide === index
                  ? "w-10 bg-orange-500"
                  : "w-2.5 md:w-2 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
      >
        <span className="text-sm font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
