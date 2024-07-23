import markdownToHtml from "@/lib/markdownToHtml";
import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
};

export async function MarkdownView({ content }: Props) {
  const html = await markdownToHtml(content);
  return (
    <div className="max-w-2xl mx-auto overflow-hidden">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}