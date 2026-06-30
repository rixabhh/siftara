import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Link as LinkIcon, Play, Route, ShieldCheck } from "lucide-react";
import { eq } from "drizzle-orm";
import { getDb, schema } from "@/lib/db";
import { seedCourses } from "@/lib/db/seed";
import { ensureUserExists } from "@/lib/db/user-sync";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CourseSignalCover, SiftMapArtifact } from "@/components/product-graphics";

async function getDashboardData(userId: string) {
  let enrollments: Array<{ courseId: string; progressPercentage: number; status: string }> = [];
  let certificates: Array<{ title: string; trustScore: number }> = [];
  let courses: Array<{ id: string; title: string; slug: string; description: string; difficulty: string; certificateEnabled: boolean; sourceCreator?: string | null }> = [];

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

  const { enrollments, certificates, courses } = await getDashboardData(userId);
  const activeEnrollments = enrollments.filter((e) => e.status === "active");
  const activeEnrollment = activeEnrollments[0];
  const activeCourse = activeEnrollment
    ? courses.find((c) => c.id === activeEnrollment.courseId) ?? seedCourses[0]
    : seedCourses[0];
  const activeProgress = activeEnrollment?.progressPercentage ?? 0;

  const enrolledCourseIds = new Set(enrollments.map((e) => e.courseId));
  const recommendations =
    courses.length > 0 ? courses.filter((c) => !enrolledCourseIds.has(c.id)).slice(0, 3) : seedCourses.slice(0, 3);

  const firstName = userName.split(" ")[0] || "Learner";

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-primary">Today in Siftara</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Welcome back, {firstName}.</h1>
        </div>
        <Button variant="outline" asChild>
          <Link href="/my-sift">
            <LinkIcon className="h-4 w-4" />
            Check a learning link
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border/70 bg-[#0d1117] text-white dark:bg-card">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Route className="h-4 w-4 text-primary" />
              Continue learning
            </div>
            <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{activeCourse.title}</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
                  {activeEnrollment
                    ? `Next checkpoint is unlocked after this module. Current path progress is ${activeProgress}%.`
                    : "Choose a curated path or create your first My Sift to start building learning evidence."}
                </p>
              </div>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary-dark">
                <Link href={activeEnrollment ? `/learn/${activeCourse.id}` : "/courses"}>
                  {activeEnrollment ? "Continue lesson" : "Start a path"}
                  <Play className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["Progress", `${activeProgress}%`],
                ["Certificates", `${certificates.length}`],
                ["Next action", activeEnrollment ? "Lesson" : "Pick path"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-white/55">{label}</p>
                  <p className="mt-1 text-lg font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <SiftMapArtifact
          compact
          nodes={[
            { label: "Start", detail: activeEnrollment ? "Completed" : "Choose a path", status: activeEnrollment ? "complete" : "current" },
            { label: activeCourse.title, detail: activeEnrollment ? `${activeProgress}% complete` : "Ready to enroll", status: activeEnrollment ? "current" : "locked" },
            { label: "Checkpoint", detail: "Quiz unlock", status: "checkpoint" },
            { label: "Certificate", detail: "Signed proof", status: "certificate" },
          ]}
          className="min-h-full"
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-border/70">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge variant="secondary" className="gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  My Sift
                </Badge>
                <h2 className="mt-4 text-xl font-semibold">Turn your own playlist into a path.</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Siftara checks the link first. Your free use is consumed only after a path is successfully created.
                </p>
              </div>
            </div>
            <Link
              href="/my-sift"
              className="mt-5 flex items-center gap-3 rounded-lg border bg-muted/50 px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <LinkIcon className="h-4 w-4" />
              Paste a YouTube learning URL
              <ArrowRight className="ml-auto h-4 w-4 text-primary" />
            </Link>
          </CardContent>
        </Card>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recommended next</h2>
            <Button variant="ghost" size="sm" asChild className="text-primary">
              <Link href="/courses">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {recommendations.map((course) => (
              <Link key={course.id} href={`/courses/${course.slug}`} className="group block">
                <Card className="h-full border-border/70 transition-colors hover:border-primary/40">
                  <CardContent className="p-4">
                    <CourseSignalCover title={course.title} difficulty={course.difficulty} className="mb-4 h-24" />
                    <h3 className="font-semibold transition-colors group-hover:text-primary">{course.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{course.description}</p>
                    <p className="mt-4 flex items-center gap-1.5 text-xs text-primary">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Checkpoint gated
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
