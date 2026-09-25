---
name: Shared Drizzle dependency
description: Workspace dependency topology required to keep Drizzle ORM types identical
---

In this monorepo, packages that expose Drizzle schemas or database clients should consume `drizzle-orm` as a peer dependency, while the API/runtime owner supplies the version and the root workspace provides a development link for tooling.

**Why:** A normal dependency in the database workspace can create a nested `drizzle-orm` resolution. Even at the same version, TypeScript then treats Drizzle's private branded types as distinct, causing SQL and query-builder incompatibility errors.

**How to apply:** Keep the version in the workspace catalog, inspect `pnpm why drizzle-orm`, and confirm there is no `@workspace/db/node_modules/drizzle-orm` path after reinstalling from the lockfile.