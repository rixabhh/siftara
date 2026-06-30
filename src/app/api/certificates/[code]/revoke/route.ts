import { NextResponse } from "next/server";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { isAuthError, isForbiddenError, requireAdmin } from "@/lib/auth";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    await requireAdmin();
  } catch (e) {
    if (isAuthError(e)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (isForbiddenError(e)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    throw e;
  }

  const { code } = await params;
  const body = await request.json().catch(() => ({}));
  const { reason } = body as { reason?: string };

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

    if (certificate.status === "revoked") {
      return NextResponse.json({ error: "Certificate already revoked" }, { status: 400 });
    }

    const now = new Date();
    await db
      .update(schema.certificates)
      .set({
        status: "revoked",
        revokedAt: now,
        revocationReason: reason ?? "Revoked by administrator",
      })
      .where(eq(schema.certificates.id, certificate.id));

    return NextResponse.json({
      message: "Certificate revoked",
      certificateCode: code,
      revokedAt: now.toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Failed to revoke certificate" }, { status: 500 });
  }
}
