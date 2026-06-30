import Link from "next/link";
import { ArrowRight, Award, BarChart3, Megaphone, Share2, Sparkles } from "lucide-react";
import { launchMetrics } from "@/lib/growth/phase-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LaunchPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        <div>
          <Badge variant="secondary" className="mb-4 gap-1.5">
            <Megaphone className="h-3.5 w-3.5" />
            Public beta launch kit
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Siftara turns free learning into guided, verified progress.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Product Hunt-ready positioning, share loops, certificate proof, My Sift messaging, and launch metrics in one place.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="gap-2">
              <Link href="/my-sift">
                Try My Sift
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="gap-2">
              <Link href="/certificates/verify/SIFT-REACT-MASTERY-DEMO">
                View proof
                <Award className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Launch Readiness
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {launchMetrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border bg-muted/30 p-4">
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-sm font-medium">{metric.label}</p>
                <p className="text-xs text-muted-foreground">{metric.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {[
          {
            icon: Sparkles,
            title: "Product Hunt one-liner",
            text: "Siftara turns free YouTube courses into AI-guided learning paths with quizzes, roadmaps, progress, and free certificates.",
          },
          {
            icon: Share2,
            title: "Viral proof loops",
            text: "Shareable certificate pages, public learner profiles, and completed-path badges bring learners back into Siftara.",
          },
          {
            icon: Award,
            title: "Trust messaging",
            text: "Certificates verify Siftara learning evidence, not YouTube ownership or creator endorsement.",
          },
        ].map((item) => (
          <Card key={item.title} className="border-border/50">
            <CardContent className="p-6">
              <item.icon className="h-5 w-5 text-primary" />
              <h2 className="mt-4 font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
