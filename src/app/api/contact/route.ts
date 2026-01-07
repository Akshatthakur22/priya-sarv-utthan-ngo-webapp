import { NextResponse } from "next/server";
import { submitContact } from "@/services/contact.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const record = await submitContact({
      name: body.name,
      email: body.email,
      message: body.message
    });
    return NextResponse.json({ ok: true, record });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to submit";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
