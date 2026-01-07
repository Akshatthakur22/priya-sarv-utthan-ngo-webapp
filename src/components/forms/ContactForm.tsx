"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
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
      message: formData.get("message") as string
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    setLoading(false);

    if (data.ok) {
      setStatus("Thanks! We received your message.");
      form.reset();
    } else {
      setStatus(data.error || "Something went wrong");
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
      <div>
        <label className="text-sm font-semibold text-neutral-ink">How can we help?</label>
        <Textarea name="message" rows={4} required placeholder="Tell us about your question or partnership idea" />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send message"}
      </Button>
      {status && <p className="text-sm text-neutral-body">{status}</p>}
    </form>
  );
}
