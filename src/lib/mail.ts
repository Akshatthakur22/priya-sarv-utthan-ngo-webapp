export async function sendMail({
  to,
  subject,
  body
}: {
  to: string;
  subject: string;
  body: string;
}) {
  // Mocked mailer
  console.info(`[mail] to=${to} subject=${subject} body=${body.slice(0, 80)}...`);
  return { ok: true };
}
