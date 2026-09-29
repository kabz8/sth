---
name: Supabase transaction pooler
description: Supabase Postgres connections for this project must use the transaction pooler endpoint.
---

Use the Supabase transaction pooler URI for serverless and Replit connectivity, typically on port 6543 with an `aws-*.pooler.supabase.com` host. The direct `db.<project-ref>.supabase.co:5432` endpoint was not resolvable from this environment.

**Why:** Vercel functions and the Replit verification environment need a reachable, connection-efficient hosted Postgres endpoint; the direct Supabase host failed DNS resolution while the pooler connected successfully.

**How to apply:** Store the exact pooler URI as `SUPABASE_DATABASE_URL`, keep TLS enabled in the Node `pg` pool, and keep the pool size small for serverless execution.