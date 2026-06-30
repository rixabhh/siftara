"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, FadeInStagger, StaggerItem } from "@/components/animations";
import { SiftaraLogo } from "@/components/siftara-logo";
import {
  ArrowRight,
  Route,
  ShieldCheck,
  Play,
  FileCheck,
  Target,
  Trophy,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero — clean, product-led */}
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 sm:pt-32 sm:pb-28 lg:px-8">
          <div className="max-w-2xl">
            <FadeIn>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] leading-[1.1]">
                Learn from free courses without losing the plot.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Siftara turns carefully chosen learning videos into guided paths
                with checkpoints, progress, and free verified certificates.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-12 px-6 text-base" asChild>
                  <Link href="/courses" className="gap-2">
                    Explore paths
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-6 text-base" asChild>
                  <Link href="/my-sift" className="gap-2">
                    <Play className="h-4 w-4" />
                    Try My Sift
                  </Link>
                </Button>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">
                Free certificates. One free My Sift during early access.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* My Sift — product demo strip */}
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:items-center">
            <FadeIn>
              <Badge variant="secondary" className="mb-4">
                My Sift
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Your own playlist, turned into a path.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg">
                Paste a learning link. Siftara checks if it is actually educational,
                asks what you want to achieve, then builds a roadmap around it.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Non-learning content is rejected. Your free My Sift is used only after a path is created.
              </p>
              <div className="mt-8">
                <Button className="gap-2" asChild>
                  <Link href="/my-sift">
                    Create My Sift
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="rounded-xl border bg-muted/40 p-6 space-y-3">
                <div className="flex items-center gap-3 rounded-lg border bg-background p-4">
                  <Play className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">React Tutorial for Beginners</p>
                    <p className="text-xs text-muted-foreground">32 videos · 8.5 hours</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="h-8 w-px bg-border" />
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <Route className="h-4 w-4 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">React Mastery Path</p>
                    <p className="text-xs text-muted-foreground">6 modules · 18 lessons</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* How Siftara works — editorial flow */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <FadeIn className="mb-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              How Siftara works
            </h2>
          </FadeIn>

          <FadeInStagger className="grid gap-px bg-border rounded-xl overflow-hidden sm:grid-cols-2 lg:grid-cols-5">
            {[
              { step: "01", title: "Choose or paste", desc: "Pick a curated path or paste a YouTube link", icon: Target },
              { step: "02", title: "Syft checks it", desc: "Learning signals are validated", icon: ShieldCheck },
              { step: "03", title: "Follow the roadmap", desc: "Learn at your own pace", icon: Route },
              { step: "04", title: "Pass checkpoints", desc: "Quizzes verify your knowledge", icon: FileCheck },
              { step: "05", title: "Earn proof", desc: "Free, verifiable certificate", icon: Trophy },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div className="bg-background p-6">
                  <div className="text-xs font-mono text-muted-foreground mb-3">{item.step}</div>
                  <item.icon className="h-5 w-5 text-primary mb-3" />
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Curated paths — minimal preview */}
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <FadeIn>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Curated paths
              </h2>
              <p className="mt-2 text-muted-foreground">
                We start with content worth learning from, then add structure.
              </p>
            </FadeIn>
            <FadeIn>
              <Button variant="ghost" size="sm" asChild className="hidden sm:flex gap-1">
                <Link href="/courses">
                  View all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </FadeIn>
          </div>

          <FadeInStagger className="space-y-px">
            {[
              { title: "React Mastery", category: "Development", difficulty: "Intermediate", lessons: 9, creator: "Traversy Media", time: "4.5h" },
              { title: "Python Fundamentals", category: "Development", difficulty: "Beginner", lessons: 6, creator: "Programming with Mosh", time: "6h" },
              { title: "AI Tools for Developers", category: "AI Tools", difficulty: "Intermediate", lessons: 4, creator: "Fireship", time: "2.5h" },
            ].map((course) => (
              <StaggerItem key={course.title}>
                <Link href="/courses" className="group flex items-center justify-between gap-4 rounded-lg border bg-background p-4 sm:p-5 hover:bg-muted/50 transition-colors">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold group-hover:text-primary transition-colors truncate">{course.title}</h3>
                      <Badge variant="secondary" className="text-xs shrink-0">{course.category}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{course.creator}</span>
                      <span>·</span>
                      <span>{course.lessons} lessons</span>
                      <span>·</span>
                      <span>{course.time}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                </Link>
              </StaggerItem>
            ))}
          </FadeInStagger>

          <div className="mt-6 sm:hidden">
            <Button variant="outline" size="sm" asChild className="w-full gap-1">
              <Link href="/courses">
                View all paths
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Certificate trust — single focused block */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Certificates that are free, signed, and verifiable.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg">
                A Siftara certificate is issued only after the required checkpoints
                are completed. Each one has a unique ID, verification link, and digital signature.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button className="gap-2" asChild>
                  <Link href="/how-verification-works">
                    How verification works
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/certificates/verify/SIFT-REACT-MASTERY-DEMO">
                    Try verification
                  </Link>
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="rounded-xl border bg-background p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Verification example</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium text-primary">Verified</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Certificate ID</span>
                    <span className="font-mono text-xs">SIFT-REACT-MASTERY-DEMO</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Digital signature</span>
                    <span className="font-medium text-primary">HMAC-SHA256</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Skills verified</span>
                    <span className="font-medium">5 checkpoints passed</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Early access note — honest, minimal */}
      <section className="border-b">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Free while we build. Limited where AI costs money.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Curated paths, quizzes, progress tracking, and certificates are free.
              Your first My Sift is free. More My Sifts and advanced AI features will come later.
            </p>
            <div className="mt-8">
              <Button className="gap-2" asChild>
                <Link href="/courses">
                  Start learning free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer CTA */}
      <section>
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 text-center">
          <FadeIn>
            <SiftaraLogo className="h-10 w-10 mx-auto mb-4" />
            <h2 className="text-xl font-bold tracking-tight">
              Ready to stop collecting and start finishing?
            </h2>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button className="gap-2" asChild>
                <Link href="/courses">
                  Explore paths
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/my-sift">Try My Sift</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
