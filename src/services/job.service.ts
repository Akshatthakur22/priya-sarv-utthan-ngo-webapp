import { queryDatabase } from "@/lib/database";
import { sendJobApplicationConfirmation } from "@/lib/email";
import { logger } from "@/lib/logger";
import { ResumeFile } from "@/lib/resume-storage";
import { db } from "@/lib/db";
import { JobApplication, JobItem } from "@/types";
import { sanitizeText } from "@/utils/validators";
import { randomUUID } from "crypto";

export async function getJobs({ publicOnly = false } = {}): Promise<JobItem[]> {
  try {
    const result = await queryDatabase(
      publicOnly
        ? "SELECT * FROM jobs WHERE open = true ORDER BY created_at DESC"
        : "SELECT * FROM jobs ORDER BY created_at DESC"
    );

    if (result.rows && result.rows.length > 0) {
      return result.rows.map((row: any) => ({
        id: row.id,
        title: row.title,
        location: row.location,
        commitment: row.commitment,
        description: row.description,
        open: row.open,
      }));
    }
  } catch (error) {
    console.warn("Failed to fetch jobs from database, falling back to static data");
  }

  return publicOnly ? db.jobs.filter((job) => job.open) : db.jobs;
}

export async function getJobById(id: string): Promise<JobItem | null> {
  const jobs = await getJobs({ publicOnly: false });
  return jobs.find((job) => job.id === id) ?? null;
}

export async function createJob(job: {
  title: string;
  location: string;
  commitment: JobItem["commitment"];
  description: string;
  open?: boolean;
}): Promise<JobItem> {
  const id = Math.random().toString(36).substring(7);
  const payload: JobItem = {
    id,
    title: sanitizeText(job.title),
    location: sanitizeText(job.location),
    commitment: job.commitment,
    description: sanitizeText(job.description),
    open: job.open ?? true,
  };

  if (payload.title.length < 2) throw new Error("Title required");

  try {
    await queryDatabase(
      `INSERT INTO jobs (id, title, location, commitment, description, open) VALUES ($1, $2, $3, $4, $5, $6)`,
      [id, payload.title, payload.location, payload.commitment, payload.description, payload.open]
    );
  } catch (error) {
    console.warn("Failed to store job in database, adding to memory only");
  }

  db.jobs.unshift(payload);
  return payload;
}

export async function updateJob(id: string, changes: Partial<JobItem>): Promise<JobItem> {
  const index = db.jobs.findIndex((j) => j.id === id);
  if (index < 0) throw new Error("Job not found");

  db.jobs[index] = { ...db.jobs[index], ...changes };

  try {
    await queryDatabase(
      `UPDATE jobs SET title = $1, location = $2, commitment = $3, description = $4, open = $5, updated_at = NOW() WHERE id = $6`,
      [db.jobs[index].title, db.jobs[index].location, db.jobs[index].commitment, db.jobs[index].description, db.jobs[index].open, id]
    );
  } catch (error) {
    console.warn("Failed to update job in database");
  }

  return db.jobs[index];
}

export async function deleteJob(id: string): Promise<void> {
  const index = db.jobs.findIndex((j) => j.id === id);
  if (index < 0) throw new Error("Job not found");

  try {
    await queryDatabase(`DELETE FROM jobs WHERE id = $1`, [id]);
  } catch (error) {
    console.warn("Failed to delete job from database");
  }

  db.jobs.splice(index, 1);
}

