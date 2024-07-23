'use client';
import { Post } from "@prisma/client";
import { Button } from "./ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import useSWRMutation from 'swr/mutation';
type Props = {
  post: Post;
}
const Reaction = ({ post }: Props) => {
  const { data: optimisticPost, isMutating, trigger } = useSWRMutation<Post>(
    `/api/post/${post.id}/reaction`, 
    async (url: string, { arg }: { arg: { reaction: 'LIKE' | 'DISLIKE' } }) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(arg)
      });
      if (!res.ok) {
        throw new Error('Failed to add reaction');
      }
      return await res.json();
    }
  );
  const handleReaction = async (reaction: 'LIKE' | 'DISLIKE') => {
    if (isMutating) return;
    const currentLikes = optimisticPost?.likesCount ?? post.likesCount;
    const currentDislikes = optimisticPost?.dislikesCount ?? post.dislikesCount;
    const optisticData: Post = { 
      ...post,
      likesCount: reaction === 'LIKE' ? currentLikes + 1 : currentLikes,
      dislikesCount: reaction === 'DISLIKE' ? currentDislikes + 1 : currentDislikes
    };
    trigger(
      { reaction } as any,
      { optimisticData: optisticData }
    );
  }
  return ( 
    <div>
      <Button variant="ghost" size="sm" onClick={() => handleReaction('LIKE')}>
        {optimisticPost?.likesCount ?? post.likesCount}
        <ThumbsUp className="h-4 w-4 ml-2" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => handleReaction('DISLIKE')}>
        {optimisticPost?.dislikesCount ?? post.dislikesCount}
        <ThumbsDown className="h-4 w-4  ml-2" />
      </Button>
    </div>
  );
}
 
export default Reaction;