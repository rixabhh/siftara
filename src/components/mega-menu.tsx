"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Trophy,
  Route,
  Zap,
  ArrowRight,
  Code,
  Palette,
  Database,
  Megaphone,
} from "lucide-react";

const categories = [
  {
    title: "Development",
    icon: Code,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    items: [
      { label: "React Mastery", href: "/courses/react-mastery", badge: "Popular" },
      { label: "Python Fundamentals", href: "/courses/python-fundamentals" },
      { label: "TypeScript Deep Dive", href: "/courses/typescript-deep-dive", badge: "New" },
      { label: "Node.js Backend", href: "/courses", comingSoon: true },
    ],
  },
  {
    title: "Design",
    icon: Palette,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    items: [
      { label: "UI Design Essentials", href: "/courses/ui-design-essentials" },
      { label: "Figma Masterclass", href: "/courses", comingSoon: true },
    ],
  },
  {
    title: "AI & Data",
    icon: Database,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    items: [
      { label: "AI Tools for Developers", href: "/courses/ai-tools-for-developers" },
      { label: "Data Science Path", href: "/courses", comingSoon: true },
    ],
  },
  {
    title: "Marketing",
    icon: Megaphone,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    items: [
      { label: "Digital Marketing 101", href: "/courses", comingSoon: true },
    ],
  },
];

const features = [
  {
    title: "My Sift",
    description: "Turn any YouTube playlist into a structured course with AI.",
    icon: Zap,
    href: "/my-sift",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Certificates",
    description: "Free proof unlocked only after trust-policy checks.",
    icon: Trophy,
    href: "/certificates",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Visual Roadmaps",
    description: "Follow interactive learning paths with clear milestones.",
    icon: Route,
    href: "/courses",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    title: "Teams",
    description: "Assign paths and track trusted completions for cohorts.",
    icon: Megaphone,
    href: "/teams",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
];

interface MegaMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MegaMenu({ open, onClose }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-14 z-50 border-b bg-background shadow-lg"
          >
            {/* Invisible hover bridge: tall enough to cover gap between trigger and dropdown */}
            <div className="absolute -top-4 left-0 right-0 h-4" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                {/* Categories */}
                <div className="md:col-span-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    Explore Categories
                  </p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
                    {categories.map((cat) => (
                      <div key={cat.title}>
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${cat.bg}`}>
                            <cat.icon className={`h-3.5 w-3.5 ${cat.color}`} />
                          </div>
                          <span className="text-sm font-semibold">{cat.title}</span>
                        </div>
                        <ul className="space-y-0.5">
                          {cat.items.map((item) => (
                            <li key={item.label}>
                              <Link
                                href={item.href}
                                onClick={onClose}
                                className={`group flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors hover:bg-muted ${
                                  item.comingSoon
                                    ? "text-muted-foreground/40 pointer-events-none"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                <span className="truncate">{item.label}</span>
                                {item.badge && (
                                  <span className="shrink-0 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                                    {item.badge}
                                  </span>
                                )}
                                {item.comingSoon && (
                                  <span className="shrink-0 text-[10px] text-muted-foreground/40">
                                    Soon
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features sidebar */}
                <div className="md:col-span-4 md:border-l md:pl-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    Features
                  </p>
                  <div className="space-y-1">
                    {features.map((feature) => (
                      <Link
                        key={feature.title}
                        href={feature.href}
                        onClick={onClose}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
                      >
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${feature.bg}`}>
                          <feature.icon className={`h-4 w-4 ${feature.color}`} />
                        </div>
                        <div className="min-w-0 pt-0.5">
                          <p className="text-sm font-medium group-hover:text-primary transition-colors">
                            {feature.title}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA bar */}
              <div className="mt-8 flex items-center justify-between rounded-xl bg-muted/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New to Siftara?</p>
                    <p className="text-xs text-muted-foreground">Start with our curated learning paths</p>
                  </div>
                </div>
                <Link
                  href="/courses"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Get Started
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
