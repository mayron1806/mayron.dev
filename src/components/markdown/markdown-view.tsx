import styles from './markdown-styles.module.css';

import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { vsDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import SyntaxHighlighter from 'react-syntax-highlighter';

type Props = {
  content: string;
};

export function MarkdownView({ content }: Props) {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ children, className, ...props }) {
            return (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                // @ts-ignore
                style={vsDark}
                language='js'
                {...props}
              />
            )
          }
        }}
      >
        
        {content}
      </ReactMarkdown>
    </div>
  );
}