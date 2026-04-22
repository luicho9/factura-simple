"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

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
  UserGroupIcon,
  BuildingIcon,
} from "@hugeicons/core-free-icons";

const data = {
  navMain: [
    {
      title: "Facturas",
      url: "/invoices",
      icon: <HugeiconsIcon icon={InvoiceIcon} strokeWidth={2} />,
    },
    {
      title: "Clientes",
      url: "/clients",
      icon: <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />,
    },
    {
      title: "Empresa",
      url: "/company",
      icon: <HugeiconsIcon icon={BuildingIcon} strokeWidth={2} />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Factura Simple"
                  width={600}
                  height={600}
                  className="size-5!"
                />
                <span className="text-base font-semibold">Factura Simple</span>
              </Link>
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
