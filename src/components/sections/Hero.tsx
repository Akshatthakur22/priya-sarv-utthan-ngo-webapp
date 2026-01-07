import Image from "next/image";
import Link from "next/link";
import { SoftDecor } from "@/components/layout/SoftDecor";

const heroImage = {
  src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
  alt: "Children learning together in a classroom",
  credit: "Generic placeholder — replace with real NGO photo later"
};

export function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-12 pt-10 md:flex md:items-center md:gap-12 md:px-6 md:pt-16">
      <SoftDecor />
      <div className="flex-1 space-y-6">
        <span className="inline-flex w-fit rounded-full bg-accent-peach-light px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          Serving since 1999 • 27 years of impact
        </span>
        <h1 className="text-3xl font-bold leading-tight text-neutral-ink sm:text-4xl md:text-5xl">
          Priya Sarv Utthan Foundation
        </h1>
        <p className="max-w-2xl text-base text-neutral-body sm:text-lg">
          Priya Sarv Utthan Foundation works in Gandhi Nagar, Indore to create lasting change through education, women empowerment, skill training, and social justice. Join us in building a better future.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/donate" className="button-primary">
            Support Our Work
          </Link>
          <Link
            href="/programs"
            className="inline-flex items-center justify-center rounded-full border border-neutral-muted/30 bg-surface-paper px-4 py-2 text-sm font-semibold text-neutral-body hover:border-neutral-muted/40"
          >
            Our Programs
          </Link>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-neutral-muted">
          <div>
            <p className="text-2xl font-bold text-primary-dark">27 Years</p>
            <p>Serving since 1999</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-support-green-dark">7+</p>
            <p>Focus Areas</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-neutral-ink">Indore</p>
            <p>Gandhi Nagar, MP</p>
          </div>
        </div>
      </div>
      <div className="mt-10 flex-1 md:mt-0">
        <div className="card h-full bg-gradient-to-br from-surface-paper via-accent-peach-light to-surface-offwhite p-6 shadow-md">
          <p className="text-sm font-semibold text-primary">Our Mission</p>
          <p className="mt-2 text-neutral-body">
            We believe every woman and child deserves access to education, skills, and opportunities. Through community-led initiatives, we work towards social justice and sustainable development in Indore.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-neutral-body">
            <li>• Women & Child Development</li>
            <li>• Education and Skill Training</li>
            <li>• Legal Services and Women Self-Employment</li>
          </ul>
        </div>
        <div className="mt-6 overflow-hidden rounded-3xl bg-surface-paper shadow-md ring-1 ring-neutral-muted/15">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            width={900}
            height={700}
            className="h-full w-full object-cover"
            sizes="(min-width: 1024px) 480px, 100vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
