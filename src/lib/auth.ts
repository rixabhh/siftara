import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { getDb, schema } from "@/lib/db";

export async function requireAuth() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("UNAUTHORIZED");
  }
  return userId;
}

export async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("UNAUTHORIZED");
  }

  const bootstrapAdmins = (process.env.ADMIN_USER_IDS ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  if (bootstrapAdmins.includes(userId)) return userId;

  try {
    const db = getDb();
    const [user] = await db
      .select({ role: schema.users.role })
      .from(schema.users)
      .where(eq(schema.users.id, userId))
      .limit(1);

    if (user?.role === "admin") return userId;
  } catch {
    // Fail closed unless an explicit bootstrap admin env var is configured.
  }

  throw new Error("FORBIDDEN");
}

export function isForbiddenError(error: unknown): boolean {
  return error instanceof Error && error.message === "FORBIDDEN";
}

export async function getAuthenticatedUserIdOrNull() {
  const { userId } = await auth();
  return userId;
}

export function isAuthError(error: unknown): boolean {
  return error instanceof Error && error.message === "UNAUTHORIZED";
}
