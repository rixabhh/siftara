import Link from "next/link";
import { Suspense } from "react";
import { getDb, schema } from "@/lib/db";
import { seedCourses } from "@/lib/db/seed";
import { Card, CardContent } from "@/components/ui/card";
import { CourseFilters } from "@/components/course-filters";
import { ArrowRight, Clock, BookOpen, ShieldCheck } from "lucide-react";

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
  const courses = category === "All"
    ? allCourses
    : allCourses.filter((c) => c.category === category);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Explore Library</h1>
        <p className="mt-2 text-muted-foreground text-lg">
          Discover verifiable courses to boost your Sift Score.
        </p>
      </div>

      <Suspense fallback={<div className="mb-8 flex gap-2">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-9 w-24 animate-pulse rounded-full bg-muted" />)}</div>}>
        <CourseFilters />
      </Suspense>

      {courses.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
              <BookOpen className="h-7 w-7 text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-lg font-semibold">No courses found</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              No courses match the selected category. Try a different filter.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {courses.map((course, idx) => (
            <Link key={course.id} href={`/courses/${course.slug}`} className="group block">
              <Card className="border-border/50 hover:border-primary/20 transition-colors overflow-hidden">
                {/* Thumbnail placeholder */}
                <div className="h-48 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground/30" />
                </div>
                <CardContent className="p-5">
                  {/* Verified badge */}
                  {course.certificateEnabled && (
                    <div className="flex items-center gap-1.5 mb-3">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      <span className="text-xs font-medium text-primary">Siftara Verified</span>
                    </div>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Est. {Math.floor(course.estimatedMinutes / 60)}h {course.estimatedMinutes % 60}m</span>
                    <span>·</span>
                    <span>{course.difficulty}</span>
                  </div>

                  {/* Title & description */}
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {course.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex -space-x-1.5">
                        {["A", "B", "C"].map((l, i) => (
                          <div key={i} className="h-5 w-5 rounded-full bg-muted border border-background flex items-center justify-center text-[9px] font-medium">
                            {l}
                          </div>
                        ))}
                      </div>
                      <span>+{120 + idx * 80} enrolled</span>
                    </div>
                    <span className="text-sm font-medium text-primary group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Start <ArrowRight className="h-3.5 w-3.5" />
                    </span>
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
