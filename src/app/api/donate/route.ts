import { NextResponse } from "next/server";
import { createDonation } from "@/services/donation.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const donation = await createDonation(body);
    return NextResponse.json({ ok: true, donation });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to donate";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
