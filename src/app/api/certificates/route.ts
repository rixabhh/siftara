import { NextResponse } from "next/server";
import { getDb, schema } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { getCertificateTrustSummary } from "@/lib/learning/trust";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const courseId = searchParams.get("courseId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const db = getDb();
    const conditions = [eq(schema.certificates.userId, userId)];
    if (courseId) conditions.push(eq(schema.certificates.courseId, courseId));

    const certificates = await db.select().from(schema.certificates).where(and(...conditions));
    return NextResponse.json({ certificates });
  } catch {
    return NextResponse.json({ certificates: [], fallback: true });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, courseId, learnerName, title, skills, quizAverage, trustScore } = body;

  if (!userId || !courseId || !learnerName || !title) {
    return NextResponse.json({ error: "userId, courseId, learnerName, and title are required" }, { status: 400 });
  }

  try {
    const db = getDb();
    const now = new Date();
    const id = crypto.randomUUID();
    const code = `SIFT-${courseId.toUpperCase().replace(/[^A-Z0-9]/g, "-")}-${Date.now().toString(36).toUpperCase()}`;

    await db.insert(schema.certificates).values({
      id,
      certificateCode: code,
      userId,
      courseId,
      mySiftId: null,
      learnerName,
      title,
      skillsJson: skills ? JSON.stringify(skills) : null,
      scoreSummaryJson: quizAverage ? JSON.stringify({ quizAverage }) : null,
      trustLevel: "Verified",
      trustScore: trustScore ?? 100,
      verificationSummary: getCertificateTrustSummary(quizAverage ?? 0),
      verificationUrl: `/certificates/verify/${code}`,
      issuedAt: now,
      status: "active",
    });

    return NextResponse.json({ certificateCode: code, id });
  } catch {
    return NextResponse.json({ error: "Failed to issue certificate" }, { status: 500 });
  }
}
