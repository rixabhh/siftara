"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, FileQuestion, Info, Play, ShieldCheck } from "lucide-react";
import { FadeIn, FadeInStagger, StaggerItem } from "@/components/animations";
import {
  CertificatePreview,
  ContentToPathGraphic,
  SiftCheckGraphic,
  SiftMapArtifact,
} from "@/components/product-graphics";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const curatedPaths = [
  {
    title: "React Mastery",
    source: "Traversy Media",
    detail: "3 modules, randomized checkpoints, free certificate",
  },
  {
    title: "Python Fundamentals",
    source: "Programming with Mosh",
    detail: "Beginner path with lesson evidence and quiz gates",
  },
  {
    title: "UI Design Essentials",
    source: "DesignCourse",
    detail: "Typography, layout, Figma flow, certificate eligible",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="border-b bg-surface-soft/70">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-1.5 text-xs text-muted-foreground sm:px-6 lg:px-8">
          <Info className="h-3.5 w-3.5 text-primary" />
          <span>Early access: core learning paths and certificates are free. My Sift generation may be queued.</span>
        </div>
      </div>

      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-7 px-4 py-7 sm:px-6 sm:py-9 md:grid-cols-[0.9fr_1.1fr] md:items-center lg:min-h-[calc(100svh-92px)] lg:px-8 lg:py-6">
          <FadeIn>
            <Badge variant="secondary" className="mb-5 gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              Siftara learning layer
            </Badge>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl">
              Learn from free courses without losing the plot.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Siftara turns carefully chosen learning videos into guided paths with checkpoints, progress, and free verified certificates.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="h-12 px-5" asChild>
                <Link href="/courses">
                  Browse learning paths
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-5" asChild>
                <Link href="/my-sift">
                  <Play className="h-4 w-4" />
                  Paste a course link
                </Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
              {["No fake ratings", "Source attribution", "Verification link"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {item}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="md:hidden">
            <div className="rounded-xl border bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">Sift Check ready</p>
                  <p className="mt-1 text-xs text-muted-foreground">Path, checkpoint, proof.</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-bold text-primary">
                  86
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-muted-foreground">
                {["Signals", "SiftMap", "Proof"].map((item) => (
                  <div key={item} className="rounded-lg border bg-muted/40 px-2 py-2">{item}</div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="hidden md:block">
            <div className="grid gap-3 md:grid-cols-[1fr_0.76fr] lg:max-h-[540px]">
              <SiftMapArtifact compact className="sm:row-span-2" />
              <SiftCheckGraphic className="min-h-[210px]" />
              <CertificatePreview className="min-h-[210px]" />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-y bg-surface/70">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:px-8">
          <FadeIn>
            <p className="text-sm font-semibold text-primary">From content chaos to a clear path</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Siftara does not try to index everything.
            </h2>
            <p className="mt-4 text-muted-foreground leading-7">
              We start with learning content worth finishing, then add the missing structure: order, checkpoints, progress, and proof.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ContentToPathGraphic />
          </FadeIn>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <FadeIn className="max-w-2xl">
            <p className="text-sm font-semibold text-primary">Product flow</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Built around learning signals, not hype.
            </h2>
          </FadeIn>
          <FadeInStagger className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Sift Check",
                text: "A pasted link is checked for educational intent before your free My Sift is consumed.",
                icon: ShieldCheck,
              },
              {
                title: "Checkpoints",
                text: "Lessons, quizzes, and reflection evidence decide when the next part of the path opens.",
                icon: FileQuestion,
              },
              {
                title: "Verified proof",
                text: "Certificates include a unique ID, criteria summary, and signature status for reviewers.",
                icon: CheckCircle2,
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="h-full rounded-xl border bg-card p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      <section className="border-y bg-[#0d1117] text-white dark:bg-surface">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <FadeIn>
            <Badge className="mb-5 bg-white/10 text-white hover:bg-white/10">Siftara Verified</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built for the person checking the certificate too.
            </h2>
            <p className="mt-4 leading-7 text-white/70">
              Reviewers can open the proof page to see what was completed, how the certificate was issued, and what it does and does not prove.
            </p>
            <Button variant="secondary" className="mt-7" asChild>
              <Link href="/how-verification-works">
                See verification rules
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </FadeIn>
          <FadeIn delay={0.1}>
            <CertificatePreview className="bg-white text-[#101513]" />
          </FadeIn>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <FadeIn className="max-w-2xl">
              <p className="text-sm font-semibold text-primary">Curated library</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Start with paths that already have structure.</h2>
            </FadeIn>
            <Button variant="outline" asChild>
              <Link href="/courses">
                Explore all paths
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {curatedPaths.map((path) => (
              <div key={path.title} className="rounded-xl border bg-card p-5">
                <p className="font-semibold">{path.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">Source: {path.source}</p>
                <p className="mt-4 text-sm leading-6">{path.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
