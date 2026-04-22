# facturasimple

Una app de facturación pequeña y autoalojable. Crea clientes, arma facturas y
expórtalas en PDF.

## Stack

- Next.js 16 (App Router) + React 19
- PostgreSQL + Drizzle ORM
- better-auth (Google OAuth)
- Vercel Blob (almacenamiento de logo / firma)
- @react-pdf/renderer para exportar PDF
- Tailwind CSS 4 + Radix UI

## Requisitos

- Node.js 20+
- pnpm
- Una base de datos PostgreSQL (Supabase, Neon o local)
- Un cliente OAuth 2.0 de Google
- Un store de Vercel Blob (token de lectura/escritura)

## Instalación

```bash
pnpm install
cp .env.example .env
# completa los valores (ver "Variables de entorno" abajo)
pnpm drizzle-kit migrate
pnpm dev
```

La app corre en http://localhost:3000.

## Variables de entorno

Todas son requeridas y se validan al arranque en `lib/env.ts`. Si falta alguna
o tiene un valor inválido, el proceso falla con un error de Zod.

| Variable                | Notas                                                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`          | Cadena de conexión de PostgreSQL. Si usas pgbouncer en modo transaction, deja `?pgbouncer=true`. El cliente deshabilita los prepared statements. |
| `BETTER_AUTH_SECRET`    | Al menos 32 caracteres. Genéralo con `openssl rand -base64 32`.                                                                                   |
| `BETTER_AUTH_URL`       | Origen completo (ej. `http://localhost:3000` o `https://tu.dominio`).                                                                             |
| `GOOGLE_CLIENT_ID`      | Desde Google Cloud Console → Credentials.                                                                                                         |
| `GOOGLE_CLIENT_SECRET`  | En el mismo lugar. El redirect URI autorizado debe ser `${BETTER_AUTH_URL}/api/auth/callback/google`.                                             |
| `BLOB_READ_WRITE_TOKEN` | Dashboard de Vercel → Storage → Blob → Connect.                                                                                                   |

## Scripts

- `pnpm dev`: servidor de desarrollo
- `pnpm build` / `pnpm start`: build de producción y servir
- `pnpm lint`: ESLint
- `pnpm test`: Vitest
- `pnpm knip`: detección de código muerto
- `pnpm drizzle-kit generate` / `migrate`: migraciones de la base de datos

## Estructura del proyecto

```
app/                    rutas (App Router)
  (dashboard)/          área autenticada (invoices, clients, company, create)
  api/auth/[...all]/    handler de better-auth
components/             UI (sidebar, constructor de factura, plantilla PDF, etc.)
lib/
  auth.ts               config de better-auth (servidor)
  auth-client.ts        cliente de better-auth
  db/                   schema y migraciones de Drizzle
  env.ts                validación de env (importado por db y auth)
  schemas/              schemas de Zod compartidos
  billing.ts            totales de factura
  pdf/                  helpers de renderizado de PDF
proxy.ts                protección de rutas (reemplazo de middleware.ts en Next.js 16)
```

## Despliegue

Pensado para Vercel: conecta el repo y agrega las variables de entorno.
También funciona en cualquier host que corra un servidor Next.js standalone.

## Licencia

MIT. Ver [LICENSE](./LICENSE).
