"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getDb, schema } from "@/lib/db";
import { eq, and } from "drizzle-orm";

export async function enrollInCourse(courseId: string) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  try {
    const db = getDb();
    const now = new Date();

    // Check if already enrolled
    const existing = await db
      .select()
      .from(schema.enrollments)
      .where(and(eq(schema.enrollments.userId, userId), eq(schema.enrollments.courseId, courseId)))
      .limit(1);

    if (existing.length === 0) {
      // Create enrollment
      await db.insert(schema.enrollments).values({
        id: crypto.randomUUID(),
        userId,
        courseId,
        status: "active",
        progressPercentage: 0,
        startedAt: now,
        createdAt: now,
        updatedAt: now,
      });
    }
  } catch (error) {
    console.error("Enrollment failed:", error);
    // Continue to learn page even if DB fails (seed data fallback)
  }

  redirect(`/learn/${courseId}`);
}
