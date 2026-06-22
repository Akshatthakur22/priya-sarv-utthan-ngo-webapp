"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { ResumeDropzone } from "./ResumeDropzone";

interface JobApplicationFormProps {
  jobId: string;
}

export function JobApplicationForm({ jobId }: JobApplicationFormProps) {
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string; applicationId?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState<File | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);
    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.set("jobId", jobId);
    if (resume) {
      formData.set("resume", resume);
    } else {
      formData.delete("resume");
    }

    const res = await fetch("/api/jobs", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);
    if (data.ok) {
      setStatus({
        type: "success",
        message: "Application submitted successfully! We'll reach out soon.",
        applicationId: data.applicationId,
      });
      form.reset();
      setResume(null);
    } else {
      const detailMessage = data.details?.map((d: { message: string }) => d.message).join(". ");
      setStatus({ type: "error", message: detailMessage || data.error || "Unable to submit" });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-neutral-100 bg-neutral-50/50 p-5">
      <div>
        <label className="text-sm font-semibold text-neutral-700 mb-1.5 block">Your name</label>
        <Input
          name="applicant"
          required
          placeholder="Your full name"
          className="rounded-xl border-neutral-200 focus:border-orange-300 focus:ring-orange-200"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-neutral-700 mb-1.5 block">Email</label>
        <Input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="rounded-xl border-neutral-200 focus:border-orange-300 focus:ring-orange-200"
        />
      </div>
      <ResumeDropzone file={resume} onFileChange={setResume} disabled={loading} />
      <div>
        <label className="text-sm font-semibold text-neutral-700 mb-1.5 block">Cover letter</label>
        <Textarea
          name="coverLetter"
          rows={3}
          placeholder="Tell us why this role fits you"
          className="rounded-xl border-neutral-200 focus:border-orange-300 focus:ring-orange-200"
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3
                   hover:from-orange-600 hover:to-amber-600 active:scale-95 touch-manipulation transition-all
                   disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
      >
        {loading ? "Submitting..." : "Submit Application"}
      </Button>
      {status && (
        <div
          className={`text-sm rounded-xl p-4 ${
            status.type === "success"
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <div className="flex items-start gap-3">
            {status.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            )}
            <div>
              <p className={status.type === "success" ? "text-green-800 font-medium" : "text-red-800 font-medium"}>
                {status.message}
              </p>
              {status.applicationId && (
                <p className="text-green-600 text-xs mt-1">
                  Application ID: <span className="font-mono font-semibold">{status.applicationId}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
