"use client";

import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Note } from "@/types/note";

function renderHTMLFromJSON(json: string) {
  try {
    const parsedContent = JSON.parse(json);
    const editor = new Editor({
      extensions: [StarterKit],
    });
    editor.commands.setContent(parsedContent);
    return editor.getHTML();
  } catch {
    return "";
  }
}

interface NoteListProps {
  notes?: Note[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NoteList({ notes = [], onEdit, onDelete }: NoteListProps) {
  return (
    <div className="flex h-full flex-col bg-black text-white">
      <div className="px-4 pt-4">
        <h3 className="text-xs font-semibold text-white">Notes</h3>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto px-4 pb-4 pt-2">
        {notes.length === 0 ? (
          <p className="text-gray-400 text-sm text-center mt-4">
            No notes available
          </p>
        ) : (
          notes.map((n) => (
            <div key={n._id} className="group rounded-xl relative">
              {/* Hover border gradient */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="h-full w-full rounded-xl p-[1px] bg-gradient-to-r from-purple-500 to-indigo-500">
                  <div className="bg-black rounded-xl h-full w-full"></div>
                </div>
              </div>

              <Card className="rounded-xl bg-black border border-transparent transition-colors hover:border-white/40 relative z-10 cursor-pointer p-3">
                <div onClick={() => onEdit(n._id)} className="flex-1">
                  <h4 className="text-xs font-medium text-white">{n.title}</h4>
                  <div
                    className="line-clamp-1 text-xs text-gray-400"
                    dangerouslySetInnerHTML={{
                      __html: renderHTMLFromJSON(n.content),
                    }}
                  ></div>
                </div>

                {/* Action button bottom-right */}
                <div className="absolute bottom-2 right-2 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(n._id);
                    }}
                    className="text-gray-500 hover:text-red-500 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
