CREATE TABLE IF NOT EXISTS "productos" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" text NOT NULL,
	"descripcion" text NOT NULL,
	"precio_adulto" double precision NOT NULL,
	"precio_nino" double precision NOT NULL,
	"precio_infante" double precision NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reservas" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" text NOT NULL,
	"celular" text NOT NULL,
	"email" text,
	"productos" jsonb NOT NULL,
	"total" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text,
	"user_name" varchar(50),
	"password" text,
	"type" text,
	"data" jsonb,
	"url_profile_picture" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
