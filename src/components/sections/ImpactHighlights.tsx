import { HeartHandshake, BookOpenCheck, Scale } from "lucide-react";

const highlights = [
  {
    title: "Women Empowerment",
    body: "Supporting women through skill development, self-employment, and legal awareness programs.",
    stat: "Mahila Sashaktikaran",
    color: "accent-coral",
    Icon: HeartHandshake
  },
  {
    title: "Education",
    body: "Quality education initiatives and skill training programs for children and adults.",
    stat: "Shiksha & Koushal",
    color: "primary",
    Icon: BookOpenCheck
  },
  {
    title: "Social Justice",
    body: "District legal services and advocacy for equal rights and opportunities for all.",
    stat: "Samajik Nyay",
    color: "support-green",
    Icon: Scale
  }
];

export function ImpactHighlights() {
  return (
    <section className="bg-surface-paper py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl space-y-3">
            <p className="text-sm font-semibold text-primary">What we do</p>
            <h2 className="text-2xl font-bold text-neutral-ink">Creating Lasting Impact</h2>
            <p className="text-neutral-body">
              From women and child development to education and social justice, our programs are designed to empower communities and create sustainable change across Indore.
            </p>
          </div>
          <div className="grid flex-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.title} className="card h-full p-4">
                <div className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-${item.color}-light/60 text-${item.color}-dark`}>
                  <item.Icon className="h-4 w-4" />
                </div>
                <p className="mt-3 text-sm font-semibold text-neutral-ink">{item.title}</p>
                <p className="mt-2 text-sm text-neutral-body">{item.body}</p>
                <p className={`mt-3 text-xs font-semibold text-${item.color}`}>{item.stat}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
