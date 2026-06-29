"use client";

import { useState } from "react";
import { Link as LinkIcon, ArrowRight } from "lucide-react";
import { SiftCheck, SiftScoreCard } from "@/components/my-sift/sift-check";
import { GoalInterview } from "@/components/my-sift/goal-interview";

type Step = "input" | "checking" | "score" | "goal" | "roadmap";

export default function MySiftPage() {
  const [step, setStep] = useState<Step>("input");
  const [url, setUrl] = useState("");
  const [siftResult, setSiftResult] = useState<{ score: number; status: "approved" | "needs_clarification" | "notes_only" | "rejected"; reason: string; signals: string[] } | null>(null);

  function handleCheck() {
    if (!url) return;
    setStep("checking");
  }

  function handleSiftComplete(result: { score: number; status: "approved" | "needs_clarification" | "notes_only" | "rejected"; reason: string; signals: string[] }) {
    setSiftResult(result);
    setStep("score");
  }

  function handleGoalComplete(answers: Record<string, string>) {
    void answers;
    setStep("roadmap");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {step === "input" && (
        <>
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground">My Sift</h1>
            <p className="mt-3 text-lg text-text-secondary">
              Paste a learning playlist. Siftara checks it, structures it, and turns it into your personal course.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
            <label htmlFor="youtube-url" className="block text-sm font-medium text-foreground mb-2">
              YouTube video or playlist URL
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <input
                  id="youtube-url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://youtube.com/playlist?list=..."
                  className="w-full rounded-md border border-border bg-background pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
              <button
                onClick={handleCheck}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
              >
                Check
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-xs text-text-secondary">
              Your first My Sift is free. Siftara will verify if the content is educational.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="text-xl font-semibold text-foreground text-center mb-8">How My Sift works</h2>
            <div className="space-y-6">
              {[
                { step: "1", title: "Paste your link", description: "Share a YouTube video or playlist you want to learn from." },
                { step: "2", title: "Siftara checks it", description: "Our AI evaluates if the content is educational." },
                { step: "3", title: "Tell us your goals", description: "Answer a few quick questions about your learning goals." },
                { step: "4", title: "Get your roadmap", description: "Receive a personalized learning path." },
                { step: "5", title: "Learn and earn proof", description: "Follow the path and earn a free certificate." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-text-secondary">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {step === "checking" && <SiftCheck url={url} onComplete={handleSiftComplete} />}

      {step === "score" && siftResult && (
        <SiftScoreCard
          result={siftResult}
          onContinue={() => setStep("goal")}
        />
      )}

      {step === "goal" && <GoalInterview onComplete={handleGoalComplete} />}

      {step === "roadmap" && (
        <div className="rounded-2xl border border-border bg-surface p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <ArrowRight className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-foreground">Roadmap Generated!</h2>
          <p className="mt-2 text-text-secondary">Your personalized learning path is ready.</p>
          <button className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-dark transition-colors">
            Start Learning
          </button>
        </div>
      )}
    </div>
  );
}
