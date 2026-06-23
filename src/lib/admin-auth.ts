import crypto from "crypto";
import { NextRequest } from "next/server";

function timingSafeEqualString(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, "utf8");
    const bufB = Buffer.from(b, "utf8");
    if (bufA.length !== bufB.length) {
      return false;
    }
    return crypto.timingSafeEqual(
      new Uint8Array(bufA),
      new Uint8Array(bufB)
    );
  } catch {
    return false;
  }
}

export function verifyAdminApiKey(providedKey: string | null): boolean {
  const expectedKey = process.env.ADMIN_API_KEY;
  if (!expectedKey || !providedKey) {
    return false;
  }
  return timingSafeEqualString(providedKey, expectedKey);
}

export function getAdminKeyFromRequest(request: NextRequest): string | null {
  return request.headers.get("x-admin-key") || request.headers.get("x-api-key");
}

export function isAdminAuthorized(request: NextRequest): boolean {
  return verifyAdminApiKey(getAdminKeyFromRequest(request));
}
