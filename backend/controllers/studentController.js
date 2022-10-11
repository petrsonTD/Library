const mongoose = require("mongoose");
const Student = require("../models/studentModel");
const Book = require("../models/bookModel");

// get all students
const getStudents = async (req, res) => {
  const students = await Student.find({}).sort({ createdAt: -1 });

  res.status(200).json(students);
};

// get a single student
const getStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }

  const student = await Student.findById(id);

  if (!student) {
    return res.status(404).json({ error: "No such student" });
  }

  res.status(200).json(student);
};

// get a students for library
const getStudentsByLibraryID = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }

  const students = await Student.find({ libraryID: id });

  if (!students) {
    return res.status(404).json({ error: "No such student" });
  }

  res.status(200).json(students);
};

// get a availabe students for library
const getAvailabeStudentsByLibraryId = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }

  const books = await Book.find({ borrowedTo: { $ne: null } });
  const unavailabeStudents = books.map((book) => {
    return book.borrowedTo;
  });

  const students = await Student.find({
    _id: { $nin: unavailabeStudents },
    libraryID: id,
  });
  res.status(200).json(students);
};

// create a new student
const createStudent = async (req, res) => {
  const { studentName, libraryID } = req.body;

  // add to the database
  try {
    const student = await Student.create({ studentName, libraryID });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a student
const deleteStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such student" });
  }

  const student = await Student.findOneAndDelete({ _id: id });

  if (!student) {
    return res.status(400).json({ error: "No such student" });
  }

  res.status(200).json(student);
};

// update a student
const updateStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such student" });
  }

  const student = await Student.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!student) {
    return res.status(400).json({ error: "No such student" });
  }

  res.status(200).json(student);
};

module.exports = {
  getStudents,
  getStudent,
  getStudentsByLibraryID,
  getAvailabeStudentsByLibraryId,
  createStudent,
  deleteStudent,
  updateStudent,
};
