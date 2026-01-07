import Image from "next/image";

// Placeholder images; replace with real event/community photos later.
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
    alt: "Children learning together"
  },
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    alt: "Women in community discussion"
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    alt: "Women empowerment group"
  },
  {
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
    alt: "Teacher guiding students"
  }
];

export function WorkInAction() {
  return (
    <section className="bg-surface-offwhite py-12">
      <div className="mx-auto max-w-6xl space-y-6 px-4 md:px-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-primary">Our Work in Action</p>
          <h2 className="text-2xl font-bold text-neutral-ink">Moments of joy and learning</h2>
          <p className="text-neutral-body">
            A glimpse of the smiles, learning, and community spirit we foster every day.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {galleryImages.map((img) => (
            <div key={img.src} className="overflow-hidden rounded-2xl bg-surface-paper shadow-sm ring-1 ring-neutral-muted/15">
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={600}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        {/* Images will be replaced with real NGO event photos later */}
      </div>
    </section>
  );
}
