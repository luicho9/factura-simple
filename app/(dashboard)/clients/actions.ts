"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { client } from "@/lib/db/schema";
import { clientSchema, type ClientSchema } from "@/lib/schemas/client";

async function requireUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("No autorizado");
  }
  return session.user.id;
}

export async function createClient(data: ClientSchema) {
  const userId = await requireUserId();
  const parsed = clientSchema.parse(data);
  const [row] = await db
    .insert(client)
    .values({ ...parsed, userId })
    .returning({ id: client.id });
  revalidatePath("/clients");
  return row.id;
}

export async function updateClient(id: string, data: ClientSchema) {
  const userId = await requireUserId();
  const parsed = clientSchema.parse(data);
  await db
    .update(client)
    .set({ ...parsed, updatedAt: new Date() })
    .where(and(eq(client.id, id), eq(client.userId, userId)));
  revalidatePath("/clients");
}

export async function deleteClient(id: string) {
  const userId = await requireUserId();
  await db
    .delete(client)
    .where(and(eq(client.id, id), eq(client.userId, userId)));
  revalidatePath("/clients");
}
