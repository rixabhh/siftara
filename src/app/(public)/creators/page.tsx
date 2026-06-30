import { BarChart3, CheckCircle2, ShieldCheck, Video } from "lucide-react";
import { creatorPipeline } from "@/lib/growth/phase-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreatorsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <Badge variant="secondary" className="mb-4 gap-1.5">
          <Video className="h-3.5 w-3.5" />
          Creator partnerships
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">Turn creator playlists into structured learning paths.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Creator content stays credited. Siftara adds roadmap structure, assessments, trust policy, and learner analytics after review.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Creator Course Pipeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {creatorPipeline.map((item) => (
              <div key={item.path} className="rounded-xl border p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-semibold">{item.path}</h2>
                    <p className="text-sm text-muted-foreground">{item.creator}</p>
                  </div>
                  <Badge variant={item.status === "Curated" ? "default" : "secondary"}>{item.status}</Badge>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Quality score {item.quality}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Creator Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Learner starts and completion rate",
              "Certificate count by course",
              "Quiz quality feedback",
              "Suggested course improvements",
            ].map((item) => (
              <div key={item} className="flex gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
