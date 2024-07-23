import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { ReactionType } from "@prisma/client";
const schema = z.object({
  reaction: z.enum(['LIKE', 'DISLIKE']),
})
export const POST = async (request: NextRequest, { params }: { params: { postId: string }}) => {
  const ip = request.headers.get("x-forwarded-for");
  if (!ip) return new Response(JSON.stringify({ error: "IP não encontrado" }), { status: 400 });

  const postId = Number(params.postId);
  const body = await request.json();
  const result = schema.safeParse(body);

  if (!result.success) {
    return new Response(JSON.stringify({ error: "Reação inválida" }), { status: 400 });
  }

  const reactionsByIp = await prisma.reaction.findFirst({ where: { ip, postId } });
  // verificar se tem reações com o mesmo ip
    // se tiver, deve verificar se estão com o mesmo tipo de reação
      // se tiver, deve retornar ok
      // se não tiver, deve atualizar e retornar ok
    // se não tiver, deve criar e retornar ok
  if (reactionsByIp) {
    if(reactionsByIp.type === result.data.reaction) {
      const post = await prisma.post.findUnique({ where: { id: postId }});
      return new Response(JSON.stringify(post), { status: 200 });
    }
    await prisma.reaction.update({
      where: { id: reactionsByIp.id },
      data: { type: result.data.reaction }
    });
    const updatedPost = await prisma.post.update({
      where: {
        id: postId
      },
      data: {
        likesCount: {
          increment: result.data.reaction === 'LIKE' ? 1 : -1
        },
        dislikesCount: {
          increment: result.data.reaction === 'DISLIKE' ? 1 : -1
        }
      }
    });
    return new Response(JSON.stringify(updatedPost), { status: 200 });
  }
  await prisma.reaction.create({
    data: {
      type: result.data.reaction,
      ip,
      postId
    }
  });
  const updatedPost = await prisma.post.update({
    where: {
      id: postId
    },
    data: {
      likesCount: {
        increment: result.data.reaction === 'LIKE' ? 1 : 0
      },
      dislikesCount: {
        increment: result.data.reaction === 'DISLIKE' ? 1 : 0
      }
    }
  });
  return new Response(JSON.stringify(updatedPost), { status: 200 });
}