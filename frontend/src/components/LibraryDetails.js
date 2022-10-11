import { useState } from "react";
import { Link } from "react-router-dom";
import { useLibrariesContext } from "../hooks/useLibrariesContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const LibraryDetails = ({ library }) => {
  const { dispatch } = useLibrariesContext();

  const [libraryName, setLibraryName] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const handleUpdateClick = async (e) => {
    e.preventDefault();

    const libraryUpdatedName = { libraryName };

    const response = await fetch("/api/libraries/" + library._id, {
      method: "PATCH",
      body: JSON.stringify(libraryUpdatedName),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.ok) {
      setEmptyFields([]);
      setLibraryName("");
      dispatch({ type: "UPDATE_LIBRARY", payload: json });
    }
  };

  const handleClick = async () => {
    const response = await fetch("/api/libraries/" + library._id, {
      method: "DELETE",
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_LIBRARY", payload: json });
    }
  };

  return (
    <div className="library-details">
      <Link to={`/library/${library._id}`}>
        <h4>{library.libraryName}</h4>
      </Link>
      <p>
        {formatDistanceToNow(new Date(library.createdAt), { addSuffix: true })}
      </p>
      <input
        placeholder="Write new library name and press update."
        type="text"
        onChange={(e) => setLibraryName(e.target.value)}
        value={libraryName}
        className={emptyFields.includes("libraryName") ? "error" : ""}
      />
      {libraryName && (
        <span className="updateButton" onClick={handleUpdateClick}>
          UPDATE
        </span>
      )}
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default LibraryDetails;
