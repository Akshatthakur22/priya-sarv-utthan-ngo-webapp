import { DonationForm } from "@/components/forms/DonationForm";

export default function DonatePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10 md:px-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-primary">Donate</p>
        <h1 className="text-3xl font-bold text-neutral-ink">Support Our Work</h1>
        <p className="text-neutral-body">
          Your contribution helps us empower women, educate children, provide skill training, and create opportunities for self-employment. Every donation, whether financial support, food, or clothes, makes a real difference in the lives of families in Gandhi Nagar, Indore. Together, we can build stronger, more resilient communities.
        </p>
      </div>

      <div className="card p-5 shadow-sm">
        <DonationForm />
        <p className="mt-4 text-xs text-neutral-muted">
          Thank you for your generosity. For donations of food, clothes, or other materials, please contact us directly at +91 70000 78439 or visit our office during working hours.
        </p>
      </div>
    </div>
  );
}
