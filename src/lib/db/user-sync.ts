import { getDb, schema } from ".";
import { eq } from "drizzle-orm";

export interface SyncUserInput {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string | null;
}

export async function ensureUserExists(input: SyncUserInput): Promise<void> {
  try {
    const db = getDb();
    const now = new Date();

    const existing = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, input.id))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(schema.users)
        .set({
          name: input.name,
          email: input.email,
          avatarUrl: input.avatarUrl ?? existing[0].avatarUrl,
          updatedAt: now,
        })
        .where(eq(schema.users.id, input.id));
    } else {
      await db.insert(schema.users).values({
        id: input.id,
        name: input.name,
        email: input.email,
        avatarUrl: input.avatarUrl ?? null,
        authProvider: "clerk",
        role: "learner",
        planType: "free",
        freeMySiftUsed: false,
        createdAt: now,
        updatedAt: now,
      });
    }
  } catch (error) {
    console.error("Failed to sync user to D1:", error);
  }
}

export async function getUserFromDb(userId: string) {
  try {
    const db = getDb();
    const [user] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, userId))
      .limit(1);
    return user ?? null;
  } catch {
    return null;
  }
}
