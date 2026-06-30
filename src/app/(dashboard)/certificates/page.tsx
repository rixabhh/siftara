import Link from "next/link";
import { Award, ExternalLink, Share2, ShieldCheck } from "lucide-react";
import { seedCertificates } from "@/lib/db/seed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CertificatesPage() {
  const certificates = seedCertificates;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Certificates</h1>
        <p className="mt-2 text-muted-foreground">Your verified learning achievements.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {certificates.map((certificate) => (
          <Card key={certificate.id} className="overflow-hidden border-border/50">
            <div className="relative bg-gradient-to-br from-primary/5 via-transparent to-violet-500/5 p-6 text-center">
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_2px_2px,currentColor_1px,transparent_0)] bg-[size:24px_24px]" />
              <div className="relative">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <p className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">
                  Siftara Verified Certificate
                </p>
                <h2 className="mt-2 text-xl font-semibold">{certificate.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">Awarded to {certificate.learnerName}</p>
                <Badge variant="secondary" className="mt-4 gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Trust score {certificate.trustScore ?? 100}%
                </Badge>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-1.5">
                {certificate.skills.map((skill) => (
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
                <Button className="flex-1 gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
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
    </div>
  );
}
