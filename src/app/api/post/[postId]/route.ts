import { storage } from "@/lib/storage";
import { prisma } from "@/lib/prisma";

export const DELETE = async (request: Request, { params }: { params: { postId: string }}) => {
  const id = Number(params.postId);
  try {
    const post = await prisma.post.delete({ where: { id } });
    await storage.deleteObjectByPrefix(`posts/${post.slug}`);
  } catch (error) {
    return new Response(null, { status: 500 });
  }

  return new Response(null, { status: 204 });
}