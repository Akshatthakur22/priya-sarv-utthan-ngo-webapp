import Image from "next/image";
import type { Metadata } from "next";
import { organizationSchema } from "@/lib/schema-templates";

export const metadata: Metadata = {
  title: "About Us | Priya Sarv Utthan Seva Sansthan",
  description: "Learn about Priya Sarv Utthan Seva Sansthan, our mission, vision, and values.",
  keywords: ["about", "NGO", "mission", "vision", "Priya Sarv Utthan Seva Sansthan"],
  openGraph: {
    title: "About Us | Priya Sarv Utthan Seva Sansthan",
    description: "Learn about Priya Sarv Utthan Seva Sansthan, our mission, vision, and values.",
    url: "https://priyasarvutthan.org/about",
    type: "profile"
  },
  twitter: {
    card: "summary",
    title: "About Us | Priya Sarv Utthan Seva Sansthan",
    description: "Learn about Priya Sarv Utthan Seva Sansthan, our mission, vision, and values."
  },
  alternates: { canonical: "https://priyasarvutthan.org/about" }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Priya Sarv Utthan Seva Sansthan",
  "url": "https://priyasarvutthan.org",
  "description": "A registered NGO dedicated to women empowerment, education, and community development in Indore."
};

const aboutImages = [
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    alt: "Community gathering and discussion"
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    alt: "Children learning together"
  }
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <section className="bg-gradient-to-r from-primary to-primary-dark py-16 text-white text-center rounded-b-3xl shadow-lg mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Priya Sarv Utthan Seva Sansthan</h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">Empowering Indore through education, health, and social justice since 1999.</p>
        <a href="/team" className="bg-white text-primary font-semibold px-8 py-3 rounded-full shadow hover:bg-primary-light hover:text-white transition">Meet Our Team</a>
      </section>
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 md:px-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-primary">Who we are</p>
          <h2 className="text-3xl font-bold text-neutral-ink">Our Mission, Vision & Values</h2>
          <p className="text-neutral-body">
            Established in 1999 and registered under ID Ind/4124/99, we are a non-profit with 27+ years of service in Gandhi Nagar, Indore. We focus on women and child development, education, empowerment, social justice, legal services, skill training, and self-employment.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {["Mission", "Vision", "Values"].map((title) => (
            <div key={title} className="card p-4">
              <h3 className="text-lg font-semibold text-neutral-ink">{title}</h3>
              <p className="mt-2 text-sm text-neutral-body">
                {title === "Mission"
                  ? "To empower women and children through education, skill development, and social justice initiatives that create lasting community impact."
                  : title === "Vision"
                    ? "A society where every woman and child has equal access to opportunities, education, and the means to live with dignity and self-reliance."
                    : "We are committed to transparency, community participation, dignity for all, and sustainable development that uplifts entire communities."}
              </p>
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {aboutImages.map((img) => (
            <div key={img.src} className="overflow-hidden rounded-3xl bg-surface-paper shadow-md ring-1 ring-neutral-muted/15">
              <Image
                src={img.src}
                alt={img.alt}
                width={900}
                height={650}
                className="h-full w-full object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-neutral-ink">Our Approach</h2>
          <p className="text-sm text-neutral-body">
            With over two decades of experience serving Indore, we work closely with local residents to understand their needs. Our programs are practical, accessible, and sustainable—empowering individuals with skills, legal support, and self-employment pathways.
          </p>
        </div>
        <div className="text-center mt-8">
          <a href="/contact" className="inline-block bg-primary text-white px-8 py-3 rounded-full shadow hover:bg-primary-dark transition">Contact Us</a>
        </div>
      </div>
    </>
  );
}
