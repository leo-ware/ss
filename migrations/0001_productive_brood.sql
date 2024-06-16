CREATE TABLE IF NOT EXISTS "author_to_paper" (
	"author_id" text NOT NULL,
	"paper_id" text NOT NULL,
	CONSTRAINT "author_to_paper_author_id_paper_id_pk" PRIMARY KEY("author_id","paper_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authors" (
	"author_id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "papers" (
	"paper_id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"year" integer NOT NULL,
	"venue" text,
	"abstract" text,
	"url" text,
	"citation_count" integer,
	"reference_count" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_to_paper" (
	"project_id" integer NOT NULL,
	"paper_id" text NOT NULL,
	CONSTRAINT "project_to_paper_project_id_paper_id_pk" PRIMARY KEY("project_id","paper_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"user_id" integer
);
--> statement-breakpoint
ALTER TABLE "users_table" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_table_email_unique";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "author_to_paper" ADD CONSTRAINT "author_to_paper_author_id_authors_author_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("author_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "author_to_paper" ADD CONSTRAINT "author_to_paper_paper_id_papers_paper_id_fk" FOREIGN KEY ("paper_id") REFERENCES "public"."papers"("paper_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");