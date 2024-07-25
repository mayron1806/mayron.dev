import { Asset, Post } from "@prisma/client";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { formatDate } from "@/lib/time-format";
import Link from "next/link";
import { makePath } from "@/utils/make-file-url.client";

type Props = {
  post: Post & { thumbnail: Asset | null }
}
const PostItem = ({ post }: Props) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card key={post.id} className="w-full p-2 cursor-pointer overflow-hidden flex flex-col justify-between">
        <div className="relative min-h-52 h-full w-full flex-1">
          <Image 
            src={makePath(post.thumbnail?.path ?? '')}
            alt="Thumbnail"
            fill
            className="object-cover"
            quality={10}
          />
        </div>
        <CardHeader className="h-52">
          <CardTitle>{post.title}</CardTitle>
          <CardDescription className="line-clamp-3">{post.description}</CardDescription>
        </CardHeader>
        <CardFooter className="self-end">
          <p className="text-sm opacity-50">
            {formatDate(post.createdAt)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
 
export default PostItem;