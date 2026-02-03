"use client";

import { motion } from "framer-motion";

const impactUpdates = [
  { emoji: "📍", text: "15 families supported in Gandhi Nagar today" },
  { emoji: "⚖️", text: "3 Legal consultations completed this morning" },
  { emoji: "📚", text: "50+ Children attending afternoon classes" },
  { emoji: "🧡", text: "5 New volunteers joined our mission this week" },
  { emoji: "🏥", text: "Health check-up camp scheduled for Sunday" },
  { emoji: "👩‍🎓", text: "12 Women completed tailoring training" },
  { emoji: "📖", text: "Evening tuition center running at full capacity" },
  { emoji: "🤝", text: "Community outreach in progress" },
];

export function ImpactTicker() {
  // Double the array for seamless infinite scroll
  const duplicatedUpdates = [...impactUpdates, ...impactUpdates];

  return (
    <section className="bg-orange-50 border-y border-orange-100 py-4 overflow-hidden">
      <div className="relative">
        {/* Live Indicator */}
        <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center bg-gradient-to-r from-orange-50 via-orange-50 to-transparent pl-4 pr-8">
          <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1.5 shadow-sm border border-orange-100">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
            </span>
            <span className="text-xs font-semibold text-orange-700 uppercase tracking-wide">Live</span>
          </div>
        </div>

        {/* Scrolling Container */}
        <motion.div
          className="flex gap-8 items-center cursor-default"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          whileHover={{ animationPlayState: "paused" }}
          style={{ width: "fit-content" }}
        >
          {duplicatedUpdates.map((update, index) => (
            <div
              key={index}
              className="flex items-center gap-3 shrink-0 group"
            >
              {/* Pulsing Dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-orange-300 opacity-50"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-400"></span>
              </span>
              
              {/* Update Text */}
              <span className="text-sm text-neutral-700 font-medium whitespace-nowrap">
                <span className="mr-1.5">{update.emoji}</span>
                {update.text}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-orange-50 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
