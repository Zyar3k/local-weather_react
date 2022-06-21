import { useEffect, useState } from "react";
import { data, apiUrl } from "./helpers/fetch";

function App() {
  const [query, setQuery] = useState("Kielce");
  const url = apiUrl(query);

  const search = (event) => {
    if (event.key === "Enter") data(url);
  };

  useEffect(() => {
    data(url);
  }, []);

  return (
    <div className="app">
      <h1>Local weather</h1>
      <input
        type="text"
        onChange={(event) => setQuery(event.target.value)}
        value={query}
        onKeyPress={search}
      />
    </div>
  );
}

export default App;
