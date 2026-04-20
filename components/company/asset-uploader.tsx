"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { removeAsset, uploadAsset } from "@/app/(dashboard)/company/actions";

interface AssetUploaderProps {
  kind: "logo" | "signature";
  label: string;
  url: string | null;
  onChange: (url: string | null) => void;
}

export function AssetUploader({
  kind,
  label,
  url,
  onChange,
}: AssetUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();
  const [removing, setRemoving] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const fd = new FormData();
    fd.append("file", file);
    startTransition(async () => {
      try {
        const newUrl = await uploadAsset(kind, fd);
        onChange(newUrl);
        toast.success(`${label} actualizado`);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Error al subir");
      }
    });
    e.target.value = "";
  }

  async function handleRemove() {
    setRemoving(true);
    try {
      await removeAsset(kind);
      onChange(null);
      toast.success(`${label} eliminado`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al eliminar");
    } finally {
      setRemoving(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-md border bg-muted">
        {url ? (
          <Image
            src={url}
            alt={label}
            width={80}
            height={80}
            className="h-full w-full object-contain"
            unoptimized
          />
        ) : (
          <span className="text-xs text-muted-foreground">
            Sin {label.toLowerCase()}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => inputRef.current?.click()}
            disabled={pending}
          >
            {pending
              ? "Subiendo..."
              : url
                ? `Cambiar ${label.toLowerCase()}`
                : `Subir ${label.toLowerCase()}`}
          </Button>
          {url && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={handleRemove}
              disabled={removing}
            >
              {removing ? "Eliminando..." : "Eliminar"}
            </Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          PNG, JPEG o WEBP. Máx 2 MB.
        </p>
      </div>
    </div>
  );
}
