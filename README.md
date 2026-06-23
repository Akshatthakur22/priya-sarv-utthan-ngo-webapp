<div align="center">

# Priya Sarv Utthan Seva Sansthan

**A full-stack NGO web platform for donations, community support, careers, and organizational outreach — built with Next.js and PostgreSQL.**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js)](https://nodejs.org/)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)](https://priyasarvutthan.org)
[![Live](https://img.shields.io/badge/Live-priyasarvutthan.org-orange)](https://priyasarvutthan.org)

[Live Website](https://priyasarvutthan.org) · [Report Issue](https://github.com/Akshatthakur22/priya-sarv-utthan-ngo-webapp/issues)

</div>

---

## Overview

This is a production web application built for **Priya Sarv Utthan Seva Sansthan**, a registered NGO in Indore, Madhya Pradesh. The platform gives the organization a modern digital presence for outreach, online donations, volunteer recruitment, and community support intake.

**Problem it solves:** Many NGOs lack reliable infrastructure for accepting online donations, managing inbound requests, and presenting their work professionally. This project consolidates those needs into a single, maintainable application.

**Built for:**
- Community members seeking help, legal aid, or welfare support
- Donors contributing via Razorpay
- Volunteers and applicants exploring career opportunities
- NGO staff reviewing submissions through a protected admin dashboard

**Developer:** Designed and implemented as a portfolio-grade full-stack project demonstrating real-world API design, payment integration, data persistence, and security-conscious engineering.

---

## Key Features

### Donations & Payments

- Razorpay checkout integration with server-side order creation
- HMAC-SHA256 payment signature verification with timing-safe comparison
- Order amount cross-checked against captured payment before recording
- Webhook handler as a redundant recording path (`payment.captured`, `payment.failed`)
- Client-side verification retry logic (up to 3 attempts)
- Donation persistence in PostgreSQL with idempotent `payment_id` constraints
- HTML donation receipt emails via Gmail SMTP (Section 80G messaging)
- Rate limiting on donation endpoints (3 requests / 15 minutes per IP)

### Admin Dashboard

- Protected `/admin` portal with API key authentication
- Session verification via `/api/admin/session` before unlocking the UI
- Tabbed dashboard for donations, contacts, job applications, and support cases
- Search, date/amount filters, and sorting on donation records
- Resume download for job applications (admin-only)
- Timing-safe API key comparison and per-route rate limiting

### Job Portal & Applications

- Public careers page with structured JobPosting schema (Google Search Console–compatible)
- Job listings served from PostgreSQL with in-memory fallback
- Application form with Zod validation and optional resume upload
- Drag-and-drop resume dropzone (PDF, DOC, DOCX — max 5 MB)
- Multipart `form-data` API support with server-side file validation
- Admin email notifications on new applications

### Support & Community Intake

- Multi-channel help system: Legal Aid, Grievance, and Welfare
- Dedicated intake pages under `/help/legal`, `/help/complaint`, `/help/welfare`
- Unique case ID generation (e.g. `#PSU-XXXX`)
- Conditional form fields based on service type (opposing party, court deadline, department)
- HTML email alerts to staff with escaped user input
- PostgreSQL persistence for all support cases

### Contact & Engagement

- Contact form with validation, sanitization, and rate limiting
- Email notifications and database storage
- Floating help widget and donate CTA across pages
- Events gallery with structured Event schema (ISO 8601 dates)

### Security

- Environment-based secrets (no credentials in source)
- Zod schemas for all form and API inputs
- Parameterized SQL queries via `pg`
- HTML escaping for outbound emails (`escape-html.ts`)
- Security headers: CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy
- In-memory IP rate limiting on public and admin routes
- Safe JSON-LD serialization to prevent script breakout in inline schemas
- Razorpay client/server module split (no secrets in client bundle)

### SEO & Content

- Per-page metadata, Open Graph, and Twitter cards
- JSON-LD structured data (Organization, Event, JobPosting, FAQ, BreadcrumbList)
- Auto-generated `sitemap.xml` and `robots.txt`
- Canonical URLs via `seo-utils.ts`
- English-first UI with Hindi content on key pages (founder, events, privacy, terms)

### Performance

- Next.js App Router with Server Components by default
- `next/image` with AVIF/WebP formats and responsive device sizes
- Google Fonts (`Nunito`, `Inter`) loaded with `display: swap`
- Vercel Analytics integration
- Code splitting via Next.js automatic bundling

---

## Screenshots

| Home | Donate |
|:---:|:---:|
| ![Home](docs/screenshots/home.png) | ![Donation](docs/screenshots/donation.png) |

| Events | Careers |
|:---:|:---:|
| ![Events](docs/screenshots/event_page.png) | ![Careers](docs/screenshots/career.png) |

| Legal Aid | Donate (Mobile) |
|:---:|:---:|
| ![Legal Aid](docs/screenshots/legal_help.png) | ![Donate Mobile](docs/screenshots/donation_mobile.png) |

| About |
|:---:|
| ![About](docs/screenshots/about.png) |

---

## Live Demo

| Resource | URL |
|----------|-----|
| **Website** | [https://priyasarvutthan.org](https://priyasarvutthan.org) |
| **Donate** | [https://priyasarvutthan.org/donate](https://priyasarvutthan.org/donate) |
| **Careers** | [https://priyasarvutthan.org/careers](https://priyasarvutthan.org/careers) |
| **Help & Support** | [https://priyasarvutthan.org/help](https://priyasarvutthan.org/help) |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16 (App Router), React 18, TypeScript |
| **Styling** | Tailwind CSS 3.4, Framer Motion, Lucide React |
| **Forms** | React Hook Form, Zod 4, `@hookform/resolvers` |
| **Backend** | Next.js API Routes (Route Handlers) |
| **Database** | PostgreSQL via Neon (`pg` connection pool) |
| **Payments** | Razorpay (REST API + Checkout + Webhooks) |
| **Email** | Nodemailer (Gmail SMTP) |
| **Authentication** | API key (`ADMIN_API_KEY`) with timing-safe verification |
| **Validation** | Zod schemas, input sanitization utilities |
| **Security** | CSP headers, rate limiting, HMAC verification, HTML escaping |
| **Analytics** | Vercel Analytics |
| **Developer Tools** | ESLint, Prettier, TypeScript |

---

## Architecture

The application follows a layered architecture: **pages and components** handle UI, **API routes** handle HTTP, **services** encapsulate business logic, and **lib** provides shared infrastructure.

```mermaid
flowchart TB
    subgraph Client
        Pages[App Router Pages]
        Components[React Components]
        AdminUI[Admin Dashboard]
    end

    subgraph API["Next.js API Routes"]
        Contact[/api/contact]
        Support[/api/support]
        Jobs[/api/jobs]
        Razorpay[/api/razorpay/*]
        Admin[/api/admin/*]
    end

    subgraph Services
        PaymentSvc[payment.service]
        JobSvc[job.service]
        ContactSvc[contact.service]
        EventSvc[event.service]
    end

    subgraph Infrastructure
        DB[(PostgreSQL / Neon)]
        Email[Nodemailer SMTP]
        RazorpayAPI[Razorpay API]
    end

    Pages --> API
    Components --> API
    AdminUI --> Admin

    Contact --> ContactSvc
    Support --> DB
    Support --> Email
    Jobs --> JobSvc
    Razorpay --> PaymentSvc
    Admin --> DB
    Admin --> JobSvc

    PaymentSvc --> DB
    PaymentSvc --> RazorpayAPI
    PaymentSvc --> Email
    JobSvc --> DB
    ContactSvc --> DB
    ContactSvc --> Email
    EventSvc --> DB
```

| Layer | Responsibility |
|-------|----------------|
| **Frontend** | Server and Client Components, forms, animations, admin UI |
| **API Routes** | Request validation, rate limiting, auth checks, HTTP responses |
| **Services** | Payment verification, job applications, contact handling, events |
| **Database** | Donations, contacts, applications, support cases, jobs, events |
| **Storage** | Resume files stored as `BYTEA` in PostgreSQL |
| **External** | Razorpay (payments), Gmail SMTP (notifications & receipts) |

---

## Folder Structure

```text
priya-sarv-utthan-ngo-webapp/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # REST API route handlers
│   │   │   ├── admin/            # Protected admin endpoints
│   │   │   ├── contact/          # Contact form
│   │   │   ├── events/           # Events data
│   │   │   ├── jobs/             # Job listings & applications
│   │   │   ├── razorpay/         # Order, verify, webhook
│   │   │   └── support/          # Support case intake
│   │   ├── admin/                # Admin dashboard (client)
│   │   ├── careers/              # Job portal
│   │   ├── donate/               # Donation flow
│   │   ├── help/                 # Legal, grievance, welfare intake
│   │   ├── events/               # Community events
│   │   ├── contact/              # Contact page
│   │   ├── about/                # Organization story
│   │   ├── founder/              # Founder profile
│   │   ├── team/                 # Team page
│   │   ├── layout.tsx            # Root layout
│   │   ├── sitemap.ts            # Dynamic sitemap
│   │   └── robots.ts             # Robots.txt
│   │
│   ├── components/
│   │   ├── forms/                # Contact, job application, resume dropzone
│   │   ├── layout/               # Header, footer, floating donate
│   │   ├── sections/             # Hero, impact, gallery sections
│   │   ├── events/               # Event gallery components
│   │   ├── help/                 # Floating help widget
│   │   └── ui/                   # Button, Input, Textarea, Skeleton
│   │
│   ├── services/                 # Business logic layer
│   │   ├── payment.service.ts
│   │   ├── job.service.ts
│   │   ├── contact.service.ts
│   │   └── event.service.ts
│   │
│   ├── lib/                      # Shared infrastructure
│   │   ├── database.ts           # PostgreSQL pool & schema
│   │   ├── email.ts              # SMTP & HTML templates
│   │   ├── validation.ts         # Zod schemas & rate limit config
│   │   ├── rate-limit.ts         # IP-based rate limiter
│   │   ├── admin-auth.ts         # Timing-safe admin key verification
│   │   ├── razorpay.ts           # Server-side Razorpay config
│   │   ├── razorpay-client.ts    # Client-safe payment types
│   │   ├── schema-utils.ts       # JSON-LD generators
│   │   ├── seo-utils.ts          # Canonical URLs, breadcrumbs
│   │   ├── escape-html.ts        # Email HTML escaping
│   │   └── safe-json-ld.ts       # Safe inline JSON-LD serialization
│   │
│   └── types/                    # Shared TypeScript types
│
├── public/                       # Static assets & images
├── docs/screenshots/             # README screenshots
├── .env.example                  # Environment variable template
├── SECURITY.md                   # Security policy
├── next.config.mjs               # Next.js + security headers
└── package.json
```

---

## Installation

### Prerequisites

- Node.js 18+
- npm
- PostgreSQL database ([Neon](https://neon.tech) recommended)
- Razorpay account (test or live keys)
- Gmail account with App Password (for email notifications)

### Setup

```bash
# Clone the repository
git clone https://github.com/Akshatthakur22/priya-sarv-utthan-ngo-webapp.git
cd priya-sarv-utthan-ngo-webapp

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your credentials (see Environment Variables below)

# Initialize database schema (one-time, requires ADMIN_API_KEY)
curl -X POST http://localhost:3000/api/admin/init-database \
  -H "x-admin-key: YOUR_ADMIN_API_KEY"

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build & Production

```bash
# Lint
npm run lint

# Production build
npm run build

# Start production server
npm start
```

<details>
<summary><strong>Deployment notes</strong></summary>

- Set all required environment variables in your hosting provider (Vercel recommended).
- Run database initialization once after first deploy.
- Configure `RAZORPAY_WEBHOOK_SECRET` in Razorpay dashboard and your environment for webhook signature verification.
- Point `NEXT_PUBLIC_APP_URL` to your production domain.

</details>

---

## Environment Variables

Copy `.env.example` to `.env.local`. Never commit real values.

| Variable | Purpose | Required | Example |
|----------|---------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Yes | `postgresql://user:pass@host/db?sslmode=require` |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay public key (client) | Yes | `rzp_test_...` |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key (server only) | Yes | `your_razorpay_secret` |
| `RAZORPAY_WEBHOOK_SECRET` | Webhook signature verification | Recommended | `whsec_...` |
| `EMAIL_HOST` | SMTP host | Yes | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP port | Yes | `587` |
| `EMAIL_SECURE` | Use TLS | Yes | `false` |
| `EMAIL_USER` | SMTP username | Yes | `your-email@gmail.com` |
| `EMAIL_APP_PASSWORD` | Gmail App Password | Yes | `your-app-password` |
| `EMAIL_FROM` | Sender address | Yes | `your-email@gmail.com` |
| `NOTIFY_EMAIL` | Admin notification inbox | No | `your-email@gmail.com` |
| `ADMIN_API_KEY` | Admin dashboard & API auth | Yes | `random-32-byte-string` |
| `NEXT_PUBLIC_APP_URL` | Public site URL | Yes | `https://priyasarvutthan.org` |
| `NODE_ENV` | Runtime environment | Yes | `production` |
| `TOGETHER_API_KEY` | Optional AI integration | No | `your_key` |

> `ADMIN_JWT_SECRET` appears in `.env.example` but is not currently used by the application. Admin access is API-key based.

---

## Security

| Control | Implementation |
|---------|----------------|
| **Secrets** | All credentials in environment variables; `.env.local` gitignored |
| **Input validation** | Zod schemas on every public API route |
| **SQL injection** | Parameterized queries via `pg` |
| **Authentication** | Admin routes require `x-admin-key` header; timing-safe key comparison |
| **Rate limiting** | Per-IP limits on contact, support, jobs, donations, and admin routes |
| **Payment verification** | HMAC-SHA256 with timing-safe compare; order amount validated against payment |
| **HTTP headers** | CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy |
| **Email safety** | HTML escaping and header injection prevention on support emails |
| **Data protection** | Resumes stored server-side; admin-only download endpoint |

See [SECURITY.md](SECURITY.md) for the full security policy and pre-public checklist.

---

## Performance

Optimizations present in the codebase:

| Optimization | Location |
|--------------|----------|
| Server Components by default | `src/app/**/page.tsx` |
| Image formats AVIF + WebP | `next.config.mjs` |
| Responsive image device sizes | `next.config.mjs` |
| Font `display: swap` | `src/app/layout.tsx` |
| Connection pooling (`max: 20`) | `src/lib/database.ts` |
| Client/server code splitting | Razorpay secrets isolated in `razorpay.ts` |
| Non-blocking email on donations | `src/app/api/razorpay/verify/route.ts` |

---

## API Overview

<details>
<summary><strong>Public endpoints</strong></summary>

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/contact` | Submit contact form |
| `POST` | `/api/support` | Submit support case (Legal / Grievance / Welfare) |
| `GET` | `/api/jobs` | List open job positions |
| `POST` | `/api/jobs` | Submit job application (JSON or multipart with resume) |
| `GET` | `/api/events` | Fetch events data |
| `POST` | `/api/razorpay/order` | Create Razorpay payment order |
| `POST` | `/api/razorpay/verify` | Verify payment signature & record donation |
| `POST` | `/api/razorpay/webhook` | Razorpay webhook events |

</details>

<details>
<summary><strong>Admin endpoints</strong> *(require <code>x-admin-key</code> header)*</summary>

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/admin/session` | Verify admin API key |
| `GET` | `/api/admin/donations` | List completed donations |
| `GET` | `/api/admin/contacts` | List contact submissions |
| `GET` | `/api/admin/applications` | List job applications |
| `GET` | `/api/admin/applications/[id]/resume` | Download applicant resume |
| `GET` | `/api/admin/support-cases` | List support cases |
| `POST` | `/api/admin/init-database` | Initialize database schema |

</details>

---

## Project Highlights

**Service layer separation** — Business logic lives in `src/services/`, keeping API routes thin and testable. Payment verification, database writes, and email sending are orchestrated in one place rather than scattered across route handlers.

**Defense in depth for payments** — Donations are verified client-side (with retries), server-side (signature + amount check), and again via Razorpay webhooks. Idempotent `payment_id` constraints prevent duplicate records.

**Pragmatic admin auth** — Rather than a heavy auth framework, admin access uses a cryptographically random API key with timing-safe comparison, session verification, and rate limiting. Appropriate for a small-team internal dashboard.

**Schema-driven SEO** — Structured data generators (`schema-utils.ts`) produce Google Search Console–compatible Event and JobPosting schemas with proper ISO 8601 dates, `validThrough`, and `baseSalary` fields.

**Multipart resume pipeline** — Job applications support optional file uploads with client-side validation, server-side MIME/extension checks, PostgreSQL `BYTEA` storage, and a separate admin download route.

---

## Challenges Solved

**Slug-based job IDs vs. UUID validation** — Job IDs use human-readable slugs (e.g. `job_volunteer_coach_indore_2026`), but the original Zod schema required UUIDs. Updated validation to accept slug-format IDs while keeping strict character constraints.

**Payment verification reliability** — Network failures during Razorpay verification could mark successful payments as failed. Implemented 3-attempt client retry with user-facing progress, plus a webhook fallback that records payments even if the verify endpoint fails.

**Secret leakage in client bundles** — Razorpay server config and logging utilities were importable from client components. Split into `razorpay.ts` (server) and `razorpay-client.ts` (client-safe types only).

**Email HTML injection** — Support case notifications embedded raw user input in HTML emails. Added `escape-html.ts` with sanitization across all template fields and email subject lines.

**Structured data rejections** — Google Search Console flagged missing `startDate` ISO format and incomplete JobPosting fields. Centralized schema generation with `toIso8601Date()` and complete required properties.

---

## Future Improvements

- HttpOnly cookie-based admin sessions (replace `sessionStorage` API key)
- Redis-backed rate limiting for multi-instance serverless deployments
- GitHub Actions CI (lint + build on pull requests)
- Dependency audit remediation (`npm audit`)
- Extend `serializeJsonLd()` to all JSON-LD pages
- Remove unused `razorpay` npm package (payments use direct `fetch`)
- Enable `strict: true` in TypeScript configuration

---

## License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## Developer

**Akshat Thakur**

Full-stack engineer — built this project end-to-end including frontend, API design, payment integration, database schema, admin tooling, and security hardening.

| | |
|---|---|
| GitHub | [@Akshatthakur22](https://github.com/Akshatthakur22) |
| LinkedIn | [linkedin.com/in/akshatthakur22](https://www.linkedin.com/in/akshatthakur22/) |
| Email | [akshatthakur22@gmail.com](mailto:akshatthakur22@gmail.com) |
| Repository | [priya-sarv-utthan-ngo-webapp](https://github.com/Akshatthakur22/priya-sarv-utthan-ngo-webapp) |

---

<div align="center">

Built for social impact · [priyasarvutthan.org](https://priyasarvutthan.org)

</div>
