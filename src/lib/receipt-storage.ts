/**
 * Receipt Storage and Numbering System
 * Manages sequential receipt numbers to ensure uniqueness and auditability
 *
 * Receipt numbers are generated sequentially and stored permanently.
 * They are NOT derived from payment IDs or timestamps to ensure:
 * - Sequential integrity
 * - Audit trail accuracy
 * - Verification capability
 */

import { db } from "./db";

export interface StoredReceipt {
  receiptNumber: string;
  receiptId: string; // Unique identifier for verification
  donationId: string; // Link to donation record
  createdAt: Date;
}

// In-memory storage for receipts (in production, use database)
let receipts: StoredReceipt[] = [];
let receiptCounter: number = 0;

/**
 * Initialize receipt counter from existing receipts
 * This should be called once at server startup
 */
export function initializeReceiptCounter(): void {
  // For production: query database for max receipt number
  // For now, using in-memory counter
  receiptCounter = receipts.length > 0 ? receipts.length : 0;
}

/**
 * Generate the next receipt number in sequence
 * Format: PSUS-DR-YYYY-XXXXXX
 * Example: PSUS-DR-2026-000001
 */
export function getNextReceiptNumber(): { number: string; sequence: number; year: number } {
  const year = new Date().getFullYear();
  receiptCounter++;

  const paddedSequence = String(receiptCounter).padStart(6, "0");
  const receiptNumber = `PSUS-DR-${year}-${paddedSequence}`;

  return {
    number: receiptNumber,
    sequence: receiptCounter,
    year,
  };
}

/**
 * Generate a unique receipt ID for verification
 * This is different from the sequential receipt number
 */
export function generateReceiptId(): string {
  return `RCP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

/**
 * Store a receipt for permanent record
 */
export function storeReceipt(data: {
  receiptNumber: string;
  receiptId: string;
  donationId: string;
}): StoredReceipt {
  const receipt: StoredReceipt = {
    receiptNumber: data.receiptNumber,
    receiptId: data.receiptId,
    donationId: data.donationId,
    createdAt: new Date(),
  };

  receipts.push(receipt);

  // In production: save to database

  return receipt;
}

/**
 * Retrieve a receipt by receipt number
 */
export function getReceiptByNumber(receiptNumber: string): StoredReceipt | null {
  return receipts.find((r) => r.receiptNumber === receiptNumber) || null;
}

/**
 * Retrieve a receipt by receipt ID
 */
export function getReceiptById(receiptId: string): StoredReceipt | null {
  return receipts.find((r) => r.receiptId === receiptId) || null;
}

/**
 * Retrieve all receipts for a donation
 */
export function getReceiptsByDonationId(donationId: string): StoredReceipt[] {
  return receipts.filter((r) => r.donationId === donationId);
}

/**
 * Get receipt statistics
 */
export function getReceiptStats(): {
  totalReceipts: number;
  currentSequence: number;
  currentYear: number;
} {
  return {
    totalReceipts: receipts.length,
    currentSequence: receiptCounter,
    currentYear: new Date().getFullYear(),
  };
}
