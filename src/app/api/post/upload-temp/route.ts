import { env } from "@/env";
import { storage } from "@/lib/storage";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();

  // Get the file from the form data
  const fileForm = formData.get("file") as File;
  if(!fileForm) {
    return new Response("No file found", { status: 400 });
  }
  try {
    await storage.putObject(fileForm, `temp/${fileForm.name}`);
    return new Response(JSON.stringify({ 
      success: true,
      url: `${env.AWS_S3_BUCKET_BASE_URL}/temp/${fileForm.name}`
    }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: "Ocorreu um erro ao enviar o arquivo" }), { status: 500 });
  }
}