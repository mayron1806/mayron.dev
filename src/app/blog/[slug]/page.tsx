import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { storage } from "@/lib/storage";
import Image from "next/image";
import moment from "moment";
import 'moment/locale/pt-br'
import { calculateReadingTime } from "@/lib/read-time";
import { Separator } from "@/components/ui/separator";
import Share from "@/components/share";
import Reaction from "@/components/reaction";
import PostList from "@/components/post-list";
import { MarkdownView } from "@/components/markdown/markdown-view";
import { makePath } from "@/utils/make-file-url.server";
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

  return (
    <main className="container max-w-3xl m-4 mx-auto">
      <section>
        <div className="w-full mb-6 relative">
          <Image
            src={makePath(post.thumbnail?.path ?? '')}
            alt="Thumbnail"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            className="object-cover"
          />
        </div>
        <h1 className="text-5xl font-bold">{post.title}</h1>
        <Separator className="mt-6"/>
        <div className="flex gap-4 justify-between my-2 text-sm opacity-70">
          <p>Escrito por: <strong>Mayron</strong></p>
          <p>Publicado em: {moment(post.createdAt).locale('pt-br').format("MMMM DD, YYYY").toUpperCase()} - {calculateReadingTime(contentString!)} minutos de leitura</p>
        </div>
        <Separator className="mb-6"/>
      </section>
      <MarkdownView content={contentString!} />
      <Separator className="my-4"/>
      <div className="flex gap-4 justify-between">
        <Reaction post={post} />
        <Share shareUrl={"https://ui.shadcn.com/docs/components/popover"} title={post.title}/>
      </div>
      <Separator className="my-4"/>
      <section className="space-y-4">
        <h2 className="text-3xl font-medium">Leia também</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PostList cursor={0} ignoreIds={[post.id]} />
        </div>
      </section>
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};