"use client";

import { useState, useEffect } from "react";
import { Search, CheckCircle, AlertTriangle, XCircle, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";

interface SiftCheckResult {
  score: number;
  status: "approved" | "needs_clarification" | "notes_only" | "rejected";
  reason: string;
  signals: string[];
}

interface SiftCheckProps {
  url: string;
  onComplete: (result: SiftCheckResult) => void;
}

export function SiftCheck({ url, onComplete }: SiftCheckProps) {
  const [phase, setPhase] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const phases = [
    "Syft is checking title...",
    "Syft is analyzing description...",
    "Syft is evaluating playlist structure...",
    "Syft is assessing learning intent...",
    "Syft is scoring suitability...",
  ];

  useEffect(() => {
    let cancelled = false;

    async function runCheck() {
      try {
        for (let i = 0; i < phases.length - 1; i++) {
          if (cancelled) return;
          await new Promise((resolve) => setTimeout(resolve, 800));
          if (cancelled) return;
          setPhase(i + 1);
        }

        await new Promise((resolve) => setTimeout(resolve, 600));
        if (cancelled) return;

        const response = await api.ai.siftCheck({ url });
        if (!cancelled) {
          onComplete(response.result as SiftCheckResult);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Syft check failed");
          onComplete({
            score: 50,
            status: "needs_clarification",
            reason: "Could not evaluate content automatically. Please provide more details.",
            signals: ["Automated evaluation incomplete"],
          });
        }
      }
    }

    runCheck();
    return () => { cancelled = true; };
  }, [url, onComplete, phases.length]);

  return (
    <div className="rounded-2xl border border-border bg-surface p-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-violet/10">
        <Search className="h-8 w-8 text-accent-violet animate-pulse" />
      </div>
      <h2 className="mt-6 text-xl font-semibold text-foreground">Syft Check in Progress</h2>
      <p className="mt-2 text-sm text-text-secondary">Syft is analyzing your content for educational value</p>

      <div className="mt-8 space-y-3 text-left max-w-sm mx-auto">
        {phases.map((p, idx) => (
          <div key={idx} className="flex items-center gap-3">
            {idx < phase ? (
              <CheckCircle className="h-4 w-4 text-primary shrink-0" />
            ) : idx === phase ? (
              <div className="h-4 w-4 rounded-full border-2 border-accent-violet border-t-transparent animate-spin shrink-0" />
            ) : (
              <div className="h-4 w-4 rounded-full border border-border shrink-0" />
            )}
            <span className={`text-sm ${idx <= phase ? "text-foreground" : "text-text-secondary/50"}`}>
              {p}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <p className="mt-4 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}

interface SiftScoreCardProps {
  result: SiftCheckResult;
  onContinue: () => void;
}

export function SiftScoreCard({ result, onContinue }: SiftScoreCardProps) {
  const statusConfig = {
    approved: { icon: CheckCircle, color: "text-primary", bg: "bg-primary/10", label: "Approved" },
    needs_clarification: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", label: "Needs Clarification" },
    notes_only: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", label: "Notes Only" },
    rejected: { icon: XCircle, color: "text-error", bg: "bg-error/10", label: "Not Suitable" },
  };

  const config = statusConfig[result.status];
  const StatusIcon = config.icon;

  return (
    <div className="rounded-2xl border border-border bg-surface p-8">
      <div className="text-center">
        <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${config.bg}`}>
          <span className={`text-3xl font-bold ${config.color}`}>{result.score}</span>
        </div>
        <div className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 ${config.bg}`}>
          <StatusIcon className={`h-4 w-4 ${config.color}`} />
          <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-text-secondary">{result.reason}</p>

      <div className="mt-6 space-y-2">
        {result.signals.map((signal, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm text-foreground">
            <CheckCircle className="h-4 w-4 text-primary shrink-0" />
            {signal}
          </div>
        ))}
      </div>

      {result.status !== "rejected" && (
        <button
          onClick={onContinue}
          className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
        >
          Continue to Goal Interview
          <ArrowRight className="h-4 w-4" />
        </button>
      )}

      {result.status === "rejected" && (
        <div className="mt-6 rounded-xl bg-surface-soft p-4 text-center">
          <p className="text-sm text-text-secondary">
            This content doesn&apos;t meet our educational criteria. Try a tutorial, guide, or course playlist instead.
          </p>
        </div>
      )}
    </div>
  );
}
