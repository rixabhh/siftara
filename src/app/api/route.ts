import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: "Siftara API",
    version: "0.1.0",
    endpoints: {
      courses: "/api/courses",
      "courses/:slug": "/api/courses/:slug",
      enrollments: "/api/enrollments",
      progress: "/api/progress",
      "quizzes/:quizId": "/api/quizzes/:quizId",
      certificates: "/api/certificates",
      "certificates/:code": "/api/certificates/:code",
      "my-sift": "/api/my-sift",
      ai: "/api/ai",
      analytics: "/api/analytics",
      payments: "/api/payments",
    },
  });
}
