"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { invoice } from "@/lib/db/schema";

async function requireUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("No autorizado");
  }
  return session.user.id;
}

export async function deleteInvoice(id: string) {
  const userId = await requireUserId();
  await db
    .delete(invoice)
    .where(and(eq(invoice.id, id), eq(invoice.userId, userId)));
  revalidatePath("/invoices");
}
