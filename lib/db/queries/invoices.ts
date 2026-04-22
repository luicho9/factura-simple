import { and, desc, eq } from "drizzle-orm";
import db from "@/lib/db";
import { invoice } from "@/lib/db/schema";

export function getInvoices(userId: string, clientId?: string) {
  const where = clientId
    ? and(eq(invoice.userId, userId), eq(invoice.clientId, clientId))
    : eq(invoice.userId, userId);

  return db
    .select({
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      invoiceDate: invoice.invoiceDate,
      totalAmount: invoice.totalAmount,
      currency: invoice.currency,
      payload: invoice.payload,
    })
    .from(invoice)
    .where(where)
    .orderBy(desc(invoice.createdAt))
    .limit(50);
}
