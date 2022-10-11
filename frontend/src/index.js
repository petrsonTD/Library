import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { LibrariesContextProvider } from "./context/LibrariesContext";
import { StudentsContextProvider } from "./context/StudentsContext";
import { BooksContextProvider } from "./context/BooksContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LibrariesContextProvider>
      <StudentsContextProvider>
        <BooksContextProvider>
          <App />
        </BooksContextProvider>
      </StudentsContextProvider>
    </LibrariesContextProvider>
  </React.StrictMode>
);
