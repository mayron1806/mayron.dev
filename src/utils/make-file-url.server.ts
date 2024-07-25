import { env } from "@/env";

export function makePath(path: string) {
  const formatedPath = path.startsWith('/') ? path : `/${path}`;
  return `${env.AWS_S3_BUCKET_BASE_URL}${formatedPath}`;
}