import type { Certificate, Course, CourseModule, Lesson, Quiz, QuizQuestion } from "../types";

export const seedCourses: Course[] = [
  {
    id: "react-mastery",
    title: "React Mastery",
    slug: "react-mastery",
    description: "Build modern web applications with React from scratch. This comprehensive path covers everything from JSX fundamentals to advanced hooks and state management patterns.",
    category: "Development",
    difficulty: "Intermediate",
    estimatedMinutes: 270,
    skills: ["React", "JSX", "Hooks", "State Management", "Components"],
    certificateEnabled: true,
    thumbnailUrl: null,
    sourceCreator: "Traversy Media",
    status: "published",
  },
  {
    id: "python-fundamentals",
    title: "Python Fundamentals",
    slug: "python-fundamentals",
    description: "Learn Python programming from beginner to confident developer. Master data types, functions, OOP, and real-world scripting.",
    category: "Development",
    difficulty: "Beginner",
    estimatedMinutes: 360,
    skills: ["Python", "Data Types", "Functions", "OOP"],
    certificateEnabled: true,
    thumbnailUrl: null,
    sourceCreator: "Programming with Mosh",
    status: "published",
  },
  {
    id: "ui-design-essentials",
    title: "UI Design Essentials",
    slug: "ui-design-essentials",
    description: "Master the principles of modern user interface design. Learn color theory, typography, layout, and Figma workflows.",
    category: "Design",
    difficulty: "Beginner",
    estimatedMinutes: 180,
    skills: ["Figma", "Color Theory", "Typography", "Layout"],
    certificateEnabled: true,
    thumbnailUrl: null,
    sourceCreator: "DesignCourse",
    status: "published",
  },
  {
    id: "ai-tools-for-developers",
    title: "AI Tools for Developers",
    slug: "ai-tools-for-developers",
    description: "Leverage AI tools to supercharge your development workflow. Learn prompt engineering, AI assistants, and code generation.",
    category: "AI Tools",
    difficulty: "Intermediate",
    estimatedMinutes: 150,
    skills: ["Prompt Engineering", "AI Assistants", "Code Generation"],
    certificateEnabled: true,
    thumbnailUrl: null,
    sourceCreator: "Fireship",
    status: "published",
  },
  {
    id: "typescript-deep-dive",
    title: "TypeScript Deep Dive",
    slug: "typescript-deep-dive",
    description: "Go beyond the basics of TypeScript. Master generics, utility types, decorators, and advanced patterns.",
    category: "Development",
    difficulty: "Advanced",
    estimatedMinutes: 240,
    skills: ["TypeScript", "Generics", "Type System", "Patterns"],
    certificateEnabled: true,
    thumbnailUrl: null,
    sourceCreator: "Matt Pocock",
    status: "published",
  },
];

export const seedModules: CourseModule[] = [
  { id: "m1", courseId: "react-mastery", title: "Getting Started with React", description: "Learn what React is and set up your environment.", sortOrder: 1, estimatedMinutes: 45 },
  { id: "m2", courseId: "react-mastery", title: "Components and Props", description: "Understand how to build and compose components.", sortOrder: 2, estimatedMinutes: 50 },
  { id: "m3", courseId: "react-mastery", title: "State and Hooks", description: "Master useState, useEffect, and custom hooks.", sortOrder: 3, estimatedMinutes: 60 },
  { id: "m4", courseId: "python-fundamentals", title: "Python Basics", description: "Variables, data types, and basic operations.", sortOrder: 1, estimatedMinutes: 60 },
  { id: "m5", courseId: "python-fundamentals", title: "Functions and Modules", description: "Write reusable code with functions and modules.", sortOrder: 2, estimatedMinutes: 70 },
];

