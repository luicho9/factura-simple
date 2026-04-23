import { asc, count, eq } from "drizzle-orm";
import db from "@/lib/db";
import { client, invoice } from "@/lib/db/schema";

export function getClientsWithInvoiceCount(userId: string) {
  return db
    .select({
      id: client.id,
      name: client.name,
      address: client.address,
      email: client.email,
      phone: client.phone,
      taxId: client.taxId,
      invoiceCount: count(invoice.id),
    })
    .from(client)
    .leftJoin(invoice, eq(invoice.clientId, client.id))
    .where(eq(client.userId, userId))
    .groupBy(client.id)
    .orderBy(asc(client.name));
}
