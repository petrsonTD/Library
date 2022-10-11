const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    bookName: String,
    libraryID: String,
    borrowedTo: {
      type: String,
      required: false,
      set: (a) => (a === "" ? undefined : a),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
