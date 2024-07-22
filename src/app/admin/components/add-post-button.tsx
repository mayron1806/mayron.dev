'use client';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const AddPostButton = () => {
  const router = useRouter();
  return ( 
    <Button onClick={() => router.push('/admin/new-post')}>
      <PlusCircle className="h-3.5 w-3.5 mr-2" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        Criar post
      </span>
    </Button>
  );
}
 
export default AddPostButton;