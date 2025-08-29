import express from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  archiveNote,
  getArchivedNotes,
  getTrashedNotes,
} from "../controllers/notesController.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.use(authenticate); // all routes require login

router.post("/", createNote);
router.get("/", getNotes);
router.get("/:id", getNoteById);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
router.put("/:id/archive", archiveNote);
router.get("/archived", getArchivedNotes); // archived notes
router.get("/trashed", getTrashedNotes); // trashed notes

export default router;
