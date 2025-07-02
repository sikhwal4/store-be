// // AppSearch.jsx
// import React, { useState, useEffect, useRef } from "react";


// function AppSearch() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [platform, setPlatform] = useState("playstore");
//   const [country, setCountry] = useState("");
//   const [language, setLanguage] = useState("");
//   const [selectedApp, setSelectedApp] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);
//   const dropdownRef = useRef();
//   const toggleDarkMode = () => setDarkMode(!darkMode);

//   const debounceSearch = (value) => {
//     if (typingTimeout) clearTimeout(typingTimeout);
//     const timeout = setTimeout(() => {
//       fetchSuggestions(value);
//       handleSearch(value);
//     }, 500);
//     setTypingTimeout(timeout);
//   };

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);
//     debounceSearch(value);
//   };

//   const handleSuggestionClick = (value) => {
//     if (typingTimeout) {
//       clearTimeout(typingTimeout);
//       setTypingTimeout(null);
//     }
//     setQuery(value);
//     setSuggestions([]);
//     handleSearch(value);
//   };

//   const handleSearch = async (searchQuery) => {
//     if (!searchQuery.trim()) return;
//     setSelectedApp(null);
//     setSuggestions([]);
//     setHasSearched(true);

//     const url = new URL(
//       platform === "playstore"
//         ? "http://localhost:3000/search"
//         : "http://localhost:3000/api/appstore/search"
//     );
//     url.searchParams.set("query", searchQuery);
//     if (country.trim()) url.searchParams.set("country", country);
//     if (language.trim()) url.searchParams.set("lang", language);

//     try {
//       const res = await fetch(url.toString());
//       const data = await res.json();
//       setResults(data.results || []);
//     } catch (err) {
//       console.error("Error fetching:", err);
//     }
//   };

//   const fetchSuggestions = async (value) => {
//     if (!value.trim()) return;

//     const url = new URL(
//       platform === "playstore"
//         ? "http://localhost:3000/suggest"
//         : "http://localhost:3000/api/appstore/suggestions"
//     );
//     if (platform === "playstore") {
//       url.searchParams.set("term", value);
//     } else {
//       url.searchParams.set("query", value);
//       if (country.trim()) url.searchParams.set("country", country);
//       if (language.trim()) url.searchParams.set("lang", language);
//     }

//     try {
//       const res = await fetch(url.toString());
//       const data = await res.json();
//       const list = platform === "playstore" ? data.results : data.suggestions;
//       setSuggestions(list || []);
//     } catch (err) {
//       console.error("Error fetching suggestions:", err);
//     }
//   };

//   const handleClickOutside = (e) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//       setSuggestions([]);
//     }
//   };

//   const handleAppClick = async (app) => {
//     try {
//       let url = "";
//       let fallbackInstallUrl = "";

//       if (platform === "playstore") {
//         url = `http://localhost:3000/appdetail?id=${app.appId}`;
//         fallbackInstallUrl = `https://play.google.com/store/apps/details?id=${app.appId}`;
//       } else {
//         url = `http://localhost:3000/detail?platform=appstore&id=${app.id}`;
//         fallbackInstallUrl = `https://apps.apple.com/app/id${app.id}`;
//       }

//       const res = await fetch(url);
//       const data = await res.json();
//       data.url = data.url || fallbackInstallUrl;
//       setSelectedApp(data);
//     } catch (err) {
//       console.error("Failed to fetch app detail:", err);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   return (
//     <div className={`container mt-5 ${darkMode ? "dark-mode" : ""}`} ref={dropdownRef}>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h3>🔍 App Search Tool</h3>
//         <button className="btn btn-sm btn-outline-secondary" onClick={() => setDarkMode(!darkMode)}>
//           {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
//         </button>
//       </div>

//       <div className="row gy-3 align-items-center">
//         <div className="col-sm-6 col-md-2">
//           <label className="form-label">🌍 Country</label>
//           <input className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} />
//         </div>

//         <div className="col-sm-6 col-md-2">
//           <label className="form-label">🗣️ Language</label>
//           <input className="form-control" value={language} onChange={(e) => setLanguage(e.target.value)} />
//         </div>

