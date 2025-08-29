import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    color: { type: String, default: "#ffffff" },
    folder: { type: String, default: "Default" },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
