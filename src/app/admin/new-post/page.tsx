'use client';
import MarkdownEditor from "@/components/markdown/mardown-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPost } from "./action";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

const NewPost = () => {
  const [data, formAction] = useFormState(createPost, { errors: {}});
  const { pending } = useFormStatus();
  const router = useRouter();
  return (
    <div className="mt-5">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Novo post</CardTitle>
          <CardDescription>Crie um novo post</CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="thumbnail">Capa</Label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                id="thumbnail"
                name="thumbnail"
                type="file"
              />
              {
                data.errors?.thumbnail && <p className="text-sm text-red-500">{data.errors.thumbnail}</p>
              }
            </div>
            <div>
              <Label htmlFor="title">Titulo</Label>
              <Input id="title" name="title" type="text" placeholder="Title" />
              {
                data.errors?.title && <p className="text-sm text-red-500">{data.errors.title}</p>
              }
            </div>
            <div>
              <Label htmlFor="title">Conteúdo</Label>
              <MarkdownEditor />
              {
                data.errors?.content && <p className="text-sm text-red-500">{data.errors.content}</p>
              }
            </div>
          </CardContent>
          <CardFooter className="space-x-4">
            <Button disabled={pending} type="submit">Criar</Button>
            <Button variant="secondary" disabled={pending} type="button" onClick={() => router.back()}>Voltar</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
 
export default NewPost;