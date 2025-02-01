ALTER TABLE "users" ADD COLUMN "password" varchar(256) NOT NULL;--> statement-breakpoint
CREATE INDEX "userId_Idx" ON "users" USING btree ("id");