"use client";

import { HeartHandshake, BookOpenCheck, Scale } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
  {
    title: "Women Empowerment",
    body: "Helping women learn skills, start small businesses, and know their rights — so they can build independence and confidence.",
    stat: "अपने पैरों पर खड़ी हों",
    color: "accent-coral",
    Icon: HeartHandshake
  },
  {
    title: "Education & Skills",
    body: "From children learning to read to adults training for better jobs — education opens doors at every age.",
    stat: "सीखने का मौका सबको",
    color: "primary",
    Icon: BookOpenCheck
  },
  {
    title: "Social Justice",
    body: "Legal help and advocacy for those who need it most — because everyone deserves fairness and respect.",
    stat: "हक़ की बात, सबके लिए",
    color: "support-green",
    Icon: Scale
  }
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 }
};

export function ImpactHighlights() {
  return (
    <section className="bg-surface-paper py-10 md:py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-6 md:gap-8 lg:flex-row lg:items-start lg:justify-between">
          <motion.div 
            className="max-w-xl space-y-3"
            {...fadeUp}
          >
            <p className="text-sm font-semibold text-primary">Where we focus</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-ink">The work we do, every day</h2>
            <p className="text-base text-neutral-body leading-relaxed">
              Real change doesn&apos;t happen overnight. It happens when a mother learns a new skill, when a child discovers they love learning, when someone gets the legal help they&apos;ve been waiting for.
            </p>
            <p className="text-sm italic text-neutral-ink pt-1">
              असली बदलाव तो रोज़ की छोटी-छोटी कोशिशों से आता है।
            </p>
          </motion.div>
          <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                className="card h-full p-5 transition-all hover:shadow-md hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-${item.color}-light/60 text-${item.color}-dark`}>
                  <item.Icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-base font-semibold text-neutral-ink">{item.title}</p>
                <p className="mt-2 text-sm text-neutral-body leading-relaxed">{item.body}</p>
                <p className={`mt-3 text-xs italic text-${item.color}`}>{item.stat}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
