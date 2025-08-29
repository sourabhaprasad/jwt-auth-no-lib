import Note from "../models/Note.js";

// Predefined folders
const predefinedFolders = ["Default", "Work", "Personal", "Idea", "Projects"];

// Create note
export const createNote = async (req, res) => {
  try {
    const {
      title,
      content,
      folder = "Default",
      color = "#ffffff",
      tags = [],
    } = req.body;

    // Validate folder
    const folderName = predefinedFolders.includes(folder) ? folder : "Default";

    const note = await Note.create({
      title,
      content,
      owner: req.user._id,
      folder: folderName,
      color,
      tags,
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all notes (excluding trashed)
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      owner: req.user._id,
      trashed: { $ne: true },
      archived: { $ne: true },
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single note
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update note
export const updateNote = async (req, res) => {
  try {
    const { title, content, folder, color, tags } = req.body;
    const note = await Note.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!note)
      return res.status(404).json({ message: "Note not found or not yours" });

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;

    // Validate folder
    if (folder && predefinedFolders.includes(folder)) {
      note.folder = folder;
    }

    if (color) note.color = color;

    // Append tags
    if (tags && Array.isArray(tags)) {
      note.tags = Array.from(new Set([...note.tags, ...tags]));
    }

    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete note permanently
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!note)
      return res.status(404).json({ message: "Note not found or not yours" });
    res.json({ message: "Note deleted permanently" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Archive note
export const archiveNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { archived: true },
      { new: true }
    );
    if (!note)
      return res.status(404).json({ message: "Note not found or not yours" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Trash note (soft delete)
export const trashNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { trashed: true, trashedAt: new Date() },
      { new: true }
    );
    if (!note)
      return res.status(404).json({ message: "Note not found or not yours" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getArchivedNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      owner: req.user._id,
      archived: true,
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get trashed notes
export const getTrashedNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      owner: req.user._id,
      trashed: true,
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
