export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedMinutes: number;
  skills: string[];
  certificateEnabled: boolean;
  thumbnailUrl: string | null;
  sourceCreator: string;
  status: string;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description: string;
  sortOrder: number;
  estimatedMinutes: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  description: string;
  youtubeVideoId: string;
  youtubeUrl: string;
  durationSeconds: number;
  sortOrder: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  passScore: number;
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: string;
  progressPercentage: number;
  startedAt: Date;
}

export interface Certificate {
  id: string;
  certificateCode: string;
  userId: string;
  courseId: string | null;
  learnerName: string;
  title: string;
  skills: string[];
  issuedAt: Date;
  status: string;
  trustLevel?: string;
  trustScore?: number;
  quizAverage?: number;
  verificationSummary?: string;
  criteria?: string[];
}

export const categories = [
  "Development",
  "Design",
  "AI Tools",
  "Data",
  "Marketing",
] as const;

export const difficulties = ["Beginner", "Intermediate", "Advanced"] as const;
