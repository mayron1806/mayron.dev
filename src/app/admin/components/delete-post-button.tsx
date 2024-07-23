'use client';
import { forwardRef } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DeletePostButton = forwardRef<HTMLButtonElement, { postId: number }>(
  ({ postId }, ref) => {
    const router = useRouter();

    const deletePost = async (postId: number) => {
      const res = await fetch(`/api/post/${postId}`, {
        method: 'DELETE',
      });
      if (!res.ok) return;
      router.refresh();
    }

    return (
      <Button
        ref={ref}
        variant="ghost"
        className="w-full justify-start hover:bg-destructive"
        onClick={() => deletePost(postId)}
      >
        Deletar
      </Button>
    );
  }
);

DeletePostButton.displayName = 'DeletePostButton';

export default DeletePostButton;
