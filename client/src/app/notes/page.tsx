// "use client";

// import { useState } from "react";
// import { NoteEditor } from "@/components/NoteEditor";

// export default function NotesPage() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const handleSave = async (t: string, c: string) => {
//     const res = await fetch("http://localhost:4000/notes", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ title: t, content: c }),
//       credentials: "include", // send cookies for JWT
//     });

//     if (res.ok) {
//       alert("Note saved!");
//       setTitle("");
//       setContent("");
//     } else {
//       const data = await res.json();
//       alert("Error: " + data.message);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <input
//         type="text"
//         placeholder="Note title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="w-full border p-2 rounded mb-2"
//       />
//       <NoteEditor title={title} content={content} onSave={(t, c) => handleSave(t, c)} />
//       <button
//         onClick={() => handleSave(title, content)}
//         className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         Save Note
//       </button>
//     </div>
//   );
// }
