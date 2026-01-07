import { db } from "@/lib/db";
import { EventItem } from "@/types";
import { ensure, sanitizeText } from "@/utils/validators";
import { randomUUID } from "crypto";

export async function getEvents({ publishedOnly = true } = {}): Promise<EventItem[]> {
  if (publishedOnly) return db.events.filter((e) => e.published);
  return db.events;
}

export async function createEvent(event: {
  title: string;
  date: string;
  location: string;
  description: string;
  published?: boolean;
}): Promise<EventItem> {
  const payload: EventItem = {
    id: randomUUID(),
    title: sanitizeText(event.title),
    date: event.date,
    location: sanitizeText(event.location),
    description: sanitizeText(event.description),
    published: event.published ?? false
  };

  ensure(payload.title.length > 2, "Title required");
  ensure(payload.date.length > 3, "Date required");

  db.events.unshift(payload);
  return payload;
}

export async function updateEvent(id: string, changes: Partial<EventItem>): Promise<EventItem> {
  const index = db.events.findIndex((e) => e.id === id);
  ensure(index >= 0, "Event not found");

  db.events[index] = { ...db.events[index], ...changes };
  return db.events[index];
}

export async function deleteEvent(id: string): Promise<void> {
  const index = db.events.findIndex((e) => e.id === id);
  ensure(index >= 0, "Event not found");
  db.events.splice(index, 1);
}
