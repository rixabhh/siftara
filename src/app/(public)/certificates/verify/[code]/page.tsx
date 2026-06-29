import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Award, ExternalLink, Share2 } from "lucide-react";

export default async function CertificateVerifyPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

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
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              Siftara Verified
            </Badge>
            <h1 className="mt-4 text-xl font-bold">Certificate of Completion</h1>
            <p className="mt-1 text-sm text-muted-foreground">Awarded to</p>
            <p className="mt-0.5 text-lg font-semibold">Learner Name</p>
            <p className="mt-3 text-sm text-muted-foreground">for completing</p>
            <p className="mt-0.5 text-lg font-semibold text-primary">Course Title</p>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex flex-wrap gap-1.5 mb-6">
            {["React", "JavaScript", "Web Development"].map((skill) => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
          </div>

          <Separator className="mb-6" />

          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <p className="text-muted-foreground">Issued</p>
              <p className="font-medium">January 15, 2025</p>
            </div>
            <div>
              <p className="text-muted-foreground">Certificate ID</p>
              <p className="font-medium font-mono text-xs">{code}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1 gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
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
