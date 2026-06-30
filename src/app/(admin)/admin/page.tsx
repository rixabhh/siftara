import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Route, FileQuestion, Trophy } from "lucide-react";

export default async function AdminPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Manage courses, review AI outputs, and publish content.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          { label: "Published", value: "0", icon: Route, color: "text-emerald-500" },
          { label: "Drafts", value: "0", icon: FileQuestion, color: "text-amber-500" },
          { label: "AI Jobs Pending", value: "0", icon: Brain, color: "text-violet-500" },
          { label: "Total Learners", value: "0", icon: Trophy, color: "text-blue-500" },
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
            <CardTitle className="text-lg">Course Builder</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Create new courses manually or with AI assistance.</p>
            <Button className="gap-2">
              <Sparkles className="h-4 w-4" />
              Create New Course
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">AI Course Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Paste a YouTube URL and let AI generate a course structure.</p>
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

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">AI Agent Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Sift Check", status: "ready" },
              { name: "Curriculum Builder", status: "ready" },
              { name: "Quiz Generator", status: "ready" },
              { name: "Assessment Variants", status: "ready" },
              { name: "Certificate Trust Review", status: "ready" },
              { name: "Roadmap Builder", status: "ready" },
            ].map((agent) => (
              <div key={agent.name} className="flex items-center gap-3 rounded-xl border p-3">
                <div className={`h-2 w-2 rounded-full ${agent.status === "ready" ? "bg-emerald-500" : "bg-amber-500"}`} />
                <div>
                  <p className="text-sm font-medium">{agent.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{agent.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
