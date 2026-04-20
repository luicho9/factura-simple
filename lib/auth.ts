import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import db from "@/lib/db";
import { account, company, session, user, verification } from "@/lib/db/schema";
import { del } from "@vercel/blob";
import { eq } from "drizzle-orm";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, session, account, verification },
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  user: {
    deleteUser: {
      enabled: true,
      beforeDelete: async (user) => {
        const [row] = await db
          .select({
            logoUrl: company.logoUrl,
            signatureUrl: company.signatureUrl,
          })
          .from(company)
          .where(eq(company.userId, user.id));

        const urls = [row?.logoUrl, row?.signatureUrl].filter(
          (u): u is string => !!u,
        );

        if (urls.length > 0) {
          await del(urls);
        }
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await db
            .insert(company)
            .values({
              userId: user.id,
              name: user.name ?? "",
              email: user.email ?? "",
            })
            .onConflictDoNothing();
        },
      },
    },
  },
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
