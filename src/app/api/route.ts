import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: "Siftara API",
    version: "0.1.0",
    endpoints: {
      courses: "/api/courses",
      progress: "/api/progress",
      quizzes: "/api/quizzes",
      certificates: "/api/certificates",
      "my-sift": "/api/my-sift",
      ai: "/api/ai",
    },
  });
}
