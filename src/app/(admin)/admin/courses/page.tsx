import Link from "next/link";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getDb, schema } from "@/lib/db";
import { seedCourses } from "@/lib/db/seed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ensureUserExists } from "@/lib/db/user-sync";
import { ArrowLeft, Plus, Eye, EyeOff, Clock } from "lucide-react";

async function getCourses() {
  try {
    const db = getDb();
    const courses = await db.select().from(schema.courses);
    if (courses.length > 0) {
      return courses.map((c) => ({
        id: c.id,
        title: c.title,
        slug: c.slug,
        status: c.status,
        difficulty: c.difficulty,
        estimatedMinutes: c.estimatedMinutes,
        createdAt: c.createdAt,
      }));
    }
  } catch {}
  return seedCourses.map((c) => ({
    id: c.id,
    title: c.title,
    slug: c.slug,
    status: c.status,
    difficulty: c.difficulty,
    estimatedMinutes: c.estimatedMinutes,
    createdAt: new Date(),
  }));
}

export default async function AdminCoursesPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    await ensureUserExists({
      id: userId,
      email: user.emailAddresses?.[0]?.emailAddress ?? "",
      name: [user.firstName, user.lastName].filter(Boolean).join(" ") || "Admin",
      avatarUrl: user.imageUrl,
    });
  } catch {}

  const courses = await getCourses();
  const published = courses.filter((c) => c.status === "published").length;
  const drafts = courses.filter((c) => c.status === "draft").length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-2 gap-2">
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4" />
              Back to Admin
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Course Management</h1>
          <p className="mt-1 text-muted-foreground">
            {published} published, {drafts} drafts
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/admin/courses/new">
            <Plus className="h-4 w-4" />
            Create Course
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <Card key={course.id} className="border-border/50">
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold truncate">{course.title}</h3>
                    <Badge variant={course.status === "published" ? "default" : "secondary"}>
                      {course.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{course.difficulty}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {Math.floor(course.estimatedMinutes / 60)}h {course.estimatedMinutes % 60}m
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/courses/${course.slug}`} className="gap-1">
                      {course.status === "published" ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                      View
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
