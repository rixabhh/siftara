"use client";

import Link from "next/link";
import { useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Palette,
  Database,
  ArrowRight,
  Zap,
  Trophy,
  Route,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    title: "Development",
    icon: Code,
    color: "text-emerald-500",
    items: [
      { label: "React Mastery", href: "/courses/react-mastery", badge: "Popular" },
      { label: "Python Fundamentals", href: "/courses/python-fundamentals" },
      { label: "TypeScript Deep Dive", href: "/courses/typescript-deep-dive", badge: "New" },
    ],
  },
  {
    title: "Design",
    icon: Palette,
    color: "text-violet-500",
    items: [
      { label: "UI Design Essentials", href: "/courses/ui-design-essentials" },
    ],
  },
  {
    title: "AI & Data",
    icon: Database,
    color: "text-amber-500",
    items: [
      { label: "AI Tools for Developers", href: "/courses/ai-tools-for-developers" },
    ],
  },
];

const featured = [
  { title: "My Sift", description: "Paste a YouTube link, get a structured course.", icon: Zap, href: "/my-sift", color: "text-primary" },
  { title: "Certificates", description: "Free verified proof after trust checks.", icon: Trophy, href: "/certificates", color: "text-amber-500" },
  { title: "Learning Paths", description: "Curated paths with clear milestones.", icon: Route, href: "/courses", color: "text-violet-500" },
];

export function MegaMenu({
  open,
  onOpen,
  onClose,
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    if (openTimer.current) { clearTimeout(openTimer.current); openTimer.current = null; }
  }, []);

  const handleTriggerEnter = useCallback(() => {
    clearTimers();
    openTimer.current = setTimeout(onOpen, 60);
  }, [clearTimers, onOpen]);

  const handleTriggerLeave = useCallback(() => {
    clearTimers();
    closeTimer.current = setTimeout(onClose, 100);
  }, [clearTimers, onClose]);

  const handlePanelEnter = useCallback(() => {
    clearTimers();
  }, [clearTimers]);

  const handlePanelLeave = useCallback(() => {
    clearTimers();
    closeTimer.current = setTimeout(onClose, 100);
  }, [clearTimers, onClose]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  return (
    <div
      className="relative"
      onMouseEnter={handleTriggerEnter}
      onMouseLeave={handleTriggerLeave}
    >
      <button
        className={`relative px-4 py-2 text-sm font-medium transition-colors ${
          open ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Paths
        {open && (
          <motion.div
            layoutId="navbar-active"
            className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-full z-50 mt-2 w-[640px] -translate-x-1/2 overflow-hidden rounded-xl border bg-background shadow-2xl"
            onMouseEnter={handlePanelEnter}
            onMouseLeave={handlePanelLeave}
          >
            <div className="flex">
              {/* Left: Categories */}
              <div className="flex-1 p-5">
                {categories.map((cat, i) => (
                  <div key={cat.title} className={i > 0 ? "mt-5" : ""}>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-muted`}>
                        <cat.icon className={`h-3.5 w-3.5 ${cat.color}`} />
                      </div>
                      <span className="text-sm font-semibold">{cat.title}</span>
                    </div>
                    <ul className="ml-[38px] space-y-0.5">
                      {cat.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                          >
                            <span>{item.label}</span>
                            {item.badge && (
                              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Right: Featured */}
              <div className="w-[240px] shrink-0 border-l bg-muted/30 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Featured
                  </span>
                </div>
                <div className="space-y-1">
                  {featured.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-start gap-3 rounded-lg p-2.5 transition-all hover:bg-background hover:shadow-sm"
                    >
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background border transition-colors group-hover:border-primary/20`}>
                        <item.icon className={`h-4 w-4 ${item.color}`} />
                      </div>
                      <div className="min-w-0 pt-0.5">
                        <p className="text-sm font-medium group-hover:text-primary transition-colors">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
