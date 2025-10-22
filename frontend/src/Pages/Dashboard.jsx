import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Later we’ll connect this to backend API (Node + MongoDB)
  };

  return (
    <div className="dashboard-page">
      {/* Search Section */}
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by district or region..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
          <button type="submit" className="search-btn">
            🔍 Search
          </button>
        </form>
      </div>

      {/* Category Section */}
      <div className="category-container">
        <div className="category-card">
          <img src="/agriculture.jpg" alt="Agricultural Lands" />
          <div className="overlay">
            <h2>Agricultural Lands</h2>
          </div>
        </div>

        <div className="category-card">
          <img src="/plots.jpg" alt="Plots" />
          <div className="overlay">
            <h2>Plots</h2>
          </div>
        </div>

        <div className="category-card">
          <img src="/industrial.jpg" alt="Industrial Lands" />
          <div className="overlay">
            <h2>Industrial Lands</h2>
          </div>
        </div>

        <div className="category-card">
          <img src="/empty.jpg" alt="Empty Lands" />
          <div className="overlay">
            <h2>Empty Lands</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
