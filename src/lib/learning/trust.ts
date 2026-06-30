export const CERTIFICATE_TRUST_POLICY = {
  requiredLessonCompletion: 100,
  requiredQuizCompletion: 100,
  requiredQuizAverage: 80,
  requiredReflectionWords: 30,
  trustLevel: "Verified",
} as const;

export interface TrustCriterion {
  id: string;
  label: string;
  value: string;
  passed: boolean;
}

export interface CertificateTrustInput {
  totalLessons: number;
  completedLessons: number;
  totalQuizzes: number;
  passedQuizScores: number[];
  reflectionText: string;
}

export interface CertificateTrustResult {
  eligible: boolean;
  trustScore: number;
  quizAverage: number;
  reflectionWords: number;
  criteria: TrustCriterion[];
}

export function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function evaluateCertificateTrust(input: CertificateTrustInput): CertificateTrustResult {
  const lessonCompletion =
    input.totalLessons > 0 ? Math.round((input.completedLessons / input.totalLessons) * 100) : 0;
  const quizCompletion =
    input.totalQuizzes > 0 ? Math.round((input.passedQuizScores.length / input.totalQuizzes) * 100) : 0;
  const quizAverage =
    input.passedQuizScores.length > 0
      ? Math.round(input.passedQuizScores.reduce((sum, score) => sum + score, 0) / input.passedQuizScores.length)
      : 0;
  const reflectionWords = countWords(input.reflectionText);

  const criteria: TrustCriterion[] = [
    {
      id: "lessons",
      label: "Required lessons completed",
      value: `${lessonCompletion}%`,
      passed: lessonCompletion >= CERTIFICATE_TRUST_POLICY.requiredLessonCompletion,
    },
    {
      id: "quiz-checkpoints",
      label: "Quiz checkpoints passed",
      value: `${input.passedQuizScores.length}/${input.totalQuizzes}`,
      passed: quizCompletion >= CERTIFICATE_TRUST_POLICY.requiredQuizCompletion,
    },
    {
      id: "quiz-average",
      label: "Average quiz score",
      value: `${quizAverage}%`,
      passed: quizAverage >= CERTIFICATE_TRUST_POLICY.requiredQuizAverage,
    },
    {
      id: "reflection",
      label: "Learning reflection evidence",
      value: `${reflectionWords}/${CERTIFICATE_TRUST_POLICY.requiredReflectionWords} words`,
      passed: reflectionWords >= CERTIFICATE_TRUST_POLICY.requiredReflectionWords,
    },
  ];

  const passedCount = criteria.filter((criterion) => criterion.passed).length;

  return {
    eligible: criteria.every((criterion) => criterion.passed),
    trustScore: Math.round((passedCount / criteria.length) * 100),
    quizAverage,
    reflectionWords,
    criteria,
  };
}

export function getCertificateTrustSummary(quizAverage: number): string {
  return `Verified by completed lesson checkpoints, randomized quiz checkpoints, ${quizAverage}% average quiz performance, and learner reflection evidence.`;
}
