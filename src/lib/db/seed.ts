import type { Course, CourseModule, Lesson, Quiz, QuizQuestion } from "../types";

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
  { id: "q1", courseId: "react-mastery", moduleId: "m1", title: "Module 1: React Basics Quiz", passScore: 70 },
  { id: "q2", courseId: "react-mastery", moduleId: "m2", title: "Module 2: Components Quiz", passScore: 70 },
  { id: "q3", courseId: "react-mastery", moduleId: "m3", title: "Module 3: Hooks Quiz", passScore: 70 },
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
