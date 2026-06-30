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
    const conditions = [eq(schema.enrollments.userId, userId)];
    if (courseId) conditions.push(eq(schema.enrollments.courseId, courseId));

    const enrollments = await db.select().from(schema.enrollments).where(and(...conditions));
    return NextResponse.json({ enrollments });
  } catch {
    return NextResponse.json({ enrollments: [], fallback: true });
  }
}

export async function POST(request: Request) {
  let userId: string;
  try {
    userId = await requireAuth();
  } catch (e) {
    if (isAuthError(e)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    throw e;
  }

  const body = await request.json();
  const { courseId } = body;

  if (!courseId) {
    return NextResponse.json({ error: "courseId is required" }, { status: 400 });
  }

  try {
    const db = getDb();
    const now = new Date();

    const existing = await db
      .select()
      .from(schema.enrollments)
      .where(and(eq(schema.enrollments.userId, userId), eq(schema.enrollments.courseId, courseId)))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({ enrollment: existing[0], message: "Already enrolled" });
    }

    const id = crypto.randomUUID();
    await db.insert(schema.enrollments).values({
      id,
      userId,
      courseId,
      status: "active",
      progressPercentage: 0,
      startedAt: now,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ enrollment: { id, userId, courseId, status: "active" } });
  } catch {
    return NextResponse.json({ error: "Failed to enroll" }, { status: 500 });
  }
}
