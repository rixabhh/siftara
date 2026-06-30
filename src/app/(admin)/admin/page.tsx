import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getDb, schema } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ensureUserExists } from "@/lib/db/user-sync";
import { Sparkles, Brain, Route, FileQuestion, Users, Zap, ShieldCheck } from "lucide-react";

async function getAdminStats() {
  let courses = 0;
  let published = 0;
  let learners = 0;
  try {
    const db = getDb();
    const allCourses = await db.select().from(schema.courses);
    courses = allCourses.length;
    published = allCourses.filter((c) => c.status === "published").length;
    const users = await db.select().from(schema.users);
    learners = users.length;
  } catch {}
  return { courses, published, drafts: courses - published, learners };
}

export default async function AdminPage() {
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

  const stats = await getAdminStats();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Manage courses, review Syft outputs, and publish content.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          { label: "Published", value: stats.published.toString(), icon: Route, color: "text-emerald-500" },
          { label: "Drafts", value: stats.drafts.toString(), icon: FileQuestion, color: "text-amber-500" },
          { label: "Syft Jobs", value: "0", icon: Brain, color: "text-violet-500" },
          { label: "Total Learners", value: stats.learners.toString(), icon: Users, color: "text-blue-500" },
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

      <div className="grid gap-6 sm:grid-cols-2 mb-8">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Course Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Create, edit, and publish courses.</p>
            <Button className="gap-2" asChild>
              <Link href="/admin/courses">
                <Route className="h-4 w-4" />
                Manage Courses
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Syft Course Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Paste a YouTube URL and let Syft generate a course structure.</p>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="YouTube URL"
                className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button className="gap-2">
                <Brain className="h-4 w-4" />
                Generate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Syft Agent Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Sift Check", description: "Evaluates educational content", status: "ready", icon: ShieldCheck },
              { name: "Curriculum Builder", description: "Creates course structures", status: "ready", icon: Route },
              { name: "Quiz Generator", description: "Generates assessment questions", status: "ready", icon: FileQuestion },
              { name: "Roadmap Builder", description: "Builds learning paths", status: "ready", icon: Zap },
            ].map((agent) => (
              <div key={agent.name} className="flex items-start gap-3 rounded-xl border p-4">
                <div className={`h-2 w-2 rounded-full mt-1.5 ${agent.status === "ready" ? "bg-emerald-500" : "bg-amber-500"}`} />
                <div>
                  <div className="flex items-center gap-2">
                    <agent.icon className="h-4 w-4 text-primary" />
                    <p className="text-sm font-medium">{agent.name}</p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{agent.description}</p>
                  <p className="mt-1 text-xs capitalize text-emerald-600">{agent.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="justify-start gap-3 h-auto py-4" asChild>
              <Link href="/admin/courses/new">
                <Sparkles className="h-5 w-5 text-violet-500" />
                <div className="text-left">
                  <p className="font-medium">Create Course</p>
                  <p className="text-xs text-muted-foreground">Add new curated content</p>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="justify-start gap-3 h-auto py-4" asChild>
              <Link href="/admin/certificates">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <div className="text-left">
                  <p className="font-medium">Certificates</p>
                  <p className="text-xs text-muted-foreground">View and manage issued</p>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="justify-start gap-3 h-auto py-4" asChild>
              <Link href="/my-sift">
                <Sparkles className="h-5 w-5 text-violet-500" />
                <div className="text-left">
                  <p className="font-medium">Test My Sift</p>
                  <p className="text-xs text-muted-foreground">Try the Syft flow</p>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="justify-start gap-3 h-auto py-4" asChild>
              <Link href="/certificates/verify/SIFT-REACT-MASTERY-DEMO">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <div className="text-left">
                  <p className="font-medium">Verify Certificate</p>
                  <p className="text-xs text-muted-foreground">Check demo certificate</p>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
