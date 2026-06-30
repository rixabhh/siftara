"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, AlertTriangle, Search, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Certificate {
  id: string;
  certificateCode: string;
  learnerName: string;
  title: string;
  trustScore: number;
  status: string;
  issuedAt: string;
}

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchCode, setSearchCode] = useState("");
  const [revoking, setRevoking] = useState<string | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    fetch("/api/certificates")
      .then((res) => res.json())
      .then((data) => setCertificates(data.certificates ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleRevoke(code: string, reason: string) {
    setRevoking(code);
    try {
      const res = await fetch(`/api/certificates/${code}/revoke`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      if (res.ok) {
        setCertificates((prev) =>
          prev.map((c) =>
            c.certificateCode === code ? { ...c, status: "revoked" } : c
          )
        );
      }
    } catch {} finally {
      setRevoking(null);
    }
  }

  const filtered = searchCode
    ? certificates.filter((c) =>
        c.certificateCode.toLowerCase().includes(searchCode.toLowerCase()) ||
        c.learnerName.toLowerCase().includes(searchCode.toLowerCase())
      )
    : certificates;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-2 gap-2">
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4" />
              Back to Admin
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Certificate Management</h1>
          <p className="mt-1 text-muted-foreground">
            View and manage issued certificates
          </p>
        </div>
      </div>

      <Card className="border-border/50 mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Search by certificate code or learner name..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="p-5">
                <div className="h-6 w-48 bg-muted animate-pulse rounded mb-2" />
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
              <ShieldCheck className="h-7 w-7 text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-lg font-semibold">No certificates found</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {searchCode ? "Try a different search term." : "No certificates have been issued yet."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((cert) => (
            <Card key={cert.id} className="border-border/50">
              <CardContent className="p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{cert.title}</h3>
                      <Badge variant={cert.status === "revoked" ? "destructive" : "default"}>
                        {cert.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {cert.learnerName} · {cert.certificateCode}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Issued {new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(cert.issuedAt))}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/certificates/verify/${cert.certificateCode}`} className="gap-1">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Verify
                      </Link>
                    </Button>
                    {cert.status !== "revoked" && (
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={revoking === cert.certificateCode}
                        onClick={() => handleRevoke(cert.certificateCode, "Revoked by administrator")}
                        className="gap-1"
                      >
                        <AlertTriangle className="h-3.5 w-3.5" />
                        {revoking === cert.certificateCode ? "Revoking..." : "Revoke"}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
