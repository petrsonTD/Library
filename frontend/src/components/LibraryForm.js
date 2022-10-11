import { useState } from "react";
import { useLibrariesContext } from "../hooks/useLibrariesContext";

const LibraryForm = () => {
  const { dispatch } = useLibrariesContext();

  const [libraryName, setLibraryName] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const library = { libraryName };

    const response = await fetch("/api/libraries", {
      method: "POST",
      body: JSON.stringify(library),
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
      setLibraryName("");
      dispatch({ type: "CREATE_LIBRARY", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Library</h3>

      <label>Library Name:</label>
      <input
        placeholder="Write name then press ADD"
        type="text"
        onChange={(e) => setLibraryName(e.target.value)}
        value={libraryName}
        className={emptyFields.includes("libraryName") ? "error" : ""}
      />

      {libraryName && <button>Add Library</button>}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default LibraryForm;
