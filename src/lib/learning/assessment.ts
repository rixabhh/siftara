import type { QuizQuestion } from "@/lib/types";

export interface AssessmentVariant {
  variantId: string;
  questions: QuizQuestion[];
}

export function createAssessmentVariant(
  quizId: string,
  questions: QuizQuestion[],
  attemptSeed: number,
  questionCount = 3
): AssessmentVariant {
  const seededQuestions = shuffleWithSeed(questions, `${quizId}:${attemptSeed}:questions`)
    .slice(0, Math.min(questionCount, questions.length))
    .map((question, questionIndex) => shuffleQuestionOptions(question, `${quizId}:${attemptSeed}:${questionIndex}`));

  return {
    variantId: `${quizId.toUpperCase()}-${attemptSeed.toString(36).toUpperCase()}`,
    questions: seededQuestions,
  };
}

function shuffleQuestionOptions(question: QuizQuestion, seed: string): QuizQuestion {
  const options = question.options.map((option, index) => ({
    option,
    wasCorrect: index === question.correctAnswer,
  }));
  const shuffled = shuffleWithSeed(options, seed);

  return {
    ...question,
    options: shuffled.map((item) => item.option),
    correctAnswer: shuffled.findIndex((item) => item.wasCorrect),
  };
}

function shuffleWithSeed<T>(items: T[], seed: string): T[] {
  const shuffled = [...items];
  let state = hashSeed(seed);

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    state = nextRandomState(state);
    const swapIndex = state % (index + 1);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function nextRandomState(state: number): number {
  return (Math.imul(state, 1664525) + 1013904223) >>> 0;
}
