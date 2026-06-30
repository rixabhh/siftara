import { NextResponse } from "next/server";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { runSiftCheck, buildCurriculum, generateQuiz, buildRoadmap } from "@/lib/ai/agents";
import { isAuthError, requireAuth } from "@/lib/auth";

type RoadmapModuleInput = {
  id: string;
  title: string;
  lessons: Array<{ id: string; title: string }>;
};

const AGENTS = [
  "sift-check",
  "curriculum-builder",
  "quiz-generator",
  "roadmap-builder",
];

export async function GET() {
  return NextResponse.json({
    message: "Syft - Siftara AI Agent System",
    agents: AGENTS,
    providers: {
      primary: "Cloudflare Workers AI",
      fallback: "OpenRouter",
    },
    trustMoat: "Syft generates varied assessments, reviews reflection evidence, and flags suspicious completion patterns. Certificates require learning evidence.",
  });
}

export async function POST(request: Request) {
  let userId: string;
  try {
    userId = await requireAuth();
  } catch (e) {
    if (isAuthError(e)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    throw e;
  }

  const body = await request.json();
  const { agentType, input } = body;
  const safeInput = stripClientIdentity(input);

  if (!agentType || !AGENTS.includes(agentType)) {
    return NextResponse.json(
      { error: `Invalid agentType. Must be one of: ${AGENTS.join(", ")}` },
      { status: 400 }
    );
  }

  const jobId = crypto.randomUUID();
  const now = new Date();

  try {
    const db = getDb();

    await db.insert(schema.aiAgentJobs).values({
      id: jobId,
      userId,
      agentType,
      relatedEntityType: getNullableString(safeInput.entityType),
      relatedEntityId: getNullableString(safeInput.entityId),
      inputData: JSON.stringify(safeInput),
      status: "processing",
      provider: "cloudflare",
      model: process.env.CLOUDFLARE_AI_MODEL ?? "@cf/meta/llama-3.1-8b-instruct",
      promptVersion: `${agentType}_v1`,
      createdAt: now,
    });

    let result: unknown;

    switch (agentType) {
      case "sift-check":
        result = await runSiftCheck(
          getString(safeInput.url),
          getString(safeInput.title),
          getString(safeInput.description),
          getString(safeInput.channelName)
        );
        break;

      case "curriculum-builder":
        result = await buildCurriculum(
          getString(safeInput.url),
          getString(safeInput.title),
          getString(safeInput.description)
        );
        break;

      case "quiz-generator":
        result = await generateQuiz(
          getString(safeInput.moduleTitle),
          getString(safeInput.moduleDescription),
          getStringArray(safeInput.lessonTitles),
          getNumber(safeInput.questionCount)
        );
        break;

      case "roadmap-builder":
        result = await buildRoadmap(
          getString(safeInput.courseTitle),
          getRoadmapModules(safeInput.modules)
        );
        break;

      default:
        result = null;
    }

    const confidence = (result as { score?: number; confidence?: number })?.confidence ?? 0.85;

    await db
      .update(schema.aiAgentJobs)
      .set({
        status: "completed",
        outputData: JSON.stringify(result),
        confidenceScore: confidence,
          completedAt: new Date(),
      })
      .where(eq(schema.aiAgentJobs.id, jobId));

    return NextResponse.json({
      jobId,
      agentType,
      status: "completed",
      result,
      confidence,
    });
  } catch {
    try {
      const db = getDb();
      await db
        .update(schema.aiAgentJobs)
        .set({
          status: "failed",
          errorMessage: "Agent execution failed",
        completedAt: new Date(),
        })
        .where(eq(schema.aiAgentJobs.id, jobId));
    } catch {}

    return NextResponse.json(
      { error: "Agent execution failed", jobId },
      { status: 500 }
    );
  }
}

function stripClientIdentity(input: unknown): Record<string, unknown> {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};
  const safeInput = { ...(input as Record<string, unknown>) };
  delete safeInput.userId;
  delete safeInput.user_id;
  delete safeInput.email;
  return safeInput;
}

function getString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function getNullableString(value: unknown): string | null {
  return typeof value === "string" && value ? value : null;
}

function getNumber(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined;
}

function getStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function getRoadmapModules(value: unknown): RoadmapModuleInput[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object" && !Array.isArray(item))
    .map((item) => ({
      id: getString(item.id),
      title: getString(item.title),
      lessons: getRoadmapLessons(item.lessons),
    }))
    .filter((item) => item.id && item.title);
}

function getRoadmapLessons(value: unknown): RoadmapModuleInput["lessons"] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object" && !Array.isArray(item))
    .map((item) => ({ id: getString(item.id), title: getString(item.title) }))
    .filter((item) => item.id && item.title);
}
