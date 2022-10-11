const express = require("express");

const {
  getBooks,
  getBook,
  getBooksByLibraryID,
  getBorrowedBookByStudentId,
  getAvaileBooksByLibraryId,
  createBook,
  deleteBook,
  updateBook,
} = require("../controllers/bookController");

const router = express.Router();

// GET all books
router.get("/", getBooks);

// GET a single book
router.get("/:id", getBook);

// GET a book for library
router.get("/library/:id", getBooksByLibraryID);

// GET a book for library
router.get("/library/borrowed-book/:id", getBorrowedBookByStudentId);

// GET a book for library
router.get("/library/availabe/:id", getAvaileBooksByLibraryId);

// POST a new book
router.post("/", createBook);

// DELETE a book
router.delete("/:id", deleteBook);

// UPDATE a book
router.patch("/:id", updateBook);

module.exports = router;
