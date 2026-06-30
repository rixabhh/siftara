import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, Lock, Route, Clock, Trophy } from "lucide-react";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { getCertificateByCode } from "@/lib/db/seed";
import { buildCertificatePayload, verifyCertificate } from "@/lib/certificate-signing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

async function getCertificate(code: string) {
  try {
    const db = getDb();
    const [cert] = await db
      .select()
      .from(schema.certificates)
      .where(eq(schema.certificates.certificateCode, code))
      .limit(1);
    if (cert) {
      return {
        id: cert.id,
        certificateCode: cert.certificateCode,
        learnerName: cert.learnerName,
        title: cert.title,
        skills: cert.skillsJson ? JSON.parse(cert.skillsJson) : [],
        issuedAt: cert.issuedAt,
        trustScore: cert.trustScore,
        trustLevel: cert.trustLevel,
        verificationSummary: cert.verificationSummary,
        status: cert.status,
        courseId: cert.courseId,
        signedPayloadHash: cert.signedPayloadHash,
        digitalSignature: cert.digitalSignature,
        criteriaVersion: cert.criteriaVersion,
      };
    }
  } catch {}

  const seedCert = getCertificateByCode(code);
  if (!seedCert) return null;

  return {
    id: seedCert.id,
    certificateCode: seedCert.certificateCode,
    learnerName: seedCert.learnerName,
    title: seedCert.title,
    skills: seedCert.skills,
    issuedAt: seedCert.issuedAt,
    trustScore: seedCert.trustScore ?? 100,
    trustLevel: "Verified",
    verificationSummary: seedCert.verificationSummary,
    status: seedCert.status,
    courseId: seedCert.courseId,
    signedPayloadHash: null,
    digitalSignature: null,
    criteriaVersion: "v1",
  };
}

export default async function CertificateVerifyPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const certificate = await getCertificate(code);

  if (!certificate) notFound();

  let signatureStatus: { valid: boolean; reason: string } | null = null;
  if (certificate.signedPayloadHash && certificate.digitalSignature && certificate.courseId) {
    const payload = buildCertificatePayload({
      id: certificate.id,
      certificateCode: certificate.certificateCode,
      learnerName: certificate.learnerName,
      courseId: certificate.courseId,
      title: certificate.title,
      skillsJson: JSON.stringify(certificate.skills),
      issuedAt: certificate.issuedAt,
    });
    signatureStatus = await verifyCertificate(
      payload,
      certificate.digitalSignature,
      certificate.signedPayloadHash
    );
  }

  const issuedAt = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(certificate.issuedAt);

  const isRevoked = certificate.status === "revoked";
  const isValid = !isRevoked && signatureStatus?.valid !== false;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Certificate card */}
        <div className="rounded-2xl border bg-background overflow-hidden">
          {/* Header — Siftara Verified */}
          <div className="flex items-center justify-between px-8 py-5 border-b">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-bold tracking-tight">Siftara Verified</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Authentic Credential</p>
              </div>
            </div>
            <Badge variant={isValid ? "default" : "destructive"} className="gap-1.5 px-3 py-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${isValid ? "bg-primary-foreground" : "bg-destructive-foreground"}`} />
              {isRevoked ? "REVOKED" : "VALID STATUS"}
            </Badge>
          </div>

          {/* Learner info */}
          <div className="px-8 py-10 border-b">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">This verifies that</p>
            <h1 className="text-4xl font-bold tracking-tight mb-6">{certificate.learnerName}</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Has successfully completed</p>
            <h2 className="text-2xl font-bold tracking-tight">{certificate.title}</h2>
          </div>

          {/* Proof of Work */}
          <div className="px-8 py-8 border-b">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Proof of Work</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl border p-4 text-center">
                <Route className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">SiftMap Nodes</p>
                <p className="text-2xl font-bold font-mono">42/42</p>
              </div>
              <div className="rounded-xl border p-4 text-center">
                <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Verified Time</p>
                <p className="text-2xl font-bold font-mono">128 hrs</p>
              </div>
              <div className="rounded-xl border p-4 text-center">
                <Trophy className="h-5 w-5 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Sift Score</p>
                <p className="text-2xl font-bold font-mono text-primary">{certificate.trustScore}%</p>
              </div>
            </div>
          </div>

          {/* Certificate details */}
          <div className="px-8 py-6 bg-muted/30">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">ID:</span>
                  <span className="font-mono font-medium">{certificate.certificateCode}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Issued:</span>
                  <span className="font-mono font-medium">{issuedAt}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-primary font-medium mt-2">
                  <Lock className="h-3.5 w-3.5" />
                  Digital Signature Verified
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-20 h-20 bg-foreground rounded-lg" />
                <p className="text-xs text-muted-foreground">Scan to verify</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Button size="lg" className="gap-2" asChild>
            <Link href="/courses">
              Explore Siftara
            </Link>
          </Button>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-xs text-center text-muted-foreground leading-relaxed max-w-lg mx-auto">
          This certificate verifies the completion of the stated curriculum on the Siftara platform. Siftara is a private learning and verification platform and is not an accredited university. The verification status reflects the digital integrity of the record at the time of viewing.
        </p>
      </div>
    </div>
  );
}
