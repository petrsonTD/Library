import { useState } from "react";
import { useStudentsContext } from "../hooks/useStudentsContext";

const StudentForm = ({ libraryID }) => {
  const { students, dispatchStudent } = useStudentsContext();

  const [studentName, setStudentName] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const student = { studentName, libraryID };

    const response = await fetch("/api/students", {
      method: "POST",
      body: JSON.stringify(student),
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
      setStudentName("");
      dispatchStudent({ type: "CREATE_STUDENT", payload: json });
      dispatchStudent({ type: "CREATE_AVAILABLE_STUDENT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Student</h3>
      <label>Student Name:</label>
      <input
        placeholder="Write name then press ADD"
        type="text"
        onChange={(e) => setStudentName(e.target.value)}
        value={studentName}
        className={emptyFields.includes("studentName") ? "error" : ""}
      />
      {studentName && <button>Add Student</button>}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default StudentForm;