//         <div className="col-md-5 position-relative">
//           <label className="form-label">🔎 Search</label>
//           <div className="input-group">
//             <input
//               className="form-control"
//               value={query}
//               onChange={handleInputChange}
//               placeholder="Search for apps..."
//             />
//             <button className="btn btn-primary" onClick={() => handleSearch(query)}>
//               Search
//             </button>
//           </div>

//           {suggestions.length > 0 && query.length > 0 && (
//             <ul className="list-group position-absolute w-100 mt-1 shadow" style={{ zIndex: 1000 }}>
//               {suggestions.map((sug, idx) => (
//                 <li
//                   key={idx}
//                   className="list-group-item list-group-item-action"
//                   onClick={() => handleSuggestionClick(sug)}
//                   style={{ cursor: "pointer" }}
//                 >
//                   {sug}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div className="col-md-2">
//           <label className="form-label">📱 Platform</label>
//           <select className="form-select" value={platform} onChange={(e) => setPlatform(e.target.value)}>
//             <option value="playstore">Play Store</option>
//             <option value="appstore">App Store</option>
//           </select>
//         </div>
//       </div>

//       {hasSearched && !selectedApp && results.length > 0 && (
//         <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4 mt-4">
//           {results.map((app, index) => (
//             <div key={index} className="col text-center">
//               <img
//                 src={app.icon || app.artworkUrl100 || app.artworkUrl512}
//                 alt="App Icon"
//                 onClick={() => handleAppClick(app)}
//                 style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "16px", cursor: "pointer" }}
//               />
//               <p className="mt-2 mb-0 fw-bold">{app.title || app.trackName || "Untitled"}</p>
//               <p className="text-muted small">⭐ {app.score || app.averageUserRating || "N/A"}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {selectedApp && (
//         <div className="card mt-5 p-4 shadow">
//           <div className="d-flex gap-3 align-items-center">
//             <img
//               src={selectedApp.icon || selectedApp.artworkUrl100 || selectedApp.artworkUrl512}
//               alt="App Icon"
//               style={{ width: "80px", height: "80px", borderRadius: "16px" }}
//             />
//             <div className="flex-grow-1">
//               <h4 className="mb-1">{selectedApp.title || selectedApp.trackName || "App Title"}</h4>
//               <p className="mb-1 text-muted">{selectedApp.developer || selectedApp.artistName}</p>
//               <p className="mb-1">
//                 {selectedApp.summary || selectedApp.description?.slice(0, 150) || "No description available."}
//               </p>
//               <div className="d-flex flex-wrap gap-3">
//                 {selectedApp.score && <span>⭐ {selectedApp.score}</span>}
//                 {selectedApp.averageUserRating && <span>⭐ {selectedApp.averageUserRating}</span>}
//                 {selectedApp.installs && <span>📥 {selectedApp.installs}</span>}
//                 {selectedApp.contentRating && <span>🎯 {selectedApp.contentRating}</span>}
//               </div>
//             </div>
//             <button className="btn btn-sm btn-outline-secondary ms-auto" onClick={() => setSelectedApp(null)}>
//               ← Back to List
//             </button>
//           </div>
//           <div className="mt-3">
//             <a href={selectedApp.url} target="_blank" rel="noopener noreferrer" className="btn btn-success">
//               Install
//             </a>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AppSearch;





import React, { useState, useEffect, useRef } from "react";

function AppSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [platform, setPlatform] = useState("playstore");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (value) => {
    setQuery(value);
    setSuggestions([]);
    handleSearch(value);
  };

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    setSelectedApp(null);
    setSuggestions([]);

    const url =
      platform === "playstore"
        ? `http://localhost:3000/search?query=${searchQuery}${country ? `&country=${country}` : ""}${language ? `&lang=${language}` : ""}`
        : `http://localhost:3000/api/appstore/search?query=${searchQuery}${country ? `&country=${country}` : ""}${language ? `&lang=${language}` : ""}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const fetchSuggestions = async (value) => {
    if (!value.trim()) return;

    const url =
      platform === "playstore"
        ? `http://localhost:3000/suggest?term=${value}`
        : `http://localhost:3000/api/appstore/suggestions?query=${value}${country ? `&country=${country}` : ""}${language ? `&lang=${language}` : ""}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const list = platform === "playstore" ? data.results : data.suggestions;
      setSuggestions(list || []);
    } catch (err) {
      console.error("Suggestions error:", err);
    }
  };

  const handleAppClick = async (app) => {
    try {
      let url = "";
      let fallbackInstallUrl = "";

      if (platform === "playstore") {
        url = `http://localhost:3000/appdetail?id=${app.appId}`;
        fallbackInstallUrl = `https://play.google.com/store/apps/details?id=${app.appId}`;
      } else {
        url = `http://localhost:3000/detail?platform=appstore&id=${app.id}`;
        fallbackInstallUrl = `https://apps.apple.com/app/id${app.id}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      data.url = data.url || fallbackInstallUrl;
      setSelectedApp(data);
    } catch (err) {
      console.error("Failed to fetch app detail:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={darkMode ? "bg-dark text-light min-vh-100" : "bg-light text-dark min-vh-100"}>
      <div className="container py-5" ref={dropdownRef}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>App Explorer</h3>
          <button className="btn btn-sm btn-secondary" onClick={toggleDarkMode}>
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <div className="row gy-3 align-items-center">
          <div className="col-sm-6 col-md-2">
            <label>🌍 Country</label>
            <input className="form-control" value={country} onChange={(e) => setCountry(e.target.value.trim())} />
          </div>

          <div className="col-sm-6 col-md-2">
            <label>🗣️ Language</label>
            <input className="form-control" value={language} onChange={(e) => setLanguage(e.target.value.trim())} />
          </div>

          <div className="col-md-5 position-relative">
            <label>🔎 Search</label>
            <div className="input-group">
              <input
                className="form-control"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for apps..."
              />
              <button className="btn btn-primary" onClick={() => handleSearch(query)}>Search</button>
            </div>

            {suggestions.length > 0 && (
              <ul className="list-group position-absolute w-100 mt-1 shadow" style={{ zIndex: 1000 }}>
                {suggestions.map((sug, idx) => (
                  <li
                    key={idx}
                    className="list-group-item list-group-item-action"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSuggestionClick(sug)}
                  >
                    {sug}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="col-md-2">
            <label>📱 Platform</label>
            <select className="form-select" value={platform} onChange={(e) => setPlatform(e.target.value)}>
              <option value="playstore">Play Store</option>
              <option value="appstore">App Store</option>
            </select>
          </div>
        </div>

        {!selectedApp && results.length > 0 && (
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4 mt-4">
            {results.map((app, index) => (
              <div key={index} className="col text-center">
                <img
                  src={app.icon || app.artworkUrl100 || app.artworkUrl512}
                  alt="App Icon"
                  onClick={() => handleAppClick(app)}
                  style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "16px", cursor: "pointer" }}
                />
                <p className="mt-2 mb-0 fw-bold">{app.title || app.trackName || "Untitled"}</p>
                <p className="text-muted small">⭐ {app.score || app.averageUserRating || "N/A"}</p>
              </div>
            ))}
          </div>
        )}

        {selectedApp && (
          <div className="card mt-5 p-4 shadow">
            <div className="d-flex gap-3 align-items-center">
              <img
                src={selectedApp.icon || selectedApp.artworkUrl100 || selectedApp.artworkUrl512}
                alt="App Icon"
                style={{ width: "80px", height: "80px", borderRadius: "16px" }}
              />
              <div className="flex-grow-1">
                <h4 className="mb-1">{selectedApp.title || selectedApp.trackName || "App Title"}</h4>
                <p className="mb-1 text-muted">{selectedApp.developer || selectedApp.artistName}</p>
                <p className="mb-1">
                  {selectedApp.summary || selectedApp.description?.slice(0, 150) || "No description available."}
                </p>
                <div className="d-flex flex-wrap gap-3">
                  {selectedApp.score && <span>⭐ {selectedApp.score}</span>}
                  {selectedApp.averageUserRating && <span>⭐ {selectedApp.averageUserRating}</span>}
                  {selectedApp.installs && <span>📥 {selectedApp.installs}</span>}
                  {selectedApp.contentRating && <span>🎯 {selectedApp.contentRating}</span>}
                </div>
              </div>
              <button className="btn btn-sm btn-outline-secondary ms-auto" onClick={() => setSelectedApp(null)}>
                ← Back
              </button>
            </div>
            <div className="mt-3">
              <a href={selectedApp.url} target="_blank" rel="noopener noreferrer" className="btn btn-success">
                Install
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppSearch;
