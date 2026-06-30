import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";
import { getCertificateByCode } from "@/lib/db/seed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShareButton } from "@/components/share-button";

export default async function CertificateVerifyPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const certificate = getCertificateByCode(code);

  if (!certificate) notFound();

  const issuedAt = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(certificate.issuedAt);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <Card className="overflow-hidden border-border/50">
        <div className="relative bg-gradient-to-br from-emerald-500/5 via-transparent to-violet-500/5 p-8 text-center">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_2px_2px,currentColor_1px,transparent_0)] bg-[size:24px_24px]" />
          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Award className="h-7 w-7 text-primary" />
            </div>
            <Badge variant="secondary" className="mt-4 gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Siftara {certificate.trustLevel ?? "Verified"}
            </Badge>
            <h1 className="mt-4 text-xl font-bold">Certificate of Completion</h1>
            <p className="mt-1 text-sm text-muted-foreground">Awarded to</p>
            <p className="mt-0.5 text-lg font-semibold">{certificate.learnerName}</p>
            <p className="mt-3 text-sm text-muted-foreground">for completing</p>
            <p className="mt-0.5 text-lg font-semibold text-primary">{certificate.title}</p>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="mb-6 flex flex-wrap gap-1.5">
            {certificate.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>

          <Separator className="mb-6" />

          <div className="mb-6 rounded-xl border bg-muted/30 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">Trust score {certificate.trustScore ?? 100}%</p>
                  {certificate.quizAverage && (
                    <Badge variant="outline">Quiz avg {certificate.quizAverage}%</Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {certificate.verificationSummary ??
                    "Verified through lesson completion, quiz checkpoints, and Siftara certificate policy checks."}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <p className="text-muted-foreground">Issued</p>
              <p className="font-medium">{issuedAt}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Certificate ID</p>
              <p className="font-mono text-xs font-medium">{certificate.certificateCode}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <p className="flex items-center gap-1.5 font-medium capitalize">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {certificate.status}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Criteria</p>
              <p className="font-medium">Strict certificate trust policy</p>
            </div>
          </div>

          <div className="mb-6 space-y-2">
            {(certificate.criteria ?? ["Required lessons completed", "Randomized quiz checkpoints passed"]).map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <ShareButton
              title={`${certificate.title} Certificate`}
              text={`${certificate.learnerName} earned a verified ${certificate.title} certificate on Siftara!`}
              url={`/certificates/verify/${certificate.certificateCode}`}
              className="flex-1"
            />
            <Button variant="outline" asChild>
              <Link href="/courses" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Explore Siftara
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
