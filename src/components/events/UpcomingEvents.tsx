'use client';

import { Calendar, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  published: boolean;
}

interface UpcomingEventsProps {
  events: EventItem[];
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (eventId: string) => {
    setExpandedCard(expandedCard === eventId ? null : eventId);
  };

  return (
    <section className="bg-surface-offwhite py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary-dark mb-4">
            <Calendar className="h-4 w-4 text-primary-dark" />
            Coming Soon
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-ink mb-3">
            Upcoming Events
          </h2>
          <p className="text-neutral-muted">Join us in our upcoming initiatives</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {events.map((evt) => (
            <div
              key={evt.id}
              className={`bg-white rounded-2xl shadow-sm border border-neutral-muted/10 transition-all duration-300 cursor-pointer ${
                expandedCard === evt.id 
                  ? 'ring-2 ring-primary/20 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => toggleCard(evt.id)}
            >
              <div className="p-5">
                {/* Header - Always Visible */}
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-neutral-ink text-lg">
                        {evt.title}
                      </h3>
                      <div className="ml-auto">
                        {expandedCard === evt.id ? (
                          <ChevronUp className="h-5 w-5 text-primary transition-transform duration-300" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-primary transition-transform duration-300" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-neutral-muted">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {evt.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {evt.location}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-support-green/10 px-3 py-1.5 text-xs font-semibold text-support-green-dark w-fit">
                    Open to Join
                  </span>
                </div>

                {/* Expanded Content */}
                {expandedCard === evt.id && (
                  <div className="mt-4 pt-4 border-t border-neutral-muted/10 animate-in slide-in-from-top-2">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-neutral-ink mb-2">About this event</h4>
                        <p className="text-neutral-body leading-relaxed">
                          {evt.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 pt-2">
                        <span className="inline-flex items-center rounded-full bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary-dark border border-primary/20">
                          Community Service
                        </span>
                        <span className="inline-flex items-center rounded-full bg-accent-coral/5 px-3 py-1.5 text-xs font-medium text-accent-coral-dark border border-accent-coral/20">
                          Volunteer Opportunity
                        </span>
                        <span className="inline-flex items-center rounded-full bg-support-green/5 px-3 py-1.5 text-xs font-medium text-support-green-dark border border-support-green/20">
                          Impact Driven
                        </span>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle volunteer registration or contact
                            window.location.href = '/contact';
                          }}
                          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark hover:shadow-md"
                        >
                          Contact Us
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {events.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center">
              <p className="text-neutral-body">
                We regularly conduct awareness programs and outreach activities in Gandhi Nagar, Indore.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
