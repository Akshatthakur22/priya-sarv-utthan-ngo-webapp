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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-neutral-ink mb-1.5">
            Your name
          </label>
          <Input id="name" name="name" required placeholder="Full name" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-neutral-ink mb-1.5">
            Email address
          </label>
          <Input id="email" name="email" type="email" required placeholder="you@example.com" />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-neutral-ink mb-1.5">
          How can we help?
        </label>
        <Textarea 
          id="message" 
          name="message" 
          rows={5} 
          required 
          placeholder="Tell us about your question, partnership idea, or how you'd like to get involved..."
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Sending..." : "Send message"}
      </Button>
      {status && (
        <p className={`text-sm ${status.includes('Thanks') ? 'text-support-green' : 'text-support-red'}`}>
          {status}
        </p>
      )}
    </form>
  );
}
