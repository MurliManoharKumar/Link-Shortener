CREATE TABLE "links" (
	"id" serial PRIMARY KEY NOT NULL,
	"short_code" text NOT NULL,
	"original_url" text NOT NULL,
	"clicks" serial DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "links_short_code_unique" UNIQUE("short_code")
);
