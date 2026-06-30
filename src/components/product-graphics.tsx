import {
  BookOpen,
  CheckCircle2,
  Circle,
  FileCheck2,
  FileQuestion,
  Fingerprint,
  Link2,
  LockKeyhole,
  Route,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SiftNode = {
  label: string;
  detail: string;
  status?: "complete" | "current" | "locked" | "checkpoint" | "certificate";
};

const defaultNodes: SiftNode[] = [
  { label: "Sift Check", detail: "Learning signals found", status: "complete" },
  { label: "Foundation", detail: "3 lessons", status: "complete" },
  { label: "Core path", detail: "Current module", status: "current" },
  { label: "Checkpoint", detail: "Quiz gates progress", status: "checkpoint" },
  { label: "Proof", detail: "Signed certificate", status: "certificate" },
];

export function SiftMapArtifact({
  nodes = defaultNodes,
  compact = false,
  className,
}: {
  nodes?: SiftNode[];
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-[linear-gradient(135deg,var(--surface),var(--surface-soft))] p-4 shadow-[0_24px_80px_-48px_rgba(16,21,19,0.45)]",
        className
      )}
    >
      <GridTexture />
      <div className="relative flex items-center justify-between gap-3">
        <Badge variant="secondary" className="gap-1.5">
          <Route className="h-3.5 w-3.5" />
          Live SiftMap
        </Badge>
        <span className="font-mono text-xs text-muted-foreground">path.signal/05</span>
      </div>

      <div className={cn("relative mt-5", compact ? "space-y-3" : "space-y-4")}>
        <div className="absolute left-4 top-4 bottom-4 w-px bg-border" />
        <div className="absolute left-4 top-4 h-[54%] w-px bg-primary" />
        {nodes.map((node, index) => (
          <div key={node.label} className="relative flex items-start gap-4">
            <SiftNodeIcon status={node.status} index={index} />
            <div className="min-w-0 flex-1 rounded-lg border bg-background/80 px-3 py-2 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <p className="truncate text-sm font-semibold">{node.label}</p>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{node.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SiftNodeIcon({ status, index }: { status?: SiftNode["status"]; index: number }) {
  const classes = {
    complete: "bg-primary text-primary-foreground border-primary",
    current: "bg-background text-primary border-primary shadow-[0_0_0_6px_rgba(33,182,111,0.14)]",
    locked: "bg-muted text-muted-foreground border-border",
    checkpoint: "bg-[#fff7df] text-[#8a5a00] border-[#f2d88a] dark:bg-[#2b230f] dark:text-[#f6c85f] dark:border-[#5b4819]",
    certificate: "bg-[#eef2ff] text-accent-violet border-[#c9d3ff] dark:bg-[#1a1830] dark:text-[#aeb9ff] dark:border-[#34366a]",
  } as const;

  const icon =
    status === "complete" ? (
      <CheckCircle2 className="h-4 w-4" />
    ) : status === "checkpoint" ? (
      <FileQuestion className="h-4 w-4" />
    ) : status === "certificate" ? (
      <ShieldCheck className="h-4 w-4" />
    ) : status === "locked" ? (
      <LockKeyhole className="h-4 w-4" />
    ) : (
      <Circle className="h-4 w-4 fill-current" />
    );

  return (
    <div
      className={cn(
        "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
        classes[status ?? "locked"]
      )}
      aria-label={`SiftMap node ${index + 1}`}
    >
      {icon}
    </div>
  );
}

export function SiftCheckGraphic({ className }: { className?: string }) {
  const rows = [
    ["Tutorial structure", "Found"],
    ["Topic continuity", "Strong"],
    ["Source clarity", "Attribution ready"],
  ];

  return (
    <div className={cn("relative overflow-hidden rounded-xl border bg-card p-4 shadow-sm transition-shadow duration-300 hover:shadow-md", className)}>
      <GridTexture />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">Sift Check</p>
          <p className="mt-1 text-xs text-muted-foreground">Link checked before a path is created.</p>
        </div>
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/10 text-primary">
          <div className="absolute inset-1 rounded-full border border-primary/15" />
          <span className="font-mono text-lg font-bold">86</span>
        </div>
      </div>
      <div className="relative mt-5 space-y-2">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between rounded-lg border bg-background/80 px-3 py-2 text-sm">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              {label}
            </span>
            <span className="text-xs font-medium text-muted-foreground">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CertificatePreview({
  className,
  learnerName = "Demo Learner",
  title = "React Mastery",
  certificateCode = "SIFT-REACT-DEMO",
}: {
  className?: string;
  learnerName?: string;
  title?: string;
  certificateCode?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-xl border bg-card p-4", className)}>
      <GridTexture />
      <div className="relative flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold">Siftara Verified</p>
            <p className="font-mono text-xs text-muted-foreground">{certificateCode}</p>
          </div>
        </div>
        <Badge className="gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Valid
        </Badge>
      </div>
      <div className="relative py-3">
        <p className="text-xs uppercase text-muted-foreground">Issued to</p>
        <p className="mt-0.5 text-xl font-bold tracking-tight">{learnerName}</p>
        <p className="mt-3 text-xs uppercase text-muted-foreground">Completed path</p>
        <p className="mt-0.5 text-base font-semibold">{title}</p>
      </div>
      <div className="relative grid grid-cols-[1fr_auto] gap-3 border-t pt-2">
        <div className="space-y-2 text-sm">
          <p className="flex items-center gap-2">
            <FileCheck2 className="h-4 w-4 text-primary" />
            Checkpoints completed
          </p>
          <p className="flex items-center gap-2">
            <Fingerprint className="h-4 w-4 text-accent-violet" />
            Digital signature verified
          </p>
        </div>
        <QrMark />
      </div>
    </div>
  );
}

export function ContentToPathGraphic({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-[1fr_auto_1fr]", className)}>
      <div className="rounded-xl border bg-card p-4">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Link2 className="h-4 w-4 text-muted-foreground" />
          Before
        </p>
        <div className="space-y-2">
          {["Video 14", "Playlist gap", "Long lecture", "Useful clip"].map((item, index) => (
            <div key={item} className="flex items-center gap-2 rounded-lg bg-muted/70 px-3 py-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-muted-foreground/35" />
              {item}
              <span className="ml-auto font-mono">{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden items-center justify-center sm:flex">
        <div className="h-px w-12 bg-border" />
      </div>
      <div className="rounded-xl border bg-card p-4">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Route className="h-4 w-4 text-primary" />
          After
        </p>
        <div className="space-y-2">
          {["Foundation", "Core lesson", "Checkpoint", "Certificate"].map((item, index) => (
            <div key={item} className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-xs">
              {index < 2 ? <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> : <Circle className="h-3.5 w-3.5 text-muted-foreground" />}
              {item}
              <span className="ml-auto font-mono text-muted-foreground">{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CourseSignalCover({
  title,
  difficulty,
  className,
}: {
  title: string;
  difficulty: string;
  className?: string;
}) {
  const initials = title
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <div className={cn("relative overflow-hidden rounded-lg border bg-[linear-gradient(135deg,#f7faf6,#eaf4ee)] p-4 dark:bg-[linear-gradient(135deg,#0f1512,#151d18)]", className)}>
      <GridTexture />
      <div className="relative flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
          {initials}
        </div>
        <Badge variant="secondary">{difficulty}</Badge>
      </div>
      <div className="relative mt-8">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium text-muted-foreground">Curated source path</span>
        </div>
        <div className="mt-4 flex items-center gap-2">
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className={cn("h-2 flex-1 rounded-full", index < 3 ? "bg-primary" : "bg-border")} />
          ))}
        </div>
      </div>
    </div>
  );
}

function QrMark() {
  return (
    <div className="grid h-12 w-12 grid-cols-4 grid-rows-4 gap-1 rounded-lg border bg-background p-1.5">
      {Array.from({ length: 16 }).map((_, index) => (
        <span
          key={index}
          className={cn(
            "rounded-[2px]",
            [0, 1, 4, 5, 10, 11, 14, 15, 3, 12].includes(index) ? "bg-foreground" : "bg-border"
          )}
        />
      ))}
    </div>
  );
}

function GridTexture() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] [background-size:24px_24px]"
    />
  );
}
