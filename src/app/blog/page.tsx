import PostList from "@/components/post-list";
import PostItem from "@/components/post-list/post-item";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/time-format";
import { cn } from "@/lib/utils";
import { makePath } from "@/utils/make-file-url.server";
import { Asset, Post } from "@prisma/client";
import "moment/locale/pt-br";
import Image from "next/image";
import Link from "next/link";

const DEFAULT_LIMIT = 10;
const getPosts = async (search?: string) => {
  const posts = await prisma.post.findMany({
    take: DEFAULT_LIMIT,
    where: search ? {
      OR: [
        { title: { search: search } },
        { description: { search: search } },
      ],
    }: undefined,
    orderBy: { createdAt: 'desc' },
    include: {
      thumbnail: true,
    },
  });
  return posts;
}
type Props = {
  searchParams: { search: string }
}
export default async function Index({ searchParams }: Props) {
  const recentPosts = await getPosts(searchParams.search);
  return (
    <main>
      <Hero />
      {
        recentPosts.length > 0 && (
          <div className={cn("container space-y-10", !searchParams.search && "-translate-y-16")}>
            {
              !searchParams.search && recentPosts[0] && ( <MainPost post={recentPosts[0]!} /> )
            }
            {
              searchParams.search?.length > 0 && (
                <div className="flex justify-between mt-10 items-center">
                  <h2 className="font-medium text-xl">Pesquisando por: <strong>"{searchParams.search}"</strong></h2>
                  <Link href="/" className="text-sm p-2 border border-primary rounded-md text-primary font-medium flex gap-2 items-center">
                    Ver todos
                  </Link>
                </div>
              )
            }
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
              {
                recentPosts.map((post) => {
                  if (post.id === recentPosts[0]?.id) return null;
                  return <PostItem post={post} key={post.id} />
                }
                )
              }
              {
                recentPosts.length > 0 && (
                  <PostList cursor={recentPosts.at(-1)?.id!} />
                )
              }
            </section>
          </div>
        )
      }
      {
        recentPosts.length === 0 && (
          <div className="container flex mb-10 items-center flex-col text-muted-foreground">
            <Image 
              src={"/not-found.svg"}
              alt="Not found"
              width={0}
              height={0}
              className="max-w-xl w-full"
            />
            <h2 className="font-medium text-3xl">Nenhum post encontrado</h2>
          </div>
        )
      }
    </main>
  );
}
const Hero = () => {
  return (
    <section className="w-full h-[calc(70vh)] relative">
      <Image 
        src="/cover.jpg"
        alt="Cover"
        fill
        objectFit="cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30" />
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-primary-foreground">Mayron.Dev</h1>
        <p className="text-lg text-primary-foreground">Blog de desenvolvimento</p>
      </div>
    </section>
  );
}
const MainPost = ({ post }: { post: Post & { thumbnail: Asset | null }}) => {
  return (
    <Link className="block w-full" href={`/blog/${post.slug}`}>
      <Card className="flex flex-col md:flex-row items-center border rounded-lg shadow w-full">
        <div className="h-[400px] relative w-full md:rounded-none md:rounded-s-lg">
          <Image
            src={makePath(post.thumbnail?.path ?? '')}
            alt="Cover"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
          />
        </div>
        <div className="flex flex-col justify-between p-4 leading-normal">
          <div>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription className="text-base">{post.description}</CardDescription>
            </CardHeader>
          </div>
          <CardFooter className="self-end">
            <p className="text-sm opacity-50">
              {formatDate(post.createdAt)}
            </p>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}