"use client";

import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaQuoteRight,
  FaTable,
  FaUndo,
  FaRedo,
  FaListUl,
  FaListOl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaLink,
  FaUnlink,
} from "react-icons/fa";

interface RichTextToolbarProps {
  editor: Editor | null;
}

export const RichTextToolbar: React.FC<RichTextToolbarProps> = ({ editor }) => {
  const [linkInput, setLinkInput] = useState("");

  if (!editor) return null;

  const btnClass =
    "p-2 rounded hover:bg-white/10 transition-colors text-gray-500 flex items-center justify-center";

  const divider = <span className="text-white/40 mx-1">|</span>;

  const applyLink = () => {
    if (linkInput) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkInput })
        .run();
      setLinkInput("");
    }
  };

  const headingLevel = editor.isActive("heading", { level: 1 })
    ? "1"
    : editor.isActive("heading", { level: 2 })
    ? "2"
    : editor.isActive("heading", { level: 3 })
    ? "3"
    : "0";

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 border-b border-white/20 bg-black">
      {/* Text Style */}
      <div className="flex items-center gap-1">
        <button
          className={btnClass}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <FaBold />
        </button>
        <button
          className={btnClass}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FaItalic />
        </button>
        <button
          className={btnClass}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <FaUnderline />
        </button>
        <button
          className={btnClass}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <FaStrikethrough />
        </button>
      </div>

      {divider}

      {/* Headings */}
      <select
        value={headingLevel}
        onChange={(e) => {
          const level = e.target.value as "0" | "1" | "2" | "3";
          if (level === "0") editor.chain().focus().setParagraph().run();
          else
            editor
              .chain()
              .focus()
              .toggleHeading({ level: parseInt(level) as 1 | 2 | 3 })
              .run();
        }}
        className="px-2 py-1 rounded bg-gray-800 text-white border border-white/20"
      >
        <option value="0">Normal</option>
        <option value="1">H1</option>
        <option value="2">H2</option>
        <option value="3">H3</option>
      </select>

      {divider}

      {/* Lists */}
      <div className="flex items-center gap-1">
        <button
          className={btnClass}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <FaListUl />
        </button>
        <button
          className={btnClass}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <FaListOl />
        </button>
      </div>

      {divider}

      {/* Block Elements */}
      <div className="flex items-center gap-1">
        <button
          className={btnClass}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <FaQuoteRight />
        </button>
        <button
          className={btnClass}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          ―
        </button>
        <button
          className={btnClass}
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 2, cols: 2, withHeaderRow: true })
              .run()
          }
        >
          <FaTable />
        </button>
      </div>

      {divider}

      {/* Alignment */}
      <div className="flex items-center gap-1">
        <button
          className={btnClass}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <FaAlignLeft />
        </button>
        <button
          className={btnClass}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <FaAlignCenter />
        </button>
        <button
          className={btnClass}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <FaAlignRight />
        </button>
        <button
          className={btnClass}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        >
          <FaAlignJustify />
        </button>
      </div>

      {divider}

      {/* Undo / Redo */}
      <div className="flex items-center gap-1">
        <button
          className={btnClass}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <FaUndo />
        </button>
        <button
          className={btnClass}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <FaRedo />
        </button>
      </div>

      {divider}

      {/* Links */}
      <div className="flex items-center gap-1">
        <input
          type="text"
          placeholder="Link URL"
          value={linkInput}
          onChange={(e) => setLinkInput(e.target.value)}
          className="px-2 py-1 rounded bg-gray-800 text-white border border-white/20"
        />
        <button className={btnClass} onClick={applyLink}>
          <FaLink />
        </button>
        <button
          className={btnClass}
          onClick={() => editor.chain().focus().unsetLink().run()}
        >
          <FaUnlink />
        </button>
      </div>
    </div>
  );
};
