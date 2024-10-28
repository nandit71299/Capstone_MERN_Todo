const express = require("express");
const notesController = require("./controllers/notesController");

const router = express.Router();

// Define your routes
router.get("/notes", notesController.getAllNotes); // Get all notes
router.post("/note", notesController.createNote); // Create a new note
router.get("/note/:id", notesController.getNoteById); // Get a note by ID
router.put("/note/:id", notesController.updateNote); // Update a note by ID
router.delete("/notes/:id", notesController.deleteNote); // Delete a note by ID

module.exports = router;
