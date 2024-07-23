import { env } from "@/env";
import { CopyObjectCommand, DeleteObjectsCommand, GetObjectCommand, ListObjectsCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: env.AWS_REGION,
  endpoint: env.AWS_S3_ENDPOINT,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

const putObject = async (file: File, path: string) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  
  const uploadFileCommand = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: path.startsWith('/') ? path.slice(1, path.length) : path,
    Body: buffer,
    ContentType: file.type,
  });

  await s3.send(uploadFileCommand);
}
const putContent = async (name: string, content: string, contentType: string, path: string) => {
  const uploadFileCommand = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: `${path.endsWith('/') ? path : `${path}/`}${name}`,
    Body: content,
    ContentType: contentType,
  });

  await s3.send(uploadFileCommand);
}
const copyObject = async (from: string, to: string) => {
  const copyFileCommand = new CopyObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: to,
    CopySource: `/${env.AWS_S3_BUCKET_NAME}${from.startsWith('/') ? from : `/${from}`}`,
  });

  await s3.send(copyFileCommand);
}
const deleteObjectByPrefix = async (prefix: string) => {
  const objectsToDelete = new ListObjectsCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Prefix: prefix
  });
  const objects = await s3.send(objectsToDelete);
  console.log(objects);
  if (!objects.Contents || objects.Contents?.length === 0) return;
  
  const deleteFileCommand = new DeleteObjectsCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Delete: {
      Objects: objects.Contents.map(object => ({ Key: object.Key! })),
    }
  });
  await s3.send(deleteFileCommand);
}
const getObject = async (key: string) => {
  console.log(key);
  
  const getObjectCommand = new GetObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: key
  });
  const object = await s3.send(getObjectCommand);
  return object.Body;
}
const makePath = (path: string) => {
  const formatedPath = path.startsWith('/') ? path : `/${path}`;
  return `${env.AWS_S3_BUCKET_BASE_URL}${formatedPath}`;
}
export const storage = {
  putObject,
  putContent,
  copyObject,
  deleteObjectByPrefix,
  getObject,
  makePath
}