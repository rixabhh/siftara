import { NextResponse } from "next/server";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { runSiftCheck, buildCurriculum, generateQuiz, buildRoadmap } from "@/lib/ai/agents";

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
  const body = await request.json();
  const { agentType, input } = body;

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
      userId: input?.userId ?? null,
      agentType,
      relatedEntityType: input?.entityType ?? null,
      relatedEntityId: input?.entityId ?? null,
      inputData: JSON.stringify(input),
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
          input.url,
          input.title,
          input.description,
          input.channelName
        );
        break;

      case "curriculum-builder":
        result = await buildCurriculum(
          input.url,
          input.title,
          input.description
        );
        break;

      case "quiz-generator":
        result = await generateQuiz(
          input.moduleTitle,
          input.moduleDescription,
          input.lessonTitles ?? [],
          input.questionCount
        );
        break;

      case "roadmap-builder":
        result = await buildRoadmap(
          input.courseTitle,
          input.modules ?? []
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
