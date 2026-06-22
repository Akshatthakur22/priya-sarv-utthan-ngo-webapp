import { ContactMessage, Donation, EventItem, JobApplication, JobItem } from "@/types";

const now = new Date();

export const db = {
  events: [
    {
     id: "evt_health_camp_2026",
    title: "Community Health Camp",
    date: "2026-04-20",
    location: "Gandhi Nagar, Indore",
    description: "Free health checkups and medicines distributed to 200+ families.",
    published: true
    },
    {
      id: "evt_seekho_sikhao_kamao_2026",
      title: "Seekho • Sikhao • Mission",
      date: "2026-02-18",
      location: "Indore, MP",
      description: "A comprehensive skill development program for women featuring professional training in Mehendi art, beauty parlour services (makeup, hairstyling, skincare), advanced sewing and tailoring, and home-based income activities. Participants learn practical skills to start their own businesses, teach others, and achieve financial independence through sustainable livelihood opportunities.",
      published: true
    }

  ] as EventItem[],



  jobs: [
    {
      id: "job_volunteer_coach_indore_2026",
      title: "Program & Volunteer Management Intern",
      location: "Indore / Remote",
      commitment: "Internship",
      description: "Support the planning and coordination of community programs, assist in managing volunteers, help organize events, maintain participation records, and contribute to outreach activities. Ideal for students looking to gain real experience in social work, community development, and NGO operations.",
      open: true
    },
     {
  id: "job_skill_mission_partner_2025",
  title: "Mission Partner – Skill Development Program",
  location: "Indore / Open for Collaborators",
  commitment: "Flexible (Volunteer / Partner / Supporter)",
  description: "Become a part of our ‘Seekho • Sikhao • Kamao’ mission by supporting women's skill development. We welcome individuals, organizations, institutes, and community members who can contribute by providing training space, connecting us with skilled trainers (Mehendi, Beauty Parlour, Sewing, Art & Craft, etc.), or helping organize free skill-training camps. Your support can empower women to learn, teach others, and become financially independent.",
  open: true
}


  ] as JobItem[],
  jobApplications: [] as JobApplication[],
  jobApplicationResumes: {} as Record<string, { filename: string; mimeType: string; dataBase64: string }>,
  contacts: [] as ContactMessage[],
  donations: [
    {
      id: "don_1",
      name: "Donor",
      email: "donor@ngo.org",
      phone: "+91-1234567890",
      amount: 1,
      status: "completed",
      createdAt: "2026-04-10T17:40:56.729Z"
    },
    {
      id: "don_2",
      name: "Donor",
      email: "donor@ngo.org",
      phone: "+91-1234567890",
      amount: 1,
      status: "completed",
      createdAt: "2026-04-10T17:58:23.027Z"
    },
    {
      id: "don_3",
      name: "Donor",
      email: "donor@ngo.org",
      phone: "+91-1234567890",
      amount: 1,
      status: "completed",
      createdAt: "2026-04-10T18:25:19.890Z"
    },
    {
      id: "don_4",
      name: "Donor",
      email: "donor@ngo.org",
      phone: "+91-1234567890",
      amount: 1,
      status: "completed",
      createdAt: "2026-04-11T05:49:38.368Z"
    },
    {
      id: "don_5",
      name: "Donor",
      email: "donor@ngo.org",
      phone: "+91-1234567890",
      amount: 1,
      status: "completed",
      createdAt: "2026-04-11T06:26:07.630Z"
    }
  ] as Donation[]
};
