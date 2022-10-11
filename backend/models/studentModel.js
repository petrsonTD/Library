const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    studentName: String,
    libraryID: String,
    historyBorrowedBooks: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
