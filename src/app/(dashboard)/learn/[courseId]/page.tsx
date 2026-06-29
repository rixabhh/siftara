import Link from "next/link";
import { seedCourses, getModulesByCourse, getLessonsByModule, getQuizByModule } from "@/lib/db/seed";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Play, CheckCircle2, Circle, FileQuestion } from "lucide-react";

export default async function LearnPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = seedCourses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-56px)]">
        <p className="text-muted-foreground">Course not found.</p>
      </div>
    );
  }

  const modules = getModulesByCourse(course.id);
  const firstModule = modules[0];
  const firstLesson = firstModule ? getLessonsByModule(firstModule.id)[0] : null;
  const totalLessons = modules.reduce((acc, m) => acc + getLessonsByModule(m.id).length, 0);

  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      {/* Header */}
      <div className="border-b bg-background px-4 py-2.5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/courses/${course.slug}`} className="gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-5" />
            <div>
              <h1 className="text-sm font-semibold">{course.title}</h1>
              <p className="text-xs text-muted-foreground">
                Module 1 · Lesson 1 of {totalLessons}
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <div className="h-1.5 w-24 rounded-full bg-muted">
              <div className="h-1.5 w-[11%] rounded-full bg-primary" />
            </div>
            <span className="text-xs text-muted-foreground">11%</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main */}
        <div className="flex-1 overflow-y-auto">
          <div className="aspect-video bg-black relative">
            {firstLesson ? (
              <iframe
                src={`https://www.youtube.com/embed/${firstLesson.youtubeVideoId}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={firstLesson.title}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-white/50">
                <Play className="h-16 w-16" />
              </div>
            )}
          </div>

          <div className="mx-auto max-w-3xl px-4 py-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                Module 1
              </Badge>
              <Badge variant="outline" className="text-xs">
                Lesson 1
              </Badge>
            </div>
            <h2 className="text-xl font-semibold">{firstLesson?.title || "Loading..."}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{firstLesson?.description || ""}</p>

            <div className="mt-6 flex gap-3">
              <Button className="gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Mark as Complete
              </Button>
              <Button variant="outline" className="gap-2">
                Next Lesson
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden w-80 border-l bg-muted/30 overflow-y-auto lg:block">
          <div className="p-4">
            <h3 className="text-sm font-semibold mb-3">Roadmap</h3>
            <div className="space-y-1">
              {modules.map((module, moduleIdx) => {
                const lessons = getLessonsByModule(module.id);
                const quiz = getQuizByModule(module.id);
                return (
                  <div key={module.id}>
                    <p className="text-xs font-medium text-muted-foreground px-3 py-2 mt-3">
                      Module {moduleIdx + 1}: {module.title}
                    </p>
                    {lessons.map((lesson, lessonIdx) => {
                      const isCurrent = moduleIdx === 0 && lessonIdx === 0;
                      const isCompleted = false;
                      return (
                        <div
                          key={lesson.id}
                          className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                            isCurrent
                              ? "bg-primary/10 text-primary font-medium"
                              : isCompleted
                              ? "text-muted-foreground line-through"
                              : "text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {isCurrent ? (
                            <Play className="h-3.5 w-3.5 shrink-0" />
                          ) : isCompleted ? (
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                          ) : (
                            <Circle className="h-3.5 w-3.5 shrink-0" />
                          )}
                          <span className="truncate">{lesson.title}</span>
                        </div>
                      );
                    })}
                    {quiz && (
                      <div className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-violet-500">
                        <FileQuestion className="h-3.5 w-3.5 shrink-0" />
                        <span className="font-medium">Module Quiz</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
