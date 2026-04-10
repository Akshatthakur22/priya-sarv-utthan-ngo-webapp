/**
 * GET /api/events
 * Fetch published events
 */

import { NextResponse } from "next/server";
import { getEvents } from "@/services/event.service";

export async function GET() {
  try {
    const events = await getEvents({ publishedOnly: true });
    return NextResponse.json({
      success: true,
      data: events,
      count: events.length,
    });
  } catch (error: any) {
    console.error("Failed to fetch events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
