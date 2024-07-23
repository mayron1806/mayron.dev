import { prisma } from "@/lib/prisma";
import { Asset, Post } from "@prisma/client";
import { NextRequest } from "next/server";

export type GetPostListResponse = {
  data: Array<Post & { thumbnail: Asset }>,
  nextOffset?: number;
  lastPage?: boolean;
}
export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const cursorString = searchParams.get("cursor");
  const limitString = searchParams.get("limit");
  const cursor = cursorString ? Number(cursorString) : undefined;
  const limit = limitString ? Number(limitString) : 10;
  
  const posts = await prisma.post.findMany({
    skip: cursor ? 1 : 0, 
    cursor: cursor ? { id: cursor } : undefined,
    take: limit,
    include: { thumbnail: true },
    orderBy: { createdAt: 'desc' },
  });
  const responseBody: GetPostListResponse = {
    data: posts as Array<Post & { thumbnail: Asset }>,
    nextOffset: posts.at(-1)?.id,
    lastPage: posts.length < limit,
  };
  return new Response(JSON.stringify(responseBody), { status: 200, headers: { 'Content-Type': 'application/json' } });
}