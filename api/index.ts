// Vercel serverless entry point. The frontend stays static on Vercel while
// these API routes use the Supabase-backed database layer.
import app from "../artifacts/api-server/src/app.js";

export default app;