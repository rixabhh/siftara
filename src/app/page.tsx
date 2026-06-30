"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, FadeInStagger, StaggerItem } from "@/components/animations";
import { BrandIcon } from "@/components/brand-icons";
import { SiftaraLogo } from "@/components/siftara-logo";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Brain,
  Trophy,
  Zap,
  Route,
  Clock,
  Users,
  Play,
  ShieldCheck,
  Shield,
  Flame,
  Target,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-transparent to-violet-50/50 dark:from-emerald-950/30 dark:via-transparent dark:to-violet-950/20" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Left: Text Content */}
            <FadeIn>
              <Badge variant="secondary" className="mb-5 gap-1.5 px-3 py-1">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                AI-powered learning paths
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Learn from the best free courses{" "}
                <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-violet-500 bg-clip-text text-transparent">
                  without getting lost.
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-lg">
                Siftara curates high-quality free learning content and transforms it into
                structured, AI-guided paths with roadmaps, quizzes, and free certificates.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-12 px-6 text-base" asChild>
                  <Link href="/courses" className="gap-2">
                    Explore Curated Paths
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-6 text-base" asChild>
                  <Link href="/my-sift" className="gap-2">
                    <Play className="h-4 w-4" />
                    Create My Sift
                  </Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                {[
                  { icon: CheckCircle2, text: "Free certificates" },
                  { icon: CheckCircle2, text: "1 free My Sift" },
                  { icon: CheckCircle2, text: "No credit card" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-1.5">
                    <item.icon className="h-4 w-4 text-emerald-500" />
                    {item.text}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 px-3 py-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-xs font-medium">Early access — free to start</span>
                </div>
              </div>
            </FadeIn>

            {/* Right: Product Showcase */}
            <FadeIn delay={0.2}>
              <div className="relative">
                <Card className="border-border/50 shadow-2xl shadow-emerald-500/5">
                  <CardContent className="p-6">
                    {/* Feature badges row */}
                    <div className="flex items-center gap-2 mb-5">
                      <div className="flex items-center gap-1.5 rounded-full bg-violet-500/5 border border-violet-500/10 px-3 py-1.5">
                        <Sparkles className="h-3 w-3 text-violet-500" />
                        <span className="text-xs font-medium">Sift Score: 92</span>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-full bg-amber-500/5 border border-amber-500/10 px-3 py-1.5">
                        <Trophy className="h-3 w-3 text-amber-500" />
                        <span className="text-xs font-medium">Certificate</span>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 px-3 py-1.5">
                        <Flame className="h-3 w-3 text-emerald-500" />
                        <span className="text-xs font-medium">12-day streak</span>
                      </div>
                    </div>

                    {/* Course progress card */}
                    <div className="rounded-xl border border-border/50 bg-muted/30 p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold">React Mastery</p>
                            <p className="text-xs text-muted-foreground">Module 3 · Lesson 2 of 9</p>
                          </div>
                        </div>
                        <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                          75%
                        </Badge>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden mb-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Route className="h-3.5 w-3.5" />
                          <span>6 of 9 lessons done</span>
                        </div>
                        <span>Next: Module 4 Quiz</span>
                      </div>
                    </div>

                    {/* Bottom stats */}
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {[
                        { label: "Skills", value: "5", icon: Zap, color: "text-blue-500" },
                        { label: "Quizzes", value: "3/4", icon: Brain, color: "text-violet-500" },
                        { label: "Time left", value: "1.5h", icon: Clock, color: "text-amber-500" },
                      ].map((stat) => (
                        <div key={stat.label} className="rounded-lg border border-border/50 p-3 text-center">
                          <stat.icon className={`h-4 w-4 mx-auto mb-1 ${stat.color}`} />
                          <p className="text-sm font-semibold">{stat.value}</p>
                          <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <FadeInStagger className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <StaggerItem>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Built with
              </p>
            </StaggerItem>
            {(["react", "typescript", "python", "tailwindcss", "nodejs", "figma"] as const).map(
              (icon) => (
                <StaggerItem key={icon}>
                  <div className="text-muted-foreground/40 hover:text-muted-foreground transition-colors">
                    <BrandIcon brand={icon} className="h-6 w-6" />
                  </div>
                </StaggerItem>
              )
            )}
          </FadeInStagger>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInStagger className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: "Free", label: "Curated Courses", icon: BookOpen },
              { value: "Free", label: "Certificates", icon: Trophy },
              { value: "1 Free", label: "My Sift", icon: Sparkles },
              { value: "Public", label: "Verification", icon: ShieldCheck },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <Card className="border-border/50 text-center">
                  <CardContent className="pt-6 pb-6">
                    <stat.icon className="h-5 w-5 mx-auto text-primary mb-2" />
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <Badge variant="outline" className="mb-4">
              The Problem
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              YouTube has great courses, but learners get lost.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              The problem is not content availability. It&apos;s structure, accountability,
              assessment, and proof of completion.
            </p>
          </FadeIn>

          <FadeInStagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: Clock, title: "No time estimates", desc: "You don't know how long courses take", color: "bg-red-500/10 text-red-500" },
              { icon: Route, title: "No roadmap", desc: "Random playlists with no order", color: "bg-orange-500/10 text-orange-500" },
              { icon: Zap, title: "No progress", desc: "Can't track what you've learned", color: "bg-amber-500/10 text-amber-500" },
              { icon: Brain, title: "No assessment", desc: "No way to test your knowledge", color: "bg-violet-500/10 text-violet-500" },
              { icon: Trophy, title: "No proof", desc: "Nothing to show for your effort", color: "bg-pink-500/10 text-pink-500" },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <Card className="h-full text-center border-border/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6 pb-6">
                    <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                      <item.icon className="h-6 w-6" />
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

      {/* Solution */}
      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <Badge variant="outline" className="mb-4">
              The Solution
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Siftara adds the missing learning layer.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Human-curated content meets AI-powered structure. Every path is guided,
              trackable, assessable, and certifiable.
            </p>
          </FadeIn>

          <FadeInStagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: Users, title: "Human-curated", desc: "Quality content, hand-picked", color: "bg-emerald-500/10 text-emerald-500" },
              { icon: Brain, title: "AI-guided", desc: "Smart structure and pacing", color: "bg-blue-500/10 text-blue-500" },
              { icon: Zap, title: "Quizzes", desc: "Test as you learn", color: "bg-amber-500/10 text-amber-500" },
              { icon: Route, title: "Roadmaps", desc: "See your entire journey", color: "bg-violet-500/10 text-violet-500" },
              { icon: Trophy, title: "Certificates", desc: "Verified proof of completion", color: "bg-rose-500/10 text-rose-500" },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <Card className="h-full text-center border-border/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6 pb-6">
                    <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                      <item.icon className="h-6 w-6" />
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

      {/* How It Works */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <Badge variant="outline" className="mb-4">
              How It Works
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              From content to certification.
            </h2>
          </FadeIn>

          <FadeInStagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { step: "01", title: "Choose or paste", desc: "Pick a path or paste a YouTube link", icon: Target },
              { step: "02", title: "AI structures it", desc: "Modules, lessons, and quizzes built", icon: Brain },
              { step: "03", title: "Follow the roadmap", desc: "Learn at your own pace", icon: Route },
              { step: "04", title: "Pass checkpoints", desc: "Quizzes verify your knowledge", icon: Shield },
              { step: "05", title: "Earn proof", desc: "Free, shareable certificate", icon: Trophy },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <Card className="h-full border-border/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* My Sift CTA */}
      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden border-border/50 shadow-xl">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <Badge variant="secondary" className="mb-4 gap-1.5">
                    <Zap className="h-3.5 w-3.5" />
                    My Sift
                  </Badge>
                  <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Turn any YouTube playlist into a structured course.
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    Paste a learning link. Siftara checks if it&apos;s educational, then AI
                    generates a personalized roadmap with modules, quizzes, and a schedule.
                  </p>
                  <div className="mt-8">
                    <Button size="lg" className="h-12 px-6" asChild>
                      <Link href="/my-sift" className="gap-2">
                        Try My Sift Free
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Your first My Sift is free. No credit card required.
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-primary/5 to-violet-500/5 p-8 lg:p-12 flex items-center justify-center">
                  <div className="w-full max-w-sm space-y-4">
                    <Card className="border-border/50 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Play className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">React Tutorial for Beginners</p>
                            <p className="text-xs text-muted-foreground">32 videos · 8.5 hours</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <div className="flex justify-center">
                      <motion.div
                        animate={{ y: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      >
                        <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90" />
                      </motion.div>
                    </div>
                    <Card className="border-primary/20 bg-primary/5 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Route className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">React Mastery Path</p>
                            <p className="text-xs text-muted-foreground">6 modules · 18 lessons</p>
                          </div>
                        </div>
                        <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full w-0 rounded-full bg-primary" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <Badge variant="outline" className="mb-4">
              Free Certificates
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Proof should never be paywalled.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Earn verified certificates after completing learning paths and passing assessments.
              Share them on LinkedIn, resumes, or anywhere.
            </p>
            <div className="mt-10">
              <Button size="lg" className="h-12 px-6" asChild>
                <Link href="/courses" className="gap-2">
                  Start Learning
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              FAQ
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>
          </FadeIn>
          <FadeInStagger className="space-y-4">
            {[
              {
                q: "Is Siftara affiliated with YouTube?",
                a: "No. Siftara curates and structures publicly available free learning content. We use official YouTube embeds and do not rehost any videos.",
              },
              {
                q: "Are certificates really free?",
                a: "Yes. Certificates are free for all learners. You earn them by completing structured learning paths and passing assessments.",
              },
              {
                q: "What is My Sift?",
                a: "My Sift lets you paste your own YouTube playlist or video link. Siftara checks if it's educational, then AI turns it into a structured learning path with roadmaps, quizzes, and progress tracking.",
              },
              {
                q: "Can any video become a course?",
                a: "No. Siftara's Sift Check evaluates educational intent. Entertainment, music, or non-learning content will be rejected.",
              },
              {
                q: "How is this different from just watching YouTube?",
                a: "Siftara adds structure, progress tracking, quizzes, assessments, and certificates. You don't just watch — you learn, practice, and prove.",
              },
            ].map((item) => (
              <StaggerItem key={item.q}>
                <Card className="border-border/50 hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold">{item.q}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {item.a}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <SiftaraLogo className="h-14 w-14 mx-auto mb-6" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to transform how you learn?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start learning with structure. Free courses, free certificates, and one free My Sift.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" className="h-12 px-6" asChild>
                <Link href="/courses" className="gap-2">
                  Explore Courses
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
