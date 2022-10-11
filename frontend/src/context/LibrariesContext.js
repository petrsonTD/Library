import { createContext, useReducer } from "react";

export const LibrariesContext = createContext();

export const librariesReducer = (state, action) => {
  switch (action.type) {
    case "SET_LIBRARIES":
      return {
        libraries: action.payload,
      };
    case "CREATE_LIBRARY":
      return {
        libraries: [action.payload, ...state.libraries],
      };
    case "DELETE_LIBRARY":
      return {
        libraries: state.libraries.filter((w) => w._id !== action.payload._id),
      };
    case "UPDATE_LIBRARY":
      return {
        libraries: state.libraries.map((library) =>
          library._id === action.payload._id ? action.payload : library
        ),
      };
    default:
      return state;
  }
};

export const LibrariesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(librariesReducer, {
    libraries: null,
  });

  return (
    <LibrariesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LibrariesContext.Provider>
  );
};
