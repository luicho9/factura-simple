"use client";

import { Button } from "@/components/ui/button";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export function NavLogin() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="rounded-2xl bg-sidebar-accent p-4">
          <p className="text-lg font-semibold">Inicia Sesión</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Inicia sesión para guardar tus datos y acceder a ellos en cualquier
            momento
          </p>
          <Button size="sm" className="mt-4">
            Iniciar Sesión
          </Button>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
