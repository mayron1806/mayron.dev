'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const DeletePostButton = ({ postId }: { postId: number }) => {
  const router = useRouter();
  const deletePost = async (postId: number) => {
    const res = await fetch(`/api/post/${postId}`, {
      method: 'DELETE',
    });
    if(!res.ok) return;
    router.refresh();
  }
  return (
    <Button variant="ghost" className="w-full justify-start hover:bg-destructive" onClick={() => deletePost(postId)}>Deletar</Button>
  );
}
 
export default DeletePostButton;