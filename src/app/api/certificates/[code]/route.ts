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

    return NextResponse.json({ certificate });
  } catch {
    const certificate = getCertificateByCode(code);
    if (!certificate) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }
    return NextResponse.json({ certificate, fallback: true });
  }
}
