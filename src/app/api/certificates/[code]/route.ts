import { NextResponse } from "next/server";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { getCertificateByCode } from "@/lib/db/seed";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  try {
    const db = getDb();
    const [certificate] = await db
      .select()
      .from(schema.certificates)
      .where(eq(schema.certificates.certificateCode, code))
      .limit(1);

    if (!certificate) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    // Only return public-safe fields (no userId, no internal IDs)
    return NextResponse.json({
      certificateCode: certificate.certificateCode,
      learnerName: certificate.learnerName,
      title: certificate.title,
      skillsJson: certificate.skillsJson,
      trustLevel: certificate.trustLevel,
      trustScore: certificate.trustScore,
      verificationSummary: certificate.verificationSummary,
      issuedAt: certificate.issuedAt,
      status: certificate.status,
    });
  } catch {
    const certificate = getCertificateByCode(code);
    if (!certificate) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }
    // Return public-safe fields from seed data
    return NextResponse.json({
      certificateCode: certificate.certificateCode,
      learnerName: certificate.learnerName,
      title: certificate.title,
      skills: certificate.skills,
      trustScore: certificate.trustScore,
      verificationSummary: certificate.verificationSummary,
      issuedAt: certificate.issuedAt,
      status: certificate.status,
      fallback: true,
    });
  }
}
