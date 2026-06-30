"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn, FadeInStagger, StaggerItem } from "@/components/animations";
import { SiftaraLogo } from "@/components/siftara-logo";
import {
  ArrowRight,
  Route,
  ShieldCheck,
  Play,
  FileCheck,
  Trophy,
  Info,
  Search,
  Map,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Early access banner */}
      <div className="border-b bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Info className="h-3.5 w-3.5" />
            <span>Siftara is in early access. Core paths and certificates are free.</span>
          </div>
        </div>
      </div>

      {/* Hero — two-column with product visual */}
      <section>
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] leading-[1.1]">
                Learn from free courses without losing the plot.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                Siftara turns carefully chosen learning videos into guided paths
                with checkpoints, progress, and free verified certificates.
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
            </FadeIn>

            {/* Product visual — SiftMap representation */}
            <FadeIn delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-border aspect-[4/3] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                <div className="relative flex flex-col items-center gap-6 p-8">
                  {/* SiftMap visual */}
                  <div className="relative w-full max-w-xs">
                    {/* Path line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20" />
                    {/* Nodes */}
                    <div className="space-y-6 relative">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white z-10">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Sift Check</p>
                          <p className="text-xs text-muted-foreground">Validate learning content</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white z-10">
                          <Route className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Build Roadmap</p>
                          <p className="text-xs text-muted-foreground">Modules and checkpoints</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-pink text-white z-10">
                          <FileCheck className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Pass Checkpoints</p>
                          <p className="text-xs text-muted-foreground">Verify your knowledge</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-olive text-white z-10">
                          <Trophy className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Earn Certificate</p>
                          <p className="text-xs text-muted-foreground">Verified and signed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* The Signal in the Noise — three pillars */}
      <section className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              The Signal in the Noise
            </h2>
          </FadeIn>

          <FadeInStagger className="grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: Search,
                title: "Sift Check",
                desc: "We validate external learning links, ensuring resources are active, relevant, and high quality before you start.",
              },
              {
                icon: Map,
                title: "Roadmap",
                desc: "Visual paths that guide you through curated content step-by-step, providing calm momentum without overwhelming choices.",
              },
              {
                icon: ShieldCheck,
                title: "Verified",
                desc: "Complete paths with checkpoints to earn a digital signature certificate, providing verifiable proof of your learning journey.",
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="text-center px-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted mb-6">
                    <item.icon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <SiftaraLogo className="h-8 w-8 mb-3" />
              <p className="text-sm text-muted-foreground">Curated learning paths from free content. Checkpoints, progress, and free verified certificates.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="gap-2" asChild>
                <Link href="/courses">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
