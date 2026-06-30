import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  avatarUrl: text("avatar_url"),
  authProvider: text("auth_provider").notNull().default("clerk"),
  role: text("role").notNull().default("learner"),
  planType: text("plan_type").notNull().default("free"),
  freeMySiftUsed: integer("free_my_sift_used", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const courses = sqliteTable("courses", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  categoryId: text("category_id"),
  difficulty: text("difficulty").notNull().default("beginner"),
  estimatedMinutes: integer("estimated_minutes").notNull().default(0),
  sourceType: text("source_type").notNull().default("youtube"),
  sourceUrl: text("source_url"),
  sourceCreator: text("source_creator"),
  thumbnailUrl: text("thumbnail_url"),
  status: text("status").notNull().default("draft"),
  qualityScore: real("quality_score"),
  certificateEnabled: integer("certificate_enabled", { mode: "boolean" }).notNull().default(true),
  createdBy: text("created_by"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const courseModules = sqliteTable("course_modules", {
  id: text("id").primaryKey(),
  courseId: text("course_id").notNull().references(() => courses.id),
  title: text("title").notNull(),
  description: text("description"),
  sortOrder: integer("sort_order").notNull().default(0),
  estimatedMinutes: integer("estimated_minutes").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const lessons = sqliteTable("lessons", {
  id: text("id").primaryKey(),
  courseId: text("course_id").notNull().references(() => courses.id),
  moduleId: text("module_id").notNull().references(() => courseModules.id),
  title: text("title").notNull(),
  description: text("description"),
  youtubeVideoId: text("youtube_video_id"),
  youtubeUrl: text("youtube_url"),
  durationSeconds: integer("duration_seconds").notNull().default(0),
  sortOrder: integer("sort_order").notNull().default(0),
  isRequired: integer("is_required", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const enrollments = sqliteTable("enrollments", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  courseId: text("course_id").notNull().references(() => courses.id),
  status: text("status").notNull().default("active"),
  progressPercentage: integer("progress_percentage").notNull().default(0),
  startedAt: integer("started_at", { mode: "timestamp" }).notNull(),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const lessonProgress = sqliteTable("lesson_progress", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  courseId: text("course_id").notNull().references(() => courses.id),
  lessonId: text("lesson_id").notNull().references(() => lessons.id),
  status: text("status").notNull().default("not_started"),
  watchedSeconds: integer("watched_seconds").notNull().default(0),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const quizzes = sqliteTable("quizzes", {
  id: text("id").primaryKey(),
  courseId: text("course_id").notNull().references(() => courses.id),
  moduleId: text("module_id").references(() => courseModules.id),
  title: text("title").notNull(),
  quizType: text("quiz_type").notNull().default("mcq"),
  passScore: integer("pass_score").notNull().default(70),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const quizQuestions = sqliteTable("quiz_questions", {
  id: text("id").primaryKey(),
  quizId: text("quiz_id").notNull().references(() => quizzes.id),
  questionText: text("question_text").notNull(),
  questionType: text("question_type").notNull().default("mcq"),
  optionsJson: text("options_json").notNull(),
  correctAnswerJson: text("correct_answer_json").notNull(),
  explanation: text("explanation"),
  difficulty: text("difficulty").notNull().default("medium"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const quizAttempts = sqliteTable("quiz_attempts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  quizId: text("quiz_id").notNull().references(() => quizzes.id),
  variantId: text("variant_id"),
  score: integer("score").notNull(),
  passed: integer("passed", { mode: "boolean" }).notNull(),
  answersJson: text("answers_json"),
  startedAt: integer("started_at", { mode: "timestamp" }).notNull(),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const certificates = sqliteTable("certificates", {
  id: text("id").primaryKey(),
  certificateCode: text("certificate_code").notNull().unique(),
  userId: text("user_id").notNull().references(() => users.id),
  courseId: text("course_id").references(() => courses.id),
  mySiftId: text("my_sift_id"),
  learnerName: text("learner_name").notNull(),
  title: text("title").notNull(),
  skillsJson: text("skills_json"),
  scoreSummaryJson: text("score_summary_json"),
  trustLevel: text("trust_level").notNull().default("verified"),
  trustScore: integer("trust_score").notNull().default(0),
  verificationSummary: text("verification_summary"),
  verificationUrl: text("verification_url"),
  issuedAt: integer("issued_at", { mode: "timestamp" }).notNull(),
  status: text("status").notNull().default("active"),
});

export const mySifts = sqliteTable("my_sifts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  sourceUrl: text("source_url").notNull(),
  sourceType: text("source_type").notNull().default("youtube"),
  title: text("title"),
  description: text("description"),
  educationalScore: integer("educational_score"),
  approvalStatus: text("approval_status").notNull().default("pending"),
  difficulty: text("difficulty"),
  estimatedMinutes: integer("estimated_minutes"),
  roadmapJson: text("roadmap_json"),
  scheduleJson: text("schedule_json"),
  certificateEligibility: text("certificate_eligibility").notNull().default("pending"),
  status: text("status").notNull().default("created"),
  isFreeTrial: integer("is_free_trial", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const aiAgentJobs = sqliteTable("ai_agent_jobs", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  agentType: text("agent_type").notNull(),
  relatedEntityType: text("related_entity_type"),
  relatedEntityId: text("related_entity_id"),
  inputHash: text("input_hash"),
  inputData: text("input_data"),
  outputData: text("output_data"),
  status: text("status").notNull().default("pending"),
  confidenceScore: real("confidence_score"),
  requiresReview: integer("requires_review", { mode: "boolean" }).notNull().default(false),
  provider: text("provider"),
  model: text("model"),
  promptVersion: text("prompt_version"),
  tokenUsage: integer("token_usage").notNull().default(0),
  estimatedCost: real("estimated_cost").notNull().default(0),
  errorMessage: text("error_message"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  completedAt: integer("completed_at", { mode: "timestamp" }),
});

export const feedbackEvents = sqliteTable("feedback_events", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id").notNull(),
  rating: integer("rating"),
  difficulty: text("difficulty"),
  comment: text("comment"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const analyticsEvents = sqliteTable("analytics_events", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  eventName: text("event_name").notNull(),
  propertiesJson: text("properties_json"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const payments = sqliteTable("payments", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  provider: text("provider").notNull(),
  providerPaymentId: text("provider_payment_id"),
  amount: integer("amount").notNull(),
  currency: text("currency").notNull().default("USD"),
  status: text("status").notNull().default("pending"),
  productType: text("product_type").notNull(),
  creditsAdded: integer("credits_added").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const mySiftCredits = sqliteTable("my_sift_credits", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  availableCredits: integer("available_credits").notNull().default(0),
  usedCredits: integer("used_credits").notNull().default(0),
  source: text("source").notNull().default("free_trial"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const teams = sqliteTable("teams", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  ownerUserId: text("owner_user_id").notNull().references(() => users.id),
  planType: text("plan_type").notNull().default("pilot"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const teamAssignments = sqliteTable("team_assignments", {
  id: text("id").primaryKey(),
  teamId: text("team_id").notNull().references(() => teams.id),
  courseId: text("course_id").references(() => courses.id),
  mySiftId: text("my_sift_id"),
  title: text("title").notNull(),
  dueAt: integer("due_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const creatorSubmissions = sqliteTable("creator_submissions", {
  id: text("id").primaryKey(),
  creatorName: text("creator_name").notNull(),
  creatorEmail: text("creator_email"),
  sourceUrl: text("source_url").notNull(),
  status: text("status").notNull().default("review"),
  qualityScore: integer("quality_score"),
  reviewNotes: text("review_notes"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});
