import { NextResponse } from "next/server";
import { getDb, schema } from "@/lib/db";
import { eq, and } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const courseId = searchParams.get("courseId");

  if (!userId || !courseId) {
    return NextResponse.json({ error: "userId and courseId are required" }, { status: 400 });
  }

  try {
    const db = getDb();

    const lessons = await db
      .select()
      .from(schema.lessonProgress)
      .where(and(eq(schema.lessonProgress.userId, userId), eq(schema.lessonProgress.courseId, courseId)));

    const quizzes = await db
      .select()
      .from(schema.quizAttempts)
      .where(and(eq(schema.quizAttempts.userId, userId)));

    return NextResponse.json({ lessons, quizzes });
  } catch {
    return NextResponse.json({ lessons: [], quizzes: [], fallback: true });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, courseId, lessonId, status, watchedSeconds } = body;

  if (!userId || !courseId || !lessonId) {
    return NextResponse.json({ error: "userId, courseId, and lessonId are required" }, { status: 400 });
  }

  try {
    const db = getDb();
    const now = new Date();

    const existing = await db
      .select()
      .from(schema.lessonProgress)
      .where(
        and(
          eq(schema.lessonProgress.userId, userId),
          eq(schema.lessonProgress.courseId, courseId),
          eq(schema.lessonProgress.lessonId, lessonId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(schema.lessonProgress)
        .set({
          status: status ?? "completed",
          watchedSeconds: watchedSeconds ?? existing[0].watchedSeconds,
          completedAt: status === "completed" ? now : existing[0].completedAt,
          updatedAt: now,
        })
        .where(eq(schema.lessonProgress.id, existing[0].id));
    } else {
      const id = crypto.randomUUID();
      await db.insert(schema.lessonProgress).values({
        id,
        userId,
        courseId,
        lessonId,
        status: status ?? "completed",
        watchedSeconds: watchedSeconds ?? 0,
        completedAt: status === "completed" ? now : null,
        createdAt: now,
        updatedAt: now,
      });
    }

    const allLessons = await db
      .select()
      .from(schema.lessonProgress)
      .where(and(eq(schema.lessonProgress.userId, userId), eq(schema.lessonProgress.courseId, courseId)));

    const completedCount = allLessons.filter((l) => l.status === "completed").length;

    const totalModules = await db
      .select()
      .from(schema.lessons)
      .where(eq(schema.lessons.courseId, courseId));

    const totalRequired = totalModules.filter((l) => l.isRequired).length;
    const progressPercentage = totalRequired > 0 ? Math.round((completedCount / totalRequired) * 100) : 0;

    await db
      .update(schema.enrollments)
      .set({
        progressPercentage,
        completedAt: progressPercentage >= 100 ? now : null,
        updatedAt: now,
      })
      .where(and(eq(schema.enrollments.userId, userId), eq(schema.enrollments.courseId, courseId)));

    return NextResponse.json({ progressPercentage, completedCount });
  } catch {
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}
