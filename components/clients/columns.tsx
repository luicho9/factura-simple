"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { deleteClient } from "@/app/(dashboard)/clients/actions";
import { ClientFormDialog } from "@/components/clients/client-form-dialog";

export type ClientRow = {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  taxId: string;
  invoiceCount: number;
};

function RowActions({ row }: { row: ClientRow }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteClient(row.id);
        toast.success("Cliente eliminado");
        setConfirmOpen(false);
        router.refresh();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Error al eliminar");
      }
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditOpen(true)}>Editar</DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/create?clientId=${row.id}`}>Nueva factura para este cliente</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setConfirmOpen(true)}
          >
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ClientFormDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        client={{
          id: row.id,
          name: row.name,
          address: row.address,
          email: row.email,
          phone: row.phone,
          taxId: row.taxId,
        }}
      />
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar cliente {row.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              Las facturas existentes conservan los datos del cliente en su momento.
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={pending}>
              {pending ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export const columns: ColumnDef<ClientRow>[] = [
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "taxId", header: "ID fiscal" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Teléfono" },
  {
    accessorKey: "invoiceCount",
    header: () => <div className="text-right">Facturas</div>,
    cell: ({ row }) => (
      <div className="text-right">
        {row.original.invoiceCount > 0 ? (
          <Link
            href={`/invoices?clientId=${row.original.id}`}
            className="underline-offset-4 hover:underline"
          >
            {row.original.invoiceCount}
          </Link>
        ) : (
          <span className="text-muted-foreground">0</span>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions row={row.original} />,
  },
];
