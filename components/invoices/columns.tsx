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
import { formatCurrency, formatDate } from "@/lib/format";
import { deleteInvoice } from "@/app/(dashboard)/invoices/actions";

export type InvoiceRow = {
  id: string;
  invoicePrefix: string;
  serialNumber: number;
  clientName: string;
  invoiceDate: Date;
  totalAmount: string;
  currency: string;
};

function formatSerial(prefix: string, serial: number) {
  return `${prefix}${String(serial).padStart(4, "0")}`;
}

function RowActions({ row }: { row: InvoiceRow }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteInvoice(row.id);
        toast.success("Factura eliminada");
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
          <DropdownMenuItem asChild>
            <Link href={`/invoices/${row.id}`}>Ver</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/create?duplicate=${row.id}`}>Duplicar</Link>
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
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Eliminar factura {formatSerial(row.invoicePrefix, row.serialNumber)}?
            </AlertDialogTitle>
            <AlertDialogDescription>
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

export const columns: ColumnDef<InvoiceRow>[] = [
  {
    accessorKey: "serialNumber",
    header: "Serie",
    cell: ({ row }) => (
      <span className="font-medium">
        {formatSerial(row.original.invoicePrefix, row.original.serialNumber)}
      </span>
    ),
  },
  {
    accessorKey: "clientName",
    header: "Cliente",
  },
  {
    accessorKey: "invoiceDate",
    header: "Fecha",
    cell: ({ row }) => formatDate(row.original.invoiceDate),
  },
  {
    accessorKey: "totalAmount",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {formatCurrency(Number(row.original.totalAmount), row.original.currency)}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions row={row.original} />,
  },
];
