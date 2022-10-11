const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const librarySchema = new Schema(
  {
    libraryName: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Library", librarySchema);
