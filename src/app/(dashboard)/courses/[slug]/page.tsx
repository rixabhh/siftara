import Link from "next/link";
import { getCourseBySlug, getModulesByCourse, getLessonsByModule, getQuizByModule } from "@/lib/db/seed";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Play, Clock, BookOpen, Award, CheckCircle2 } from "lucide-react";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Button variant="outline" asChild className="mt-4">
          <Link href="/courses">Back to courses</Link>
        </Button>
      </div>
    );
  }

  const modules = getModulesByCourse(course.id);
  const totalLessons = modules.reduce((acc, m) => acc + getLessonsByModule(m.id).length, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/courses" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          All Courses
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{course.category}</Badge>
              <Badge variant="outline">{course.difficulty}</Badge>
              {course.certificateEnabled && (
                <Badge variant="outline" className="gap-1">
                  <Award className="h-3 w-3" />
                  Certificate
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
            <p className="mt-3 text-muted-foreground leading-relaxed">{course.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {Math.floor(course.estimatedMinutes / 60)}h {course.estimatedMinutes % 60}m total
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              {totalLessons} lessons
            </span>
            <span className="flex items-center gap-1.5">
              <Play className="h-4 w-4" />
              {course.sourceCreator}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {course.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-4">Course Roadmap</h2>
            <div className="space-y-4">
              {modules.map((module, idx) => {
                const lessons = getLessonsByModule(module.id);
                const quiz = getQuizByModule(module.id);
                return (
                  <Card key={module.id} className="border-border/50">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{module.title}</h3>
                          <p className="text-xs text-muted-foreground">{module.description}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {lessons.length} lessons
                        </Badge>
                      </div>

                      <div className="ml-11 space-y-1">
                        {lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-muted transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <Play className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{lesson.title}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{Math.floor(lesson.durationSeconds / 60)}m</span>
                          </div>
                        ))}
                        {quiz && (
                          <div className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm bg-violet-500/5 text-violet-600 dark:text-violet-400">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span className="font-medium">{quiz.title}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Certificate Requirements</h3>
                <ul className="space-y-3">
                  {[
                    "Complete at least 80% of lessons",
                    "Pass all module quizzes with 70%+",
                    "Complete the final assessment",
                  ].map((req) => (
                    <li key={req} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
                <Separator className="my-4" />
                <Button className="w-full gap-2" asChild>
                  <Link href={`/learn/${course.id}`}>
                    <Play className="h-4 w-4" />
                    Start Learning
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
