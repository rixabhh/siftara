import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    courses: [],
    message: "Courses endpoint - implement with D1 queries",
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    message: "Course created",
    course: body,
  });
}
