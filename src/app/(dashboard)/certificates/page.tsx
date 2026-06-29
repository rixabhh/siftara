import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, ArrowRight } from "lucide-react";

export default function CertificatesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Certificates</h1>
        <p className="mt-2 text-muted-foreground">Your verified learning achievements.</p>
      </div>

      <Card className="border-border/50">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
            <Award className="h-8 w-8 text-violet-500" />
          </div>
          <h2 className="mt-4 text-lg font-semibold">No certificates yet</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            Complete a path and pass the checkpoints to earn your first Siftara Verified certificate.
          </p>
          <Button asChild className="mt-6 gap-2">
            <Link href="/courses">
              Explore Courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
