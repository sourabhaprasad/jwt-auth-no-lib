"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { NoteList } from "@/components/NoteList";
import {NoteEditor} from "@/components/NoteEditor";

interface Note {
  id: string;
  title: string;
  content: string;
}

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([
    { id: "1", title: "Meeting Notes", content: "Discuss project timeline and milestones." },
    { id: "2", title: "Ideas", content: "Brainstorm new app features and UI improvements." },
    { id: "3", title: "Todo", content: "Finish dashboard layout and integrate API." },
  ]);

  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleEdit = (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (note) setEditingNote(note);
  };

  const handleDelete = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (editingNote?.id === id) setEditingNote(null);
  };

  const handleSave = (title: string, content: string) => {
    if (editingNote) {
      setNotes((prev) =>
        prev.map((n) => (n.id === editingNote.id ? { ...n, title, content } : n))
      );
    } else {
      const newNote: Note = {
        id: (notes.length + 1).toString(),
        title,
        content,
      };
      setNotes((prev) => [...prev, newNote]);
    }
    setEditingNote(null);
  };

  return (
    <DashboardLayout>
      <div className="flex gap-6">
        <div className="flex-1">
          <NoteList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        <div className="w-1/3">
          <NoteEditor
            key={editingNote?.id ?? "new"}
            initialTitle={editingNote?.title}
            initialContent={editingNote?.content}
            onSave={handleSave}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
