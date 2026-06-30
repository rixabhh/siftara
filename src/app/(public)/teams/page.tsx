import { Download, ShieldCheck, Users } from "lucide-react";
import { teamPilotRows } from "@/lib/growth/phase-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function TeamsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <Badge variant="secondary" className="mb-4 gap-1.5">
          <Users className="h-3.5 w-3.5" />
          Team pilot MVP
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">Assign trusted learning paths to teams.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Track progress, certificate trust, and completion reports for cohorts, student clubs, and startup teams.
        </p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Team Learning Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamPilotRows.map((row) => (
            <div key={row.cohort} className="rounded-xl border p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-semibold">{row.cohort}</h2>
                  <p className="text-sm text-muted-foreground">{row.learners} learners assigned to {row.assigned}</p>
                </div>
                <Badge variant="secondary" className="gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {row.certificates} certificates
                </Badge>
              </div>
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>Completion</span>
                  <span className="text-muted-foreground">{row.completion}%</span>
                </div>
                <Progress value={row.completion} />
              </div>
            </div>
          ))}
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV preview
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
