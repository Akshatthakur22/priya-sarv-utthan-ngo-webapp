<div align="center">

# 🌟 Priya Sarv Utthan Seva Sansthan

### Empowering Communities, Building Futures

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**A modern, responsive web platform for a 27-year-old NGO dedicated to women and child development in Indore, Madhya Pradesh**

[Live Demo](#) · [Report Bug](https://github.com/Akshatthakur22/priya-sarv-utthan-ngo-webapp/issues) · [Request Feature](https://github.com/Akshatthakur22/priya-sarv-utthan-ngo-webapp/issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Live Preview](#-live-preview)
- [Project Structure](#-project-structure)
- [API Routes](#-api-routes)
- [Design System](#-design-system)
- [Performance](#-performance)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 About the Project

This is a full-stack web application built for **Priya Sarv Utthan Seva Sansthan**, an NGO established in 1999 with over 27 years of service in Gandhi Nagar, Indore. The platform serves as a digital presence to showcase their impactful work in:

- 👩‍👧 Women & Child Development
- 📚 Education & Literacy Programs
- 💪 Women Empowerment
- ⚖️ Social Justice & Legal Services
- 🛠️ Skill Training & Self-Employment

### Why This Project?

NGOs often struggle with digital presence and online donation collection. This project solves that by providing:

- ✅ **Mobile-first responsive design** for accessibility across devices
- ✅ **Bilingual support** (English & Hindi) for local community reach
- ✅ **Production-grade payment system** with Razorpay integration (Phase 3)
- ✅ **PostgreSQL database** for donation persistence (Phase 3)
- ✅ **Email receipt system** for donor confirmations (Phase 3)
- ✅ **Automatic retry logic** for payment verification (Phase 3)
- ✅ **Secure input validation** to prevent fraud and attacks (Phase 3)
- ✅ **Comprehensive logging** for debugging in production (Phase 3)
- ✅ **Donation integration** with Razorpay payment gateway
- ✅ **Career portal** for volunteer and job applications
- ✅ **Contact forms** with validation for community engagement
- ✅ **SEO optimization** for better discoverability

---

## ✨ Key Features

### 🎨 User Experience
- **Animated UI** with Framer Motion for smooth, engaging interactions
- **Floating Donate Button** for easy access to donation page
- **Responsive Navigation** with mobile-friendly hamburger menu
- **Impact Metrics Display** showcasing 27 years of service
- **Bilingual Content** with Hindi translations for cultural connection

### 🏗️ Technical Excellence
- **Server-Side Rendering** for optimal performance and SEO
- **Type-Safe Development** with TypeScript across the entire codebase
- **API Routes** with proper request validation and error handling
- **Modular Architecture** with clear separation of concerns
- **Custom Design System** with semantic color tokens and reusable components

### 📱 Pages Implemented
- **Home** - Hero section, impact highlights, and organizational values
- **About** - Mission, vision, and 27-year history
- **Programs** - 7+ focus areas with detailed descriptions
- **Donate** - Razorpay integration with preset and custom donation amounts
- **Careers** - Job listings and application forms
- **Events** - Community events and activities
- **Contact** - Form with email integration (mock)

---

## � Phase 3: Production Payment System (Latest)

### What's New in Phase 3 ✨

This version includes a **complete, production-grade payment system** with enterprise-level reliability, security, and user experience:

#### 💾 Database Integration
- PostgreSQL database via [Neon.tech](https://neon.tech/) for reliable data persistence
- Connection pooling for optimal performance
- Automatic schema initialization
- ACID compliance for transaction safety

#### 🔐 Security & Validation
- HMAC SHA256 signature verification (fraud prevention)
- Input sanitization to prevent XSS attacks
- SQL injection prevention with parameterized queries
- Zod schema validation for all inputs
- Payment ID uniqueness constraints

#### ⚡ Reliability & Retry Logic
- Automatic 3-attempt verification retry
- 2-second delays between retries
- Distinguishes temporary vs permanent failures
- Prevents false "Payment Failed" messages
- Non-blocking email (doesn't fail donation if email service down)

#### 📧 Email Receipts
- Professional HTML donation receipt templates
- Tax benefit information (Section 80G)
- Automatic email sending via Gmail SMTP
- Fallback handling if email service unavailable

#### 🎯 Better User Experience
- Progress indicators during payment verification
- Contextual error messages (specific to what went wrong)
- Prevents double-charging via unique constraints
- Payment cancellation detection
- Razorpay failure event handling

#### 📊 Comprehensive Logging
- Context-aware logging with `[PAYMENT]` prefix
- Order ID, Payment ID in all logs
- Error tracking for debugging
- Non-intrusive (uses console.log, no external logging service required)

### Setup & Configuration

**Quick Start:** See [QUICK_START_PHASE3.md](./QUICK_START_PHASE3.md)

**Detailed Setup:** See [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md)

**Technical Docs:** See [PAYMENT_SYSTEM_PHASE3.md](./PAYMENT_SYSTEM_PHASE3.md)

### Required Environment Variables

```env
# Database (PostgreSQL via Neon)
DATABASE_URL=postgresql://...

# Razorpay (Payment Gateway)
NEXT_PUBLIC_RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...

# Email (Gmail SMTP - Optional but recommended)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=...
EMAIL_APP_PASSWORD=...
```

### Key Files Added/Updated

| File | Status | Changes |
|------|--------|---------|
| `src/lib/database.ts` | ✨ NEW | Connection pooling, schema management |
| `src/lib/email.ts` | ✨ NEW | Email service, receipt templates |
| `src/services/payment.service.ts` | 🔄 UPDATED | Real database integration |
| `src/app/api/razorpay/order/route.ts` | 🔄 UPDATED | Input validation, sanitization |
| `src/app/api/razorpay/verify/route.ts` | 🔄 UPDATED | Email sending, error handling |
| `src/app/donate/DonateClient.tsx` | 🔄 UPDATED | Retry logic, failure handlers |
| `src/lib/env.ts` | 🔄 UPDATED | Database & email env vars |

---

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Icon library

### Backend & Database (Phase 3)
- **[Razorpay](https://razorpay.com/)** - Payment gateway with HMAC signature verification
- **[PostgreSQL](https://www.postgresql.org/)** - Neon.tech serverless database
- **[pg](https://node-postgres.com/)** - PostgreSQL client with connection pooling
- **[Nodemailer](https://nodemailer.com/)** - Email service for donation receipts

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Architecture Patterns
- **Server Components** - Default for performance
- **Client Components** - Used strategically for interactivity
- **API Routes** - RESTful endpoints for form submissions
- **Service Layer** - Business logic separation
- **Type Definitions** - Centralized in `src/types`

---

## 🚀 Live Preview

🌐 **[View Live Website](#)** _(Add your deployment link here)_

### Development Details

**Built With:**
- Next.js 14 App Router for optimal performance
- TypeScript for type-safe development
- Tailwind CSS with custom design system
- Framer Motion for smooth animations
- Deployed on [Vercel/Platform Name]

**Build Process:**
- Automated CI/CD pipeline
- TypeScript compilation with strict mode
- ESLint & Prettier for code quality
- Optimized production build

---

## 📁 Project Structure

```
priya-sarv-utthan-ngo-webapp/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/             # About page
│   │   ├── api/               # API routes
│   │   │   ├── contact/       # Contact form handler
│   │   │   ├── donate/        # Donation handler
│   │   │   └── jobs/          # Job applications
│   │   ├── careers/           # Careers page
│   │   ├── contact/           # Contact page
│   │   ├── donate/            # Donation page
│   │   ├── events/            # Events page
│   │   ├── programs/          # Programs page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   │
│   ├── components/
│   │   ├── forms/             # Form components
│   │   │   ├── ContactForm.tsx
│   │   │   └── JobApplicationForm.tsx
│   │   ├── layout/            # Layout components
│   │   │   ├── FloatingDonate.tsx
│   │   │   ├── SiteFooter.tsx
│   │   │   ├── SiteHeader.tsx
│   │   │   └── SoftDecor.tsx
│   │   ├── sections/          # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── ImpactHighlights.tsx
│   │   │   └── WorkInAction.tsx
│   │   └── ui/                # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── Textarea.tsx
│   │
│   ├── lib/                   # Core utilities
│   │   ├── config.ts          # Site configuration
│   │   ├── db.ts              # Database mock
│   │   ├── mail.ts            # Email service mock
│   │   ├── razorpay.ts        # Razorpay config & types
│   │   ├── seo-utils.ts       # SEO utilities
│   │   ├── logger.ts          # Logging utility
│   │   ├── rate-limit.ts      # Rate limiting
│   │   └── validation.ts      # Form validation
│   │
│   ├── services/              # Business logic layer
│   │   ├── contact.service.ts
│   │   ├── payment.service.ts # Payment processing & verification
│   │   ├── event.service.ts
│   │   └── job.service.ts
│   │
│   ├── types/                 # TypeScript definitions
│   │   └── index.ts
│   │
│   └── utils/                 # Helper functions
│       └── validators.ts      # Form validation
│
├── public/                    # Static assets
│   └── images/               # Image files
│
└── Configuration files
    ├── next.config.mjs       # Next.js config
    ├── tailwind.config.ts    # Tailwind config
    ├── tsconfig.json         # TypeScript config
    └── package.json          # Dependencies
```

---

## 🔌 API Routes

### Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

### Razorpay Donation - Create Order
```http
POST /api/razorpay/order
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "amount": "number (₹50-₹1,00,000)",
  "message": "string (optional)"
}

Response:
{
  "success": true,
  "orderId": "string",
  "amount": "number (in paise)",
  "currency": "INR",
  "reference": "string",
  "keyId": "string"
}
```

### Razorpay Donation - Verify Payment
```http
POST /api/razorpay/verify
Content-Type: application/json

{
  "razorpay_order_id": "string",
  "razorpay_payment_id": "string",
  "razorpay_signature": "string"
}

Response:
{
  "success": true,
  "orderId": "string",
  "paymentId": "string",
  "message": "Payment verified and recorded successfully",
  "recordId": "string"
}
```

### Job Applications
```http
GET /api/jobs
# Returns list of open positions

POST /api/jobs
Content-Type: application/json

{
  "applicant": "string",
  "email": "string",
  "jobId": "string",
  "coverLetter": "string (optional)"
}
```

---

## 🎨 Design System

### Color Palette

The custom Tailwind configuration implements a warm, hopeful NGO palette:

- **Primary (Amber)** - Inviting CTAs and important actions
- **Accent (Coral/Peach)** - Friendly highlights and secondary elements
- **Support (Green/Blue)** - Trust indicators and informational content
- **Neutral** - Text hierarchy and backgrounds

### Typography

- **Display Font**: Nunito (headings, hero text)
- **Body Font**: Inter (readable, professional)

### Components

All UI components follow consistent patterns:
- Rounded corners (`rounded-full`, `rounded-2xl`)
- Hover states with transitions
- Mobile-first responsive design
- Accessible contrast ratios

---

## ⚡ Performance

### Optimization Strategies

✅ **Image Optimization** - Next.js Image component with automatic WebP conversion  
✅ **Code Splitting** - Automatic with Next.js App Router  
✅ **Server Components** - Reduced JavaScript bundle size  
✅ **Font Optimization** - Preloaded custom fonts  
✅ **SEO Ready** - Semantic HTML and meta tags  

### Lighthouse Scores (Target)

- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📞 Contact

**Akshat Thakur**

- GitHub: [@Akshatthakur22](https://github.com/Akshatthakur22)
- Project Link: [https://github.com/Akshatthakur22/priya-sarv-utthan-ngo-webapp](https://github.com/Akshatthakur22/priya-sarv-utthan-ngo-webapp)

**Priya Sarv Utthan Seva Sansthan**

- Email: priyasarvuthan@gmail.com
- Phone: +91 70000 78439
- Address: 69B, Mangal Marg, Gandhi Nagar, Indore, Madhya Pradesh – 452005

---

<div align="center">

### 🌟 If this project helped you, please give it a star!

Made with ❤️ for social impact | Established 1999 | 27 Years of Service

</div>
