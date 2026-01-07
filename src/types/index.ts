export type DonationStatus = "pending" | "succeeded" | "failed";

export interface Donation {
  id: string;
  name: string;
  email: string;
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
  commitment: "full-time" | "part-time" | "volunteer";
  description: string;
  open: boolean;
}

export interface JobApplication {
  id: string;
  applicant: string;
  email: string;
  jobId: string;
  coverLetter?: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}
