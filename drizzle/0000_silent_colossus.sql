CREATE TABLE `audit_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`opportunity_id` integer NOT NULL,
	`action` text NOT NULL,
	`actor` text NOT NULL,
	`detail` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `investor_mandates` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`investor` text NOT NULL,
	`sector` text NOT NULL,
	`ticket_min` integer NOT NULL,
	`ticket_max` integer NOT NULL,
	`geography` text NOT NULL,
	`risk_score` real DEFAULT 0.5 NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `opportunities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`company` text NOT NULL,
	`sector` text NOT NULL,
	`summary` text NOT NULL,
	`location` text NOT NULL,
	`value_min` integer NOT NULL,
	`value_max` integer NOT NULL,
	`confidence` integer NOT NULL,
	`matches` integer DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'Review' NOT NULL,
	`source` text NOT NULL,
	`published` text NOT NULL,
	`owner` text DEFAULT 'Unassigned' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
