const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
  task: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("Note", notesSchema);
