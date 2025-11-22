# Applivio API (Hono Backend)

Backend API server for Applivio job application tracker.

## Tech Stack

- **Hono** - Fast web framework
- **Better Auth** - Authentication
- **Prisma** - Database ORM
- **TypeScript** - Type safety
- **PostgreSQL** (Neon) - Database

## Structure

```
src/
├── index.ts           # Main Hono app
├── middleware/
│   └── auth.ts       # Auth middleware
└── routes/
    ├── jobs.ts       # Job CRUD endpoints
    └── ai.ts         # AI parsing endpoints
```

## API Endpoints

### Auth
- `POST /api/auth/sign-in/email` - Login
- `POST /api/auth/sign-up/email` - Register
- `POST /api/auth/sign-out` - Logout
- `GET /api/auth/session` - Get session

### Jobs (Protected)
- `GET /api/jobs` - List all jobs
- `POST /api/jobs` - Create job
- `GET /api/jobs/:id` - Get job details
- `PATCH /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### AI (Protected)
- `POST /api/ai/parse` - Parse voice/text to job data
- `GET /api/ai/insights/:jobId` - Get AI insights

## Development

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Environment Variables

Create `.env` file (optional - uses db package env):

```env
PORT=4000
WEB_URL=http://localhost:3000
```

## Testing

```bash
# Health check
curl http://localhost:4000/

# Create job (requires auth)
curl -X POST http://localhost:4000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{"company":"Example","position":"Engineer","status":"APPLIED"}'
```

## Database Schema

Jobs are stored with:
- `company` - Company name
- `position` - Job title
- `status` - APPLIED | INTERVIEW | OFFER | REJECTED
- `notes` - Optional notes
- `events[]` - Timeline events

See `packages/db/prisma/schema.prisma` for full schema.

