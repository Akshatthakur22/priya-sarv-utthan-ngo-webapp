"use client";

import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/config";
import { Instagram, Facebook } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 md:px-6">
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm font-semibold text-primary">Let's connect</p>
        <h1 className="text-3xl font-bold text-neutral-ink md:text-4xl">We'd love to hear from you</h1>
        <p className="text-base text-neutral-body md:text-lg max-w-3xl">
          Whether you want to volunteer, partner with us, or simply learn more about our work — we're here to listen. Drop us a message or visit us in Gandhi Nagar, Indore.
        </p>
        <p className="text-sm italic text-neutral-ink pt-1">
          बात करना हो तो बेझिझक संपर्क करें।
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div 
          className="card p-6 shadow-sm md:p-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <ContactForm />
        </motion.div>
        
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="rounded-2xl bg-surface-paper p-6 shadow-sm ring-1 ring-neutral-muted/20 space-y-5">
            <div>
              <p className="text-sm font-semibold text-neutral-ink mb-1">Email us</p>
              <a 
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-sm text-primary hover:underline"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-ink mb-1">Call us</p>
              <a 
                href={`tel:${siteConfig.phone}`}
                className="text-sm text-primary hover:underline"
              >
                {siteConfig.phone}
              </a>
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-ink mb-1">Visit us</p>
              <p className="text-sm text-neutral-body leading-relaxed">{siteConfig.address}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-ink mb-1">We're available</p>
              <p className="text-sm text-neutral-body">{siteConfig.workingHours}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-accent-peach-light/30 p-6 shadow-sm space-y-3">
            <div>
              <p className="text-sm font-semibold text-neutral-ink">Follow our journey</p>
              <p className="text-xs italic text-neutral-ink/70 mt-1">
                हमारे काम को देखते रहिए
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/amrish.jadhav.56/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-surface-paper px-4 py-2.5 text-sm font-medium text-neutral-ink shadow-sm ring-1 ring-neutral-muted/20 transition-all hover:shadow-md hover:ring-primary/30 hover:-translate-y-0.5"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-4 w-4" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61554106732236"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-surface-paper px-4 py-2.5 text-sm font-medium text-neutral-ink shadow-sm ring-1 ring-neutral-muted/20 transition-all hover:shadow-md hover:ring-primary/30 hover:-translate-y-0.5"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-4 w-4" />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
