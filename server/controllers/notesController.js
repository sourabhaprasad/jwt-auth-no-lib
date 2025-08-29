import Note from "../models/Note.js";

// Create note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({ title, content, owner: req.user._id });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all notes (only for the logged-in user)
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.user._id });
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
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id }, // ownership check
      req.body,
      { new: true }
    );
    if (!note)
      return res.status(404).json({ message: "Note not found or not yours" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id, // ownership check
    });
    if (!note)
      return res.status(404).json({ message: "Note not found or not yours" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
