import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Badge variant="secondary" className="mb-4 gap-1.5">
          <FileText className="h-3.5 w-3.5" />
          Legal
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: June 2026</p>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-8 space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              By accessing or using Siftara, you agree to these Terms of Service. If you do not agree, do not use the service. Siftara reserves the right to update these terms at any time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">2. Description of Service</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Siftara is a curated AI learning platform that transforms publicly available educational content into structured learning paths with roadmaps, quizzes, progress tracking, assessments, and free digitally verified certificates. Siftara does not sell access to third-party video content.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">3. User Accounts</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate information during registration and to update it as necessary. You are responsible for all activities under your account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">4. Learning Content</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Siftara curates publicly available educational content. Original video content belongs to its respective creators and platforms. Siftara provides learning structure, progress tracking, quizzes, assessments, and verification. Siftara is not affiliated with YouTube or any content creator unless explicitly stated.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">5. Certificates</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Siftara Verified Certificates confirm completion and assessment within Siftara. They are not academic degrees, professional licenses, or endorsements by third-party creators, platforms, or institutions. Certificates are issued after learners meet defined completion criteria.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">6. My Sift</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              My Sift allows users to create personalized learning paths from YouTube content. Each user receives one free successful My Sift during early access. Siftara reserves the right to limit or queue generation when AI capacity is exhausted.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">7. Prohibited Conduct</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You agree not to misuse the service, attempt to access other users&apos; data, circumvent usage limits, or use the service for any unlawful purpose.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">8. Limitation of Liability</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Siftara is provided &quot;as is&quot; without warranties. Siftara shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">9. Changes to Terms</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Siftara may update these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">10. Contact</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For questions about these terms, contact Siftara through the official channels listed on the website.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
