"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

interface LoginButtonProps {
  callbackURL: string;
}

export function LoginButton({ callbackURL }: LoginButtonProps) {
  const [pending, setPending] = useState(false);

  async function handleClick() {
    setPending(true);
    try {
      await authClient.signIn.social({ provider: "google", callbackURL });
    } catch (err) {
      setPending(false);
      toast.error(
        err instanceof Error ? err.message : "No se pudo iniciar sesión",
      );
    }
  }

  return (
    <Button className="mt-6 w-full" onClick={handleClick} disabled={pending}>
      {pending ? "Redirigiendo..." : "Continuar con Google"}
    </Button>
  );
}
