import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-muted/20 bg-surface-offwhite">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6">
        
        {/* Left section */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-neutral-ink">Priya Sarv Utthan Seva Sansthan</p>
          <p className="text-sm text-neutral-muted">For 27+ years, walking alongside communities.</p>
          <p className="text-xs text-neutral-muted">Registered NGO • Est. 1999</p>
<br />
          {/* Developer credit */}
          <p className="text-xs text-neutral-muted mt-2">
            © {new Date().getFullYear()} Priya Sarv Utthan Seva Sansthan. All Rights Reserved.
            <br />
            Designed & Developed by <a 
              href="https://www.linkedin.com/in/akshatthakur22/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-neutral-ink hover:text-primary transition-colors"
            >
              Akshat Thakur
            </a>
          </p>
        </div>

        {/* Navigation links */}
        <div className="flex flex-wrap gap-4 text-sm text-neutral-muted">
          <Link href="/about" className="hover:text-primary">About</Link>
          <Link href="/events" className="hover:text-primary">Events</Link>
          <Link href="/careers" className="hover:text-primary">Careers</Link>
          <Link href="/contact" className="hover:text-primary">Contact</Link>
          <Link href="/donate" className="hover:text-primary">Donate</Link>

          <span className="mx-2 hidden md:inline">|</span>

          <Link href="/privacy-policy" className="hover:text-primary">Policy</Link>
          <Link href="/terms" className="hover:text-primary">Terms</Link>
        </div>

      </div>
    </footer>
  );
}
