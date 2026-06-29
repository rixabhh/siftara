import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "AI agent endpoints",
    agents: ["sift-check", "curriculum-builder", "quiz-generator", "roadmap-builder"],
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { agentType } = body;

  return NextResponse.json({
    message: `AI agent '${agentType}' triggered`,
    status: "pending",
    jobId: crypto.randomUUID(),
  });
}
