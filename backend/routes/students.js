const express = require("express");

const {
  getStudents,
  getStudent,
  getStudentsByLibraryID,
  getAvailabeStudentsByLibraryId,
  createStudent,
  deleteStudent,
  updateStudent,
} = require("../controllers/studentController");

const router = express.Router();

// GET all students
router.get("/", getStudents);

// GET a single student
router.get("/:id", getStudent);

// GET a student for library
router.get("/library/:id", getStudentsByLibraryID);

// GET a student for library
router.get("/library/availabe/:id", getAvailabeStudentsByLibraryId);

// POST a new student
router.post("/", createStudent);

// DELETE a student
router.delete("/:id", deleteStudent);

// UPDATE a student
router.patch("/:id", updateStudent);

module.exports = router;
