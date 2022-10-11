import { useEffect } from "react";
import { useLibrariesContext } from "../hooks/useLibrariesContext";

// components
import LibraryDetails from "../components/LibraryDetails";
import LibraryForm from "../components/LibraryForm";

const Home = () => {
  const { libraries, dispatch } = useLibrariesContext();

  useEffect(() => {
    const fetchLibraries = async () => {
      const response = await fetch("/api/libraries");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_LIBRARIES", payload: json });
      }
    };

    fetchLibraries();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="libraries">
        {Array.isArray(libraries) &&
          libraries.map((library) => (
            <LibraryDetails library={library} key={library._id} />
          ))}
      </div>
      <LibraryForm />
    </div>
  );
};

export default Home;
