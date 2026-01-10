import Image from "next/image";

const programs = [
  {
    title: "Women & Child Development",
    detail: "Comprehensive programs for the health, nutrition, and overall development of women and children in our community.",
    metric: "Mahila Baal Vikas",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Education",
    detail: "Quality education initiatives, literacy programs, and learning support for children and adults.",
    metric: "Shiksha",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Women Empowerment",
    detail: "Leadership training, awareness programs, and support systems to help women become self-reliant and confident.",
    metric: "Mahila Sashaktikaran",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Social Justice",
    detail: "Advocacy for equal rights, anti-discrimination efforts, and community awareness about social justice issues.",
    metric: "Samajik Nyay",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "District Legal Services",
    detail: "Free legal guidance, awareness about legal rights, and support for accessing justice and legal aid.",
    metric: "Jila Vidhik Seva",
    image: "https://images.unsplash.com/photo-1453747063559-36695c8771bd?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Skill Training",
    detail: "Vocational training programs that equip individuals with practical skills for employment and entrepreneurship.",
    metric: "Koushal Prashikshan",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Women Self-Employment",
    detail: "Support and training for women to start small businesses and achieve financial independence.",
    metric: "Mahila Swarojgaar",
    image: "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=800&q=80"
  }
];

export default function ProgramsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 md:px-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-primary">Programs</p>
        <h1 className="text-3xl font-bold text-neutral-ink">Our Seven Focus Areas</h1>
        <p className="text-neutral-body">
          Since 1999, Priya Sarv Utthan Seva Sansthan has been working across seven key areas to create comprehensive community development and lasting social impact in Indore. Our 27 years of experience guide our approach to sustainable change.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => (
          <div key={program.title} className="card p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-surface-offwhite shadow-inner ring-1 ring-neutral-muted/15">
                <Image
                  src={program.image}
                  alt={`${program.title} illustrative placeholder`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <h3 className="text-lg font-semibold text-neutral-ink">{program.title}</h3>
            </div>
            <p className="text-sm text-neutral-body">{program.detail}</p>
            <p className="text-xs font-semibold text-primary">{program.metric}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-primary to-primary-dark p-6 text-white shadow-md">
        <h2 className="text-xl font-semibold">Get Involved</h2>
        <p className="mt-2 text-sm text-white/90">
          Whether you want to volunteer, partner with us, or support our programs, there are many ways to contribute to meaningful change in our community. We welcome individuals and organizations who share our vision.
        </p>
        <div className="mt-3 inline-flex items-center gap-3 text-sm font-semibold">
          <span>Call us: +91 70000 78439</span>
        </div>
      </div>
    </div>
  );
}
