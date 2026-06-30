import Link from "next/link";
import { Award, BadgeCheck, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import { learnerProfile } from "@/lib/growth/phase-data";
import { seedCertificates } from "@/lib/db/seed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DemoProfilePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-xl font-bold">
              DL
            </div>
            <h1 className="mt-5 text-2xl font-bold">{learnerProfile.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">@{learnerProfile.handle}</p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{learnerProfile.headline}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {learnerProfile.badges.map((badge) => (
                <Badge key={badge} variant="secondary" className="gap-1.5">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  {badge}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-4">
            {learnerProfile.publicStats.map((stat) => (
              <Card key={stat.label} className="border-border/50">
                <CardContent className="p-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Verified Skill Evidence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {learnerProfile.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Public Certificates
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {seedCertificates.map((certificate) => (
                <div key={certificate.id} className="rounded-xl border bg-muted/30 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-semibold">{certificate.title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{certificate.verificationSummary}</p>
                    </div>
                    <Sparkles className="h-4 w-4 shrink-0 text-primary" />
                  </div>
                  <Button variant="outline" size="sm" asChild className="mt-4 gap-2">
                    <Link href={`/certificates/verify/${certificate.certificateCode}`}>
                      Verify
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
