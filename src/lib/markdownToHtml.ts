import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";
export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(markdown);
  return result.toString();
}
