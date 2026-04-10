import { queryDatabase } from "@/lib/database";
import { logger } from "@/lib/logger";
import { sendDonationReceipt } from "@/lib/email";

export async function submitContact(input: {
  name: string;
  email: string;
  message: string;
}): Promise<any> {
  try {
    // Insert contact message into database
    const result = await queryDatabase(
      `
      INSERT INTO contacts (name, email, message, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING id, name, email, message, created_at;
      `,
      [input.name, input.email, input.message]
    );

    if (!result.rows || result.rows.length === 0) {
      throw new Error("Failed to insert contact record");
    }

    const record = result.rows[0];

    logger.info("Contact message saved to database", {
      id: record.id,
      email: record.email,
      name: record.name,
    });

    // Send confirmation email to submitter
    try {
      await sendDonationReceipt({
        donorEmail: input.email,
        donorName: input.name,
        amount: 0, // Not a donation
        orderId: `CONTACT-${record.id}`,
        paymentId: `CONTACT-${record.id}`,
        createdAt: new Date(record.created_at),
        ngoName: "Priya Sarv Utthan Seva Sansthan",
      });

      logger.info("Contact confirmation email sent", {
        email: input.email,
      });
    } catch (emailError: any) {
      logger.warn("Failed to send contact confirmation email", {
        email: input.email,
        error: emailError.message,
      });
      // Don't fail the contact submission if email fails
    }

    return {
      id: record.id,
      name: record.name,
      email: record.email,
      message: record.message,
      createdAt: record.created_at,
    };
  } catch (error: any) {
    logger.error("Failed to submit contact", {
      email: input.email,
      message: error.message,
    });
    throw error;
  }
}
