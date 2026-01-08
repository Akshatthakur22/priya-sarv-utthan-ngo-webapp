"use client";

import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DonatePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:px-6">
      {/* Header */}
      <motion.div
        className="space-y-3 text-center mb-8 md:mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm font-semibold text-primary">Make a difference</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-ink">
          Support Our Work
        </h1>
        <p className="text-base text-neutral-body leading-relaxed max-w-xl mx-auto">
          Your contribution helps us empower women, educate children, and create opportunities for families in Gandhi Nagar, Indore.
        </p>
      </motion.div>

      {/* Emotional Hook */}
      <motion.div
        className="bg-accent-peach-light/30 rounded-2xl p-5 md:p-6 mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <p className="text-lg italic text-neutral-ink font-medium">
          आपका छोटा सा योगदान, किसी की ज़िंदगी बदल सकता है।
        </p>
      </motion.div>

      {/* Instructions */}
      <motion.div
        className="space-y-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="bg-surface-paper p-5 rounded-2xl ring-1 ring-neutral-muted/20">
          <p className="text-base font-semibold text-neutral-ink mb-2">
            Scan to donate via UPI
          </p>
          <p className="text-sm text-neutral-body leading-relaxed">
            Scan the QR code below using any UPI app (Google Pay, PhonePe, Paytm, or your bank app) to donate securely.
          </p>
          <p className="text-sm text-neutral-ink italic mt-3">
            किसी भी UPI ऐप से QR कोड स्कैन करें।
          </p>
        </div>
      </motion.div>

      {/* QR Code */}
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md ring-1 ring-neutral-muted/20">
          <div className="relative w-56 h-56 md:w-64 md:h-64">
            <Image
              src="/images/upi-qr.png"
              alt="UPI QR Code for donation"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </motion.div>

      {/* Trust Line */}
      <motion.div
        className="space-y-3 text-center mb-8 md:mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p className="text-base text-neutral-body leading-relaxed">
          Every contribution directly supports women and children in our community.
        </p>
        <p className="text-sm italic text-neutral-ink">
          हर योगदान सही जगह इस्तेमाल किया जाता है।
        </p>
      </motion.div>

      {/* Alternative Contact */}
      <motion.div
        className="bg-surface-paper p-5 md:p-6 rounded-2xl ring-1 ring-neutral-muted/20 text-center space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <p className="text-sm font-semibold text-neutral-ink">
          Prefer another way to donate?
        </p>
        <p className="text-sm text-neutral-body leading-relaxed">
          For offline donations, food, clothes, or any questions, reach out to us.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center justify-center rounded-full border border-neutral-muted/30 bg-surface-paper px-4 py-2.5 text-sm font-semibold text-neutral-body transition-all hover:border-neutral-muted/40 hover:shadow-sm min-h-[44px]"
          >
            Call us
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-neutral-muted/30 bg-surface-paper px-4 py-2.5 text-sm font-semibold text-neutral-body transition-all hover:border-neutral-muted/40 hover:shadow-sm min-h-[44px]"
          >
            Get in touch
          </Link>
        </div>
      </motion.div>

      {/* Thank You Note */}
      <motion.div
        className="mt-10 p-5 md:p-6 bg-accent-peach-light/20 rounded-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p className="text-sm text-neutral-body italic">
          Thank you for believing in our mission and standing with us. Your generosity fuels hope and change.
        </p>
      </motion.div>
    </div>
  );
}
