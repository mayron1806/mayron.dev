import PostList from "@/components/post-list";
import PostItem from "@/components/post-list/post-item";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { storage } from "@/lib/storage";
import { formatDate } from "@/lib/time-format";
import "moment/locale/pt-br";
import Image from "next/image";
import Link from "next/link";

const DEFAULT_LIMIT = 10;
const getRecentPosts = async () => {
  const posts = await prisma.post.findMany({
    take: DEFAULT_LIMIT,
    orderBy: { createdAt: 'desc' },
    include: {
      thumbnail: true,
    },
  });
  return posts;
}

export default async function Index() {
  const recentPosts = await getRecentPosts();
  return (
    <main>
      <section className="w-full h-[calc(70vh)] relative">
        <Image 
          src="/cover.jpg"
          alt="Cover"
          fill
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-400/30 to-purple-300/30" />
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-primary-foreground">Mayron.Dev</h1>
          <p className="text-lg text-primary-foreground">Blog de desenvolvimento</p>
        </div>
      </section>
      <div className="container -translate-y-16 space-y-10">
        {
          recentPosts[0] && (
            <Link className="block w-full" href={`/${recentPosts[0].slug}`}>
              <Card className="flex flex-col md:flex-row items-center border rounded-lg shadow w-full">
                <div className="w-full md:h-auto md:rounded-none md:rounded-s-lg">
                  <Image
                    src={storage.makePath(recentPosts[0].thumbnail?.path ?? '')}
                    alt="Cover"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <div>
                    <CardHeader>
                      <CardTitle>{recentPosts[0].title}</CardTitle>
                      <CardDescription className="text-base">{recentPosts[0].description}</CardDescription>
                    </CardHeader>
                  </div>
                  <CardFooter className="self-end">
                    <p className="text-sm opacity-50">
                      {formatDate(recentPosts[0].createdAt)}
                    </p>
                  </CardFooter>
                </div>
              </Card>
            </Link>
          )
        }
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
          {
            recentPosts.map((post) => (
              <PostItem post={post} key={post.id} />
            ))
          }
          {
            recentPosts.length > 0 && (
              <PostList cursor={recentPosts.at(-1)?.id!} />
            )
          }
        </section>
      </div>
    </main>
  );
}