export async function applyToJob(input: {
  applicant: string;
  email: string;
  jobId: string;
  phone?: string;
  coverLetter?: string;
  resume?: ResumeFile;
}): Promise<JobApplication> {
  const job = await getJobById(input.jobId);
  if (!job) {
    throw new Error("Job not found");
  }
  if (!job.open) {
    throw new Error("This position is no longer accepting applications");
  }

  let application: JobApplication;

  try {
    const result = await queryDatabase(
      `
      INSERT INTO applications (name, email, phone, role, cover_letter, resume_filename, resume_mime_type, resume_data, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
      RETURNING id, name, email, phone, role, cover_letter, resume_filename, resume_mime_type, created_at;
      `,
      [
        input.applicant,
        input.email,
        input.phone || null,
        input.jobId,
        input.coverLetter || null,
        input.resume?.filename || null,
        input.resume?.mimeType || null,
        input.resume?.data || null,
      ]
    );

    if (!result.rows || result.rows.length === 0) {
      throw new Error("Failed to insert application record");
    }

    const record = result.rows[0];

    application = {
      id: String(record.id),
      applicant: record.name,
      email: record.email,
      jobId: record.role,
      coverLetter: record.cover_letter ?? undefined,
      resumeFilename: record.resume_filename ?? undefined,
      resumeMimeType: record.resume_mime_type ?? undefined,
      hasResume: Boolean(record.resume_filename),
      createdAt: new Date(record.created_at).toISOString(),
    };

    logger.info("Job application saved to database", {
      id: application.id,
      email: application.email,
      jobId: application.jobId,
      hasResume: application.hasResume,
    });
  } catch (error: any) {
    logger.warn("Failed to store application in database, saving locally", {
      email: input.email,
      jobId: input.jobId,
      message: error.message,
    });

    const id = randomUUID();
    application = {
      id,
      applicant: input.applicant,
      email: input.email,
      jobId: input.jobId,
      coverLetter: input.coverLetter,
      resumeFilename: input.resume?.filename,
      resumeMimeType: input.resume?.mimeType,
      hasResume: Boolean(input.resume),
      createdAt: new Date().toISOString(),
    };

    if (input.resume) {
      db.jobApplicationResumes[id] = {
        filename: input.resume.filename,
        mimeType: input.resume.mimeType,
        dataBase64: input.resume.data.toString("base64"),
      };
    }

    db.jobApplications.unshift(application);
  }

  try {
    await sendJobApplicationConfirmation({
      applicantEmail: input.email,
      applicantName: input.applicant,
      jobTitle: job.title,
      applicationId: application.id,
    });
  } catch (emailError: any) {
    logger.warn("Failed to send application confirmation email", {
      email: input.email,
      error: emailError.message,
    });
  }

  return application;
}

export async function getApplications(): Promise<JobApplication[]> {
  try {
    const result = await queryDatabase(
      `
      SELECT id, name, email, role, cover_letter, resume_filename, resume_mime_type, created_at
      FROM applications
      ORDER BY created_at DESC
      LIMIT 500
      `
    );

    if (result.rows && result.rows.length > 0) {
      return result.rows.map((row: any) => ({
        id: String(row.id),
        applicant: row.name,
        email: row.email,
        jobId: row.role,
        coverLetter: row.cover_letter ?? undefined,
        resumeFilename: row.resume_filename ?? undefined,
        resumeMimeType: row.resume_mime_type ?? undefined,
        hasResume: Boolean(row.resume_filename),
        createdAt: new Date(row.created_at).toISOString(),
      }));
    }
  } catch (error) {
    logger.warn("Failed to fetch applications from database, using local data");
  }

  return db.jobApplications;
}

export async function getApplicationResume(id: string): Promise<ResumeFile | null> {
  const memoryResume = db.jobApplicationResumes[id];
  if (memoryResume) {
    return {
      filename: memoryResume.filename,
      mimeType: memoryResume.mimeType,
      data: Buffer.from(memoryResume.dataBase64, "base64"),
    };
  }

  try {
    const result = await queryDatabase(
      `SELECT resume_filename, resume_mime_type, resume_data FROM applications WHERE id = $1`,
      [id]
    );

    const row = result.rows?.[0];
    if (!row?.resume_data || !row.resume_filename) {
      return null;
    }

    return {
      filename: row.resume_filename,
      mimeType: row.resume_mime_type || "application/octet-stream",
      data: row.resume_data,
    };
  } catch (error) {
    logger.warn("Failed to fetch application resume", { id });
    return null;
  }
}
