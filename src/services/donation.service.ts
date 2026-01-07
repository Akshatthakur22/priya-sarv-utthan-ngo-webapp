import { db } from "@/lib/db";
import { processDonation } from "@/lib/payments";
import { sendMail } from "@/lib/mail";
import { Donation } from "@/types";
import { ensure, isPositiveAmount, isValidEmail, sanitizeText } from "@/utils/validators";

export async function listDonations(): Promise<Donation[]> {
  return db.donations;
}

export async function createDonation(input: {
  name: string;
  email: string;
  amount: number;
  message?: string;
}): Promise<Donation> {
  const name = sanitizeText(input.name);
  const email = sanitizeText(input.email).toLowerCase();
  const message = input.message ? sanitizeText(input.message) : undefined;

  ensure(name.length > 1, "Name is required");
  ensure(isValidEmail(email), "Valid email required");
  ensure(isPositiveAmount(input.amount), "Amount must be positive");

  const donation = await processDonation({ name, email, amount: input.amount, message });
  db.donations.unshift(donation);

  await sendMail({
    to: email,
    subject: "Thank you for supporting our work",
    body: `Hi ${name}, thank you for donating $${input.amount.toFixed(2)}.`
  });

  return donation;
}
