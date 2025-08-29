"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { NoteList } from "@/components/NoteList";
import { NoteEditor } from "@/components/NoteEditor";
import { getNotes, createNote, updateNote, deleteNote } from "@/api/notes";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [editingNote, setEditingNote] = useState<any | null>(null);
  const [newNoteOpen, setNewNoteOpen] = useState(false);
  const [currentFolder, setCurrentFolder] = useState("All Notes");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch notes on mount
  useEffect(() => {
    const fetchNotesData = async () => {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (err: any) {
        toast.error(err.message);
      }
    };
    fetchNotesData();
  }, []);

  const handleEdit = (id: string) => {
    const note = notes.find((n) => n._id === id);
    if (note) {
      setEditingNote(note);
      setNewNoteOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      toast.success("Note deleted");
      setNotes((prev) => prev.filter((n) => n._id !== id));
      if (editingNote?._id === id) setEditingNote(null);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleSave = async (
    title: string,
    content: string,
    folder?: string
  ) => {
    const assignedFolder = folder || currentFolder;

    try {
      if (editingNote?._id) {
        // Update existing note
        const updatedNote = await updateNote(editingNote._id, {
          title,
          content,
          folder: assignedFolder,
        });
        toast.success("Note updated");
        setNotes((prev) =>
          prev.map((n) => (n._id === updatedNote._id ? updatedNote : n))
        );
        setEditingNote(updatedNote);
      } else {
        // Create new note
        const newNote = await createNote({
          title,
          content,
          folder: assignedFolder,
        });
        toast.success("Note created");
        setNotes((prev) => [newNote, ...prev]);
        setEditingNote(newNote);
        setNewNoteOpen(false);
      }
    } catch (err: any) {
      console.error("Save error:", err);
      toast.error(
        err.response?.data?.message || err.message || "Failed to save note"
      );
    }
  };

  const filteredNotes = notes
    .filter((note) =>
      currentFolder === "All Notes"
        ? true
        : note.folder.toLowerCase() === currentFolder.toLowerCase()
    )
    .filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <DashboardLayout
      currentFolder={currentFolder}
      setCurrentFolder={setCurrentFolder}
      onNewNote={() => {
        setEditingNote(null);
        setNewNoteOpen(true);
      }}
      onSearch={setSearchQuery}
    >
      <div className="flex gap-6 w-full">
        {/* Note list */}
        <div className="flex-1 max-w-xs">
          <NoteList
            notes={filteredNotes}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* Editor */}
        <div className="flex-1">
          {(editingNote || newNoteOpen) && (
            <NoteEditor
              key={editingNote?._id ?? "new"}
              title={editingNote?.title ?? ""}
              content={editingNote?.content ?? ""}
              folder={editingNote?.folder ?? currentFolder}
              onSave={handleSave}
              onDelete={() => {
                if (editingNote?._id) handleDelete(editingNote._id);
                setNewNoteOpen(false);
              }}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
