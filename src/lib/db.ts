import { ContactMessage, Donation, EventItem, JobApplication, JobItem } from "@/types";

const now = new Date();

export const db = {
  donations: [
    {
      id: "don_001",
      name: "Amina Yusuf",
      email: "amina@example.org",
      amount: 150,
      message: "Keep supporting girls' education!",
      status: "succeeded" as const,
      createdAt: now.toISOString()
    },
    {
      id: "don_002",
      name: "Luis Gomez",
      email: "luis@example.org",
      amount: 75,
      message: "Proud to help.",
      status: "succeeded" as const,
      createdAt: now.toISOString()
    }
  ] as Donation[],
  events: [
    {
      id: "evt_community_health",
      title: "Community Health Camp",
      date: "2024-09-15",
      location: "Nairobi, KE",
      description: "Free screenings, nutrition guidance, and referrals.",
      published: true
    },
    {
      id: "evt_skills_lab",
      title: "Youth Skills Lab",
      date: "2024-10-02",
      location: "Kisumu, KE",
      description: "Hands-on digital literacy and job readiness coaching.",
      published: true
    }
  ] as EventItem[],
  jobs: [
    {
      id: "job_program_manager",
      title: "Program Manager",
      location: "Hybrid / Nairobi",
      commitment: "full-time",
      description: "Lead multi-country programs with a focus on monitoring and evaluation.",
      open: true
    },
    {
      id: "job_volunteer_coach",
      title: "Volunteer Coach",
      location: "Remote",
      commitment: "volunteer",
      description: "Mentor youth cohorts for 2-4 hours per week.",
      open: true
    }
  ] as JobItem[],
  jobApplications: [] as JobApplication[],
  contacts: [] as ContactMessage[]
};
