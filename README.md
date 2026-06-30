<div align="center">

# Siftara

**Learn from the best free courses without getting lost.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>

---

Siftara curates high-quality free learning content and transforms it into structured, AI-guided paths with roadmaps, quizzes, progress tracking, and free certificates.

## Features

- **Curated Learning Paths** — Human-curated courses from YouTube and free resources
- **AI-Powered My Sift** — Paste any YouTube playlist and AI turns it into a structured course
- **Visual Roadmaps** — Interactive learning paths with clear milestones
- **Quizzes & Assessments** — MCQ quizzes with scoring and pass/fail feedback
- **Free Certificates** — Verified, shareable certificates after completing learning paths
- **Progress Tracking** — Track lessons, quizzes, streaks, and course completion
- **Dark/Light Theme** — System preference detection with manual toggle
- **Mega Menu** — Navigate categories and features with a polished dropdown
- **Responsive Design** — Mobile-first layout with sheet navigation
- **Admin Panel** — Course builder, AI generation, and agent status monitoring

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui + Lucide Icons |
| Animations | Framer Motion |
| Auth | Clerk (Google OAuth) |
| Database | Cloudflare D1 + Drizzle ORM |
| AI | Cloudflare Workers AI + OpenRouter |
| Icons | Lucide + Simple Icons |
| Deployment | Cloudflare Pages |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A [Clerk](https://clerk.com) account (for authentication)

### Installation

```bash
# Clone the repository
git clone https://github.com/rixabhh/siftara.git
cd siftara

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Clerk keys
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | Yes |
| `CLERK_WEBHOOK_SECRET` | Clerk webhook secret | Yes |
| `CERTIFICATE_SIGNING_SECRET` | Certificate signing secret (32+ chars) | Yes |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Sign-in page URL | No |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Sign-up page URL | No |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Redirect after sign-in | No |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | Redirect after sign-up | No |

## Project Structure

```
siftara/
├── src/
│   ├── app/
│   │   ├── (marketing)/     # Landing page
│   │   ├── (auth)/          # Sign-in, Sign-up
│   │   ├── (dashboard)/     # Dashboard, Courses, Learn, My Sift, Certificates
│   │   ├── (admin)/         # Admin panel
│   │   ├── (public)/        # Certificate verification
│   │   ├── api/             # API routes
│   │   └── icon*/           # Favicon routes
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── animations/      # Framer Motion wrappers
│   │   ├── certificate/     # Certificate card
│   │   ├── my-sift/         # Sift Check, Goal Interview
│   │   ├── quiz/            # Quiz player
│   │   ├── mega-menu.tsx    # Navigation mega menu
│   │   ├── navbar.tsx       # Top navigation
│   │   └── footer.tsx       # Footer
│   └── lib/
│       ├── db/              # Schema, seed data, connection
│       ├── types.ts         # TypeScript types
│       └── utils.ts         # Utility functions
├── public/                  # Static assets
├── drizzle.config.ts        # Drizzle ORM config
└── components.json          # shadcn/ui config
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, FAQ |
| `/courses` | Course library with filters |
| `/courses/[slug]` | Course detail with modules |
| `/learn/[courseId]` | Learning player with video + roadmap |
| `/my-sift` | AI-powered course generation |
| `/dashboard` | User dashboard with progress |
| `/certificates` | User certificates |
| `/certificates/verify/[code]` | Public certificate verification |
| `/how-verification-works` | How Siftara verifies learning |
| `/terms` | Terms of service |
| `/privacy` | Privacy policy |
| `/admin` | Admin panel |
| `/sign-in` | Clerk sign-in |
| `/sign-up` | Clerk sign-up |

## Seed Data

The project includes 5 curated courses for demonstration:

1. **React Mastery** — Build modern web apps with React
2. **Python Fundamentals** — Learn Python from scratch
3. **UI Design Essentials** — Master UI design principles
4. **AI Tools for Developers** — Leverage AI in development
5. **TypeScript Deep Dive** — Advanced TypeScript patterns

## License

MIT
