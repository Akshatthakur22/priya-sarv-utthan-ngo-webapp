/** Escape HTML special characters for safe email/template output */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/** Strip CR/LF from email headers to prevent header injection */
export function sanitizeEmailHeader(value: string): string {
  return value.replace(/[\r\n]/g, "");
}
