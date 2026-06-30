import { NextResponse } from "next/server";
import { getDb, schema } from "@/lib/db";
import { seedCourses } from "@/lib/db/seed";

export async function GET() {
  try {
    const db = getDb();
    const courses = await db.select().from(schema.courses);
    return NextResponse.json({ courses });
  } catch {
    return NextResponse.json({ courses: seedCourses, fallback: true });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, slug, description, category, difficulty, estimatedMinutes, sourceCreator, sourceUrl } = body;

  if (!title || !slug || !description) {
    return NextResponse.json({ error: "title, slug, and description are required" }, { status: 400 });
  }

  try {
    const db = getDb();
    const now = new Date();
    const id = crypto.randomUUID();

    await db.insert(schema.courses).values({
      id,
      title,
      slug,
      description,
      categoryId: category ?? null,
      difficulty: difficulty ?? "beginner",
      estimatedMinutes: estimatedMinutes ?? 0,
      sourceCreator: sourceCreator ?? null,
      sourceUrl: sourceUrl ?? null,
      status: "draft",
      createdBy: null,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ message: "Course created", courseId: id });
  } catch {
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}
