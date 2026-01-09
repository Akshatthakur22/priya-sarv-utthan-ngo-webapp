import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-muted/20 bg-surface-offwhite">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-neutral-ink">Priya Sarv Utthan Foundation</p>
<p className="text-sm text-neutral-muted">
  Walking alongside communities with care and commitment for over 27 years.
</p>
          <p className="text-xs text-neutral-muted">Registered as Priya Sarv Utthan Seva Sansthan</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-neutral-muted">
          <Link href="/about" className="hover:text-primary">About</Link>
          <Link href="/programs" className="hover:text-primary">Programs</Link>
          <Link href="/events" className="hover:text-primary">Events</Link>
          <Link href="/careers" className="hover:text-primary">Careers</Link>
          <Link href="/contact" className="hover:text-primary">Contact</Link>
          <Link href="/donate" className="hover:text-primary">Donate</Link>
        </div>
      </div>
    </footer>
  );
}
