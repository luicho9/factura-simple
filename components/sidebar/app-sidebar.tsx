"use client";

import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavLogin } from "@/components/sidebar/nav-login";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  InvoiceIcon,
  SettingsIcon,
  UserGroupIcon,
  ReceiptTextIcon,
} from "@hugeicons/core-free-icons";

const data = {
  navMain: [
    {
      title: "Facturas",
      url: "#",
      icon: <HugeiconsIcon icon={InvoiceIcon} strokeWidth={2} />,
    },
    {
      title: "Clientes",
      url: "#",
      icon: <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />,
    },
    {
      title: "Configuración",
      url: "#",
      icon: <HugeiconsIcon icon={SettingsIcon} strokeWidth={2} />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[slot=sidebar-menu-button]:p-1.5!">
              <HugeiconsIcon
                icon={ReceiptTextIcon}
                strokeWidth={2}
                className="size-5!"
              />
              <span className="text-base font-semibold">Factura Simple</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavLogin />
      </SidebarFooter>
    </Sidebar>
  );
}
