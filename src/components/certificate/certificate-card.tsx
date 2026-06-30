import { Award, ExternalLink } from "lucide-react";
import { ShareButton } from "@/components/share-button";

interface CertificateCardProps {
  learnerName: string;
  courseName: string;
  skills: string[];
  issuedAt: string;
  certificateCode: string;
}

export function CertificateCard({ learnerName, courseName, skills, issuedAt, certificateCode }: CertificateCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden">
      <div className="relative bg-gradient-to-br from-primary/5 via-accent-violet/5 to-primary/10 p-8 text-center">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        <div className="relative">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Award className="h-7 w-7 text-primary" />
          </div>
          <p className="mt-4 text-xs uppercase tracking-wider text-text-secondary">Siftara Verified Certificate</p>
          <h3 className="mt-2 text-xl font-bold text-foreground">{courseName}</h3>
          <p className="mt-1 text-sm text-text-secondary">Awarded to {learnerName}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skills.map((skill) => (
            <span key={skill} className="inline-flex items-center rounded-md bg-surface-soft px-2.5 py-0.5 text-xs font-medium text-text-secondary">
              {skill}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-text-secondary border-t border-border pt-4">
          <span>Issued {issuedAt}</span>
          <span className="font-mono">{certificateCode}</span>
        </div>

        <div className="mt-4 flex gap-2">
          <ShareButton
            title={`${courseName} Certificate`}
            text={`${learnerName} earned a verified ${courseName} certificate on Siftara!`}
            url={`/certificates/verify/${certificateCode}`}
            className="flex-1"
          />
          <button className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground hover:bg-surface-soft transition-colors">
            <ExternalLink className="h-4 w-4" />
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
