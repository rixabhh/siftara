import Link from "next/link";
import { getCourseBySlug, getModulesByCourse, getLessonsByModule, getQuizByModule } from "@/lib/db/seed";
import { enrollInCourse } from "../enroll-action";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CourseSignalCover, SiftMapArtifact } from "@/components/product-graphics";
import { ArrowLeft, Play, Clock, BookOpen, Award, CheckCircle2, ShieldCheck } from "lucide-react";

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
        <p className="mt-2 text-sm text-muted-foreground">This learning path does not exist yet.</p>
        <Button variant="outline" asChild className="mt-4">
          <Link href="/courses">Browse paths</Link>
        </Button>
      </div>
    );
  }

  const modules = getModulesByCourse(course.id);
  const totalLessons = modules.reduce((acc, m) => acc + getLessonsByModule(m.id).length, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link href="/courses" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          All paths
        </Link>
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="grid gap-5 sm:grid-cols-[1fr_240px] sm:items-start">
            <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">{course.category}</Badge>
              <Badge variant="outline">{course.difficulty}</Badge>
              {course.certificateEnabled && (
                <Badge variant="outline" className="gap-1">
                  <Award className="h-3 w-3" />
                  Free certificate
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{course.title}</h1>
            <p className="mt-3 text-base leading-7 text-muted-foreground sm:text-lg">{course.description}</p>
            </div>
            <CourseSignalCover title={course.title} difficulty={course.difficulty} className="min-h-48" />
          </div>

          {/* Quick stats */}
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
              {modules.length} modules
            </span>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Skills covered</h2>
            <div className="flex flex-wrap gap-2">
              {course.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Source attribution */}
          <Card className="border-border/50 bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Play className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Source: {course.sourceCreator} on YouTube</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    All video content belongs to the respective creator. Siftara provides the learning path, progress tracking, checkpoints, and verification layer.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Roadmap */}
          <div>
            <h2 className="text-xl font-semibold mb-2">SiftMap</h2>
            <p className="text-sm text-muted-foreground mb-4">
              {modules.length} modules with {totalLessons} lessons and checkpoint quizzes.
            </p>
            <SiftMapArtifact
              compact
              nodes={[
                ...modules.slice(0, 3).map((module, index) => ({
                  label: module.title,
                  detail: `${getLessonsByModule(module.id).length} lessons`,
                  status: index === 0 ? "current" as const : "locked" as const,
                })),
                { label: "Verified certificate", detail: "Issued after trust checks", status: "certificate" as const },
              ]}
              className="mb-4"
            />
            <div className="space-y-3">
              {modules.map((module, idx) => {
                const lessons = getLessonsByModule(module.id);
                const quiz = getQuizByModule(module.id);
                return (
                  <Card key={module.id} className="border-border/50">
                    <CardContent className="p-4">
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
                          <div className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm bg-accent-violet/5 text-accent-violet dark:text-accent-violet">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span className="font-medium">{quiz.title}</span>
                            <Badge variant="outline" className="text-xs ml-auto">Checkpoint</Badge>
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

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-4">
            {/* Start CTA */}
            <Card className="border-border/50">
              <CardContent className="p-5">
                <form action={enrollInCourse.bind(null, course.id)}>
                  <Button type="submit" className="w-full gap-2 h-12">
                    <Play className="h-4 w-4" />
                    Start path
                  </Button>
                </form>
                <p className="mt-3 text-xs text-muted-foreground text-center">
                  Free to start. No credit card required.
                </p>
              </CardContent>
            </Card>

            {/* Certificate requirements */}
            <Card className="border-border/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Earn a certificate</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete the required checkpoints to earn a free Siftara Verified Certificate.
                </p>
                <ul className="space-y-3">
                  {[
                    "Complete all required lessons",
                    "Pass each module quiz (70%+)",
                    "Write a learning reflection",
                  ].map((req) => (
                    <li key={req} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* What you'll learn */}
            <Card className="border-border/50">
              <CardContent className="p-5">
                <h3 className="font-semibold mb-3">What you will learn</h3>
                <ul className="space-y-2">
                  {[
                    "Follow a structured learning path",
                    "Test knowledge with checkpoint quizzes",
                    "Track progress through the SiftMap",
                    "Earn a verifiable certificate",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
