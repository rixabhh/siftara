import Link from "next/link";
import { Suspense } from "react";
import { getDb, schema } from "@/lib/db";
import { seedCourses } from "@/lib/db/seed";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CourseFilters } from "@/components/course-filters";
import { ArrowRight, Clock, Award, BookOpen } from "lucide-react";

const categoryColors: Record<string, string> = {
  Development: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Design: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "AI Tools": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Data: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Marketing: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
};

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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Explore Curated Paths</h1>
        <p className="mt-2 text-muted-foreground">
          High-quality learning content, structured by Siftara.
        </p>
      </div>

      <Suspense fallback={<div className="mb-8 flex gap-2">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-7 w-20 animate-pulse rounded-md bg-muted" />)}</div>}>
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link key={course.id} href={`/courses/${course.slug}`} className="group">
              <Card className="h-full border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className={categoryColors[course.category] || ""}>
                      {course.category}
                    </Badge>
                    <Badge variant="outline">{course.difficulty}</Badge>
                    {course.certificateEnabled && (
                      <Badge variant="outline" className="gap-1">
                        <Award className="h-3 w-3" />
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{course.description}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {course.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {Math.floor(course.estimatedMinutes / 60)}h {course.estimatedMinutes % 60}m
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {course.sourceCreator}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
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
