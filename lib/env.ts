import { z } from "zod";

if (process.env.VITEST) {
  const testDefaults = {
    DATABASE_URL:
      "postgres://postgres:postgres@localhost:5432/facturasimple_test",
    BETTER_AUTH_SECRET: "test_better_auth_secret_at_least_32_chars_long",
    BETTER_AUTH_URL: "http://localhost:3000",
    GOOGLE_CLIENT_ID: "test_google_client_id",
    GOOGLE_CLIENT_SECRET: "test_google_client_secret",
    BLOB_READ_WRITE_TOKEN: "vercel_blob_rw_test_token",
  } satisfies Record<string, string>;

  for (const [key, value] of Object.entries(testDefaults)) {
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

const envVariables = z.object({
  DATABASE_URL: z.string(),
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  BLOB_READ_WRITE_TOKEN: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
