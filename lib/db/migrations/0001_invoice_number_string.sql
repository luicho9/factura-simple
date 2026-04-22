ALTER TABLE "invoice" ADD COLUMN "invoice_number" text;--> statement-breakpoint
UPDATE "invoice"
SET "invoice_number" = COALESCE("invoice_prefix", '') || lpad("serial_number"::text, 4, '0');--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "invoice_number" SET NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "invoice_user_id_invoice_number_unique" ON "invoice" USING btree ("user_id","invoice_number");--> statement-breakpoint
ALTER TABLE "company" DROP COLUMN "next_serial_number";--> statement-breakpoint
ALTER TABLE "invoice" DROP COLUMN "invoice_prefix";--> statement-breakpoint
ALTER TABLE "invoice" DROP COLUMN "serial_number";
