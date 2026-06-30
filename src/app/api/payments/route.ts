import { NextResponse } from "next/server";
import { pricingPlans } from "@/lib/growth/phase-data";

export async function GET() {
  return NextResponse.json({
    message: "Payment readiness endpoint",
    providerStatus: "not_connected",
    principle: "Certificates are never paid. Payments only unlock additional My Sifts and advanced AI personalization.",
    plans: pricingPlans.map((plan) => ({
      name: plan.name,
      price: plan.price,
      features: plan.features,
    })),
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const productType = String(body.productType ?? "my_sift_credits");

  return NextResponse.json({
    status: "preview",
    productType,
    checkoutReady: false,
    message: "Payment provider is not connected yet. This response preserves the Phase 4 contract.",
  });
}
