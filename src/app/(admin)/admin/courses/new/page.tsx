"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = ["Development", "Design", "AI Tools", "Data", "Marketing"];
const difficulties = ["beginner", "intermediate", "advanced"];

export default function NewCoursePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "Development",
    difficulty: "beginner",
    estimatedMinutes: 60,
    sourceCreator: "",
    sourceUrl: "",
  });

  function updateField(field: string, value: string | number) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title" && !prev.slug) {
        next.slug = value.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.description) return;
    setSaving(true);
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/admin/courses");
      }
    } catch {} finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Button variant="ghost" size="sm" asChild className="mb-2 gap-2">
        <Link href="/admin/courses">
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Link>
      </Button>

      <h1 className="text-3xl font-bold tracking-tight mb-8">Create New Course</h1>

      <form onSubmit={handleSubmit}>
        <Card className="border-border/50 mb-6">
          <CardHeader>
            <CardTitle>Course Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="e.g. React Mastery"
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                placeholder="react-mastery"
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring font-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Describe what learners will achieve..."
                rows={3}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1.5">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Badge
                      key={cat}
                      variant={form.category === cat ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => updateField("category", cat)}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Difficulty</label>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((diff) => (
                    <Badge
                      key={diff}
                      variant={form.difficulty === diff ? "default" : "secondary"}
                      className="cursor-pointer capitalize"
                      onClick={() => updateField("difficulty", diff)}
                    >
                      {diff}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1.5">Estimated Minutes</label>
                <input
                  type="number"
                  value={form.estimatedMinutes}
                  onChange={(e) => updateField("estimatedMinutes", parseInt(e.target.value) || 0)}
                  min={0}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Source Creator</label>
                <input
                  type="text"
                  value={form.sourceCreator}
                  onChange={(e) => updateField("sourceCreator", e.target.value)}
                  placeholder="e.g. Traversy Media"
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" disabled={saving || !form.title || !form.description} className="gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? "Creating..." : "Create Course"}
          </Button>
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/courses">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
