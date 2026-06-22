export type DonationStatus = "pending" | "completed" | "failed";

export interface Donation {
  id: string;
  name: string;
  email: string;
  phone: string;
  amount: number;
  message?: string;
  status: DonationStatus;
  createdAt: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  published: boolean;
}

export interface JobItem {
  id: string;
  title: string;
  location: string;
commitment: string;
  description: string;
  open: boolean;
}

export interface JobApplication {
  id: string;
  applicant: string;
  email: string;
  jobId: string;
  coverLetter?: string;
  resumeFilename?: string;
  resumeMimeType?: string;
  hasResume?: boolean;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}
