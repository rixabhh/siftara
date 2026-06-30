import Link from "next/link";
import { SiftaraLogo } from "@/components/siftara-logo";

const footerLinks = {
  product: [
    { href: "/courses", label: "Explore Paths" },
    { href: "/my-sift", label: "My Sift" },
    { href: "/certificates", label: "Certificates" },
    { href: "/how-verification-works", label: "How Verification Works" },
  ],
  legal: [
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <SiftaraLogo className="h-7 w-7" />
              <span className="text-lg font-bold">Siftara</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Curated learning paths from free content. Checkpoints, progress, and free verified certificates.
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

        <div className="mt-12 border-t pt-8">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Siftara is not affiliated with YouTube. Third-party video content belongs to its respective creators and platforms. Siftara provides learning structure, progress tracking, assessments, and certificate verification. Siftara Verified Certificates confirm completion and assessment within Siftara — they are not academic degrees, professional licenses, or endorsements by third-party creators, platforms, or institutions.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Siftara. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
