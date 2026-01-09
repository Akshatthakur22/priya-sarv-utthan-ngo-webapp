"use client";

import Image from "next/image";
import Link from "next/link";
import { SoftDecor } from "@/components/layout/SoftDecor";
import { motion } from "framer-motion";

const heroImage = {
  src: "/images/child1.png",
  alt: "Children learning together in a classroom",
  credit: "Priya Sarv Utthan Foundation"
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-12 pt-8 md:flex md:items-center md:gap-12 md:px-6 md:pt-16 lg:pb-16 overflow-hidden">
      <SoftDecor />
      <motion.div 
        className="flex-1 space-y-5 md:space-y-6"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.span 
          className="inline-flex w-fit rounded-full bg-accent-peach-light px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary"
          variants={fadeUp}
        >
          27 years of impact • Since 1999
        </motion.span>
        <motion.div variants={fadeUp}>
          <h1 className="text-3xl font-bold leading-tight text-neutral-ink sm:text-4xl md:text-5xl lg:text-5xl">
            Priya Sarv Utthan Foundation
          </h1>
          <p className="mt-3 text-base sm:text-lg text-neutral-ink/70 italic leading-relaxed">
            हर बच्चे को पढ़ने का मौका मिले, हर औरत अपने पैरों पर खड़ी हो सके।
          </p>
        </motion.div>
        <motion.p 
          className="max-w-2xl text-base text-neutral-body sm:text-lg leading-relaxed"
          variants={fadeUp}
        >
          We work with families in Gandhi Nagar, Indore to help women and children build better lives. Through education, skill training, and support programs, we create real change — one family, one neighborhood at a time.
        </motion.p>
        <motion.div 
          className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          variants={fadeUp}
        >
          <Link 
            href="/donate" 
            className="button-primary transition-transform hover:scale-105 text-center"
          >
            Help Us Help Them
          </Link>
          <Link
            href="/programs"
            className="inline-flex items-center justify-center rounded-full border border-neutral-muted/30 bg-surface-paper px-4 py-2.5 text-sm font-semibold text-neutral-body transition-all hover:border-neutral-muted/40 hover:shadow-sm min-h-[44px]"
          >
            See What We Do
          </Link>
        </motion.div>
        <motion.div 
          className="flex flex-wrap gap-5 sm:gap-6 text-sm text-neutral-muted"
          variants={fadeUp}
        >
          <div>
            <p className="text-xl sm:text-2xl font-bold text-primary-dark">27 Years</p>
            <p className="text-xs sm:text-sm">Serving since 1999</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-support-green-dark">7+</p>
            <p className="text-xs sm:text-sm">Focus Areas</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-bold text-neutral-ink">Indore</p>
            <p className="text-xs sm:text-sm">Gandhi Nagar, MP</p>
          </div>
        </motion.div>
      </motion.div>
      <motion.div 
        className="mt-8 flex-1 md:mt-0 space-y-5 md:space-y-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="card h-full bg-gradient-to-br from-surface-paper via-accent-peach-light to-surface-offwhite p-5 md:p-6 shadow-md transition-shadow hover:shadow-lg">
          <p className="text-sm font-semibold text-primary">What we believe</p>
          <p className="mt-3 text-sm sm:text-base text-neutral-body leading-relaxed">
            We believe every woman deserves dignity and every child deserves a chance. For 27 years, we&apos;ve walked alongside families in Indore — not just offering help, but building trust, hope, and pathways to a better tomorrow.
          </p>
          <p className="mt-3 text-sm italic text-neutral-ink">
            यही तो असली बदलाव है।
          </p>
          <ul className="mt-4 space-y-2 text-sm text-neutral-body">
            <li>• Supporting women to stand on their own feet</li>
            <li>• Quality education and skill training for all ages</li>
            <li>• Legal aid and awareness for those who need it most</li>
          </ul>
        </div>
        <div className="overflow-hidden rounded-3xl bg-surface-paper shadow-md ring-1 ring-neutral-muted/15 transition-all hover:shadow-xl">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            width={900}
            height={700}
            className="h-full w-full object-cover"
            sizes="(min-width: 1024px) 480px, 100vw"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
