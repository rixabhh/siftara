import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { pricingPlans } from "@/lib/growth/phase-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary" className="mb-4 gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" />
          Certificates stay free
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">Pay for personalization, not proof.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Siftara monetizes additional My Sifts, advanced AI guidance, and team workflows. Verified certificates remain free after strict learning checks.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <Card key={plan.name} className={`border-border/50 ${plan.featured ? "border-primary/30 shadow-lg" : ""}`}>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle>{plan.name}</CardTitle>
                {plan.featured && <Badge>Recommended first</Badge>}
              </div>
              <p className="text-3xl font-bold">{plan.price}</p>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-6 w-full gap-2" variant={plan.featured ? "default" : "outline"}>
                <Link href={plan.href}>
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
