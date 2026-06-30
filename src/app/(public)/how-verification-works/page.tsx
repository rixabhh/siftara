import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Lock,
  Search,
  BookOpen,
  FileQuestion,
  ExternalLink,
} from "lucide-react";

export default function HowVerificationWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4 gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" />
          Certificate Trust
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">How Siftara verifies learning</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Siftara Verified Certificates are issued only after learners complete required lessons and pass the checkpoints defined for a learning path. Each certificate includes a unique ID, public verification link, and digital signature.
        </p>
      </div>

      {/* What a certificate proves */}
      <section className="mb-12">
        <Card className="border-border/50">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                <Award className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">What a Siftara certificate proves</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  A Siftara Verified Certificate confirms that the learner completed a Siftara learning path and met the required checkpoints, such as lesson completion, quizzes, assessments, and project requirements where applicable.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* What it does not claim */}
      <section className="mb-12">
        <Card className="border-border/50">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                <Lock className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">What it does not claim</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Siftara certificates are not academic degrees, professional licenses, or endorsements by YouTube, creators, employers, or institutions unless explicitly stated. They verify completion of a self-guided learning path within Siftara.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* How learners earn certificates */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">How learners earn certificates</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { icon: BookOpen, text: "Complete required lessons" },
            { icon: FileQuestion, text: "Complete required quizzes" },
            { icon: CheckCircle2, text: "Meet minimum score threshold" },
            { icon: CheckCircle2, text: "Complete final assessment where required" },
            { icon: CheckCircle2, text: "Submit project where required" },
            { icon: CheckCircle2, text: "Meet certificate eligibility rules" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border p-4">
              <item.icon className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Digital verification */}
      <section className="mb-12">
        <Card className="border-border/50">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                <ShieldCheck className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Digital verification</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Each certificate has a unique certificate ID and verification URL. Siftara checks the certificate record and digital signature to confirm that the certificate was issued by Siftara and has not been altered.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Assessment strictness */}
      <section className="mb-12">
        <Card className="border-border/50">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
                <FileQuestion className="h-5 w-5 text-violet-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Assessment strictness</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Siftara does not issue certificates simply for opening a video. Certificates require completion of defined checkpoints. The exact criteria may vary by path, but each certificate page shows what was required for that certificate.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* How to verify */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">How to verify a certificate</h2>
        <div className="space-y-4">
          {[
            "Open the verification link or scan the QR code.",
            "Confirm the certificate status is valid.",
            "Match the learner name and course/path title.",
            "Review the skills and completion criteria.",
            "Check the digital signature status.",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-4 rounded-xl border p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </div>
              <span className="text-sm pt-1">{step}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Source attribution */}
      <section className="mb-12">
        <Card className="border-border/50">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/10">
                <Search className="h-5 w-5 text-rose-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Source content attribution</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Some Siftara paths use public educational content from third-party platforms. The original content belongs to its respective creators and platforms. Siftara provides the learning structure, assessment, progress tracking, and verification layer.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Report an issue */}
      <section className="mb-12">
        <Card className="border-border/50">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
                <Lock className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Report an issue</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  If you believe a certificate is inaccurate, misused, or suspicious, contact Siftara with the certificate ID. We take certificate integrity seriously.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTAs */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button size="lg" className="gap-2" asChild>
          <Link href="/courses">
            <Award className="h-4 w-4" />
            Explore Siftara learning paths
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/certificates/verify/SIFT-REACT-MASTERY-DEMO" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Verify a certificate
          </Link>
        </Button>
      </div>
    </div>
  );
}
