"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Heart, Users, Award, Sparkles } from "lucide-react";
import { JobApplicationForm } from "@/components/forms/JobApplicationForm";

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  commitment: string;
}

interface CareersClientProps {
  jobs: Job[];
}

export default function CareersClient({ jobs }: CareersClientProps) {
  return (
    <>
      {/* Full-width Hero Image */}
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img 
          src="/images/woman1.png" 
          alt="Join our mission" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-orange-200 border border-orange-400/30 mb-4">
            💼 Join Our Team
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Make a Difference</h1>
          <p className="text-lg text-white/80 max-w-xl">Be part of our journey to empower women and children in Indore</p>
        </div>
      </div>
      
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:px-6">
      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 p-8 md:p-12 border border-orange-100"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-200/20 to-yellow-200/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
        
        <div className="relative z-10">
          {/* Live Status Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 mb-6 border border-orange-100 shadow-sm"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
            <span className="text-sm font-semibold text-orange-700">Opportunities Live</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Volunteer with us
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight">
                Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Mission</span>
              </h1>
              <p className="text-neutral-600 max-w-2xl text-lg leading-relaxed">
                We welcome passionate individuals who want to contribute to community development. 
                Our volunteers play a vital role in supporting women empowerment, education, skill training, 
                and social justice initiatives.
              </p>
            </div>

            {/* Trust Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-4 border border-orange-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-900">25+</p>
                  <p className="text-xs text-neutral-500 font-medium">Years of Service</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-4 border border-orange-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-neutral-900">Indore</p>
                  <p className="text-xs text-neutral-500 font-medium">Main Chapter</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Jobs Grid */}
      {jobs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.1 * index,
                ease: "easeOut"
              }}
              className="group relative bg-white rounded-[2.5rem] p-6 md:p-8 border border-neutral-100 
                         hover:shadow-2xl hover:border-orange-100 transition-all duration-500"
            >
              {/* Subtle gradient on hover */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-orange-50/0 to-amber-50/0 
                              group-hover:from-orange-50/50 group-hover:to-amber-50/30 transition-all duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-orange-600 transition-colors duration-300">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {job.commitment}
                      </span>
                    </div>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-4 py-1.5 
                                   text-xs font-semibold text-orange-600 border border-orange-100">
                    <Sparkles className="w-3.5 h-3.5" />
                    Open
                  </span>
                </div>
                
                <p className="text-neutral-600 leading-relaxed mb-6">{job.description}</p>
                
                <div className="pt-4 border-t border-neutral-100">
                  <JobApplicationForm jobId={job.id} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Premium Empty State - Dark Card */
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-neutral-900 p-8 md:p-12"
        >
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-orange-500/20 to-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-tr from-orange-600/10 to-yellow-500/5 rounded-full blur-2xl" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-2 mb-6 border border-orange-500/20">
              <Users className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-400">We&apos;re Growing</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Interested in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Volunteering?</span>
            </h2>
            
            <p className="text-neutral-300 text-lg leading-relaxed mb-6">
              We are always looking for dedicated volunteers who want to make a difference in our community. 
              Whether you have skills in teaching, legal support, counseling, community outreach, or simply 
              a passion for social work, there&apos;s a place for you at Priya Sarv Utthan Seva Sansthan.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Heart className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">What we value</p>
                  <p className="text-neutral-400 text-sm">
                    Volunteers who are committed, compassionate, and willing to work with communities. 
                    Most volunteer roles are unpaid but offer meaningful experience and the satisfaction 
                    of contributing to real social change.
                  </p>
                </div>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shrink-0">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold mb-1">Call our Office</p>
                <p className="text-neutral-400 text-sm mb-2">Mon–Sun, 11:00 AM – 5:00 PM</p>
                <a 
                  href="tel:+917000078439"
                  className="inline-flex items-center gap-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 
                             hover:from-orange-300 hover:to-amber-300 transition-all active:scale-95 touch-manipulation"
                >
                  +91 70000 78439
                </a>
              </div>
              <a
                href="tel:+917000078439"
                className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 
                           px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25
                           hover:shadow-xl hover:shadow-orange-500/30 active:scale-95 touch-manipulation transition-all"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {/* Info Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-sm text-neutral-500 py-4"
      >
        <p>
          Please note that volunteer positions are typically unpaid, driven by the spirit of service and social impact.
        </p>
      </motion.div>
    </div>
    </>
  );
}
