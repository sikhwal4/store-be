import { useState, useEffect } from "react";

function Api() {
  const [query, setQuery] = useState("");             // 🔹 Input value
  const [searchQuery, setSearchQuery] = useState(""); // 🔹 Actual query for API
  const [results, setResults] = useState([]);         // 🔹 API response

  // ✅ Debounce: 2000ms बाद API call
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      fetch(`http://localhost:3000/search?keyword=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => {
          const safeResults = Array.isArray(data)
            ? data
            : data.results || data.data || [];
          setResults(safeResults);
        })
        .catch(() => setResults([]));
    }, 2000);

    return () => clearTimeout(timer); 
  }, [searchQuery]);

  // 🔘 बटन क्लिक पर searchQuery सेट करो
  const handleSearch = () => {
    setSearchQuery(query);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>App Search </h2>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search app name..."
        style={{ padding: "8px", marginRight: "10px", width: "250px" }}
      />
      <button onClick={handleSearch} style={{ padding: "8px 16px" }}>
        Search
      </button>

      {results.length > 0 && (
        <table
          border="1"
          cellPadding="10"
          style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>App ID</th>
              <th>Developer</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {results.map((app, index) => (
              <tr key={app.appId || index}>
                <td>{app.title}</td>
                <td>{app.appId}</td>
                <td>{app.developer}</td>
                <td>{app.score || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Api;
