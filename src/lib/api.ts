const API_BASE = "";

async function fetchAPI<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `API error: ${response.status}`);
  }

  return response.json();
}

export const api = {
  courses: {
    list: () => fetchAPI<{ courses: Array<{ id: string; title: string; slug: string; description: string; category: string; difficulty: string; estimatedMinutes: number; skills: string[]; certificateEnabled: boolean; sourceCreator: string; status: string }> }>("/api/courses"),
    get: (slug: string) => fetchAPI<{ course: Record<string, unknown>; modules: Array<Record<string, unknown>> }>(`/api/courses/${slug}`),
    create: (data: { title: string; slug: string; description: string; category?: string; difficulty?: string; estimatedMinutes?: number; sourceCreator?: string }) =>
      fetchAPI<{ courseId: string }>("/api/courses", { method: "POST", body: JSON.stringify(data) }),
  },

  enrollments: {
    list: (courseId?: string) =>
      fetchAPI<{ enrollments: Array<{ id: string; courseId: string; status: string; progressPercentage: number }> }>(
        `/api/enrollments${courseId ? `?courseId=${courseId}` : ""}`
      ),
    create: (courseId: string) =>
      fetchAPI<{ enrollment: { id: string; courseId: string; status: string } }>("/api/enrollments", {
        method: "POST",
        body: JSON.stringify({ courseId }),
      }),
  },

  progress: {
    get: (courseId: string) =>
      fetchAPI<{ lessons: Array<{ lessonId: string; status: string }>; quizzes: Array<{ quizId: string; score: number; passed: boolean }> }>(
        `/api/progress?courseId=${courseId}`
      ),
    update: (courseId: string, lessonId: string, status: string) =>
      fetchAPI<{ progressPercentage: number; completedCount: number }>("/api/progress", {
        method: "POST",
        body: JSON.stringify({ courseId, lessonId, status }),
      }),
  },

  quizzes: {
    get: (quizId: string) =>
      fetchAPI<{ quiz: { id: string; title: string; passScore: number }; questions: Array<{ id: string; questionText: string; options: string[]; correctAnswer: number; explanation: string }> }>(
        `/api/quizzes/${quizId}`
      ),
    submit: (quizId: string, data: { score: number; passed: boolean; answersJson?: unknown; variantId?: string }) =>
      fetchAPI<{ attemptId: string; score: number; passed: boolean }>(`/api/quizzes/${quizId}`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },

  certificates: {
    list: (courseId?: string) =>
      fetchAPI<{ certificates: Array<{ id: string; certificateCode: string; title: string; learnerName: string; skills: string[]; issuedAt: string; trustScore: number; status: string }> }>(
        `/api/certificates${courseId ? `?courseId=${courseId}` : ""}`
      ),
    verify: (code: string) =>
      fetchAPI<{ certificateCode: string; learnerName: string; title: string; skills: string[]; trustScore: number; issuedAt: string; status: string }>(
        `/api/certificates/${code}`
      ),
  },

  mySift: {
    list: () =>
      fetchAPI<{ mySifts: Array<{ id: string; sourceUrl: string; title: string; status: string; educationalScore: number | null }> }>(
        `/api/my-sift`
      ),
    create: (data: { sourceUrl: string; title?: string; description?: string; educationalScore?: number; difficulty?: string; estimatedMinutes?: number; roadmapJson?: unknown; scheduleJson?: unknown; certificateEligibility?: string; isFreeTrial?: boolean }) =>
      fetchAPI<{ mySiftId: string }>("/api/my-sift", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },

  ai: {
    siftCheck: (input: { url: string; title?: string; description?: string; channelName?: string }) =>
      fetchAPI<{ jobId: string; result: { score: number; status: string; reason: string; signals: string[] } }>("/api/ai", {
        method: "POST",
        body: JSON.stringify({ agentType: "sift-check", input }),
      }),
    buildCurriculum: (input: { url: string; title?: string; description?: string }) =>
      fetchAPI<{ jobId: string; result: { title: string; description: string; modules: Array<{ title: string; lessons: Array<{ title: string }> }> } }>("/api/ai", {
        method: "POST",
        body: JSON.stringify({ agentType: "curriculum-builder", input }),
      }),
    generateQuiz: (input: { moduleTitle: string; moduleDescription: string; lessonTitles: string[]; questionCount?: number }) =>
      fetchAPI<{ jobId: string; result: { questions: Array<{ questionText: string; options: string[]; correctAnswer: number; explanation: string }> } }>("/api/ai", {
        method: "POST",
        body: JSON.stringify({ agentType: "quiz-generator", input }),
      }),
    buildRoadmap: (input: { courseTitle: string; modules: Array<{ id: string; title: string; lessons: Array<{ id: string; title: string }> }> }) =>
      fetchAPI<{ jobId: string; result: { nodes: Array<{ id: string; title: string; type: string }>; checkpoints: Array<{ afterModule: number; title: string }> } }>("/api/ai", {
        method: "POST",
        body: JSON.stringify({ agentType: "roadmap-builder", input }),
      }),
  },
};
