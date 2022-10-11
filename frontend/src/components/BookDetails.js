import { useState } from "react";
import { useBooksContext } from "../hooks/useBooksContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const BookDetails = ({ book }) => {
  const { books, dispatchBook } = useBooksContext();

  const [bookName, setBookName] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const handleUpdateClick = async (e) => {
    e.preventDefault();

    const bookUpdatedName = { bookName };

    const response = await fetch("/api/books/" + book._id, {
      method: "PATCH",
      body: JSON.stringify(bookUpdatedName),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.ok) {
      setEmptyFields([]);
      setBookName("");
      dispatchBook({ type: "UPDATE_BOOK", payload: json });
      dispatchBook({ type: "UPDATE_AVAILABLE_BOOK", payload: json });
    }
  };

  const handleClick = async () => {
    const response = await fetch("/api/books/" + book._id, {
      method: "DELETE",
    });

    const json = await response.json();

    if (response.ok) {
      dispatchBook({ type: "DELETE_BOOK", payload: json });
      dispatchBook({ type: "DELETE_AVAILABLE_BOOK", payload: json });
    }
  };

  return (
    book && (
      <div className="book-details">
        <h4>{book.bookName}</h4>
        <input
          placeholder="Write new book name and press update."
          type="text"
          onChange={(e) => setBookName(e.target.value)}
          value={bookName}
          className={emptyFields.includes("bookName") ? "error" : ""}
        />
        {bookName && (
          <span className="updateButtonBook" onClick={handleUpdateClick}>
            UPDATE
          </span>
        )}
        <span className="material-symbols-outlined" onClick={handleClick}>
          delete
        </span>
        {book.borrowedTo && <p className="notAvailabe">"Book is borrowed"</p>}
      </div>
    )
  );
};

export default BookDetails;
