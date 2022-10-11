import { useParams } from "react-router-dom";
import { useEffect, Component } from "react";
import { useLibrariesContext } from "../hooks/useLibrariesContext";
import { useStudentsContext } from "../hooks/useStudentsContext";
import { useBooksContext } from "../hooks/useBooksContext";

import StudentDetails from "../components/StudentDetails";
import BookDetails from "../components/BookDetails";
import StudentForm from "../components/StudentForm";
import BookForm from "../components/BookForm";
import BorrowingBook from "../components/BorrowingBook";

const Library = () => {
  const { libraries, dispatch } = useLibrariesContext();

  const { id } = useParams();

  useEffect(() => {
    const fetchLibrary = async () => {
      const response = await fetch("/api/libraries/" + id);
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_LIBRARIES", payload: json });
      }
    };
    fetchLibrary();
  }, [dispatch, id]);

  const { students, dispatchStudent } = useStudentsContext();

  useEffect(() => {
    const fetchStudent = async () => {
      const response = await fetch("/api/students/library/" + id);
      const json = await response.json();

      if (response.ok) {
        dispatchStudent({ type: "SET_STUDENTS", payload: json });
      }
    };
    fetchStudent();
  }, [dispatchStudent, id]);

  const { books, dispatchBook } = useBooksContext();

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/books/library/" + id);
      const json = await response.json();

      if (response.ok) {
        dispatchBook({ type: "SET_BOOKS", payload: json });
      }
    };
    fetchBooks();
  }, [dispatchBook, id]);

  return (
    <div className="">
      <h2>Library Name: {libraries && libraries?.libraryName}</h2>
      <h3>Library's students:</h3>
      <div className="student-details">
        <h3>You can always add new student.</h3>
      </div>
      <div className="library">
        <div className="libraries">
          {Array.isArray(students.allStudents) &&
            students.allStudents?.map((student) => (
              <StudentDetails student={student} key={student._id} />
            ))}
        </div>
        <StudentForm libraryID={libraries && libraries?._id} />
      </div>
      <BorrowingBook libraryId={id} />
      <h3>Library's books:</h3>
      <div className="student-details">
        <h3>You can always add new book.</h3>
      </div>
      <div className="library">
        <div className="books">
          {Array.isArray(books.allBooks) &&
            books.allBooks?.map((book) => (
              <BookDetails book={book} key={book._id} />
            ))}
        </div>
        <BookForm libraryID={libraries && libraries?._id} />
      </div>
    </div>
  );
};

export default Library;
