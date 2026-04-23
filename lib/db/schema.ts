import {
  boolean,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const company = pgTable("company", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull().default(""),
  address: text("address").notNull().default(""),
  email: text("email").notNull().default(""),
  phone: text("phone").notNull().default(""),
  metadata: jsonb("metadata").notNull().default([]),
  logoUrl: text("logo_url"),
  signatureUrl: text("signature_url"),
  defaultCurrency: text("default_currency").notNull().default("HNL"),
  defaultThemeColor: text("default_theme_color").notNull().default("#00786f"),
  defaultPreset: text("default_preset").notNull().default("default"),
  defaultPresetFields: jsonb("default_preset_fields").notNull().default({}),
  invoicePrefix: text("invoice_prefix").notNull().default(""),
  defaultPaymentTerms: text("default_payment_terms").notNull().default(""),
  defaultNotes: text("default_notes").notNull().default(""),
  defaultTerms: text("default_terms").notNull().default(""),
  defaultPaymentInformation: jsonb("default_payment_information")
    .notNull()
    .default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const client = pgTable("client", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  address: text("address").notNull().default(""),
  email: text("email").notNull().default(""),
  phone: text("phone").notNull().default(""),
  taxId: text("tax_id").notNull().default(""),
  metadata: jsonb("metadata").notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const invoice = pgTable(
  "invoice",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    clientId: uuid("client_id").references(() => client.id, {
      onDelete: "set null",
    }),
    invoiceNumber: text("invoice_number").notNull(),
    invoiceDate: timestamp("invoice_date").notNull(),
    dueDate: timestamp("due_date"),
    totalAmount: numeric("total_amount", { precision: 14, scale: 2 })
      .notNull()
      .default("0"),
    currency: text("currency").notNull(),
    payload: jsonb("payload").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("invoice_user_id_invoice_number_unique").on(
      table.userId,
      table.invoiceNumber,
    ),
  ],
);

export type User = typeof user.$inferSelect;
export type Company = typeof company.$inferSelect;
export type Client = typeof client.$inferSelect;
export type Invoice = typeof invoice.$inferSelect;
