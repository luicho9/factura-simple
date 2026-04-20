"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClientFormDialog } from "@/components/clients/client-form-dialog";
import { HeaderActions } from "@/components/sidebar/site-header";

export function NewClientButton() {
  const [open, setOpen] = useState(false);

  return (
    <HeaderActions>
      <Button onClick={() => setOpen(true)}>Nuevo cliente</Button>
      <ClientFormDialog open={open} onOpenChange={setOpen} />
    </HeaderActions>
  );
}
