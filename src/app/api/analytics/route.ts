import { NextResponse } from "next/server";
import { analyticsEvents } from "@/lib/growth/phase-data";

export async function GET() {
  return NextResponse.json({
    message: "Analytics event contract",
    events: analyticsEvents,
    note: "Phase 3+ endpoint shape for launch funnels, certificate sharing, My Sift usage, and payment conversion.",
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const eventName = String(body.eventName ?? "");

  return NextResponse.json({
    accepted: analyticsEvents.includes(eventName),
    eventName,
    queued: true,
    receivedAt: new Date().toISOString(),
  });
}