export const seedLessons: Lesson[] = [
  { id: "l1", courseId: "react-mastery", moduleId: "m1", title: "What is React?", description: "Learn the fundamentals of React.", youtubeVideoId: "Ke90Tje7VS0", youtubeUrl: "https://www.youtube.com/watch?v=Ke90Tje7VS0", durationSeconds: 720, sortOrder: 1 },
  { id: "l2", courseId: "react-mastery", moduleId: "m1", title: "Setting Up Your Environment", description: "Install Node.js and create your first React app.", youtubeVideoId: "T8eY7kYh0I4", youtubeUrl: "https://www.youtube.com/watch?v=T8eY7kYh0I4", durationSeconds: 900, sortOrder: 2 },
  { id: "l3", courseId: "react-mastery", moduleId: "m1", title: "Your First Component", description: "Build your first React component from scratch.", youtubeVideoId: "pQN-pkPZsJI", youtubeUrl: "https://www.youtube.com/watch?v=pQN-pkPZsJI", durationSeconds: 1080, sortOrder: 3 },
  { id: "l4", courseId: "react-mastery", moduleId: "m2", title: "Understanding Components", description: "Deep dive into React component architecture.", youtubeVideoId: "0VCxdsrD4yQ", youtubeUrl: "https://www.youtube.com/watch?v=0VCxdsrD4yQ", durationSeconds: 840, sortOrder: 1 },
  { id: "l5", courseId: "react-mastery", moduleId: "m2", title: "Props Deep Dive", description: "Master passing data between components.", youtubeVideoId: "e3HgqLRYPGc", youtubeUrl: "https://www.youtube.com/watch?v=e3HgqLRYPGc", durationSeconds: 960, sortOrder: 2 },
  { id: "l6", courseId: "react-mastery", moduleId: "m2", title: "Component Composition", description: "Learn advanced composition patterns.", youtubeVideoId: "vppFQ04W0Gc", youtubeUrl: "https://www.youtube.com/watch?v=vppFQ04W0Gc", durationSeconds: 1200, sortOrder: 3 },
  { id: "l7", courseId: "react-mastery", moduleId: "m3", title: "useState Hook", description: "Manage state in functional components.", youtubeVideoId: "O6P8B8aRf1U", youtubeUrl: "https://www.youtube.com/watch?v=O6P8B8aRf1U", durationSeconds: 1080, sortOrder: 1 },
  { id: "l8", courseId: "react-mastery", moduleId: "m3", title: "useEffect Hook", description: "Handle side effects in React.", youtubeVideoId: "0ZJUIIY3aVc", youtubeUrl: "https://www.youtube.com/watch?v=0ZJUIIY3aVc", durationSeconds: 1320, sortOrder: 2 },
  { id: "l9", courseId: "react-mastery", moduleId: "m3", title: "Custom Hooks", description: "Build your own reusable hooks.", youtubeVideoId: "kmV1bGOirIQ", youtubeUrl: "https://www.youtube.com/watch?v=kmV1bGOirIQ", durationSeconds: 1200, sortOrder: 3 },
];

export const seedQuizzes: Quiz[] = [
  { id: "q1", courseId: "react-mastery", moduleId: "m1", title: "Module 1: React Basics Quiz", passScore: 80 },
  { id: "q2", courseId: "react-mastery", moduleId: "m2", title: "Module 2: Components Quiz", passScore: 80 },
  { id: "q3", courseId: "react-mastery", moduleId: "m3", title: "Module 3: Hooks Quiz", passScore: 80 },
];

export const seedQuizQuestions: QuizQuestion[] = [
  {
    id: "qq1", quizId: "q1", questionText: "What is React?",
    options: ["A database", "A JavaScript library for building UIs", "A CSS framework", "A server language"],
    correctAnswer: 1, explanation: "React is a JavaScript library developed by Facebook for building user interfaces."
  },
  {
    id: "qq2", quizId: "q1", questionText: "What does JSX stand for?",
    options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extension"],
    correctAnswer: 0, explanation: "JSX stands for JavaScript XML and allows you to write HTML-like syntax in JavaScript."
  },
  {
    id: "qq3", quizId: "q1", questionText: "Which command creates a new React app?",
    options: ["npm create react-app", "npx create-react-app", "npm install react", "yarn add react"],
    correctAnswer: 1, explanation: "npx create-react-app is the standard way to bootstrap a new React project."
  },
  {
    id: "qq10", quizId: "q1", questionText: "Why does React use a component model?",
    options: ["To make UI reusable and composable", "To replace the browser", "To store passwords", "To avoid JavaScript"],
    correctAnswer: 0, explanation: "Components let teams build interfaces from reusable pieces with clear responsibilities."
  },
  {
    id: "qq11", quizId: "q1", questionText: "What does JSX most closely describe?",
    options: ["HTML-like syntax inside JavaScript", "A database query language", "A network protocol", "A design file format"],
    correctAnswer: 0, explanation: "JSX is HTML-like syntax that compiles into JavaScript calls."
  },
  {
    id: "qq12", quizId: "q1", questionText: "Which value should a React component return?",
    options: ["Renderable UI", "A SQL table", "A package lockfile", "A browser extension"],
    correctAnswer: 0, explanation: "React components return renderable UI, usually expressed with JSX."
  },
  {
    id: "qq4", quizId: "q2", questionText: "What is the main job of props in React?",
    options: ["Store browser cookies", "Pass data into components", "Compile TypeScript", "Style global CSS"],
    correctAnswer: 1, explanation: "Props pass data from a parent component into a child component."
  },
  {
    id: "qq5", quizId: "q2", questionText: "Which pattern helps build flexible UI by nesting components?",
    options: ["Component composition", "Database indexing", "Route prefetching", "Binary search"],
    correctAnswer: 0, explanation: "Composition lets you combine small components into larger, reusable interfaces."
  },
  {
    id: "qq6", quizId: "q2", questionText: "What should a reusable component usually avoid?",
    options: ["Receiving props", "Rendering JSX", "Hard-coding every piece of content", "Using semantic HTML"],
    correctAnswer: 2, explanation: "Reusable components stay flexible by accepting data and children instead of hard-coding every detail."
  },
  {
    id: "qq13", quizId: "q2", questionText: "Which direction do props usually flow?",
    options: ["Parent to child", "Child to database", "CSS to server", "Browser to package manager"],
    correctAnswer: 0, explanation: "Props usually flow from parent components down into child components."
  },
  {
    id: "qq14", quizId: "q2", questionText: "What is a good reason to split UI into smaller components?",
    options: ["Clearer reuse and maintenance", "More duplicated code", "Less readable state", "Harder testing"],
    correctAnswer: 0, explanation: "Smaller focused components are easier to reuse, test, and reason about."
  },
  {
    id: "qq15", quizId: "q2", questionText: "What does children enable in a React component?",
    options: ["Passing nested UI into a component", "Deleting all props", "Running SQL in JSX", "Changing the browser engine"],
    correctAnswer: 0, explanation: "The children prop lets a parent pass nested UI into a component."
  },
  {
    id: "qq7", quizId: "q3", questionText: "Which hook stores local component state?",
    options: ["useEffect", "useState", "useMemo", "useRef"],
    correctAnswer: 1, explanation: "useState gives a function component reactive local state."
  },
  {
    id: "qq8", quizId: "q3", questionText: "When is useEffect most appropriate?",
    options: ["For side effects after render", "For defining TypeScript types", "For replacing all props", "For writing CSS"],
    correctAnswer: 0, explanation: "useEffect is used for side effects such as subscriptions, timers, and syncing with external systems."
  },
  {
    id: "qq9", quizId: "q3", questionText: "Why create a custom hook?",
    options: ["To hide broken code", "To reuse stateful logic", "To make components unable to render", "To disable React rules"],
    correctAnswer: 1, explanation: "Custom hooks package reusable stateful logic behind a focused function API."
  },
  {
    id: "qq16", quizId: "q3", questionText: "What should be included in an effect dependency list?",
    options: ["Values used by the effect", "Random unused variables", "Only CSS class names", "The package version"],
    correctAnswer: 0, explanation: "Dependencies should include reactive values used inside the effect."
  },
  {
    id: "qq17", quizId: "q3", questionText: "Which rule applies to hooks?",
    options: ["Call hooks at the top level", "Call hooks inside any loop", "Call hooks only after returns", "Rename every hook"],
    correctAnswer: 0, explanation: "Hooks must be called at the top level of React functions or custom hooks."
  },
  {
    id: "qq18", quizId: "q3", questionText: "What makes custom hooks recognizable to React tooling?",
    options: ["Their name starts with use", "They return HTML files", "They contain only CSS", "They run outside React"],
    correctAnswer: 0, explanation: "Custom hooks should start with use so React tooling can enforce hook rules."
  },
];

