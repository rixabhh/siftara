import { NextResponse } from "next/server";

const agents = [
  "sift-check",
  "curriculum-builder",
  "quiz-generator",
  "assessment-variant-generator",
  "certificate-trust-reviewer",
  "roadmap-builder",
];

export async function GET() {
  return NextResponse.json({
    message: "AI agent endpoints",
    agents,
    trustMoat:
      "Certificates require learning evidence. AI should generate varied assessments, review reflection evidence, and flag suspicious completion patterns before proof is issued.",
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { agentType } = body;

  return NextResponse.json({
    message: `AI agent '${agentType}' triggered`,
    status: "pending",
    jobId: crypto.randomUUID(),
    acceptedAgent: agents.includes(agentType),
  });
}
