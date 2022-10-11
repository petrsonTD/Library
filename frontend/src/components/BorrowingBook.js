import { useState, useEffect } from "react";
import { useBooksContext } from "../hooks/useBooksContext";
import { useStudentsContext } from "../hooks/useStudentsContext";

const BorrowingBook = ({ libraryId }) => {
  const [selectedBook, setSelectedBook] = useState();
  const [selectedStudent, setSelectedStudent] = useState();

  const { books, dispatchBook } = useBooksContext();

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/books/library/availabe/" + libraryId);

      const json = await response.json();

      if (response.ok) {
        setSelectedBook(json[0]?._id);
        dispatchBook({ type: "SET_AVAILABLE_BOOKS", payload: json });
      }
    };

    fetchBooks();
  }, [dispatchBook, libraryId]);

  const { students, dispatchStudent } = useStudentsContext();

  useEffect(() => {
    const responseStudent = async () => {
      const response = await fetch(
        "/api/students/library/availabe/" + libraryId
      );

      const json = await response.json();

      if (response.ok) {
        setSelectedStudent(json[0]?._id);
        dispatchStudent({ type: "SET_AVAILABLE_STUDENTS", payload: json });
      }
    };

    responseStudent();
  }, [dispatchStudent, libraryId]);

  const handleBorrowClick = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/books/" + selectedBook, {
      method: "PATCH",
      body: JSON.stringify({ borrowedTo: selectedStudent }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatchBook({ type: "UPDATE_BOOK", payload: json });
      dispatchBook({ type: "DELETE_AVAILABLE_BOOK", payload: json });
    }

    const responsee = await fetch("/api/students/" + selectedStudent, {
      method: "PATCH",
      body: JSON.stringify({
        $addToSet: { historyBorrowedBooks: json.bookName },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json2 = await responsee.json();

    if (responsee.ok) {
      dispatchStudent({ type: "UPDATE_STUDENT", payload: json2 });
      dispatchStudent({ type: "DELETE_AVAILABLE_STUDENT", payload: json2 });
    }
  };

  if (
    books.availableBooks.length > 0 &&
    students.availableStudents.length > 0
  ) {
    return (
      <div className="borrowing">
        <h3>Borrowing a Book</h3>
        <form>
          <label>Pick a Book:</label>
          <select
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
          >
            {Array.isArray(books.availableBooks) &&
              books.availableBooks?.map((book) => (
                <option book={book} key={book._id} value={book._id}>
                  {book.bookName}
                </option>
              ))}
          </select>
          <label>Borrow to:</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            {Array.isArray(students.availableStudents) &&
              students.availableStudents?.map((student) => (
                <option book={student} key={student._id} value={student._id}>
                  {student.studentName}
                </option>
              ))}
          </select>
          <button className="borrowButton" onClick={handleBorrowClick}>
            Borrow
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="borrowing">
        <h3>You can't borrow books.</h3>
      </div>
    );
  }
};

export default BorrowingBook;
