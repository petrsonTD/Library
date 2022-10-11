import { useState } from "react";
import { useBooksContext } from "../hooks/useBooksContext";

const BookForm = ({ libraryID }) => {
  const { dispatchBook } = useBooksContext();

  const [bookName, setBookName] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const book = { bookName, libraryID };

    const response = await fetch("/api/books", {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setBookName("");
      dispatchBook({ type: "CREATE_BOOK", payload: json });
      dispatchBook({ type: "CREATE_AVAILABLE_BOOK", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Book</h3>

      <label>Book Name:</label>
      <input
        placeholder="Write name then press ADD"
        type="text"
        onChange={(e) => setBookName(e.target.value)}
        value={bookName}
        className={emptyFields.includes("bookName") ? "error" : ""}
      />

      {bookName && <button>Add Book</button>}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default BookForm;
