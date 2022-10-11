import { useEffect, useState } from "react";

const HistoryOfBorrowedBooks = ({ historyBooks }) => {
  const [historyArray, setHistoryArray] = useState([""]);

  useEffect(() => {
    const hisBooks = async () => {
      setHistoryArray(historyBooks);
      return;
    };
    hisBooks();
  }, []);

  if (historyBooks.length > 0) {
    return (
      <>
        <p>History of borrowed books:</p>
        <ul>
          <>
            {historyBooks.map((historyBook) => (
              <li key={historyBook.toString()}>{historyBook}</li>
            ))}
          </>
        </ul>
      </>
    );
  } else {
    return (
      <>
        <p>You have never borrowed book here.</p>
      </>
    );
  }
};

export default HistoryOfBorrowedBooks;
