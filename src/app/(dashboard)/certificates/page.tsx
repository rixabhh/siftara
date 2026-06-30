import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";
import { getDb, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { seedCertificates } from "@/lib/db/seed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShareButton } from "@/components/share-button";
import { CertificatePreview } from "@/components/product-graphics";

async function getCertificates(userId: string) {
  try {
    const db = getDb();
    const certs = await db.select().from(schema.certificates).where(eq(schema.certificates.userId, userId));
    if (certs.length > 0) {
      return certs.map((c) => ({
        id: c.id,
        certificateCode: c.certificateCode,
        title: c.title,
        learnerName: c.learnerName,
        skills: c.skillsJson ? JSON.parse(c.skillsJson) : [],
        issuedAt: c.issuedAt,
        trustScore: c.trustScore,
        status: c.status,
      }));
    }
  } catch {}
  return seedCertificates;
}

export default async function CertificatesPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const certificates = await getCertificates(userId);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mb-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <Badge variant="secondary" className="mb-4 gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" />
            Siftara Verified
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Your proof library.</h1>
        </div>
        <p className="max-w-2xl text-muted-foreground lg:justify-self-end">
          Certificates are signed records of completed checkpoints inside Siftara. Share the verification page when someone needs to inspect the criteria.
        </p>
      </div>

      {certificates.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
              <Award className="h-7 w-7 text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-lg font-semibold">No certificates yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Finish the required checkpoints to earn your first Siftara Verified Certificate.
            </p>
            <Button asChild className="mt-6">
              <Link href="/courses">Explore paths</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {certificates.map((certificate) => (
            <Card key={certificate.id} className="overflow-hidden border-border/50">
              <div className="p-4">
                <CertificatePreview
                  learnerName={certificate.learnerName}
                  title={certificate.title}
                  certificateCode={certificate.certificateCode}
                />
              </div>
              <CardContent className="p-5">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Signed record</p>
                  <h2 className="mt-1 text-xl font-semibold">{certificate.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Issued to {certificate.learnerName}</p>
                  <Badge variant="secondary" className="mt-4 gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Trust score {certificate.trustScore ?? 100}%
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {certificate.skills.map((skill: string) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
                  <span>
                    Issued{" "}
                    {new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(
                      certificate.issuedAt
                    )}
                  </span>
                  <span className="font-mono">{certificate.certificateCode}</span>
                </div>
                <div className="mt-5 flex gap-2">
                  <ShareButton
                    title={`${certificate.title} Certificate`}
                    text={`I earned a verified ${certificate.title} certificate on Siftara!`}
                    url={`${typeof window !== "undefined" ? window.location.origin : ""}/certificates/verify/${certificate.certificateCode}`}
                    className="flex-1"
                  />
                  <Button variant="outline" asChild>
                    <Link href={`/certificates/verify/${certificate.certificateCode}`} className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Verify
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
