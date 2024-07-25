import { env } from "@/env.public";

export function makePath(path: string) {
  const formatedPath = path.startsWith('/') ? path : `/${path}`;
  return `${env.NEXT_PUBLIC_AWS_S3_BUCKET_BASE_URL}${formatedPath}`;
}