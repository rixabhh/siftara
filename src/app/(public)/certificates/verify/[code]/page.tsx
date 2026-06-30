import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { CheckCircle2, ExternalLink, Fingerprint, Lock, Route, ShieldCheck, XCircle } from "lucide-react";
import { eq } from "drizzle-orm";
import { getDb, schema } from "@/lib/db";
import { getCertificateByCode } from "@/lib/db/seed";
import { buildCertificatePayload, verifyCertificate } from "@/lib/certificate-signing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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
        criteria: [] as string[],
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
    criteria: seedCert.criteria,
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
    signatureStatus = await verifyCertificate(payload, certificate.digitalSignature, certificate.signedPayloadHash);
  }

  const issuedAt = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(certificate.issuedAt);

  const isRevoked = certificate.status === "revoked";
  const isValid = !isRevoked && signatureStatus?.valid !== false;
  const signatureLabel = signatureStatus
    ? signatureStatus.valid
      ? "Digital signature verified"
      : "Signature mismatch"
    : "Record verified in Siftara";
  const criteria = certificate.criteria ?? [];
  const visibleCriteria = criteria.length
    ? criteria
    : ["Required lessons completed", "Checkpoint assessments passed", "Reflection evidence submitted"];

  return (
    <div className="min-h-screen bg-surface-soft/40 px-4 py-6 sm:py-8">
      <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="overflow-hidden border-border/70 bg-card">
          <div className="border-b bg-[#0d1117] p-5 text-white dark:bg-surface">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-bold tracking-tight">Siftara Verified</p>
                  <p className="font-mono text-xs text-white/55">{certificate.certificateCode}</p>
                </div>
              </div>
              <Badge variant={isValid ? "default" : "destructive"} className="w-fit gap-1.5 px-3 py-1.5">
                {isValid ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                {isRevoked ? "Revoked" : isValid ? "Valid" : "Needs review"}
              </Badge>
            </div>
          </div>

          <CardContent className="p-5 sm:p-6">
            <p className="text-xs uppercase text-muted-foreground">This verifies that</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{certificate.learnerName}</h1>
            <p className="mt-6 text-xs uppercase text-muted-foreground">Completed</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">{certificate.title}</h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <ProofMetric icon={Route} label="Criteria version" value={certificate.criteriaVersion} />
              <ProofMetric icon={Fingerprint} label="Signature" value={signatureStatus?.valid === false ? "Mismatch" : "Verified"} />
              <ProofMetric icon={ShieldCheck} label="Trust score" value={`${certificate.trustScore}%`} />
            </div>

            <div className="mt-6 rounded-lg border bg-muted/40 p-4">
              <p className="text-sm font-semibold">Verification summary</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{certificate.verificationSummary}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {certificate.skills.map((skill: string) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card className="border-border/70">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold">Record status</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{signatureLabel}</p>
                </div>
              </div>
              <div className="mt-5 space-y-3 border-t pt-5 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Issued</span>
                  <span className="font-medium">{issuedAt}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium">{certificate.status}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Certificate ID</span>
                  <span className="font-mono text-xs font-medium">{certificate.certificateCode}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardContent className="p-5">
              <h2 className="font-semibold">Completion criteria</h2>
              <div className="mt-4 space-y-2">
                {visibleCriteria.map((criterion) => (
                  <div key={criterion} className="flex gap-2 rounded-lg border bg-background px-3 py-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{criterion}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardContent className="p-5">
              <h2 className="font-semibold">What this means</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                This certificate verifies completion inside Siftara. It is not an academic degree, professional license, or creator endorsement.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <Link href="/courses">
                    Explore paths
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/how-verification-works">Verification rules</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ProofMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <Icon className="h-4 w-4 text-primary" />
      <p className="mt-3 text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-sm font-semibold">{value}</p>
    </div>
  );
}
