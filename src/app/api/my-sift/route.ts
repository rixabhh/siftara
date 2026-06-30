import { NextResponse } from "next/server";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const db = getDb();
    const mySifts = await db.select().from(schema.mySifts).where(eq(schema.mySifts.userId, userId));
    return NextResponse.json({ mySifts });
  } catch {
    return NextResponse.json({ mySifts: [], fallback: true });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, sourceUrl, title, description, educationalScore, difficulty, estimatedMinutes, roadmapJson, scheduleJson, certificateEligibility, isFreeTrial } = body;

  if (!userId || !sourceUrl) {
    return NextResponse.json({ error: "userId and sourceUrl are required" }, { status: 400 });
  }

  try {
    const db = getDb();
    const now = new Date();

    if (isFreeTrial) {
      const [user] = await db.select().from(schema.users).where(eq(schema.users.id, userId)).limit(1);
      if (user?.freeMySiftUsed) {
        return NextResponse.json({ error: "Free My Sift already used" }, { status: 403 });
      }
    }

    const id = crypto.randomUUID();
    await db.insert(schema.mySifts).values({
      id,
      userId,
      sourceUrl,
      sourceType: "youtube",
      title: title ?? null,
      description: description ?? null,
      educationalScore: educationalScore ?? null,
      approvalStatus: educationalScore && educationalScore >= 80 ? "approved" : "pending",
      difficulty: difficulty ?? null,
      estimatedMinutes: estimatedMinutes ?? null,
      roadmapJson: roadmapJson ? JSON.stringify(roadmapJson) : null,
      scheduleJson: scheduleJson ? JSON.stringify(scheduleJson) : null,
      certificateEligibility: certificateEligibility ?? "pending",
      status: "created",
      isFreeTrial: isFreeTrial,
      createdAt: now,
      updatedAt: now,
    });

    if (isFreeTrial) {
      await db.update(schema.users).set({ freeMySiftUsed: true, updatedAt: now }).where(eq(schema.users.id, userId));
    }

    return NextResponse.json({ mySiftId: id });
  } catch {
    return NextResponse.json({ error: "Failed to create My Sift" }, { status: 500 });
  }
}
