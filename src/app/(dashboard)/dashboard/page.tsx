import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { seedCourses } from "@/lib/db/seed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Trophy,
  Flame,
  Zap,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
        <p className="mt-1 text-muted-foreground">What would you like to learn today?</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          { label: "Active Courses", value: "0", icon: BookOpen, color: "text-emerald-500" },
          { label: "Completed", value: "0", icon: CheckCircle2, color: "text-blue-500" },
          { label: "Certificates", value: "0", icon: Trophy, color: "text-amber-500" },
          { label: "Streak", value: "0 days", icon: Flame, color: "text-orange-500" },
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

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Continue Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {seedCourses.slice(0, 3).map((course) => (
                <Link key={course.id} href={`/learn/${course.id}`} className="group block">
                  <div className="flex items-center gap-4 rounded-xl border p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <Badge variant="secondary" className="text-xs shrink-0">
                          {course.difficulty}
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-3">
                        <Progress value={0} className="h-1.5 flex-1" />
                        <span className="text-xs text-muted-foreground shrink-0">0%</span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4" asChild>
              <Link href="/my-sift">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 shrink-0">
                  <Zap className="h-5 w-5 text-violet-500" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Create My Sift</p>
                  <p className="text-xs text-muted-foreground">Turn any playlist into a course</p>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4" asChild>
              <Link href="/courses">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 shrink-0">
                  <Sparkles className="h-5 w-5 text-emerald-500" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Explore Courses</p>
                  <p className="text-xs text-muted-foreground">Browse curated learning paths</p>
                </div>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Upcoming</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
              <Clock className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Start a course to see your upcoming lessons and quizzes here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
