---
name: Vercel Express typing
description: Express application typing behavior in the Vercel TypeScript validation path
---

When Express code is bundled through Vercel's TypeScript validator in this workspace, infer application and router types from the `express()` and `Router()` factories, but explicitly type route callback parameters with the same package's `Request` and `Response` types.

**Why:** The validator can resolve imported Express interfaces differently from the runtime application/router types, producing false-looking errors that methods such as `use` do not exist, and it can lose contextual callback types in individual route modules.

**How to apply:** Keep factory-created application/router values unannotated, and import `Request`/`Response` as types for route callbacks when Vercel reports implicit-any parameters.