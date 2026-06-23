# Security Policy

## Reporting a Vulnerability

If you discover a security issue in this project, please **do not** open a public GitHub issue with exploit details.

Contact the maintainers privately with:

- A description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We aim to acknowledge reports within 72 hours.

## Supported Versions

| Version | Supported |
| ------- | --------- |
| `main`  | Yes       |

## Security Practices

### Secrets & Environment Variables

- **Never commit** `.env`, `.env.local`, or any file containing real credentials.
- Use `.env.example` as a template with placeholder values only.
- Rotate credentials immediately if they are exposed (chat logs, screenshots, git history, etc.).

Required secrets for production:

| Variable | Purpose |
| -------- | ------- |
| `ADMIN_API_KEY` | Protects admin API routes and dashboard |
| `RAZORPAY_KEY_SECRET` | Server-side payment verification |
| `DATABASE_URL` | PostgreSQL connection |
| `EMAIL_APP_PASSWORD` | SMTP for receipts and notifications |

### Admin Access

- Admin routes require the `x-admin-key` header matching `ADMIN_API_KEY`.
- Keys are compared with timing-safe equality to prevent timing attacks.
- Admin API routes are rate-limited (30 requests / 15 minutes per IP).
- The admin dashboard stores the key in `sessionStorage` (cleared when the tab closes). For stronger protection, use a reverse proxy or VPN in production.

### Payments (Razorpay)

- Payment signatures are verified server-side with HMAC-SHA256 and timing-safe comparison.
- Order amounts are cross-checked against captured payment amounts.
- Donation endpoints are rate-limited (3 requests / 15 minutes per IP).
- Never log payment signatures, secrets, or full donor PII.

### Data & Privacy

- Form submissions (contact, support, job applications) are validated and sanitized.
- Email HTML templates escape user input to prevent injection.
- Resume uploads are limited to PDF/DOC/DOCX and 5 MB.

### HTTP Security Headers

Production responses include:

- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`
- `Permissions-Policy`

### Database Initialization

`POST /api/admin/init-database` requires a valid admin API key. The `GET` handler is disabled in production.

## Before Making the Repository Public

1. Rotate all credentials that may have been exposed during development.
2. Confirm `.env.local` is gitignored and not in git history.
3. Set a strong `ADMIN_API_KEY` (32+ random characters).
4. Use Razorpay **test** keys for staging; **live** keys only in production.
5. Run `npm audit` and address high-severity dependency issues.
6. Restrict admin dashboard access (IP allowlist, VPN, or basic auth at the reverse proxy).

## Dependency Audits

```bash
npm audit
npm audit fix
```

Review breaking changes before applying major version bumps.
