---
name: Imported artifact registration
description: Reusable guidance for moving imported Vercel apps into the pnpm workspace artifact layout.
---

When an imported app is registered from `.migration-backup`, moving its files is not enough: the stale artifact registration can block creation of the workspace-owned artifact at the same path.

**Why:** The imported workflow and artifact metadata can continue pointing at the backup directory even after the source has been moved, causing missing dependency and workflow failures.

**How to apply:** Clear the stale imported registration through the artifact lifecycle, create the deployable web artifact at `artifacts/<slug>`, then copy the preserved source into that registered directory and restart its managed workflow.