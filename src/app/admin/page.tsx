import Image from "next/image";
import moment from "moment";
import {
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { env } from "@/env";
import DeletePostButton from "./components/delete-post-button";
import AddPostButton from "./components/add-post-button";
import ViewPostButton from "./components/view-post-button";

const getPosts = async (page: number = 0, limit: number = 10) => {
  const posts = await prisma.post.findMany({
    skip: page * limit,
    take: limit,
    include: {
      thumbnail: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  return posts;
}
type Props = {
  searchParams: { [key: string]: string | number | undefined }
}
export default async function Dashboard({ searchParams }: Props) {
  const page = Number(searchParams.page) || 0;
  const limit = Number(searchParams.limit) || 10;
  const posts = await getPosts(page, limit);
  console.log(posts);
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Posts</CardTitle>
                <CardDescription>
                  Gerencie seus posts.
                </CardDescription>
              </div>
              <AddPostButton />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Titulo</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Data de criação</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Likes
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Dislikes
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            alt={post.title}
                            className="aspect-square truncate rounded-md object-cover"
                            height="64"
                            src={`${env.AWS_S3_BUCKET_BASE_URL}/${post.thumbnail?.path}`}
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {post.title}
                        </TableCell>
                        <TableCell>
                          {post.slug}
                        </TableCell>
                        <TableCell>{moment(post.createdAt).format("DD/MM/YYYY [às] HH:mm")}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {post.likesCount}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {post.dislikesCount}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem asChild>
                                <DeletePostButton postId={post.id} />
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <ViewPostButton postSlug={post.slug} />
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>{page * limit} - {page * limit + posts.length}</strong> posts
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}
