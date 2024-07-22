import { notFound } from "next/navigation";
import markdownToHtml from "@/lib/markdownToHtml";
import { prisma } from "@/lib/prisma";
import { storage } from "@/lib/storage";

const getPostBySlug = async (slug: string) => {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      assets: true,
      content: true,
      thumbnail: true,
      reactions: true,
    },
  });
  return post;
}
export default async function Post({ params }: Params) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return notFound();
  }
  const contentBlob = await storage.getObject(post.content?.path ?? '');
  const contentString = await contentBlob?.transformToString();
  const content = await markdownToHtml(contentString || '');

  return (
    <main>
      
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};