"use client";

import { useState } from "react";
import { CheckCircle, XCircle, ChevronRight, Trophy } from "lucide-react";

interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizPlayerProps {
  questions: QuizQuestion[];
  passScore: number;
  onComplete: (score: number, passed: boolean) => void;
}

export function QuizPlayer({ questions, passScore, onComplete }: QuizPlayerProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[current];
  const total = questions.length;
  const score = Math.round((correctCount / total) * 100);
  const passed = score >= passScore;

  function handleSelect(idx: number) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const isCorrect = idx === question.correctAnswer;
    if (isCorrect) setCorrectCount((c) => c + 1);
  }

  function handleNext() {
    if (current + 1 < total) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
      const finalScore = Math.round((correctCount / total) * 100);
      onComplete(finalScore, finalScore >= passScore);
    }
  }

  if (finished) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${passed ? "bg-primary/10" : "bg-error/10"}`}>
          <Trophy className={`h-8 w-8 ${passed ? "text-primary" : "text-error"}`} />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-foreground">
          {passed ? "Quiz Passed!" : "Keep Practicing"}
        </h2>
        <p className="mt-2 text-text-secondary">
          You scored {score}% ({correctCount}/{total} correct)
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium" style={{ background: passed ? "var(--primary)/10" : "var(--error)/10", color: passed ? "var(--primary)" : "var(--error)" }}>
          {passed ? "Passed" : "Failed"} — Need {passScore}% to pass
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-text-secondary">
          Question {current + 1} of {total}
        </span>
        <div className="h-2 flex-1 mx-4 rounded-full bg-surface-soft">
          <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${((current + 1) / total) * 100}%` }} />
        </div>
        <span className="text-sm font-medium text-primary">{score}%</span>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-4">{question.questionText}</h3>

      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selected === idx;
          const isCorrect = idx === question.correctAnswer;
          let classes = "border border-border bg-surface hover:border-primary/50 hover:bg-surface-soft";
          if (answered) {
            if (isCorrect) classes = "border border-primary bg-primary/10";
            else if (isSelected && !isCorrect) classes = "border border-error bg-error/10";
            else classes = "border border-border bg-surface opacity-50";
          }
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={answered}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-all ${classes}`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-xs font-medium">
                {answered && isCorrect ? (
                  <CheckCircle className="h-4 w-4 text-primary" />
                ) : answered && isSelected && !isCorrect ? (
                  <XCircle className="h-4 w-4 text-error" />
                ) : (
                  String.fromCharCode(65 + idx)
                )}
              </span>
              <span className="text-foreground">{option}</span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mt-4 rounded-xl bg-surface-soft p-4">
          <p className="text-sm text-text-secondary">{question.explanation}</p>
        </div>
      )}

      {answered && (
        <button
          onClick={handleNext}
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
        >
          {current + 1 < total ? "Next Question" : "See Results"}
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
