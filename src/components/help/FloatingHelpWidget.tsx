"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LifeBuoy, MessageCircle, Gavel, Phone, X } from "lucide-react";
import Link from "next/link";

export default function FloatingHelpWidget() {
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="fixed z-50 bottom-20 md:bottom-6 right-4 md:right-6 flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.nav
            ref={popupRef}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="mb-3 w-56 bg-white rounded-2xl shadow-2xl border border-orange-100 overflow-hidden"
            aria-label="Quick Help Actions"
          >
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3">
              <p className="text-white font-bold text-sm">Need Help?</p>
              <p className="text-white/80 text-xs">We're here for you 24/7</p>
            </div>
            <div className="p-2 space-y-1">
              <Link
                href="https://chat.whatsapp.com/DGYpDQSt3kK23DAGixeELC"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-green-50 active:bg-green-100 transition-colors font-semibold text-green-700 touch-manipulation"
                aria-label="Chat with us on WhatsApp"
              >
                <MessageCircle className="text-green-500" size={20} />
                <span className="text-sm">Chat with us</span>
              </Link>
              <Link
                href="/help#legal"
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-blue-50 active:bg-blue-100 transition-colors font-semibold text-blue-700 touch-manipulation"
                aria-label="Get Legal Aid"
              >
                <Gavel className="text-blue-500" size={20} />
                <span className="text-sm">Get Legal Aid</span>
              </Link>
              <a
                href="tel:+919977177059"
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-orange-50 active:bg-orange-100 transition-colors font-semibold text-orange-700 touch-manipulation"
                aria-label="Call Now"
              >
                <Phone className="text-orange-500" size={20} />
                <span className="text-sm">Call Now</span>
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.button
        aria-label={open ? "Close Help Menu" : "Open Help Menu"}
        onClick={() => setOpen((v) => !v)}
        className="bg-gradient-to-br from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-orange-200 active:scale-95 transition-transform touch-manipulation"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: open ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {open ? <X size={26} /> : <LifeBuoy size={26} />}
      </motion.button>
    </div>
  );
}
