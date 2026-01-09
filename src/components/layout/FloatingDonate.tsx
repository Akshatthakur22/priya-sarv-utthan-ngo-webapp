"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState, useEffect } from "react";

export function FloatingDonate() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest;
    
    // Show when scrolling down and user has scrolled at least 100px
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(true);
    } 
    // Hide when scrolling up
    else if (currentScrollY < lastScrollY) {
      setIsVisible(false);
    }
    
    setLastScrollY(currentScrollY);
  });

  // Hide button after 2 seconds of no scroll activity
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [lastScrollY, isVisible]);

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : 100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Backdrop with blur and gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-sm" />
      
      {/* Content container */}
      <div className="relative px-4 pb-4 pt-3">
        <Link
          href="/donate"
          className="flex items-center justify-center gap-2 w-full rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-all active:scale-95 min-h-[52px]"
        >
          <span className="text-xl">❤️</span>
          <span>Donate Now</span>
        </Link>
      </div>
    </motion.div>
  );
}
