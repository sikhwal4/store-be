import React, { useState } from "react";

function Search() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // 🔍 Suggestion fetch function
  const handleSuggestions = async (text) => {
    setInput(text);

    if (!text) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/suggest?term=${text}`);
      const data = await response.json();
      setSuggestions(data.results || []);
    } catch (err) {
      console.error("Suggestion Error:", err);
    }
  };

  // 🔍 Search based on selected suggestion or typed input
  const handleSearch = async () => {
    if (!input) return;

    try {
      const response = await fetch(`http://localhost:3000/search?keyword=${input}`);
      const data = await response.json();
      setResults(data.results || []);
      setSuggestions([]); // clear dropdown
    } catch (err) {
      console.error("Search Error:", err);
    }
  };

  // 🔁 When user clicks suggestion
  const handleSelectSuggestion = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
    // handleSearch(); // optional: auto-search on select
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h2>App Search</h2>

      <div style={{ marginBottom: "10px", position: "relative" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => handleSuggestions(e.target.value)}
          placeholder="Search apps..."
          style={{ padding: "8px", width: "60%", marginRight: "10px" }}
        />
        <button onClick={handleSearch} style={{ padding: "8px 16px" }}>Search</button>

        {/* 🔽 Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul style={{
            position: "absolute",
            background: "#fff",
            border: "1px solid #ccc",
            listStyle: "none",
            padding: "5px",
            margin: 0,
            width: "60%",
            zIndex: 1
          }}>
            {suggestions.map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleSelectSuggestion(item)}
                style={{ padding: "5px", cursor: "pointer" }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 📊 Table Result */}
      {results.length > 0 && (
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
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
              <tr key={index}>
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

export default Search;
