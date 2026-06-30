"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Award,
  CheckCircle2,
  ChevronRight,
  Circle,
  FileQuestion,
  LockKeyhole,
  NotebookPen,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { Course, CourseModule, Lesson, Quiz, QuizQuestion } from "@/lib/types";
import { createAssessmentVariant } from "@/lib/learning/assessment";
import {
  CERTIFICATE_TRUST_POLICY,
  evaluateCertificateTrust,
  type CertificateTrustResult,
} from "@/lib/learning/trust";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuizPlayer } from "@/components/quiz/quiz-player";
import { cn } from "@/lib/utils";

type LearningQuiz = Quiz & { questions: QuizQuestion[] };

type LearningModule = CourseModule & {
  lessons: Lesson[];
  quiz?: LearningQuiz;
};

type ActiveView =
  | { type: "lesson"; id: string }
  | { type: "quiz"; id: string }
  | { type: "certificate" };

interface StoredProgress {
  completedLessons: string[];
  passedQuizzes: Record<string, number>;
  failedQuizzes: Record<string, number>;
  quizAttemptSeeds: Record<string, number>;
  notes: string;
  activeView?: ActiveView;
}

interface LearningWorkspaceProps {
  course: Course;
  modules: LearningModule[];
  certificateCode: string;
}

