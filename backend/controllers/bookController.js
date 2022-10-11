const Book = require("../models/bookModel");
const mongoose = require("mongoose");

// get all books
const getBooks = async (req, res) => {
  const students = await Book.find({}).sort({ createdAt: -1 });

  res.status(200).json(students);
};

// get a single book
const getBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such book" });
  }

  const book = await Book.findById(id);

  if (!book) {
    return res.status(400).json({ error: "No such book" });
  }

  res.status(200).json(book);
};

// get a books for library
const getBooksByLibraryID = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such book" });
  }

  const books = await Book.find({ libraryID: id });

  if (!books) {
    return res.status(400).json({ error: "No such book" });
  }

  res.status(200).json(books);
};

// get a borrowed book by student
const getBorrowedBookByStudentId = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(200).json({ error: "No such book" });
  }

  const book = await Book.findOne({ borrowedTo: id });

  if (!book) {
    return res.status(200).json({ error: "No such book" });
  }

  res.status(200).json(book);
};

// get a availabe books for library
const getAvaileBooksByLibraryId = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such book" });
  }

  const books = await Book.find({ borrowedTo: null, libraryID: id });

  if (!books) {
    return res.status(400).json({ error: "No such book" });
  }

  res.status(200).json(books);
};

// create a new book
const createBook = async (req, res) => {
  const { bookName, libraryID } = req.body;

  let emptyFields = [];

  if (!bookName) {
    emptyFields.push("bookName");
  }

  if (!libraryID) {
    emptyFields.push("libraryID");
  }

  // add to the database
  try {
    const book = await Book.create({ bookName, libraryID });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a book
const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such book" });
  }

  const book = await Book.findOneAndDelete({ _id: id });

  if (!book) {
    return res.status(400).json({ error: "No such book" });
  }

  res.status(200).json(book);
};

// update a book
const updateBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such book" });
  }

  const book = await Book.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!book) {
    return res.status(400).json({ error: "No such book" });
  }

  res.status(200).json(book);
};

module.exports = {
  getBooks,
  getBook,
  getBooksByLibraryID,
  getBorrowedBookByStudentId,
  getAvaileBooksByLibraryId,
  createBook,
  deleteBook,
  updateBook,
};
