import { JobApplicationForm } from "@/components/forms/JobApplicationForm";
import { getJobs } from "@/services/job.service";

export default async function CareersPage() {
  const jobs = await getJobs({ publicOnly: true });

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 md:px-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-primary">Volunteer with us</p>
        <h1 className="text-3xl font-bold text-neutral-ink">Join Our Mission</h1>
        <p className="text-neutral-body">
          We welcome passionate individuals who want to contribute to community development. Our volunteers play a vital role in supporting women empowerment, education, skill training, and social justice initiatives. Please note that volunteer positions are typically unpaid, driven by the spirit of service and social impact.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {jobs.map((job) => (
          <div key={job.id} className="card p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-neutral-ink">{job.title}</h3>
                <p className="text-xs text-neutral-muted">{job.location} • {job.commitment}</p>
              </div>
              <span className="rounded-full bg-support-green-light/60 px-3 py-1 text-xs font-semibold text-support-green-dark">
                Open
              </span>
            </div>
            <p className="mt-2 text-sm text-neutral-body">{job.description}</p>
            <div className="mt-4">
              <JobApplicationForm jobId={job.id} />
            </div>
          </div>
        ))}
        {jobs.length === 0 && (
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-ink mb-3">Interested in Volunteering?</h3>
            <p className="text-sm text-neutral-body mb-4">
              We are always looking for dedicated volunteers who want to make a difference in our community. Whether you have skills in teaching, legal support, counseling, community outreach, or simply a passion for social work, there's a place for you at Priya Sarv Utthan Foundation.
            </p>
            <p className="text-sm text-neutral-body mb-4">
              <strong>What we value:</strong> Volunteers who are committed, compassionate, and willing to work with communities. Most volunteer roles are unpaid but offer meaningful experience and the satisfaction of contributing to real social change.
            </p>
            <p className="text-sm text-neutral-body">
              <strong>Get in touch:</strong> Visit our office or contact us at +91 70000 78439 during working hours (11:00 AM – 5:00 PM, All Days) to discuss how you can contribute.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
