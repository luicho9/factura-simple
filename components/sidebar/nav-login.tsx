"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

export function NavLogin() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (isPending) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="h-16 rounded-2xl bg-sidebar-accent/40" />
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (!session) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="rounded-2xl bg-sidebar-accent p-4">
            <p className="text-lg font-semibold">Inicia Sesión</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Inicia sesión para guardar tus datos y acceder a ellos en
              cualquier momento
            </p>
            <Button
              size="sm"
              className="mt-4"
              onClick={() => router.push("/login")}
            >
              Iniciar Sesión
            </Button>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  const user = session.user;
  const initials = user.name
    ? user.name
        .split(" ")
        .map((s) => s[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/"),
      },
    });
  }

  async function handleDelete() {
    try {
      await authClient.deleteUser();
      toast.success("Cuenta eliminada");
      router.push("/");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Error al eliminar cuenta",
      );
    }
  }

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex w-full cursor-pointer items-center gap-2.5 rounded-2xl hover:bg-sidebar-accent p-2.5 text-left outline-none transition-colors hover:bg-sidebar-accent/80 focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Avatar className="size-8 shrink-0">
                  {user.image && (
                    <AvatarImage src={user.image} alt={user.name ?? ""} />
                  )}
                  <AvatarFallback className="text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="truncate text-xs font-medium">{user.name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="top"
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
            >
              <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                Cerrar sesión
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setConfirmDelete(true)}
              >
                Eliminar cuenta
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar cuenta?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminarán tu empresa, todas tus facturas y clientes, y tus
              imágenes. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Eliminar cuenta
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
