import { NextResponse } from "next/server";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { getCourseBySlug, getModulesByCourse, getLessonsByModule, getQuizByModule, getQuizQuestions } from "@/lib/db/seed";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const db = getDb();

    const [course] = await db.select().from(schema.courses).where(eq(schema.courses.slug, slug)).limit(1);
    if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });

    const modules = await db.select().from(schema.courseModules).where(eq(schema.courseModules.courseId, course.id));

    const modulesWithLessons = await Promise.all(
      modules.map(async (mod) => {
        const lessons = await db.select().from(schema.lessons).where(eq(schema.lessons.moduleId, mod.id));
        const [quiz] = await db.select().from(schema.quizzes).where(eq(schema.quizzes.moduleId, mod.id)).limit(1);
        let questions: typeof schema.quizQuestions.$inferSelect[] = [];
        if (quiz) {
          questions = await db.select().from(schema.quizQuestions).where(eq(schema.quizQuestions.quizId, quiz.id));
        }
        return { ...mod, lessons, quiz: quiz ? { ...quiz, questions } : undefined };
      })
    );

    return NextResponse.json({ course, modules: modulesWithLessons });
  } catch {
    const course = getCourseBySlug(slug);
    if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });
    const modules = getModulesByCourse(course.id).map((mod) => {
      const lessons = getLessonsByModule(mod.id);
      const quiz = getQuizByModule(mod.id);
      return { ...mod, lessons, quiz: quiz ? { ...quiz, questions: getQuizQuestions(quiz.id) } : undefined };
    });
    return NextResponse.json({ course, modules, fallback: true });
  }
}
