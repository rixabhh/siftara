CREATE TABLE `ai_agent_jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`agent_type` text NOT NULL,
	`related_entity_type` text,
	`related_entity_id` text,
	`input_hash` text,
	`input_data` text,
	`output_data` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`confidence_score` real,
	`requires_review` integer DEFAULT false NOT NULL,
	`provider` text,
	`model` text,
	`prompt_version` text,
	`token_usage` integer DEFAULT 0 NOT NULL,
	`estimated_cost` real DEFAULT 0 NOT NULL,
	`error_message` text,
	`created_at` integer NOT NULL,
	`completed_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `analytics_events` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`event_name` text NOT NULL,
	`properties_json` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `certificates` (
	`id` text PRIMARY KEY NOT NULL,
	`certificate_code` text NOT NULL,
	`user_id` text NOT NULL,
	`course_id` text,
	`my_sift_id` text,
	`learner_name` text NOT NULL,
	`title` text NOT NULL,
	`skills_json` text,
	`score_summary_json` text,
	`trust_level` text DEFAULT 'verified' NOT NULL,
	`trust_score` integer DEFAULT 0 NOT NULL,
	`verification_summary` text,
	`verification_url` text,
	`issued_at` integer NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `certificates_certificate_code_unique` ON `certificates` (`certificate_code`);--> statement-breakpoint
CREATE TABLE `course_modules` (
	`id` text PRIMARY KEY NOT NULL,
	`course_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`estimated_minutes` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`category_id` text,
	`difficulty` text DEFAULT 'beginner' NOT NULL,
	`estimated_minutes` integer DEFAULT 0 NOT NULL,
	`source_type` text DEFAULT 'youtube' NOT NULL,
	`source_url` text,
	`source_creator` text,
	`thumbnail_url` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`quality_score` real,
	`certificate_enabled` integer DEFAULT true NOT NULL,
	`created_by` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `courses_slug_unique` ON `courses` (`slug`);--> statement-breakpoint
CREATE TABLE `creator_submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`creator_name` text NOT NULL,
	`creator_email` text,
	`source_url` text NOT NULL,
	`status` text DEFAULT 'review' NOT NULL,
	`quality_score` integer,
	`review_notes` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `enrollments` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`course_id` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`progress_percentage` integer DEFAULT 0 NOT NULL,
	`started_at` integer NOT NULL,
	`completed_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `feedback_events` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`entity_type` text NOT NULL,
	`entity_id` text NOT NULL,
	`rating` integer,
	`difficulty` text,
	`comment` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `lesson_progress` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`course_id` text NOT NULL,
	`lesson_id` text NOT NULL,
	`status` text DEFAULT 'not_started' NOT NULL,
	`watched_seconds` integer DEFAULT 0 NOT NULL,
	`completed_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` text PRIMARY KEY NOT NULL,
	`course_id` text NOT NULL,
	`module_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`youtube_video_id` text,
	`youtube_url` text,
	`duration_seconds` integer DEFAULT 0 NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`is_required` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`module_id`) REFERENCES `course_modules`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `my_sift_credits` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`available_credits` integer DEFAULT 0 NOT NULL,
	`used_credits` integer DEFAULT 0 NOT NULL,
	`source` text DEFAULT 'free_trial' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `my_sifts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`source_url` text NOT NULL,
	`source_type` text DEFAULT 'youtube' NOT NULL,
	`title` text,
	`description` text,
	`educational_score` integer,
	`approval_status` text DEFAULT 'pending' NOT NULL,
	`difficulty` text,
	`estimated_minutes` integer,
	`roadmap_json` text,
	`schedule_json` text,
	`certificate_eligibility` text DEFAULT 'pending' NOT NULL,
	`status` text DEFAULT 'created' NOT NULL,
	`is_free_trial` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`provider` text NOT NULL,
	`provider_payment_id` text,
	`amount` integer NOT NULL,
	`currency` text DEFAULT 'USD' NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`product_type` text NOT NULL,
	`credits_added` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `quiz_attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`quiz_id` text NOT NULL,
	`variant_id` text,
	`score` integer NOT NULL,
	`passed` integer NOT NULL,
	`answers_json` text,
	`started_at` integer NOT NULL,
	`completed_at` integer,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `quiz_questions` (
	`id` text PRIMARY KEY NOT NULL,
	`quiz_id` text NOT NULL,
	`question_text` text NOT NULL,
	`question_type` text DEFAULT 'mcq' NOT NULL,
	`options_json` text NOT NULL,
	`correct_answer_json` text NOT NULL,
	`explanation` text,
	`difficulty` text DEFAULT 'medium' NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `quizzes` (
	`id` text PRIMARY KEY NOT NULL,
	`course_id` text NOT NULL,
	`module_id` text,
	`title` text NOT NULL,
	`quiz_type` text DEFAULT 'mcq' NOT NULL,
	`pass_score` integer DEFAULT 70 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`module_id`) REFERENCES `course_modules`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `team_assignments` (
	`id` text PRIMARY KEY NOT NULL,
	`team_id` text NOT NULL,
	`course_id` text,
	`my_sift_id` text,
	`title` text NOT NULL,
	`due_at` integer,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `teams` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`owner_user_id` text NOT NULL,
	`plan_type` text DEFAULT 'pilot' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`owner_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`avatar_url` text,
	`auth_provider` text DEFAULT 'clerk' NOT NULL,
	`role` text DEFAULT 'learner' NOT NULL,
	`plan_type` text DEFAULT 'free' NOT NULL,
	`free_my_sift_used` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);