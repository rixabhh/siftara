import Link from "next/link";
import {
  getLessonsByModule,
  getModulesByCourse,
  getQuizByModule,
  getQuizQuestions,
  seedCourses,
} from "@/lib/db/seed";
import { Button } from "@/components/ui/button";
import { LearningWorkspace } from "@/components/learning/learning-workspace";

export default async function LearnPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = seedCourses.find((item) => item.id === courseId);

  if (!course) {
    return (
      <div className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-semibold">Course not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">This learning path is not available yet.</p>
        <Button variant="outline" asChild className="mt-5">
          <Link href="/courses">Back to courses</Link>
        </Button>
      </div>
    );
  }

  const modules = getModulesByCourse(course.id).map((module) => {
    const quiz = getQuizByModule(module.id);
    return {
      ...module,
      lessons: getLessonsByModule(module.id),
      quiz: quiz ? { ...quiz, questions: getQuizQuestions(quiz.id) } : undefined,
    };
  });

  return (
    <LearningWorkspace
      course={course}
      modules={modules}
    />
  );
}
