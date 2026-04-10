import { queryDatabase } from "@/lib/database";
import { db } from "@/lib/db";
import { EventItem } from "@/types";
import { ensure, sanitizeText } from "@/utils/validators";
import { randomUUID } from "crypto";

export async function getEvents({ publishedOnly = true } = {}): Promise<EventItem[]> {
  try {
    // Try to fetch from database
    const result = await queryDatabase(
      publishedOnly 
        ? "SELECT * FROM events WHERE published = true ORDER BY date DESC"
        : "SELECT * FROM events ORDER BY date DESC"
    );
    
    if (result.rows && result.rows.length > 0) {
      return result.rows.map((row: any) => ({
        id: row.id,
        title: row.title,
        date: row.date,
        location: row.location,
        description: row.description,
        published: row.published,
      }));
    }
  } catch (error) {
    console.warn("Failed to fetch events from database, falling back to static data");
  }
  
  // Fallback to static data if DB fails
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
  const id = randomUUID();
  const payload: EventItem = {
    id,
    title: sanitizeText(event.title),
    date: event.date,
    location: sanitizeText(event.location),
    description: sanitizeText(event.description),
    published: event.published ?? false
  };

  ensure(payload.title.length > 2, "Title required");
  ensure(payload.date.length > 3, "Date required");

  try {
    await queryDatabase(
      `INSERT INTO events (id, title, date, location, description, published) VALUES ($1, $2, $3, $4, $5, $6)`,
      [id, payload.title, payload.date, payload.location, payload.description, payload.published]
    );
  } catch (error) {
    console.warn("Failed to store event in database, adding to memory only");
  }

  db.events.unshift(payload);
  return payload;
}

export async function updateEvent(id: string, changes: Partial<EventItem>): Promise<EventItem> {
  const index = db.events.findIndex((e) => e.id === id);
  ensure(index >= 0, "Event not found");

  db.events[index] = { ...db.events[index], ...changes };
  
  try {
    await queryDatabase(
      `UPDATE events SET title = $1, date = $2, location = $3, description = $4, published = $5, updated_at = NOW() WHERE id = $6`,
      [db.events[index].title, db.events[index].date, db.events[index].location, db.events[index].description, db.events[index].published, id]
    );
  } catch (error) {
    console.warn("Failed to update event in database");
  }
  
  return db.events[index];
}

export async function deleteEvent(id: string): Promise<void> {
  const index = db.events.findIndex((e) => e.id === id);
  ensure(index >= 0, "Event not found");
  
  try {
    await queryDatabase(`DELETE FROM events WHERE id = $1`, [id]);
  } catch (error) {
    console.warn("Failed to delete event from database");
  }
  
  db.events.splice(index, 1);
}
