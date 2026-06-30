"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { getDb, schema } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { getCertificateTrustSummary } from "@/lib/learning/trust";

export interface IssueCertificateInput {
  courseId: string;
  courseTitle: string;
  skills: string[];
  quizAverage: number;
  trustScore: number;
}

export async function issueCertificate(input: IssueCertificateInput) {
  const { userId } = await auth();
  if (!userId) return { error: "Not authenticated" };

  try {
    const db = getDb();
    const now = new Date();

    // Get user name from Clerk
    let learnerName = "Learner";
    try {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      learnerName = [user.firstName, user.lastName].filter(Boolean).join(" ") || user.emailAddresses?.[0]?.emailAddress || "Learner";
    } catch {}

    // Check if certificate already exists for this user+course
    const existing = await db
      .select()
      .from(schema.certificates)
      .where(and(eq(schema.certificates.userId, userId), eq(schema.certificates.courseId, input.courseId)))
      .limit(1);

    if (existing.length > 0) {
      return { certificateCode: existing[0].certificateCode, id: existing[0].id };
    }

    const id = crypto.randomUUID();
    const code = `SIFT-${input.courseId.toUpperCase().replace(/[^A-Z0-9]/g, "-")}-${Date.now().toString(36).toUpperCase()}`;

    await db.insert(schema.certificates).values({
      id,
      certificateCode: code,
      userId,
      courseId: input.courseId,
      mySiftId: null,
      learnerName,
      title: input.courseTitle,
      skillsJson: JSON.stringify(input.skills),
      scoreSummaryJson: JSON.stringify({ quizAverage: input.quizAverage }),
      trustLevel: "Verified",
      trustScore: input.trustScore,
      verificationSummary: getCertificateTrustSummary(input.quizAverage),
      verificationUrl: `/certificates/verify/${code}`,
      issuedAt: now,
      status: "active",
    });

    return { certificateCode: code, id };
  } catch (error) {
    console.error("Certificate issuance failed:", error);
    return { error: "Failed to issue certificate" };
  }
}
