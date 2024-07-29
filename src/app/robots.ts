import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default function robots(): MetadataRoute.Robots {
  const headersList = headers();
  let domain = headersList.get("host") as string;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/blog/",
        disallow: "/admin/",
      },
    ],
    sitemap: `https://${domain}/sitemap.xml`,
  };
}