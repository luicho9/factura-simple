import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { columns, type InvoiceRow } from "@/components/invoices/columns";
import { getInvoices } from "@/lib/db/queries/invoices";

interface SearchParams {
  clientId?: string;
}

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return null;
  }
  const { clientId } = await searchParams;

  const rows = await getInvoices(session.user.id, clientId);

  const data: InvoiceRow[] = rows.map((r) => ({
    id: r.id,
    invoiceNumber: r.invoiceNumber,
    clientName:
      (r.payload as { client?: { name?: string } } | null)?.client?.name ?? "—",
    invoiceDate: r.invoiceDate,
    totalAmount: r.totalAmount,
    currency: r.currency,
  }));

  return (
    <div className="flex flex-col gap-6">
      <DataTable
        columns={columns}
        data={data}
        emptyMessage={
          <div className="flex flex-col items-center gap-3 py-6">
            <p>Aún no tienes facturas.</p>
            <Button asChild variant="outline">
              <Link href="/create">Crear tu primera factura</Link>
            </Button>
          </div>
        }
      />
    </div>
  );
}
