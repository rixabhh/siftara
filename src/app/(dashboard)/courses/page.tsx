import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, BookOpen, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { getDb, schema } from "@/lib/db";
import { seedCourses } from "@/lib/db/seed";
import { Card, CardContent } from "@/components/ui/card";
import { CourseFilters } from "@/components/course-filters";
import { CourseSignalCover } from "@/components/product-graphics";
import { Badge } from "@/components/ui/badge";

type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedMinutes: number;
  skills: string[];
  certificateEnabled: boolean;
  sourceCreator: string;
  status: string;
};

async function getCourses(): Promise<Course[]> {
  try {
    const db = getDb();
    const courses = await db.select().from(schema.courses);
    if (courses.length > 0) {
      return courses.map((c) => ({
        id: c.id,
        title: c.title,
        slug: c.slug,
        description: c.description,
        category: c.categoryId ?? "Development",
        difficulty: c.difficulty,
        estimatedMinutes: c.estimatedMinutes,
        skills: [] as string[],
        certificateEnabled: c.certificateEnabled,
        sourceCreator: c.sourceCreator ?? "",
        status: c.status,
      }));
    }
  } catch {}
  return seedCourses;
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category ?? "All";
  const allCourses = await getCourses();
  const courses = category === "All" ? allCourses : allCourses.filter((c) => c.category === category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <Badge variant="secondary" className="mb-4 gap-1.5">
            <BookOpen className="h-3.5 w-3.5" />
            Curated library
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Learning paths worth finishing.</h1>
        </div>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg lg:justify-self-end">
          Each path starts from a strong free source, then adds order, checkpoints, source attribution, and certificate criteria.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="my-8 flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-9 w-24 animate-pulse rounded-full bg-muted" />
            ))}
          </div>
        }
      >
        <CourseFilters />
      </Suspense>

      {courses.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
              <BookOpen className="h-7 w-7 text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-lg font-semibold">No matching path yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Choose another filter or create a path from a learning link in My Sift.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {courses.map((course) => (
            <Link key={course.id} href={`/courses/${course.slug}`} className="group block">
              <Card className="h-full border-border/70 transition-colors hover:border-primary/40">
                <CardContent className="grid gap-4 p-4 sm:grid-cols-[200px_1fr]">
                  <CourseSignalCover title={course.title} difficulty={course.difficulty} className="min-h-48" />
                  <div className="flex min-w-0 flex-col">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{course.category}</Badge>
                      {course.certificateEnabled && (
                        <Badge variant="outline" className="gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                          Siftara Verified
                        </Badge>
                      )}
                    </div>
                    <h3 className="mt-4 text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                      {course.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{course.description}</p>
                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {Math.floor(course.estimatedMinutes / 60)}h {course.estimatedMinutes % 60}m
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                        Checkpoint gated
                      </span>
                    </div>
                    <div className="mt-auto flex items-center justify-between border-t pt-4">
                      <p className="text-xs text-muted-foreground">
                        Source: <span className="font-medium text-foreground">{course.sourceCreator || "Verified creator"}</span>
                      </p>
                      <span className="flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-0.5">
                        View path
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
