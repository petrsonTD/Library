import { createContext, useReducer } from "react";

export const StudentsContext = createContext();

export const studentsReducer = (state, action) => {
  switch (action.type) {
    case "SET_STUDENTS":
      return {
        students: {
          allStudents: action.payload,
          availableStudents: state.students.availableStudents,
        },
      };
    case "SET_AVAILABLE_STUDENTS":
      return {
        students: {
          allStudents: state.students.allStudents,
          availableStudents: action.payload,
        },
      };
    case "CREATE_STUDENT":
      return {
        students: {
          allStudents: [action.payload, ...state.students.allStudents],
          availableStudents: state.students.availableStudents,
        },
      };
    case "CREATE_AVAILABLE_STUDENT":
      return {
        students: {
          allStudents: state.students.allStudents,
          availableStudents: [
            action.payload,
            ...state.students.availableStudents,
          ],
        },
      };
    case "DELETE_STUDENT":
      return {
        students: {
          allStudents: state.students.allStudents.filter(
            (w) => w._id !== action.payload._id
          ),
          availableStudents: state.students.availableStudents,
        },
      };
    case "DELETE_AVAILABLE_STUDENT":
      return {
        students: {
          allStudents: state.students.allStudents,
          availableStudents: state.students.availableStudents.filter(
            (w) => w._id !== action.payload._id
          ),
        },
      };
    case "UPDATE_STUDENT":
      return {
        students: {
          allStudents: state.students.allStudents.map((student) =>
            student._id === action.payload._id ? action.payload : student
          ),
          availableStudents: state.students.availableStudents,
        },
      };
    case "UPDATE_AVAILABLE_STUDENT":
      return {
        students: {
          allStudents: state.students.allStudents,
          availableStudents: state.students.availableStudents.map((student) =>
            student._id === action.payload._id ? action.payload : student
          ),
        },
      };

    default:
      return state;
  }
};

export const StudentsContextProvider = ({ children }) => {
  const [state, dispatchStudent] = useReducer(studentsReducer, {
    students: {
      allStudents: [],
      availableStudents: [],
    },
  });

  return (
    <StudentsContext.Provider value={{ ...state, dispatchStudent }}>
      {children}
    </StudentsContext.Provider>
  );
};
