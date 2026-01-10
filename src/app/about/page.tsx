import Image from "next/image";

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
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 md:px-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-primary">Who we are</p>
        <h1 className="text-3xl font-bold text-neutral-ink">Priya Sarv Utthan Seva Sansthan</h1>
        <p className="text-neutral-body">
          Established in 1999 and registered under ID Ind/4124/99 as Priya Sarv Utthan Seva Sansthan, we are a non-profit organization with over 27 years of dedicated service in Gandhi Nagar, Indore, Madhya Pradesh. Our work focuses on women and child development, education, women empowerment, social justice, district legal services, skill training, and women self-employment. We believe in creating opportunities that transform lives.
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
        {/* Images will be replaced with real NGO event photos later */}
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-neutral-ink">Our Approach</h2>
        <p className="text-sm text-neutral-body">
          With over two decades of experience serving communities in Indore, we work closely with local residents to understand their needs and challenges. Our programs are designed to be practical, accessible, and sustainable. We focus on empowering individuals with skills and knowledge, providing legal support, and creating pathways to self-employment. Every initiative is rooted in respect, equality, and the belief that change happens when communities are supported, not directed.
        </p>
      </div>
    </div>
  );
}
