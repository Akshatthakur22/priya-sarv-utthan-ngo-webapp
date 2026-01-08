"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const galleryImages = [
  {
    src: "/images/child1.png",
    alt: "Children learning together"
  },
  {
    src: "/images/woman.png",
    alt: "Women in community discussion"
  },
  {
    src: "/images/woman1.png",
    alt: "Women empowerment group"
  },
  {
    src: "/images/child2.png",
    alt: "Teacher guiding students"
  }
];

export function WorkInAction() {
  return (
    <section className="bg-surface-offwhite py-12">
      <div className="mx-auto max-w-6xl space-y-6 px-4 md:px-6">
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm font-semibold text-primary">Our community</p>
          <h2 className="text-2xl font-bold text-neutral-ink">Moments that matter</h2>
          <p className="text-sm italic text-neutral-ink">
            यही तो खुशी की बात है —
          </p>
          <p className="text-neutral-body">
            These aren't just photos. They're the smiles, the progress, and the togetherness that make all the hard work worth it.
          </p>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {galleryImages.map((img, index) => (
            <motion.div
              key={img.src}
              className="overflow-hidden rounded-2xl bg-surface-paper shadow-sm ring-1 ring-neutral-muted/15 transition-all hover:shadow-lg hover:-translate-y-1"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={600}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
