"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { del, put } from "@vercel/blob";
import { eq } from "drizzle-orm";
import sharp from "sharp";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { company } from "@/lib/db/schema";
import { companySchema, type CompanySchema } from "@/lib/schemas/company";
import { getHnCompanyPresetFields } from "@/lib/schemas/presets/hn/fields";

const MAX_BYTES = 2 * 1024 * 1024; // 2 MB
const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);

async function requireUserId() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("No autorizado");
  }
  return session.user.id;
}

export async function updateCompany(data: CompanySchema) {
  const userId = await requireUserId();
  const parsed = companySchema.parse(data);
  const defaultPresetFields =
    parsed.defaultPreset === "HN"
      ? getHnCompanyPresetFields(parsed.defaultPresetFields)
      : parsed.defaultPresetFields;

  await db
    .update(company)
    .set({ ...parsed, defaultPresetFields, updatedAt: new Date() })
    .where(eq(company.userId, userId));
  revalidatePath("/company");
}

export async function uploadAsset(
  kind: "logo" | "signature",
  formData: FormData,
): Promise<string> {
  const userId = await requireUserId();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    throw new Error("Archivo inválido");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("El archivo excede 2 MB");
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Formato no soportado (PNG, JPEG o WEBP)");
  }

  const resized = await sharp(Buffer.from(await file.arrayBuffer()))
    .resize({
      width: 800,
      height: 800,
      fit: "inside",
      withoutEnlargement: true,
    })
    .toBuffer();

  const extMap: Record<string, string> = {
    "image/png": "png",
    "image/webp": "webp",
  };
  const ext = extMap[file.type] ?? "jpg";
  const path = `company/${userId}/${kind}.${ext}`;

  const blob = await put(path, resized, {
    access: "public",
    allowOverwrite: true,
    contentType: file.type,
    addRandomSuffix: false,
  });

  const column = kind === "logo" ? company.logoUrl : company.signatureUrl;
  const existing = await db
    .select({ url: column })
    .from(company)
    .where(eq(company.userId, userId));
  const previous = existing[0]?.url;
  if (previous && previous !== blob.url) {
    await del(previous).catch(() => undefined);
  }

  await db
    .update(company)
    .set(
      kind === "logo"
        ? { logoUrl: blob.url, updatedAt: new Date() }
        : { signatureUrl: blob.url, updatedAt: new Date() },
    )
    .where(eq(company.userId, userId));

  revalidatePath("/company");
  return blob.url;
}

export async function removeAsset(kind: "logo" | "signature") {
  const userId = await requireUserId();
  const column = kind === "logo" ? company.logoUrl : company.signatureUrl;
  const [row] = await db
    .select({ url: column })
    .from(company)
    .where(eq(company.userId, userId));

  if (row?.url) {
    await del(row.url).catch(() => undefined);
  }

  await db
    .update(company)
    .set(
      kind === "logo"
        ? { logoUrl: null, updatedAt: new Date() }
        : { signatureUrl: null, updatedAt: new Date() },
    )
    .where(eq(company.userId, userId));
  revalidatePath("/company");
}
