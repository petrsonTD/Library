import { createContext, useReducer } from "react";

export const BooksContext = createContext();

export const booksReducer = (state, action) => {
  switch (action.type) {
    case "SET_BOOKS":
      return {
        books: {
          allBooks: action.payload,
          borrowedBooks: state.books.borrowedBooks,
          availableBooks: state.books.availableBooks,
        },
      };
    case "SET_BORROWED_BOOKS":
      return {
        books: {
          allBooks: state.books.allBooks,
          borrowedBooks: action.payload,
          availableBooks: state.books.availableBooks,
        },
      };
    case "SET_AVAILABLE_BOOKS":
      return {
        books: {
          allBooks: state.books.allBooks,
          borrowedBooks: state.books.borrowedBooks,
          availableBooks: action.payload,
        },
      };
    case "CREATE_BOOK":
      return {
        books: {
          allBooks: [action.payload, ...state.books.allBooks],
          borrowedBooks: state.books.borrowedBooks,
          availableBooks: state.books.availableBooks,
        },
      };
    case "CREATE_BORROWED_BOOK":
      return {
        books: {
          allBooks: state.books.allBooks,
          borrowedBooks: [action.payload, ...state.books.borrowedBooks],
          availableBooks: state.books.availableBooks,
        },
      };
    case "CREATE_AVAILABLE_BOOK":
      return {
        books: {
          allBooks: state.books.allBooks,
          borrowedBooks: state.books.borrowedBooks,
          availableBooks: [action.payload, ...state.books.availableBooks],
        },
      };
    case "DELETE_BOOK":
      return {
        books: {
          allBooks: state.books.allBooks.filter(
            (w) => w._id !== action.payload._id
          ),
          borrowedBooks: state.books.borrowedBooks,
          availableBooks: state.books.availableBooks,
        },
      };
    case "DELETE_BORROWED_BOOK":
      return {
        books: {
          allBooks: state.books.allBooks,
          borrowedBooks: state.books.borrowedBooks.filter(
            (w) => w._id !== action.payload._id
          ),
          availableBooks: state.books.availableBooks,
        },
      };
    case "DELETE_AVAILABLE_BOOK":
      return {
        books: {
          allBooks: state.books.allBooks,
          borrowedBooks: state.books.borrowedBooks,
          availableBooks: state.books.availableBooks.filter(
            (w) => w._id !== action.payload._id
          ),
        },
      };
    case "UPDATE_BOOK":
      return {
        books: {
          allBooks: state.books.allBooks.map((book) =>
            book._id === action.payload._id ? action.payload : book
          ),
          borrowedBooks: state.books.borrowedBooks,
          availableBooks: state.books.availableBooks,
        },
      };
    case "UPDATE_BORROWED_BOOK":
      return {
        books: {
          allBooks: state.books.allBooks,
          borrowedBooks: state.books.borrowedBooks.map((book) =>
            book._id === action.payload._id ? action.payload : book
          ),
          availableBooks: state.books.availableBooks,
        },
      };
    case "UPDATE_AVAILABLE_BOOK":
      return {
        books: {
          allBooks: state.books.allBooks,
          borrowedBooks: state.books.borrowedBooks,
          availableBooks: state.books.availableBooks.map((book) =>
            book._id === action.payload._id ? action.payload : book
          ),
        },
      };
    default:
      return state;
  }
};

export const BooksContextProvider = ({ children }) => {
  const [state, dispatchBook] = useReducer(booksReducer, {
    books: {
      allBooks: [],
      borrowedBooks: [],
      availableBooks: [],
    },
  });

  return (
    <BooksContext.Provider value={{ ...state, dispatchBook }}>
      {children}
    </BooksContext.Provider>
  );
};
