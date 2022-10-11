import { LibrariesContext } from "../context/LibrariesContext";
import { useContext } from "react";

export const useLibrariesContext = () => {
  const context = useContext(LibrariesContext);

  if (!context) {
    throw Error(
      "useLibrariesContext must be used inside a LibrariesContextProvider"
    );
  }
  return context;
};
