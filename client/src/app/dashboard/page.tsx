"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { NoteList } from "@/components/NoteList";
import { NoteEditor } from "@/components/NoteEditor";
import { getNotes, createNote, updateNote, deleteNote } from "@/api/notes";
import { Note } from "@/types/note";
import toast from "react-hot-toast";
import { DashboardProvider } from "@/context/DashboardContext";

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [newNoteOpen, setNewNoteOpen] = useState(false);
  const [currentFolder, setCurrentFolder] = useState("All Notes");

  // Fetch notes on mount
  useEffect(() => {
    const fetchNotesData = async () => {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (err: unknown) {
        const error = err as Error;
        toast.error(error.message);
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
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message);
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
    } catch (err: unknown) {
      const error = err as Error & {
        response?: { data?: { message?: string } };
      };
      console.error("Save error:", error);
      toast.error(
        error.response?.data?.message || error.message || "Failed to save note"
      );
    }
  };

  const filteredNotes = notes.filter((note) =>
    currentFolder === "All Notes"
      ? true
      : note.folder?.toLowerCase() === currentFolder.toLowerCase()
  );

  return (
    <DashboardProvider
      value={{
        currentFolder,
        setCurrentFolder,
        onNewNote: () => {
          setEditingNote(null);
          setNewNoteOpen(true);
        },
      }}
    >
      <DashboardLayout>
        <div className="flex gap-6 w-full">
          <div className="flex-1 max-w-xs">
            <NoteList
              notes={filteredNotes}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

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
    </DashboardProvider>
  );
}
