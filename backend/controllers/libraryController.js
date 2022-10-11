const Library = require("../models/libraryModel");
const mongoose = require("mongoose");

// get all libraries
const getLibraries = async (req, res) => {
  const libraries = await Library.find({}).sort({ createdAt: -1 });

  res.status(200).json(libraries);
};

// get a single library
const getLibrary = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such library" });
  }

  const library = await Library.findById(id);

  if (!library) {
    return res.status(404).json({ error: "No such library" });
  }

  res.status(200).json(library);
};

// create a new library
const createLibrary = async (req, res) => {
  const { libraryName } = req.body;

  let emptyFields = [];

  if (!libraryName) {
    emptyFields.push("libraryName");
  }

  // add to the database
  try {
    const library = await Library.create({ libraryName });
    res.status(200).json(library);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a library
const deleteLibrary = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such library" });
  }

  const library = await Library.findOneAndDelete({ _id: id });

  if (!library) {
    return res.status(400).json({ error: "No such library" });
  }

  res.status(200).json(library);
};

// update a library
const updateLibrary = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such library" });
  }

  const library = await Library.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!library) {
    return res.status(400).json({ error: "No such library" });
  }

  res.status(200).json(library);
};

module.exports = {
  getLibraries,
  getLibrary,
  createLibrary,
  deleteLibrary,
  updateLibrary,
};
