const express = require("express");
const Note = require("../models/Notes");

const notes = [];
async function getAllNotes(req, res) {
  const notes = await Note.find();
  res.json({
    success: true,
    notes: notes,
  });
}

async function getNoteById(req, res) {
  const noteId = req.params.id;
  const note = await Note.findById(noteId);

  if (note) {
    res.json({
      success: true,
      note: note,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }
}

async function createNote(req, res) {
  const newNote = new Note({
    task: req.body.task,
    status: req.body.status,
  });
  await newNote.save();
  res.status(201).json({
    success: true,
    note: newNote,
  });
}

async function deleteNote(req, res) {
  const noteId = req.params.id;
  const note = await Note.findByIdAndDelete(noteId);

  if (note) {
    res.json({
      success: true,
      message: "Note deleted successfully",
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }
}

async function updateNote(req, res) {
  const noteId = req.params.id;
  const updatedNote = {
    _id: req.params.id,
    task: req.body.task,
    status: req.body.status,
  };
  const note = await Note.findByIdAndUpdate(noteId, updatedNote);
  console.log(note);
  if (note) {
    res.json({
      success: true,
      note: updatedNote,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }
}

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
};
