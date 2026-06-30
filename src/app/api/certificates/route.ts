import { NextResponse } from "next/server";
import { getDb, schema } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { requireAuth, isAuthError } from "@/lib/auth";

export async function GET(request: Request) {
  let userId: string;
  try {
    userId = await requireAuth();
  } catch (e) {
    if (isAuthError(e)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    throw e;
  }

  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("courseId");

  try {
    const db = getDb();
    const conditions = [eq(schema.certificates.userId, userId)];
    if (courseId) conditions.push(eq(schema.certificates.courseId, courseId));

    const certificates = await db.select().from(schema.certificates).where(and(...conditions));
    return NextResponse.json({ certificates });
  } catch {
    return NextResponse.json({ certificates: [], fallback: true });
  }
}
