# Tuma SaaS starter

A Next.js App Router starter with TypeScript, Tailwind CSS, PostgreSQL, password authentication, signed cookie sessions, basic RBAC, and audit logging.

## Requirements

- Node.js 22.18+ (or a supported newer LTS)
- PostgreSQL 14+
- `psql` available on your path for the schema setup command

## Setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL` and a random `SESSION_SECRET` of at least 32 characters.
2. Create the database named in `DATABASE_URL`.
3. Install dependencies with `npm install`.
4. Apply the starter schema with `npm run db:init`.
5. Start the app with `npm run dev`.

The first account is a standard user. To grant platform admin access, promote an account explicitly in a trusted database session:

```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

Have that user sign in again after promotion so their session receives the updated role.

## Auth routes

- `POST /api/auth/register` creates a user and starts a session.
- `POST /api/auth/login` verifies credentials and starts a session.
- `POST /api/auth/logout` clears the session.
- `GET /api/auth/session` returns the current safe user profile.

The browser form endpoints redirect on success and return JSON errors on failure. The signed session cookie is HTTP-only, SameSite=Lax, and Secure in production. Protected pages re-check the session and current user role on the server; `proxy.ts` provides fast route redirects only.

## Project layout

```text
db/schema.sql               PostgreSQL schema for users and audit logs
src/app/                    App Router pages and auth route handlers
src/components/             Shared UI components
src/lib/                    Database, auth, sessions, audit, env validation
proxy.ts                    Optimistic dashboard/admin route gate
```

## Production hardening

This is a foundation, not a complete identity platform. Before production, add rate limiting and abuse monitoring, email verification and password reset flows, session revocation/rotation, CSRF protections appropriate to your deployment, operational secret management, migrations, and a tested account recovery process. Never expose the admin role through public registration or client-controlled input.
