"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ShieldCheck,
  BookOpen,
  Route,
  Trophy,
  FileCheck2,
} from "lucide-react";

/*
  Path flows bottom-left → up-right in an S-curve.
  Nodes are placed ON the path at these approximate % positions.
  Labels alternate above/below to avoid clashing.
*/
const milestones = [
  {
    label: "Sift Check",
    detail: "Signals found",
    icon: ShieldCheck,
    color: "bg-primary text-primary-foreground",
    // Icon on path at bottom-left
    nodeX: 12,
    nodeY: 80,
    labelBelow: true,
  },
  {
    label: "Foundation",
    detail: "3 lessons",
    icon: BookOpen,
    color: "bg-primary text-primary-foreground",
    // Icon on path, label pushed UP away from path
    nodeX: 32,
    nodeY: 52,
    labelBelow: false,
  },
  {
    label: "Core Path",
    detail: "Current module",
    icon: Route,
    color: "bg-background text-primary border-primary shadow-[0_0_0_5px_rgba(33,182,111,0.12)]",
    // Icon on path, label pushed DOWN away from path
    nodeX: 52,
    nodeY: 68,
    labelBelow: true,
  },
  {
    label: "Checkpoint",
    detail: "Quiz gates",
    icon: FileCheck2,
    color: "bg-[#fff7df] text-[#8a5a00] border-[#f2d88a] dark:bg-[#2b230f] dark:text-[#f6c85f] dark:border-[#5b4819]",
    // Icon on path, label pushed UP
    nodeX: 72,
    nodeY: 30,
    labelBelow: false,
  },
  {
    label: "Certificate",
    detail: "Verified proof",
    icon: Trophy,
    color: "bg-[#eef2ff] text-accent-violet border-[#c9d3ff] dark:bg-[#1a1830] dark:text-[#aeb9ff] dark:border-[#34366a]",
    // Icon on path, label pushed DOWN and right
    nodeX: 90,
    nodeY: 18,
    labelBelow: true,
  },
];

/*
  SVG viewBox is 600x450.
  Node positions in SVG coords:
    Sift Check:   (72, 360)
    Foundation:   (192, 234)
    Core Path:    (312, 306)
    Checkpoint:   (432, 135)
    Certificate:  (540, 81)

  Path must pass through all 5 points.
*/
const pathD =
  "M 40 390 " +
  "C 60 390, 60 360, 72 360 " +
  "C 100 360, 140 234, 192 234 " +
  "C 230 234, 250 306, 312 306 " +
  "C 360 306, 380 135, 432 135 " +
  "C 470 135, 500 81, 540 81 " +
  "L 570 81";

export function HeroPathGraphic({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full aspect-[4/3] md:aspect-[3/2]", className)}>
      <svg
        viewBox="0 0 600 450"
        fill="none"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Road shadow */}
        <path d={pathD} stroke="rgba(0,0,0,0.05)" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round" className="dark:stroke-white/[0.03]" />
        {/* Road body */}
        <path d={pathD} stroke="currentColor" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/70 dark:text-foreground/50" />
        {/* Center dashes */}
        <path d={pathD} stroke="white" strokeWidth="2" strokeDasharray="12 8" strokeLinecap="round" className="opacity-30 dark:opacity-15" />
      </svg>

      {/* Milestone Nodes — icon on path, label offset away */}
      {milestones.map((node, index) => (
        <motion.div
          key={node.label}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.5 + index * 0.15,
            type: "spring",
            stiffness: 240,
            damping: 22,
          }}
          className="absolute"
          style={{ left: `${node.nodeX}%`, top: `${node.nodeY}%`, transform: "translate(-50%, -50%)" }}
        >
          {/* Icon on the path */}
          <div
            className={cn(
              "relative flex h-12 w-12 items-center justify-center rounded-2xl border-2 shadow-lg transition-transform hover:scale-110",
              node.color
            )}
          >
            <node.icon className="h-5 w-5" />
            {node.label === "Core Path" && (
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-primary/30"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>

          {/* Label offset away from path */}
          <div
            className={cn(
              "absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap",
              node.labelBelow ? "top-full mt-3" : "bottom-full mb-3"
            )}
          >
            <p className="text-sm font-semibold">{node.label}</p>
            <p className="text-xs text-muted-foreground">{node.detail}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
