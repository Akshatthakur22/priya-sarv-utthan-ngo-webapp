"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

export function DonationForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      amount: Number(formData.get("amount")),
      message: (formData.get("message") as string) || undefined
    };

    const res = await fetch("/api/donate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    setLoading(false);

    if (data.ok) {
      setStatus("Donation recorded. Thank you!");
      form.reset();
    } else {
      setStatus(data.error || "Unable to process donation");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-neutral-ink">Name</label>
          <Input name="name" required placeholder="Your full name" />
        </div>
        <div>
          <label className="text-sm font-semibold text-neutral-ink">Email</label>
          <Input name="email" type="email" required placeholder="you@example.com" />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-neutral-ink">Amount (USD)</label>
          <Input name="amount" type="number" min={5} step={5} required placeholder="50" />
        </div>
        <div>
          <label className="text-sm font-semibold text-neutral-ink">Message (optional)</label>
          <Input name="message" placeholder="A note for our team" />
        </div>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Donate securely"}
      </Button>
      {status && <p className="text-sm text-neutral-body">{status}</p>}
    </form>
  );
}
