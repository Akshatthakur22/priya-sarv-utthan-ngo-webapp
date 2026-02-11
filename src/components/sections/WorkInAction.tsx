"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const galleryImages = [
  {
    src: "/images/child2.png",
    alt: "Children learning together at Priya Sarv Utthan Seva Sansthan education center - Collaborative learning and academic development programs"
  },
  {
    src: "/images/woman3.png",
    alt: "Women in community discussion at Priya Sarv Utthan self-help group meeting - Community development and women empowerment initiatives"
  },
  {
    src: "/images/woman4.png",
    alt: "Women empowerment group at Priya Sarv Utthan Seva Sansthan - Skill development and economic independence training"
  },
  {
    src: "/images/child5.png",
    alt: "Teacher guiding students at Priya Sarv Utthan learning center - Quality education and mentorship for underprivileged children"
  },
  {
    src: "/images/child6.png",
    alt: "Happy children at the Priya Sarv Utthan education center - Joyful learning environment and child development programs"
  },
  {
    src: "/images/woman5.png",
    alt: "Women achieving milestones at Priya Sarv Utthan Seva Sansthan - Success stories from empowerment and skill training programs"
  }
];

export function WorkInAction() {
  return (
    <section className="bg-surface-offwhite py-12">
      <div className="mx-auto max-w-6xl space-y-6 px-4 md:px-6">
        <motion.div 
          className="space-y-2 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold text-primary">Our community</p>
          <h2 className="text-2xl font-bold text-neutral-ink">Moments that matter</h2>
          <p className="text-sm italic text-neutral-ink">
            यही तो खुशी की बात है —
          </p>
          <p className="text-neutral-body">
            These aren&apos;t just photos. They&apos;re the smiles, the progress, and the togetherness that make all the hard work worth it.
          </p>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {galleryImages.map((img, index) => (
            <motion.div
              key={`${img.src}-${index}`}
              className="overflow-hidden rounded-2xl bg-surface-paper shadow-sm ring-1 ring-neutral-muted/15 transition-all hover:shadow-lg hover:-translate-y-1 min-h-[200px] sm:min-h-[250px]"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
