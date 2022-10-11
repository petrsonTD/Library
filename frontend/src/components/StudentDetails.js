import { useState, useEffect } from "react";
import { useStudentsContext } from "../hooks/useStudentsContext";
import { useBooksContext } from "../hooks/useBooksContext";

import RemainingTime from "./RemainingTime";
import HistoryOfBorrowedBooks from "./HistoryOfBorrowedBooks";
import BorrowedBook from "./BorrowedBook";

const StudentDetails = ({ student }) => {
  const [borrowedBook, setBorrowedBook] = useState({});
  const { students, dispatchStudent } = useStudentsContext();
  const { books, dispatchBook } = useBooksContext();

  const [studentName, setStudentName] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const handleUpdateClick = async (e) => {
    e.preventDefault();

    const studentUpdatedName = { studentName };

    const response = await fetch("/api/students/" + student._id, {
      method: "PATCH",
      body: JSON.stringify(studentUpdatedName),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.ok) {
      setEmptyFields([]);
      setStudentName("");
      dispatchStudent({ type: "UPDATE_STUDENT", payload: json });
      dispatchStudent({ type: "UPDATE_AVAILABLE_STUDENT", payload: json });
    }
  };

  const handleClick = async () => {
    const response = await fetch("/api/students/" + student._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatchStudent({ type: "DELETE_STUDENT", payload: json });
      dispatchStudent({ type: "DELETE_AVAILABLE_STUDENT", payload: json });
    }
  };

  const handleReturnClick = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/books/" + borrowedBook._id, {
      method: "PATCH",
      body: JSON.stringify({ borrowedTo: null }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.ok) {
      setBorrowedBook(undefined);
      dispatchBook({ type: "UPDATE_BOOK", payload: json });
      dispatchBook({ type: "CREATE_AVAILABLE_BOOK", payload: json });
      dispatchStudent({ type: "CREATE_AVAILABLE_STUDENT", payload: student });
    }
  };

  useEffect(() => {
    const responseBook = async () => {
      const response = await fetch(
        "/api/books/library/borrowed-book/" + student._id
      );
      const json = await response.json();

      if (response.ok) setBorrowedBook(json);
    };

    responseBook();
  }, [dispatchBook, student]);

  return (
    student && (
      <div className="student-details">
        <h4>{student.studentName}</h4>
        <BorrowedBook studentId={student._id} />
        <RemainingTime borrowedBook={borrowedBook} />
        <HistoryOfBorrowedBooks historyBooks={student.historyBorrowedBooks} />
        <input
          placeholder="Write new student name and press update."
          type="text"
          onChange={(e) => setStudentName(e.target.value)}
          value={studentName}
          className={emptyFields.includes("studentName") ? "error" : ""}
        />
        {studentName && (
          <span className="updateButton" onClick={handleUpdateClick}>
            UPDATE
          </span>
        )}
        <span className="returnBook" onClick={handleReturnClick}>
          ReturnBook
        </span>
        <span className="material-symbols-outlined" onClick={handleClick}>
          delete
        </span>
      </div>
    )
  );
};

export default StudentDetails;
