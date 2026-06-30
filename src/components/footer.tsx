import Link from "next/link";
import { Sparkles } from "lucide-react";

const footerLinks = {
  product: [
    { href: "/courses", label: "Explore Courses" },
    { href: "/my-sift", label: "My Sift" },
    { href: "/certificates", label: "Certificates" },
    { href: "/pricing", label: "Pricing" },
  ],
  resources: [
    { href: "/launch", label: "Launch Kit" },
    { href: "/profile/demo", label: "Demo Profile" },
    { href: "/teams", label: "Teams" },
  ],
  company: [
    { href: "/creators", label: "Creators" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold">Siftara</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              The best free courses, structured into real learning. Human-curated. AI-guided. Verified proof.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold capitalize">{category}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Siftara. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Human-curated learning.</span>
            <span>AI-guided paths.</span>
            <span>Verified proof.</span>
          </div>
        </div>
        <div className="mt-6 border-t pt-6">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Siftara is not affiliated with YouTube. Third-party video content belongs to its respective creators and platforms. Siftara provides learning structure, progress tracking, assessments, and certificate verification. Siftara Verified Certificates confirm completion and assessment within Siftara — they are not academic degrees, professional licenses, or endorsements by third-party creators, platforms, or institutions.
          </p>
        </div>
      </div>
    </footer>
  );
}
