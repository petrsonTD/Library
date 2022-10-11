const express = require("express");

const {
  getLibraries,
  getLibrary,
  createLibrary,
  deleteLibrary,
  updateLibrary,
} = require("../controllers/libraryController");

const router = express.Router();

// GET all libraries
router.get("/", getLibraries);

// GET a single library
router.get("/:id", getLibrary);

// POST a new library
router.post("/", createLibrary);

// DELETE a library
router.delete("/:id", deleteLibrary);

// UPDATE a library
router.patch("/:id", updateLibrary);

module.exports = router;
