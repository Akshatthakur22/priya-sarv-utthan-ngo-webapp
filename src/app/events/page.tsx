import { getEvents } from "@/services/event.service";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 md:px-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-primary">Events & updates</p>
        <h1 className="text-3xl font-bold text-neutral-ink">Community Events & Activities</h1>
        <p className="text-neutral-body">
          Priya Sarv Utthan Foundation regularly organizes awareness programs, skill training workshops, legal aid camps, and community outreach activities. We bring together community members, experts, and volunteers to create positive change.
        </p>
      </div>

      <div className="grid gap-4">
        {events.map((evt) => (
          <div key={evt.id} className="card p-4">
            <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-semibold text-neutral-ink">{evt.title}</p>
                <p className="text-xs text-neutral-muted">{evt.date} • {evt.location}</p>
              </div>
              <p className="text-xs font-semibold text-primary">Open to volunteers</p>
            </div>
            <p className="mt-2 text-sm text-neutral-body">{evt.description}</p>
          </div>
        ))}
        {events.length === 0 && (
          <div className="card p-6 text-center">
            <p className="text-neutral-body">We regularly conduct awareness programs, training workshops, and community outreach activities in Gandhi Nagar, Indore. Check back soon for upcoming events or contact us to learn about our ongoing initiatives.</p>
          </div>
        )}
      </div>
    </div>
  );
}
