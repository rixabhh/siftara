import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Badge variant="secondary" className="mb-4 gap-1.5">
          <Lock className="h-3.5 w-3.5" />
          Legal
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: June 2026</p>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-8 space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-3">1. Information We Collect</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Siftara collects information you provide directly, including your name, email address, and learning activity. We also collect usage data such as pages visited, courses started, and progress tracked.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">2. How We Use Your Information</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use your information to provide and improve the learning experience, track progress, issue certificates, and communicate with you about your account and learning activity.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">3. Data Storage and Security</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your data is stored securely using Cloudflare infrastructure. We implement reasonable security measures to protect your information, but no method of transmission is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">4. Data Sharing</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We do not sell your personal information. We may share anonymized, aggregated data for analytics purposes. Certificate verification pages display only public-safe information you choose to share.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">5. Your Rights</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You can access, update, or delete your account information at any time. To request data deletion, contact Siftara through the official channels listed on the website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">6. Cookies</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Siftara uses essential cookies for authentication and session management. We do not use third-party advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">7. Third-Party Services</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Siftara uses Clerk for authentication and Cloudflare for infrastructure. These services have their own privacy policies governing how they handle your data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">8. Children&apos;s Privacy</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Siftara is not intended for children under 13. We do not knowingly collect information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">9. Changes to This Policy</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We may update this privacy policy at any time. Continued use of the service after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">10. Contact</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For privacy-related questions or requests, contact Siftara through the official channels listed on the website.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
