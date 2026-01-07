import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/config";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 md:px-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-primary">Contact</p>
        <h1 className="text-3xl font-bold text-neutral-ink">Get in Touch</h1>
        <p className="text-neutral-body">
          Whether you want to volunteer, donate, partner with us, or simply learn more about our work, we&apos;d love to hear from you. Reach out through the form or visit us at our office in Gandhi Nagar, Indore.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-5 shadow-sm">
          <ContactForm />
        </div>
        <div className="space-y-4 rounded-2xl bg-surface-paper p-5 shadow-sm ring-1 ring-neutral-muted/20">
          <div>
            <p className="text-sm font-semibold text-neutral-ink">Email</p>
            <p className="text-sm text-neutral-body">{siteConfig.contactEmail}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-ink">Phone</p>
            <p className="text-sm text-neutral-body">{siteConfig.phone}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-ink">Office</p>
            <p className="text-sm text-neutral-body">{siteConfig.address}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-ink">Working Hours</p>
            <p className="text-sm text-neutral-body">{siteConfig.workingHours}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
