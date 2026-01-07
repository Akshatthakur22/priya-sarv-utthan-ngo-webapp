"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

interface JobApplicationFormProps {
  jobId: string;
}

export function JobApplicationForm({ jobId }: JobApplicationFormProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      applicant: formData.get("applicant") as string,
      email: formData.get("email") as string,
      jobId,
      coverLetter: (formData.get("coverLetter") as string) || undefined
    };

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    setLoading(false);
    if (data.ok) {
      setStatus("Application sent. We will reach out soon.");
      form.reset();
    } else {
      setStatus(data.error || "Unable to submit");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-neutral-muted/20 bg-surface-paper p-4 shadow-sm">
      <div>
        <label className="text-sm font-semibold text-neutral-ink">Your name</label>
        <Input name="applicant" required placeholder="Your full name" />
      </div>
      <div>
        <label className="text-sm font-semibold text-neutral-ink">Email</label>
        <Input name="email" type="email" required placeholder="you@example.com" />
      </div>
      <div>
        <label className="text-sm font-semibold text-neutral-ink">Cover letter</label>
        <Textarea name="coverLetter" rows={3} placeholder="Tell us why this role fits you" />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Submitting..." : "Submit application"}
      </Button>
      {status && <p className="text-sm text-neutral-body">{status}</p>}
    </form>
  );
}
