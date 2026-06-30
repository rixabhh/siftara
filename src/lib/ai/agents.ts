import { generate } from "./providers";

const SYSTEM_PROMPTS = {
  siftCheck: `You are Syft, Siftara's AI educational content evaluator. Analyze YouTube content for educational value.

Respond in JSON with this exact structure:
{
  "score": <number 0-100>,
  "status": "approved" | "needs_clarification" | "notes_only" | "rejected",
  "reason": "<one sentence explanation>",
  "signals": ["<signal1>", "<signal2>", ...],
  "topicCategory": "<category>",
  "difficulty": "beginner" | "intermediate" | "advanced",
  "certificateEligible": <boolean>
}

Scoring:
- 80-100: Approved for full course creation
- 60-79: Needs follow-up questions
- 40-59: Roadmap/notes only, no certificate
- Below 40: Reject

Evaluate: title, description, playlist structure, video lengths, channel type, educational intent.`,

  curriculumBuilder: `You are Syft, Siftara's AI curriculum architect. Convert learning content into a structured course.

Respond in JSON:
{
  "title": "<course title>",
  "description": "<2-3 sentence description>",
  "learningOutcomes": ["<outcome1>", ...],
  "difficulty": "beginner" | "intermediate" | "advanced",
  "estimatedMinutes": <number>,
  "modules": [
    {
      "title": "<module title>",
      "description": "<module description>",
      "estimatedMinutes": <number>,
      "lessons": [
        {
          "title": "<lesson title>",
          "description": "<lesson description>",
          "youtubeUrl": "<url if available>",
          "durationSeconds": <number>
        }
      ]
    }
  ],
  "skills": ["<skill1>", ...],
  "certificateCriteria": ["<criteria1>", ...]
}`,

  quizGenerator: `You are Syft, Siftara's AI assessment engine. Generate quiz questions for a learning module.

Respond in JSON:
{
  "questions": [
    {
      "questionText": "<question>",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": <0-3 index>,
      "explanation": "<why correct>",
      "difficulty": "easy" | "medium" | "hard"
    }
  ]
}

Generate 5-8 questions per module. Mix difficulty levels. Test understanding, not memorization.`,

  roadmapBuilder: `You are Syft, Siftara's AI learning path architect. Create a visual roadmap for a course.

Respond in JSON:
{
  "nodes": [
    {
      "id": "<node id>",
      "title": "<node title>",
      "type": "lesson" | "quiz" | "project" | "milestone",
      "moduleId": "<module id>",
      "estimatedMinutes": <number>,
      "dependencies": ["<prerequisite node ids>"]
    }
  ],
  "checkpoints": [
    {
      "afterModule": <module index>,
      "type": "quiz" | "project",
      "title": "<checkpoint title>"
    }
  ],
  "completionCriteria": ["<criteria1>", ...]
}`,
};

function parseJSONResponse<T>(content: string): T | null {
  try {
    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
    const jsonStr = jsonMatch ? jsonMatch[1] : content;
    const cleaned = jsonStr.replace(/^[\s\S]*?(\{[\s\S]*\})[\s\S]*$/, "$1");
    return JSON.parse(cleaned) as T;
  } catch {
    try {
      return JSON.parse(content) as T;
    } catch {
      return null;
    }
  }
}

export interface SiftCheckResult {
  score: number;
  status: "approved" | "needs_clarification" | "notes_only" | "rejected";
  reason: string;
  signals: string[];
  topicCategory: string;
  difficulty: string;
  certificateEligible: boolean;
}

export async function runSiftCheck(
  url: string,
  title?: string,
  description?: string,
  channelName?: string
): Promise<SiftCheckResult> {
  const prompt = `Evaluate this YouTube content for educational value:

URL: ${url}
${title ? `Title: ${title}` : ""}
${description ? `Description: ${description}` : ""}
${channelName ? `Channel: ${channelName}` : ""}

Is this content suitable for structured learning? Should it earn a certificate?`;

  const result = await generate(prompt, SYSTEM_PROMPTS.siftCheck);

  const parsed = parseJSONResponse<SiftCheckResult>(result.content);
  if (parsed) return parsed;

  return {
    score: 50,
    status: "needs_clarification",
    reason: "Could not evaluate content automatically. Please provide more details.",
    signals: ["Automated evaluation incomplete"],
    topicCategory: "unknown",
    difficulty: "beginner",
    certificateEligible: false,
  };
}

