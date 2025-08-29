"use client";

import { useState, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Link } from "@tiptap/extension-link";
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
} from "@tiptap/extension-table";
import TextAlign from "@tiptap/extension-text-align";
import { CodeBlock } from "@tiptap/extension-code-block";
import { Blockquote } from "@tiptap/extension-blockquote";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { RichTextToolbar } from "./RichTextToolbar";
import GradientButton from "./GradientButton";
import {
  Save,
  Share2,
  Trash2,
  Archive,
  Plus,
  ChevronDown,
  Copy,
} from "lucide-react";
import toast from "react-hot-toast";

const folders = ["Default", "Work", "Personal", "Idea", "Projects"];

interface NoteEditorProps {
  title?: string;
  content?: string;
  folder?: string;
  onSave?: (title: string, content: string, folder?: string) => void;
  onShare?: (title: string, content: string) => void;
  onDelete?: () => void;
  onArchive?: () => void;
}

export function NoteEditor({
  title: initialTitle = "",
  content: initialContent = "",
  folder: initialFolder = "Default",
  onSave,
  onShare,
  onDelete,
  onArchive,
}: NoteEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [isOpen, setIsOpen] = useState(Boolean(initialContent || initialTitle));
  const [hasContent, setHasContent] = useState(Boolean(initialContent));
  const [selectedFolder, setSelectedFolder] = useState<string>(
    initialFolder || "Default"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setSelectedFolder(initialFolder || "Default");
  }, [initialFolder]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      TextStyle,
      Color,
      Link.configure({ autolink: true, linkOnPaste: true, openOnClick: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      CodeBlock,
      Blockquote,
      HorizontalRule,
    ],
    content: initialContent ? JSON.parse(initialContent) : "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => setHasContent(Boolean(editor.getText().trim())),
    editorProps: {
      attributes: {
        className:
          "prose max-w-full focus:outline-none prose-invert text-white",
      },
    },
  });

  const handleSave = async () => {
    if (!editor) return;
    const currentTitle = title.trim() || "Untitled";
    const currentContent = JSON.stringify(editor.getJSON());
    if (!currentTitle && !editor.getText().trim()) {
      toast.error("Cannot save empty note");
      return;
    }
    await onSave?.(currentTitle, currentContent, selectedFolder);
  };

  if (!isOpen) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-black">
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:scale-110 transition"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/20 px-4 py-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
          className="w-full bg-transparent text-base font-semibold placeholder:text-white/50 focus:outline-none text-white"
        />
        <div className="ml-3 flex items-center gap-2 relative flex-nowrap">
          {/* Buttons */}
          <GradientButton
            size="xs"
            onClick={handleSave}
            className="flex items-center whitespace-nowrap"
          >
            <Save className="mr-1 h-4 w-4" /> Save
          </GradientButton>
          <GradientButton
            size="xs"
            onClick={() => {
              if (!editor) return;
              const textToShare = editor.getText().trim();
              if (!textToShare) {
                toast.error("Nothing to share");
                return;
              }
              navigator.clipboard.writeText(textToShare);
              toast.success("Note copied to clipboard!");
            }}
            className="flex items-center whitespace-nowrap"
          >
            <Copy className="mr-1 h-4 w-4" /> Copy
          </GradientButton>

          <GradientButton
            size="xs"
            onClick={() => {
              onDelete?.();
              setIsOpen(false);
            }}
            className="flex items-center whitespace-nowrap"
          >
            <Trash2 className="mr-1 h-4 w-4" /> Delete
          </GradientButton>
          <GradientButton
            size="xs"
            onClick={() => {
              onArchive?.();
              setIsOpen(false);
            }}
            className="flex items-center whitespace-nowrap"
          >
            <Archive className="mr-1 h-4 w-4" /> Archive
          </GradientButton>

          {/* Folder dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition text-sm font-xs whitespace-nowrap"
            >
              {selectedFolder} <ChevronDown className="w-3 h-3" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-1 z-20 w-40 bg-black border border-white/20 rounded-lg shadow-lg py-1">
                {folders.map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setSelectedFolder(f);
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1 hover:bg-white/10 transition rounded"
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <RichTextToolbar editor={editor} />

      {/* Editor */}
      <div className="relative flex-1 overflow-auto p-3">
        {editor && (
          <EditorContent
            editor={editor}
            className="w-full h-full min-h-[300px] text-white"
          />
        )}
        {!hasContent && (
          <div className="absolute top-3 left-3 pointer-events-none select-none text-white/50">
            Start typing your note...
          </div>
        )}
      </div>
    </div>
  );
}
