import { queryDatabase } from "@/lib/database";
import { logger } from "@/lib/logger";
import { sendDonationReceipt } from "@/lib/email";
import { db } from "@/lib/db";
import { JobItem } from "@/types";
import { sanitizeText } from "@/utils/validators";

export async function getJobs({ publicOnly = false } = {}): Promise<JobItem[]> {
  try {
    // Try to fetch from database
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
  
  // Fallback to static data if DB fails
  return publicOnly ? db.jobs.filter((job) => job.open) : db.jobs;
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
    open: job.open ?? true
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
}): Promise<any> {
  try {
    // Insert job application into database
    const result = await queryDatabase(
      `
      INSERT INTO applications (name, email, phone, role, cover_letter, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING id, name, email, phone, role, cover_letter, created_at;
      `,
      [input.applicant, input.email, input.phone || null, input.jobId, input.coverLetter || null]
    );

    if (!result.rows || result.rows.length === 0) {
      throw new Error("Failed to insert application record");
    }

    const record = result.rows[0];

    logger.info("Job application saved to database", {
      id: record.id,
      email: record.email,
      role: record.role,
    });

    // Send confirmation email to applicant
    try {
      await sendDonationReceipt({
        donorEmail: input.email,
        donorName: input.applicant,
        amount: 0,
        orderId: `APP-${record.id}`,
        paymentId: `APP-${record.id}`,
        createdAt: new Date(record.created_at),
        ngoName: "Priya Sarv Utthan Seva Sansthan",
      });

      logger.info("Job application confirmation email sent", {
        email: input.email,
      });
    } catch (emailError: any) {
      logger.warn("Failed to send application confirmation email", {
        email: input.email,
        error: emailError.message,
      });
    }

    return {
      id: record.id,
      applicant: record.name,
      email: record.email,
      jobId: record.role,
      coverLetter: record.cover_letter,
      createdAt: record.created_at,
    };
  } catch (error: any) {
    logger.error("Failed to apply to job", {
      email: input.email,
      jobId: input.jobId,
      message: error.message,
    });
    throw error;
  }
}
