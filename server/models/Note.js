import mongoose from "mongoose";

const predefinedFolders = ["Default", "Work", "Personal", "Idea", "Projects"];

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    color: { type: String, default: "#ffffff" },
    folder: { type: String, enum: predefinedFolders, default: "Default" },
    tags: { type: [String], default: [] },

    // Add these fields
    trashed: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },
    trashedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
