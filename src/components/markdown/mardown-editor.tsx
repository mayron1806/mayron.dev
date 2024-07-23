'use client';
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { useState } from 'react';
import { defaultCommands } from "@uiw/react-markdown-editor";
import { Image } from 'lucide-react';
import { Commands } from '@uiw/react-markdown-editor/cjs/components/ToolBar';
import { useTheme } from 'next-themes';
const Editor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);
const { image, preview, fullscreen, ...toolbar } = defaultCommands;
const importImage: Commands = {
  name: 'image',
  keyCommand: 'image',
  button: { 'aria-label': 'Add image' },
  icon: ( <Image /> ),
  execute: async ({ state, view }) => {
    if(!state || !view) return;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    input.onchange = async () => {
      await new Promise((r) => setTimeout(r, 2000));
      const file = input.files?.[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/post/upload-temp', {
        method: 'POST',
        body: formData,
      });
      if(!res.ok) return;
      const { url } = await res.json();
      const formattedUrl = url.replaceAll(' ', '%20');
      const lineInfo = view.state.doc.lineAt(view.state.selection.main.from);
      view.dispatch({
        changes: {
          from: lineInfo.from,
          to: lineInfo.to,
          insert: `![${file.name}](${formattedUrl})`,
        },
        selection: { anchor: lineInfo.to, head: lineInfo.to },
      });
    };
  },
};

function MarkdownEditor() {
  const { theme } = useTheme();
  const [value, setValue] = useState<string>('');
  return (
    <>
      <Editor 
        value={value}
        onChange={(v) => setValue(v)}
        minHeight='300px'
        maxHeight='600px'
        theme={theme === 'dark' ? 'dark' : 'light'}
        toolbars={[...Object.values(toolbar), importImage]}
      />
      <input type="hidden" name="content" id="content" value={value} readOnly />
    </>
  );
}

export default MarkdownEditor;