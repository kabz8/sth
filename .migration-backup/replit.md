# Studio Hub Architects

A world-class architecture firm website for Studio Hub Architects (Nairobi, Kenya) — marketing site, admin dashboard, and client portal.

## Run & Operate

- `pnpm --filter @workspace/studio-hub run dev` — run the frontend (port auto-assigned)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Framer Motion, Tailwind CSS, wouter routing
- API: Express 5, Drizzle ORM, PostgreSQL
- Validation: Zod (zod/v4), drizzle-zod
- API codegen: Orval (from OpenAPI spec in lib/api-spec/openapi.yaml)
- Build: esbuild (CJS bundle)

## Brand

- Primary teal: #3ECAC8
- Coral accent: #EF725D
- Near-black: #1E1E1E
- Off-white: #F8F8F8
- Fonts: Syne (display), Inter (body)

## Where things live

- `artifacts/studio-hub/src/` — React frontend (pages, components, routes)
- `artifacts/api-server/src/routes/` — Express route handlers (one file per domain)
- `lib/api-spec/openapi.yaml` — Source of truth for all API contracts
- `lib/db/src/schema/` — Drizzle table definitions (one file per entity)
- `lib/api-client-react/src/generated/` — Generated React Query hooks (do not edit)
- `lib/api-zod/src/generated/` — Generated Zod validation schemas (do not edit)

## Architecture decisions

- Frontend-only auth is mocked (no full auth system built in first version) — admin/portal pages are accessible without login by design for the MVP
- All arrays (images, materials, etc.) stored as PostgreSQL text arrays via Drizzle
- Analytics summary is computed live from DB count queries — no separate analytics table
- Settings are stored as key-value pairs in the `settings` table for admin configurability

## Product

- **Public marketing site**: Full-screen hero, project portfolio with category filtering, services, team, testimonials, blog, careers, contact form, consultation booking, FAQ, WhatsApp floating button
- **Admin dashboard** (`/admin/*`): Projects, clients, blog, team, testimonials, careers, messages, appointments, settings, analytics overview
- **Client portal** (`/portal/*`): Project milestone tracker, documents, messages

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- After any OpenAPI spec change: run `pnpm --filter @workspace/api-spec run codegen` before touching frontend code
- Express 5: wildcard routes use `/{*splat}`, not `*`. Optional params use `/thing{/:id}`.
- `req.params.id` is `string | string[]` in Express 5 — always parse with `parseInt`
- Never use `console.log` in server code — use `req.log` (in handlers) or `logger` (outside)
- PostgreSQL arrays in Drizzle: defined as `text("col").array().notNull().default([])`
