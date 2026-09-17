---
name: Vercel Express typing
description: Express application typing behavior in the Vercel TypeScript validation path
---

When Express code is bundled through Vercel's TypeScript validator in this workspace, infer application and router types from the `express()` and `Router()` factories instead of annotating them with imported `Express` or `IRouter` types.

**Why:** The validator can resolve imported Express interfaces differently from the runtime application/router types, producing false-looking errors that methods such as `use` do not exist.

**How to apply:** Keep the runtime imports and factory calls unchanged, but remove explicit imported application/router type annotations if Vercel reports missing Express methods.