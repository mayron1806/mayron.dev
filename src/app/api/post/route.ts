import { storage } from "@/lib/storage";
import { prisma } from "@/lib/prisma";

export const DELETE = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get('id'));

  const post = await prisma.post.delete({ where: { id } });
  await storage.deleteObjectByPrefix(`posts/${post.slug}`);

  return new Response(null, { status: 204 });
}