export function LearningWorkspace({ course, modules, certificateCode }: LearningWorkspaceProps) {
  const lessons = useMemo(
    () =>
      modules.flatMap((module, moduleIndex) =>
        module.lessons.map((lesson, lessonIndex) => ({
          ...lesson,
          moduleTitle: module.title,
          moduleIndex,
          lessonIndex,
        }))
      ),
    [modules]
  );

  const quizzes = useMemo(
    () => modules.flatMap((module) => (module.quiz ? [{ ...module.quiz, moduleTitle: module.title }] : [])),
    [modules]
  );

  const firstLesson = lessons[0];
  const storageKey = `siftara-learning-${course.id}`;
  const [activeView, setActiveView] = useState<ActiveView>(
    firstLesson ? { type: "lesson", id: firstLesson.id } : { type: "certificate" }
  );
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [passedQuizzes, setPassedQuizzes] = useState<Record<string, number>>({});
  const [failedQuizzes, setFailedQuizzes] = useState<Record<string, number>>({});
  const [quizAttemptSeeds, setQuizAttemptSeeds] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState("");
  const [hasHydrated, setHasHydrated] = useState(false);

  const trustResult = useMemo(
    () =>
      evaluateCertificateTrust({
        totalLessons: lessons.length,
        completedLessons: completedLessons.size,
        totalQuizzes: quizzes.length,
        passedQuizScores: Object.values(passedQuizzes),
        reflectionText: notes,
      }),
    [completedLessons.size, lessons.length, notes, passedQuizzes, quizzes.length]
  );

  const activeLesson = activeView.type === "lesson" ? lessons.find((lesson) => lesson.id === activeView.id) : undefined;
  const activeQuiz = activeView.type === "quiz" ? quizzes.find((quiz) => quiz.id === activeView.id) : undefined;
  const activeQuizSeed = activeQuiz ? quizAttemptSeeds[activeQuiz.id] ?? 1 : 1;
  const activeQuizVariant = activeQuiz
    ? createAssessmentVariant(activeQuiz.id, activeQuiz.questions, activeQuizSeed)
    : undefined;
  const nextView = getNextView(activeView, modules);

  useEffect(() => {
    queueMicrotask(() => {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as StoredProgress;
          setCompletedLessons(new Set(parsed.completedLessons ?? []));
          setPassedQuizzes(parsed.passedQuizzes ?? {});
          setFailedQuizzes(parsed.failedQuizzes ?? {});
          setQuizAttemptSeeds(parsed.quizAttemptSeeds ?? createInitialQuizSeeds(quizzes));
          setNotes(parsed.notes ?? "");
          if (parsed.activeView) setActiveView(parsed.activeView);
        } catch {
          window.localStorage.removeItem(storageKey);
          setQuizAttemptSeeds(createInitialQuizSeeds(quizzes));
        }
      } else {
        setQuizAttemptSeeds(createInitialQuizSeeds(quizzes));
      }
      setHasHydrated(true);
    });
  }, [quizzes, storageKey]);

  useEffect(() => {
    if (!hasHydrated) return;
    const nextProgress: StoredProgress = {
      completedLessons: Array.from(completedLessons),
      passedQuizzes,
      failedQuizzes,
      quizAttemptSeeds,
      notes,
      activeView,
    };
    window.localStorage.setItem(storageKey, JSON.stringify(nextProgress));
  }, [activeView, completedLessons, failedQuizzes, hasHydrated, notes, passedQuizzes, quizAttemptSeeds, storageKey]);

  function markLessonComplete(lessonId: string) {
    setCompletedLessons((current) => new Set(current).add(lessonId));
  }

  function goToNext() {
    if (nextView) {
      setActiveView(nextView);
    } else {
      setActiveView({ type: "certificate" });
    }
  }

  function handleQuizComplete(quizId: string, score: number, passed: boolean) {
    if (passed) {
      setPassedQuizzes((current) => ({ ...current, [quizId]: score }));
      setFailedQuizzes((current) => {
        const next = { ...current };
        delete next[quizId];
        return next;
      });
    } else {
      setFailedQuizzes((current) => ({ ...current, [quizId]: score }));
    }
  }

  function retryQuiz(quizId: string) {
    setQuizAttemptSeeds((current) => ({
      ...current,
      [quizId]: (current[quizId] ?? 1) + 1,
    }));
  }

  function resetProgress() {
    setCompletedLessons(new Set());
    setPassedQuizzes({});
    setFailedQuizzes({});
    setQuizAttemptSeeds(createInitialQuizSeeds(quizzes));
    setNotes("");
    setActiveView(firstLesson ? { type: "lesson", id: firstLesson.id } : { type: "certificate" });
  }

  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col bg-background">
      <div className="border-b bg-background/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{course.title}</span>
            </div>
            <h1 className="mt-1 truncate text-base font-semibold">
              {activeLesson?.title ?? activeQuiz?.title ?? "Certificate trust check"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden w-44 sm:block">
              <Progress value={trustResult.trustScore} className="gap-1" />
            </div>
            <Badge variant={trustResult.eligible ? "default" : "secondary"} className="min-w-24 justify-center gap-1.5">
              {trustResult.eligible ? <ShieldCheck className="h-3.5 w-3.5" /> : <LockKeyhole className="h-3.5 w-3.5" />}
              Trust {trustResult.trustScore}%
            </Badge>
            <Button variant="outline" size="sm" onClick={resetProgress} className="gap-1.5">
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-0 lg:grid-cols-[minmax(0,1fr)_380px]">
        <main className="min-w-0 border-r-0 lg:border-r">
          {activeLesson && (
            <LessonPanel
              lesson={activeLesson}
              isComplete={completedLessons.has(activeLesson.id)}
              onComplete={() => markLessonComplete(activeLesson.id)}
              onNext={goToNext}
              hasNext={Boolean(nextView)}
            />
          )}

          {activeQuiz && activeQuizVariant && (
            <QuizPanel
              key={`${activeQuiz.id}-${activeQuizVariant.variantId}`}
              quiz={{ ...activeQuiz, questions: activeQuizVariant.questions }}
              variantId={activeQuizVariant.variantId}
              score={passedQuizzes[activeQuiz.id] ?? failedQuizzes[activeQuiz.id]}
              passed={activeQuiz.id in passedQuizzes}
              onComplete={(score, passed) => handleQuizComplete(activeQuiz.id, score, passed)}
              onRetry={() => retryQuiz(activeQuiz.id)}
              onNext={goToNext}
              hasNext={Boolean(nextView)}
            />
          )}

          {activeView.type === "certificate" && (
            <CertificatePanel
              course={course}
              certificateCode={certificateCode}
              trustResult={trustResult}
            />
          )}
        </main>

        <aside className="bg-muted/20">
          <Tabs defaultValue="roadmap" className="h-full p-4">
            <TabsList className="grid h-9 w-full grid-cols-3">
              <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
              <TabsTrigger value="evidence">Trust</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="roadmap" className="mt-4">
              <Roadmap
                modules={modules}
                activeView={activeView}
                completedLessons={completedLessons}
                passedQuizzes={passedQuizzes}
                failedQuizzes={failedQuizzes}
                certificateUnlocked={trustResult.eligible}
                onSelect={setActiveView}
              />
            </TabsContent>
            <TabsContent value="evidence" className="mt-4">
              <TrustPanel trustResult={trustResult} />
            </TabsContent>
            <TabsContent value="notes" className="mt-4">
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <NotebookPen className="h-4 w-4 text-primary" />
                    Reflection evidence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Write what you learned, what confused you, and what you can now build or explain..."
                    className="min-h-72 w-full resize-none rounded-lg border bg-background p-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Certificate unlock requires at least {CERTIFICATE_TRUST_POLICY.requiredReflectionWords} words of reflection evidence.
                    Later, AI will evaluate quality, not only length.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </aside>
      </div>
    </div>
  );
}

