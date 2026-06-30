ALTER TABLE `certificates` ADD `criteria_version` text DEFAULT 'v1' NOT NULL;--> statement-breakpoint
ALTER TABLE `certificates` ADD `signed_payload_hash` text;--> statement-breakpoint
ALTER TABLE `certificates` ADD `digital_signature` text;--> statement-breakpoint
ALTER TABLE `certificates` ADD `signature_algorithm` text DEFAULT 'hmac-sha256' NOT NULL;--> statement-breakpoint
ALTER TABLE `certificates` ADD `revoked_at` integer;--> statement-breakpoint
ALTER TABLE `certificates` ADD `revocation_reason` text;