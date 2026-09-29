import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;
const databaseUrl = process.env.SUPABASE_DATABASE_URL ?? process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "SUPABASE_DATABASE_URL or DATABASE_URL must be set.",
  );
}

const isSupabaseDatabase = databaseUrl.includes("supabase");

export const pool = new Pool({
  connectionString: databaseUrl,
  // Supabase requires TLS for hosted connections. Keep local Replit/Postgres
  // development connections unchanged.
  ...(isSupabaseDatabase ? { ssl: { rejectUnauthorized: false } } : {}),
  // Vercel functions are short-lived; keep the pool small when using the
  // Supabase pooler to avoid exhausting database connections.
  max: isSupabaseDatabase ? 3 : undefined,
});
export const db = drizzle(pool, { schema });

export * from "./schema";
