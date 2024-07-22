import { z } from "zod";

export const env = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]),
    AWS_REGION: z.string(),
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    AWS_S3_ENDPOINT: z.string().url(),
    AWS_S3_BUCKET_NAME: z.string(),
    AWS_S3_BUCKET_BASE_URL: z.string().url(),
    ADMIN_NAME: z.string(),
    ADMIN_PASSWORD: z.string(),
    SECRET_TOKEN: z.string(),
  })
  .parse(process.env) 