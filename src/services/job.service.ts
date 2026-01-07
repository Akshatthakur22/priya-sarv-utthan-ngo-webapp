import { db } from "@/lib/db";
import { JobApplication, JobItem } from "@/types";
import { ensure, isValidEmail, sanitizeText } from "@/utils/validators";
import { randomUUID } from "crypto";

export async function getJobs({ publicOnly = false } = {}): Promise<JobItem[]> {
  return publicOnly ? db.jobs.filter((job) => job.open) : db.jobs;
}

export async function createJob(job: {
  title: string;
  location: string;
  commitment: JobItem["commitment"];
  description: string;
  open?: boolean;
}): Promise<JobItem> {
  const payload: JobItem = {
    id: randomUUID(),
    title: sanitizeText(job.title),
    location: sanitizeText(job.location),
    commitment: job.commitment,
    description: sanitizeText(job.description),
    open: job.open ?? true
  };

  ensure(payload.title.length > 2, "Title required");
  db.jobs.unshift(payload);
  return payload;
}

export async function updateJob(id: string, changes: Partial<JobItem>): Promise<JobItem> {
  const index = db.jobs.findIndex((j) => j.id === id);
  ensure(index >= 0, "Job not found");
  db.jobs[index] = { ...db.jobs[index], ...changes };
  return db.jobs[index];
}

export async function deleteJob(id: string): Promise<void> {
  const index = db.jobs.findIndex((j) => j.id === id);
  ensure(index >= 0, "Job not found");
  db.jobs.splice(index, 1);
}

export async function applyToJob(input: {
  applicant: string;
  email: string;
  jobId: string;
  coverLetter?: string;
}): Promise<JobApplication> {
  const applicant = sanitizeText(input.applicant);
  const email = sanitizeText(input.email).toLowerCase();
  const coverLetter = input.coverLetter ? sanitizeText(input.coverLetter) : undefined;

  ensure(applicant.length > 1, "Name is required");
  ensure(isValidEmail(email), "Valid email required");
  ensure(db.jobs.some((j) => j.id === input.jobId), "Job not found");

  const application: JobApplication = {
    id: randomUUID(),
    applicant,
    email,
    jobId: input.jobId,
    coverLetter,
    createdAt: new Date().toISOString()
  };

  db.jobApplications.unshift(application);
  return application;
}
