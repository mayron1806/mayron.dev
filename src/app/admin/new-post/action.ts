'use server';
import { cuid } from "@/lib/cuid";
import { prisma } from "@/lib/prisma";
import { storage } from "@/lib/storage";
import { redirect } from "next/navigation";
import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
  thumbnail: z.any(),
});

export const createPost = async (prevState: any, formData: FormData) => {
  const validated = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    thumbnail: formData.get('thumbnail'),
  });
  if(!validated.success) return { 
    errors: validated.error.flatten().fieldErrors,
  };
  if(!validated.data.thumbnail.size) return { errors: { thumbnail: ['Thumbnail is required'] } };

  await prisma.$transaction(async (prisma) => {
    // criar o post
    const post = await prisma.post.create({
      data: {
        title: validated.data.title,
        slug: validated.data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      }
    });
    
    // criar o thumbnail
    const thumbId = cuid();
    const thumbExtension = validated.data.thumbnail.name.split('.').pop()!;
    await storage.putObject(validated.data.thumbnail, `posts/${post.slug}/thumbnail/${thumbId}.${thumbExtension}`);
    const thumbnail = await prisma.asset.create({
      data: {
        id: thumbId,
        ext: thumbExtension,
        type: "IMAGE",
        length: validated.data.thumbnail.size,
        path: `posts/${post.slug}/thumbnail/${thumbId}.${thumbExtension}`,
        postThumbnailId: post.id,
      }
    });

    // criar o conteudo
    const contentId = cuid();
    await storage.putContent(
      `${contentId}.md`,
      validated.data.content,
      'text/markdown',
      `posts/${post.slug}/content`,
    );
    const content = await prisma.content.create({
      data: {
        id: contentId,
        ext: 'md',
        length: validated.data.content.length,
        path: `posts/${post.slug}/content/${contentId}.md`,
        postId: post.id,
      }
    });

    // adicionar assets
    const urls = extractImageURLs(validated.data.content);
    console.log(urls);
    
    await Promise.all(urls.map(async (url) => {
      const id = cuid();
      const extension = url.split('.').pop()!;
      const path = new URL(url).pathname;
      const newPath = `posts/${post.slug}/assets/${id}.${extension}`;
      await storage.copyObject(path, newPath);
      await prisma.asset.create({
        data: {
          id,
          ext: extension,
          type: "IMAGE",
          length: 0,
          path: newPath,
          postAssetsId: post.id,
        }
      });
    }));
  }, { timeout: 60000 });
  redirect('/admin');
}
const extractImageURLs = (content: string) => {
  const imagePaths = [];
  const regex = /!\[.*?\]\((.*?)\)/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    imagePaths.push(match[1]);
  }
  return imagePaths;
}