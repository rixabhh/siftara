"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, FadeInStagger, StaggerItem } from "@/components/animations";
import { SiftaraLogo } from "@/components/siftara-logo";
import {
  ArrowRight,
  BookOpen,
  Route,
  ShieldCheck,
  Play,
  FileCheck,
  Target,
  Sparkles,
  Clock,
  Trophy,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-32 lg:px-8">
          <div className="max-w-3xl">
            <FadeIn>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Learn from free courses without losing the plot.
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-xl">
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
              <p className="mt-6 text-sm text-muted-foreground">
                Free certificates. One free My Sift during early access.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Free content is everywhere. Structure is not.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              YouTube has excellent courses. But without roadmaps, quizzes, progress, and proof, most learners never finish.
            </p>
          </FadeIn>

          <FadeInStagger className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Route, title: "No roadmap", desc: "Random playlists with no clear order" },
              { icon: FileCheck, title: "No checkpoints", desc: "No way to test what you actually learned" },
              { icon: ShieldCheck, title: "No proof", desc: "Nothing to show for your effort" },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <Card className="h-full border-border/50">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* My Sift */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <Badge variant="secondary" className="mb-4 gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                My Sift
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Your own playlist, turned into a path.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Paste a learning link. Siftara checks if it is actually educational,
                asks what you want to achieve, then builds a roadmap around it.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Non-learning content is rejected. Your free My Sift is used only after a path is successfully created.
              </p>
              <div className="mt-8">
                <Button size="lg" className="h-12 px-6" asChild>
                  <Link href="/my-sift" className="gap-2">
                    Create My Sift
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card className="border-border/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3 rounded-lg border bg-background p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Play className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">React Tutorial for Beginners</p>
                      <p className="text-xs text-muted-foreground">32 videos · 8.5 hours</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90" />
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Route className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">React Mastery Path</p>
                      <p className="text-xs text-muted-foreground">6 modules · 18 lessons</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              From content to certification.
            </h2>
          </FadeIn>

          <FadeInStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { step: "01", title: "Choose or paste", desc: "Pick a path or paste a YouTube link", icon: Target },
              { step: "02", title: "Siftara checks it", desc: "Learning signals validated", icon: ShieldCheck },
              { step: "03", title: "Follow the roadmap", desc: "Learn at your own pace", icon: Route },
              { step: "04", title: "Pass checkpoints", desc: "Quizzes verify your knowledge", icon: FileCheck },
              { step: "05", title: "Earn proof", desc: "Free, verifiable certificate", icon: Trophy },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <Card className="h-full border-border/50">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                      {item.step}
                    </div>
                    <h3 className="mt-4 font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Curated Paths */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Curated before it becomes a course.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We start with content worth learning from, then add structure around it.
            </p>
          </FadeIn>

          <FadeInStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "React Mastery", category: "Development", difficulty: "Intermediate", lessons: 9, creator: "Traversy Media" },
              { title: "Python Fundamentals", category: "Development", difficulty: "Beginner", lessons: 6, creator: "Programming with Mosh" },
              { title: "AI Tools for Developers", category: "AI Tools", difficulty: "Intermediate", lessons: 4, creator: "Fireship" },
            ].map((course) => (
              <StaggerItem key={course.title}>
                <Link href="/courses" className="group">
                  <Card className="h-full border-border/50 hover:shadow-md transition-shadow">
                    <CardContent className="pt-6 pb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary">{course.category}</Badge>
                        <Badge variant="outline">{course.difficulty}</Badge>
                      </div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {course.lessons} lessons
                        </span>
                        <span>{course.creator}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </FadeInStagger>

          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/courses" className="gap-2">
                Browse all paths
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Certificates that are free, signed, and verifiable.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A Siftara certificate is issued only after the required checkpoints
              are completed. Each one has a unique ID, verification link, and digital signature.
            </p>
            <div className="mt-10">
              <Button size="lg" className="h-12 px-6" asChild>
                <Link href="/how-verification-works" className="gap-2">
                  See how verification works
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Verification for Recruiters */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built for the person checking the certificate too.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Recruiters and reviewers can open the verification page to see what was completed,
              how the certificate was issued, and what it does — and does not — prove.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" className="h-12 px-6" asChild>
                <Link href="/certificates/verify/SIFT-REACT-MASTERY-DEMO" className="gap-2">
                  Verify a certificate
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6" asChild>
                <Link href="/how-verification-works">
                  How verification works
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Early Access Note */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <Card className="border-border/50">
              <CardContent className="p-8">
                <Badge variant="secondary" className="mb-4 gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  Early access
                </Badge>
                <h2 className="text-2xl font-bold tracking-tight">
                  Free while we build. Limited where AI costs money.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Curated paths, quizzes, progress tracking, and certificates are free.
                  Your first My Sift is free during early access. More My Sifts and advanced AI features will come later.
                </p>
                <div className="mt-8">
                  <Button size="lg" className="h-12 px-6" asChild>
                    <Link href="/courses" className="gap-2">
                      Start learning free
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 sm:py-20 border-t">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <SiftaraLogo className="h-10 w-10 mx-auto mb-4" />
            <h2 className="text-2xl font-bold tracking-tight">
              Ready to stop collecting and start finishing?
            </h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" className="h-12 px-6" asChild>
                <Link href="/courses" className="gap-2">
                  Explore paths
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6" asChild>
                <Link href="/my-sift">Try My Sift</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
