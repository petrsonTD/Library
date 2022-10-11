import { useEffect, useState } from "react";
import { useBooksContext } from "../hooks/useBooksContext";

const BorrowedBook = ({ studentId }) => {
  const [thisBorrrowedBook, setThisBorrowedBook] = useState({});

  const { books, dispatchBook } = useBooksContext();

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(
        "/api/books/library/borrowed-book/" + studentId
      );

      const json = await response.json();

      if (response.ok) {
        setThisBorrowedBook(json);
      }
    };

    fetchBook();
  }, [dispatchBook, books, studentId]);

  if (thisBorrrowedBook && thisBorrrowedBook.bookName) {
    return (
      <div>
        <p>Borrowed Book: </p>
        <p className="borrowedBook">{thisBorrrowedBook.bookName}</p>
      </div>
    );
  } else {
    return (
      <div>
        <p></p>
      </div>
    );
  }
};

export default BorrowedBook;
