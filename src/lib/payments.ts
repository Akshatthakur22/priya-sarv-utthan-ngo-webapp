import { randomUUID } from "crypto";
import { Donation } from "@/types";

export async function processDonation(
  payload: Pick<Donation, "name" | "email" | "amount" | "message">
): Promise<Donation> {
  // Mock payment processing
  return {
    id: randomUUID(),
    status: "succeeded",
    createdAt: new Date().toISOString(),
    ...payload
  };
}