export interface CurriculumResult {
  title: string;
  description: string;
  learningOutcomes: string[];
  difficulty: string;
  estimatedMinutes: number;
  modules: Array<{
    title: string;
    description: string;
    estimatedMinutes: number;
    lessons: Array<{
      title: string;
      description: string;
      youtubeUrl?: string;
      durationSeconds: number;
    }>;
  }>;
  skills: string[];
  certificateCriteria: string[];
}

export async function buildCurriculum(
  url: string,
  title?: string,
  description?: string
): Promise<CurriculumResult> {
  const prompt = `Build a structured course from this YouTube content:

URL: ${url}
${title ? `Title: ${title}` : ""}
${description ? `Description: ${description}` : ""}

Create modules, lessons, learning outcomes, and certificate criteria.`;

  const result = await generate(prompt, SYSTEM_PROMPTS.curriculumBuilder);

  const parsed = parseJSONResponse<CurriculumResult>(result.content);
  if (parsed) return parsed;

  return {
    title: title ?? "Generated Course",
    description: description ?? "A structured learning path generated from YouTube content.",
    learningOutcomes: ["Understand core concepts", "Apply knowledge practically"],
    difficulty: "beginner",
    estimatedMinutes: 180,
    modules: [],
    skills: [],
    certificateCriteria: ["Complete all lessons", "Pass module quizzes"],
  };
}

export interface QuizQuestionResult {
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: string;
}

export interface QuizGenerationResult {
  questions: QuizQuestionResult[];
}

export async function generateQuiz(
  moduleTitle: string,
  moduleDescription: string,
  lessonTitles: string[],
  questionCount = 6
): Promise<QuizGenerationResult> {
  const prompt = `Generate ${questionCount} quiz questions for this module:

Module: ${moduleTitle}
Description: ${moduleDescription}
Lessons: ${lessonTitles.join(", ")}

Test understanding, not just memorization. Include explanations.`;

  const result = await generate(prompt, SYSTEM_PROMPTS.quizGenerator);

  const parsed = parseJSONResponse<QuizGenerationResult>(result.content);
  if (parsed && parsed.questions?.length > 0) return parsed;

  return {
    questions: [
      {
        questionText: `What is the main focus of "${moduleTitle}"?`,
        options: [
          "Understanding core concepts",
          " memorizing definitions",
          "Writing boilerplate code",
          "Reading documentation only",
        ],
        correctAnswer: 0,
        explanation: "The module focuses on building practical understanding of core concepts.",
        difficulty: "easy",
      },
    ],
  };
}

export interface RoadmapNode {
  id: string;
  title: string;
  type: "lesson" | "quiz" | "project" | "milestone";
  moduleId: string;
  estimatedMinutes: number;
  dependencies: string[];
}

export interface RoadmapCheckpoint {
  afterModule: number;
  type: string;
  title: string;
}

export interface RoadmapResult {
  nodes: RoadmapNode[];
  checkpoints: RoadmapCheckpoint[];
  completionCriteria: string[];
}

export async function buildRoadmap(
  courseTitle: string,
  modules: Array<{ id: string; title: string; lessons: Array<{ id: string; title: string }> }>
): Promise<RoadmapResult> {
  const moduleSummaries = modules
    .map((m) => `- ${m.title} (${m.lessons.length} lessons): ${m.lessons.map((l) => l.title).join(", ")}`)
    .join("\n");

  const prompt = `Create a learning roadmap for this course:

Course: ${courseTitle}

Modules:
${moduleSummaries}

Create nodes, checkpoints, and completion criteria.`;

  const result = await generate(prompt, SYSTEM_PROMPTS.roadmapBuilder);

  const parsed = parseJSONResponse<RoadmapResult>(result.content);
  if (parsed) return parsed;

  const nodes: RoadmapNode[] = [];
  const checkpoints: RoadmapCheckpoint[] = [];

  modules.forEach((mod, modIndex) => {
    mod.lessons.forEach((lesson, lessonIndex) => {
      nodes.push({
        id: lesson.id,
        title: lesson.title,
        type: "lesson",
        moduleId: mod.id,
        estimatedMinutes: 15,
        dependencies: lessonIndex > 0 ? [mod.lessons[lessonIndex - 1].id] : modIndex > 0 ? [modules[modIndex - 1].lessons[modules[modIndex - 1].lessons.length - 1].id] : [],
      });
    });
    checkpoints.push({
      afterModule: modIndex,
      type: "quiz",
      title: `Module ${modIndex + 1} Assessment`,
    });
  });

  return {
    nodes,
    checkpoints,
    completionCriteria: ["Complete all lessons", "Pass all module quizzes", "Submit reflection"],
  };
}
