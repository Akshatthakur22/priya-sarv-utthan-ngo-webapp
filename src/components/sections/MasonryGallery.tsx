"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";

const galleryImages = [
  {
    src: "/images/child1.png",
    alt: "Aanchal's first day at Priya Sarv Utthan Seva Sansthan school - Transforming lives through education in Indore",
    caption: "Aanchal's first day at school",
    height: "tall",
  },
  {
    src: "/images/woman.png",
    alt: "Sunita learning tailoring skills at women empowerment program - Skill development training at Priya Sarv Utthan NGO",
    caption: "Sunita learning tailoring skills",
    height: "normal",
  },
  {
    src: "/images/child3.png",
    alt: "Children during computer class - Digital literacy program by Priya Sarv Utthan Seva Sansthan in Madhya Pradesh",
    caption: "Children during computer class",
    height: "normal",
  },
  {
    src: "/images/woman2.png",
    alt: "Women's self-help group meeting at Priya Sarv Utthan Seva Sansthan - Economic empowerment and community development",
    caption: "Women's self-help group meeting",
    height: "tall",
  },
  {
    src: "/images/child4.png",
    alt: "School supply distribution day - Educational support program by Priya Sarv Utthan NGO for underprivileged children",
    caption: "School supply distribution day",
    height: "normal",
  },
  {
    src: "/images/woman3.png",
    alt: "Women at skill training workshop - Vocational training and capacity building by Priya Sarv Utthan Seva Sansthan",
    caption: "Women at skill training workshop",
    height: "normal",
  },
  {
    src: "/images/child5.png",
    alt: "Kids enjoying learning activities at Priya Sarv Utthan education center - Holistic child development programs",
    caption: "Kids enjoying learning activities",
    height: "normal",
  },
  {
    src: "/images/woman4.png",
    alt: "Community women empowerment session by Priya Sarv Utthan Seva Sansthan - Social welfare initiatives in Jabalpur",
    caption: "Community women empowerment session",
    height: "tall",
  },
  {
    src: "/images/child6.png",
    alt: "Children at the education center - Quality education and learning support at Priya Sarv Utthan NGO",
    caption: "Children at the education center",
    height: "normal",
  },
  {
    src: "/images/woman5.png",
    alt: "Women celebrating achievements at Priya Sarv Utthan Seva Sansthan - Success stories from empowerment programs",
    caption: "Women celebrating achievements",
    height: "normal",
  },
  {
    src: "/images/random.png",
    alt: "Community health camp by Priya Sarv Utthan Seva Sansthan - Healthcare services and medical check-up in rural areas",
    caption: "Community health camp",
    height: "normal",
  },
  {
    src: "/images/random1.png",
    alt: "Legal awareness workshop at Priya Sarv Utthan NGO - Legal aid and rights education for marginalized communities",
    caption: "Legal awareness workshop",
    height: "normal",
  },
];

export function MasonryGallery() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  return (
    <section className="bg-neutral-50 py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600 mb-4">
            📸 Real Stories, Real Impact
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-neutral-900 mb-3 md:mb-4">
            Life at <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Priya Sarv Utthan</span>
          </h2>
          <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
            Every photo tells a story of hope, resilience, and transformation.
          </p>
        </motion.div>

        {/* Mobile: 2-Column Grid */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {galleryImages.slice(0, 6).map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedImage(image)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative aspect-square rounded-2xl overflow-hidden active:scale-95 touch-manipulation transition-transform"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="50vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBRIhBhMiMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEQA/AK6f1Jdx6lapdW6yQu4DxHHII96rp+sXUOoW7XFuksCuN0ePIr/aKKE2nZWp6F2f/9k="
              />
              {/* Tap to Zoom Indicator */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-between p-3">
                <p className="text-white text-xs font-medium line-clamp-1 flex-1">{image.caption}</p>
                <ZoomIn className="w-4 h-4 text-white/80" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Desktop: Masonry Grid */}
        <div className="hidden md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedImage(image)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="break-inside-avoid group relative overflow-hidden rounded-[2rem] cursor-pointer w-full active:scale-[0.98] touch-manipulation transition-transform"
            >
              <div className={`relative ${image.height === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBRIhBhMiMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEQA/AK6f1Jdx6lapdW6yQu4DxHHII96rp+sXUOoW7XFuksCuN0ePIr/aKKE2nZWp6F2f/9k="
                />
                {/* Hover Overlay with Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-medium text-lg">{image.caption}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* View More on Mobile */}
        <div className="mt-6 text-center md:hidden">
          <p className="text-sm text-neutral-500">Tap any photo to view full size</p>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          >
            {/* Close Button - Top right, larger for thumb accessibility */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 active:scale-90 touch-manipulation transition-all"
              aria-label="Close"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Mobile: Bottom close button for easy thumb access */}
            <button
              onClick={() => setSelectedImage(null)}
              className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-10 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm flex items-center gap-2 text-white text-sm font-medium hover:bg-white/20 active:scale-95 touch-manipulation transition-all"
            >
              <X className="w-4 h-4" />
              Tap to close
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[80vh] aspect-auto"
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={900}
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
                sizes="100vw"
              />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl p-6">
                <p className="text-white text-lg font-medium">{selectedImage.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
