import { useEffect, useState } from "react";
import { useBooksContext } from "../hooks/useBooksContext";

const RemainingTime = ({ borrowedBook }) => {
  const [remain, setRemain] = useState(0);

  const { books, dispatchBook } = useBooksContext();

  useEffect(() => {
    if (!borrowedBook?.error) {
      const remainTime = async () => {
        const result =
          30 -
          Math.floor(
            (+new Date() - +new Date(borrowedBook?.updatedAt)) /
              (1000 * 60 * 60 * 24)
          );
        setRemain(result);
      };
      remainTime();
    }
  }, [dispatchBook, books, borrowedBook]);

  if (borrowedBook?.error) {
    return <p> </p>;
  }

  if (Number.isNaN(remain)) {
    return <p> </p>;
  } else if (remain > 0) {
    return <p>You have {remain} days to return book.</p>;
  } else if (remain < 0) {
    return <p className="red">Time to return book</p>;
  }
};

export default RemainingTime;
