// Vercel's Node runtime uses the exported Express instance as a serverless function.
// The existing app keeps the /api route prefix, so the browser can use the same
// relative API URLs locally, on Replit, and on Vercel.
import app from "../artifacts/api-server/src/app.js";

export default app;