export const seedCertificates: Certificate[] = [
  {
    id: "cert-react-mastery-demo",
    certificateCode: "SIFT-REACT-MASTERY-DEMO",
    userId: "demo-user",
    courseId: "react-mastery",
    learnerName: "Demo Learner",
    title: "React Mastery",
    skills: ["React", "JSX", "Hooks", "State Management", "Components"],
    issuedAt: new Date("2026-06-30T00:00:00.000Z"),
    status: "active",
    trustLevel: "Verified",
    trustScore: 100,
    quizAverage: 92,
    verificationSummary:
      "Verified by completed lesson checkpoints, randomized quiz checkpoints, 92% average quiz performance, and learner reflection evidence.",
    criteria: [
      "100% required lessons completed",
      "All module quiz checkpoints passed",
      "Quiz average met the 80% certificate threshold",
      "Reflection evidence submitted before certificate unlock",
    ],
  },
  {
    id: "cert-python-fundamentals-demo",
    certificateCode: "SIFT-PYTHON-FUNDAMENTALS-DEMO",
    userId: "demo-user",
    courseId: "python-fundamentals",
    learnerName: "Demo Learner",
    title: "Python Fundamentals",
    skills: ["Python", "Data Types", "Functions", "OOP"],
    issuedAt: new Date("2026-06-30T00:00:00.000Z"),
    status: "active",
    trustLevel: "Verified",
    trustScore: 100,
    quizAverage: 88,
    verificationSummary:
      "Verified by completed lesson checkpoints, randomized quiz checkpoints, 88% average quiz performance, and learner reflection evidence.",
    criteria: [
      "100% required lessons completed",
      "All module quiz checkpoints passed",
      "Quiz average met the 80% certificate threshold",
      "Reflection evidence submitted before certificate unlock",
    ],
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return seedCourses.find(c => c.slug === slug);
}

export function getModulesByCourse(courseId: string): CourseModule[] {
  return seedModules.filter(m => m.courseId === courseId).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getLessonsByModule(moduleId: string): Lesson[] {
  return seedLessons.filter(l => l.moduleId === moduleId).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getQuizByModule(moduleId: string): Quiz | undefined {
  return seedQuizzes.find(q => q.moduleId === moduleId);
}

export function getQuizQuestions(quizId: string): QuizQuestion[] {
  return seedQuizQuestions.filter(qq => qq.quizId === quizId);
}

export function getCertificateByCode(code: string): Certificate | undefined {
  return seedCertificates.find((certificate) => certificate.certificateCode === code);
}

export function getDemoCertificateCode(courseId: string): string {
  return `SIFT-${courseId.toUpperCase().replaceAll("-", "-")}-DEMO`;
}
