"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/events", label: "Events" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-muted/20 bg-surface-offwhite/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-3 text-neutral-ink">
          <div className="relative h-10 w-10 shrink-0 md:h-12 md:w-12">
            <Image
              src="/logo.png"
              alt="Priya Sarv Utthan Foundation logo"
              fill
              sizes="48px"
              className="object-contain"
              priority
            />
          </div>
          <div className="leading-tight">
            <span className="block text-base font-semibold md:text-lg">Priya Sarv Utthan Foundation</span>
            <span className="block text-xs text-primary md:text-sm">Building Brighter Futures</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition hover:text-primary ${
                pathname === link.href ? "text-primary" : "text-neutral-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/donate" className="button-primary">
            Donate
          </Link>
        </nav>

        <button
          className="inline-flex items-center justify-center rounded-full border border-neutral-muted/30 bg-surface-paper p-2 text-neutral-body md:hidden"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-neutral-muted/20 bg-surface-offwhite md:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-surface-paper ${
                  pathname === link.href ? "text-primary" : "text-neutral-body"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/donate"
              className="button-primary block text-center"
              onClick={() => setOpen(false)}
            >
              Donate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
