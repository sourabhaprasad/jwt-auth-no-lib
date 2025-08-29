// app/notes/page.tsx (Next.js 13+/App Router)
"use client";

import { useState } from "react";
import NoteEditor from "@/components/NoteEditor";

export default function NotesPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = async () => {
    const res = await fetch("http://localhost:4000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
      credentials: "include", // send cookies for JWT
    });

    if (res.ok) {
      alert("Note saved!");
      setTitle("");
      setContent("");
    } else {
      const data = await res.json();
      alert("Error: " + data.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      <NoteEditor initialContent={content} onChange={setContent} />
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Note
      </button>
    </div>
  );
}
