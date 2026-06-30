import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { seedCourses } from "@/lib/db/seed";
import { ensureUserExists } from "@/lib/db/user-sync";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  Flame,
  Play,
  Link as LinkIcon,
  Zap,
} from "lucide-react";

async function getDashboardData(userId: string) {
  let enrollments: Array<{ courseId: string; progressPercentage: number; status: string }> = [];
  let certificates: Array<{ title: string; trustScore: number }> = [];
  let courses: Array<{ id: string; title: string; slug: string; description: string; difficulty: string; certificateEnabled: boolean }> = [];

  try {
    const db = getDb();
    [enrollments, certificates, courses] = await Promise.all([
      db.select().from(schema.enrollments).where(eq(schema.enrollments.userId, userId)),
      db.select().from(schema.certificates).where(eq(schema.certificates.userId, userId)),
      db.select().from(schema.courses).where(eq(schema.courses.status, "published")),
    ]);
  } catch {}

  return { enrollments, certificates, courses };
}

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  let userName = "Learner";
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    userName = [user.firstName, user.lastName].filter(Boolean).join(" ") || "Learner";
    await ensureUserExists({
      id: userId,
      email: user.emailAddresses?.[0]?.emailAddress ?? "",
      name: userName,
      avatarUrl: user.imageUrl,
    });
  } catch {}

  const { enrollments, courses } = await getDashboardData(userId);
  const activeEnrollments = enrollments.filter((e) => e.status === "active");
  const activeEnrollment = activeEnrollments[0];
  const activeCourse = activeEnrollment
    ? courses.find((c) => c.id === activeEnrollment.courseId) ?? seedCourses[0]
    : seedCourses[0];
  const activeProgress = activeEnrollment?.progressPercentage ?? 0;

  const enrolledCourseIds = new Set(enrollments.map((e) => e.courseId));
  const recommendations = courses.length > 0
    ? courses.filter((c) => !enrolledCourseIds.has(c.id)).slice(0, 3)
    : seedCourses.slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Welcome */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome back.
        </h1>
      </div>

      {/* Continue Learning — dark card */}
      <div className="mb-8">
        <Card className="bg-foreground text-background overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-4 w-4 text-accent-pink" />
              <span className="text-xs font-semibold uppercase tracking-wider text-background/60">Continue Learning</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{activeCourse.title}</h2>
                <p className="mt-1 text-sm text-background/60">
                  {activeEnrollment
                    ? `Module progress · Est. ${Math.round((100 - activeProgress) * 0.45)} mins remaining`
                    : "Start your first path to begin learning."}
                </p>
              </div>
              <Button asChild className="gap-2 bg-primary text-primary-foreground hover:bg-primary-dark">
                <Link href={activeEnrollment ? `/learn/${activeCourse.id}` : `/courses`}>
                  {activeEnrollment ? "Resume Lesson" : "Start Path"}
                  <Play className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            {activeEnrollment && (
              <div className="mt-5 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {Array.from({ length: Math.min(5, Math.ceil(activeProgress / 20)) }).map((_, i) => (
                    <div key={i} className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground border-2 border-foreground">
                      <CheckIcon />
                    </div>
                  ))}
                  {Array.from({ length: Math.max(0, 5 - Math.ceil(activeProgress / 20)) }).map((_, i) => (
                    <div key={i} className="h-8 w-8 rounded-full bg-background/10 flex items-center justify-center text-xs text-background/40 border-2 border-foreground">
                      {i + Math.ceil(activeProgress / 20) + 1}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-background/60">Module {Math.ceil(activeProgress / 20)} of 5</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* My Sift input */}
      <div className="mb-8">
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">My Sift</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 rounded-lg border bg-muted/50 px-4 py-3">
                <LinkIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Paste URL to verify...</span>
              </div>
              <Button size="icon" className="h-11 w-11 shrink-0" asChild>
                <Link href="/my-sift">
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active SiftMap */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Active SiftMap</h3>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="space-y-0">
              {[
                { title: "Getting Started", status: "completed" },
                { title: activeCourse.title, status: activeEnrollment ? "in_progress" : "locked" },
                { title: "Advanced Topics", status: "locked" },
              ].map((node, i) => (
                <div key={node.title} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      node.status === "completed"
                        ? "bg-primary text-primary-foreground"
                        : node.status === "in_progress"
                        ? "border-2 border-primary text-primary"
                        : "border-2 border-muted text-muted-foreground"
                    }`}>
                      {node.status === "completed" ? (
                        <CheckIcon />
                      ) : node.status === "in_progress" ? (
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                      )}
                    </div>
                    {i < 2 && <div className="w-0.5 h-8 bg-border" />}
                  </div>
                  <div className="pb-6">
                    <p className={`text-sm font-medium ${node.status === "locked" ? "text-muted-foreground" : ""}`}>
                      {node.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {node.status === "completed" ? "Verified" : node.status === "in_progress" ? "In Progress" : "Locked"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recommended for You</h3>
          <Button variant="ghost" size="sm" asChild className="gap-1 text-primary">
            <Link href="/courses">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {recommendations.map((course) => (
            <Link key={course.id} href={`/courses/${course.slug}`} className="group">
              <Card className="h-full border-border/50 hover:border-primary/20 transition-colors">
                <CardContent className="p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted mb-3">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                  <p className="mt-3 text-xs text-primary font-medium">3 Modules</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
