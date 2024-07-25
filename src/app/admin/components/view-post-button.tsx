'use client';
import { forwardRef } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ViewPostButton = forwardRef<HTMLButtonElement, { postSlug: string }>(
  ({ postSlug }, ref) => {
    const router = useRouter();
    return (
      <Button
        ref={ref}
        variant="ghost"
        className="w-full justify-start"
        onClick={() => router.push(`/blog/${postSlug}`)}
      >
        Visualizar
      </Button>
    );
  }
);

ViewPostButton.displayName = 'ViewPostButton';

export default ViewPostButton;
