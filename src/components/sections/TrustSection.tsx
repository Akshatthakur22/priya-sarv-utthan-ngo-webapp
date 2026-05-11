"use client";

import { motion } from "framer-motion";
import { Award, MapPin, Phone, FileCheck, Shield, ChevronRight, User } from "lucide-react";
import { triggerHaptic } from "@/utils/haptics";

const cities = [
  { name: "Indore", nameHi: "इंदौर", type: "Headquarters" },
  { name: "ujjain", nameHi: "उज्जैन", type: "Outreach" }
];

const certificates = [
  { name: "80G", desc: "Tax Exemption", icon: FileCheck },
  { name: "12A", desc: "Registered", icon: Shield },
  { name: "NGO Darpan", desc: "Verified", icon: Award }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export function TrustSection() {
  const handleContactClick = () => {
    triggerHaptic(50);
  };

  return (
    <section className="bg-surface-paper py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="space-y-10"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 mb-4">
              <Award className="w-4 h-4" />
              Registered NGO ID: IND 4124/99
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Trusted Since <span className="text-orange-600">1999</span>
            </h2>
            <p className="text-neutral-600 mt-2 max-w-xl mx-auto">
              27+ years of transparent service across Madhya Pradesh
            </p>
          </motion.div>

          {/* Main Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Founder Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-teal-900 via-emerald-900 to-teal-950 rounded-[2rem] p-6 sm:p-8 text-white"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 p-0.5 flex-shrink-0 overflow-hidden">
                  <img 
                    src="/images/founder_founderpage.png" 
                    alt="Jagdish Jadhav - Founder & President" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wide mb-1">
                    Founder & President • संस्थापक
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold">Jagdish Jadhav</h3>
                  <p className="text-emerald-300 text-sm">जगदीश जाधव</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <p className="text-emerald-100/90 text-sm leading-relaxed">
                  Social reformer with 27+ years of dedicated service to community development and women empowerment across Madhya Pradesh.
                </p>
                
                
                <p className="text-emerald-100/80 text-sm italic leading-relaxed">
                  &ldquo;Building a self-reliant society through compassion and collective action. Every child deserves education, every woman deserves empowerment.&rdquo;
                </p>
                
                <div className="pt-3 border-t border-emerald-500/20">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-lg font-bold text-emerald-100">27+</p>
                      <p className="text-xs text-emerald-300/70">Years Service</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-emerald-100">50K+</p>
                      <p className="text-xs text-emerald-300/70">Lives Impacted</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-emerald-100">2</p>
                      <p className="text-xs text-emerald-300/70">Cities Served</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <a
                href="tel:+919806502882"
                onClick={handleContactClick}
                className="mt-5 inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold px-5 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm"
              >
                <Phone className="w-4 h-4" />
                +91 9977177059
              </a>
            </motion.div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Multi-City Presence */}
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-[2rem] p-6 shadow-sm ring-1 ring-neutral-100"
              >
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <h3 className="font-bold text-neutral-900">Serving 2 Cities</h3>
                  <span className="text-sm text-neutral-500">• तीन शहरों में सेवा</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cities.map((city) => (
                    <div
                      key={city.name}
                      className="flex items-center gap-2 bg-neutral-50 rounded-full px-4 py-2"
                    >
                      <span className="font-semibold text-neutral-900">{city.name}</span>
                      <span className="text-xs text-neutral-500">({city.nameHi})</span>
                    </div>
                  ))}
                </div>
                <a
                  href="/about"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                >
                  View All Locations
                  <ChevronRight className="w-4 h-4" />
                </a>
              </motion.div>

              {/* Transparency Badges */}
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-[2rem] p-6 shadow-sm ring-1 ring-neutral-100"
              >
                <h3 className="font-bold text-neutral-900 mb-4">
                  Verified & Transparent • पारदर्शी संस्था
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {certificates.map((cert) => (
                    <div
                      key={cert.name}
                      className="text-center p-3 bg-emerald-50 rounded-xl"
                    >
                      <cert.icon className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                      <p className="font-bold text-neutral-900 text-sm">{cert.name}</p>
                      <p className="text-xs text-emerald-600">{cert.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="text-center pt-4">
            <a
              href="/about"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Learn More About Us
              <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
