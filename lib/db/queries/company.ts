import { eq } from "drizzle-orm";
import db from "@/lib/db";
import { company } from "@/lib/db/schema";

export async function getCompanyByUserId(userId: string) {
  const [row] = await db
    .select()
    .from(company)
    .where(eq(company.userId, userId));
  return row ?? null;
}
