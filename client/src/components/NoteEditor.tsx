"use client";

import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Blockquote } from "@tiptap/extension-blockquote";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { Heading } from "@tiptap/extension-heading";
import { Link } from "@tiptap/extension-link";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";
import TextAlign from "@tiptap/extension-text-align";
import GradientButton from "./GradientButton";
import { Share2, Trash2, Save, Plus } from "lucide-react";
import { RichTextToolbar } from "./RichTextToolbar";

interface NoteEditorProps {
  title?: string;
  content?: string;
  theme?: "light" | "dark";
  onSave?: (title: string, content: string) => void;
  onShare?: (title: string, content: string) => void;
  onDelete?: () => void;
}

export function NoteEditor({
  title: initialTitle = "Title",
  content: initialContent = "",
  theme = "dark",
  onSave,
  onShare,
  onDelete,
}: NoteEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [isOpen, setIsOpen] = useState(false);
  const [hasContent, setHasContent] = useState(Boolean(initialContent));

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: true,
        orderedList: true,
        codeBlock: false,
      }),
      Underline,
      TextStyle,
      Color,
      Blockquote,
      HorizontalRule,
      Heading.configure({ levels: [1, 2, 3] }),
      Table.configure({ resizable: true }),
       TableRow,
    TableHeader,
    TableCell,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: true, autolink: true, linkOnPaste: true }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      setHasContent(Boolean(editor.getText().trim()));
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: `prose max-w-full focus:outline-none ${
          theme === "dark" ? "prose-invert text-white" : "text-gray-900"
        }`,
      },
    },
  });

  if (!isOpen) {
    return (
      <div className={`flex h-full w-full items-center justify-center ${theme === "dark" ? "bg-black" : "bg-white"}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transition hover:scale-110"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
    );
  }

  return (
    <div className={`flex h-full flex-col ${theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900"}`}>
      {/* Header */}
      <div className={`flex items-center justify-between border-b px-4 py-2 ${theme === "dark" ? "border-white/20" : "border-gray-200"}`}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Note title"
          className={`w-full bg-transparent text-base font-semibold placeholder:text-white/50 focus:outline-none ${
            theme === "dark" ? "text-white placeholder:text-white/50" : "text-gray-900 placeholder-gray-400"
          }`}
        />
        <div className="ml-3 hidden items-center gap-2 md:flex">
          <GradientButton
            variant="primary"
            size="xs"
            className="flex items-center"
            onClick={() => {
              onSave?.(title, editor?.getHTML() || "");
              setIsOpen(false);
            }}
          >
            <Save className="mr-1.5 h-4.5 w-3.5" /> Save
          </GradientButton>
          <GradientButton
            variant="accent"
            size="xs"
            className="flex items-center"
            onClick={() => onShare?.(title, editor?.getHTML() || "")}
          >
            <Share2 className="mr-1.5 h-4.5 w-3.5" /> Share
          </GradientButton>
          <GradientButton
            variant="accent"
            size="xs"
            className="flex items-center opacity-90"
            onClick={() => {
              onDelete?.();
              setIsOpen(false);
            }}
          >
            <Trash2 className="mr-1.5 h-4.5 w-3.5" /> Delete
          </GradientButton>
        </div>
      </div>

      {/* Toolbar */}
      <RichTextToolbar editor={editor}/>

      {/* Editor */}
      <div className="relative flex-1 overflow-auto p-3">
        {editor && <EditorContent editor={editor} />}
        {!hasContent && (
          <div className={`absolute top-3 left-3 pointer-events-none select-none ${theme === "dark" ? "text-white/50" : "text-gray-400"}`}>
            Start typing your note...
          </div>
        )}
      </div>
    </div>
  );
}
