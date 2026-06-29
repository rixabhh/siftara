import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb(env?: { DB: Parameters<typeof drizzle>[0] }) {
  if (_db) return _db;
  if (env?.DB) {
    _db = drizzle(env.DB, { schema });
    return _db;
  }
  throw new Error("Database not configured. Set DATABASE_URL or bind D1.");
}

export { schema };
