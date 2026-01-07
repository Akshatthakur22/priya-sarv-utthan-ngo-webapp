export function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export function ensure(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

export function sanitizeText(value: string) {
  return value.trim();
}

export function isPositiveAmount(amount: number) {
  return Number.isFinite(amount) && amount > 0;
}
