# Deploy Studio Hub Architects to Vercel

This repository is prepared for a Git-based Vercel deployment:

- The React/Vite website builds to `artifacts/studio-hub/dist/public` when
  deploying from the repository root, or `dist/public` when the Vercel Root
  Directory is set to `artifacts/studio-hub`.
- `api/index.ts` exposes the existing Express API as a Vercel Function.
- `artifacts/studio-hub/api/index.ts` supports the current nested Vercel Root
  Directory configuration.
- `/api/*` remains available to the frontend and is excluded from the SPA rewrite.
- Project images in `artifacts/studio-hub/public/` are tracked in Git and copied into the production build.
- The PostgreSQL schema and API contracts are unchanged.

## 1. Push the repository

From the repository root:

```bash
git add api vercel.json VERCEL_DEPLOY.md artifacts/studio-hub/vite.config.ts artifacts/studio-hub/public pnpm-lock.yaml
git commit -m "Prepare Studio Hub for Vercel"
git push origin main
```

Do not add `.env` files, database passwords, or connection strings to Git.

## 2. Import the repository in Vercel

When creating the Vercel project:

1. Import the Git repository.
2. Keep the project root set to the repository root, or leave the current
   `artifacts/studio-hub` Root Directory selected. Both configurations are
   supported by the committed Vercel files.
3. Let the matching committed `vercel.json` provide the install command, build
   command, output directory, and SPA rewrite.
4. Use Node.js 20 or newer.

## 3. Add the database environment variable

Add this variable in Vercel for **Production**, **Preview**, and **Development** as needed:

```text
DATABASE_URL
```

The API reads this variable at runtime. To keep the current projects, testimonials,
contacts, settings, and other records, point it at the same PostgreSQL database
only if that database allows connections from Vercel.

If the current database is not externally reachable, migrate it once to a managed
PostgreSQL provider before switching the Vercel variable:

```bash
pg_dump "$DATABASE_URL" --format=custom --file=studio-hub-backup.dump
createdb "$NEW_DATABASE_URL"
pg_restore --no-owner --dbname="$NEW_DATABASE_URL" studio-hub-backup.dump
```

Run those commands from a trusted machine with the database connection variables
already set. Never paste the connection strings into chat or commit them.

Do not run `drizzle-kit push` against an empty destination before restoring the
backup if preserving the current data is the goal. The schema is already defined
in `lib/db/src/schema/`.

## 4. Confirm assets and data after the first deployment

Before changing or deleting the Replit project, verify:

- `/projects` shows the existing projects.
- A project detail page loads its gallery images.
- `/api/projects/featured` returns the existing featured projects.
- The contact form creates a row successfully.
- `/logo-icon.png` and each `/project-*.jpg` load.
- The admin pages still read and update the same database.

The images currently used by the public site are repository files, not temporary
Replit uploads. They deploy with the static build and do not depend on the
database remaining on Replit.