import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { seedCourses } from "@/lib/db/seed";
import { ensureUserExists } from "@/lib/db/user-sync";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Flame,
  Route,
  ShieldCheck,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";

async function getDashboardData(userId: string) {
  let enrollments: Array<{ courseId: string; progressPercentage: number; status: string }> = [];
  let certificates: Array<{ title: string; trustScore: number; courseTitle?: string }> = [];
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

  // Sync user to D1 on visit
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

  const { enrollments, certificates, courses } = await getDashboardData(userId);

  // Compute stats
  const activeEnrollments = enrollments.filter((e) => e.status === "active");
  const avgProgress = activeEnrollments.length > 0
    ? Math.round(activeEnrollments.reduce((sum, e) => sum + e.progressPercentage, 0) / activeEnrollments.length)
    : 0;
  const avgTrust = certificates.length > 0
    ? Math.round(certificates.reduce((sum, c) => sum + (c.trustScore ?? 0), 0) / certificates.length)
    : 0;

  // Get most recent active enrollment for "active SiftMap"
  const activeEnrollment = activeEnrollments[0];
  const activeCourse = activeEnrollment
    ? courses.find((c) => c.id === activeEnrollment.courseId) ?? seedCourses[0]
    : seedCourses[0];
  const activeProgress = activeEnrollment?.progressPercentage ?? 0;

  // Recommendations: courses not enrolled in
  const enrolledCourseIds = new Set(enrollments.map((e) => e.courseId));
  const recommendations = courses.length > 0
    ? courses.filter((c) => !enrolledCourseIds.has(c.id)).slice(0, 4)
    : seedCourses.slice(1, 5);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge variant="secondary" className="mb-3 gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" />
            Private beta cockpit
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userName}</h1>
          <p className="mt-1 text-muted-foreground">
            Continue the next checkpoint, keep certificate trust high, and review what is coming next.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/my-sift">
            <Zap className="h-4 w-4" />
            Create My Sift
          </Link>
        </Button>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active paths", value: activeEnrollments.length.toString(), icon: BookOpen, color: "text-emerald-500" },
          { label: "Certificates", value: certificates.length.toString(), icon: Trophy, color: "text-amber-500" },
          { label: "Avg progress", value: `${avgProgress}%`, icon: ShieldCheck, color: "text-blue-500" },
          { label: "Trust average", value: avgTrust > 0 ? `${avgTrust}%` : "—", icon: Flame, color: "text-orange-500" },
        ].map((stat) => (
          <Card key={stat.label} className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-3 text-lg">
              <span>{activeEnrollment ? "Active SiftMap" : "Start Learning"}</span>
              {activeEnrollment && (
                <Badge variant="outline">Progress {activeProgress}%</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border bg-muted/30 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{activeCourse.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {activeEnrollment
                      ? `Continue learning — ${activeProgress}% complete.`
                      : "Pick a course to start your learning journey."}
                  </p>
                </div>
                <Button asChild className="gap-2">
                  <Link href={activeEnrollment ? `/learn/${activeCourse.id}` : `/courses`}>
                    {activeEnrollment ? "Resume" : "Explore"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              {activeEnrollment && (
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium">Path progress</span>
                    <span className="text-muted-foreground">{activeProgress}%</span>
                  </div>
                  <Progress value={activeProgress} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">My Sift Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border bg-primary/5 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Free My Sift</span>
                <Badge>1 available</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Credits unlock more personalized paths. Certificates stay free after trust checks.
              </p>
            </div>
            <Button variant="outline" asChild className="w-full justify-start gap-3 h-auto py-4">
              <Link href="/pricing">
                <Sparkles className="h-5 w-5 text-violet-500" />
                <div className="text-left">
                  <p className="font-medium">Preview credit packs</p>
                  <p className="text-xs text-muted-foreground">Phase 4 monetization readiness</p>
                </div>
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Recommended Next Paths</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {recommendations.map((course) => (
                <Link key={course.id} href={`/courses/${course.slug}`} className="group rounded-xl border p-4 transition hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold group-hover:text-primary">{course.title}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{course.description}</p>
                    </div>
                    <Route className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <Badge variant="secondary">{course.difficulty}</Badge>
                    {course.certificateEnabled && <Badge variant="outline">Certificate</Badge>}
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Public Proof</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="font-medium">{userName}</p>
              <p className="mt-1 text-sm text-muted-foreground">Frontend learner building verified proof with Siftara.</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Completed paths", value: certificates.length.toString() },
                { label: "Certificates", value: certificates.length.toString() },
                { label: "Active paths", value: activeEnrollments.length.toString() },
                { label: "Avg progress", value: `${avgProgress}%` },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border p-3">
                  <p className="text-lg font-semibold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarDays className="h-5 w-5 text-primary" />
            Upcoming Beta Feedback Points
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          {["After lesson usefulness", "Quiz relevance and difficulty", "Certificate share intent"].map((item) => (
            <div key={item} className="rounded-xl border bg-muted/30 p-4 text-sm">
              {item}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
