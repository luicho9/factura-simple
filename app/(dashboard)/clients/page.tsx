import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { DataTable } from "@/components/data-table";
import { columns, type ClientRow } from "@/components/clients/columns";
import { NewClientButton } from "@/components/clients/new-client-button";
import { getClientsWithInvoiceCount } from "@/lib/db/queries/clients";

export default async function ClientsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return null;
  }

  const data: ClientRow[] = await getClientsWithInvoiceCount(session.user.id);

  return (
    <div className="flex flex-col gap-6">
      <NewClientButton />
      <DataTable
        columns={columns}
        data={data}
        emptyMessage="Aún no tienes clientes guardados."
      />
    </div>
  );
}