function LessonPanel({
  lesson,
  isComplete,
  onComplete,
  onNext,
  hasNext,
}: {
  lesson: Lesson & { moduleTitle: string; moduleIndex: number; lessonIndex: number };
  isComplete: boolean;
  onComplete: () => void;
  onNext: () => void;
  hasNext: boolean;
}) {
  return (
    <div>
      <div className="aspect-video bg-black">
        {lesson.youtubeVideoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${lesson.youtubeVideoId}`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={lesson.title}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-white/60">
            <Play className="h-16 w-16" />
          </div>
        )}
      </div>

      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Module {lesson.moduleIndex + 1}</Badge>
          <Badge variant="outline">Lesson {lesson.lessonIndex + 1}</Badge>
          <Badge variant="outline">{Math.max(1, Math.round(lesson.durationSeconds / 60))} min</Badge>
        </div>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">{lesson.title}</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{lesson.description}</p>

        <Card className="mt-6 border-border/50">
          <CardContent className="p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium">Lesson evidence checkpoint</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Mark this only after watching and understanding the lesson. Quizzes and reflection still gate the certificate.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant={isComplete ? "secondary" : "default"} onClick={onComplete} className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  {isComplete ? "Evidence Saved" : "Mark Evidence"}
                </Button>
                <Button variant="outline" onClick={onNext} className="gap-2">
                  {hasNext ? "Next" : "Finish"}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function QuizPanel({
  quiz,
  variantId,
  score,
  passed,
  onComplete,
  onRetry,
  onNext,
  hasNext,
}: {
  quiz: LearningQuiz & { moduleTitle: string };
  variantId: string;
  score?: number;
  passed: boolean;
  onComplete: (score: number, passed: boolean) => void;
  onRetry: () => void;
  onNext: () => void;
  hasNext: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <Badge variant="secondary" className="gap-1.5">
          <FileQuestion className="h-3.5 w-3.5" />
          Randomized checkpoint
        </Badge>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">{quiz.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Variant {variantId}. Pass with {quiz.passScore}% or higher. Retrying creates a fresh question and option order.
        </p>
      </div>

      {passed ? (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Checkpoint passed</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Score: {score}%. This randomized assessment is counted toward certificate trust.
                  </p>
                </div>
              </div>
              <Button onClick={onNext} className="gap-2">
                {hasNext ? "Continue" : "View Certificate"}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : quiz.questions.length > 0 ? (
        <QuizPlayer
          questions={quiz.questions}
          passScore={quiz.passScore}
          onComplete={onComplete}
          onRetry={onRetry}
          variantId={variantId}
        />
      ) : (
        <Card className="border-border/50">
          <CardContent className="p-6 text-sm text-muted-foreground">
            This quiz checkpoint does not have questions yet.
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function CertificatePanel({
  course,
  certificateCode,
  trustResult,
}: {
  course: Course;
  certificateCode: string;
  trustResult: CertificateTrustResult;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Card className="overflow-hidden border-border/50">
        <div className="relative bg-gradient-to-br from-emerald-500/5 via-transparent to-violet-500/5 p-8 text-center">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_2px_2px,currentColor_1px,transparent_0)] bg-[size:24px_24px]" />
          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              {trustResult.eligible ? (
                <Award className="h-7 w-7 text-primary" />
              ) : (
                <LockKeyhole className="h-7 w-7 text-muted-foreground" />
              )}
            </div>
            <Badge variant={trustResult.eligible ? "default" : "secondary"} className="mt-4 gap-1.5">
              {trustResult.eligible ? <ShieldCheck className="h-3.5 w-3.5" /> : <LockKeyhole className="h-3.5 w-3.5" />}
              {trustResult.eligible ? "Verified Certificate Ready" : "Trust Checks Incomplete"}
            </Badge>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">{course.title} Certificate</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Certificates are free, but never automatic. Siftara requires learning evidence before verified proof is issued.
            </p>
          </div>
        </div>
        <CardContent className="p-6">
          <TrustPanel trustResult={trustResult} />
          <Separator className="my-5" />
          <div className="flex flex-wrap gap-2">
            {course.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button disabled={!trustResult.eligible} asChild={trustResult.eligible} className="gap-2">
              {trustResult.eligible ? (
                <Link href={`/certificates/verify/${certificateCode}`}>
                  <Award className="h-4 w-4" />
                  View Verified Certificate
                </Link>
              ) : (
                <span>
                  <LockKeyhole className="h-4 w-4" />
                  Complete Trust Checks
                </span>
              )}
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/courses/${course.slug}`}>Course overview</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TrustPanel({ trustResult }: { trustResult: CertificateTrustResult }) {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between gap-3 text-sm">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Certificate trust policy
          </span>
          <Badge variant={trustResult.eligible ? "default" : "secondary"}>{trustResult.trustScore}%</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Progress value={trustResult.trustScore} />
        </div>
        <div className="space-y-2">
          {trustResult.criteria.map((criterion) => (
            <div key={criterion.id} className="flex items-start justify-between gap-3 rounded-lg border bg-background px-3 py-2">
              <div className="flex items-start gap-2">
                {criterion.passed ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                ) : (
                  <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                )}
                <span className="text-sm">{criterion.label}</span>
              </div>
              <span className="shrink-0 text-xs font-medium text-muted-foreground">{criterion.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Roadmap({
  modules,
  activeView,
  completedLessons,
  passedQuizzes,
  failedQuizzes,
  certificateUnlocked,
  onSelect,
}: {
  modules: LearningModule[];
  activeView: ActiveView;
  completedLessons: Set<string>;
  passedQuizzes: Record<string, number>;
  failedQuizzes: Record<string, number>;
  certificateUnlocked: boolean;
  onSelect: (view: ActiveView) => void;
}) {
  return (
    <div className="space-y-4">
      {modules.map((module, moduleIndex) => (
        <div key={module.id}>
          <div className="px-2 pb-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Module {moduleIndex + 1}
            </p>
            <p className="mt-1 text-sm font-medium">{module.title}</p>
          </div>
          <div className="space-y-1">
            {module.lessons.map((lesson) => {
              const isActive = activeView.type === "lesson" && activeView.id === lesson.id;
              const isDone = completedLessons.has(lesson.id);
              return (
                <button
                  key={lesson.id}
                  onClick={() => onSelect({ type: "lesson", id: lesson.id })}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition",
                    isActive && "bg-primary/10 text-primary",
                    !isActive && "text-muted-foreground hover:bg-muted",
                    isDone && !isActive && "text-foreground"
                  )}
                >
                  {isActive ? (
                    <Play className="h-3.5 w-3.5 shrink-0" />
                  ) : isDone ? (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                  ) : (
                    <Circle className="h-3.5 w-3.5 shrink-0" />
                  )}
                  <span className="min-w-0 flex-1 truncate">{lesson.title}</span>
                </button>
              );
            })}
            {module.quiz && (
              <button
                onClick={() => onSelect({ type: "quiz", id: module.quiz!.id })}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition",
                  activeView.type === "quiz" && activeView.id === module.quiz.id
                    ? "bg-violet-500/10 text-violet-600 dark:text-violet-400"
                    : "text-muted-foreground hover:bg-muted",
                  module.quiz.id in passedQuizzes && "text-foreground",
                  module.quiz.id in failedQuizzes && "text-destructive"
                )}
              >
                {module.quiz.id in passedQuizzes ? (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                ) : (
                  <FileQuestion className="h-3.5 w-3.5 shrink-0" />
                )}
                <span className="min-w-0 flex-1 truncate">{module.quiz.title}</span>
                {module.quiz.id in passedQuizzes && (
                  <span className="text-xs text-muted-foreground">{passedQuizzes[module.quiz.id]}%</span>
                )}
              </button>
            )}
          </div>
        </div>
      ))}

      <button
        onClick={() => onSelect({ type: "certificate" })}
        className={cn(
          "flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left text-sm transition hover:bg-muted",
          activeView.type === "certificate" && "border-primary/30 bg-primary/10 text-primary"
        )}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          {certificateUnlocked ? (
            <Award className="h-4 w-4 text-primary" />
          ) : (
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        <div className="min-w-0">
          <p className="font-medium">Certificate</p>
          <p className="text-xs text-muted-foreground">
            {certificateUnlocked ? "Verified proof ready" : "Locked by trust policy"}
          </p>
        </div>
      </button>
    </div>
  );
}

function getNextView(activeView: ActiveView, modules: LearningModule[]): ActiveView | null {
  const sequence = modules.flatMap<ActiveView>((module) => [
    ...module.lessons.map((lesson) => ({ type: "lesson" as const, id: lesson.id })),
    ...(module.quiz ? [{ type: "quiz" as const, id: module.quiz.id }] : []),
  ]);
  const currentIndex = sequence.findIndex(
    (item) => item.type === activeView.type && "id" in item && "id" in activeView && item.id === activeView.id
  );
  if (currentIndex === -1) return sequence[0] ?? null;
  return sequence[currentIndex + 1] ?? { type: "certificate" };
}

function createInitialQuizSeeds(quizzes: Array<{ id: string }>): Record<string, number> {
  return Object.fromEntries(quizzes.map((quiz) => [quiz.id, createAttemptSeed()]));
}

function createAttemptSeed(): number {
  const values = new Uint32Array(1);
  window.crypto.getRandomValues(values);
  return values[0] || 1;
}
