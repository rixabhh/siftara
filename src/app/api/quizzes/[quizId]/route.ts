import { NextResponse } from "next/server";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ quizId: string }> }
) {
  const { quizId } = await params;

  try {
    const db = getDb();

    const [quiz] = await db.select().from(schema.quizzes).where(eq(schema.quizzes.id, quizId)).limit(1);
    if (!quiz) return NextResponse.json({ error: "Quiz not found" }, { status: 404 });

    const questions = await db.select().from(schema.quizQuestions).where(eq(schema.quizQuestions.quizId, quizId));

    return NextResponse.json({ quiz, questions });
  } catch {
    return NextResponse.json({ error: "Failed to fetch quiz" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ quizId: string }> }
) {
  const { quizId } = await params;
  const body = await request.json();
  const { userId, score, passed, answersJson, variantId } = body;

  if (!userId || score === undefined || passed === undefined) {
    return NextResponse.json({ error: "userId, score, and passed are required" }, { status: 400 });
  }

  try {
    const db = getDb();
    const now = new Date();
    const id = crypto.randomUUID();

    await db.insert(schema.quizAttempts).values({
      id,
      userId,
      quizId,
      variantId: variantId ?? null,
      score,
      passed,
      answersJson: answersJson ? JSON.stringify(answersJson) : null,
      startedAt: now,
      completedAt: now,
      createdAt: now,
    });

    return NextResponse.json({ attemptId: id, score, passed });
  } catch {
    return NextResponse.json({ error: "Failed to submit quiz attempt" }, { status: 500 });
  }
}
