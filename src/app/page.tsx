"use client";

import { Hero } from "@/components/sections/Hero";
import { ImpactHighlights } from "@/components/sections/ImpactHighlights";
import { WorkInAction } from "@/components/sections/WorkInAction";
import Link from "next/link";
import { motion } from "framer-motion";

const values = [
  {
    title: "Community First",
    hindi: "समुदाय के साथ चलना ही असली रास्ता है।",
    desc: "We don't decide for people — we listen, understand, and work together with families in Gandhi Nagar to find what really helps."
  },
  {
    title: "Built on Trust",
    hindi: "भरोसा सबसे बड़ी चीज़ है।",
    desc: "As a registered NGO, we're committed to being open about where donations go and what impact they create. You can count on us."
  },
  {
    title: "Lasting Change",
    hindi: "जल्दबाज़ी में कुछ नहीं होता।",
    desc: "Quick fixes don't work. We focus on programs that make a real, long-term difference in people's lives."
  }
];

export default function HomePage() {
  return (
    <div className="space-y-12 pb-12">
      <Hero />
      <ImpactHighlights />
      <WorkInAction />
      <section className="bg-surface-paper py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((item, index) => (
              <motion.div
                key={item.title}
                className="card p-5 transition-all hover:shadow-md hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-neutral-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-body">
                  {item.desc}
                </p>
                <p className="mt-3 text-xs italic text-primary">
                  {item.hindi}
                </p>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            <Link
              href="/donate"
              className="button-primary transition-transform hover:scale-105"
            >
              Join This Mission
            </Link>
            <Link
              href="/careers"
              className="inline-flex items-center justify-center rounded-full border border-neutral-muted/30 bg-surface-paper px-4 py-2 text-sm font-semibold text-neutral-body transition-all hover:border-neutral-muted/40 hover:shadow-sm"
            >
              Work With Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
