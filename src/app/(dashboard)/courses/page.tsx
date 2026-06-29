import Link from "next/link";
import { seedCourses } from "@/lib/db/seed";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, Award, BookOpen } from "lucide-react";

const categoryColors: Record<string, string> = {
  Development: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Design: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "AI Tools": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Data: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Marketing: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
};

export default function CoursesPage() {
  const courses = seedCourses;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Explore Curated Paths</h1>
        <p className="mt-2 text-muted-foreground">
          High-quality learning content, structured by Siftara.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {["All", "Development", "Design", "AI Tools", "Data", "Marketing"].map((filter) => (
          <Badge
            key={filter}
            variant={filter === "All" ? "default" : "secondary"}
            className="cursor-pointer hover:bg-primary/20 transition-colors"
          >
            {filter}
          </Badge>
        ))}
      </div>

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
    </div>
  );
}
