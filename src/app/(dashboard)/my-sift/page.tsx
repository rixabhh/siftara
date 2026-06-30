"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  FileQuestion,
  Link as LinkIcon,
  LockKeyhole,
  Route,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { SiftCheck, SiftScoreCard } from "@/components/my-sift/sift-check";
import { GoalInterview } from "@/components/my-sift/goal-interview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Step = "input" | "checking" | "score" | "goal" | "roadmap" | "upgrade";

type SiftResult = {
  score: number;
  status: "approved" | "needs_clarification" | "notes_only" | "rejected";
  reason: string;
  signals: string[];
};

const roadmap = [
  { title: "Foundation scan", detail: "Understand the topic, prerequisites, and learning outcome.", minutes: 35 },
  { title: "Core lessons", detail: "Follow the strongest videos in order with checkpoint notes.", minutes: 90 },
  { title: "Practice sprint", detail: "Complete a small task and identify weak topics.", minutes: 45 },
  { title: "Randomized assessment", detail: "Pass AI-generated quiz variants before proof is issued.", minutes: 25 },
];

export default function MySiftPage() {
  const [step, setStep] = useState<Step>("input");
  const [url, setUrl] = useState("");
  const [freeUseAvailable, setFreeUseAvailable] = useState(true);
  const [siftResult, setSiftResult] = useState<SiftResult | null>(null);
  const [goalAnswers, setGoalAnswers] = useState<Record<string, string>>({});

  const dailyTime = useMemo(() => goalAnswers["How much time can you study daily?"] ?? "30-60 min", [goalAnswers]);
  const finishWindow = useMemo(() => goalAnswers["How many days do you want to finish in?"] ?? "14 days", [goalAnswers]);

  function handleCheck() {
    if (!url) return;
    if (!freeUseAvailable) {
      setStep("upgrade");
      return;
    }
    setStep("checking");
  }

  function handleSiftComplete(result: SiftResult) {
    setSiftResult(result);
    setStep("score");
  }

  function handleGoalComplete(answers: Record<string, string>) {
    setGoalAnswers(answers);
    setFreeUseAvailable(false);
    setStep("roadmap");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <Badge variant="secondary" className="mb-4 gap-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          My Sift personalization
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight">Turn a learning link into a trusted path</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Siftara verifies educational intent, asks about your goals, builds a roadmap, and gates certificates behind real learning evidence.
        </p>
      </div>

      {step === "input" && (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Paste a YouTube learning URL</CardTitle>
            </CardHeader>
            <CardContent>
              <label htmlFor="youtube-url" className="mb-2 block text-sm font-medium">
                YouTube video or playlist URL
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="youtube-url"
                    type="url"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    placeholder="https://youtube.com/playlist?list=..."
                    className="w-full rounded-lg border bg-background py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <Button onClick={handleCheck} className="h-12 gap-2">
                  Run Sift Check
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Rejected or failed generations do not consume your free My Sift.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Usage & Credits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border bg-primary/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Free My Sift</span>
                  <Badge>{freeUseAvailable ? "Available" : "Used"}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Extra paths use credits. Certificates remain free after trust checks.
                </p>
              </div>
              <Button variant="outline" asChild className="w-full gap-2">
                <Link href="/pricing">
                  <CreditCard className="h-4 w-4" />
                  View credit packs
                </Link>
              </Button>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 grid gap-4 sm:grid-cols-3">
            {[
              { title: "Strict Sift Check", icon: ShieldCheck, text: "Educational score decides certificate eligibility." },
              { title: "Personal schedule", icon: CalendarDays, text: "Roadmap adapts to daily time and target date." },
              { title: "Varied assessment", icon: FileQuestion, text: "Quiz variants reduce random certificate farming." },
            ].map((item) => (
              <Card key={item.title} className="border-border/50">
                <CardContent className="p-5">
                  <item.icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {step === "checking" && <SiftCheck url={url} onComplete={handleSiftComplete} />}

      {step === "score" && siftResult && (
        <SiftScoreCard
          result={siftResult}
          onContinue={() => setStep(siftResult.status === "notes_only" ? "roadmap" : "goal")}
        />
      )}

      {step === "goal" && <GoalInterview onComplete={handleGoalComplete} />}

      {step === "upgrade" && (
        <Card className="mx-auto max-w-2xl border-border/50">
          <CardContent className="p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <LockKeyhole className="h-7 w-7 text-primary" />
            </div>
            <h2 className="mt-4 text-2xl font-semibold">Your free My Sift has been used</h2>
            <p className="mt-2 text-muted-foreground">
              Upgrade when you are ready to transform more learning links into guided paths. Learning and certificates stay free.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild className="gap-2">
                <Link href="/pricing">
                  View credits
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" onClick={() => setStep("input")}>
                Back
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "roadmap" && (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-3">
                <span>Generated SiftMap</span>
                <Badge variant={siftResult?.status === "notes_only" ? "outline" : "default"}>
                  {siftResult?.status === "notes_only" ? "No certificate" : "Certificate eligible"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roadmap.map((node, index) => (
                  <div key={node.title} className="flex gap-4 rounded-xl border bg-muted/30 p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold">{node.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{node.detail}</p>
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {node.minutes} min
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-5" />
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button className="gap-2">
                  <Route className="h-4 w-4" />
                  Start My Sift Path
                </Button>
                <Button variant="outline" onClick={() => setStep("input")}>
                  Create another
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Schedule Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Finish window</p>
                  <p className="text-sm text-muted-foreground">{finishWindow}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Daily time</p>
                  <p className="text-sm text-muted-foreground">{dailyTime}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Assessment policy</p>
                  <p className="text-sm text-muted-foreground">80%+ quiz average plus reflection evidence.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Generation Audit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {(siftResult?.signals ?? ["Tutorial format detected", "Consistent topic coverage"]).map((signal) => (
                  <div key={signal} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {signal}
                  </div>
                ))}
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4 text-primary" />
                  Free My Sift consumed only after successful path creation.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
