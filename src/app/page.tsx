import { Hero } from "@/components/sections/Hero";
import { ImpactHighlights } from "@/components/sections/ImpactHighlights";
import { WorkInAction } from "@/components/sections/WorkInAction";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12 pb-12">
      <Hero />
      <ImpactHighlights />
      <WorkInAction />
      <section className="bg-surface-paper py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {["Community Focused", "Trusted Partner", "Sustainable Change"].map((item) => (
              <div key={item} className="card p-5">
                <h3 className="text-lg font-semibold text-neutral-ink">{item}</h3>
                <p className="mt-2 text-sm text-neutral-body">
                  {item === "Community Focused"
                    ? "We work directly with communities in Gandhi Nagar, Indore to understand needs and co-create solutions."
                    : item === "Trusted Partner"
                      ? "A registered non-profit organization committed to transparency, accountability, and genuine social impact."
                      : "Our programs are designed for long-term community development and lasting positive change."}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/donate" className="button-primary">
              Donate Now
            </Link>
            <Link
              href="/careers"
              className="inline-flex items-center justify-center rounded-full border border-neutral-muted/30 bg-surface-paper px-4 py-2 text-sm font-semibold text-neutral-body hover:border-neutral-muted/40"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
