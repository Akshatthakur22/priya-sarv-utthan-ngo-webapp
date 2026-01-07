import { db } from "@/lib/db";
import { ContactMessage } from "@/types";
import { ensure, isValidEmail, sanitizeText } from "@/utils/validators";
import { randomUUID } from "crypto";
import { sendMail } from "@/lib/mail";

export async function submitContact(input: {
  name: string;
  email: string;
  message: string;
}): Promise<ContactMessage> {
  const name = sanitizeText(input.name);
  const email = sanitizeText(input.email).toLowerCase();
  const message = sanitizeText(input.message);

  ensure(name.length > 1, "Name is required");
  ensure(isValidEmail(email), "Valid email required");
  ensure(message.length > 5, "Message is too short");

  const record: ContactMessage = {
    id: randomUUID(),
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  };

  db.contacts.unshift(record);

  await sendMail({
    to: email,
    subject: "We received your message",
    body: `Hi ${name}, thank you for reaching out. Our team will respond soon.`
  });

  return record;
}
