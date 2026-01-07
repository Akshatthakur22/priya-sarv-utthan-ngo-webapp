# NGO Web MVP

Full-stack Next.js (App Router) MVP for a long-running NGO. Mobile-first, Tailwind-styled, with public pages, admin area, and mock backend services.

# NGO Web MVP

Content-first Next.js (App Router) site for a long-running NGO. Mobile-first, Tailwind styled, with simple public pages and mocked backend services.

## Tech
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Server Components by default; Client Components only where interactivity is needed

## Getting Started
1. Install dependencies: `npm install`
2. Run dev server: `npm run dev`
3. Open http://localhost:3000

## Forms & API
- Contact: `POST /api/contact`
- Donate (mock): `POST /api/donate`
- Jobs: `GET /api/jobs` (list open roles), `POST /api/jobs` (submit interest)

## Notes
- Business logic is in `src/services`, `src/lib`, and `src/utils`, not in page components.
- Payment and mail are mocked for the MVP.
