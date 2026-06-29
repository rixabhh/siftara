"use client";

import { useState } from "react";
import { CheckCircle, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

interface GoalQuestion {
  question: string;
  options: string[];
}

const goalQuestions: GoalQuestion[] = [
  {
    question: "What do you want to achieve?",
    options: ["Get a job", "Freelancing", "Personal growth", "College project", "Side project"],
  },
  {
    question: "What is your current skill level?",
    options: ["Complete beginner", "Some basics", "Intermediate", "Advanced"],
  },
  {
    question: "How many days do you want to finish in?",
    options: ["7 days", "14 days", "30 days", "60 days", "No rush"],
  },
  {
    question: "How much time can you study daily?",
    options: ["15-30 min", "30-60 min", "1-2 hours", "2+ hours"],
  },
  {
    question: "Do you want quizzes, projects, or both?",
    options: ["Quizzes only", "Projects only", "Both quizzes and projects"],
  },
  {
    question: "Do you want a certificate?",
    options: ["Yes", "No"],
  },
];

interface GoalInterviewProps {
  onComplete: (answers: Record<string, string>) => void;
}

export function GoalInterview({ onComplete }: GoalInterviewProps) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question = goalQuestions[current];
  const selected = answers[question.question] || null;

  function handleSelect(option: string) {
    setAnswers((prev) => ({ ...prev, [question.question]: option }));
  }

  function handleNext() {
    if (current + 1 < goalQuestions.length) {
      setCurrent((c) => c + 1);
    } else {
      onComplete(answers);
    }
  }

  function handleBack() {
    if (current > 0) setCurrent((c) => c - 1);
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-violet/10">
          <Sparkles className="h-5 w-5 text-accent-violet" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Goal Interview</h2>
          <p className="text-sm text-text-secondary">Help us personalize your learning path</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-text-secondary">
          Question {current + 1} of {goalQuestions.length}
        </span>
        <div className="flex gap-1">
          {goalQuestions.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 w-6 rounded-full transition-colors ${
                idx === current ? "bg-primary" : idx < current ? "bg-primary/30" : "bg-surface-soft"
              }`}
            />
          ))}
        </div>
      </div>

      <h3 className="text-base font-medium text-foreground mb-4">{question.question}</h3>

      <div className="space-y-2">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-all border ${
              selected === option
                ? "border-primary bg-primary/10 text-primary font-medium"
                : "border-border bg-surface hover:border-primary/30 hover:bg-surface-soft text-foreground"
            }`}
          >
            {selected === option && <CheckCircle className="h-4 w-4 text-primary" />}
            <span>{option}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        {current > 0 && (
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground hover:bg-surface-soft transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!selected}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {current + 1 < goalQuestions.length ? "Next" : "Generate Roadmap"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
