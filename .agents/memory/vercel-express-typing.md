---
name: Vercel Express typing
description: Express application typing behavior in the Vercel TypeScript validation path
---

When an Express app is bundled through Vercel's TypeScript validator in this workspace, infer the application type from the `express()` factory instead of annotating it with an imported `Express` type.

**Why:** The validator can resolve the imported `Express` type differently from the runtime Express application type, producing false-looking errors that methods such as `use` do not exist.

**How to apply:** Keep the runtime import and factory call unchanged, but remove the explicit imported application-type annotation if Vercel reports missing Express methods.